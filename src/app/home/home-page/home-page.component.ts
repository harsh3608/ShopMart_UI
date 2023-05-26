import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AddUserComponent } from 'src/app/user/add-user/add-user.component';
import { UserLoginComponent } from 'src/app/user/user-login/user-login.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  constructor(
    private title: Title,
    public dialog: MatDialog
  ){
    this.title.setTitle('ShopMart')
  }

  ngOnInit(): void {
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserLoginComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  OpenRegisterDialog(userType: number){
    const dialogRef = this.dialog.open(AddUserComponent,
      {
        data: { userRole: userType }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
