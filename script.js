const UsEducationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
    CountyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

let countyData;
let educationData;
//let color;

drawMap = () => {
    d3.select('svg').selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('fill', ({ id }) => {
            let { bachelorsOrHigher: percentage } = educationData.find(item => id == item.fips);
            //return color(percentage);
            if (percentage > 0 && percentage <= 10)
                return "#eff3ff";
            else if (percentage > 10 && percentage <= 25)
                return "#bdd7e7";
            else if (percentage > 25 && percentage <= 40)
                return "#6baed6";
            else
                return "#2171b5";
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
    //let min = d3.min(educationData, d => d.bachelorsOrHigher);
    //let max = d3.max(educationData, d => d.bachelorsOrHigher);
    //console.log(d3.schemeBlues[4]);
    //color = d3.scaleOrdinal().domain([min, max]).range(d3.schemeBlues[4]);
    drawMap();
})