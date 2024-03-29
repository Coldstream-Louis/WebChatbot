/*
 * Check for browser support
 */
var supportMsg = document.getElementById('msg');

if ('speechSynthesis' in window) {
    supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
} else {
    supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
    supportMsg.classList.add('not-supported');
}


// Get the 'speak' button
//var button = document.getElementById('speak');

// Get the text input element.
//var speechMsgInput1 = document.getElementById('question_1');

// Get the voice select element.
var voiceSelect = document.getElementById('voice');

// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
    // Fetch the available voices.
    var voices = speechSynthesis.getVoices();

    // Loop through each of the voices.
    voices.forEach(function(voice, i) {
        // Create a new option element.
        var option = document.createElement('option');

        // Set the options value and text.
        option.value = voice.name;
        option.innerHTML = voice.name;

        // Add the option to the voice selector.
        voiceSelect.appendChild(option);
    });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
};


// Create a new utterance for the specified text and add it to
// the queue.
function speak(text) {
    // Create a new instance of SpeechSynthesisUtterance.
    var msg = new SpeechSynthesisUtterance();

    // Set the text.
    msg.text = text;

    // Set the attributes.
    msg.volume = parseFloat(volumeInput.value);
    msg.rate = parseFloat(rateInput.value);
    msg.pitch = parseFloat(pitchInput.value);

    // If a voice has been selected, find the voice and set the
    // utterance instance's voice attribute.
    if (voiceSelect.value) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
    }

    // Queue this utterance.
    window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
/*
button.addEventListener('click', function(e) {
    if (speechMsgInput1.innerHTML.length > 0) {
        speak(speechMsgInput1.innerHTML);
    }
});
*/

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && (e.keyCode==32 || e.keyCode==49 || e.keyCode==186 || e.keyCode==188 || e.keyCode==190 || e.keyCode==191)){ // 按 Esc
        if ($('#question_1').val().length > 0) {
            speak($('#question_1').val());
            console.log($('#question_1').val());
        }
        if ($('#question_2').val().length > 0) {
            speak($('#question_2').val());
            console.log($('#question_2').val());
        }
    }
};
/*
$('#question_1').keypress(function(e){
    if(e && (e.keyCode==32 || e.keyCode==49 || e.keyCode==186 || e.keyCode==188 || e.keyCode==190 || e.keyCode==191)) { // 按 Esc
        if ($('#question_1').val().length > 0) {
            speak($('#question_1').val());
            console.log($('#question_1').val());
        }
    }
});

$('#question_2').keypress(function(e){
    if(e && (e.keyCode==32 || e.keyCode==49 || e.keyCode==186 || e.keyCode==188 || e.keyCode==190 || e.keyCode==191)) { // 按 Esc
        if ($('#question_2').val().length > 0) {
            speak($('#question_2').val());
            console.log($('#question_2').val());
        }
    }
});
*/