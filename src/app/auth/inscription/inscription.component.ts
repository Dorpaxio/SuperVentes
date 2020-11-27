import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  showPassword = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
