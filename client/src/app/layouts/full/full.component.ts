import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener, AfterContentChecked, OnChanges, AfterViewInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from "src/app/_services/storage.service";
import { UserService } from "src/app/_services/user.service";

//declare var $: any;

@Component({
  selector: "app-full-layout",
  standalone: true,
  imports:[RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnInit {

  constructor(public router: Router, private storageService: StorageService, private userService: UserService) {}
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  public userRole = "ROLE_USER";
  public isLoggedIn = false;
  public loggedInUser:any = {};
  public unreadNotifications: any = [];

  Logo() {
    this.expandLogo = !this.expandLogo;
  }


  ngOnInit() {
    this.loggedInUser = this.storageService.getUser()
    if (this.router.url === "/") {
      this.router.navigate(["dashboard"]);
    }
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();

    const user = this.storageService.getUser()
    if(user){
      // getting the roles
      this.userRole = user.roles[0];
    }

  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }

}
