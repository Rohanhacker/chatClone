import React, { Fragment, Component } from "react"
import _ from "lodash"
import PropTypes from "prop-types"
import {
  Header,
  ProfileImg,
  NameText,
  ChatContent,
  StyledTextArea,
  Footer,
  ChatMsgReceiver,
  ChatMsgSender,
} from "../common/StyledComponents"

class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.messagesEnd = React.createRef()
  }
  scrollToBottom = () => {
    const node = this.messagesEnd.current
    if (node) {
      node.scrollIntoView()
    }
  }
  componentDidMount() {
    this.scrollToBottom()
  }
  isMessagesUpdated = prevProps => {
    const { allMessages, selectedPhone } = this.props
    return !_.isEqual(
      allMessages[selectedPhone],
      prevProps.allMessages[selectedPhone]
    )
  }
  componentDidUpdate(prevProps) {
    const { selectedPhone } = this.props
    if (
      selectedPhone !== prevProps.selectedPhone ||
      this.isMessagesUpdated(prevProps)
    ) {
      this.scrollToBottom()
    }
  }
  render() {
    const {
      selectedPhone,
      selectedFriend,
      onEnter,
      handleInput,
      msg,
      allMessages,
    } = this.props
    const chatDOM =
      selectedPhone &&
      _.map(allMessages[selectedPhone], (msg, i) => {
        if (msg.from === "me") {
          return (
            <ChatMsgSender key={`${msg.to} ${i}`}>{msg.message}</ChatMsgSender>
          )
        } else {
          return (
            <ChatMsgReceiver key={`${msg.from} ${i}`}>
              {msg.message}
            </ChatMsgReceiver>
          )
        }
      })
    return (
      <Fragment>
        {selectedPhone ? (
          <Fragment>
            <Header>
              <ProfileImg
                key={selectedPhone}
                src={`http://i.pravatar.cc/40?q=${selectedPhone}`}
              />
              <NameText>{selectedFriend.name}</NameText>
            </Header>
            <ChatContent>
              {chatDOM}
              <div
                style={{ float: "left", clear: "both" }}
                ref={this.messagesEnd}
              />
            </ChatContent>
            <Footer>
              <StyledTextArea
                placeholder="Type a message"
                maxRows={3}
                onKeyDown={onEnter}
                value={msg}
                onChange={handleInput}
              />
            </Footer>
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}

ChatBox.propTypes = {
  selectedPhone: PropTypes.string,
  selectedFriend: PropTypes.object,
  onEnter: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  msg: PropTypes.string,
  allMessages: PropTypes.object,
}

export default ChatBox
