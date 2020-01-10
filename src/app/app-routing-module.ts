import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipes/:id/:name', component: RecipesComponent },
    { path: 'shoppinglist', component: ShoppingListComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
 export class AppRoutingModule{

}