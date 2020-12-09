import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import Produit from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  apiEndpoint = environment.endpoint + '/produits';

  constructor(private http: HttpClient) {
  }

  getProduits(params?: {categorie?: string, sort?: string, search?: string}): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiEndpoint, {params});
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiEndpoint + '/categories');
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiEndpoint, produit);
  }

  getProduit(id: string): Observable<Produit> {
    return this.http.get<Produit>(this.apiEndpoint + '/' + id);
  }
}
