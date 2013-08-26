$(document).ready(function(){
	var ctx = $("#canvas").get(0).getContext("2d");
	var canvas = document.getElementById("canvas");
	ctx.save();
	});
	ctx.shadowColor = "#888";
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 10;
	ctx.shadowBlur = 10;
	ctx.save();

	ctx.translate(200,200);
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(100,100);
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = "rgba(100,100,100,1)";
	ctx.fillRect(0,0,200,200);

	var $show = $("#show"); var imageData =  ctx.getImageData(0,0,200,200); 
	ctx.restore();
	ctx.save();
	ctx.translate(400,400);

	// circles
	ctx.clearShadow();
	ctx.beginPath();
	ctx.arc(0,0,100,0,Math.PI*(1/2),false);
	//ctx.closePath();
	ctx.stroke();
	//ctx.fill();

	ctx.restore();
	ctx.save();

	// font 
	ctx.font = "80px arial";
	ctx.scale(2,2);
	ctx.rotate(Math.PI * (1/4));
	//ctx.fillText("Hello world",100,50);
	ctx.strokeText("Hello world", 100, 50);

	// transform matrix
	ctx.restore();
	ctx.save();
	ctx.clearRect(0,0,800,800);

	ctx.fillStyle = "#000"; 

	ctx.translate(200,200);
	ctx.fillRect(0,0,50,50);
	ctx.transform(2,0,0,2,400,150);
	ctx.fillRect(0,0,50,50);

	var angle = Math.PI * (1/4);
	var xS = Math.cos(angle);
	var xK = Math.sin(angle);
	var yS = -Math.sin(angle);
	var yK = Math.cos(angle);
	ctx.transform(2*xS, 2*xK, yS, yK, 0, 0);
	ctx.fillRect(0,0,50,50);

	ctx.restore();
	ctx.save();


	// composition
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "#800";
	ctx.fillRect(50, 50, 100, 100);

	ctx.fillStyle = "#9c6";
	ctx.fillRect(100, 100, 100, 100);

	$show.get(0).innerHTML += imageData.height + "<br/>";

	// radial
	ctx.globalAlpha = 1;
	var radialGradient = ctx.createRadialGradient(400,400,100,400,400,200);
	radialGradient.addColorStop(0,"#9fc");
	radialGradient.addColorStop(1,"#ffa");
	ctx.fillStyle = radialGradient;
	ctx.beginPath();
	ctx.arc(400,400,300,0,Math.PI * 2,false);
	ctx.closePath();
	ctx.fill();

	ctx.clearRect(0, 0, 800, 800);

	ctx.u = 400;
	ctx.d = 400;
	reset();
	//bezier(ctx);

	// getImageData
	ctx.fillStyle = "rgba(100,100,100,0.5)";
	ctx.fillRect(0,0,10,10);
	//var imageData = ctx.getImageData(0,0,10,10);
	//var data = getColor(imageData, 10, 10);
	//alert(data.red);*/

	var image = new Image();
	image.src = "images/puppy.jpg";
	var $image = $(image);
	$image.load(function(){
		ctx.drawImage(image,200,200,400,400);
	}); 
	var $canvas = $("#canvas");
	$canvas.mousemove(function(event){
		var offset = $canvas.offset();
		var x = Math.floor( event.pageX - offset.left);
		var y = Math.floor( event.pageY - offset.top);

		try{
			var imageData = ctx.getImageData(x ,y ,1 ,1); 
		}catch(e){
			alert(e);
		}

		var data = imageData.data;
		var color = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + data[3] + ')';
		//var data = getColor(imageData, x, y);  
		//alert(data.red);
		//alert(color);
		$("body").css("background-color", color);
	});

	for(var i in ctx){
		$show.get(0).innerHTML += (i + "<br/>");
	};
});


	// ctx.bezierCurveTo();
function bezier(ctx){
	ctx.clearRect(0,0,800,800);
	ctx.beginPath();
	ctx.moveTo(100,400);
	ctx.bezierCurveTo(300,ctx.u--,500,ctx.d++,700,400);
	ctx.stroke();
	ctx.t =  setTimeout(function(){
		bezier(ctx);
	},1);
};
	// width/height trick
function reset(){
	var $canvas = $("#canvas");
	$canvas.attr("width",$canvas.width());
	$canvas.attr("height",$canvas.height());
}


// my useful reuse function 
function getColor(imageData,x,y){
	var or = ((y - 1) * imageData.width + (x - 1)) * 4;
	return {
		red : imageData.data[or],
		green :imageData.data[or + 1],
		blue :imageData.data[or + 2],
		opacity :imageData.data[or + 3],
		rgba : "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")"
	}
}
