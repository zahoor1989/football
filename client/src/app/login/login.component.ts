import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
   this.redirectPage();
  }
  ngAfterViewInit(): void {
    this.redirectPage();
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe((data) => {

        this.storageService.setSession(data.token);
        // delete token from data
        this.storageService.saveUser({ email: data.email, id: data.id, roles : data.roles, username: data.username});

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // this.reloadPage();
        this.redirectPage();
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  redirectPage(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigateByUrl('/admin')
    } else {
      this.isLoggedIn = false
      this.router.navigate(['login'])
    }
  }
}
