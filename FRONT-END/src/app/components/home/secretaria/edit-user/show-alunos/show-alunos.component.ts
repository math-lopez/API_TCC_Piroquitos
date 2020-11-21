import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-show-alunos',
  templateUrl: './show-alunos.component.html',
  styleUrls: ['./show-alunos.component.scss']
})
export class ShowAlunosComponent implements OnInit {

  userActive: any;
  modeEdit: boolean = false;
  displayedColumns: string[] = ['id', 'nome', 'tipo'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.authServ.users.subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  editStudent(student){
    console.log(student)
    this.modeEdit = true;
    this.userActive = student;
  }

  onBack(event){
    this.modeEdit = event;
  }

}
