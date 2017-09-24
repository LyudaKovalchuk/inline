import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Credentials } from '../../interfaces/credentials';

@Component({
  selector: 'inline-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.css']
})
export class SigninComponent implements OnInit {

  private model: Credentials = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.model)
      .subscribe((user) => this.router.navigate(['/']));
  }

}
