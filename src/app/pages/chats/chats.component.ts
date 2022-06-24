import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/auth.service";
import { SocketService } from "src/app/services/socket.service";
import { ChatService } from "src/app/services/chat.service";
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
    private user_service: UserService,
    private _chatService: ChatService
  ) {
    this._socketService
      .newMessageReceived()
      .subscribe(
        ({
          isNewChat,
          room,
          productId,
          productImage,
          productName,
          salerId,
          salerUsername,
          content,
          fromId,
          type,
          createdAt,
          mediaList,
        }) => {
          // update msgs
          this.msgs = [
            ...this.msgs,
            { from: { _id: fromId }, content, createdAt, type, mediaList },
          ];

          // update chats
          if (isNewChat) {
            let newChat = {
              product: {
                productImage,
                _id: productId,
                name: productName,
                saler: {
                  username: salerUsername,
                  _id: salerId,
                },
              },
              room,
              messages: [
                {
                  type,
                  content,
                  from: {
                    _id: fromId,
                  },
                  createdAt,
                  mediaList,
                },
              ],
            };

            this.selectedIndex = 0;
            this.chats = [newChat, ...this.chats];
          } else {
            let chatIndex = this.chats.findIndex((chat) => chat.room === room);
            let currentChat = this.chats.splice(chatIndex, 1)[0];

            currentChat.messages[0] = {
              type,
              content,
              from: {
                _id: fromId,
              },
              createdAt,
              mediaList,
            };

            this.selectedIndex = 0;
            this.chats = [currentChat, ...this.chats];
          }
        }
      );
  }

  async ngOnInit() {
    this.currentUser = await this.user_service.getCurrentUser();
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
