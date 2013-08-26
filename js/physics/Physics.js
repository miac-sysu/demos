// constructor of Force 
var color = ["#FFA","#CDCD00","#EEC900","#9ACD32","#FFD39B","#000000"];
function Force( size, angle ){
	this.size = size;
	this.angle = angle;
	this.Fy = size * Math.sin( Math.PI * (angle / 180 ) );
	this.Fx = size * Math.cos( Math.PI * (angle / 180 ) );
};

// constructor of Shape(SuperClass)
function Shape( x, y, mass, hasGravity ){
	this.x = x || 0;
	this.y = y || 0;
        this.color = color[ Math.floor( Math.random() * 6 )];
	this.mass = mass || 1;
	this.hasGravity = hasGravity == false ? false : true;
	this.Vx = 0;
	this.Vy = 0;
  	this.gravity = {
          	y : 0.04,
          	x : 0,
        }
	this.forces = [];
	this.draw = function(){
		this.ctx.save();
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(10,10,Math.random() * 5 + 5,0,Math.PI * 2, false);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.restore();
	}
}
Shape.prototype = {

	constructor : "Shape",

	ctx : null,

	countSpeed : function(){
		var forces = this.forces;
		var Fx = 0;
		var Fy = 0;
		for(var i in forces){
			Fx += forces[i].Fx;
			Fy += forces[i].Fy;
		}
		this.Vx += Fx / this.mass;
		this.Vy += Fy / this.mass;
                this.Vx += this.hasGravity ? this.gravity.x : 0;
		this.Vy += this.hasGravity ? this.gravity.y : 0;
                this.x += this.Vx;
		this.y += this.Vy;
		
	},
	
	move : function(){
		this.countSpeed();
		var ctx = this.ctx;
		ctx.save();
		ctx.translate( this.x, this.y );
		this.draw();
		ctx.restore();
	}
}

  // inheritance function : is used to inheri prototype from the other class
function inheri( superType, subType ){
	var tempPrototype = new Object( superType.prototype );
        subType.prototype = tempPrototype;
        subType.prototype.constructor = subType;
};

