import { Box, useMediaQuery } from "@mui/material";
import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import UserImage from '../components/UserImage'
import { useSelector } from 'react-redux'
import UserWidget from './widgets/UserWidget'
import MyPostWidget from "./widgets/MyPostWidget";
import PostsWidget from "./widgets/PostsWidget";
import AdWidget from "./widgets/AdWidget";
import FriendListWidget from "./widgets/FriendListWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user)
  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user_id={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget user_id={_id} /> 
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdWidget />
            <Box m="2rem 0" />
            <FriendListWidget user_id={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home
