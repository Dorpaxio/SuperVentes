import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {catchError} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  showPassword = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
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

  connexion() {
    this.authService.connexion(this.form.value).pipe(
      catchError(err => {
        if (err.status === 400) {
          this.nbToastrService.danger('Merci de renseigner un mot de passe et un email.',
            'Connexion impossible.');
        } else if (err.status === 404) {
          this.nbToastrService.danger('Utilisateur introuvable, veuillez vérifier votre mot de passe ou votre email.',
            'Mauvais identifiants');
        } else {
          this.nbToastrService.danger(`Une erreur inconnue est survenue.`, 'Connexion impossible.');
        }
        return throwError(err);
      })
    ).subscribe(data => {
      this.router.navigate(['/'])
        .then(() => this.nbToastrService.success('Vous êtez maintenant connecté.', 'Connexion réussie'));
    });

  }

}
