import {Component, OnInit} from '@angular/core';
import {ProduitsService} from '../../services/produits.service';
import {BehaviorSubject, Observable} from 'rxjs';
import Produit from '../../models/Produit';
import {debounceTime, distinctUntilChanged, skip, tap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import listAnimation from '../../shared/animations/listAnimation';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '5px'
      })),
      state('closed', style({
        left: '-30px'
      })),
      transition('open => closed', [
        animate('100ms ease-out')
      ]),
      transition('closed => open', [
        animate('100ms ease-out')
      ]),
    ]),
    listAnimation
  ]
})
export class MagasinComponent implements OnInit {

  produits$: Observable<Produit[]>;
  nbProduits: number;
  categories: string[];

  sorting: { value: string, display: string }[] = [
    {value: 'nom', display: 'Alphanumérique croissant'},
    {value: 'prix', display: 'Prix croissant'},
    {value: '-prix', display: 'Prix décroissant'},
    {value: '-nom', display: 'Alphanumérique décroissant'},
    {value: '', display: 'Aucun tri'}
  ];

  private searchSubject: BehaviorSubject<string>;
  search$: Observable<string>;

  query: { categorie?: string, sort?: string, search?: string } = {};

  plus = false;

  constructor(private produitsService: ProduitsService) {
    this.searchSubject = new BehaviorSubject<string>('');
    this.search$ = this.searchSubject.asObservable();
  }

  ngOnInit(): void {
    this.updateProduits();
    this.produitsService.getCategories().subscribe(categories => this.categories = categories);
    this.search$
      .pipe(
        debounceTime(500),
        skip(1)
      )
      .subscribe(search => {
        this.query.search = search;
        this.updateProduits();
      });
  }

  updateProduits() {
    this.produits$ = null;
    if (!this.query.categorie) {
      delete this.query.categorie;
    }
    this.produits$ = this.produitsService.getProduits(this.query)
      .pipe(
        tap(produits => this.nbProduits = produits.length)
      );
  }

  set search(search: string) {
    this.searchSubject.next(search);
  }

  get search(): string {
    return this.query.search;
  }

  removeFilter(): void {
    this.query = {};
    this.updateProduits();
  }

  openPlus() {
    this.plus = true;
  }

  closePlus() {
    this.plus = false;
  }

}
