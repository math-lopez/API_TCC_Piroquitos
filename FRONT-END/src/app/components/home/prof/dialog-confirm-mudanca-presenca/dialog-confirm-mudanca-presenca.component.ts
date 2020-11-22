import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-mudanca-presenca',
  templateUrl: './dialog-confirm-mudanca-presenca.component.html',
  styleUrls: ['./dialog-confirm-mudanca-presenca.component.scss'],
})
export class DialogConfirmMudancaPresencaComponent implements OnInit {
  mensagem = 'deseja mudar esse registro?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.mensagem = this.data;
  }

  ngOnDestroy(): void {
    this.mensagem = 'deseja mudar esse registro?';
  }
}
