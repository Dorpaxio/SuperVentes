import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProduitsService} from '../../services/produits.service';
import {Observable} from 'rxjs';
import Produit from '../../models/Produit';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss']
})
export class MagasinComponent implements OnInit {

  produits$: Observable<Produit[]>;

  sorting: { value: string, display: string }[] = [
    {value: 'nom', display: 'Alphanumérique croissant'},
    {value: 'prix', display: 'Prix croissant'},
    {value: '-prix', display: 'Prix décroissant'},
    {value: '-nom', display: 'Alphanumérique décroissant'},
    {value: '', display: 'Aucun tri'}
  ];

  query: { categorie?: string, sort?: string } = {};

  constructor(private produitsService: ProduitsService) {
  }

  ngOnInit(): void {
    this.updateProduits();
  }

  updateProduits() {
    this.produits$ = this.produitsService.getProduits(this.query);
  }

}
