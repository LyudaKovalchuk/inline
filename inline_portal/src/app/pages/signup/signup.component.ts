import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services';
import { User } from '../../interfaces';

@Component({
  selector: 'inline-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit {

  private model: User = {
    email: '',
    name: '',
    password: '',
    re_password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.createUser(this.model)
      .subscribe((user) => this.router.navigate(['/']));
  }

}
