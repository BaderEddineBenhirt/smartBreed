import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalUpdateComponent } from 'app/entities/animal/update/animal-update.component';
import { MatDialog } from '@angular/material/dialog';
import { IFerme } from '../ferme.model';

@Component({
  selector: 'jhi-ferme-detail',
  templateUrl: './ferme-detail.component.html',
})
export class FermeDetailComponent implements OnInit {
  ferme: IFerme | null = null;

  constructor(public dialog: MatDialog,protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ferme }) => {
      this.ferme = ferme;
    });
  }

  previousState(): void {
    window.history.back();
  }
  openDialog() :void {
    this.dialog.open(AnimalUpdateComponent ,{
      width: '650px',
      height: '650px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { e: this.ferme }
    });

  
  }
}
