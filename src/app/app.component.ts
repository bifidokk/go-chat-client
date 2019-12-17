import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WebsocketService} from './websocket';
import {WS} from './websocket.events';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private messages$: Observable<IMessage[]>;

  constructor(
      private wsService: WebsocketService
  ) {
  }

  ngOnInit() {
    // get messages
    this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);
    this.messages$.subscribe(console.log);
  }

  public sendMessage(): void {
    this.wsService.send(WS.SEND.SEND_TEXT, 'My Message Text');
  }
}
