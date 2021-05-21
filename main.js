song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreleftwrist = 0;
scorerightwrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

mouseY = 0;
function preload()
{
	song2 = loadSound("hedwigs_theme.mp3");
	song1 = loadSound("ill_be_there_for_you.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results){

if(results.length > 0){
        console.log(results);
		scoreleftwrist  = results[0].pose.keypoints[9].score;
		scorerightwrist  = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
console.log("rightwrist x = "+rightWristX+" rightwrist y = "+rightWristY);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftwrist x = "+leftWristX+" leftwrist y = "+leftWristY);
    }
}


	
	function draw(){
		image(video,0,0,600,500);
	fill("#FF0000");
	stroke("#000000");
	strokeWeight(3);
circle(rightWristX,rightWristY,20);

	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();


	if(scoreleftwrist > 0.2){
		circle(leftWristX,leftWristY,20);
song2.stop();
if(song1_status == false){
	
	console.log();
	song1.play(); 
	document.getElementById("song").innerHTML = "Song Name = I'll be there for you";
}
	}

	if(scorerightwrist > 0.2){
		circle(leftWristX,leftWristY,20);
song1.stop();
if(song2_status == false){
	song2.play();
	document.getElementById("song").innerHTML = "Song Name = Hedwig's Theme";
}
	}
	}