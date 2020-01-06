import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),

      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }), 
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(100px)' 
        }))
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Chocolate em pó', 2),
    new Ingredient('Farinha de trigo', 1),
    new Ingredient('Manteiga', 1),
    new Ingredient('Açucar', 3)
  ];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient){
    console.log('...')
    this.ingredients.push(ingredient)
  }
}
