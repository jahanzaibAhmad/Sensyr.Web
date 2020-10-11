import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { SharedService } from '@app/shared/services/shared.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  date: string;
  time: string;
  welcomeStatus: string;
  toggleNavbar: boolean;
  userFullName: string;
  constructor(
    private sharedService: SharedService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.userFullName = this.authenticationService.userFullName;
    const source = interval(1000);
    const subscribe = source.subscribe(
      val => {
        this.date = this.sharedService.getDate();
        this.time = this.sharedService.getTime();
        this.welcomeStatus = this.sharedService.welcomeStatus();
      });
  }

  mobileSidebar(){
    this.toggleNavbar = !this.toggleNavbar;
  }

  sidebarClose() {
    this.toggleNavbar = false;
  }
}
