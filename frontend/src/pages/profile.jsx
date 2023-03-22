import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FriendListWidget from "../pages/widgets/FriendListWidget";
import MyPostWidget from "../pages/widgets/MyPostWidget";
import PostsWidget from "../pages/widgets/PostsWidget";
import UserWidget from "../pages/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { user_id } = useParams();
  const token = useSelector((state) => state.token);
  const loggedUserId = useSelector((state) => state.user._id)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`https://mollgerman-besocial-backend.onrender.com/users/${user_id}`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user_id={user_id} picture64={user.picture64} />
          <Box m="2rem 0" />
          <FriendListWidget user_id={user_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {(user_id == loggedUserId) ? 
            <MyPostWidget isProfile />
            :
            ''
          }
          <Box m="2rem 0" />
          <PostsWidget user_id={user_id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;