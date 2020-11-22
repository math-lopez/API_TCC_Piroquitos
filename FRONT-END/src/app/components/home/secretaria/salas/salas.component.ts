import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';
import { DialogConfirmMudancaPresencaComponent } from '../../prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import { SecretariaService } from '../secretaria.service';
import { AddSalaComponent } from './add-sala/add-sala.component';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.scss']
})
export class SalasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  SalaActive: any;
  dateAtual = new Date();
  modeEdit: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['idEsp', 'ipEsp', 'opcoes'];
  
  constructor(private authServ: AuthService, public dialog: MatDialog, private secServ: SecretariaService) {}

  ngOnInit(): void {
    this.getSalas();
  }

  ngAfterViewInit(): void {
  }

  editStudent(Sala) {
    var timeSala = new Date(Sala.dataSala);
    if (this.dateAtual.getTime() >= timeSala.getTime()) {
      this.modeEdit = true;
      this.SalaActive = Sala;
    }
  }

  getSalas() {
    // this.dataSource = new MatTableDataSource();
    this.secServ.getSalas().subscribe((Salas) => {
      console.log(Salas)
      this.dataSource = new MatTableDataSource(Salas);
      this.dataSource.paginator = this.paginator;
    });
  }

  onBack(event) {
    this.modeEdit = event;
    this.getSalas();
  }

  openDialogAddSala(){
    const dialogRef = this.dialog.open(AddSalaComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getSalas();
    })
  }

  updateSala(sala) {
    const dialogRef = this.dialog.open(AddSalaComponent, {
      data: {
        sala: sala,
        modeEdit: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSalas();
    })
  }

  deleteSala(sala) {
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir esta sala?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.secServ.removeSala(sala.salaId)
        .subscribe(resp => {
          this.getSalas();
        });
      }
    });
  }

  initSala(row){
    console.log(row);
  }
}