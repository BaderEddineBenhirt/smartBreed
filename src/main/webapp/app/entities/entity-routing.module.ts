import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'animal',
        data: { pageTitle: 'intellcapApp.animal.home.title' },
        loadChildren: () => import('./animal/animal.module').then(m => m.AnimalModule),
      },
      {
        path: 'suivi',
        data: { pageTitle: 'intellcapApp.suivi.home.title' },
        loadChildren: () => import('./suivi/suivi.module').then(m => m.SuiviModule),
      },
      {
        path: 'nutrition',
        data: { pageTitle: 'intellcapApp.nutrition.home.title' },
        loadChildren: () => import('./nutrition/nutrition.module').then(m => m.NutritionModule),
      },
      {
        path: 'genetique',
        data: { pageTitle: 'intellcapApp.genetique.home.title' },
        loadChildren: () => import('./genetique/genetique.module').then(m => m.GenetiqueModule),
      },
      {
        path: 'sante',
        data: { pageTitle: 'intellcapApp.sante.home.title' },
        loadChildren: () => import('./sante/sante.module').then(m => m.SanteModule),
      },
      {
        path: 'conditions-de-vie',
        data: { pageTitle: 'intellcapApp.conditionsDeVie.home.title' },
        loadChildren: () => import('./conditions-de-vie/conditions-de-vie.module').then(m => m.ConditionsDeVieModule),
      },
      {
        path: 'maladie',
        data: { pageTitle: 'intellcapApp.maladie.home.title' },
        loadChildren: () => import('./maladie/maladie.module').then(m => m.MaladieModule),
      },
      {
        path: 'ferme',
        data: { pageTitle: 'intellcapApp.ferme.home.title' },
        loadChildren: () => import('./ferme/ferme.module').then(m => m.FermeModule),
      },
      {
        path: 'mendel',
        data: { pageTitle: 'intellcapApp.mendel.home.title' },
        loadChildren: () => import('./mendel/mendel.module').then(m => m.MendelModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
