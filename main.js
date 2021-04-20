const APIkey = '4c0a0fe804be477191cfc6e99d889f28';
const BaseUrl = "https://api.spoonacular.com/recipes/complexSearch";

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
    <div class= "result box">
   

    <div class="recipe-img">
    <img id="img_ ${result.id}" src="${result.image}"><img>
    </div>
    <div class ="recipe-title">
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
  const buttonSearch = document.querySelector('#search-button');
  const buttonFilter = document.querySelector('#filter-button');
  const buttonCloseFilter = document.getElementById('close-filter');
  const buttonClearFilter = document.getElementById('clear-filter');
  
  const filterSide = document.getElementById("filter");
  const resultSide = document.querySelector(".results");

  const cuisineCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=cuisine]')
  const intoleranceCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=dairy]')
  const dietCheckBoxes = document.querySelectorAll('input[type="radio"][name=diets]')

  let filterChecked = { query: "", diet: "", intolerances: "", cuisine: "" };
  let queries = "";


  const checkedBoxestoArray = (elements) => {
    return Array.from(elements).filter(i => i.checked).map(i => i.value);
  }

  buttonSearch.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
    if (searchInput !== null || 'undefined') {
      filterChecked.query = searchInput.toString();
      queries = constructQuery(filterChecked);

      // console.log(queries);
      getRecipes(queries);
    } else {
      console.log("please write input");
      // getRecipes(queries);
    }


  })

  buttonFilter.addEventListener("click", openFilter);
  buttonCloseFilter.addEventListener("click", closeFilter);
  buttonClearFilter.addEventListener("click", clearFilter);

  function openFilter(){
    filterSide.style.width = "25vw";
    resultSide.style.marginLeft = "25vw";
    resultSide.style.width = "60vw";
  }

  function closeFilter(){
    filterSide.style.width = "0";
    resultSide.style.marginLeft = "0";
    resultSide.style.width = "85vw";
  }

  function clearFilter(){
    cuisineCheckBoxes.forEach((checkBox) => {
        checkBox.checked = false;
    });
    dietCheckBoxes.forEach((checkBox) => {
        checkBox.checked = false;
    });
    intoleranceCheckBoxes.forEach((checkBox) => {
        checkBox.checked = false;
    });

    filterChecked ={diet: "", intolerances: "", cuisine: "" };
    queries = constructQuery(filterChecked);

    //make function to unchecked filter

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


  const constructQuery = (filterObject) => {
    let query = "";
    Object.keys(filterObject).forEach((property) => {

      if (filterObject[property] !== "") {
        if (property == "query") {
          query = query.concat(`${property}=${filterObject[property]}`);
        } else {
          query = query.concat(`&${property}=${filterObject[property]}`)
        }
      }
    });
    return query
  }
})
