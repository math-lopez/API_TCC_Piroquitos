import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DialogConfirmMudancaPresencaComponent } from '../../prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import { SecretariaService } from '../secretaria.service';
import { AddSalaComponent } from './add-sala/add-sala.component';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.scss']
})
export class SalasComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  SalaActive: any;
  dateAtual = new Date();
  modeEdit: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['idEsp', 'ipEsp', 'opcoes'];
  subscription: Subscription[]= [];
  
  constructor(private authServ: AuthService, public dialog: MatDialog, private secServ: SecretariaService) {}

  ngOnInit(): void {
    this.getSalas();
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "itens por página";
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
    this.subscription.push(
      this.secServ.getSalas().subscribe((Salas) => {
        this.dataSource = new MatTableDataSource(Salas);
        this.dataSource.paginator = this.paginator;
      })
    )
  }

  onBack(event) {
    this.modeEdit = event;
    this.getSalas();
  }

  openDialogAddSala(){
    const dialogRef = this.dialog.open(AddSalaComponent);

    this.subscription.push(
      dialogRef.afterClosed().subscribe(result => {
        this.getSalas();
      })
    )
  }

  updateSala(sala) {
    const dialogRef = this.dialog.open(AddSalaComponent, {
      data: {
        sala: sala,
        modeEdit: true
      },
    });

    this.subscription.push(
      dialogRef.afterClosed().subscribe(result => {
        this.getSalas();
      }) 
    )
  }

  deleteSala(sala) {
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir esta sala?',
    });

    this.subscription.push(
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.secServ.removeSala(sala.salaId)
          .subscribe(resp => {
            this.getSalas();
          });
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => e.unsubscribe());
  }
}