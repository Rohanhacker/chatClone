import React, { Component } from "react"
import Sockette from "sockette"
import { createGlobalStyle } from "styled-components"
import Fuse from "fuse.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import {
  Container,
  Sidebar,
  Main,
  BGWrapper,
  ProfileImg,
  Header,
  SearchContainer,
  SearchBox,
  SearchInput,
} from "./common/StyledComponents"
import { FriendsList, ChatBox } from "./components"
import friendList from "./mock.json"
import "normalize.css"

const searchOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name", "phone"],
}

const GlobalStyle = createGlobalStyle`
  html, body, #root, .App {
    height: 100%;
  }
`

class App extends Component {
  state = {
    inputFocus: false,
    search: "",
    selectedFriend: null,
    msg: "",
    allMessages: {},
  }
  componentDidMount() {
    this.ws = new Sockette("wss://echo.websocket.org/", {
      timeout: 5e3,
      maxAttempts: 10,
      onmessage: this.handleMessage,
      onerror: this.handleSocketError,
    })
  }
  handleSocketError = error => {
    console.log("E", error)
    // send to sentry
  }
  /**
   * Set new message to allMessages in state
   */
  handleMessage = msg => {
    try {
      const data = JSON.parse(msg.data)
      const { allMessages } = this.state
      const message = {
        ...data,
        from: data.to,
        to: "me",
      }
      const phone = message.from
      const selectedMessages = [...(allMessages[phone] || []), message]
      this.setState({
        allMessages: { ...allMessages, [phone]: selectedMessages },
      })
    } catch (e) {
      console.error(e)
    }
  }
  /**
   * clear placeholder on focus
   */
  onInputFocus = e => {
    e.target.placeholder = ""
    this.setState({
      inputFocus: true,
    })
  }
  onInputBlur = e => {
    e.target.placeholder = "Search or start a new chat"
    this.setState({
      inputFocus: false,
    })
  }
  onSearch = e => {
    this.setState({
      search: e.target.value,
    })
  }
  handleFriendSelect = selectedFriend => {
    this.setState({
      selectedFriend,
    })
  }
  handleInput = e => {
    this.setState({
      msg: e.target.value,
    })
  }
  sendMsg = msg => {
    this.ws.json(msg)
  }
  /**
   * post message on enter and clear msg state
   */
  onEnter = e => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
      const { selectedFriend, msg, allMessages } = this.state
      const phone = selectedFriend.phone
      const message = {
        from: "me",
        to: phone,
        message: msg,
        timestamp: Date.now(),
      }
      const selectedMessages = [...(allMessages[phone] || []), message]
      this.setState(
        {
          msg: "",
          allMessages: { ...allMessages, [phone]: selectedMessages },
        },
        () => this.sendMsg(message)
      )
    }
  }
  render() {
    const { inputFocus, search, selectedFriend, msg, allMessages } = this.state
    let list = friendList.friendList
    if (search) {
      const fuse = new Fuse(list, searchOptions)
      list = fuse.search(search)
    }
    const selectedPhone = selectedFriend && selectedFriend.phone
    return (
      <div className="App">
        <Container>
          <GlobalStyle />
          <Sidebar>
            <Header>
              <ProfileImg src={"http://i.pravatar.cc/40?q=1"} />
            </Header>
            <SearchContainer
              background={inputFocus || search ? "white" : "#f5f4f4"}>
              <SearchBox>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    color: "#c5c9ca",
                  }}
                />
                <SearchInput
                  onFocus={this.onInputFocus}
                  onBlur={this.onInputBlur}
                  onChange={this.onSearch}
                  placeholder={"Search or start a new chat"}
                />
              </SearchBox>
            </SearchContainer>
            <FriendsList
              list={list}
              handleFriendSelect={this.handleFriendSelect}
              selectedFriend={selectedFriend}
            />
          </Sidebar>
          <Main>
            <BGWrapper />
            <ChatBox
              selectedPhone={selectedPhone}
              selectedFriend={selectedFriend}
              onEnter={this.onEnter}
              handleInput={this.handleInput}
              msg={msg}
              allMessages={allMessages}
            />
          </Main>
        </Container>
      </div>
    )
  }
}

export default App
