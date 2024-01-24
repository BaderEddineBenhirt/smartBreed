import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../service/animal.service';
import { IAnimal } from '../animal.model';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConditionsDeVieUpdateComponent } from 'app/entities/conditions-de-vie/update/conditions-de-vie-update.component';

import { faTree } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'jhi-animal-detail',
  templateUrl: './animal-detail.component.html',
})
export class AnimalDetailComponent implements OnInit {
 
  animal: IAnimal | null = null;
  parent: IAnimal[] = [];
  switchparent: IAnimal | any;
  switchparentP: IAnimal | any;
  animals?: IAnimal[];
  property: IAnimal | any;
  ferme: IAnimal   | null = null;
  isLoading = false;
  arbreMere?: string[] | any = '';
  arbrePere?: string[] | any = '';
  idtablename : number [] | any = [] 
  faTree=faTree;
  constructor(public dialog: MatDialog ,protected animalService: AnimalService,protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ animal }) => {
      this.animal = animal;
      this.idtablename = this.animal?.maladies;
       
    });
     


    this.loadAll();
    this.loadAllPere();
   
  }

  previousState(): void {
    window.history.back();
  }
  loadAll(): void {
    this.isLoading = true;

    this.animalService.query().subscribe({
      next: (res: HttpResponse<IAnimal[]>) => {
        this.isLoading = false;
        this.parent = res.body ?? [];

        let p = 0;
       
        for (let i = 0; i < this.parent.length; i++) {
           
          if (this.animal?.refMere?.trim()=== this.parent[i].ref?.trim()) {
            p++;
            this.arbreMere = this.arbreMere.concat(' mère de la génération ', p, ' : ', this.parent[i].ref);
            this.switchparent = this.parent[i];
         
            
            for (let j = 0; j < this.parent.length; j++) {
              if (this.switchparent.refMere.trim() === this.parent[j].ref?.trim()) {
                p++;
                this.arbreMere = this.arbreMere.concat(', mère de la génération', p, ' : ', this.parent[j].ref);
                this.switchparent = this.parent[j];
              }
            }
          } 
        }
       
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  loadAllPere(): void {
    this.isLoading = true;

    this.animalService.query().subscribe({
      next: (res: HttpResponse<IAnimal[]>) => {
        this.isLoading = false;
        this.parent = res.body ?? [];

        
        let b = 0;
        for (let i = 0; i < this.parent.length; i++) {
           
         if (this.animal?.refPere?.trim() === this.parent[i].ref?.trim()){
            b++;
            this.arbrePere = this.arbrePere.concat(' père de la génération ', b ,' : ', this.parent[i].ref);
            this.switchparentP = this.parent[i];
         
            
            for(let j = 0; j<this.parent.length ; j++){
              if(this.switchparentP.refPere.trim() === this.parent[j].ref?.trim()){
                b++;
                this.arbrePere = this.arbrePere.concat(',  père de la génération ', b,' : ', this.parent[j].ref)
                
                this.switchparentP = this.parent[j];
              }
            }
       
          }
        }
       
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog() :void {
    this.dialog.open(ConditionsDeVieUpdateComponent ,{
      width: '650px',
      height: '650px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { ez: this.ferme }
    });

  
  }
  openDialog1() :void{ 
     this.dialog.open(DialogArbre, {
      data: { 
      mere: this.arbreMere,
      pere : this.arbrePere, },
      panelClass: 'custom-dialog-container'  ,
      width: '700px', 
    });
  }
}

@Component({
  selector: 'mat-arbre',
  templateUrl: 'arbre.html',
 
  encapsulation: ViewEncapsulation.None ,
})
export class DialogArbre {
  constructor(public dialogRef: MatDialogRef<DialogArbre>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    console.log(this.data)
  }
  closeDialog() :void{
    this.dialogRef.close();
  }
}
