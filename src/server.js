import express from "express";
import { Server } from "socket.io";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const PORT = 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
 console.log(`🚀Server running: http://localhost:${PORT}`)

const server = app.listen(PORT, handleListening);

const io = new Server(server);

let sockets = [];

io.on("connection", socket => {
    socket.on("newMessage", ({message})=>{
        socket.broadcast.emit("messageNotif", {
            message,
            nickname: socket.nickname || "Anon"
        })
    });
    socket.on("setNickname", ({nickname})=> {
        socket.nickname = nickname;
    });
});

