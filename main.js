console.log("Hello!");
song="";
song2="";
songStatus="";
songStatus2="";
scoreLeftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload()
{
    song=loadSound("Psych Theme.mp3");
    song2=loadSound("Psych Theme.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded!");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y "+rightWristY);
    }
}
function draw()
{
    image(video,0,0,600,500);
    songStatus = song.isPlaying();
	songStatus2 = song2.isPlaying();
    fill("#FF0000");
	stroke("#FF0000");

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
        song1.stop();
		if(songStatus == false)
		{
			song2.play();
			document.getElementById("button").innerHTML = "Playing - Psych Theme";
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}

