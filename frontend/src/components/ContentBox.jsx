import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const ContentBox = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.level1,
        padding: theme.spacing(2),
        height: "100%",
        borderRadius: "8px",
        flexBasis: "0",
        flexGrow: props.size,
        ...sx,
      }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default ContentBox;
