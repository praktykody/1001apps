const rArr = document.querySelector('.right')
rArr.addEventListener('click', function () {
  const activeElement = document.querySelector('.active');
  activeElement.classList.remove('active')

  let nextActiveElement = activeElement.nextElementSibling
  if( !nextActiveElement ){
    nextActiveElement = document.querySelector('.carousel-inner').firstElementChild
  }
  nextActiveElement.classList.add('active')

})



