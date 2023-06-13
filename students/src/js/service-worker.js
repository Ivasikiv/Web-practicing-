const staticCache = "st-table-app-v2";
const dynamicCache = "dyn-table-app-v2";

const filesToCache = [
    "index.html",
    "students/src/css/main.css",
    "students/src/js/students.js",
    "students/offline.html",
]

/*
self.addEventListener('install', event => {...}) - Цей метод виконується при встановленні 
сервіс-воркера. Він відкриває кеш (cache) за допомогою методу caches.open() та додає 
всі файли, які необхідно зберегти в кеші, за допомогою методу cache.addAll(). Це робиться 
за допомогою методу event.waitUntil(), який чекає, поки весь контент буде доданий до кешу 
перед тим, як сервіс-воркер стане активним.
*/

self.addEventListener('install', event=> {
    console.log("Service Worker: install...");
    event.waitUntil(caches.open(staticCache).then(cache => cache.addAll(filesToCache)))
})

/*
self.addEventListener('activate', async event => {...}) - Цей метод виконується при активації
сервіс-воркера. Він отримує список назв всіх кешів, які створені в попередніх версіях 
сервіс-воркера. За допомогою методу Promise.all() він видаляє всі старі кеші, окрім поточного.
*/

self.addEventListener('activate', async event => {
    console.log("Service Worker: activate...");
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.filter(cacheName => cacheName !== staticCache).map(cacheName => caches.delete(cacheName)))
})

/*
self.addEventListener('fetch', event => {...}) - Цей метод виконується кожен раз, коли 
відбувається запит на сервер. Він перевіряє, чи запит був зроблений до сторінки, що 
належить поточному сайту, або до зовнішнього сайту. Якщо запит відноситься до поточного 
сайту, то він перевіряє, чи є запитована сторінка в кеші, за допомогою методу FindInCache(), 
та повертає відповідь з кешу. Якщо сторінки немає в кеші, то він виконує запит до сервера 
та зберігає отриману відповідь в динамічному кеші, за допомогою методу GetFromNetwork().
Якщо запит відноситься до зовнішнього сайту, то він відправляє запит до сервера та повертає відповідь.
*/

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)
    console.log("Service Worker: fetching...\n", url);
    if(url.origin === location.origin) {
        event.respondWith(FindInCache(event.request));
    } else {
        event.respondWith(GetFromNetwork(event.request));
    }
})

/*
Функція FindInCache перевіряє, чи є запит в кеші. Якщо так, то повертає відповідь з кешу. 
Якщо запиту немає в кеші, то виконує запит за допомогою fetch і повертає отриману відповідь.
*/

async function FindInCache(request) {
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}

/*
Функція GetFromNetwork робить запит до мережі. Вона спочатку відкриває кеш з динамічними 
ресурсами. Потім виконує запит за допомогою fetch. Якщо запит був успішним, то клонує 
відповідь, зберігає її в кеші і повертає оригінальну відповідь. Якщо запит був неуспішним,
то спочатку спробує повернути відповідь з кешу, якщо такої немає - повертає сторінку з 
повідомленням про відсутність з'єднання з мережею.
*/

async function GetFromNetwork(request) {
    const cache = await caches.open(dynamicCache);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch(e) {
        const cached = await cache.match(request);
        return cached ?? caches.match('students/offline.html');
    }

}