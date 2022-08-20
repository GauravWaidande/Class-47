var canvas,back,back2;
var form,game,player,playerImg,playerCount;
var gameState=0,kScore=0,bScore=3,lScore=3;
var keyImg,kLogo,k,Ktouching=0,lifeImg,lLogo,life,Ltouching=0,bLogo;
var stoneGroup,stoneImg,stone1,stone2,stone3,stone4,stone5,stone6,stone7,stone8,stone9,stone10;
var stone11,stone12,stone13,stone14,stone15,stone16,stone17,stone18,stone19,stone20,stone;
var thornsImg,thorns,treasureImg,treasure,rubyImg,ruby,gunImg,gun,bulletImg,bullet,lock,lock2,lockImg,coinImg,coin;
var skullImg,skull,crocDImg,crocUImg,croc1,croc2,snakeImg,snake;

function preload() {
  back=loadImage("cave.jpg");
  back2=loadImage("grass.jpg");
  playerImg=loadImage("hunter.png");
  keyImg=loadImage("key.png");
  lifeImg=loadImage("heart.png");
  stoneImg=loadImage("stone.png");
  thornsImg=loadImage("thorns.png");
  treasureImg=loadImage("chest.png");
  rubyImg=loadImage("ruby.png");
  gunImg=loadImage("gun.png");
  bulletImg=loadImage("bullet.png");
  coinImg=loadImage("coin.png");
  skullImg=loadImage("skull.png");
  crocDImg=loadImage("crocD.png");
  crocUImg=loadImage("crocU.png");
  snakeImg=loadImage("snake.jpg");
  lockImg=loadImage("OIP.png");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  game = new Game();
  game.start();

}

function draw() {

  background(back);

  switch (gameState) {
    case 0:
      fill("red");
      textSize(40);
      text("Treasure Hunter",width/2-125,height/2-75);    
    break;

    case 1:
      fill("yellow");
      textSize(30);
      text("Hello " + this.form.input.value(),width/2-300,150);
      text("You have been assigned to go in the cave and collect",width/2-300,185);
      text("the treasures and the most precious Ruby. To reach there",width/2-300,220);
      text("use the arrow keys to control the player. Each time you fall",width/2-300,255);
      text("1 life gets destroyed. To open the treasure box you have",width/2-300,290);
      text("to collect 3 keys. But beware it will not be that easy.",width/2-300,325);

      game.setElementsPosition();
      game.setElementsStyle();
      game.handlemousePressed();
    break;

    case 2:
      push();
        fill("yellow");
        textSize(25);
        text(""+bScore,width-280,28);
        text(""+kScore,width-70,28);
        text(""+lScore,width-180,28);
      pop();
      push();
      fill("yellow");
      textSize(15);
      text("" + this.form.input.value(),player.x-5,player.y-90);
      pop();

      game.handleControl();
      game.display();

      if(kScore<3){
        lock2=createSprite(stone.x-237,treasure.y-300,25,625);
        lock2.shapeColor="#DE711F";
        player.collide(lock2);
        lock=createSprite(stone.x-237,treasure.y-250,10,10);
        lock.addImage("l1",lockImg);
        lock.scale=0.20;
        if(stone.x===width-150){
         textSize(25);
         fill("red");
         text("Ohh No You don't have enough keys",90,200);
        }
      }
       
      if(stone.x===width-150){
        stoneVelocity();
        player.velocityX=0;
        k.velocityX=0;
        k.x=1000;
        life.velocityX=0;
        thorns.velocityX=0;
        treasure.velocityX=0;
        skull.velocityX=0;
        if(kScore>=3){
          textSize(25);
          fill("red");
          text("Congrates You have found the treasure",50,110);
          text("In level 2 you will have to get out of the cave to reach till the Ruby",50,140);
          text("But beware of the wild Reptiles",50,170);
          text("Press N to into the Level 2",50,200);
          if(keyDown("n")){
          gameState=5;
          }
        }
      }

      stoneDestroy();

      if(player.isTouching(k)||k.x<0){
        if(player.isTouching(k)){
          kScore+=1;
          Ktouching+=1;
        }
        if(Ktouching===1){
         k.position.x=stone8.x-25;
         k.position.y=stone8.y-150;
        }
        if(Ktouching===2){
          k.position.x=stone13.x-25;
          k.position.y=stone13.y-150;
         }
         if(Ktouching===3){
          k.position.x=-100;
          k.position.y=-100;
         }
      }

      if(player.isTouching(life)||life.x<0){
        if(player.isTouching(life)&&lScore<3){
         lScore+=1;
        }
        Ltouching+=1;
        if(Ltouching===1){
          life.position.x=stone15.x;
          life.position.y=stone15.y-100;
        }
        if(Ltouching===2){
          life.position.x=-100;
          life.position.y=-100;
        }
      }

      if((player.y>height||player.y<0||player.x<0||player.x>width)&&stone.x!=width-150){
        lScore-=1;
        gameState=3;
      }
      
      if(player.isTouching(thorns)){
        lScore-=1;
        gameState=3;
      }

      if(thorns.x<0){
        if(thorns.y===443){
          thorns.x=2202;
          thorns.y=418;
        }
        thorns.x=5402;
        thorns.y=468;
      }

      if(skull.x<0){
        if(skull.x===stone4.x){
          skull.x=stone10.x;
          skull.y=stone10.y-100;
        }
        skull.x=stone17.x;
        skull.y=stone17.y-100;
        if(skull.x===stone17.x){
          skull.x=-100;
          skull.y=-100;
        }
      }

      if(lScore===0){
        gameState=4;
      }
    break;


   case 3:
      textSize(25);
      fill("yellow");   
      text("Press Right Arrow to restart",300,200);
     
      player.position.x=50;
      player.position.y=250;
      gun.position.x=player.x;
      gun.position.y=player.y-50;
      life.position.x=1925;
      life.position.y=125;
      k.position.x=975;
      k.position.y=125;
      skull.position.x=stone4.x;
      skull.position.y=285;
      thorns.position.x=998;
      thorns.position.y=443;
      stone1.position.x=48;
      stone2.position.x=575;
      stone3.position.x=1000;
      stone4.position.x=1400;
      stone5.position.x=1925;
      stone6.position.x=2425;
      stone7.position.x=2800;
      stone8.position.x=3200;
      stone9.position.x=3625;
      stone10.position.x=4000;

      stone11.position.x=4400;
      stone12.position.x=4825;
      stone13.position.x=5200;
      stone14.position.x=5600;
      stone15.position.x=6025;
      stone16.position.x=6400;
      stone17.position.x=6800;
      stone18.position.x=7225;
      stone19.position.x=7600;
      stone20.position.x=8050;
      stone.position.x=8450;
      lock.x=stone.x-327;
      lock2.x=stone.x-327;
      treasure.position.x=8485;

      kScore=0;
      Ktouching=0;
      Ltouching=0;

      if(keyDown(RIGHT_ARROW)){
        gameState=2;
      }

    break;

    case 4:
      background("black");
      textSize(25);
      fill("red");
      text("Sorry "+this.form.input.value()+" Game Over",200,200);
      stoneGroup.destroyEach();
      kLogo.destroy();
      k.destroy();
      lLogo.destroy();
      life.destroy();
      thorns.destroy();
    break;

    case 5:   
       background(back2);

      push();
        fill("yellow");
        textSize(25);
        text(""+lScore,width-180,28);
      pop();
      
      fill("yellow");
      text("" + this.form.input.value(),player.x-25,player.y-55);

      stoneGroup.destroyEach();

    break;

    default:

    break;
  }

  if(gameState!=0){
   fill("red");
   textSize(30);
   text("Treasure Hunter",width/2-100,50);
  }
  
}

function Position(a){

  if(a===2){
    player.position.x=50;
    player.position.y=250;
    gun.position.x=50;
    gun.position.y=260;
    stone1.position.x=48;
    stone2.position.x=575;
    stone3.position.x=1000;
    stone4.position.x=1400;
    stone5.position.x=1925;
    stone6.position.x=2425;
    stone7.position.x=2800;
    stone8.position.x=3200;
    stone9.position.x=3625;
    stone10.position.x=4000;

    stone11.position.x=4400;
    stone12.position.x=4825;
    stone13.position.x=5200;
    stone14.position.x=5600;
    stone15.position.x=6025;
    stone16.position.x=6400;
    stone17.position.x=6800;
    stone18.position.x=7225;
    stone19.position.x=7600;
    stone20.position.x=8050;
    life.position.x=1925;
    life.position.y=125;
    k.position.x=975;
    k.position.y=125;
    skull.position.x=stone4.x;
    skull.position.y=285;
    stone.position.x=8450;
    lock.x=stone.x-327;
    lock2.x=stone.x-327;
    treasure.position.x=8485;
  }

  if(a===1){
      
  }

}

function stoneVelocity(){

        stone.velocityX=0;
        stone1.velocityX=0;
        stone2.velocityX=0;
        stone3.velocityX=0;
        stone4.velocityX=0;
        stone5.velocityX=0;
        stone6.velocityX=0;
        stone7.velocityX=0;
        stone8.velocityX=0;
        stone9.velocityX=0;
        stone10.velocityX=0;
        stone11.velocityX=0;
        stone12.velocityX=0;
        stone13.velocityX=0;
        stone14.velocityX=0;
        stone15.velocityX=0;
        stone16.velocityX=0;
        stone17.velocityX=0;
        stone18.velocityX=0;
        stone19.velocityX=0;
        stone20.velocityX=0;      

}

function stoneDestroy(){
  if(stone1.x<0){
    stone1.destroy();
  }
  if(stone2.x<0){
    stone2.destroy();
  }
  if(stone3.x<0){
    stone13.destroy();
  }
  if(stone4.x<0){
    stone4.destroy();
  }
  if(stone5.x<0){
    stone5.destroy();
  }
  if(stone6.x<0){
    stone6.destroy();
  }
  if(stone7.x<0){
    stone7.destroy();
  }
  if(stone8.x<0){
    stone8.destroy();
  }
  if(stone9.x<0){
    stone9.destroy();
  }
  if(stone10.x<0){
    stone10.destroy();
  }
  if(stone11.x<0){
    stone11.destroy();
  }
  if(stone12.x<0){
    stone12.destroy();
  }
  if(stone13.x<0){
    stone13.destroy();
  }
  if(stone14.x<0){
    stone14.destroy();
  }
  if(stone15.x<0){
    stone15.destroy();
  }
  if(stone16.x<0){
    stone16.destroy();
  }
  /*if(stone17.x<0){
    stone17.destroy();
  }
  if(stone18.x<0){
    stone18.destroy();
  }
  if(stone19.x<0){
    stone19.destroy();
  }
  if(stone20.x<0){
    stone20.destroy();
  }*/
}

function shootF(){

if(bScore>0){
  bullet=createSprite(gun.position.x+50,gun.position.y-8,10,10);
  bullet.addImage("b1",bulletImg);
  bullet.scale=0.02;
  bullet.velocityX=20;
  bullet.setCollider("rectangle",0,0,50,50);
  bullet.debug=true;

  bScore-=1;

}

if(skull.isTouching(bullet)){
  console.log("BulletTouchingSkull");
  bullet.destroy();
  if(skull.x===stone4.x){
    skull.x=stone10.x;
    skull.y=stone10.y-100;
    console.log("stone4");
  }else{
    skull.x=stone17.x;
    skull.y=stone17.y-100;
    console.log("stone10");
  }
  if(skull.x===stone17.x){
    skull.destroy();
  }
   
  }

}