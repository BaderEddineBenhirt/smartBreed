import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GenetiqueComponent } from '../list/genetique.component';
import { GenetiqueDetailComponent } from '../detail/genetique-detail.component';
import { GenetiqueUpdateComponent } from '../update/genetique-update.component';
import { GenetiqueRoutingResolveService } from './genetique-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const genetiqueRoute: Routes = [
  {
    path: '',
    component: GenetiqueComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenetiqueDetailComponent,
    resolve: {
      genetique: GenetiqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenetiqueUpdateComponent,
    resolve: {
      genetique: GenetiqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenetiqueUpdateComponent,
    resolve: {
      genetique: GenetiqueRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(genetiqueRoute)],
  exports: [RouterModule],
})
export class GenetiqueRoutingModule {}
