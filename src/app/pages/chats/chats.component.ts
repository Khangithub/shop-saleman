import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/config/user.service";
import { SocketService } from "src/app/config/socket.service";
import { ChatService } from "src/app/config/chat.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.scss"],
})
export class ChatsComponent implements OnInit {
  currentUser: any;
  content: string = "";
  chats: any[] = [];

  constructor(
    private _socketService: SocketService,
    private _userService: UserService,
    private _chatService: ChatService
  ) {}

  async ngOnInit() {
    this.currentUser = await this._userService.getCurrentUser();
    this.chats = await this._chatService.getChats(this.currentUser._id);
    this._socketService.joinRoom(
      "5eb13649cc26cc53d0bb2632-5e7330cd57787b33a8b01225-5e4ac9b59fb2690714b40bf9-buying"
    );
  }

  convertViaTime(time: string) {}

  sendMsg() {
    this._socketService.sendMessage({
      content: this.content,
      room: "5eb13649cc26cc53d0bb2632-5e7330cd57787b33a8b01225-5e4ac9b59fb2690714b40bf9-buying",
      product: "5e4ac9b59fb2690714b40bf9",
      from: this.currentUser._id,
      type: "text",
      createdAt: new Date(),
    });

    this.content = "";
  }
}
