//array of topics 
var topics = ['anime', 'video games', 'skateboarding', 'piano', 'dragonball z ' ];

var next = 0; 
var topic; 

//creates buttons on the page initially
for(var i = 0 ; i < topics.length; i++){
    
        // for adding button & attributes
        var button = $('<button>');
        button.append(topics[i]);
        button.addClass('gif-btn');
        button.attr('data-name', topics[i]);
        button.addClass('btn btn-default gif-btn')
       
         //adds buttons to the page 
        $('.gif-buttons').append(button); 
    }

//empties the gif-view 
function emptyGifs(){
    $('.gif-view').empty(); 
}

//creates a moreResults button to get additional images
function moreResults(name){
    if(topic === name){
        next+=10; 
    }
    else{
        topic = name; 
        next = 10; 
    }
    //creates more results button 
    $('.gif-view').append('<div id ="more-results"<button class = "btn btn-primary">More Results</button></div><br>'); 
    
    //sets the more results on click handler 
    $('#more-results').on('click', function(){

      createImages(name, next)
    } )
    
    console.log('more results set')
}

//gets and creates the images on the page 
function createImages(dataName, offset){
        emptyGifs(); 
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q='+dataName+ '&limit=10&offset='+offset+'&api_key=dc6zaTOxFJmzC&tag'; 
            
        //ajax request  
        $.ajax({url:queryUrl, Method: 'GET'}).done(function(response){
            
            //console response
            console.log(response); 
            
            //loops through reponse data array 
            for(var i = 0 ; i < 10; i++){
                
            //local variables
            var static, animated, rating;
            var div = $('<div>');
            var img = $('<img>');  
            //sets the static image, the animated image and the rating
            static = response.data[i].images.fixed_height_still.url; 
            animated = response.data[i].images.fixed_height.url; 
            
            //if there is no rating, set the rating to NR
            if(response.data[i].rating === ''){
                rating = 'NR'; 
            }
            else{
                rating = response.data[i].rating; 
            }
                
            //sets the image attributes
            img.attr('src', static); 
            img.attr('data-static', static ); 
            img.attr('data-animated', animated); 
            img.attr('data-state', 'static');
            img.addClass('gif-images'); 
            
            //appends the gif to the page
            div.append(img);
            div.append('<div>Rating: '+ rating+ '</div>');
            div.addClass('gif-div'); 
            $('.gif-view').append(div); 
            
                   
        }
            
        //img on click handler
        $('.gif-images').on('click', function(){
             var self = $(this); 
             var dataState = $(this).attr('data-state');
             var static = self.attr('data-static'); 
             var animated = self.attr('data-animated'); 
            
            
            //sets the image url based on the data-state attribute 
            if(dataState === 'static'){
                self.attr('src', animated); 
                self.attr('data-state', 'animated'); 
            }
            else{
                self.attr('src', static); 
                self.attr('data-state', 'static'); 
            }
        })
    }) 
        //calls the moreResults function  
        moreResults(dataName);    
}


// #add on click handler 
$('#add').on('click',function(){
    var newBtn = $('#add-btn-field').val().trim(); 
    
    //pushes the search to the gif buttons array
        topics.push(newBtn); 
        
        //last index in the array 
        var end = topics.length-1;
    
        //creates button and adds attributes and class 
        var button = $('<button>');
         button.append(topics[end]);
         button.attr('data-name', topics[end]);
         button.addClass('btn btn-default gif-btn')
         
         //button on click handler 
         button.on('click', function(){
            var self = $(this);
    
            //call to createImages 
             createImages(self.attr('data-name'), 0); 
         })
       
        //adds buttons to the page 
        $('.gif-buttons').append(button); 
             
})

//on click handler for the newly created button 
$('.gif-btn').on('click', function(){
    var self = $(this);
    
    //call to createImages 
    createImages(self.attr('data-name'), 0);  
    
             
})
    

