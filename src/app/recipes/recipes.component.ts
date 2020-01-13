import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {
  //selectedRecipe: Recipe;
  id: string = '';
  name: string = '';
  count: number = 0;
  private firstObsSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    this.router.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.name = params['name'];
    });
/* 
    this.recipeService.recepiSelected
    .subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    }); */

    this.recipeService.activatedTeste.subscribe( activated =>{
      console.log('ativo:  ' + activated);
    });

    this.recipeService.activatedTeste.next(true);
    this.recipeService.activatedTeste.next(false);
    this.recipeService.activatedTeste.unsubscribe();

    this.firstObsSubscription = interval(600).subscribe(count =>{
      if(count>=5){
        this.firstObsSubscription.unsubscribe();
      }
      this.count = count;
    });
  }

  ngOnDestroy(): void {
  //  this.firstObsSubscription.unsubscribe();
  }

}
