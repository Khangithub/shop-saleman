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
  msgs: any[] = [];
  selectedProd: any;
  selectedIndex: number = 0;
  roomName: string = "";
  buyer: any;

  constructor(
    private _socketService: SocketService,
    private _userService: UserService,
    private _chatService: ChatService
  ) {}

  async ngOnInit() {
    this.currentUser = await this._userService.getCurrentUser();
    this.chats = await this._chatService.getChats(this.currentUser._id);
    this.msgs = await this._chatService.getMsgs(this.chats[0].room);
    this.selectedProd = this.chats[0].product;
    this.roomName = this.chats[0].room;
    this.buyer = this.chats[0].buyer;
  }

  async joinRoom(prod: any, buyer: any, i: number) {
    this.buyer = buyer;
    this.selectedProd = prod;
    this.roomName = `${buyer._id}-${this.selectedProd.saler._id}-${this.selectedProd._id}-buying`;
    this.msgs = await this._chatService.getMsgs(this.roomName);
    this._socketService.joinRoom(this.roomName);
    this.selectedIndex = i;
  }

  convertViaTime(time: string) {
    return TimeUtil.convertTimestamp(time);
  }

  sendMsg() {
    if (this.content) {
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
    }

    this.content = "";
  }

  enter2SendMsg(e: any) {
    this.content = e.target.value;
    if (e.key === "Enter") {
      return this.sendMsg();
    }
  }
}
