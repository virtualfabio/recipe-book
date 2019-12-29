import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Petit Gateau', 'Bolinho com recheio de Chocolate, acompanhado de sorvete', 'https://www.mrbey.com.br/wp-content/uploads/2018/04/petit-gateau-de_imagem_20170517200235.jpg'),
    new Recipe('Petit Gateau', 'Bolinho com recheio de Chocolate, acompanhado de sorvete', 'https://www.mrbey.com.br/wp-content/uploads/2018/04/petit-gateau-de_imagem_20170517200235.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
