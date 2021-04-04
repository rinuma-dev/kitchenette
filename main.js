
const buttonFilter =  document.querySelector('#filter-button');
const filterSide = document.getElementById("filter");
const cuisineCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=cuisine]')
const dairyCheckBoxes = document.querySelectorAll('input[type="checkbox"][name=dairy]')
const dietCheckBoxes = document.querySelectorAll('input[type="radio"][name=diets]')


let selectedCuisine = [];
let selectedDairy = [];
let selectedDiets = [];



function getFilterValues(elements){
  listChecked = []
  elements.forEach(function(element){
    element.addEventListener('change', function(){
      listChecked = 
      Array.from(elements) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
    
      console.log(listChecked)
      return listChecked.toString()
    })
  })
}



function showFilterSearch(element){
  if (filterSide.style.display === "none") {
    return  filterSide.style.display = "block";} 
  else {
    return  filterSide.style.display = "none";}
}

if(buttonFilter){
  buttonFilter.addEventListener("click", showFilterSearch);
}


const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getSearchbarInput);
const inputSearch =  document.getElementById('search-input').value;

//addevent to listen all the checklist / or radio button on fillter

function isDefined(queryFilter, element){
  if (element[1]){
    queryFilter.append(element);
    return queryFilter
  }

}

function getSearchbarInput(){
filledFilter =[];
selectedCuisine = getFilterValues(cuisineCheckBoxes);
selectedDairy = getFilterValues(dairyCheckBoxes);
selectedDiets = getFilterValues(dietCheckBoxes);
const inputSearch = document.getElementById('search-input').value.toString();
filterQuery={
  'cuisine' : selectedCuisine,
  'dairy': selectedDairy,
  'diet' : selectedDiets,
  'query': inputSearch
};

filterQuery = filterQuery.filter(element=> element !== 'undefined');

console.log(filterQuery);





query = `query=${inputSearch}&cuisine=${selectedCuisine}&diet=.${selectedDiets}&intolerances=${selectedDairy} `;
console.log(query);

}







//Handle data for the query



 







