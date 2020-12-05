import { Pipe, PipeTransform } from '@angular/core';
import Produit from '../../models/Produit';

@Pipe({
  name: 'montantTotal'
})
export class MontantTotalPipe implements PipeTransform {

  transform(value: {produit: Produit, quantity: number}[]): number {
    return !value ? 0 : value.map(el => el.quantity * el.produit.prix)
      .reduce((acc, next) => acc + next, 0);
  }

}
