believer_song = "";
unstoppable_song = "";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY=0;
scoreleftWrist=0;
song_Believer="";
scorerightWrist=0;
song_unstoppable="";

function preload()
{
    believer_song = loadSound("music.mp3");
    unstoppable_song = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 530);
    canvas.position(424, 200);

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function draw()
{
    image(video, 0, 0, 600, 530);

    fill("#00ffce");
    stroke("#00ffce");

    song_Believer = believer_song.isPlaying();
    console.log(song_Believer);

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        unstoppable_song.stop();
        if(song_believer == false){
            believer_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Believer Song"
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[9].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}