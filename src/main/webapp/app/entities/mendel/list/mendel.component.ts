import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMendel, Mendel } from '../mendel.model';
import { MendelService } from '../service/mendel.service';
import { MendelDeleteDialogComponent } from '../delete/mendel-delete-dialog.component';
import { FormBuilder } from '@angular/forms'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-mendel',
  templateUrl: './mendel.component.html',
  exportAs: 'ngForm',
  encapsulation: ViewEncapsulation.None 
})
export class MendelComponent implements OnInit {
  selectedValueMale?: string | any;
  selectedValueFemale?: string | any;
  genotypeMale?: string[]  = [];
  genotypeFemale?: string[]  = [];
  genotype?: string[]  = [];
  genotypecopy?: string[]  = [];
  genotypefilter?: string[] | any = '';
  long?: string[] | any = '';
  prototype?: string[]   = [];
  prototypeCopy?: string[]   = [];
  pourcentage?: string[];
  pourcentageEmpty?: string[];
  space?: string[] | any = '';
  table?: string | any = '';
  mendel?: IMendel[];

  isLoading = false;

  editForm = this.fb.group({
    id: [],
    father: [],
    mother: [],
    result: [],
  });

  constructor(public dialog: MatDialog,protected mendelService: MendelService, protected modalService: NgbModal, protected fb: FormBuilder) {}

  loadAll(): void {
    this.isLoading = true;

    this.mendelService.query().subscribe({
      next: (res: HttpResponse<IMendel[]>) => {
        this.isLoading = false;
        this.mendel = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
   // let encr = 0;
    //let longeur = 0;
    let comp = 0;
    this.genotypeMale = [];
    this.genotypeFemale = [];
    this.prototype = [];
    this.genotype = []; 
    this.genotypecopy =[];
    this.pourcentage=[];
    this.prototypeCopy = [];
    this.pourcentageEmpty =[];
    for (let i = 0; i < this.selectedValueMale.length; i++) {
       
        this.genotypeMale.push(this.selectedValueMale[i]) ;
      
    }
    for (let i = 0; i < this.selectedValueFemale.length; i++) {
       
      this.genotypeFemale.push(this.selectedValueFemale[i]) ;
    
  }
    for(let i = 0 ; i<this.genotypeMale.length; i++){
      for(let j = 0 ; j<this.genotypeFemale.length ; ){
        this.genotype.push(this.genotypeMale[i]+this.genotypeFemale[j]);
        this.genotypecopy.push(this.genotypeMale[i]+this.genotypeFemale[j])
        j++;
      }
    }
    
    console.log("this.genotype :"+this.genotypecopy);
    for(let i = 0 ; i<this.genotypecopy.length; i++){ 

      if(this.genotypecopy[i] === this.genotypecopy[i].toUpperCase()
      || this.genotypecopy[i] === this.genotypecopy[i].toLowerCase()){

        this.prototype.push( this.genotypecopy[i]  );
        
        this.prototypeCopy.push("" +Array.from(new Set(this.genotypecopy[i])));
        this.genotypecopy[i]  = "";
      }
    }
    
    
   
    for(let i = 0 ; i<this.genotypecopy.length; i++){
      for(let j = 0 ; j<this.genotypecopy[i].length; j++){
         
        if(this.genotypecopy[i][j] === this.genotypecopy[i][j].toUpperCase()){
          this.prototype.push(this.genotypecopy[i][j]);
          this.prototypeCopy.push(this.genotypecopy[i][j]);
        }
      }
    } 

     

    for( let i = 0; i<this.prototypeCopy.length ; i++){
     comp = 0;
     let poor = 0;
     let wombo;
      for(let j = 0 ;j<this.prototypeCopy.length ; j++){
      
        if(this.prototypeCopy[i] === this.prototypeCopy[j]  && this.prototypeCopy[i] !== ""){
          
          ++comp;
           poor = (comp / this.prototypeCopy.length) *100;
            wombo = this.prototypeCopy[i] +" :"+poor+"% "
     
         
        }
        
      }
   
       this.pourcentageEmpty.push(""+ wombo);
       
        this.pourcentage=Array.from(new Set(this.pourcentageEmpty));
    }
    this.openDialog();
    
  }
  openDialog() :void{ 
    let dialogRef = this.dialog.open(DialogAnime, {
      data: { 
      proto: this.prototype,
      geno : this.genotype,
      prob : this.pourcentage },
      panelClass: 'custom-dialog-container'  ,
      width: '700px', 
    });
  }
  ngOnInit(): void {
    this.loadAll();
  }
 
   RemoveElementFromStringArray(element: string) : void{
    this.genotypecopy?.forEach((value,index)=>{
        if(value===element) this.genotypecopy?.splice(index,1);
    });
}
  trackId(_index: number, item: IMendel): number {
    return item.id!;
  }
  

  mixMendel(): void {
    this.mendelService.mendel().subscribe({
      next: (res: HttpResponse<any>) => {
        this.isLoading = false;
        this.mendel = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  delete(mendel: IMendel): void {
    const modalRef = this.modalService.open(MendelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mendel = mendel;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
 

  protected createFromForm(): IMendel {
    return {
      ...new Mendel(),

      father: this.selectedValueMale,
      mother: this.selectedValueFemale,
    };
  }
  
}

@Component({
  selector: 'mat-melange',
  templateUrl: 'melange.html',
 
  
})
export class DialogAnime {
  constructor(public dialogRef: MatDialogRef<DialogAnime>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    console.log(this.data)
  }
  closeDialog() :void{
    this.dialogRef.close();
  }
}
