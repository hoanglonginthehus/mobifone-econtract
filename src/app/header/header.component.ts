import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faBell = faBell;
  faUser = faUser;
  faLogOut = faRightFromBracket;
  accountName = localStorage.getItem('name');

  constructor(private router: Router) { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
