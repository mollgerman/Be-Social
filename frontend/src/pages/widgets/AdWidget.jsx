import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://www.vicnews.com/wp-content/uploads/2020/02/20634170_web1_NYBZ393-219_2020_160030.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Burger King</Typography>
        <Typography color={medium}>burgerking.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        The beauty of no artificial preservatives.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;