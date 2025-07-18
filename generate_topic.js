document.getElementById("generate_topic_btn").addEventListener("click", async () => {
    const payload = {
        language: languagevalue,
        api_key: api_key,
        count: parseInt(count_topic)
    };

    // === Валидация ===
    if (!payload.api_key) {
        alert("❌ Введіть API ключ!");
        return;
    }

    if (!payload.language) {
        alert("❌ Оберіть мову!");
        return;
    }

    if (!payload.count || isNaN(payload.count) || payload.count <= 0) {
        alert("❌ Введіть коректну кількість тем (число > 0)!");
        return;
    }

    // === Показать загрузку ===
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    try {
        const response = await fetch("http://127.0.0.1:5000/generate_topics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.status === "ok") {
            const cleanedTopics = data.topics.map(topic => topic.replace(/^["']|["']$/g, ''));
            const formatted = cleanedTopics.join("<br>");

            document.getElementById("topic_text").innerHTML = formatted;
            document.getElementById("count_topic").textContent = `Count: ${cleanedTopics.length}`;

            // ⏺ Сохраняем в localStorage API ключ
            localStorage.setItem("gpt_api_key", payload.api_key);

            // ⏺ Сохраняем количество тем в sessionStorage
            sessionStorage.setItem("count_topic", cleanedTopics.length.toString());
            sessionStorage.setItem("topics", JSON.stringify(cleanedTopics)); //


        } else {
            alert("❌ Помилка від сервера: " + data.message);
        }
    } catch (err) {
        alert("❌ Не вдалося підключитись до локального сервера. Перевірте, чи він запущений.");
        console.error(err);
    } finally {
        loader.style.display = "none";
    }
});


window.addEventListener("DOMContentLoaded", () => {
    const savedKey = localStorage.getItem("gpt_api_key");
    if (savedKey) {
        document.getElementById("api_key").value = savedKey;
        api_key = savedKey; // если ты используешь глобальную переменную
        const loginInput = document.getElementById("login");
        const passInput = document.getElementById("pass");
        const savedLogin = localStorage.getItem("login");
        const savedPass = localStorage.getItem("pass");

        if (savedLogin) loginInput.value = savedLogin;
        if (savedPass) passInput.value = savedPass;

    }
});
