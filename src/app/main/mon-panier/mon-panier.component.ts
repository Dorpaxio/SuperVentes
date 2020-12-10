import {Component, OnInit} from '@angular/core';
import {MembresService} from '../../services/membres.service';
import Produit from '../../models/Produit';
import {NbToastrService} from '@nebular/theme';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ProduitsService} from '../../services/produits.service';
import {MontantTotalPipe} from '../../shared/pipes/montant-total.pipe';
import {CurrencyPipe} from '@angular/common';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import listAnimation from '../../shared/animations/listAnimation';

@Component({
  selector: 'app-mon-panier',
  templateUrl: './mon-panier.component.html',
  styleUrls: ['./mon-panier.component.scss'],
  animations: [listAnimation]
})
export class MonPanierComponent implements OnInit {

  panier: { produit: Produit, quantity: number }[];

  constructor(private membresService: MembresService,
              private nbToastrService: NbToastrService,
              private produitsService: ProduitsService,
              private montantTotalPipe: MontantTotalPipe,
              private currencyPipe: CurrencyPipe) {
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
        const promises: Promise<{ produit: Produit, quantity: number }>[] = [];
        for (const el of data) {
          promises.push(new Promise<{ produit: Produit, quantity: number }>((resolve, reject) => {
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

  deletePanier(paiement: boolean = false) {
    this.membresService.deletePanier()
      .pipe(
        catchError(err => {
          this.nbToastrService.danger(`Votre panier n'a pas pu être vider.`, 'Erreur inconnue');
          return throwError(err);
        })
      )
      .subscribe(() => {
        if (paiement) {
          const montant = this.currencyPipe.transform(this.montantTotalPipe.transform(this.panier), '€');
          this.nbToastrService.success(`Vous êtes désormais pauvre car vous avez dépensé ${montant}.`,
            'Opération réussie.');
        } else {
          this.nbToastrService.success('Votre panier a bien été vidé.', 'Panier vidé');
        }
        this.panier = [];
      });
  }

  get isPanierSet(): boolean {
    return this.panier !== undefined;
  }

  get isPanierEmpty(): boolean {
    return this.panier.length === 0;
  }

  increaseProduitQuantity(element: { produit: Produit, quantity: number }): void {
    this.membresService.addToPanier(element.produit).subscribe(() => {
      element.quantity++;
      this.panier = this.panier.map(el => el.produit._id === element.produit._id ? element : el);
    });
  }

  decreaseProduitQuantity(element: { produit: Produit, quantity: number }): void {
    this.membresService.addToPanier(element.produit, -1).subscribe(() => {
      element.quantity--;
      if (element.quantity === 0) {
        this.panier = this.panier.filter(el => el.produit._id !== element.produit._id);
      } else {
        this.panier = this.panier.map(el => el.produit._id === element.produit._id ? element : el);
      }
    });
  }

  deleteProduit(element: { produit: Produit, quantity: number }): void {
    this.membresService.addToPanier(element.produit, -element.quantity).subscribe(() => {
      this.panier = this.panier.filter(el => el.produit._id !== element.produit._id);
    });
  }

}
