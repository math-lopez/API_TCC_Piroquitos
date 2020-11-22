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
import { AuthService } from 'src/app/shared/auth.service';
import { DialogConfirmMudancaPresencaComponent } from '../dialog-confirm-mudanca-presenca/dialog-confirm-mudanca-presenca.component';

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

  student: any;
  hide: boolean = true;
  modeViewStudents: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['login', 'nome', 'presenca'];

  constructor(private authServ: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.authServ.users.subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });

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

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
      });
    } else {
      const dialogRef = this.dialog.open(
        DialogConfirmMudancaPresencaComponent,
        {
          width: '350px',
          data: 'deseja alterar esse registro?',
        }
      );

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
      });
    }
  }
}
