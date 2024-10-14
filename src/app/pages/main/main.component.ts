import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  isSidebarVisible = true;
  isLoginPage = false;
  notfound = false;
  constructor(private sidebarService: SidebarService ,private router: Router) {}
  

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url.includes('login');
        this.notfound = this.router.url.includes('notfound');
      }
    });
  }


  
}
