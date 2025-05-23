import '../sass/index.sass'
// IMG imports
import img1 from '../assets/images/image-product-1.jpg'
import img2 from '../assets/images/image-product-2.jpg'
import img3 from '../assets/images/image-product-3.jpg'
import img4 from '../assets/images/image-product-4.jpg'

// DOM elements
let menuBtn = document.getElementById('menu_btn') as HTMLButtonElement
let menuUl = document.getElementById('nav_links_ul') as HTMLUListElement
let openMenuIcon = menuBtn.querySelector('.open') as HTMLImageElement
let closeMenuIcon = menuBtn.querySelector('.close') as HTMLImageElement
let carouselBtns = document.querySelectorAll('.scroll_btn') as NodeListOf<HTMLButtonElement>
let form = document.querySelector('form') as HTMLFormElement
let amountToAdd = form.querySelector('#amount_to_add') as HTMLInputElement
let cartBtn = document.querySelector('.cart_img_cont') as HTMLButtonElement
let cartCont = document.querySelector('#cart_cont') as HTMLDivElement

// Variables
let imageArray = [img1, img2, img3, img4]

// Function definitions

// Toggle menu function: This function toggles the menu open and close
function toggleMenu() {
  menuUl.classList.toggle('active')
  openMenuIcon.classList.toggle('hidden')
  closeMenuIcon.classList.toggle('hidden')
}

// Toggle cart function: This function toggles the cart open and close
function toggleCart() {
  cartCont.classList.toggle('hidden')
}

// Scroll image function: This function scrolls the images in the carousel
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

// Update price function: This function updates the price based on the amount to add and enables or disables the submit button
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

// Enable or disable the submit button based on the state
function enableSubmit(state: boolean) {
  let submitBtn = form.querySelector('.add_to_cart_btn') as HTMLButtonElement
  if (state) {
    submitBtn.removeAttribute('disabled')
  } else {
    submitBtn.setAttribute('disabled', 'true')
  }
}

// Submit form function: This function handles the form submission
function submitForm(e: Event) {
  e.preventDefault()
  let formData = new FormData(form)
  let data = Object.fromEntries(formData.entries())
  console.log(data)
  addToCart()
  form.reset()
  priceUpdate()
  enableSubmit(false)
}

// Add to cart function: This function adds the item to the cart and updates the cart count
function addToCart() {
  let cartCount = document.querySelector('span.cart_count') as HTMLSpanElement
  console.log(cartCount)
  cartCount.textContent = amountToAdd.value
  let cartBtm = cartCont.querySelector('.cart_cont_btm') as HTMLDivElement
  cartBtm.innerHTML = `
    <div class="cart_item_img_details"> 
      <div class="cart_item_img_cont">
        <img src="${imageArray[0]}" alt="product image" class="cart_item_img">
       </div>
       <div class="cart_item_details">
          <p class="cart_item_name">Fall Limited Edition Sneakers</p>
          <p class="cart_item_price">
            <span class="cart_item_new_price">$${(250 * 0.5).toFixed(2)} x ${amountToAdd.value}</span>
            <span class="cart_item_total_price">$${(125 * parseInt(amountToAdd.value)).toFixed(2)}</span>
          </p>
        </div>
        <button class="delete_cart_item_btn">
          <img src="/src/assets/images/icon-delete.svg" alt="delete cart item" class="delete_cart_item_img">
        </button>
    </div> 
    <button class="checkout_btn">Checkout</button>
  `
  function clearCart() {
    cartBtm.innerHTML = `
      <p class="cart_cont_btm_p">Your cart is empty</p>
    `
    cartCount.textContent = ''
  }
  let deleteBtn = cartBtm.querySelector('.delete_cart_item_btn') as HTMLButtonElement
  let checkout_btn = cartBtm.querySelector('.checkout_btn') as HTMLButtonElement
  
  checkout_btn.addEventListener('click', () => {
    clearCart()
    alert('Checkout completed 🥳! Thank you for your purchase 😊!')
    toggleCart()
  })
  deleteBtn.addEventListener('click', clearCart)
}

// Event listeners
menuBtn.addEventListener('click', toggleMenu)

cartBtn.addEventListener('click', toggleCart)

carouselBtns.forEach((btn) => { btn.addEventListener('click', scrollImage) })

amountToAdd.addEventListener('input', priceUpdate)

form.addEventListener('submit', submitForm)