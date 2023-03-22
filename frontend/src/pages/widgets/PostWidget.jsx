import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    DeleteOutlined,
    ShareOutlined,
    SendOutlined
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, OutlinedInput  } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import Friend from "../../components/Friend";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, deleteThisPost } from "../../state";
import UserImage from "../../components/UserImage";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    image,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const [toComment, setToComment] = useState();
    const [postUserPicture, setPostUserPicture] = useState()
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const userPicture = useSelector((state) => state.user.picture64);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const getPostUserPicture = async () => {
        const userResponse = await fetch(`http://mollgerman-besocial-backend.onrender.com/users/${postUserId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }, 
        })
        const user = await userResponse.json()
        setPostUserPicture(user.picture64)
    }
    getPostUserPicture()


    const patchLike = async () => {
      const response = await fetch(`http://mollgerman-besocial-backend.onrender.com/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${ token }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    const patchCommentParams = new URLSearchParams()
    patchCommentParams.append("user_id", loggedInUserId);
    patchCommentParams.append("userPicture", userPicture);
    patchCommentParams.append("name", name);
    patchCommentParams.append("comment", toComment);

    const patchComment = async () => {
      const response = await fetch(`http://mollgerman-besocial-backend.onrender.com/posts/${postId}/comment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${ token }`,
        },
        body: patchCommentParams,
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setToComment("")
    }

    const deletePost = async () => {
      const response = await fetch(`http://mollgerman-besocial-backend.onrender.com/posts/post`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${ token }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId : postId })
      });
      const deletedId = await response.json()
      dispatch(deleteThisPost({ id: deletedId }))
    }

    
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          postUserPicture={postUserPicture}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {image && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={image}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
          
          <FlexBetween gap="0.5rem">
            <IconButton >
              <ShareOutlined />
            </IconButton>
          {(loggedInUserId == postUserId) ? 
            <IconButton onClick={deletePost}>
              <DeleteOutlined />
            </IconButton>
          :
            ''
          }
          </FlexBetween>
          
          
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <FlexBetween >
                  <Box>
                  <FlexBetween sx={{mt:"0.5rem"}}>
                    <UserImage image={comment.userPicture} size="25px"/>
                    <Typography sx={{ color: main, m: "auto", pl: "0.5rem", fontWeight:"bold" }}>
                      {comment.name}
                    </Typography>
                    </FlexBetween>
                  </Box>
                </FlexBetween>
                <Typography sx={{ color: main, mt:"0.1rem", marginLeft:"1.2rem", marginLow:"1rem", pl: "1rem", fontSize:"1em" }}>
                  {comment.comment}
                </Typography>
              </Box>
            ))}
            <Divider sx={{mt:"0.5rem"}}/>
            <FlexBetween>
            <OutlinedInput
            placeholder="Comment something"
            onChange={(e) => setToComment(e.target.value)}
            value={toComment}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1em",
              margin:"0.6em 0em",
              height:"2.6em"
            }}
            />
            <IconButton
              onClick={patchComment}
            > 
              <SendOutlined/>
            </IconButton>
            </FlexBetween>
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;