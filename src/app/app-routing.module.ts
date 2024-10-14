import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { CategoryComponent } from './employee/category/category.component';
import { SubcategoryComponent } from './employee/subcategory/subcategory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch:'full'
  }
  ,{
    path: 'login',
    component: LoginComponent  
  },
  {
    path: 'main',
    component:MainComponent
  },
  {
    path: 'header',
    component:HeaderComponent
  },
  {
    path: 'sidenav',
    component:SidenavComponent
  }, {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'employee',
    component:EmployeeComponent
  },
  {
    path: 'category',
    component:CategoryComponent
  },
  {
    path: 'subcategory',
    component:SubcategoryComponent
  },
  {
    path: '**',
    component:NotfoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
