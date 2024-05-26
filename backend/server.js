
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute")
const taksRoutes = require("./routes/tasksRoute")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const {notFound,errorHandler} = require("./middleware/errorMiddleware")
const path = require("path");


dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use('/users',userRoutes);
app.use('/tasks',taksRoutes);
app.use('/chats',chatRoutes);
app.use('/messages',messageRoutes);

// deployement
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API  is running..");
    });
  }

// deployment end

app.use(notFound);
app.use(errorHandler);



// app.get("/", (req, res) => {
//     res.send("API  is running..");
//   });


const PORT=process.env.PORT || 5000;
const server = app.listen(PORT,console.log("server is  running"+ `${PORT}` + `${process.env.NODE_ENV}`));

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin: "http://localhost:3000",
  },
});
io.on("connection",(socket)=>{
  console.log('connected to socket io')
  socket.on('setup',(userData)=>{
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit('connected');
  });
  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log('users joined room'+room);
  });

  socket.on('typing',(room)=>{
    socket.in(room).emit('typing');
  })
  socket.on('stop typing',(room)=>{
    socket.in(room).emit('stop typing');
  })

  socket.on('new message',(new_Message_Recieved)=>{
    var chat = new_Message_Recieved.chat;
    if(!chat.users) return console.log('users not defined');
    chat.users.forEach((user)=>{
      if(user._id != new_Message_Recieved.sender._id){
      socket.in(user._id).emit("message recieved",new_Message_Recieved);

      }
    })
  })
});
