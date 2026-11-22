const http = require("http");
const fs = require("fs");
const { getProductCount } = require("./utils");

// Читаем данные из JSON-файла
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {

    // Маршрут 1: Главная страница
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Сервер Node.js работает!");
        return;
    }

    // Маршрут 2: API для получения списка товаров
    if (req.method === "GET" && req.url === "/api/products") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(products));
        return;
    }

    // Маршрут 3: Любой другой URL (ошибка 404)
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Маршрут не найден" }));
});

// Запуск сервера на порту (для Render или локально)
const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
    console.log(`Сервер запущен на порту ${port}`);
    console.log("Количество товаров:", getProductCount(products));
});