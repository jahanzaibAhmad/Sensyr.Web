import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/shared/auth.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { SharedService } from '@app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
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
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
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

  logout(){
    this.authService.logout().subscribe(
      data => {
        this.router.navigate(['auth', 'login']);
        this.authenticationService.clearStorage();
      },
      error => {
        this.toastrService.error(error.error.errors.Email[0]);
      });
  }
}
