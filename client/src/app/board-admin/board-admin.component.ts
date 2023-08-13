import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {topcard, topcards} from '../dashboard/dashboard-components/top-cards/top-cards-data';
import { Store } from '@ngrx/store';
// importing selectors
import * as UserSelectors from "../_store/selectors/users.selectors";
import * as TeamSelectors from "../_store/selectors/teams.selectors";
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  topcards:topcard[];
  users: any = [];
  teams: any = [];

  constructor(private userService: UserService,  private router: Router, private storageService: StorageService) {
    this.topcards=topcards;
  }

  ngOnInit(): void {
    debugger

    if (!this.storageService.isLoggedIn()) {
      this.router.navigateByUrl("/login");
    } else {
      this.userService.getAdminBoard().subscribe({
        next: data => {
          this.content = data.content;
        },
        error: err => {
          if (err.error) {
            try {
              const res = JSON.parse(err.error);
              this.content = res.message;
            } catch {
              this.content = `Error with status: ${err.status} - ${err.statusText}`;
            }
          } else {
            this.content = `Error with status: ${err.status}`;
          }
        }
      });
    }
  }
}
