import { Component, OnInit } from '@angular/core';
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
  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    this.produits$ = this.produitsService.getProduits();
  }

}
