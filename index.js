
language_map = {
    "Англійська": "English",
    "Іспанська": "Spanish",
    "Португальска": "Portuguese",
    "Німецька": "German",
    "Польська": "Polish",
    "Українська": "Ukrainian",
    "Французька": "French",
    "Італійська": "Italian",
    "Грецька": "Greek",
    "Японська": "Japanese",
    "Фінська": "Finnish",
    "Датська": "Danish",
    "Болгарська": "Bulgarian",
    "Естонська": "Estonian",
    "Румунська": "Romanian",
    "Угорська": "Hungarian",
    "Норвезька": "Norwegian",
    "Тайська": "Thai",
    "В'єтнамьска": "Vietnamese",
    "Турецька": "Turkish",
    "Латвійська": "Latvian",
    "Литовська": "Lithuanian",
    "Малайська": "Malay",
    "Шведська": "Swedish",
    "Хорватська": "Croatian",
    "Нiдерландська": "Dutch",
    "Словацька": "Slovak",
    "Китайська": "Chinese"
}
const select = document.getElementById('language');
for (const [ukr, eng] of Object.entries(language_map)) {
    const option = document.createElement('option');
    option.value = eng;
    option.textContent = ukr;
    select.appendChild(option);
}




let languagevalue="English";
select.addEventListener('change', () => {
    languagevalue = select.value;
    sessionStorage.setItem("language", languagevalue);

});

let api_key = '';

document.getElementById("api_key").addEventListener("input", () => {
    api_key = document.getElementById("api_key").value.trim();
});
let count_topic=0
let count_topic_div=document.getElementById("only_digits");
count_topic_div.addEventListener("change", () => {
    count_topic=count_topic_div.value;
})


let urlArray = [];

document.getElementById("url").addEventListener("input", () => {
    const raw = document.getElementById("url").value;

    urlArray = raw
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    document.getElementById("count_url").textContent = `Count: ${urlArray.length}`;
});



let anchorArray = [];

document.getElementById("anchor").addEventListener("input", () => {
    const raw = document.getElementById("anchor").value;

    anchorArray = raw
        .split("\n")
        .map(line => line.trim() === "" ? "" : line.trim()); // сохраняем пустые строки как ""

    document.getElementById("count_anchor").textContent = `Count: ${anchorArray.length}`;
});



let keywordTasksArray = [];

document.getElementById("keywords").addEventListener("input", () => {
    const raw = document.getElementById("keywords").value;

    keywordTasksArray = raw
        .split("\n")
        .map(line => line.trim() === "" ? "" : line.trim()); // сохраняем как "" если строка пустая

    document.getElementById("count_key").textContent = `Count: ${keywordTasksArray.length}`;
});




let donorsArray = [];

document.getElementById("donors").addEventListener("input", () => {
    const raw = document.getElementById("donors").value;

    donorsArray = raw
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    document.getElementById("count_donor").textContent = `Count: ${donorsArray.length}`;
});



const sideMenu = document.querySelector(".side_menu");
const arrow = document.getElementById("arrow");

let isMenuOpen = false;

arrow.addEventListener("click", () => {
    if (isMenuOpen) {
        sideMenu.style.left = "-19vw";
        arrow.style.transform = "rotate(0deg)";
    } else {
        sideMenu.style.left = "0";
        arrow.style.transform = "rotate(180deg)";
    }
    isMenuOpen = !isMenuOpen;
});


document.addEventListener("DOMContentLoaded", () => {
    const eventSource = new EventSource("http://127.0.0.1:5000/stream");

    eventSource.onmessage = function(event) {
        const msg = event.data;

        // Если сообщение похоже на ссылку (начинается с http)
        if (msg.startsWith("http://") || msg.startsWith("https://")) {
            const linksBlock = document.getElementById("result");
            const p = document.createElement("p");
            p.innerHTML = `<a href="${msg}" target="_blank">${msg}</a>`;
            linksBlock.appendChild(p);
            return;
        }

        // Обычные логи
        const logBlock = document.getElementById("text_result");
        const p = document.createElement("p");
        p.textContent = msg;
        logBlock.appendChild(p);
        logBlock.scrollTop = logBlock.scrollHeight;
    };

});

document.getElementById("clear_log").addEventListener("click", () => {
    const logBlock = document.getElementById("text_result");
    logBlock.innerHTML = ""; // просто очищаем div, дальше сообщения добавляются как обычно
});

document.getElementById("clear_result").addEventListener("click", () => {
    const resultBlock = document.getElementById("result");
    resultBlock.innerHTML = ""; // просто очищаем div, дальше ссылки добавляются как обычно
});