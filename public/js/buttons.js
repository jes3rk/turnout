var testMonkey;
var counties;

$(document).ready(function(){
    $('#lowBtn').on('click', function(event){
        console.log('you clicked low')
        console.log(this.getAttribute('data-name'));
        testMonkey = 'low';
    });
});

$(document).ready(function(){
    $('#medBtn').on('click', function(event){
        console.log('you clicked low')
        map.removeLayer(counties);
    });
});

$(document).ready(function(){
    $('#highBtn').on('click', function(event){
        console.log('you clicked low')


        // counties.layerremove();

    });
});

$(document).ready(function(){
    $('#showAll').on('click', function(event){
        console.log('you clicked low');
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

// $(document).ready(function(){

//     $('#infoPage').on('click', function(event){
//         console.lot('you clicked');
//         alert('')
//     });
// })

function getData(){
    console.log('test');
}