import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
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

}
