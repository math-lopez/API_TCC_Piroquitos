import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecretariaService } from '../../secretaria.service';

@Component({
  selector: 'app-add-sala',
  templateUrl: './add-sala.component.html',
  styleUrls: ['./add-sala.component.scss']
})
export class AddSalaComponent implements OnInit {
  salas: any[] = [];
  cadSala: FormGroup;
  modeUpdate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddSalaComponent>,
    private formBuilder: FormBuilder,
    private secServ: SecretariaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if(this.data){
      this.modeUpdate = this.data.modeEdit; 
      this.cadSala = this.formBuilder.group({
        idEsp: [
          this.data != undefined ? this.data.sala.idEsp : null,
          [Validators.required],
        ],
        ipEsp: [
          this.data != undefined ? this.data.sala.ipEsp : null,
          [Validators.required],
        ],
      });
    }
    else{
      this.cadSala = this.formBuilder.group({
        idEsp: [
          null,
          [Validators.required],
        ],
        ipEsp: [
          null,
          [Validators.required],
        ],
      });
    }    
  }

  addSala() {
    if(!this.modeUpdate){
    this.secServ.cadSala(this.cadSala.value)
    .subscribe(resp => {
      this._snackBar.open('Sala criada com sucesso', 'fechar', {
        duration: 4000
      });
      this.dialogRef.close();
    });
    }
    else{
      var salaUpdate = this.cadSala.value;
      salaUpdate.salaId = this.data.sala.salaId;
      this.secServ.updateSala(salaUpdate)
      .subscribe(resp => {
        this._snackBar.open('Sala criada com sucesso', 'fechar', {
          duration: 4000
        });
        this.dialogRef.close();
      });
    }
  }
}