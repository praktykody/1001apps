// tablica obiektów
// możesz się do niej odnieś np views[0].name
const views = [ 		
  {
    "src" : "1.webp",
    "name" : "Pierwszy",
    "alt" : "City"
  },
  {
    "src" : "2.webp",
    "name" : "Drugi",
    "alt": "Skyscrapers"
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
]
// funkcja pobierająca argument index i podmieniająca nazwę, src i alt w htmlu
function getSingleView( index ){
  // pobieramy tag h2 z dokumentu HTML'a ( DOM - document object model) 
  const h2 = document.querySelector("h2")
  // podmieniamy wartość h2 na wartość z elementu tablicy views zależnego od argumentu index
  h2.innerHTML = views[index].name

  const img = document.querySelector("img")
  img.src = "img/" + views[index].src

  img.alt = views[index].alt
}

// definicja zmiennej, która oznacza obecnie wyświetlany slajd
let currentSlide = 0;
// wywołanie funkcji z argumentem index równym currentSlide
getSingleView(currentSlide)

// funkcja która zmienia numer slajdu w zależnośći od direction, a następnie wywołuje getSingleView (która zmienia zdjęcie i tytuł na stronie)
function modifyCurrentSlide( direction ){
  // sprawdź, czy strzałka została kliknięta w prawo
  if(direction == 'right'){
    // przesuń do następnego slajdu
    currentSlide++;
  }
  // sprawdź, czy numer slajdu nie jest większy niż ilość wszystkich slajdów
  if(currentSlide >= views.length ){
    // jeżeli jest to pokaż pierwszy slajd
    currentSlide = 0;
  }

  if(direction == 'left'){
    currentSlide--;
  }

  if(currentSlide < 0){
    currentSlide = views.length - 1 
  }

  // wywołanie funkcji z argumentem index równym currentSlide
  // wyświetl zdjęcie i tekst na podstawie currentSlide
  getSingleView(currentSlide)
}

// pobierz prawą strzałkę z HTML'a (za pomocą DOM - Document Object Model)
const rightArr = document.querySelector(".right")
// po kliknięciu na strzałkę w prawo wykonaj modifyCurrentSlide z argumentem right
rightArr.onclick = function(){ modifyCurrentSlide('right') }

const leftArr = document.querySelector(".left")
leftArr.onclick = function(){ modifyCurrentSlide('left') }