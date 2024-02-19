import bachelorSpecialityData from './bachelorData.js'
import masterSpecialityData from './masterData.js'

let select_degree = document.getElementsByClassName('select')[0];
let select_type = document.getElementsByClassName('select')[1];

let list_degree = document.getElementById('list-degree');
let list_type = document.getElementById('list-type');

let select_text_degree = document.getElementById("selectText-degree");
let select_text_type = document.getElementById("selectText-type");

let degree_options = document.getElementsByClassName("options-degree");
let type_options = document.getElementsByClassName("options-type");

let degree_value, type_value

select_degree.onclick = function () {
    messageBox.style.display = "none"
    list_degree.classList.toggle('open');
    wrapper.classList.toggle('disactive')
}

select_type.onclick = function () {
    messageBox.style.display = "none"
    list_type.classList.toggle('open');
    updateWrapperClass()
}

let degree_option;
for (degree_option of degree_options){
    degree_option.onclick = function (){
        select_text_degree.innerHTML = this.innerHTML
        degree_value = this.innerHTML
    }
}

let type_option;
for (type_option of type_options){
    type_option.onclick = function (){
        select_text_type.innerHTML = this.innerHTML
        type_value = this.innerHTML
    }
}

let options_button = document.getElementsByClassName("options-button")[0]
let messageBox = document.getElementById('messageBox');

let isDegreeSelected = false;
let isTypeSelected = false;





options_button.addEventListener("click", function (){
    list_degree.classList.remove('open')
    list_type.classList.remove('open')

    if (isDegreeSelected && isTypeSelected){
        setSuggetions();
        //updateCardContent();
        wrapper.style.display = "block"
    }else {
        messageBox.style.display = "block"
    }
})

list_degree.addEventListener('click', function(event) {
    isDegreeSelected = event.target.classList.contains('options-degree');
});

list_type.addEventListener('click', function(event) {
    isTypeSelected = event.target.classList.contains('options-type');
});


//-+-+-+-+-+-+-+-+-+-+-+-

let selected_degree, selected_type


//--------------+-+-+-+-+-+-+-+-----------------
// getting all required elements
const wrapper = document.querySelector(".wrapper")
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");

let suggestions;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    setSuggetions();
    let userData = e.target.value; //user entered data
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which start with user entered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].addEventListener("click", function () {
                select(this);
            });
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
};
const card = document.getElementById('card')
function select(element){
    card.style.display = 'block'
    let selectData = element.textContent;
    inputBox.value = selectData;
    searchWrapper.classList.remove("active");
    //card.value = element.textContent
   // console.log(`elem - ${element}`);
    console.log(element.innerText)
    let selectedObject;

    if (type_value === 'За спеціальністю') {
        selectedObject = degree_value === 'Бакалавр'
            ? bachelorSpecialityData.find(item => item.specialityTitle === element.innerText)
            : masterSpecialityData.find(item => item.specialityTitle === element.innerText);
    } else {
        selectedObject = degree_value === 'Бакалавр'
            ? bachelorSpecialityData.find(item => item.jobsList.includes(element.innerText))
            : masterSpecialityData.find(item => item.jobsList.includes(element.innerText));
    }
    updateCardContent(selectedObject);
    if (selectedObject) {
        console.log(selectedObject);
    } else {
        console.log('Object not found');
    }
    //console.log(`val - ${card.value}`)
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        let userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
let uniqueProfessions
function setSuggetions(){
    //alert(`degree - ${degree_value}, type - ${type_value}`)
    if (degree_value === 'Бакалавр'){
        if (type_value == 'За спеціальністю'){
            const specialities = bachelorSpecialityData.map(item => item.specialityTitle);
            suggestions = specialities
        }else {
            uniqueProfessions = new Set();
            bachelorSpecialityData.forEach((item) => {
                if (item.jobsList && item.jobsList.length > 0) {
                    item.jobsList.forEach((profession) => {
                        uniqueProfessions.add(profession);
                    });
                }
            });

            let arrayOfProfessions = [...uniqueProfessions];
            suggestions = arrayOfProfessions
        }
    }else{
        if (type_value === 'За спеціальністю'){
            const specialities = masterSpecialityData.map(item => item.specialityTitle);
            suggestions = specialities

        }else {
            uniqueProfessions = new Set();
            masterSpecialityData.forEach((item) => {
                if (item.jobsList && item.jobsList.length > 0) {
                    item.jobsList.forEach((profession) => {
                        uniqueProfessions.add(profession);
                    });
                }
            });

            let arrayOfProfessions = [...uniqueProfessions];
            suggestions = arrayOfProfessions
        }
    }
}


function updateWrapperClass() {
    if (list_degree.classList.contains('open') || list_type.classList.contains('open')) {
        wrapper.classList.add('disactive');
    } else {
        wrapper.classList.remove('disactive');
    }
}


function updateCardContent(selectedObject) {
    if (type_value === 'За спеціальністю') {
        if (degree_value === 'Бакалавр') {
            displayProfessions(selectedObject);
        } else {
            displayProfessions(selectedObject);
        }
    } else {
        if (degree_value === 'Бакалавр') {
            displayFacultyAndSpeciality(selectedObject);
        } else {
            displayFacultyAndSpeciality(selectedObject);
        }
    }
}

function displayProfessions(selectedObject) {
    if (selectedObject && selectedObject.jobsList) {
        card.innerHTML = `<ul class="card-list">${selectedObject.jobsList.map(profession => `<li>${profession}</li>`).join('')}</ul>`;
    } else {
        card.innerHTML = 'No professions found';
    }
}

function displayFacultyAndSpeciality(selectedObject) {
    if (selectedObject && selectedObject.faculty && selectedObject.specialityTitle) {
        card.innerHTML = `<p>Факультет: <b> ${selectedObject.faculty} </b></p><p>Спеціальність: <b>${selectedObject.specialityTitle}</b></p>`;
    } else {
        card.innerHTML = 'Faculty and Speciality not found';
    }
}

