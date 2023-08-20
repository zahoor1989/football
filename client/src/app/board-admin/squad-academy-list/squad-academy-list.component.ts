import { Component, OnInit } from '@angular/core';
import * as AcademyActions from "../../_store/actions/academies.actions";
// importing selectors
import * as AcademySelectors from "../../_store/selectors/academies.selectors";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-squad-academy-list',
  templateUrl: './squad-academy-list.component.html',
  styleUrls: ['./squad-academy-list.component.scss']
})
export class SquadAcademyListComponent implements OnInit {
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
