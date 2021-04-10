
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


const checkedBoxestoArray =(elements)=>{
  return Array.from(elements).filter(i => i.checked).map(i => i.value);
}


buttonFilter.addEventListener("click", function(){
  if (filterSide.style.display === "none") { return  filterSide.style.display = "block";} 
  else { return  filterSide.style.display = "none";}
});


cuisineCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    listChecked = checkedBoxestoArray(cuisineCheckBoxes);
    filterChecked.cuisine= listChecked.toString();
    console.log(filterChecked);
  });

});


intoleranceCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    listChecked = checkedBoxestoArray(intoleranceCheckBoxes);
    filterChecked.intolerances= listChecked.toString();
    console.log(filterChecked);
  });

});

dietCheckBoxes.forEach(function(checkBox){
  checkBox.addEventListener('change', function(){
    listChecked = checkedBoxestoArray(dietCheckBoxes);
   filterChecked.diet= listChecked.toString();
   console.log(filterChecked);
  });

});





});
