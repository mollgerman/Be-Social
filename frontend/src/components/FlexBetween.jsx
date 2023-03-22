import { Box } from "@mui/material";
import { styled } from "@mui/system";


// this is a way of writing css for a component from react
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween