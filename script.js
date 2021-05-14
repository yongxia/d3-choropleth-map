const UsEducationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
    CountyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

let countyData;
let educationData;

drawMap = () => {
    d3.select('svg').selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('fill', ({ id }) => {
            let { bachelorsOrHigher: percentage } = educationData.find(item => id == item.fips);
            if (percentage <= 20) {
                return 'orange';
            } else if (percentage > 20 && percentage <= 35) {
                return 'lightgreen';
            } else if (percentage > 35 && percentage < 50) {
                return 'green';
            }
            return "blue";
        })
        .attr('data-fips', ({ id }) => id)
        .attr('data-education', ({ id }) => educationData.find(item => item.fips === id).bachelorsOrHigher)
        .on('mouseover', (event, { id }) => {
            let { area_name, bachelorsOrHigher, state } = educationData.find(item => item.fips === id);
            d3.select("#tooltip")
                .transition()
                .style('visibility', 'visible')
                .text(`${area_name}: ${bachelorsOrHigher}%, ${state}`)
                .attr('data-education', bachelorsOrHigher);
        })
        .on('mouseout', d => {
            d3.select("#tooltip")
                .style('visibility', 'hidden');
        })

};

d3.json(CountyUrl).then((data, err) => {
    if (err) return console.error(err);
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log(countyData);
    return d3.json(UsEducationUrl);
}).then((data, err) => {
    if (err) return console.error(err);
    educationData = data;
    console.log(educationData);
    drawMap();
})