var boxheight = document.getElementById('container').offsetHeight;
var boxwidth = document.getElementById('container').offsetWidth;
var box_right = document.getElementById('container'.offsetLeft)
var paddleHeight = document.getElementById('paddle1').offsetHeight;
var paddleWidth = document.getElementById('paddle1').offsetWidth;
var ballLength = document.getElementById('ball').offsetHeight;
var positionOfPaddle1= document.getElementById('paddle1').offsetTop;
var positionOfPaddle2 = document.getElementById('paddle2').offsetTop;
var leftSideOfPaddle1 = document.getElementById('paddle1').offsetLeft;
var leftSideOfPaddle2 = document.getElementById('paddle2').offsetLeft;
var topSideOfBall = document.getElementById('ball').offsetTop;
var leftSideOfBall = document.getElementById('ball').offsetLeft;
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var topSpeedOfBall = 10;
var leftSpeedOfBall = 0;
var score1 = 0;
var score2 = 0;



function pressEnter(){
    topSpeedOfBall = 0;
    document.addEventListener('keydown', function(e){
        if(e.keycode == 32 || e.which == 32){
            topSpeedOfBall = 10;
            startBall();
        }
    })
}


function startBall() {
    topSpeedOfBall = 10;
    if(Math.random() < 0.5){
        var side = 1;
    }
    else
    {
        var side = -1
    }

    leftSpeedOfBall = side * (Math.random() * 5 + 6)
    topSpeedOfBall = Math.random() * 5 + 6;
}

function reset(){
    topSpeedOfBall = 0;
    topSideOfBall = 400;
    leftSideOfBall = 715;
    topSpeedOfBall = 0;
    leftSpeedOfBall = 0;
}


// while your holding the key
document.addEventListener('keydown', function(e){
    if(e.keycode == 87 || e.which == 87){
        speedOfPaddle1 = -10;
    }
    if(e.keycode == 83 || e.which == 83){
        speedOfPaddle1 = 10;
    }
    if(e.keycode == 38 || e.which == 38){
        speedOfPaddle2 = -10;
    }
    if(e.keycode == 40 || e.which == 40 ){
        speedOfPaddle2 = 10;
    }
    
})

// while your not holding the key
document.addEventListener('keyup', function(e){
    if(e.keycode == 87 || e.which == 87){
        speedOfPaddle1 = 0;
    }
    if(e.keycode == 83 || e.which == 83){
        speedOfPaddle1 = 0;
    }
    if(e.keycode == 38 || e.which == 38){
        speedOfPaddle2 = 0;
    }
    if(e.keycode == 40 || e.which == 40){
        speedOfPaddle2 = 0;
    }
    
})

window.setInterval(function show() {
    positionOfPaddle1 += speedOfPaddle1;
    positionOfPaddle2 += speedOfPaddle2;

    topSideOfBall += topSpeedOfBall;
    leftSideOfBall += leftSpeedOfBall;

    // stop paddle from leaving top
    if(positionOfPaddle1 <= 10){ // 10 because of top border line
        positionOfPaddle1 = 10;
    }

    if(positionOfPaddle2 <= 10){
        positionOfPaddle2 = 10;
    }

    // Stop paddle from leaving bottom 
    if(positionOfPaddle1 >= boxheight - paddleHeight){
        positionOfPaddle1 = boxheight - paddleHeight;
    }
    if(positionOfPaddle2 >= boxheight - paddleHeight){
        positionOfPaddle2 = boxheight - paddleHeight;
    }

    if(topSideOfBall <= 10 || topSideOfBall >= boxheight - ballLength){
        topSpeedOfBall = -topSpeedOfBall;
    }


    //LeftSideOfPaddle1 + paddleWidth = righsideofPaddle1
    //TopSideOfBall + Balllength = BottomOfBall
    //PositionOfPaddle1 = TopOfPaddle1
    //PositionOfpaddle1 + paddleHeight = BottomOfPaddle1Height
    //LeftSideOfBall + ballLength = rightsideofBall
    //PositionOfPaddle2 = TopOfPaddle2
    //PositionOfpaddle2 + paddleHeight = BottomOfPaddle2Height

    
    // We use Math.random so ball trajectory is not always the same
    if(leftSideOfBall < (leftSideOfPaddle1 + paddleWidth) && (topSideOfBall + ballLength) > positionOfPaddle1 && (topSideOfBall) < (positionOfPaddle1 + paddleHeight) ){
        if(Math.random() < 0.5){ // If it is negative
        leftSpeedOfBall = -leftSpeedOfBall + Math.random() ;
        topSpeedOfBall = -topSpeedOfBall + Math.random();
        }
    }


    if((leftSideOfBall + ballLength) >  leftSideOfPaddle2 && (topSideOfBall + ballLength) > positionOfPaddle2 && (topSideOfBall) < (positionOfPaddle2 + paddleHeight)){
        if(Math.random() < 0.5){ // If it is negative
            leftSpeedOfBall = -leftSpeedOfBall + Math.random() ;
            topSpeedOfBall = -topSpeedOfBall + Math.random();
            }
    }

    if(leftSideOfBall <= box_right){
        score1++;
        reset();

    }

    if(leftSideOfBall + ballLength >= box_right + boxwidth){
        score2++;
        reset();
    }

    document.getElementById('paddle1').style.top = positionOfPaddle1 + 'px';
    document.getElementById('paddle2').style.top = positionOfPaddle2 + 'px';
    document.getElementById('ball').style.top = topSideOfBall + 'px';
    document.getElementById('ball').style.left = leftSideOfBall + 'px';
    document.getElementById('comp-score').innerText = score1.toString()
    document.getElementById('user-score').innerText = score2.toString()



}, 900/60)
