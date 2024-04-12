import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router , private AuthService: AuthService) { }

  ngOnInit() {
  }
onLoadServer(id: number) {
  this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdits:1}, fragment:'loading'})
}
login() {
    this.AuthService.logIn();
}

logout() {
    this.AuthService.logOut();
}

}
