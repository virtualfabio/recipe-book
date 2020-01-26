import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

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

    constructor(private shoppingListService: ShoppingListService){
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.shoppingListService.addIngredients(ingredients);
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