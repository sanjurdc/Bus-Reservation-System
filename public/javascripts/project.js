
   
   
   $(document).ready(function(){
    var serverURL= "http://localhost:3000"
    $.getJSON(`${serverURL}/bus/fetch_all_stateid`,function(data){
        
        data.stateid.map((item)=>{
            
    $('#stateid').append($('<option>').text(item.statename).val(item.stateid))
         alert(item.statename)
        })
        $('#stateid').formSelect();
    })

    // cityid //

    $('#stateid').change(function(){
    $.getJSON(`${serverURL}/bus/fetch_all_cityid`,{'stateid':$('#stateid').val()}, function(data){
        $('#cityid').empty()
        $('#cityid').append($('<option>').text('Choose Your Option'))
        data.cityid.map((item)=>{
           
    $('#cityid').append($('<option>').text(item.cityname).val(item.cityid))

        })
       
    })
}) 

// BUS TYPE //

$.getJSON(`${serverURL}/bus/fetch_all_bustypeid`,function(data){
    
    data.bustypeid.map((item)=>{
        
$('#bustypeid').append($('<option>').text(item.bustypename).val(item.bustypeid))

    })
    
})

//  BUS NAME   //

$.getJSON(`${serverURL}/bus/fetch_all_busnames`,function(data){
    
    data.busnames.map((item)=>{
        
$('#busnames').append($('<option>').text(item.busname).val(item.busnameid))

    })
    $('#busnames').formSelect();
})

//    busmodel    //

$('#busnames').change(function(){
    $.getJSON(`${serverURL}/bus/fetch_all_busmodel`,{'busnameid':$('#busnames').val()}, function(data){
       
        $('#busmodel').empty()
        $('#busmodel').append($('<option>').text('Choose Your Option'))
        data.busmodel.map((item)=>{
           
    $('#busmodel').append($('<option>').text(item.busmodelname).val(item.busmodelid))

        })
        $('#busmodel').formSelect();
    })
}) 
    // source state   //
    
$.getJSON(`${serverURL}/bus/fetch_all_sourcestate`,function(data){
   
    data.sourcestate.map((item)=>{
        
$('#sourcestate').append($('<option>').text(item.statename).val(item.stateid))

    })
    $('#sourcestate').formSelect();
})

// source city //

$('#sourcestate').change(function(){
$.getJSON(`${serverURL}/bus/fetch_all_sourcecity`,{'stateid':$('#sourcestate').val()}, function(data){
    $('#sourcecity').empty()
    $('#sourcecity').append($('<option>').text('Choose Your Option'))
    data.sourcecity.map((item)=>{
       
$('#sourcecity').append($('<option>').text(item.cityname).val(item.cityid))

    })
   
})
}) 

// destination state   //
    
$.getJSON(`${serverURL}/bus/fetch_all_destinationstate`,function(data){
 
    data.destinationstate.map((item)=>{
       
$('#destinationstate').append($('<option>').text(item.statename).val(item.stateid))

    })
    
})

// destination city //

$('#destinationstate').change(function(){
$.getJSON(`${serverURL}/bus/fetch_all_destinationcity`,{'stateid':$('#destinationstate').val()}, function(data){
    $('#destinationcity').empty()
    $('#destinationcity').append($('<option>').text('Choose Your Option'))
    data.destinationcity.map((item)=>{
       
$('#destinationcity').append($('<option>').text(item.cityname).val(item.cityid))

    })
    
})
}) 

})