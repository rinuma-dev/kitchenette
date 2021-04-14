const APIkey = '4c0a0fe804be477191cfc6e99d889f28';
const Base = "https://api.spoonacular.com/recipes/complexSearch";

const getRecipes =(queries)=>{
  const xhr = new XMLHttpRequest();

  xhr.onload = function(){
    const responseJson = JSON.parse(this.responseText);
    console.log('responseJson',responseJson);
    if (responseJson.totalResults = 0){
      showResponseMessage(responseJson.message);
    } else {
        renderAllRecipes(responseJson.results);
    }
  }

  xhr.onerror = function(){
    showResponseMessage();
  }

  xhr.open("GET",`${Base}?query=${queries}&apiKey=${APIkey}`);
  // xhr.setRequestHeader()
  console.log(`${Base}${queries}`);

  xhr.send();
};

 
const renderAllRecipes = (results) => {
  const listRecipes = document.querySelector(".results");
  listRecipes.innerHTML = " ";

  results.forEach(result=>{
    listRecipes.innerHTML += `
    <div>
    ${result.id}
    ${result.title}
    <img src="${result.img}"><img>


    </div>
    `

  });
}

const showResponseMessage = (message = "Check your connection")=>{
  alert(message);
}


document.addEventListener("DOMContentLoaded",() => {
const buttonSearch =document.querySelector('#search-button');
const buttonFilter =  document.querySelector('#filter-button');
const filterSide = document.getElementById("filter");

const cuisineCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=cuisine]')
const intoleranceCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=dairy]')
const dietCheckBoxes = document.querySelectorAll('input[type="radio"][name=diets]')

const filterChecked ={query:"",diet:"", intolerances:"", cuisine:""};
let queries ="";


const checkedBoxestoArray = (elements)=>{
  return Array.from(elements).filter(i => i.checked).map(i => i.value);
}

buttonSearch.addEventListener("click",()=>{
  const searchInput = document.getElementById("search-input").value;
  if (searchInput!== null || 'undefined'){
    filterChecked.query = searchInput.toString();
    queries =constructQuery(filterChecked);

    console.log(queries);
    getRecipes(queries);
  }else{ 
    console.log("please write input");
    // getRecipes(queries);
  }

  
})

buttonFilter.addEventListener("click",()=> {
  if (filterSide.style.display === "none") { return  filterSide.style.display = "block";} 
  else { return  filterSide.style.display = "none";}
});



cuisineCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    filterChecked.cuisine = checkedBoxestoArray(cuisineCheckBoxes).toString();
    queries = constructQuery(filterChecked);
  
  });

});


intoleranceCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    filterChecked.intolerances = checkedBoxestoArray(intoleranceCheckBoxes).toString();
    queries = constructQuery(filterChecked);
   
  });

});

dietCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
  filterChecked.diet = checkedBoxestoArray(dietCheckBoxes).toString();
  queries = constructQuery(filterChecked);
  
  });
});


  const constructQuery = (filterObject)=>{
    let query = "";
    Object.keys(filterObject).forEach((property)=>{
      
      if(filterObject[property] !== ""){
        if(property == "query"){
          query = query.concat(`?${property}=${filterObject[property]}`);
        }else {
          query = query.concat(`&${property}=${filterObject[property]}`)}
      }
    });
    return query
  }
  










});
