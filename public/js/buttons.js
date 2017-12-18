var testMonkey;
var counties;

$(document).ready(function(){
    $('#low').on('click', function(event){
        console.log('you clicked low')
        console.log(event);
        testMonkey = 'low';
    });
});

$(document).ready(function(){
    $('#med').on('click', function(event){
        console.log('you clicked low')
    });
});

$(document).ready(function(){
    $('#high').on('click', function(event){
        console.log('you clicked low')


        // counties.layerremove();

    });
});

$(document).ready(function(){
    $('#showAll').on('click', function(event){
        console.log('you clicked low');
        // counties.remove();
        counties = new L.geoJson();
        counties.addTo(map);
        geojson = L.geoJson(cdata, {
            style: style2,
            onEachFeature: onEachFeature
        }).addTo(map);

        
    });
});


    $('#infoPage').on('click', function(event){
        console.log('you clicked low')
});
