$(document).ready(function(){
	var $canvas = $("#canvas");
	var canvas = $canvas.get(0); 
	var ctx = canvas.getContext('2d');
	//ctx.translate(200,200);
	ctx.save();

	var $button = $("#switch");
	ctx.animated = false;

	var imageData = ctx.createImageData(200,200);
	var max = imageData.width * imageData.height ;
	//alert(max);
	var data = imageData.data;

	for(var i = 0;i < max ; i++){
		data[i * 4] = Math.floor(Math.random() * 255);
		data[i * 4 + 1] = Math.floor(Math.random() * 255);
		data[i * 4 + 2] = Math.floor(Math.random() * 255);
		data[i * 4 + 3] = Math.floor(Math.random() * 255);
	};
	ctx.putImageData(imageData, 200, 200);

	shapes = new Array();
	// create animate objects
	for(var i = 0 ;i < 1; i++){

		var x = Math.floor(Math.random() * 720);
		var y = Math.floor(Math.random() * 720);
		var w, h;
		w = h = Math.floor(Math.random() * 80);
		//var w = Math.floor(Math.random() * 80);

		var temp = new ShapeRect(x, y, w, h);

		shapes.push(temp);
	};

	// test of shapesArc
	var arc =  new ShapeArc();
	ctx.beginPath();
	ctx.arc(arc.x, arc.y, arc.r, arc.begin, arc.end, arc.bool); 
	ctx.stroke();


	// click the button to fire animation
	$button.click(function(){
		if(!ctx.animated){
			//alert(randomColor());
			$(this).text("stop");
			ctx.animated = true;
			animation(ctx,shapes);
		}
		else {
			$(this).text("start");
			ctx.animated = false;
			clearTimeout(ctx.t);
		}
	});
	$add = $("#add").click(function(){
		var x = Math.floor(Math.random() * 720);
		var y = Math.floor(Math.random() * 720);
		var w, h;
		w = h = Math.floor(Math.random() * 80);
		var temp = new ShapeRect(x, y, w, h);
		shapes.push(temp);
	});
});

function ShapeRect (x, y , width, height){
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height; 
	this.color = randomColor();
	this.rotate = 0.01;
} 

function ShapeArc(x, y, r, begin, end, bool){
	this.r = r || Math.random() * 80;
	this.begin = begin || 0;
	this.end = end || Math.PI * ( 7 / 4 );
	this.bool = bool || false;
	this.x = x || Math.random() * (800 - this.r);
	this.y = y || Math.random() * (800 - this.r);
	this.color = randomColor();
	this.rotate = 0.01;
};

function randomColor(){
	return "rgba(" + Math.floor(Math.random() * 255) +
			","    + Math.floor(Math.random() * 255) +
			","	   + Math.floor(Math.random() * 255) + 
			","    + .5 +
			")";
}

function animation(ctx,shapes){
	ctx.restore();
	ctx.save();
	ctx.clearRect(0, 0, 800, 800);
	for(var i in shapes){
		//ctx.fillStyle = randomColor();
		ctx.restore();
		ctx.save();
		var halfw = shapes[i].w/2;
		var halfh = shapes[i].h/2;
		ctx.translate(/*halfx, halfy*/shapes[i].x, shapes[i].y);

		ctx.rotate(Math.PI * (shapes[i].rotate += 0.05));
		ctx.fillStyle = shapes[i].color;
		ctx.fillRect(/*shapes[i].x+=2, shapes[i].y+=2,*//*shapes[i].x*/-halfw, /*shapes[i].y*/-halfh, shapes[i].w, shapes[i].h);
		shapes[i].x += (Math.random() * 4 - 2);
		shapes[i].y += (Math.random() * 4 - 2);
	};
	ctx.t = setTimeout(function(){animation(ctx,shapes);},33);
}
