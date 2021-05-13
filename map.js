const USEducationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
    CountyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';


const fetchData = done => {
    let educationData, countiesData;
    fetch(USEducationUrl)
        .then(educationResponse => educationResponse.json())
        .then(eData => {
            educationData = eData;
            return fetch(CountyUrl);
        })
        .then(contiesResponse => contiesResponse.json())
        .then(cData => countiesData = cData)
        .then(() => done(educationData, countiesData))
}

const done = (educationData, countiesData) => {
    console.log(educationData);
    console.log(countiesData);
}

fetchData(done);