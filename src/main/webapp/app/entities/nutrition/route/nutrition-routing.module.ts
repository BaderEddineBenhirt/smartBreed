import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NutritionComponent } from '../list/nutrition.component';
import { NutritionDetailComponent } from '../detail/nutrition-detail.component';
import { NutritionUpdateComponent } from '../update/nutrition-update.component';
import { NutritionRoutingResolveService } from './nutrition-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const nutritionRoute: Routes = [
  {
    path: '',
    component: NutritionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NutritionDetailComponent,
    resolve: {
      nutrition: NutritionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NutritionUpdateComponent,
    resolve: {
      nutrition: NutritionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NutritionUpdateComponent,
    resolve: {
      nutrition: NutritionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nutritionRoute)],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
