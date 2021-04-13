
const getRecipes =()=>{

};

 
const renderAllRecipes = (recipes) => {
  const listRecipes = document.querySelector(".results");
  listRecipes.innerHTML = " ";

  recipes.forEach(recipe=>{
    listRecipes.innerHTML += `
    <div>
    ${recipe}
    </div>
    `

  });
}

const showResponseMessage =(message= "Check your connection")=>{
  alert(message);
}


document.addEventListener("DOMContentLoaded",() => {
const buttonFilter =  document.querySelector('#filter-button');
const filterSide = document.getElementById("filter");
const cuisineCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=cuisine]')
const intoleranceCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=dairy]')
const dietCheckBoxes = document.querySelectorAll('input[type="radio"][name=diets]')
const filterChecked ={};
let listChecked=[];
let queries ="";


const checkedBoxestoArray = (elements)=>{
  return Array.from(elements).filter(i => i.checked).map(i => i.value);
}


buttonFilter.addEventListener("click", function(){
  if (filterSide.style.display === "none") { return  filterSide.style.display = "block";} 
  else { return  filterSide.style.display = "none";}
});


cuisineCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    filterChecked.cuisine = checkedBoxestoArray(cuisineCheckBoxes).toString();
    constructQuery(filterChecked);
  
  });

});


intoleranceCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    filterChecked.intolerances = checkedBoxestoArray(intoleranceCheckBoxes).toString();
    constructQuery(filterChecked);
   
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
      query = query.concat(`?${property}=${filterObject[property]}`)}
    });
    return query
  }
  










});
