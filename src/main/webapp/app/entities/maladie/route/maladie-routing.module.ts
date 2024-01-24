import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MaladieComponent } from '../list/maladie.component';
import { MaladieDetailComponent } from '../detail/maladie-detail.component';
import { MaladieUpdateComponent } from '../update/maladie-update.component';
import { MaladieRoutingResolveService } from './maladie-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const maladieRoute: Routes = [
  {
    path: '',
    component: MaladieComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaladieDetailComponent,
    resolve: {
      maladie: MaladieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaladieUpdateComponent,
    resolve: {
      maladie: MaladieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaladieUpdateComponent,
    resolve: {
      maladie: MaladieRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(maladieRoute)],
  exports: [RouterModule],
})
export class MaladieRoutingModule {}
