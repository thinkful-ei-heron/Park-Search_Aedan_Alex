
function fetchResults(query, maxResults=10) {
    
    let formattedQuery = formatQuery(query);
    let queries = getQObject(formattedQuery, maxResults);
    let keys = Object.keys(queries);
    let conjoinArray = keys.map(key => `${key}=${queries[key]}`);
    let queryString = conjoinArray.join('&');

    let apiKey = {
        headers: new Headers({
            "X-Api-Key": "NiTwgxYQOkKregmte4F2mVmbWVgxJGhmS7upgm0X"
        })
    };

    fetch(`https://developer.nps.gov/api/v1/parks?${queryString}`, apiKey)
    .then(response => {
        if(response.ok){
            return response.json();
        } else throw response;
    })
    .then(jsonString => getResultHtml(jsonString.data))
    .catch(e => console.log(e));
}

function formatQuery(query) {
    let formattedQuery = query.replace(' ', ',');
    return formattedQuery;
}

function getQObject(fQuery, limit) {
    return {
        statecode: fQuery,
        limit: limit,
        fields: 'addresses'
    };
}



function getResultHtml(jsonArray, maxResults) {

    
}


function handleFormSubmit() {
    $('#js-form').on('submit', e => {
        e.preventDefault();
        let state = $('#js-state').val();
        let maxResults = $('#js-max-results').val();

        fetchResults(state, maxResults);
        //renderResults();
    });
}

function main() {
    handleFormSubmit();
}

$(main);