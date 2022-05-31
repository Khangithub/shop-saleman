import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/config/user.service";
import { SocketService } from "src/app/config/socket.service";
import { ChatService } from "src/app/config/chat.service";
import TimeUtil from "src/app/utils/timeUtil.js";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.scss"],
})
export class ChatsComponent implements OnInit {
  currentUser: any;
  content: string = "";
  chats: any[] = [];
  selectedProd: any;
  roomName: string = "";

  constructor(
    private _socketService: SocketService,
    private _userService: UserService,
    private _chatService: ChatService
  ) {}

  async ngOnInit() {
    this.currentUser = await this._userService.getCurrentUser();
    this.chats = await this._chatService.getChats(this.currentUser._id);
  }

  async joinRoom(prod: any, buyer: string) {
    this.selectedProd = prod;
    this.roomName = `${buyer}-${this.selectedProd.saler._id}-${this.selectedProd._id}-buying`;
    this._socketService.joinRoom(this.roomName);
  }

  convertViaTime(time: string) {
    return TimeUtil.convertTimestamp(time);
  }

  sendMsg() {
    this._socketService.sendMessage({
      room: this.roomName,
      productId: this.selectedProd._id,
      productImage: this.selectedProd.productImage,
      productName: this.selectedProd.name,
      salerId: this.selectedProd.saler._id,
      salerUsername: this.selectedProd.saler.username,
      content: this.content,
      fromId: this.currentUser._id,
      type: "text",
      createdAt: new Date(),
    });

    this.content = "";
  }
}
