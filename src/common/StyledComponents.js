import styled from "styled-components"
import TextareaAutosize from "react-autosize-textarea"
import Background from "./bg.png"
import Image from "./Image"

export const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 14px;
  width: 100%;
  margin: auto;
  border-color: lightgrey;
  padding: 8px;
  resize: none;
  border: none;
  outline: 0px;
  min-height: 34px;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #e5ddd5;
  display: flex;
  & * {
    box-sizing: border-box;
  }
`

export const Sidebar = styled.div`
  flex: 0 0 30%;
  height: 100%;
  position: relative;
  z-index: 10;
`

export const Main = styled.div`
  flex: 0 0 70%;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
  z-index: 10;
`

export const ChatContent = styled.div`
  display: flex;
  flex: 1 1 0;
  z-index: 9;
  position: relative;
  flex-direction: column;
  overflow-y: auto;
  padding: 14px;
`

export const BGWrapper = styled.div`
  background-size: 366.5px 666px;
  background-repeat: repeat repeat;
  opacity: 0.06;
  background-image: url(${Background});
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const ProfileImg = styled(Image)`
  border-radius: 50%;
`

export const Header = styled.div`
  background: #eeeeee;
  width: 100%;
  padding: 10px 16px;
  vertical-align: baseline;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
`

export const Footer = styled.div`
  background: #efefef;
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 62px;
  padding: 12px;
`

export const SearchContainer = styled.div`
  background: ${props => props.background || "white"};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49px;
  transition: all ease 0.12s;
  border-bottom: 1px solid #f2f2f2;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.07);
`

export const SearchBox = styled.div`
  background: #ffffff;
  width: 90%;
  height: 28px;
  padding: 0 8px;
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 16px;
  border: none;
  outline: 0px;
  padding: 8px;
  border-radius: 4px;
  vertical-align: sub;
  &::placeholder {
    color: #a6a6a6;
  }
`

export const FriendList = styled.div`
  width: 100%;
  background: #ffffff;
  height: calc(100% - 113px);
  overflow-y: auto;
`

export const ListItem = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  background: ${props => (props.active ? "#e9ebeb" : "transparent")};
  &:hover {
    background: #e9ebeb;
    cursor: pointer;
  }
`

export const NameText = styled.span`
  margin-left: 12px;
`

export const ChatMsgSender = styled.div`
  max-width: 512px;
  margin: 12px;
  position: relative;
  background: #d3fac0;
  align-self: flex-end;
  padding: 12px;
  border-radius: 8px;
  &:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid #d3fac0;
    border-right: 10px solid transparent;
    border-top: 10px solid #d3fac0;
    border-bottom: 10px solid transparent;
    right: -14px;
    top: 0;
  }
`

export const ChatMsgReceiver = styled.div`
  max-width: 512px;
  margin: 12px;
  position: relative;
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  &:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid #ffffff;
    border-top: 10px solid #ffffff;
    border-bottom: 10px solid transparent;
    left: -14px;
    top: 0;
  }
`
