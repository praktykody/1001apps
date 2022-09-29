const views = [
    {
        "src" : "4.jpg",
        "name" : "Pierwszy",
        "alt" : "Fota 1",
    },
    {
        "src" : "5.jpg",
        "name" : "Drugi",
        "alt" : "Fota 2",
    },
    {
        "src" : "1.jpg",
        "name" : "Trzeci",
        "alt" : "Fota 3",
    }
]


function getSingleView (index){
    const h2 = document.querySelector("h2")
    h2.innerHTML = views[index].name

    const img = document.querySelector("img")
    img.src = "img/" + views[index].src

    img.alt = views[index].alt
}

currentSlide = 0;

getSingleView(currentSlide)

function modifyCurrentSlide (direction){
    if(direction == 'right'){
        currentSlide++;
    }
    if(currentSlide >= views.length){
        currentSlide = 0;
    }
    if(direction == 'left'){
        currentSlide--;
    }
    if(currentSlide <0){
        currentSlide = views.length -1

    }
    
    getSingleView(currentSlide)
}
const rightArr = document.querySelector('.right')
rightArr .onclick = function(){modifyCurrentSlide('right')}

const leftArr = document.querySelector('.left')
leftArr .onclick = function(){modifyCurrentSlide('left')}