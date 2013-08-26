// Leaf class, inherit from Shape
var sizeOfLeaf = 10;
var minSizeOfLeaf = 10;
function Leaf( x, y , mass, hasGravity, size){
  	
	Shape.call( this, x, y, mass, hasGravity);
        this.size = size || Math.random() * sizeOfLeaf + minSizeOfLeaf;
        this.range = Math.random() * 150 + 100;
        this.angle = 0;
  	this.draw = function(){
        	ctx.save();
                
                /*var w = Math.random() * 10 + 5;
                var h = Math.random() * 10 + 5;
                ctx.fillStyle = "#ffa";
                ctx.fillRect( 0, 0, w, h );*/
                var Tx = Math.random() * this.size;
          	var Bx = Tx > this.size / 2 ? Tx - this.size / 4 : Tx + this.size / 4;
                ctx.beginPath();
                ctx.moveTo(Tx, 0);
          	if(Tx > this.size / 2){
                	ctx.quadraticCurveTo(0, 0, Bx, this.size);
                        ctx.quadraticCurveTo(this.size, this.size, Tx, 0);
                }else {
    			ctx.quadraticCurveTo(0, this.size, Bx, this.size);
                        ctx.quadraticCurveTo(this.size, 0, Tx, 0);
                }
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
                
                // middle line
                ctx.beginPath();
                ctx.moveTo( Tx, 0 );
                ctx.lineTo( Bx, this.size );
                ctx.strokeStyle = "#000";
                ctx.stroke();         
                ctx.restore();
        }
}

inheri( Shape, Leaf );

Leaf.prototype.i = 1;


var countSpeed = Leaf.prototype.countSpeed; 

function rotate(){
	var disX = mousePoint.x - this.x;
        var disY = mousePoint.y - this.y;
        var range = this.range;
        var l = Math.sqrt(disX * disX + disY * disY);
        var angle = Math.asin ( disY / l );

  	if( angle > 0 ){
        	if(disX > 0)
                	angle = angle*2 + 1;
                        
        }else {
        	if(disX > 0)
                	angle = -angle*2 + 1;
        }
        
  	if ( l >= range ){
  		this.x += disX * 0.05;
                this.y += disY * 0.05;
                this.angle = angle;                
     	}else {
        	var _this = this;
          	
        	this.x = mousePoint.x + (this.range -1 ) *  Math.cos((_this.angle) * Math.PI);
          	this.y = mousePoint.y + (this.range -1 ) *  Math.sin((_this.angle) * Math.PI);
                this.angle += this.i * 0.01;
        }
       
}


function inheri( superType, subType ){
	var tempPrototype = new Object( superType.prototype );
        subType.prototype = tempPrototype;
        subType.prototype.constructor = subType;
};

function testOfShapes(){
	alert("shapes");
}

