'use strict';

const courseList = document.querySelector('.listCourses');

//Skapa en funktion för att lista kurser
const listCoursesApi = (function() {
  //Hämta data ur courses.json filen
  // fetch('http://localhost:3000/courses')
  fetch('/data/courses.json')
  //När anropet är klart och data finns.
  .then(function(response) {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(function(data){
    // let html = '';
    data.forEach(function(course){
      // html += `<div>${course.title} <span>${course.title}</span></div>`;
      courseList.insertAdjacentHTML(
        'beforeend',
        `<div class="course">
        <h2>${course.title}</h2>
        <h3>${course.category}</h3>
        <p>${course.description}</p>
        <br>
        <p><span id="length">Längd: </span> ${course.length} veckor</p>
        </div>`
      );
    })

  })
  .catch(function(err){
    console.log(err);
  });
})();

// listCoursesButton.addEventListener('click', () => {
//   console.log('Funkar!');
//   listCoursesApi();
// })

// courses.forEach(course => {
//   listCourses.insertAdjacentHTML(
//     'beforeend',
//     `<div class="car">
//     <p>${.make} ${car.model}</p>
//     </div>`
//   );
// })




// "id": 2,
// "courseNumber": 1002,
// "title": "Introduktion till C#",
// "description": "En beskrivning kommer att komma här",
// "length": 40,
// "category": "Programmering"