import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ user_id, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts)
  let sortedPosts = [...posts]
  sortedPosts.reverse()
  const token = useSelector((state) => state.token);


  const getPosts = async () => {
    const response = await fetch(`http://mollgerman-besocial-backend.onrender.com/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://mollgerman-besocial-backend.onrender.com/posts/${user_id}/posts`,
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
      {(sortedPosts) ? sortedPosts.map(
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
        ''
      }
    </>
  );
};

export default PostsWidget;