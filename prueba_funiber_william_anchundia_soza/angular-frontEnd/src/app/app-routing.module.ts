import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardCategoryComponent} from './views/dashboard-category/dashboard-category.component'
import { NewCategoryComponent } from './views/new-category/new-category.component';
import { EditCategoryComponent } from './views/edit-category/edit-category.component';
import { DashboardHistoryProductComponent } from './views/dashboard-history-product/dashboard-history-product.component';
import { DashboardProductComponent } from './views/dashboard-product/dashboard-product.component';
import { EditProductComponent } from './views/edit-product/edit-product.component';
import { SearchProductComponent } from './views/search-product/search-product.component';


const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard-category',component:DashboardCategoryComponent},
  {path:'new-category',component:NewCategoryComponent},
  {path:'edit-category/:idCategory',component:EditCategoryComponent},
  {path:'dashboard-history-product',component:DashboardHistoryProductComponent},
  {path:'dashboard-product',component:DashboardProductComponent},
  {path:'edit-product/:idProduct',component:EditProductComponent},
  {path:'search-product',component:SearchProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,DashboardCategoryComponent,NewCategoryComponent,EditCategoryComponent,DashboardHistoryProductComponent]
