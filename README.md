# Инсулин помощник / Insulin Helper

https://nikasod.github.io/insulin-helper/

## Русская версия

### О проекте

**Инсулин помощник** — это простой веб-сайт для вспомогательного расчёта хлебных единиц и математического расчёта дозы короткого инсулина по значениям, которые пользователь указывает самостоятельно.

Проект создан как статическое веб-приложение без регистрации, сервера и базы данных. Все данные сохраняются только в браузере пользователя.

Сайт может быть полезен тем, кто уже знает свои индивидуальные коэффициенты и хочет быстро посчитать:

* сколько углеводов содержится в продукте;
* сколько это хлебных единиц;
* какой получается математический расчёт инсулина по заданному коэффициенту.

### Важное предупреждение

Этот сайт **не назначает дозу инсулина** и **не заменяет консультацию врача**.

Расчёт выполняется только на основе данных, которые вводит сам пользователь. Окончательное решение о фактической дозе пользователь принимает самостоятельно в соответствии со своими медицинскими рекомендациями.

Не используйте сайт, если вы плохо себя чувствуете, не уверены в введённых данных или результат расчёта кажется необычным.

### Основные возможности

* выбор языка при первом запуске;
* соглашение с предупреждением безопасности;
* ввод личного коэффициента инсулина на 1 ХЕ;
* ввод значения 1 ХЕ в граммах углеводов;
* расчёт по продукту;
* расчёт по количеству ХЕ;
* отображение итоговых углеводов;
* отображение количества хлебных единиц;
* отображение точного математического расчёта;
* выбор фактической дозы;
* подтверждение выбранной дозы перед сохранением;
* история подтверждённых записей;
* просмотр последних 5 записей;
* просмотр полной истории;
* удаление отдельных записей;
* очистка истории;
* удаление всех локальных данных;
* смена темы интерфейса;
* адаптивный дизайн для компьютера и телефона.

### Как работает расчёт

#### Расчёт по продукту

Пользователь вводит:

* вес продукта в граммах;
* количество углеводов на 100 г продукта.

Далее сайт считает:

```text
Углеводы = вес продукта × углеводы на 100 г / 100
ХЕ = углеводы / значение 1 ХЕ
Точная доза = ХЕ × коэффициент инсулина
```

#### Расчёт по ХЕ

Пользователь вводит количество хлебных единиц.

Далее сайт считает:

```text
Точная доза = ХЕ × коэффициент инсулина
```

### Хранение данных

Все данные хранятся только локально в браузере с помощью `localStorage`.

Это значит:

* данные не отправляются на сервер;
* сайт не использует базу данных;
* регистрация не нужна;
* история и настройки доступны только в этом браузере;
* при очистке данных браузера настройки и история могут быть удалены.

### Используемые технологии

Проект реализован с помощью:

* **HTML5** — структура страниц;
* **CSS3** — стили, темы, адаптивная вёрстка;
* **Vanilla JavaScript** — логика работы сайта;
* **LocalStorage** — хранение настроек и истории в браузере;
* **GitHub Pages** — публикация статического сайта.

### Структура проекта

```text
insulin-helper/
│
├── index.html
├── README.md
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
│
└── js/
    ├── app.js
    ├── storage.js
    ├── calculator.js
    ├── validation.js
    ├── settings.js
    ├── history.js
    ├── ui.js
    └── safety.js
```

### Запуск проекта

Проект не требует установки зависимостей.

Достаточно открыть файл:

```text
index.html
```

в браузере.

Также сайт можно разместить на GitHub Pages, так как он полностью статический и не требует backend.

---

## English Version

### About the Project

**Insulin Helper** is a simple web application for auxiliary bread unit calculation and mathematical short-acting insulin calculation based on values entered by the user.

The project is built as a static web application without registration, backend, or database. All data is stored only in the user's browser.

The website can be useful for users who already know their personal insulin ratios and want to quickly calculate:

* how many carbohydrates are in a product;
* how many bread units it equals;
* what mathematical insulin calculation is produced using the saved personal ratio.

### Important Disclaimer

This website **does not prescribe insulin** and **does not replace medical advice**.

The calculation is based only on the data entered by the user. The final decision about the actual dose must always be made by the user according to their personal medical recommendations.

Do not use the website if you feel unwell, are unsure about the entered data, or if the calculation result looks unusual.

### Main Features

* language selection on first launch;
* safety agreement before using the app;
* personal insulin ratio setup;
* custom bread unit value setup;
* calculation by product;
* calculation by bread units;
* total carbohydrate calculation;
* bread unit calculation;
* exact mathematical dose calculation;
* actual dose selection;
* confirmation before saving the selected dose;
* history of confirmed records;
* last 5 records preview;
* full history screen;
* deleting individual records;
* clearing history;
* deleting all local data;
* interface theme switching;
* responsive layout for desktop and mobile devices.

### How the Calculation Works

#### Product-based Calculation

The user enters:

* product weight in grams;
* carbohydrates per 100 g of product.

The website calculates:

```text
Carbohydrates = product weight × carbohydrates per 100 g / 100
Bread units = carbohydrates / carbs per bread unit
Exact dose = bread units × insulin ratio
```

#### Bread Unit-based Calculation

The user enters the number of bread units.

The website calculates:

```text
Exact dose = bread units × insulin ratio
```

### Data Storage

All data is stored locally in the browser using `localStorage`.

This means:

* data is not sent to any server;
* the website does not use a database;
* registration is not required;
* history and settings are available only in the current browser;
* clearing browser data may remove settings and history.

### Technologies Used

The project is implemented with:

* **HTML5** — page structure;
* **CSS3** — styling, themes, responsive layout;
* **Vanilla JavaScript** — application logic;
* **LocalStorage** — storing settings and history in the browser;
* **GitHub Pages** — static website deployment.

### Project Structure

```text
insulin-helper/
│
├── index.html
├── README.md
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
│
└── js/
    ├── app.js
    ├── storage.js
    ├── calculator.js
    ├── validation.js
    ├── settings.js
    ├── history.js
    ├── ui.js
    └── safety.js
```

### Running the Project

The project does not require installing dependencies.

Simply open the file:

```text
index.html
```

in a browser.

The website can also be deployed with GitHub Pages because it is fully static and does not require a backend.

### Purpose of the Project

This project was created as a simple, privacy-friendly, static web tool for personal calculations. It demonstrates how HTML, CSS, and Vanilla JavaScript can be used to build a responsive browser-based application with local data storage.
