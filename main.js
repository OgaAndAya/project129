song1= " ";
song2= " ";

song1_status= " ";
song2_status= " ";

function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("song2.mp3");
}


scoreRightWrist=0;
scoreLeftWrist=0;

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;


function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelloaded);
    poseNet.on('Pose', gotPoses);

    
}

function modelloaded(){
    console.log("Pose Net is Initialized");
}

function gotPoses(results){
    if(results.gotPoses>0){
        console.log(results);
        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist=" + scoreRightWrist + "scoreLeftWrist=" + scoreLeftWrist);
        
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX= "+ rightWristX + "rightWristY=" + rightWristY);
   
        leftWristX= results[0].pose.leftWrist.x;
       leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX= "+ leftWristX + "leftWristY=" + leftWristY);
   
       }
   }

   function isPlaying(){
       if(leftWristY>0.2){
           song.play("music.mp3");
           circle(leftWristX,leftWristY,20)
           document.getElementById("song1").innerHTML= "Playing Song 1"+ music.mp3;
       }
       else if(leftWristY>!0.2){
           document.getElementById("song1").innerHTML= "Your Arms need to be shown for the music";
       }
       if(rightWristY>0.2){
        song.play("song2.mp3");
        circle(leftWristX,leftWristY,20)
        document.getElementById("song2").innerHTML= "Playing Song 2"+ song2.mp3;
    }
    else if(rightWristY>!0.2){
        document.getElementById("song2").innerHTML= "Your Arms need to be shown for the music";
    }
   }

function draw(){
    image(video,0,0,600,500)
    circle(leftWristX,leftWristY,20)
   
}

function play(){
    song.play();
}
