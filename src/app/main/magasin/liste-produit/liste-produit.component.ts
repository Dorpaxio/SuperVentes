import {Component, Input, OnInit} from '@angular/core';
import Produit from '../../../models/Produit';
import {MembresService} from '../../../services/membres.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit {

  @Input() produits: Produit[];

  constructor(private membresService: MembresService) {
  }

  ngOnInit(): void {
  }

  addProduit(produit: Produit): void {
    this.membresService.addToPanier(produit).subscribe(() => {
      console.log(produit.nom);
      this.membresService.addedToPanier.emit(produit.nom);
    });
  }

}
