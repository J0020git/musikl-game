import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const Chat = ({ socket, name }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageListRef = useRef(null);

  async function sendMessage() {
    if (message.trim() === "") {
      setMessage("");
      return;
    }
    await socket.emit("sendMessage", { message, author: name });
    setMessage("");
  }

  function receiveMessage(messageData) {
    setMessageList((list) => [...list, messageData]);
  }

  useEffect(() => {
    socket.on("receiveMessage", receiveMessage);

    return () => {
      socket.off("receiveMessage", receiveMessage);
    };
  }, [socket]);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <Stack direction="column" spacing={1} sx={{ width: "100%", height: "100%" }}>
      <Box ref={messageListRef} sx={{ height: "100%", overflow: "auto", overflowWrap: "break-word"}}>
        {messageList.map((messageData, index) => {
          return (
            <p key={index}>
              {messageData.author}: {messageData.message}
            </p>
          );
        })}
      </Box>
      <TextField
        size="small"
        fullWidth
        placeholder="Type your message here"
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "background.level2",
          },
        }}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && sendMessage()}
      />
    </Stack>
  );
};

export default Chat;
