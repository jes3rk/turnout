var testMonkey;
var counties;
var choicep

$(document).ready(function(){
    $('#lowBtn').on('click', function(event){
        console.log('you clicked low')
        console.log(this.getAttribute('data-name'));
        choice = this.getAttribute('data-name');
        console.log(choice);
        
        voterLayer(); 
    });

    $('#medBtn').on('click', function(event){
        console.log('you clicked low')
        choice = this.getAttribute('data-name');
        
    voterLayer();  
    });


    $('#highBtn').on('click', function(event){
        console.log('you clicked low');
        choice = this.getAttribute('data-name');
        
        voterLayer();    

    });


    $('#showAll').on('click', function(event){
        console.log('you clicked low');
        choice = this.getAttribute('data-name');
        
        voterLayer();
     
});


    $('body').on('click', '#infoPage', function(event){
        

        $.ajax("/api/data/" + userCode, {
            type: "GET"
          }).then(
            function() {
              
              location.assign('/');
            }
          );
        });
    
    $('body').on('click', '#fipsBtn', function(event){
        
        var userInputData = $('#fipsSearch').val();

        userSelect(map);

        console.log(userInputData)
    });
});

function voterLayer (choice){
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
        // btnStyle(counties, choice)
}