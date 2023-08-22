import { Component, AfterViewInit, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { StorageService } from 'src/app/_services/storage.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnChanges {
  showMenu = '';
  showSubMenu = '';
  @Input() userRole:string = 'ROLE_USER';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
    ) {}

    addExpandClass(element: string) {
      if (element === this.showMenu) {
        this.showMenu = '0';
      } else {
        this.showMenu = element;
      }
      this.sidebarnavItems = this.sidebarnavItems.map((sidebarnavItem) => {
        sidebarnavItem.title === element? sidebarnavItem.class = 'active': sidebarnavItem.class = ''
        return {
          ...sidebarnavItem,
          class: sidebarnavItem.class
        }
      })
    }
  ngOnChanges() {
    if(this.storageService.getUser()){
      // getting the roles
      this.userRole = this.storageService.getUser().roles[0];
    }
  }
  // End open close
  ngOnInit() {
    debugger
    console.log(this.activatedRoute.params, this.router.getCurrentNavigation());
    // get the query the params
    const user = this.storageService.getUser();
    if(user) {
      let userRoutes:any = ROUTES.find(item => item['role'] === this.userRole);
      this.sidebarnavItems = userRoutes['routes']
      userRoutes['routes'].forEach((item:any) => item.path === this.router.url? item.class = 'active': item.class = '')
    }
  }

}
