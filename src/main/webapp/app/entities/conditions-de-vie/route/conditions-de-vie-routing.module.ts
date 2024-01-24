import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConditionsDeVieComponent } from '../list/conditions-de-vie.component';
import { ConditionsDeVieDetailComponent } from '../detail/conditions-de-vie-detail.component';
import { ConditionsDeVieUpdateComponent } from '../update/conditions-de-vie-update.component';
import { ConditionsDeVieRoutingResolveService } from './conditions-de-vie-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const conditionsDeVieRoute: Routes = [
  {
    path: '',
    component: ConditionsDeVieComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConditionsDeVieDetailComponent,
    resolve: {
      conditionsDeVie: ConditionsDeVieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConditionsDeVieUpdateComponent,
    resolve: {
      conditionsDeVie: ConditionsDeVieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConditionsDeVieUpdateComponent,
    resolve: {
      conditionsDeVie: ConditionsDeVieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(conditionsDeVieRoute)],
  exports: [RouterModule],
})
export class ConditionsDeVieRoutingModule {}
