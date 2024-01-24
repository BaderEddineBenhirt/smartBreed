import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMendel } from '../mendel.model';

@Component({
  selector: 'jhi-mendel-detail',
  templateUrl: './mendel-detail.component.html',
})
export class MendelDetailComponent implements OnInit {
  mendel: IMendel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mendel }) => {
      this.mendel = mendel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
