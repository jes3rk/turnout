alert('connected bitch');


var test = 'hi';
var mapboxAccessToken = 'pk.eyJ1IjoieWplb25nMTkiLCJhIjoiY2piNTdteWdwMzdpNTMzbzloNW41amY1dSJ9.bZJN4ceMtDY7GA6d-h23ow';
var map = L.map('mapId').setView([47.7511, -120.7401], 6);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    // attribution: ...
}).addTo(map);

//code below adds counties to map!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////////
var counties = new L.geoJson();
counties.addTo(map);
var countyData = new L.geoJson();
var countyDataTest = {};
var cdata = {
    type: 'FeatureCollection',
    features: [],
};


$.ajax({
dataType: "json",
type: 'GET',
url: "./data/counties.geojson",
success: function(data) {
    $(data.features).each(function(key, data) {
        if(data.properties.STATE === '53'){
        counties.addData(data);
        // console.log(data);
        cdata.features.push(data);
        countyData.addData(data);
    }
});
}
}).then(function(){
    // L.geoJson(cdata).addTo(map)
    info.addTo(map);
    L.geoJson(cdata, {style: style}).addTo(map);
    geojson = L.geoJson(cdata, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);


});


var abc = leafData();


console.log(leafletData)


if(true){
var circle = L.circle([47.6062, -122.3321], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 5000
  }).addTo(map);
}



/////////////////////////////////////////////////////////interactive choloropleth map test below////

function getColor(d) {
    return d == '001' ? '#800026' :       
           d == '002' ? 'green' :
           d == '003'  ? '#E31A1C' :
           d == '009'  ? 'black' :
           d == 'hi'   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? 'grey' :
                      '#FFEDA0';
}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.COUNTY),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// L.geoJson(cdata, {style: style}).addTo(map);


//////////////////hover events
var geoJson;

function highlightFeature(e) {
    var layer = e.target;
//sets the color and settings of the outline when hovering
    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
    
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
    
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

// info.addTo(map);



function getdata(x){
    console.log(x.features)
}
