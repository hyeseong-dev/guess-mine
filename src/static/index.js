const socket = io("/");

function sendMessage(message){
    socket.emit("newMessage", {message});
    console.log(`You: ${message}`);
}

function handleMessageNotif(data){
    const { message, nickname } = data;
    console.log(`${nickname}: ${message}`)
}

function setNickname(nickname){
    socket.emit("setNickname", {nickname})
}

socket.on("messageNotif", handleMessageNotif)