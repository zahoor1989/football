import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener, AfterContentChecked, OnChanges } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from "src/app/_services/storage.service";

//declare var $: any;

@Component({
  selector: "app-full-layout",
  standalone: true,
  imports:[RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnInit {

  constructor(public router: Router, private storageService: StorageService) {}
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  public userRole = "ROLE_USER";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }


  ngOnInit() {
    debugger
    if (this.router.url === "/") {
      this.router.navigate(["dashboard"]);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
    if(this.storageService.getUser()){
      // getting the roles
      this.userRole = this.storageService.getUser().roles[0];
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
