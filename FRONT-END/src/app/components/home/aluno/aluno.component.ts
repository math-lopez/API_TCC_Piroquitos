import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/shared/auth.service';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user: User;
  displayedColumns: string[] = ['aula', 'responsavel', 'presenca'];
  dataSource: MatTableDataSource<any>;
  subscription: Subscription[] = []
  
  constructor(private alunoServ: AlunoService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.getInitPage();
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = "itens por página";
  }

  getInitPage(){
    this.dataSource = new MatTableDataSource([]);
    this.subscription.push(
      this.authServ.usuario.subscribe(resp => {
        this.user = resp;
        this.subscription.push(
          this.alunoServ.getAluno({login_FK: this.user.login}).subscribe(resp => {
            this.subscription.push(
              this.alunoServ.getAulas(resp.alunoId).subscribe(r => {
                this.dataSource = new MatTableDataSource(r);
                setTimeout(() =>{
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }, 500);
              })
            )
          })
        )
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(e => {e.unsubscribe()})
  }
}
