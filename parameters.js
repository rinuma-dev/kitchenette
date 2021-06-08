const APIkey = '4c0a0fe804be477191cfc6e99d889f28';
const BaseUrl = "https://api.spoonacular.com/recipes/complexSearch";
const buttonSearch = document.querySelector('.search__button');

const buttonFilter = document.querySelector('.filter__button');
const buttonCloseFilter = document.querySelector('.filter__close');
const buttonClearFilter = document.querySelector('.filter__clear');
const filterSide = document.querySelector('.filter__inputs');

const cuisineCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=cuisine]')
const intoleranceCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=dairy]')
const dietCheckBoxes = document.querySelectorAll('input[type="radio"][name=diets]')

const resultSide = document.querySelector(".results");


let filterChecked = { query: "", diet: "", intolerances: "", cuisine: "" };
let queries = "";

