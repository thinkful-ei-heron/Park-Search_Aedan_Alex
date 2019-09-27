
function fetchResults(query, maxResults) {
    
  let formattedQuery = formatQuery(query);
  let queries = getQObject(formattedQuery, maxResults);
  let keys = Object.keys(queries);
  let conjoinArray = keys.map(key => `${key}=${queries[key]}`);
  let queryString = conjoinArray.join('&');
  const apiKey = {
    headers: {
      'X-Api-Key': 'NiTwgxYQOkKregmte4F2mVmbWVgxJGhmS7upgm0X'
    }
  };

  fetch(`https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1/parks?${queryString}`, apiKey)
    .then(response => {
      if(response.ok){
        return response.json();
      } else throw response;
    })
    .then(jsonString => getResultHtml(jsonString.data))
    .catch(e => console.log(e));
}

function formatQuery(query) {
  let splitQuery = query.split(' ');
  let formattedQuery = splitQuery.join(',');
  return formattedQuery;
}

function getQObject(fQuery, limit) {
  return {
    statecode: fQuery,
    limit: limit,
    fields: 'addresses'
  };
}

function addressTemplate (array) {
  let physAdd = array.find(item => item.type === 'Physical' );
  let index = array.findIndex(item => item === physAdd);
  let address = '';
  address = `${array[index].line1} ${array[index].line2} ${array[index].line3}<br>
                ${array[index].city} ${array[index].stateCode}, ${array[index].postalCode}`;
  return address;
}

function getResultHtml(jsonArray) {

  jsonArray.forEach(element => {$('#results').append(`<li><span>Name: ${element.name}</span><br>
    <span>${element.description}</span><br>
    <span>Website: <a href="${element.url}">${element.url}</a></span><br><span>Address: <br>${addressTemplate(element.addresses)}</span></li>`);
  });
}


function handleFormSubmit() {
  $('#js-form').on('submit', e => {
    e.preventDefault();
    $('#results').empty();
    let state = $('#js-state').val();
    if(!state) {
      alert('Please insert valid stat code.');
    }
    else {
      let maxResults = $('#js-max-results').val();
      if(!maxResults) {
        maxResults = 10;
      }
      fetchResults(state, maxResults);
    }
  });
}

function main() {
  handleFormSubmit();
}

$(main);