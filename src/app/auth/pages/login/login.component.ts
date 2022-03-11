import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  //Form to user
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  //Aux
  loadLogin: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    //If user is authenticated redirect to admin page
    Auth.currentAuthenticatedUser().then(user => {
      if (user) {
        this.router.navigate(['./admin']);
      }
    }).catch(err => {
    });
  }

  /*
    Method to login a user
  */
  login() {
    //Verify errors on form fields
    if(this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }
    //Enable spinner to login
    this.loadLogin = true;

    //Get parameters from form
    const { email, password } = this.userForm.value;

    //Call Api cognito to authentication
    Auth.signIn(email, password).then(user => {
      console.log('Usuario ', user);
      // Force Confirm password
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        Auth.completeNewPassword(user, password)
          .then(user => {
            //Signin  after confirm password
            Auth.signIn(email, password).then(user => {
              //Redirect now to admin page
              this.router.navigate(['./admin']);
              //Disable spinner to login
              this.loadLogin = false;
            })
            .catch(err => {
              console.log(err.message);
            })
          })
      }
      //Redirect now to admin page
      this.router.navigate(['./admin']);
      //Disable spinner to login
      this.loadLogin = false;
    })
    .catch(error => {
      console.log(error.message);
      //Disable spinner to login
      this.loadLogin = false;
    })
  }

  /*
    Method to mark as errors fields in a form
  */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
