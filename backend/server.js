
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
app.listen(PORT,console.log("server is  running"+ `${PORT}` + `${process.env.NODE_ENV}`))