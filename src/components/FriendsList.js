import React from "react"
import _ from "lodash"
import PropTypes from "prop-types"
import {
  ListItem,
  FriendList,
  ProfileImg,
  NameText,
} from "../common/StyledComponents"

function FriendsList({ list, selectedFriend, handleFriendSelect }) {
  return (
    <FriendList>
      {_.map(list, (val, key) => {
        return (
          <ListItem
            key={val.phone}
            onClick={() => handleFriendSelect(val)}
            active={selectedFriend && selectedFriend.phone === val.phone}>
            <ProfileImg
              src={`http://i.pravatar.cc/40?q=${val.phone}`}
              alt={val.name}
            />
            <NameText>{val.name}</NameText>
          </ListItem>
        )
      })}
    </FriendList>
  )
}

FriendsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  handleFriendSelect: PropTypes.func.isRequired,
  selectedFriend: PropTypes.object,
}

export default FriendsList
