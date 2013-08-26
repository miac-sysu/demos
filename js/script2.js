$(document).ready(function(){
	alert("good");
        init();
});

function init(){
	// context of canvas
	canvas = $("#canvas").get(0);
        $canvas = $(canvas);
        ctx = canvas.getContext("2d");
        
	// button setting
	var $start = $("#switch");
	var $add = $("#add");
	var $clear = $("#clear");
        var $reduce = $("#reduce");
        
 	 $("div.header").toggle(function(){
    		$(this).animate({"height":"330px"},400);
 	 },function(){
         	$(this).animate({"height":"80px"},400);
         });
         
  	$start.toggle(function(){
        	
        },function(){
        	
        });
        
	$add.click(function(){
		
	});
        
	$clear.click(function(){
		
	});
        
  	$reduce.click(function(){
        	
        });
        
  	$("div.button button:first").toggle(function(){
        	$(this).stop(false,true);
          	$(this).animate({"width":"250px"},400);
        }, function(){
        	$(this).stop(false,true);
        	$(this).animate({"width":"150px"},400);
        });
}