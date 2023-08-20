import { Component } from '@angular/core';
import * as AcademyActions from "../../_store/actions/academies.actions";
// importing selectors
import * as AcademySelectors from "../../_store/selectors/academies.selectors";
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-squad-management',
  templateUrl: './squad-management.component.html',
  styleUrls: ['./squad-management.component.scss']
})
export class SquadManagementComponent {
  public academies: any = []
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.getAcademiesFromStore();
  }
  getAcademiesFromStore () {
    this.store.select(AcademySelectors.getAcademies).subscribe(academy => {
      this.academies = academy;
      });
    }

}
