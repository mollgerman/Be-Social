import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ user_id, isProfile = false }) => {
  const dispatch = useDispatch();
  let posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`https://mollgerman-besocial-backend.onrender.com/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    let data = await response.json();
    data.reverse()
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://mollgerman-besocial-backend.onrender.com/posts/${user_id}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {(posts) ? posts.map(
        ({
          _id,
          user_id,
          firstName,
          lastName,
          description,
          image64,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={user_id}
            name={`${firstName} ${lastName}`}
            description={description}
            image={image64}
            likes={likes}
            comments={comments}
          />
        ))
        :
        <Typography key={0}/>
      }
    </>
  );
};

export default PostsWidget;