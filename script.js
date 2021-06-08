const APIkey = '4c0a0fe804be477191cfc6e99d889f28';
const BaseUrl = "https://api.spoonacular.com/recipes/complexSearch";
const buttonSearch = document.querySelector('.search__button');

const buttonFilter = document.querySelector('.filter__button');
const buttonCloseFilter = document.querySelector('.filter__close');
const buttonClearFilter = document.querySelector('.filter__clear');
const filterSide = document.querySelector('.filter__inputs');

const cuisineCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=cuisine]');
const intoleranceCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=dairy]');
const dietCheckBoxes = document.querySelectorAll('input[type="radio"][name=diets]');

const resultSide = document.querySelector(".results");


console.log(resultSide);

let filterChecked = { query: "", diet: "", intolerances: "", cuisine: "" };
let queries = "";


const getRecipes = (queries) => {
  console.log(`${BaseUrl}?${queries}&apiKey=${APIkey}`);
  fetch(`${BaseUrl}?${queries}&apiKey=${APIkey}`)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      if (responseJson.totalResults == 0) {
        showResponseMessage(responseJson.message);
      } else {
        renderAllRecipes(responseJson.results);
      }
    })
    .catch(error => {
      showResponseMessage(error);
    })
}


const renderAllRecipes = (results) => {
  const listRecipes = document.querySelector(".results");
  listRecipes.innerHTML = " ";
  results.forEach(result => {
    
    listRecipes.innerHTML += `
    <div class= "result__item box">
   

    <div class="result__cover">
    <img id="img_ ${result.id}" src="${result.image}"><img>
    <i class="result__bookmark material-icons icon--light">favorite</i>
    </div>
  
    <div class ="result__title">
    <h4>${result.title}</h4>
    </div>
    
    
    </div>
    `

  });
}

const showResponseMessage = (message = "Check your connection") => {
  alert(message);
  console.log(message);
}


document.addEventListener("DOMContentLoaded", () => {
 
  const checkedBoxestoArray = (elements) => {
    return Array.from(elements).filter(i => i.checked).map(i => i.value);
  }

  buttonSearch.addEventListener("click", (search__input) => {
    const searchInput = document.getElementById("search__input").value;
    if (searchInput !== null || 'undefined') {
      console.log(searchInput);
      filterChecked.query = searchInput.toString();
      queries = constructQuery(filterChecked);
      getRecipes(queries);
    } else {
      console.log("please write input");
    }
  })

  buttonFilter.addEventListener("click", openFilter);
  function openFilter(){
    filterSide.classList.toggle('active');
  }

  buttonCloseFilter.addEventListener("click", closeFilter);
  function closeFilter(){
    filterSide.classList.remove('active');
  }

  buttonClearFilter.addEventListener("click", clearFilter);
  function clearFilter(){
    cuisineCheckBoxes.forEach((checkBox) => {checkBox.checked = false;});
    dietCheckBoxes.forEach((checkBox) => {checkBox.checked = false;});
    intoleranceCheckBoxes.forEach((checkBox) => {checkBox.checked = false;});

    filterChecked ={diet: "", intolerances: "", cuisine: "" };
    queries = constructQuery(filterChecked);

  }

  cuisineCheckBoxes.forEach(function (checkBox) {
    checkBox.addEventListener('change', function () {
      filterChecked.cuisine = checkedBoxestoArray(cuisineCheckBoxes).toString();
      queries = constructQuery(filterChecked);
      // getRecipes(queries);

    });
  });


  intoleranceCheckBoxes.forEach(function (checkBox) {
    checkBox.addEventListener('change', function () {
      filterChecked.intolerances = checkedBoxestoArray(intoleranceCheckBoxes).toString();
      queries = constructQuery(filterChecked);
      // getRecipes(queries);
    });
  });

  dietCheckBoxes.forEach(function (checkBox) {
    checkBox.addEventListener('change', function () {
      filterChecked.diet = checkedBoxestoArray(dietCheckBoxes).toString();
      queries = constructQuery(filterChecked);
      // getRecipes(queries);

    });
  });


  // const constructQuery = (filterObject) => {
  //   let query = "";
  //   Object.keys(filterObject).forEach((property) => {

  //     if (filterObject[property] !== "") {
  //       if (property == "query") {
  //         query = query.concat(`${property}=${filterObject[property]}`);
  //       } else {
  //         query = query.concat(`&${property}=${filterObject[property]}`)
  //       }
  //     }
  //   });
  //   return query
  // }

  const constructQuery = (filterObject) => {
    let originalQuery = "";
    Object.keys(filterObject).forEach((property) => {
      if(filterObject[property] !==""){
        newQuery = handleProperties(filterObject,property,originalQuery);
      }
    });
    return newQuery;
}

 function handleProperties(filterObject,property,query){
  console.log(property);
  if (property !== "query") {
    return`${query}&${property}=${filterObject[property]}` }
  return `${query}${property}=${filterObject[property]}`
 }


})

