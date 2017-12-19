var test = 'hi';
var mapboxAccessToken = 'pk.eyJ1IjoieWplb25nMTkiLCJhIjoiY2piNTdteWdwMzdpNTMzbzloNW41amY1dSJ9.bZJN4ceMtDY7GA6d-h23ow';
var map = L.map('mapId').setView([47.7511, -118.4401], 6);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    // attribution: ...
}).addTo(map);

var cdata = {
    type: 'FeatureCollection',
    features: [],
};


$.ajax({
dataType: "json",
type: 'GET',
url: "../data/counties.geojson",
success: function(data) {
    $(data.features).each(function(key, data) {
        if(data.properties.STATE === '53'){
        cdata.features.push(data);
    }
});
}
}).then(function(){
    info.addTo(map);
    geojson = L.geoJson(cdata, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
});


function style(feature) {
    return {
        fillColor: 'white',
        fillOpacity: 0.5,
        weight: 1,
        color: 'black',
    };
}


function style2(feature) {

    if(choice){
    
    return {
        fillColor: getColor(feature.properties.COUNTY, choice),
        fillOpacity: 0.5,
        weight: 1,
        opacity: 1,
        color: 'black',
    };
}
else{
    return;
}
}

//////function that gets the color of the states///
function getColor(d, button) {
    switch(button){
        case 'showAll':
        for (var i=0; i<vdata.length;i++){
            if(d === vdata[i].fips_code){
                if(vdata[i].total_turnout_pop_pct < 0.59){
                    return '#b80000';
                }else if(vdata[i].total_turnout_pop_pct < 0.69){
                        return '#ebeb00';
                }else{
                        return '#217e1b';
                }   
            }      
        }
            break;
        case 'low':
        for (var i=0; i<vdata.length;i++){
            if(d === vdata[i].fips_code){
                if(vdata[i].total_turnout_pop_pct < 0.59){
                    return '#b80000';
                }else{
                return 'black';
                }
        
            }
        }
        case 'med':
        for (var i=0; i<vdata.length;i++){
            if(d === vdata[i].fips_code){
                if(vdata[i].total_turnout_pop_pct < 0.69 && vdata[i].total_turnout_pop_pct > 0.59){
                    return '#ebeb00';
                }else{
                return 'black';
                }
        
            }
        }
        case 'high':
        for (var i=0; i<vdata.length;i++){
            if(d === vdata[i].fips_code){
                if(vdata[i].total_turnout_pop_pct < 0.99 && vdata[i].total_turnout_pop_pct > 0.69){
                    return '#217e1b';
                }else{
                return 'black';
                }
        
            }
        }
    }
}




//////////////////maybe addd circle for minimap////

// if(true){
//     var circle = L.circle([47.6062, -122.3321], {
//         color: 'black',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: 5000
//     }).addTo(map);
//     circle.bringToFront();
// }

///////////voter data test ///////////////////////////


var vdata = [];
var leafData = function () {
    $.get("/api/leaf").done(function(data) {
    //   console.log(data);
       var keys = Object.keys(data);

    return data;

}).then(function(data){
    for(var i = 0; i < data.length; i++){
        // console.log(data[i]);
        vdata.push(data[i])
    }
})
};

//////////////////hover events
var geoJson;

function highlightFeature(e) {
    var layer = e.target;
//sets the color and settings of the outline when hovering
    layer.setStyle({
        weight: 2,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    userCode = layer.feature.properties.COUNTY;
    info.update(layer.feature.properties, vdata);
}


var userCode;

///////what does joe need returned////
function userSelect(e){
    var layer = e.target;
    zoomToFeature(e);
    console.log(layer.feature.properties.COUNTY);

    console.log(info);
    userCode = layer.feature.properties.COUNTY;
    // info._div += L.DomUtil.create('button', 'infoPage');
    // $('#infoPage').attr('onclick', getData());  
    info.update(layer.feature.properties, vdata);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    // console.log(e.target.getBounds());
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        // mouseout: resetHighlight,
        click: userSelect
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (county, voter) {
    // console.log(county);
    this._div.innerHTML = `
                        <h4>State Voter Turnout</h4>
                        <p>Hover over a state to see turnout</p>
                        <b>Search by FIPS: </b>
                        <input type='text' id='fipsSearch' size='1'></br>
                        <button id="fipsBtn">Click for More Info</button>
                        </br>
                        `         
    if(voter){
        // console.log(voter)
        for(var i=0; i<voter.length; i++){
            if (voter[i].fips_code === county.COUNTY){
                
                this._div.innerHTML +=  (county ?
                `<b>${county.NAME}
                </br>FIPS: ${voter[i].fips_code}</b> </br>
                
                <ul>
                    <li>Voter Turnout: ${Math.round(voter[i].total_turnout_pop_pct*100)+'%'}</li>                
                    <li>Total Eligible: ${voter[i].total_elig_pop}</li>
                    <li>Total Ballots Cast: ${voter[i].total_ballots_cast}</li>
                </ul>
               `
                : 'Hover over a state to see turnout'
                );
                
            }
         }
    }
}

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['0 - 59%', '60 - 69%', '70 - 100%'],
        labels = ['#b80000', '#ebeb00', '#217e1b'];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML += `
                    <b>Legend</b></br>`
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + labels[i] + '"></i> ' +   
            grades[i] + '<br>';
    }

    return div;
};

legend.addTo(map);



