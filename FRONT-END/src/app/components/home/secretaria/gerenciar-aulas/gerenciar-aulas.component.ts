import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Aulas } from 'src/app/models/Aulas';
import { AuthService } from 'src/app/shared/auth.service';
import { AddAulaComponent } from '../../prof/add-aula/add-aula.component';
import { DialogConfirmMudancaPresencaComponent } from '../../prof/dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import { ProfAula } from '../../prof/prof.component';
import { ProfService } from '../../prof/prof.service';

@Component({
  selector: 'app-gerenciar-aulas',
  templateUrl: './gerenciar-aulas.component.html',
  styleUrls: ['./gerenciar-aulas.component.scss']
})
export class GerenciarAulasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  subscription: Subscription[] = [];
  aulas: Aulas[] = [];
  displayedColumns: string[] = ['nome', 'duracao', 'opcoes'];
  dataSource: MatTableDataSource<any>;
  constructor(
    public dialog: MatDialog,
    private profServ: ProfService,
    private authServ: AuthService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.aulas);
    this.getAulas();
  }


  getAulas() {
        this.aulas = [];
        this.subscription.push(
        this.profServ.getAllAulas().subscribe((re) => {
          // this.addAlunosAula(re);
          re.forEach(e => {
            this.subscription.push(
              this.profServ.getProfById(e.profId_FK).subscribe( prof => {

              this.subscription.push(
                this.profServ.getSalaById(e.salaId_FK).subscribe(sala => {
                  this.aulas.push({
                    aulaId: e.aulaId,
                    duracao_Min: e.duracao_Min,
                    inicio_Aula: e.inicio_Aula,
                    nome: e.nome,
                    professor: prof,
                    sala: sala
                  })
                })
              )
            })
            )
            console.log(this.aulas)
          })

          this.dataSource = new MatTableDataSource([]);
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.aulas);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 500);
        }, error => {
          this.dataSource = new MatTableDataSource([]);
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.aulas);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 500);
        }));
  }

  updateAula(aula) {
    const dialogRef = this.dialog.open(AddAulaComponent, {
      data: aula,
    });

    this.subscription.push(
    dialogRef.afterClosed().subscribe(result => {
      this.getAulas();
    }))
  }

  deleteAula(aula) {
    console.log(aula)
    const dialogRef = this.dialog.open(DialogConfirmMudancaPresencaComponent, {
      data: 'deseja excluir esta aula?',
    });
    this.subscription.push(
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.subscription.push(
        this.profServ.deleteAula(aula.aulaId)
        .subscribe(resp => {
          this.getAulas();
        }))
      }
    }))
  }
  // addAlunosAula(re) {
  //   re.forEach((element) => {
  //     this.profServ
  //       .getAlunosPorAula(element.profId_FK, element.aulaId)
  //       .subscribe((r) => {
  //         this.profAula.push({
  //           aula: element,
  //           alunos: r,
  //         });
  //       });
  //   });
  // }


  openDialogAddAula() {
    const dialogRef = this.dialog.open(AddAulaComponent, {
      width: '50%',
    });

    this.subscription.push(
    dialogRef.afterClosed().subscribe((result) => {
      this.getAulas();
    }))
  }

}
