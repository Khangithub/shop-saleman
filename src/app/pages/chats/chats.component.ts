import { Component, OnInit } from "@angular/core";
import { ConfigService } from "src/app/config/config.service";
import { ChatService } from "src/app/config/socket.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.css"],
})
export class ChatsComponent implements OnInit {
  currentUser;
  content: string = "";
  constructor(private _chatService: ChatService, private api: ConfigService) {}

  async ngOnInit() {
    this.currentUser = await this.api.getCurrentUser();
    this._chatService.joinRoom(
      "5eb13649cc26cc53d0bb2632-5e7330cd57787b33a8b01225-5e4ac9b59fb2690714b40bf9-buying"
    );
  }

  sendMsg() {
    const d = new Date();
    this._chatService.sendMessage({
      content: this.content,
      room: "5eb13649cc26cc53d0bb2632-5e7330cd57787b33a8b01225-5e4ac9b59fb2690714b40bf9-buying",
      product: "5e4ac9b59fb2690714b40bf9",
      from: this.currentUser._id,
      type: "text",
      createdAt: d.toString(),
    });
    this.content = "";
  }
}
