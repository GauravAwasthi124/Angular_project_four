import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
   animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class SidenavComponent implements OnInit{
  
  
  isSidebarVisible = true;
  isCategory = false;
  isEmployee = false;
  isDashboardSelected = false;
  isProduct = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }

  toggleCategory() {
    this.isCategory = !this.isCategory;
  }
  toggleEmployee() {
        this.isEmployee = !this.isEmployee;
  }
  toggleProduct() {
    this.isProduct = !this.isProduct;
  }
  selectDashboard() {
    this.isDashboardSelected = true;
  }
}
