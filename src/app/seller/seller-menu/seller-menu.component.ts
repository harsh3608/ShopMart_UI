import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PasswordChangeComponent } from 'src/app/user/password-change/password-change.component';
import { AuthService } from 'src/app/user/shared/authorization/auth.service';

@Component({
  selector: 'app-seller-menu',
  templateUrl: './seller-menu.component.html',
  styleUrls: ['./seller-menu.component.css']
})
export class SellerMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ){}

  ngOnInit(): void {
  }

  openChangePasswordDialog(){
    const dialogRef = this.dialog.open(PasswordChangeComponent,
      {
        data: {  }
      }
    );
    dialogRef.addPanelClass('rounded-dialog-container');
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  logOut(){
    this.authService.removeToken();
    this.router.navigate(['/']);
  }


}
