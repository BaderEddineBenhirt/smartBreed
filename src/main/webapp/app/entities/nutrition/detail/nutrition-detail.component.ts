import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INutrition } from '../nutrition.model';

@Component({
  selector: 'jhi-nutrition-detail',
  templateUrl: './nutrition-detail.component.html',
})
export class NutritionDetailComponent implements OnInit {
  nutrition: INutrition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutrition }) => {
      this.nutrition = nutrition;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
