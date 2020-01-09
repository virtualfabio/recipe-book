import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  id: string = '';
  name: string = '';

  constructor(private recipeService: RecipeService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.router.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.name = params['name'];
    });

    this.recipeService.recepiSelected
    .subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

}
