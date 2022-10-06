const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const EncryptRsa = require('encrypt-rsa').default;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User is Connected: ${socket.id}`);

  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(`${data.userName} Joined: ${data.room}`);
  });
  socket.on("sendMessage", (data) => {
    // console.log(data);
    // dataofuser = data
    var encryptedText = encryptRsa.encryptStringWithRsaPublicKey({ 
      text: data?.message,   
      publicKey:publicKey2,
    });
    console.log(encryptedText)

    const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({ 
      text: encryptedText, 
      privateKey:privateKey2
    });
    console.log(decryptedText)

    socket.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is Running...");
});

const encryptRsa = new EncryptRsa();
const { privateKey: privateKey1, publicKey: publicKey1 } = encryptRsa.createPrivateAndPublicKeys();
const encryptRsa2 = new EncryptRsa();
const { privateKey:privateKey2, publicKey:publicKey2 } = encryptRsa2.createPrivateAndPublicKeys();
localStorage.setItem("private1", privateKey1)
localStorage.setItem("public1", publicKey1)
localStorage.setItem("private2", privateKey2)
localStorage.setItem("public2", publicKey2)


