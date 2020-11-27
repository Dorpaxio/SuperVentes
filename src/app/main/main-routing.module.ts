import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main.component';
import {MagasinComponent} from './magasin/magasin.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: 'magasin', component: MagasinComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
