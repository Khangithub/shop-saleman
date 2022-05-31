import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class SocketService {
  private socket = io.connect(environment.APP_ROOT);

  joinRoom(roomName: string) {
    this.socket.emit("join_room", roomName);
  }

  newUserJoined() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on("new user joined", (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit("leave", data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on("left room", (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }

  sendMessage(data: any) {
    this.socket.emit("send_message", data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on("new message", (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }
}
