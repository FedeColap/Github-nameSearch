const searchURL = "https://api.github.com/users/";
const apiKey = "70074da6154e53a9a697229d876134d8363d36e5";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


function getName(query) {
    const params = {
      q:query, 
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + queryString + "/repos";
    console.log(url);

    // const options = {
    //     headers: new Headers({
    //       "X-Api-Key": apiKey})
    //   };

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  console.log(typeof(responseJson));
  console.log(typeof(responseJson[0]));
  console.log(responseJson[0].name);
  for (let i = 0; i < responseJson[i].length; i++){
    
    $('#results-list').append(
      `<li>${responseJson[i].name}</li>
      <li>${responseJson[i].id}</li>`
    )};
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      getName(searchTerm);
    });
}
  
$(watchForm);