import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  //Aux
  loadLogout: boolean = false;
  userNameAuthenticated: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserAuthenticated();
  }

  /*
    Method to logout user
  */
  logout() {
    //Enable spinner to logout
    this.loadLogout = true;

    // API Call from cognito
    Auth.signOut().then(res => {
      console.log('Sesion cerrada', res);
      //Redirect to auth component
      this.router.navigate(['./auth/login']);
      //Disable spinner to logout
      this.loadLogout = false;
    })
    .catch(error => {
      // Error
      console.log(error.message);
      // Disable spinner to logout
      this.loadLogout = false;
    })
  }

  getUserAuthenticated() {
    Auth.currentAuthenticatedUser().then(user => {
      this.userNameAuthenticated = user.attributes.email;
    })
      .catch(error => {
        console.log(error.message);
      })
  }

}
