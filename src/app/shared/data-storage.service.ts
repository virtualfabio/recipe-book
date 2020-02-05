import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-2020.firebaseio.com/recipes.json', recipes).subscribe(resp =>{
            console.log(resp);
        });
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://recipe-2020.firebaseio.com/recipes.json').subscribe(resp =>{
            console.log(resp);
            this.recipeService.setRecipes(resp);
        });
    }
}