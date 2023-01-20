var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
var ball;
/* ball speed */
var dx = 4;
var dy = 4;
var rec;
/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
/* Score */
var txt = new Text("Score:", "10pt Arial");
txt.setColor(Color.black);
txt.setPosition(getWidth()/2-50,getHeight());
var BALL_RADIUS = 15;
var move=true;
var mark=0;
var a=1;
add(txt);
function start(){
    
    while(true){
        
        if(BRICK_SPACING>22+BRICK_WIDTH*10){
            BRICK_TOP_OFFSET=BRICK_TOP_OFFSET+BRICK_HEIGHT+2;
            BRICK_SPACING=BRICK_SPACING-BRICK_SPACING+2;
        }
        
        var brick=new Rectangle(BRICK_WIDTH,BRICK_HEIGHT);
        
        if(BRICK_TOP_OFFSET>9){
            brick.setColor(Color.red);
        }
        if(BRICK_TOP_OFFSET>32){
            brick.setColor(Color.orange);
        }
        if(BRICK_TOP_OFFSET>56){
            brick.setColor(Color.green);
        }
        if(BRICK_TOP_OFFSET>80){
            brick.setColor(Color.blue);
        }
        if(BRICK_TOP_OFFSET>104){
            break;
        }
        
        brick.setPosition(BRICK_SPACING,BRICK_TOP_OFFSET);
        add(brick);
        BRICK_SPACING=BRICK_SPACING+2;
        BRICK_SPACING=BRICK_SPACING+BRICK_WIDTH;
    }  
    ball = new Circle(20);
	ball.setPosition(getWidth()/2, getHeight()/2);
	ball.setColor(Randomizer.nextColor);
	add(ball);
	setTimer(draw, 20);
    rec = new Rectangle(120,10);
    rec.setPosition(getWidth()/2-60,getHeight()-20);
    add(rec);
}
/* This program has a ball bounce around the screen. */
/* Check if the ball has reached a wall.*/
/* Then move the ball in the correct direction.*/
function draw(){
	checkWalls();
	mouseClickMethod(begin);
	mouseMoveMethod(select);
	if(move==true){
	    ball.move(dx, dy);
	}
	
}
function begin(){
    move=true;
}
function select(e){
    rec.setPosition(e.getX()-60,getHeight()-20);
}
function checkWalls(){
	// Bounce off right wall
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
	}
	
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	
	// Bounce off bottom wall
	if(ball.getY() + ball.getRadius() > getHeight()){
		ball.setPosition(getWidth()/2,getHeight()/2);
		move=false;
	}
	
	// Bounce off top wall
	if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
	}
	var elem = getElementAt(ball.getX(), ball.getY()-20);
	
    if (elem != null){
        mark=mark+a;
        txt.setText("Score:"+mark);
        // ball.setColor(elem.getColor())
        remove(elem);
        dy=-dy+1;
        dx=dx-1;
        a++;
    }
    
    if(ball.getY()+ball.getRadius()>getHeight()-15&&ball.getX()>rec.getX()&&ball.getX()<rec.getX()+120){
        dy= -dy;
    }
    
	
}