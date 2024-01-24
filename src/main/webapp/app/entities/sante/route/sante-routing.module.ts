import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SanteComponent } from '../list/sante.component';
import { SanteDetailComponent } from '../detail/sante-detail.component';
import { SanteUpdateComponent } from '../update/sante-update.component';
import { SanteRoutingResolveService } from './sante-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const santeRoute: Routes = [
  {
    path: '',
    component: SanteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SanteDetailComponent,
    resolve: {
      sante: SanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SanteUpdateComponent,
    resolve: {
      sante: SanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SanteUpdateComponent,
    resolve: {
      sante: SanteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(santeRoute)],
  exports: [RouterModule],
})
export class SanteRoutingModule {}
