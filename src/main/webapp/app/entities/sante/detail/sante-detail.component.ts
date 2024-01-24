import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISante } from '../sante.model';

@Component({
  selector: 'jhi-sante-detail',
  templateUrl: './sante-detail.component.html',
})
export class SanteDetailComponent implements OnInit {
  sante: ISante | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sante }) => {
      this.sante = sante;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
