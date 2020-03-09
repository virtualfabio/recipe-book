import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService, private store: Store<fromApp.AppState>){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-2020.firebaseio.com/recipes.json', recipes)
        .subscribe(resp =>{
            console.log(resp);
        });
    }

//     fetchRecipes(){
        
//         return this.http.get<Recipe[]>('https://recipe-2020.firebaseio.com/recipes.json')
//         .pipe(
//             map(recipes => {
//                 return recipes.map(recipe => {
//                     return {
//                         ...recipe,
//                         ingredients: recipe.ingredients ? recipe.ingredients : []
//                     }
//                 })
//             }),
//             tap(recipes =>{
//               //  this.recipeService.setRecipes(recipes);
//               this.store.dispatch(new RecipesActions.SetRecipes(recipes));

//             })
//         );

//     }
}