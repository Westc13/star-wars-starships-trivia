// Pseudo Code
// Create an object for my app
 
// Namespace create an empty object to store all variables and methods to avoid scope issues
const app = {};
app.$dropdown = $('#dropdown'); //a variable to represent a DOM element- dropdown wrapped in jQuery object
app.$container = $('.starship-container'); // same as above
const specificSelection =$('option:selected').val();


// create an init method to get things going
app.init = function(){
  app.populateDropdown();
  app.getSelectValue();    
};

app.getSelectValue = () => {
// listen for a change in the select dropdown
app.$dropdown.on('change', () => {
  // get the ID from the selected dropdown
  const selection = $('option:selected').val();
  // remove the previous image from the starship-container element
  app.$container.empty()
  app.displayStarshipDetails();
});
};

// First API call to swapi to obtain the array of all starships and put them in the populateDropdown method
app.populateDropdown = function(){
    $.ajax({
        url: `https://swapi.tech/api/starships`,
        method: `GET`,
        dataType: `json`
    }).then(response => {
          const starshipNames = response.results; // create a variable to store all items in response.results array
        
          starshipNames.forEach( starshipName => {
            const htmlToAppend = `<option id=${starshipName.uid} value="$(starshipName.name}">${starshipName.name}</option>`;
            app.$dropdown.append(htmlToAppend);
        
          });
        });
};

app.displayStarshipDetails = () => {
  console.log($('#dropdown option:selected').attr('id'));
  const idEndpoint = $('#dropdown option:selected').attr('id');
  $.ajax({
    url: `https://swapi.tech/api/starships/${idEndpoint}`,
    method: `GET`,
    dataType: `json`
    }).then(response => {
          const starshipDetails = response.result.properties; // create a variable to store all items in response.results array

    
          console.log(starshipDetails);
          const modelToAppend = `<div class="starship-card"><h3 class="starship-detail">Model: ${starshipDetails.model}</h3></div>`;
          app.$container.append(modelToAppend);
          const makerToAppend = `<div class="starship-card"><h3 class="starship-detail">Manufacturer: ${starshipDetails.manufacturer}</h3></div>`;
          app.$container.append(makerToAppend);
          const speedToAppend = `<div class="starship-card"><h3 class="starship-detail">Max Atmosphering Speed: ${starshipDetails.max_atmosphering_speed}</h3></div>`;
          app.$container.append(speedToAppend);
      });
    };

$(document).ready(function(){
    app.init();
});
