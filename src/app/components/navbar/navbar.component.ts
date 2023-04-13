import { Component } from '@angular/core';
import { faUser, faRightFromBracket, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faList = faList;
  faPlus = faPlus;
}
