import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SocketService } from './services/socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  public messages: object[] = [];
  public connection;
  public message;

  constructor(private socket: SocketService) {}

  public ngOnInit(): void {
    this.connection = this.socket.getMessages()
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  public sendMessage(): void {
    this.socket.sendMessage(this.message);
    this.message = '';
  }

  public ngOnDestroy(): void {
    this.connection.unsubscribe();
  }
}
