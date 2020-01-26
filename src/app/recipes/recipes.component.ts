import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from './recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
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
