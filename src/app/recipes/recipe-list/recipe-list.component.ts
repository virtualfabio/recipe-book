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
    new Recipe('Pão com linguiça', 'O famoso pão com liguiça e temperos a moda do chef', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNIR9DYJBTY59raOM28l5RBcC63sbhpOJ49cy4rcdozEgvc1iT')
  ];

  constructor() { }

  ngOnInit() {
  }

}
