import { Component, AfterViewInit, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    debugger
    console.log(changes,"changes")
    throw new Error('Method not implemented.');
  }
  OnChanges() {
    if(this.storageService.getUser()){
      // getting the roles
      this.userRole = this.storageService.getUser().roles[0];
    }
  }
  // End open close
  ngOnInit() {
    debugger
    const user = this.storageService.getUser();
    if(user) {
      // this.userRole = user.roles[0];
      let userRoutes:any = ROUTES.find(item => item['role'] === this.userRole);
      this.sidebarnavItems = userRoutes['routes']
    }
  }
}
