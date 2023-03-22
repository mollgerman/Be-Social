import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "../../components/UserImage";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../../state";
  import convertToBase64 from "../../functions/convertToBase64";
  
  const MyPostWidget = ({ isProfile = false }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image64, setImage64] = useState(null);
    const [image64Name, setImage64Name] = useState()
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id, picture64, firstName, lastName } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handlePost = async () => {
        const params = new URLSearchParams()
        params.append("user_id", _id);
        params.append("firstName", firstName);
        params.append("lastName", lastName);
        params.append("description", post);
        (image64) && params.append("image64", image64);
        // (isProfile) && params.append("isProfile", true)

    
        const response = await fetch(`https://mollgerman-besocial-backend.onrender.com/posts/post`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: params,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage64(null);
        setPost("");
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
        <UserImage image={picture64} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <input 
                    type="file" 
                    name="picture"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      const base64 = await convertToBase64(file);
                      setImage64(base64)
                    }}
                  >
            </input>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.primary.white,
              backgroundColor: palette.primary.main,
              "&:hover": {
                backgroundColor: palette.primary.dark,
              },
              "&:disabled":{
                backgroundColor: palette.neutral.light,
                
              },
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;

