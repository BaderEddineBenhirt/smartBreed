import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaladie } from '../maladie.model';

@Component({
  selector: 'jhi-maladie-detail',
  templateUrl: './maladie-detail.component.html',
})
export class MaladieDetailComponent implements OnInit {
  maladie: IMaladie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ maladie }) => {
      this.maladie = maladie;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
