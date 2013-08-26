$(document).ready(function(){
        // animation
      	init();
	anim();
});

var mousePoint = {
  	x : 500,
  	y : 250
};

function init(){

	$canvas = $("#canvas");
	canvas = $canvas.get(0); 
	ctx =  canvas.getContext("2d");
        
        //ctx.globalAlpha = 0.5;
        ctx.fillStyle = "rgba(0,0,0,0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();


	// set context of Shape
        Shape.prototype.ctx = ctx;
        Leaf.prototype.countSpeed = rotate;
  	
        // shapes array
	shapes = [];
        
        // there are 10 moving stuff on the screen at the start
  	for(var i = 0; i < 10; i++){
        	shapes.push(new Leaf(Math.random() * 1000, Math.random() * 1000, 1, 10));
        }
       
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
        	$(this).html("Fall");
        	Leaf.prototype.countSpeed = countSpeed;
        },function(){
        	$(this).html("Rotate");
        	Leaf.prototype.countSpeed = rotate;
        });
        
	$add.click(function(){
		var tempShape = newLeaf();
		shapes.push(tempShape);
                $("div.button span").html(shapes.length);
	});
        
	$clear.click(function(){
		shapes.splice(0,shapes.length);
                $("div.button span").html(shapes.length);
	});
        
  	$reduce.click(function(){
        	shapes.pop();
                $("div.button span").html(shapes.length);
        });
        
  	$("div.button button:first").toggle(function(){
        	$(this).stop(false,true);
          	$(this).animate({"width":"250px"},400);
        }, function(){
        	$(this).stop(false,true);
        	$(this).animate({"width":"150px"},400);
        });
        
        
        
        // mousemove event        
  	$canvas.mousedown(function(event){
        	var x = event.pageX - $(this).offset().left;
                var y = event.pageY - $(this).offset().top;
                mousePoint.x = x;
                mousePoint.y = y;
                Leaf.prototype.i *= -1;
        });
       
}


function anim(){
	requestAnimFrame(anim);
	animation();
       // draw(ctx);
}


function animation(){


	ctx.fillStyle = "rgba(0,0,0," + parseFloat( $("#tail").val() ) + ")";
	ctx.fillRect(0,0,canvas.width,canvas.height);
        
        
	for(var i in shapes){
		shapes[i].move();
		if(shapes[i].y > 700 || shapes[i].x > 960 || shapes[i].x < 100){
			var tempShape =  newLeaf();
                    	shapes.splice(i ,1, tempShape);                       
		}
	};
        
}

function newLeaf(){
	var tempShape = new Leaf(Math.random() * 1000, Math.random() * 1000 , 1, 10);
	tempShape.forces.push( new Force(Math.random() * 1, 45 + Math.random() * 135) );
        return tempShape;
};

