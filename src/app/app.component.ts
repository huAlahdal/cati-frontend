import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    const roleId = this.auth.getRole();
    if (roleId === 2) {
        this.auth.logout();
      } else {
        this.auth.autoLogin();
      }
  }
}
