import '../sass/index.sass'
import img1 from '../assets/images/image-product-1.jpg'
import img2 from '../assets/images/image-product-2.jpg'
import img3 from '../assets/images/image-product-3.jpg'
import img4 from '../assets/images/image-product-4.jpg'

let menuBtn = document.getElementById('menu_btn') as HTMLButtonElement
let menuUl = document.getElementById('nav_links_ul') as HTMLUListElement
let openMenuIcon = menuBtn.querySelector('.open') as HTMLImageElement
let closeMenuIcon = menuBtn.querySelector('.close') as HTMLImageElement
let carouselBtns = document.querySelectorAll('.scroll_btn') as NodeListOf<HTMLButtonElement>
let navRight = document.querySelector('.scroll_btn_img.right') as HTMLImageElement
let imageArray = [img1, img2, img3, img4]

console.log(navRight)

function toggleMenu() {
  menuUl.classList.toggle('active')
  openMenuIcon.classList.toggle('hidden')
  closeMenuIcon.classList.toggle('hidden')
}

function scrollImage(e: Event) {
  let target = e.target as HTMLButtonElement
  let currentImage = document.querySelector('.main_top_hero_img') as HTMLImageElement
  // Get the src attribute of the current image and trim the location origin
  let currentIndex = imageArray.indexOf(currentImage.src.replace(location.origin, ''))
  let newIndex = currentIndex

  if (target.classList.contains('left')) {
    newIndex = (currentIndex - 1 + imageArray.length) % imageArray.length
  } else if (target.classList.contains('right')) {
    newIndex = (currentIndex + 1) % imageArray.length
  }
  console.log(imageArray[newIndex])
  currentImage.src = imageArray[newIndex]
}

menuBtn.addEventListener('click', toggleMenu)

carouselBtns.forEach((btn) => {
  btn.addEventListener('click', scrollImage)
})
