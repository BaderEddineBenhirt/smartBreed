import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConditionsDeVie } from '../conditions-de-vie.model';

@Component({
  selector: 'jhi-conditions-de-vie-detail',
  templateUrl: './conditions-de-vie-detail.component.html',
})
export class ConditionsDeVieDetailComponent implements OnInit {
  conditionsDeVie: IConditionsDeVie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conditionsDeVie }) => {
      this.conditionsDeVie = conditionsDeVie;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
