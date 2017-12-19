var testMonkey;
var counties;
var choice;

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

    
    $('body').on('click', '#fipsBtn', function(event){  
        var userInputData = $('#fipsSearch').val();
        if(userInputData){
        window.location.href = '/washington/'+userInputData;
        userSelect(map);
        console.log(userInputData)
        }else{
            // alert('enter a fips code')
            window.location.href = '/washington/'+userCode
        }
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