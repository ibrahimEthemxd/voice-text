const textarea = document.getElementById("textarea")
const voiceList = document.getElementById("select")
const speechBtn = document.getElementById("button")

let synth = speechSynthesis; // google tarafından ses al //api
let isSpeaking = true; // konuşma durumunu takip et

function voices() { // seslendirmeleri al selecte ekle

    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : ""; // başlangıçta ingilizce seçilsin ..

        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

        voiceList.insertAdjacentHTML("beforeend", option)
    }
}

// Ses seçenekleri değiştiğinde sesleri tekrar listeler.
synth.addEventListener("voiceschanged", voices);


//Metni sesli olarak konuşan fonk.
function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);

    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice; // sesleri okur
        }
    }

    utterance.addEventListener("end", () => {
        isSpeaking = false;
        document.querySelector(".place").style.display = "none";
    });

    synth.speak(utterance);
    isSpeaking = true;
}
speechBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (textarea.value !== "")
        if (!synth.speaking) {
            textToSpeech(textarea.value);
            document.querySelector(".place").style.display = "block"
        }
})
