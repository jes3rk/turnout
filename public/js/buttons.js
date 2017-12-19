var testMonkey;
var counties;

$(document).ready(function(){
    $('#lowBtn').on('click', function(event){
        console.log('you clicked low')
        console.log(this.getAttribute('data-name'));
        if(counties){
            map.removeLayer(counties)
            }
            counties = new L.geoJson();
            // counties.addTo(map);
            counties = L.geoJson(cdata, {
                style: style2,
                onEachFeature: onEachFeature
            }).addTo(map);     
    });
});

$(document).ready(function(){
    $('#medBtn').on('click', function(event){
        console.log('you clicked low')
    
        if(counties){
            map.removeLayer(counties)
            }
            counties = new L.geoJson();
            // counties.addTo(map);
            counties = L.geoJson(cdata, {
                style: style2,
                onEachFeature: onEachFeature
            }).addTo(map);     
    });
});

$(document).ready(function(){
    $('#highBtn').on('click', function(event){
        console.log('you clicked low')
        if(counties){
            map.removeLayer(counties)
            }
            counties = new L.geoJson();
            // counties.addTo(map);
            counties = L.geoJson(cdata, {
                style: style2,
                onEachFeature: onEachFeature
            }).addTo(map);     

    });
});

$(document).ready(function(){
    $('#showAll').on('click', function(event){
        console.log('you clicked low');
        if(counties){
        map.removeLayer(counties)
        // map.removeLayer(geojson);
        }
        counties = new L.geoJson();
        // counties.addTo(map);
        counties = L.geoJson(cdata, {
            style: style2,
            onEachFeature: onEachFeature
        }).addTo(map);       
    });
});

$(document).ready(function(){

    $('body').on('click', '#infoPage', function(event){
        console.log('you clicked');
        alert('')
    });
    
    $('body').on('click', '#fipsBtn', function(event){
        
        var userInputData = $('#fipsSearch').val();
        
        userSelect(map);

        console.log(userInputData)
    });
    
})
// })