// tablica obiektów
// możesz się do niej odnieść np. views[0].name
const views = [ 		// tablica obiektów
    {
    "src" : "1.webp",
    "name" : "Pierwszy",
    "alt" : "City"
    },
    {
    "src" : "2.webp",
    "name" : "Drugi",
    "alt" : "Skyscrapers"
    },
    {
    "src" : "3.webp",
    "name" : "Trzeci",
    "alt" : "Beach"
    },
    {
    "src" : "4.webp",
    "name" : "Czwarty",
    "alt" : "Beach"
    },
    {
    "src" : "5.webp",
    "name" : "Piąty",
    "alt" : "Beach"
    }
];

// funkcja pobierająca argument index
function getSingleView( index ){
    // pobieramy tag h2 z dokmentu HTML'a (DOM - document object model)
    const h2 = document.querySelector("h2")
    // podmieniamy wartość h2 na wartość z elementu tablicy
    // views zależnego od argumentu index
    h2.innerHTML = views[index].name

    const img = document.querySelector("img")
    img.src = "img/" + views[index].src

    img.alt = views[index].alt
}

// definicja zmiennej, która oznacza wyświetlane obecnie slajdy
let currentSlide =0;
// wywołanie funkcji z argumentem index równym currentSlide
getSingleView(currentSlide)


// funkcja która zmienia nr slajdu w zależności od direction, 
// a następnie wywołuje getSingleView (która zmiena zdjęcie i
// tytuł na stronie)
function modifyCurrentSlide( direction) {
    // sprawdź czy strzałka została kliknięta w prawo
    if (direction== 'right'){
        // przesuń do następnego slajdu
        currentSlide++;
    }
    // sprawdź czy nr slajdu nie jest większy niż ilość wszystkich slajdów,
    // jeżeli to pokaż piwerwszy slajd
    if(currentSlide>=views.length){
        currentSlide=0;
    }
    if (direction=='left'){
        currentSlide--;
    }
    if(currentSlide<0){
        currentSlide=views.length-1;
    }
    getSingleView(currentSlide)
}
// pobierz prawą strzałkę z HTML'a ( za pomocą DOM - Document Object Model)
const rightArr = document.querySelector(".right")
// po kliknięciu strałką
rightArr.onclick = function(){modifyCurrentSlide('right')}

const leftArr = document.querySelector(".left")
// po kliknięciu strałką
leftArr.onclick = function(){modifyCurrentSlide('left')}

