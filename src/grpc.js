const PROTO_PATH = __dirname + "/protos/user.proto";
const grpc = require("@grpc/grpc-js");
const server = new grpc.Server();

exports.startGrpcServer = function(){
    server.bindAsync(
        "127.0.0.1:50050",
        grpc.ServerCredentials.createInsecure(),
        (error,port) =>{
            if(error) console.error(error);
            else {
                console.log(`server runing at 127.0.0.1:${port}`);
                server.start();
        }
        }
    );
};

exports.getGrpcServer = function(){
    return server ;
};