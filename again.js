<html>
	<head>
		<link rel="stylesheet" type="css" href="chickenstyle.css">
		<script src="processing-1.4.1.js"></script>
		<script type="text/processing" data-processing-target="mycanvas">
			//this makes our chicken, assumed start position will be(200,200)
			Chicken chic = new Chicken(200,200,5);
			//this makes the first level of the maze
			Maze first = new Maze();
			//THESE HAVE TO BE GLOBAL VARIABLES
			var boxes=[];
			//add boxes here
			boxes.push(new Block(250,250,40,40), new Block(400,400,50,80), new Block(400, 100, 60,20));
			var f=first.getFeathers();
			Guards bob=new Guards(400,200);
			var dir= null;
			var moveThem;
			
			var score =0;
			
			void setup(){
			  size(900,600);
			  background(200);
			  fill(200);
			  PFont fontA = loadFont("courier");
			  textFont(fontA, 14);
			}

			void draw(){  
				background(200,255,255);
				chic.draw();
					//See line 167 first. Once we return the list, we have to save it in a variable, and that variable will be the parameters in the checkPosition functions
					//var b=first.getBoxes();
					//inside the drawMaze function is the drawFeathers function and drawGuards function
				first.drawMaze();
				console.log("FSFAF");
				checkGuards();
				arrow(keyPressed, keyCode);
				
				
			}
			function arrow(keyPressed, keyCode){
				if(keyPressed == true){
					console.log(keyCode);
					if (keyCode == 39 && chic.canMove() == true){
					chic.move("right");
					checkPosition(f);
					}
					else if (keyCode == 39 && chic.canMove() == false){
						chic.move("left");
						chic.move("left");
						chic.move("left");
						checkPosition(f);
					} 
					else if(keyCode == 37 && chic.canMove() == true){
						chic.move("left");
						checkPosition(f);
					}
					else if(keyCode ==37 && chic.canMove()== false){
						chic.move("right");
						chic.move("right");
						chic.move("right");
						checkPosition(f);
					}
					else if(keyCode == 38 && chic.canMove() == true){
						chic.move("up");
						checkPosition(f);
					}
					else if (keyCode ==38 && chic.canMove() ==false){
						chic.move("down");
						chic.move("down");
						chic.move("down");
						checkPosition(f);					
					}
					else if (keyCode == 40 && chic.canMove() == true){
						chic.move("down");
						checkPosition(f);
					}
					else if (keyCode == 40 && chic.canMove() == false){
						chic.move("up");
						chic.move("up");
						chic.move("up");
						checkPosition(f);
					}
				}
			}
				
	//START OF BLOCK CODE
			class Block{
				//attributes
				var r;
				var t;
				var b;
				var l;
				var h;
				var w; 
				var x;
				var y;
				//constructor
				Block(xVal, yVal, height, width){
					x=xVal;
					y=yVal;
					h = height;
					w = width;
				}
				//methods
				void drawB(){
					t = y;
					b = y+ h;
					l = x;
					r = x+w;					
					fill(0,0,0);
					rect(x,y,w,h);
				}
			}
			
//START OF MAZE CODE
			class Maze{
				//attributes
				//list of feathers
				var feathers=[];
				var guards=[];
				
				//constructor, we don't really need anything in the parameters yet
				Maze(){
					//add the feathers here
					feathers.push(new Feathers(100,100,0), new Feathers(250,250,0), new Feathers(300,300,0), new Feathers(400,400,0));
				}
				
				//methods
				//draw the maze with feathers and guards and boxes
				void drawMaze(){
					for(var i=0; i<feathers.length();i++){
						feathers[i].drawFeathers();
					}
				
					for(var a=0;a<boxes.length;a++){
						//console.log("hi");
						boxes[a].drawB();
					}
					
					//bob.drawGuardsDown();
					bob.moveGuards();					
				}
				
				//If we don't use this function, we wouldn't be able to use the "feathers" list outside of the Maze class. This allows us to return the list feathers. See line 25.
				Array getFeathers(){
					return feathers;
				}
				
				Array getBoxes(){
					return boxes;
				}
			}
//END OF MAZE CODE

			
//TABATHA'S CHICKEN CODE STARTS HERE
			class Chicken{
				//attributes
				var x;
				var y;
				var w;
				//constructor
				Chicken(xVal,yVal,width){
					x=xVal;
					y=yVal;
					w=width;
				}
				//methods
				void draw(){
					noStroke();
					fill(100,100,100); //center
					rect(x,y,w,w);
					fill(178, 136, 93);//white
					rect(x+5,y,w,w);
					rect(x-5,y,w,w);
					rect(x,y-5,w,w);
					rect(x,y+5,w,w);
					rect(x+5,y+5,w,w);
					rect(x-5,y+5,w,w);
					rect(x+5,y-5,w,w);
					rect(x-5,y-5,w,w);
					fill(230,138,0);//orange
					rect(x+5,y+10,w,w);	//feet					
					rect(x-5,y+10,w,w);//feet
					fill(178, 136, 93);//white
					rect(x-10,y,w,w);
					rect(x+10,y-5,w,w);				
					rect(x+10,y,w,w);
					rect(x+10,y-10,w,w);
					fill(230,138,0);
					rect(x+15,y-10,w,w);
					fill(178, 136, 93);//white
					rect(x+10,y-15,w,w);
					rect(x+5,y-10,w,w);
					rect(x+5,y-15,w,w);
					fill(0,0,0);
					rect(x+9.5,y-10,2.5,2.5);	
				}
				void move(dir){
					if (dir == "right"){
						x++;
					}
					else if(dir == "left"){
						x--;
					}
					else if(dir == "up"){
						y--;
					}
					else if(dir == "down"){
						y++;
					}
				}
				void canMove(){
					var move = true;
					for (var i=0; i < boxes.length; i++){
						if (chic.x <boxes[i].r +10&&
							chic.x>boxes[i].l - 10&&
							chic.y >boxes[i].t -10 &&
							chic.y <boxes[i].b +10 ){
								move = false;
							}
					}
					return move;
				}
			}
			
			function arrowPress(e){
					console.log(e.keyCode);
			}
//END OF TABATHA'S CHICKEN CODE

//START OF FEATHERS CODE
			class Feathers{
				//attributes
				var x;
				var y;
				var w;
				
				//constructor
				Feathers(xPos,yPos, width){
					x=xPos;
					y=yPos;
					w=width;
				}
				
				//methods
				void drawFeathers(){
					fill(242, 233, 233);
					rect(x+4,y,w-13,13);
					fill(242, 233, 233);
					rect(x+1,y-8,w-18,17);
					fill(242, 233, 233);
					rect(x-4,y-13,w-17,17);
					fill(235, 221, 221);
					rect(x-8,y-18,w-17,16);
					fill(230, 211, 202);
					rect(x-12,y-23,w-17,15);
					fill(214, 197, 145);
					rect(x-16,y-27,w-17,14);
					fill(219, 211, 188);
					rect(x+4,y+13,w+5,6);
				}
			}
//END OF FEATHER CODE


//CHECKING POS AND UPDATING SCORE FUNCTION
			function checkPosition(feathers){
				for (var i=0;i<feathers.length;i++){
					//Basically if the chicken touches the feather
					if ((chic.x > feathers[i].x-37) && (chic.x < feathers[i].x+9 + feathers[i].w) && (chic.y > feathers[i].y - 47) && (chic.y < feathers[i].y + 19)){
						updateScore();
						//move feather off of the screen
						feathers[i].x=-500;
						feathers[i].y=-500;
					}
				}
			}
			
			function updateScore(){
				score++;
				document.getElementById("score").innerHTML = score;
				console.log(score);
			}
//END OF UPDATING SCORE FUNCTION

//HITTING THE GUARD AND RESTARTING POSITION
			function checkGuards(){
				if((chic.x>bob.g-35) && (chic.x<bob.g+40) && (chic.y>bob.h-47) && (chic.y<bob.h+5)){
					//move chicken back to original starting position
					console.log("WORK");
					chic.x=200;	
					chic.y=200;					
				}
			}
//END OF GUARD CHICKEN INTERACTION

//GUARD CODE START
			class Guards{
				//attributes
				var g;
				var h;
				
				//constructor
				Guards(posx,posy){
				g=posx;
				h=posy;
				}
				
				//methods
				void drawGuardsUp(){
					dir=1;
					if(dir==1){
						//START OF LIGHT
						fill(255, 243, 13);
						rect(g,h,5,5);
						fill(255, 243, 13);
						rect(g-5,h-5,15,5);
						fill(255, 243, 13);
						rect(g-10,h-12,25,7);
						fill(255, 243, 13);
						rect(g-15,h-19,35,7);
						fill(255, 243, 13);
						rect(g-20,h-26,45,7);
						fill(255, 243, 13);
						rect(g-25,h-33,55,7);
						fill(255, 243, 13);
						rect(g-30,h-40,65,7);
						fill(255, 243, 13);
						rect(g-35,h-47,75,7);
						//END OF LIGHT

						//START OF BODY
						fill(0, 0, 0);
						rect(g-5,h+5,17,20);
						//END OF BODY

						//START OF PERSON
						fill(133, 97, 34);
						rect(g-15,h+35,40,19);
						fill(133, 97, 34);
						rect(g-10,h+28,30,29);
						fill(214, 172, 98);
						rect(g-5,h+25,14,3);
						//END OF PERSON
					}
				}
				
				void drawGuardsDown(){
					dir=2;
					if(dir==2){
						//LIGHT
						fill(255, 243, 13);
						rect(g,h,5,5);
						fill(255, 243, 13);
						rect(g-5,h+5,15,5);
						fill(255, 243, 13);
						rect(g-10,h+10,25,7);
						fill(255, 243, 13);
						rect(g-15,h+17,35,7);
						fill(255, 243, 13);
						rect(g-20,h+24,45,7);
						fill(255, 243, 13);
						rect(g-25,h+31,55,7);
						fill(255, 243, 13);
						rect(g-30,h+38,65,7);
						fill(255, 243, 13);
						rect(g-35,h+45,75,7);
						//FLASHLIGHT BODY
						fill(0, 0, 0);
						rect(g-5,h-20,17,20);
						//PERSON
						fill(133, 97, 34);
						rect(g-15,h-49,40,19);
						fill(133, 97, 34);
						rect(g-10,h-52,30,29);
						fill(214, 172, 98);
						rect(g-5,h-23,14,3);
					}
				}
				
				void drawGuardsRight(){
					dir=3;
					if(dir==3){
						//LIGHT
						fill(255, 243, 13);
						rect(g,h,5,5);
						fill(255, 243, 13);
						rect(g+5,h-5,5,15);
						fill(255, 243, 13);
						rect(g+10,h-10,7,25);
						fill(255, 243, 13);
						rect(g+17,h-15,7,35);
						fill(255, 243, 13);
						rect(g+24,h-20,7,45);
						fill(255, 243, 13);
						rect(g+29,h-25,7,55);
						fill(255, 243, 13);
						rect(g+36,h-30,7,65);
						fill(255, 243, 13);
						rect(g+43,h-35,7,75);
						//FLASHLIGHT BODY
						fill(0, 0, 0);
						rect(g-20,h-6,20,17);
						//PERSON
						fill(133, 97, 34);
						rect(g-49,h-20,19,40);
						fill(133, 97, 34);
						rect(g-53,h-15,29,30);
						fill(214, 172, 98);
						rect(g-24,h-6,4,14);
					}
				}
				
				void drawGuardsLeft(){
					dir=4;
					if(dir==4){
						//LIGHTS
						fill(255, 243, 13);
						rect(g,h,5,5);
						fill(255, 243, 13);
						rect(g-5,h-5,5,15);
						fill(255, 243, 13);
						rect(g-12,h-10,7,25);
						fill(255, 243, 13);
						rect(g-19,h-15,7,35);
						fill(255, 243, 13);
						rect(g-26,h-20,7,45);
						fill(255, 243, 13);
						rect(g-33,h-25,7,55);
						fill(255, 243, 13);
						rect(g-40,h-30,7,65);
						fill(255, 243, 13);
						rect(g-47,h-35,7,75);
						//FLASHLIGHT BODY
						fill(0, 0, 0);
						rect(g+5,h-6,20,17);
						//PERSON
						fill(133, 97, 34);
						rect(g+35,h-16,19,40);
						fill(133, 97, 34);
						rect(g+29,h-11,29,30);
						fill(214, 172, 98);
						rect(g+25,h-6,4,14);
					}
				}
				
				void canMoveGuards(){
					moveThem = true;
					for (var i=0; i < boxes.length; i++){
						if (bob.g <boxes[i].r +10&&
							bob.g>boxes[i].l - 10&&
							bob.h >boxes[i].t -10 &&
							bob.h <boxes[i].b +10 ){
								console.log("move is false");
								moveThem = false;
						}
					}
					return moveThem;
				}
				
				void moveGuards(){
					canMoveGuards();
					console.log("HERE");
					if ((dir == 1) && (moveThem == true)){ //if facing up and can move 
						h=h-1;
						drawGuardsUp();
					}
					else if ((dir == 1) && (moveThem == false)){ 
						h=h+30;
						drawGuardsDown();
					} 
					else if((dir == 2) && (moveThem == true)){
						h=h+1;
						drawGuardsDown();
					}
					else if((dir == 2) && (moveThem == false)){
						h=h-30;
						drawGuardsUp();
					}
					else if((dir == 3) && (moveThem == true)){
						g=g+1;
						drawGuardsRight();
					}
					else if((dir == 3) && (moveThem == false)){
						g=g-30;
						drawGuardsLeft();					
					}
					else if((dir == 4) && (moveThem == true)){
						g=g-1;
						drawGuardsLeft();
					}
					else if((dir == 4) && (moveThem == false)){
						g=g+30;
						drawGuardsRight();
					}
					else if(dir==null){
						drawGuardsDown();
						console.log("NULLLL");
					}
				}
			}
//END OF GUARD CODE


		</script>
	</head>
	<body>
		<div>Feather Count</div>
		<div id="score">0</div>
		<canvas id="mycanvas"></canvas>
	</body>
</html>