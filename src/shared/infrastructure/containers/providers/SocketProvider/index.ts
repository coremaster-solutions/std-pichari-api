import { NotificationModel } from "@/notifications/domain/models";
import { optionsCorsGlobal } from "@/shared/infrastructure/http";
import { Server as HttpServer } from "node:http";
import { Server, Socket } from "socket.io";
import { ISocketProvider } from "../models";
import { DocumentNumbersByType } from "@/documents/domain/models";

export class SocketProvider implements ISocketProvider {
  public static instance: SocketProvider;
  public io: Server;
  public users: { [uid: string]: string };

  constructor(httpServer: HttpServer) {
    SocketProvider.instance = this;
    this.users = {};
    this.io = new Server(httpServer, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: optionsCorsGlobal,
      connectionStateRecovery: {
        // Recovery connection
      },
    });
    this.io.on("connection", this.startListeners);
    console.log("Socket connect");
  }
  instanceIO(): Server {
    return this.io;
  }

  startListeners = (socket: Socket) => {
    console.info("Message received from " + socket.id);

    socket.on("add_user", (userId) => {
      console.log("add_user", userId);
      this.users[userId] = socket.id;
    });

    socket.on(
      "join_room",
      (roomName: string, cb: (rooms: Set<string>) => void) => {
        console.log(`Joining to ${roomName} ...`);

        socket.join(roomName);
        console.log(socket.rooms);

        cb(socket.rooms);
      }
    );

    socket.on("leave_room", (roomName: string) => {
      console.log(`Leaving to ${roomName} ...`);

      socket.leave(roomName);
      console.log(socket.rooms);
    });

    socket.on(
      "send_message",
      (userId: string, message: string, roomName: string) => {
        console.log("send_message", message, roomName);
        const socketId = this.users[userId];

        console.log(this.users, socketId);

        socket.to(roomName).emit("new_message", message);
        console.log("new_message", message);
      }
    );

    socket.on(
      "last_notifications",
      (notifications: NotificationModel[], roomName: string) => {
        console.log("last", notifications);

        socket.to(roomName).emit("new_notifications", notifications);
      }
    );

    socket.on(
      "dynamic_document_number",
      (nextDocumentNumber: DocumentNumbersByType, roomName: string) => {
        socket.to(roomName).emit("next_document_number", nextDocumentNumber);
      }
    );

    socket.on(
      "handshake",
      (callback: (uid: string, users: string[]) => void) => {
        console.info("Handshake received from " + socket.id);

        const reconnected = Object.values(this.users).includes(socket.id);

        if (reconnected) {
          console.info("This user has reconnected");

          const uid = this.getUidFromSocketId(socket.id);
          const users = Object.values(this.users);

          if (uid) {
            console.info("Sending callback for reconnect ...");
            callback(uid, users);
            return;
          }
        }

        const users = Object.values(this.users);

        console.info("Sending callback for handshake ...");
        this.sendMessage(
          "user_connected",
          users.filter((id) => id !== socket.id),
          users
        );
      }
    );

    socket.on("disconnect", () => {
      console.info("Disconnect received from " + socket.id);

      const uid = this.getUidFromSocketId(socket.id);

      if (uid) {
        delete this.users[uid];
        const users = Object.values(this.users);
        this.sendMessage("user_disconnected", users, uid);
      }
    });
  };

  getUidFromSocketId = (id: string) =>
    Object.keys(this.users).find((uid) => this.users[uid] === id);

  sendMessage = (name: string, users: string[], payload?: Object) => {
    console.info(`Emmitting event: ${name} to `, users);
    users.forEach((id) =>
      payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)
    );
  };
}
