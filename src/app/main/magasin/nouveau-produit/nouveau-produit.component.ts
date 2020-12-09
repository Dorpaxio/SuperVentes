import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProduitsService} from '../../../services/produits.service';
import {NbToastrService} from '@nebular/theme';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nouveau-produit',
  templateUrl: './nouveau-produit.component.html',
  styleUrls: ['./nouveau-produit.component.scss']
})
export class NouveauProduitComponent implements OnInit {

  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required)
  });

  constructor(private produitsService: ProduitsService,
              private nbToastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  addProduit() {
    this.produitsService.addProduit(this.form.value).pipe(
      catchError(err => {
        this.nbToastrService.danger(`Une erreur inconnue s'est produite.`,
          'Création impossible');
        return throwError(err);
      })
    ).subscribe(produit => {
      this.router.navigate(['/magasin'])
        .then(() => this.nbToastrService.success(`Le produit "${produit.nom}" a été ajouté avec succès.`,
          'Produit ajouté'));
    });
  }

}
