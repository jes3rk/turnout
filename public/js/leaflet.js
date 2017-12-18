alert('connected bitch');

console.log(this);


var test = 'hi';
var mapboxAccessToken = 'pk.eyJ1IjoieWplb25nMTkiLCJhIjoiY2piNTdteWdwMzdpNTMzbzloNW41amY1dSJ9.bZJN4ceMtDY7GA6d-h23ow';
var map = L.map('mapId').setView([47.7511, -120.7401], 6);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    // attribution: ...
}).addTo(map);

//code below adds counties to map!!!!!!!!!!!!!!!!!!!!!!!!!/////////////////////
// var counties = new L.geoJson();
// counties.addTo(map);
// var countyData = new L.geoJson();
var cdata = {
    type: 'FeatureCollection',
    features: [],
};

// var showAll=function(x){

$.ajax({
dataType: "json",
type: 'GET',
url: "./data/counties.geojson",
success: function(data) {
    $(data.features).each(function(key, data) {
        if(data.properties.STATE === '53'){
        // counties.addData(data);
        // console.log(data);
        cdata.features.push(data);
        // countyData.addData(data);
    }
});
}
}).then(function(){
    // L.geoJson(cdata).addTo(map) 
    info.addTo(map);
    // L.geoJson(cdata, {style: style}).addTo(map);
    geojson = L.geoJson(cdata, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);


});
// }



function style2(feature) {
    // console.log(feature)
    
    return {
        fillColor: getColor(feature.properties.COUNTY),
// fillColor: 'red',
        fillOpacity: 0.5,
        weight: 1,
        opacity: 1,
        color: 'black',
        // dashArray: '3',
    };
}







if(true){
    var circle = L.circle([47.6062, -122.3321], {
        color: 'black',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5000
    }).addTo(map);
    circle.bringToFront();
}

///////////voter data test ///////////////////////////
var voterData;

var color;
var leafData = function () {
    $.get("/api/leaf").done(function(data) {
    //   console.log(data);
       var keys = Object.keys(data);
    //  keys.forEach(function(){
    //      console.log(data[keys[0]].fips_code)
    //     })


    return data;
    
    
    
    
}).then(function(data){
    voterData = data;
    console.log(data);

    for(var i = 0; i < data.length; i++){
        // console.log(data[i]);
        vdata.push(data[i])
    }

    // geojson = L.geoJson(data, {
    //     style: style,
    //     onEachFeature: onEachFeature
    // }).addTo(map);
    
    
})
};

var vdata = [];
  
console.log(vdata)


///////////////////////voter data test/////////////////////


/////////////////////////////////////////////////////////interactive choloropleth map test below////


//////function that gets the color of the states///
function getColor(d) {
    for (var i=0; i<vdata.length;i++){
    if(d === vdata[i].fips_code){

    if(vdata[i].total_turnout_pop_pct < 0.49){
        return '#b80000';
    }else if(vdata[i].total_turnout_pop_pct < 0.59){
        return '#ebeb00';
    }else{
        return '#217e1b';
        }   
        }      
    }
}


    


function style(feature) {
    // console.log(feature)
    
    return {
        // fillColor: getColor(feature.properties.COUNTY),
        fillColor: 'white',
        fillOpacity: 0.5,
        weight: 1,
        opacity: 1,
        color: 'black',
        // dashArray: '3',
    };
}

// L.geoJson(cdata, {style: style}).addTo(map);


//////////////////hover events
var geoJson;

function highlightFeature(e) {
    var layer = e.target;
    console.log(e)
    console.log(layer.feature);
//sets the color and settings of the outline when hovering
    layer.setStyle({
        weight: 3,
        color: 'yellow',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties, vdata);
    info._div.innerHTML += '<button>Click Here for more info</button>';
    
    
}

///////what does joe need returned////
function userSelect(e){
    var layer = e.target;
    zoomToFeature(e);
    console.log(layer.feature.properties.COUNTY);
    info._div.innerHTML += '<button>Click Here for more info</button>';
}

/////county click

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
        mouseout: resetHighlight,
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
    console.log(county);
    this._div.innerHTML = '<h4>State Voter Turnout</h4>'
     '<p>:Hover over a state to see turnout</p>'
                    
    if(voter){
        console.log(voter)
        for(var i=0; i<voter.length; i++){
            if (voter[i].fips_code === county.COUNTY){
                
                this._div.innerHTML +=  (county ?
                '<b>' + county.NAME + '</b><br />' + Math.round(voter[i].total_turnout_pop_pct*100) + '%'
                //  : 'Hover over a state to see turnout'
                :''
                );
         }
     }
    }
    // var keys = Object.keys(voter);
   
    }


