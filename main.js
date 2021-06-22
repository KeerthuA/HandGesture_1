prediction_1 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    });
}

console.log("ml5 version: ",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mmbBlTMbp/model.json', modelLoded);
function modelLoded()
{
    console.log('Model Loaded');
}

function speak(){
    console.log("i am in speak function")
    var synth = window.speechSynthesis;
    speak_data_1 = "The Prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);

}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
         prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Good")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "clapps")
        {
            document.getElementById("update_emoji").innerHTML = "&#128079;";
        }
        if(results[0].label == "Protest")
        {
            document.getElementById("update_emoji").innerHTML = "&#9994;";
            
        }
        if(results[0].label == "Stop")
        {
            document.getElementById("update_emoji").innerHTML = "&#9995;";
            
        }
    }
}