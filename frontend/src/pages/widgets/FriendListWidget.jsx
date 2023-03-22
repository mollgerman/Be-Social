import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import { RefreshOutlined } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";

const FriendListWidget = ({ user_id }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  let friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/users/${user_id}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <FlexBetween >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <IconButton
        onClick={getFriends}  
        sx={{ mb: "1.5rem" }}
      >
        <RefreshOutlined />
      </IconButton>
      </FlexBetween>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {(friends) ?
            friends.map((friend) => (
            <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                postUserPicture={friend.picture64}
            />
            ))
          : 
          ''
        }
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;