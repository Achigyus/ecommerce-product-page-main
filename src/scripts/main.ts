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
let form = document.querySelector('form') as HTMLFormElement
let amountToAdd = form.querySelector('#amount_to_add') as HTMLInputElement

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

function priceUpdate() {
  let pricePerItem = 250.0
  let discount = 0.5
  let totalItems = parseInt(amountToAdd.value)
  if (totalItems === 0) {
    totalItems = 1
    enableSubmit(false)
  } else {
    enableSubmit(true)
  }
  let totalPrice = pricePerItem * totalItems
  let discountedPrice = totalPrice * discount
  let discountedPriceElement = document.querySelector('.new_price') as HTMLParagraphElement
  let totalPriceElement = document.querySelector('.old_price') as HTMLParagraphElement
  discountedPriceElement.innerText = `$${discountedPrice.toFixed(2)}`
  totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`
}

function enableSubmit(state: boolean) {
  let submitBtn = form.querySelector('.add_to_cart_btn') as HTMLButtonElement
  if (state) {
    submitBtn.removeAttribute('disabled')
  } else {
    submitBtn.setAttribute('disabled', 'true')
  }
}

function submitForm(e: Event) {
  e.preventDefault()
  let formData = new FormData(form)
  let data = Object.fromEntries(formData.entries())
  console.log(data)
}

// Add event listeners

menuBtn.addEventListener('click', toggleMenu)

carouselBtns.forEach((btn) => {
  btn.addEventListener('click', scrollImage)
})

amountToAdd.addEventListener('input', priceUpdate)
form.addEventListener('submit', submitForm)