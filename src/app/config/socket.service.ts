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

  sendMessage(data: any) {
    this.socket.emit("send_message", data);
  }

  newMessageReceived() {
    let observable = new Observable(
      (observer) => {
        this.socket.on("receive_message", (data) => {
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
