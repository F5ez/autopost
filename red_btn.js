document.getElementById("autopost").addEventListener("click", () => {
    const login = document.getElementById("login").value.trim();
    const pass = document.getElementById("pass").value.trim();
    // === Проверка логина ===
    if (!login) {
        alert("❌ Введіть логін!");
        return;
    }

    // === Проверка пароля ===
    if (!pass) {
        alert("❌ Введіть пароль!");
        return;
    }

    // === Получаем количество тем из sessionStorage ===
    const count_topic = parseInt(sessionStorage.getItem("count_topic") || "0");

    // === Проверка массивов ===
    const donorCount = donorsArray.length;
    const urlCount = urlArray.length;
    const anchorCount = anchorArray.length;
    const keywordCount = keywordTasksArray.length;

    if (count_topic !== donorCount) {
        alert(`❌ Кількість тем (${count_topic}) ≠ донорів (${donorCount})`);
        return;
    }

    if (donorCount !== urlCount) {
        alert(`❌ Кількість донорів (${donorCount}) ≠ URL (${urlCount})`);
        return;
    }

    if (urlCount !== anchorCount) {
        alert(`❌ Кількість URL (${urlCount}) ≠ Anchor (${anchorCount})`);
        return;
    }

    if (anchorCount !== keywordCount) {
        alert(`❌ Кількість Anchor (${anchorCount}) ≠ Keywords (${keywordCount})`);
        return;
    }

    // ✅ Всё ок — сохраняем логин и пароль
    localStorage.setItem("login", login);
    localStorage.setItem("pass", pass);

    // 🟢 Готов к запуску
    console.log("✅ Всі дані валідні. Готово до запуску!");
    const topicsArray = JSON.parse(sessionStorage.getItem("topics") || "[]");
    const apiKey = document.getElementById("api_key").value.trim();

// === Сбор всех данных ===
    const payload = {
        api: apiKey,
        login,
        pass,
        language: sessionStorage.getItem("language") || "English",
        donors: donorsArray,
        urls: urlArray,
        anchors: anchorArray,
        keywords: keywordTasksArray,
        topics: topicsArray
    };

// === Отправка на локальный сервер ===
    fetch("http://localhost:5000/api/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) throw new Error("Сервер вернул ошибку");
            return response.json();
        })
        .then(data => {
            console.log("📡 Сервер ответил:", data);
        })
        .catch(err => {
            console.error("❌ Помилка при відправці:", err);
            alert("❌ Не вдалося відправити дані на сервер");
        });


});

window.addEventListener("DOMContentLoaded", () => {
    const loginStored = localStorage.getItem("login");
    const passStored = localStorage.getItem("pass");

    if (loginStored) document.getElementById("login").value = loginStored;
    if (passStored) document.getElementById("pass").value = passStored;
});
