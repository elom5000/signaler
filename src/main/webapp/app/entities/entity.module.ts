import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'problemes',
        loadChildren: () => import('./problemes/problemes.module').then(m => m.SignalerProblemesModule)
      },
      {
        path: 'agence',
        loadChildren: () => import('./agence/agence.module').then(m => m.SignalerAgenceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SignalerEntityModule {}
