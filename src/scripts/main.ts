import '../sass/index.sass'
import img from '../assets/images/icon-previous.svg'

let menuBtn = document.getElementById('menu_btn') as HTMLButtonElement
let menuUl = document.getElementById('nav_links_ul') as HTMLUListElement
let openMenuIcon = menuBtn.querySelector('.open') as HTMLImageElement
let closeMenuIcon = menuBtn.querySelector('.close') as HTMLImageElement
let navBtns = document.querySelectorAll('.scroll_btn') as NodeListOf<HTMLButtonElement>
let navRight = document.querySelector('.scroll_btn_img.right') as HTMLImageElement

console.log(navRight)

function toggleMenu() {
  menuUl.classList.toggle('active')
  openMenuIcon.classList.toggle('hidden')
  closeMenuIcon.classList.toggle('hidden')
}

menuBtn.addEventListener('click', toggleMenu)