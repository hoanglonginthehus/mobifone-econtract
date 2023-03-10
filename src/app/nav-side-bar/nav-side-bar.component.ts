import { Component } from '@angular/core';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.css']
})
export class NavSideBarComponent {

  listNav = [
    {
      'path': 'home',
      'icon': faHome,
      'name': 'Trang chủ'
    },
    {
      'path': 'user',
      'icon': faUser,
      'name': 'Người dùng'
    },
    {
      'path': 'organization',
      'icon': faUserGroup,
      'name': 'Tổ chức'
    },
    {
      'path': 'service',
      'icon': faUser,
      'name': 'Gói dịch vụ'
    }
  ]



}
