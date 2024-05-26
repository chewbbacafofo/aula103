classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Lgjhro5qv/model.json' ,modelLoaded);

Webcam.attach('#camera');

camera = document.getElementById("camera");

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

function modelLoaded(){
    console.log('modelo carregado com sucesso');
}

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

function check()
{
    img = document.getElementById('selfie_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;

        percent = results[0].confidence.toFixed(3) * 100;

        console.log(percent);

        document.getElementById("result_object_accuracy").innerHTML = percent + "%";
        object = results[0].label;

        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = "Tenho "+percent+" porcento de confiança que este objeto é um(a) "+object;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}