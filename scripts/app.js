'use strict';

const courseList = document.querySelector('.listCourses');
const addToCartButton = document.querySelector('.buttonAddToCart');
const saveButton = document.querySelector('#save');
const modalView = document.querySelector('.modal')
const buyConfirmationModal = document.querySelector('.buy-modal')
const closeModal = document.querySelector('.close-modal');
const addNewCourseButton = document.querySelector('#addNewCourse')
const courseNumber = document.querySelector('#courseNumber');
const courseTitle = document.querySelector('#courseTitle');
const courseDescription = document.querySelector('#courseDescription');
const courseLength = document.querySelector('#courseLength');
const addCourseView = document.querySelector('#addCourse-box')
const overlay = document.querySelector('.overlay');
const buyButton = document.querySelector('#buttonAddToCart');
const addCourseCancel = document.querySelector('#cancel')
const cartSelection = document.querySelector('.cart-row')
const courseDiv = document.querySelector('.course')
const purchaseButton = document.querySelector('.btn-purchase');
const goToCartButton = document.querySelector('.cart')


let listOfCourses = [];
let cart = [];
let id = 0;


//Skapa en funktion för att lista kurser
const listCoursesApi = (function() {
  //Hämta data ur courses.json filen
  fetch('/data/courses.json')
  //När anropet är klart och data finns.
  .then(function(response) {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(function(data){
    listOfCourses.push(data);
    listOfCourses = listOfCourses.flat();
    id = listOfCourses.length;
    console.log(listOfCourses);
    listCourse();

    console.log(listOfCourses);
  })
  .catch(function(err){
    console.log(err);
  });
})();

const exitModal = () => {
  modalView.classList.add('hidden');
  overlay.classList.add('hidden');
};

const exitBuyModal = () => {
  buyConfirmationModal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const listCourse = () => {

  for(let course of listOfCourses) {
    courseList.insertAdjacentHTML(
    'beforeend',
    `<div class="course">

    <h2>${course.title}</h2>
    <p>${course.description}</p>
    <br>
    <p><span id="length">Längd: </span> ${course.length} veckor</p>
    <button id="buttonAddToCart${course.id}" class="buyButton btn">Lägg till</button>
    </div>`
  );
  createBuyButton(course);
  }
}

function createBuyButton(course){
  const button = document.querySelector(`#buttonAddToCart${course.id}`);
    button.addEventListener('click', () => {
      addToCart(course);
      console.log(course);
    });  
}

const addToCart = course => {
  cart.push(course);
  cartSelection.insertAdjacentHTML(
    'beforeend',
    `
    <tr id="course${course.id}">
    <td>${course.title}</td>
    <td><button id="buttonRemoveFromCart${course.id}" class="cart-btn">&times</button></td>
    <tr>`
  );
    createRemoveButton(course.id);
}

const createRemoveButton = (courseId) => {
  const removeFromCart = document.querySelector(`#buttonRemoveFromCart${courseId}`);
  removeFromCart.addEventListener('click', (e) => {
    e.preventDefault();

    const removeCourse = document.querySelector(`#course${courseId}`)
    const index = cart.map(function (e) { return e.id;}).indexOf(courseId);
    cart.splice(index, 1);
    removeCourse.innerHTML = '';
  });
}

purchaseButton.addEventListener('click', (e) => {
  e.preventDefault();

  if(cart.length > 0) {
    overlay.classList.remove('hidden');
    buyConfirmationModal.classList.remove('hidden');
    cart = [];
    cartSelection.innerHTML = '';
  }
});

// Add course and clear fields
async function AddCourse() {
  const course = {
    id: listOfCourses.length+1,
    courseNumber: courseNumber.value,
    title: courseTitle.value,
    description: courseDescription.value,
    length: courseLength.value,
  };
  console.log(course.courseTitle)
  listOfCourses.push(course);
  listCourse();
  console.log(listOfCourses);
}

const clearFields = () => {
  modalView.classList.add('hidden');
  overlay.classList.add('hidden');
  courseNumber.value = '';
  courseTitle.value = '';
  courseDescription.value = '';
  courseLength.value = '';
}

saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  courseList.innerHTML = '';
  AddCourse();  
  clearFields();
});

addNewCourseButton.addEventListener('click', (e) => {
  e.preventDefault();

  addCourseView.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modalView.classList.remove('hidden');
});

closeModal.addEventListener('click', exitModal);
overlay.addEventListener('click', exitModal);
cancel.addEventListener('click', exitModal);
buyConfirmationModal.addEventListener('click', exitBuyModal)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modalView.classList.contains('hidden')) {
      exitModal();
    }
    if (!buyConfirmationModal.classList.contains('hidden')) {
      exitBuyModal();
    }
  }
});