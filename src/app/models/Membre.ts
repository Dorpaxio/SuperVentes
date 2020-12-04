import Produit from './Produit';

export default class Membre {
  // tslint:disable-next-line:variable-name
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  panier: {
    produit: string | Produit;
    quantity: number;
  }[];
}
