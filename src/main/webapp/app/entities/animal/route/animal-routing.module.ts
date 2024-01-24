import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AnimalComponent } from '../list/animal.component';
import { AnimalDetailComponent } from '../detail/animal-detail.component';
import { AnimalUpdateComponent } from '../update/animal-update.component';
import { AnimalRoutingResolveService } from './animal-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const animalRoute: Routes = [
  {
    path: '',
    component: AnimalComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnimalDetailComponent,
    resolve: {
      animal: AnimalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnimalUpdateComponent,
    resolve: {
      animal: AnimalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnimalUpdateComponent,
    resolve: {
      animal: AnimalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(animalRoute)],
  exports: [RouterModule],
})
export class AnimalRoutingModule {}
