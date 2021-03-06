import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{
   //recepiSelected = new Subject<Recipe>();
   //activatedTeste = new Subject<boolean>();
   recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe('Petit Gateau', 'Bolinho com recheio de Chocolate, acompanhado de sorvete', 'https://www.mrbey.com.br/wp-content/uploads/2018/04/petit-gateau-de_imagem_20170517200235.jpg',
        [
            new Ingredient('Chocolate meio amargo', 2), new Ingredient('Farinha de Trigo', 1)
        ]),
        new Recipe('Pão com linguiça', 'O famoso pão com liguiça e temperos a moda do chef...', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNIR9DYJBTY59raOM28l5RBcC63sbhpOJ49cy4rcdozEgvc1iT',
        [
            new Ingredient('Pão frances', 1), new Ingredient('Linguiça toscana', 1),new Ingredient('Cebola', 1)
        ])
    ];

    constructor(private store: Store<fromApp.AppState>){
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
      return this.recipes[index];
    }

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
     // this.shoppingListService.addIngredients(ingredients);
     this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
    
}