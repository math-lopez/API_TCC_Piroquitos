import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DialogConfirmMudancaPresencaComponent } from '../dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';
import { ProfService } from '../prof.service';

@Component({
  selector: 'app-edit-presenca',
  templateUrl: './edit-presenca.component.html',
  styleUrls: ['./edit-presenca.component.scss'],
})
export class EditPresencaComponent implements OnInit {
  @Input() aula: any;
  @Output() back = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription[] = []
  student: any;
  hide: boolean = true;
  modeViewStudents: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['login', 'nome', 'presenca'];

  constructor(private authServ: AuthService, public dialog: MatDialog, private profServ: ProfService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.dataSource = new MatTableDataSource(this.aula.alunos)

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 200);
  }

  editUser(row) {
    this.student = row;
    this.modeViewStudents = true;
  }

  onBackPage(event) {
    this.modeViewStudents = event;
  }

  alterarPresenca(aluno) {
    if (aluno.presenca) {
      const dialogRef = this.dialog.open(
        DialogConfirmMudancaPresencaComponent,
        {
          width: '350px',
          data: 'deseja alterar esse registro?',
        }
      );

      this.subscription.push(
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
            this.dataSource = new MatTableDataSource()
            this.subscription.push(
              this.profServ.updatePresenca({
                aulaId_FK: this.aula.aula.aulaId,
                alunoId_FK: aluno.alunoId,
                presenca: false
              }).subscribe(r => {
                this.subscription.push(
                  this.authServ.usuario.subscribe(resp => {
                    this.subscription.push(
                      this.profServ.getProf(resp.login).subscribe(res => {
                        this.subscription.push(
                          this.profServ.getAlunosPorAula(res.funcionarioId, this.aula.aula.aulaId).subscribe(re => {
                            this.dataSource = new MatTableDataSource(re);
                          })
                        )
                      })
                    )
                  })
                )
              })
            )
          }
          else{
            dialogRef.close();
          }
        }))
    } else {
      const dialogRef = this.dialog.open(
        DialogConfirmMudancaPresencaComponent,
        {
          width: '350px',
          data: 'deseja alterar esse registro?',
        }
      );

      this.subscription.push(
        dialogRef.afterClosed().subscribe((result) => {
          if(result){
            this.dataSource = new MatTableDataSource()
            this.subscription.push(
              this.profServ.updatePresenca({
                aulaId_FK: this.aula.aula.aulaId,
                alunoId_FK: aluno.alunoId,
                presenca: true
              }).subscribe(r => {
                this.subscription.push(
                  this.authServ.usuario.subscribe(resp => {
                    this.subscription.push(
                      this.profServ.getProf(resp.login).subscribe(res => {
                        this.subscription.push(
                          this.profServ.getAlunosPorAula(res.funcionarioId, this.aula.aula.aulaId).subscribe(re => {
                            this.dataSource = new MatTableDataSource(re);
                          })
                        )
                      })
                    )
                  })
                )
              })
            )
          }
          else{
            dialogRef.close();
          }
        }))
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => {e.unsubscribe()})
  }
}
