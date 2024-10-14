import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidebarService: SidebarService) { }
  toggleSidebar() {
    console.log('this is working');
    this.sidebarService.toggleSidebar();
  }
}
