import React from "react"
import ReactDOM from "react-dom"
import { shallow } from "enzyme"
import App from "./App"

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it("handleMessage adds new message to state", () => {
  const wrapper = shallow(<App />)
  const instance = wrapper.instance()
  const mockMsg = {
    msg: "hello",
    to: "9192121222",
    from: "me",
  }
  instance.handleMessage({ data: JSON.stringify(mockMsg) })
  expect(instance.state.allMessages).toEqual({
    "9192121222": [
      {
        msg: "hello",
        from: "9192121222",
        to: "me",
      },
    ],
  })
})
