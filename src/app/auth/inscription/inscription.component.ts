import {Component, OnInit} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {NbComponentStatus, NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  showPassword = false;
  passwordStatus: NbComponentStatus = 'primary';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    prenom: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    passwordCheck: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private nbToastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get prenom(): AbstractControl {
    return this.form.get('prenom');
  }

  get nom(): AbstractControl {
    return this.form.get('nom');
  }

  checkPassword(): boolean {
    if (this.form.value.password === this.form.value.passwordCheck) {
      this.passwordStatus = 'primary';
      return true;
    } else {
      this.passwordStatus = 'danger';
      return false;
    }
  }

  inscription() {
    if (!this.checkPassword()) {
      this.nbToastrService.danger('Vos deux mots de passe ne sont pas identiques', 'Inscription impossible');
      return;
    }
    const {passwordCheck, ...body} = this.form.value;
    this.authService.register(body).pipe(
      catchError(err => {
        if (err.status === 400) {
          if (err.error.code === 'ME40006') {
            this.nbToastrService.danger('Cet email est déjà utilisé', 'Inscription impossible.');
          } else if (err.error.code === 'ME40002') {
            this.nbToastrService.danger('Merci de renseigner un mot de passe', 'Inscription impossible.');
          } else if (err.error.code === 'ME40003') {
            this.nbToastrService.danger('Merci de renseigner un email', 'Inscription impossible.');
          } else if (err.error.code === 'ME40004') {
            this.nbToastrService.danger('Merci de renseigner un nom', 'Inscription impossible.');
          } else if (err.error.code === 'ME40005') {
            this.nbToastrService.danger('Merci de renseigner un prenom', 'Inscription impossible.');
          } else {
            this.nbToastrService.danger('Une erreur inconnue est survenue.',
              'Inscription impossible.');
          }
        } else if (err.status === 409) {
          this.nbToastrService.danger('Votre mot de passe doit avoir plus de 8 caractères',
            'Mauvais identifiants');
        } else {
          this.nbToastrService.danger(`Une erreur inconnue est survenue.`, 'Connexion impossible.');
        }
        return throwError(err);
      })
    ).subscribe(data => {
      this.router.navigate(['/'])
        .then(() => this.nbToastrService.success('Vous êtez maintenant inscrit.', 'Inscription réussie'));
    });

  }
}
