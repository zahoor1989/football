import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/_services/user.service';
import * as UserActions from '../../_store/actions/users.actions';
import * as PlayerSelectors from '../../_store/selectors/players.selectors';
import * as LeagueSelectors from '../../_store/selectors/leagues.selectors';
import { TeamService } from '../../_services/team.service';
import { NotifierService } from 'angular-notifier';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { PlayerService } from 'src/app/_services/player.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

@Component({
  selector: 'app-coach-academy-details',
  templateUrl: './coach-academy-details.component.html',
  styleUrls: ['./coach-academy-details.component.scss'],
})
export class CoachAcademyDetailsComponent {
  @ViewChild('myTable') table: any;
  private notifier: NotifierService;
  options = {};
  data: any = [];
  columns: any = [
    { prop: 'firstname' },
    { name: 'lastname' },
    { name: 'dob' },
    { name: 'email' },
  ];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  public academy: any = {};
  public team: any = {};
  public leagues: any = [];
  public playerForm: FormGroup;
  public coach: any = {};
  public selectedLeague : any = null;
  public submitted: boolean = false;
  public eidStaticNo = '784-1234-1234567-1';
  public file: File | undefined;
  public images: any = [];
  public eidImages : any = {
    eidFront: null,
    eidBack: null
  }
  emiratesIdPattern = '^\d\d\d\-\d\d\d\d\-\d\d\d\d\d\d\d\-\d$';
  playerExists: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    notifier: NotifierService,
    private storageService: StorageService,
    private palyerService: PlayerService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.notifier = notifier;
    this.submitted = false;
    this.playerForm = new FormGroup({
      firstName: new FormControl(''),
      surName: new FormControl(''),
      squadNo: new FormControl(''),
      dob: new FormControl(''),
      league: new FormControl(''),
      playerEidNo: new FormControl(''),
      eidFront: new FormControl(''),
      eidBack: new FormControl(''),
      playingUp: new FormControl(''),
    });
  }
  ngOnInit() {
    const eidPattern = new RegExp('^\\d\\d\\d\\-\\d\\d\\d\\d\\-\\d\\d\\d\\d\\d\\d\\d\\-\\d$', 'gm');
    this.playerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        surName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30)
          ]
        ],
        squadNo: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(3)
          ]
        ],
        dob: ['', Validators.required],
        league: ['', Validators.required],
        playerEidNo: [null, [Validators.required, Validators.pattern(eidPattern), Validators.maxLength(18)]],
        eidFront: ['', Validators.required],
        eidBack: ['', Validators.required],
        playingUp: ['', Validators.required]
      });
    // get the team id
    let teamId = this.activatedRoute.snapshot.params['id'];
    // Now get team by id
    this.teamService.getTeamById(teamId).subscribe((res: any) => {
      if (!res.message) {
        this.academy = res.academy_id;
        this.team = res;
        this.getPlayersFromStore();
      } else {
        this.notifier.notify('Error', 'Academy not found!');
      }
    });
    this.getLeaguesFromStore();
    // get logged in coach
    this.coach = this.storageService.getUser();


    // get all the saved files
    this.palyerService.getListFiles().subscribe((res: any) => {
      if(res){
        this.images = res;
      }
      console.log(res,"saved files on nodejs")
    })
  }

  onFormSubmit = () => {
    this.submitted = true;

    if (this.playerForm.invalid) {
      this.notifier.notify('error', 'Please fill all the required fields!');
      return;
    } else if(!this.selectedLeague){
        this.notifier.notify('error', 'League is not selected!');
        return;
    } else {
      const ageInYear = this.getAge(this.playerForm.value.dob);
      // const selectedLeague = this.leagues.find((league: any) => league.selected);
      // const leagueAgeLimit = this.getAgeFromName(this.selectedLeague.leagueName);
      if(this.selectedLeague.leagueAgeLimit < ageInYear ){
        this.notifier.notify('error', 'You are not eligible for this league!');
        return;
      }
      const playerObj = {
              firstName: this.playerForm.value.firstName,
              surName: this.playerForm.value.surName,
              dob: this.playerForm.value.dob,
              squadNo: this.playerForm.value.squadNo,
              league: this.selectedLeague._id,
              academy: this.academy._id,
              team: this.team._id,
              playerImage: this.playerForm.value.playerImage,
              eidNo: this.playerForm.value.playerEidNo,
              eidFront: this.eidImages.eidFront,
              eidBack: this.eidImages.eidBack,
              status: 'Pending',
              user: {
                createdBy: this.coach.id
              }
          }

      console.log(playerObj)
      this.palyerService.createPlayer(playerObj).subscribe((res:any) => {
        if(res){
          this.notifier.notify('success', res.message);
        }
      })
      };
    }
  getPlayersFromStore() {
    this.store.select(PlayerSelectors.getPlayers).subscribe((players) => {
      this.data = players.filter((player) => player.team && player.team._id === this.team._id);
    });
  }
  getLeaguesFromStore() {
    // getting leagues
    this.store.select(LeagueSelectors.getLeagues).subscribe((leagues) => {
      if (leagues) {
        this.leagues = leagues.map((league:any) => {
                      return {
                        ...league,
                        selected: false
                      }
                    });
      }
    });
  }
  edit(value: any) {
    this.userService.deleteUser(value).subscribe((result: any) => {
      console.log(result);
      this.store.dispatch(UserActions.loadUsers());
    });
  }

  deletePlayer(value: any) {
    debugger
    this.userService.deleteUser(value).subscribe((result: any) => {
      this.store.dispatch(UserActions.loadUsers());
    });
  }
  onCheckBox(lg: any) {
    this.selectedLeague = this.leagues.find((league: any) => league._id === lg._id);
    this.leagues = this.leagues.map((league:any) => {
      return {
        ...league,
        selected: lg._id === league._id? true : false,
      }
    });
  }
  uploadEmiratesID(event: any) {
   const file: File = event.target.files[0];
   const inputName = event.target.name;
    this.palyerService.upload(file).subscribe((res:any) => {
      if(res){
        this.eidImages[inputName] = res.filename;
        try {
          this.notifier.notify('success', `${res.message}`);
        } catch(error) {
          console.log(error)
        }
      }
    })
  }

  get f() { return this.playerForm.controls; }

  getAge (dob: any) {
    const birth = new Date((new Date(dob)).getFullYear() , (new Date(dob)).getMonth() - 1, (new Date(dob)).getDay())
    const now = new Date()
    const diff = new Date(now.valueOf() - birth.valueOf())
    return Math.abs(diff.getFullYear() - 1970)
  }

  getAgeFromName (leagueName:any) {
    let nameArray = leagueName.match(/(\d+)/)
    return nameArray.find((nm:any) => !isNaN(nm))
   }


  onDeletePlayer(leagueId:any) {
    debugger
    this.openConfirmationDialog(leagueId);
  }

  public openConfirmationDialog(id:any) {
    this.confirmationDialogService.confirm('Please confirm', 'Do you really want to delete Player?')
    .then((confirmed) => this.deletePlayer(id))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  // if eid already exist
  playerbyEmirateId(event:any) {
    debugger
    const id = event.target.value;
    if(id && id.length > 17 ) {
      const pattern = new RegExp('^\\d\\d\\d\\-\\d\\d\\d\\d\\-\\d\\d\\d\\d\\d\\d\\d\\-\\d$', 'gm')
      if(pattern.test(id)){
        this.palyerService.getPlayerbyEmirateId(id).subscribe(res => {
          if(res._id || res._emiratesIdNo) {
            this.playerExists = true
            this.notifier.notify('error', 'Player having this Emirates ID already exists!');
          } else {
            this.playerExists = false
          }
        })
      }
    }

  }

  redirectTo() {
    this.router.navigate(['/coach/teams']);
  }
}
