import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'this is a simple test',
      'https://seatalk.vn/_next/image?url=%2Fimg%2Fseatalk-download-logo.svg&w=1920&q=75'
    ),
    new Recipe(
      'A test Recipe',
      'this is a simple test',
      'https://lh3.googleusercontent.com/ogw/ADea4I6KUVVLoymxhS7gllpOtlNy6MA0KFzhWnwbJanDTg=s64-c-mo'
    )
  ];
  constructor() {}

  ngOnInit(): void {}
}
