import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  ){}

  ngOnInit(): void {
    
  }
  
  LogOut(){
    this.authService.removeToken();
    this.router.navigate(['/']);
  }


}
