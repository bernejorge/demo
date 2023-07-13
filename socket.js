const socketIO = require("socket.io");
let io;

function configureSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: '*',
    },
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    // Enviar un mensaje al cliente cuando se conecta
    socket.emit("bienvenida", "¡Bienvenido al servidor de Socket.IO!");

    // Manejar otros eventos o lógica específica del cliente

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
}

function getIO() {
  return io;
}

module.exports = {
  configureSocket,
  getIO,
};
