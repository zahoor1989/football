import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  notifier: NotifierService;
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
   this.redirectPage();
  }
  ngAfterViewInit(): void {
    this.redirectPage();
  }
  onSubmit(): void {
    const { username, password } = this.form;
    try {
      this.authService.login(username, password).subscribe({
        next: (data) => {
          this.storageService.setSession(data.token);
          // delete token from data
          this.storageService.saveUser({ email: data.email, id: data.id, roles : data.roles, username: data.username});

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          // this.reloadPage();
          this.redirectPage();
        },
        error: (err) => {
          this.notifier.notify('error', 'login failed');
        },
        complete: () => {
          // this.notifier.notify('error', 'login failed');
        }
      });
    }catch(err:any) {
      this.notifier.notify('error', 'login failed');
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  userChoice(choice: any): void {
    this.router.navigateByUrl(`/${choice}`)
  }

  redirectPage(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      if(this.roles.includes("ROLE_ADMIN")) {
        this.router.navigateByUrl('/admin/dashboard')
      }else if(this.roles.includes("ROLE_COACH")) {
        this.router.navigateByUrl('/coach/dashboard')
      }else if(this.roles.includes("ROLE_REFEREE")){
        this.router.navigateByUrl('/referee/dashboard')
      }else {
        this.router.navigateByUrl('/404')
      }
    } else {
      this.isLoggedIn = false
      this.router.navigate(['login'])
    }
  }
  ngOnDestroy(): void {
    this.reloadPage()
  }
}
