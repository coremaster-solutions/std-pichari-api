import { Socket, Server } from "socket.io";

export interface ISocketProvider {
  startListeners(socket: Socket): void;
  instanceIO(): Server;
}
