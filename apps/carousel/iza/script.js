//Stwórz tablicę obiektów, z których każdy obiekt będzie zawierał tytuł i źródło zdjęcia
// możesz się do niej odnieść np. views[0].name
const views = [
  {
    src: "1.webp",
    name: "Pierwszy",
    alt: "City",
  },
  {
    src: "2.webp",
    name: "Drugi",
    alt: "Skyscrapers",
  },
  {
    src: "3.webp",
    name: "Trzeci",
    alt: "Beach",
  },
  {
    src: "4.webp",
    name: "Czwarty",
    alt: "Skyscrapers",
  },
  {
    src: "5.webp",
    name: "Piąty",
    alt: "Beach",
  },
];

//Stwórz funkcję, która będzie pobierała w argumencie numer slajdu (0 - 2) i na jego podstawie będzie wyświetlała wartości z tablicy (z pkt 1) w dokumencie html’a (będzie wyświetlała zdjęcie i tytuł)
//funkcja pobierająca argument index

function getSingleView(index) {
  //pobieramy tag h2 z dokumentu html (DOM - document object model)
  const h2 = document.querySelector("h2");
  //podmieniamy wartość h2 na wartość z elementu
  h2.innerHTML = views[index].name;

  const img = document.querySelector("img");
  img.src = "img/" + views[index].src;

  img.alt = views[index].alt;
}

let currentSlide = 0;
//wywołanie funkcji z argumentem równym currentSlide
getSingleView(currentSlide);

//Stwórz zmienną, która będzie zmieniała numery slajdów (np let currentSlide ...)
//Stwórz kolejną funkcję, która będzie pobierać argument left lub right i dodaj do niej warunek, który w zależności od argumentu będzie zwiększał lub zmniejszał zmienną currentSlide, a następnie wykonywała [funkcja] funkcję stworzoną w pkt 2 ze zaktualizowanym argumentem currentSlide.

function modifyCurrentSlide(direction) {
  //sprawdź, czy strzałka została kliknięta w prawo
  if (direction == "right") {
    //przesuń do następnego slajdu
    currentSlide++;
  }
  //sprawdź, czy nr slajdu nie jest większy niż ilość wszystkich slajdów
  if (currentSlide >= views.length) {
    currentSlide = 0;
  }
  //sprawdź, czy strzałka została kliknięta w lewo
  if (direction == "left") {
    //cofnij do następnego slajdu
    currentSlide--;
  }
  //sprawdź, czy nr slajdu nie jest większy niż ilość wszystkich slajdów
  if (currentSlide < 0) {
    //jeżeli jest to pokaż pierwszy slajd

    currentSlide = views.length - 1;
  }
  console.log(currentSlide);
  //wyświetl zdjęcie i tekst na podstawie currentSlide
  getSingleView(currentSlide);
}

//pobierz prawą strzałkę z HTML (za pomocą DOM - Document Object Model )
const rightArr = document.querySelector(".right");
rightArr.onclick = function () {
  modifyCurrentSlide("right");
};

const leftArr = document.querySelector(".left");
leftArr.onclick = function () {
  modifyCurrentSlide("left");
};
