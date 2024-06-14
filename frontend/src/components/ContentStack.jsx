import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

const ContentStack = ({ sx, ...props }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.background.level1,
        width: "100%",
        maxWidth: "400px",
        padding: theme.spacing(4),
        margin: "auto",
        borderRadius: "8px",
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {props.children}
    </Stack>
  );
};

export default ContentStack;
