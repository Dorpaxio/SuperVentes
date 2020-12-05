import {Component, OnInit} from '@angular/core';
import {MembresService} from '../../services/membres.service';
import Produit from '../../models/Produit';
import {NbToastrService} from '@nebular/theme';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ProduitsService} from '../../services/produits.service';

@Component({
  selector: 'app-mon-panier',
  templateUrl: './mon-panier.component.html',
  styleUrls: ['./mon-panier.component.scss']
})
export class MonPanierComponent implements OnInit {

  panier: { produit: Produit, quantity: number }[];

  constructor(private membresService: MembresService,
              private nbToastrService: NbToastrService,
              private produitsService: ProduitsService) {
  }

  ngOnInit(): void {
    this.membresService.getPanier()
      .pipe(
        catchError(err => {
          this.nbToastrService.danger('Impossible de récupérer le contenu du panier', 'Erreur inconnue');
          return throwError(err);
        })
      )
      .subscribe(data => {
        const promises: Promise<{produit: Produit, quantity: number}>[] = [];
        for (const el of data) {
          promises.push(new Promise<{produit: Produit, quantity: number}>((resolve, reject) => {
            if (typeof el.produit === 'string') {
              this.produitsService.getProduit(el.produit).subscribe(produit => {
                resolve({produit, quantity: el.quantity});
              });
            } else {
              resolve({produit: el.produit, quantity: el.quantity});
            }
          }));
        }

        Promise.all(promises).then(panier => {
          this.panier = panier;
        });
      });
  }

  deletePanier() {
    this.membresService.deletePanier()
      .pipe(
        catchError(err => {
          this.nbToastrService.danger(`Votre panier n'a pas pu être vider.`, 'Erreur inconnue');
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.nbToastrService.success('Votre panier a bien été vidé.', 'Panier vidé');
      });
  }

}
