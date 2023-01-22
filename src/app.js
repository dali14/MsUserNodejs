const mongoose = require("mongoose")
const express = require("express")
const app = express();
const { GetUser,CreateUser } = require('./controllers/userController');
//////////////GRPC 
const { startGrpcServer, getGrpcServer } = require("./grpc");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/protos/user.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {

    keepCase: true,
    longs: String,
    defaults: true,
    oneofs: true,
});
const user_proto = grpc.loadPackageDefinition(packageDefinition);
startGrpcServer();
const server = getGrpcServer();
server.addService(user_proto.UserService.service,{
    //////
    CreateUser,
    GetUser,

});

/////////////////////////
const port = 3001
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
// DB Connection 
mongoose.connect('mongodb://localhost:27017/user',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected successfully to MongoDB !'))
    .catch(() => console.log('Connection failed to MongoDB !'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
const userRoutes = require("./routes/user");


app.use('/user/', userRoutes);


// Starting a server
app.listen(port, () => console.log('server is running on ' + port));