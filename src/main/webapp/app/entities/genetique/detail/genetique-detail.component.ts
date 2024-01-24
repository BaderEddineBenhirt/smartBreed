import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenetique } from '../genetique.model';

@Component({
  selector: 'jhi-genetique-detail',
  templateUrl: './genetique-detail.component.html',
})
export class GenetiqueDetailComponent implements OnInit {
  genetique: IGenetique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genetique }) => {
      this.genetique = genetique;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
