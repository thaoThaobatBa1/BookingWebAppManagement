import { Routes } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component';
import { LayoutComponent } from './layout/layout.component';
import { CategoryComponent } from './category/category.component';
import { MenuComponent } from './menu/menu.component';
import { BanerComponent } from './baner/baner.component';
import { ArticleComponent } from './article/article.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { ControlComponent } from './control/control.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'products', component: ProductManagementComponent },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'products', component: ProductManagementComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'baner', component: BanerComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'role', component: RoleComponent },
      { path: 'booking', component: BookingListComponent },
      { path: 'control', component: ControlComponent },
      { path: 'user', component: UserComponent },

    ]
  }
  
];
