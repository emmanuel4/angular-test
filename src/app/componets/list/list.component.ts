import { Component, OnInit } from '@angular/core';
import { defaultIfEmpty, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public users$: Observable<User[]> | undefined;

  constructor(
    private userService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  openDialog(id:string) {
    this.dialog.open(ConfirmDialogComponent,  {
      width: '20rem',
      data: id
    })
  }

}
