// import {SearchContainer} from '/search-container'
//
// let searchBox = new SearchContainer()
// console.log(searchBox)
// searchBox.render()

let select_degree = document.getElementsByClassName('select')[0];
let select_type = document.getElementsByClassName('select')[1];

let list_degree = document.getElementById('list-degree');
let list_type = document.getElementById('list-type');

let select_text_degree = document.getElementById("selectText-degree");
let select_text_type = document.getElementById("selectText-type");

let degree_options = document.getElementsByClassName("options-degree")
let type_options = document.getElementsByClassName("options-type")

select_degree.onclick = function () {
    list_degree.classList.toggle('open')
}

select_type.onclick = function () {
    list_type.classList.toggle('open')
}

// let degree_option;
// for (degree_option of degree_options){
//     degree_option.onclick = function (){
//         select_degree.innerHTML = this.innerHTML
//     }
// }
