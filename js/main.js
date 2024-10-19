let receipe = document.getElementById("receipe");
let info = document.getElementById("info");
let mealNm = document.getElementById("mealNm");
let instructions = document.getElementById("instructions");
let apuImg=document.getElementById("apuImg");
const size = $(".slider .content").outerWidth(true);
// script.js

window.onload = function() {
    document.getElementById('loading').style.display = 'flex';

    const currentPage = window.location.pathname.split('/').pop();
    let loadingDuration = 2000; 

    if (currentPage === "info.html") {
        loadingDuration = 200;
    }

    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
    }, loadingDuration);
};





$(".slider").animate({ left: -size }, 0);

let flag = true;

$("#close").on('click', function () {
    
    $(".slider, .slider .content .top a").stop(true, true);

    if (flag == true) {
        
        $(".slider").animate({ left: 0 }, 400);
        
     
        $("#one").addClass("d-none");
        $("#two").removeClass("d-none");

     
        $(".slider .content .top a").each(function (index) {
            $(this).delay(200 * index).slideDown(200); 
        });

        flag = false;
    } else {
        flag = true;
        
       
        $(".slider .content .top a").slideUp(200, function() {
            $(".slider").animate({ left: -size }, 400);
        });

      
        $("#one").removeClass("d-none");
        $("#two").addClass("d-none");
    }
});


$(".slider .content .top a").hide();
let res;
let data;


// index
let input = document.getElementById("input");
if(input != null)
{
    for (var i = 0; i < 25; i++) {
        getMeal();
    }
}


async function getMeal() {
    try {
        res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        data = await res.json();
       
        putPic(input,0);
        getId();


    } catch (error) {
        console.log("Error getting meals");
    }

}






// search
let inputSearch = document.getElementById("input-search");
let nameInput = document.getElementById("byName");
let inLoop =1;
if(inputSearch!=null)
{
    nameInput.addEventListener("input",function(){
        getMealsByName(nameInput.value);
    })
}

async function getMealsByName(test) {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${test}`);
    data = await res.json();
    
    
    for(var i = 0 ; i < data.meals.length ; i++)
    {
        putPic(inputSearch,i);
    }
    inLoop = 0;
    getId();
}

 
let letterSearch = document.getElementById("byLtr");
 inLoop = 1;
 if(letterSearch!=null)
    {
        letterSearch.addEventListener("input",function(){
            getMealsByName(letterSearch.value);
        })
    }

async function getMealsByLetter(test) {
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${test}`);
    data = await res.json();
    
    if(letterSearch.value=="" )
    {
        inputSearch.innerHTML=""
    }
   else
   { for(var i = 0 ; i < data.meals.length ; i++)
    {
        putPic(inputSearch,i);
    }
    inLoop = 0;

}
getId();
}

// letterSearch.addEventListener("input",function(){
    
//     getMealsByLetter(letterSearch.value);
// })



// both

function putPic(dummy,x) {

    if(inLoop == 1){

        dummy.innerHTML += (`<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
            <div id="${data.meals[x].idMeal}" class="inner border-0 rounded-2">
                <div class="image-container border-0 rounded-2">
                    <img src="${data.meals[x].strMealThumb}"  alt="Sushi" class="img-fluid">
                   <a href="html/info.html" > <div class="overlay border-0 rounded-2">
                        <div class="info  fs-2">${data.meals[x].strMeal}</div>
                    </div></a>
                </div>
            </div>
    </div>`)
    }
    else {
        dummy.innerHTML = "";
        inLoop = 1;
        dummy.innerHTML += (`<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
            <div id="${data.meals[x].idMeal}" class="inner border-0 rounded-2">
                <div  class="image-container border-0 rounded-2">
                    <img src="${data.meals[x].strMealThumb}" alt="Sushi" class="img-fluid">
                    <a href="html/info.html" <div  class="overlay border-0 rounded-2">
                        <div class="info  fs-2">${data.meals[x].strMeal}</div>
                    </div></a>
                </div>
            </div>
    </div>`)
    }
   


}

function getId(){

    $(".inner").on("click",function(){
    var aaa = $(this).attr("id");
   localStorage.setItem("id",aaa);
   console.log("in get id ");

    })
}
let imgThumb=document.getElementById("apuImg");
let mealName=document.getElementById("mealNm")


if(imgThumb!=null)
{
    let trgt=localStorage.getItem("id");
    parseInt(trgt);
    
    getInfo(trgt);
    
}
async function getInfo(mId) {

    try {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mId}`);

        data = await res.json();
      putInfo(data);
      console.log("wasalt");
      
           
    } catch (error) {
    console.log("Error loading data");
            
    }


}

function putInfo(data) {
    apuImg.innerHTML = `<img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" class="w-100 img-fluid">
    <h2 class"text-white">${data.meals[0].strMeal}</h2>`;

    receipe.innerHTML = "";
    for (let i = 1; i <= 20; i++) { 
        const ingredient = data.meals[0][`strIngredient${i}`]; 
        const measure = data.meals[0][`strMeasure${i}`]; 

        if (ingredient) {
            receipe.innerHTML += `<span class="badge rcps text-dark fs-6">${measure} ${ingredient}</span>`;
        }
    }

    instructions.innerHTML = `<h2>Instructions</h2> <p>${data.meals[0].strInstructions}</p>`;
    info.innerHTML = `
        <p>
            <strong>Area:</strong> ${data.meals[0].strArea}<br>
            <strong>Category:</strong> ${data.meals[0].strCategory}<br>
            <strong>Recipes:</strong>
        </p>`;
        var src=document.getElementById("src");
        src.innerHTML=` <h2>Links:</h2>
          <button class="btn btn-danger mt-2 ms-2"><a class="text-white fs-5" href=${data.meals[0].strYoutube}>Youtube</a></button>
          <button class="btn btn-light mt-2 ms-2"><a class="text-black fs-5" href=${data.meals[0].strSource}>Sources</a></button>`
}
//////////
var cats = document.getElementById("input-cats");
if(cats != null)
{
    getCats();
}

async function getCats()
{
    try {
        res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        data = await res.json();
        console.log(data);
        putCat(data.categories);
        getId();
    } catch (error) {
        console.log("Error getting meals");
    }
}
async function putCat(data) {

    for(var i = 0 ; i < data.length ; i++)
        {
            cats.innerHTML += `<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].strCategory}">
                        <div class="image-container border-0 rounded-2">
                            <img src="${data[i].strCategoryThumb}"  alt="Sushi" class="img-fluid">
                           <a href="../html/categoriesFilter.html" > <div class="overlay text-center d-flex flex-column border-0 rounded-2">
                                <div class="info  fs-4">${data[i].strCategory}</div>
                                <div class="info  fs-6">${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</div>
                            </div></a>
                        </div>
                    </div>
            </div>`;
        }
}
var catsRes = document.getElementById("input-cats-filter");
if(catsRes != null)
{
    getCatsRes();
    
}

async function getCatsRes() {
    try {
        var name = localStorage.getItem("id");
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        data = await res.json();
        putCatRes(data.meals);
        getId();
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
    }
}


async function putCatRes(data) {

    
    for(var i = 0 ; i < data.length ; i++)
        {
            catsRes.innerHTML += `<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].idMeal}">
                        <div class="image-container border-0 rounded-2">
                            <img src="${data[i].strMealThumb}"  alt="Sushi" class="img-fluid">
                           <a href="../html/info.html" > <div class="overlay text-center d-flex flex-column border-0 rounded-2">
                                <div class="info  fs-4">${data[i].strMeal}</div>
                            </div></a>
                        </div>
                    </div>
            </div>`;
        }
}
/////////
var area = document.getElementById("input-area");
if(area != null)
{
    getArea();
}

async function getArea() {
    try {
        res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        data = await res.json();
        putArea(data.meals);
        getId();
    } catch (error) {
        console.log("Error getting meals");
    }
}

async function putArea(data) {
    for (let i = 0; i < 29; i++) {
        area.innerHTML += `<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].strArea}">
                        <div class="image-container border-0 rounded-2 flex-column mt-2 d-flex text-center g-4">
                           <a href="../html/areaFilter.html" class="text-white fs-1" >  
                           <i class="fas fa-globe" ></i> 
                           <h2>${data[i].strArea}</h2>
                           </a>
                        </div>
                    </div>
            </div>
        `
        
    } 
}


var areaRes = document.getElementById("input-areaRes");
if(areaRes != null)
{
    getAreaRes();
    
}

async function getAreaRes() {
    try {
        var name = localStorage.getItem("id");
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    
        data = await res.json();
        putAreaRes(data.meals);
        getId();
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
    }
}






async function putAreaRes(data) {

    console.log(data.length);
    
    for(var i = 0 ; i < data.length ; i++)
        {
            areaRes.innerHTML += `<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].idMeal}">
                        <div class="image-container border-0 rounded-2">
                            <img src="${data[i].strMealThumb}"  alt="Sushi" class="img-fluid">
                           <a href="../html/info.html" > <div class="overlay text-center d-flex flex-column border-0 rounded-2">
                                <div class="info  fs-4">${data[i].strMeal}</div>
                            </div></a>
                        </div>
                    </div>
            </div>`;
        }
}

//////////


var ing = document.getElementById("input-ing");
if(ing!= null)
{
    getIng();
}

async function getIng() {
    try {
        res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        data = await res.json();
        putIng(data.meals);
        getId();
    } catch (error) {
        console.log("Error getting meals");
    }
}

async function putIng(data) {
    for (let i = 0; i < 25; i++) {
        ing.innerHTML += `<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].strIngredient}">
                        <div class="image-container border-0 rounded-2 flex-column mt-2 d-flex text-center g-4">
                           <a href="../html/ingFilter.html" class="text-white fs-1" >  
                           <i class="fas fa-utensils" ></i> 
                           <div class="info  fs-4">${data[i].strIngredient}</div>
                                <div class="info  fs-6">${data[i].strDescription.split(" ").slice(0,20).join(" ")}</div>                           </a>
                        </div>
                    </div>
            </div>
        `
        
    } 
}



var ingRes = document.getElementById("input-ing-res");
if(ingRes != null)
{
    getIngRes();
    
}

async function getIngRes() {
    try {
        var idIng = localStorage.getItem("id");
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${idIng}`);
    
        data = await res.json();
        putIngRes(data.meals);
        getId();
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
    }
}






async function putIngRes(data) {

    
    
    for(var i = 0 ; i < data.length ; i++)
        {
            ingRes.innerHTML += `<div class="col-lg-3 col-md-4 col-12 overflow-hidden rounded-4">
                    <div class="inner border-0 rounded-2" id="${data[i].idMeal}">
                        <div class="image-container border-0 rounded-2">
                            <img src="${data[i].strMealThumb}"  alt="Sushi" class="img-fluid">
                           <a href="../html/info.html" > <div class="overlay text-center d-flex flex-column border-0 rounded-2">
                                <div class="info  fs-4">${data[i].strMeal}</div>
                            </div></a>
                        </div>
                    </div>
            </div>`;
        }
}


submitBtn = document.getElementById("submitBtn")


document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
if (nameInputTouched) {
    if (nameValidation()) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
        document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
}
if (emailInputTouched) {

    if (emailValidation()) {
        document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
}

if (phoneInputTouched) {
    if (phoneValidation()) {
        document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
}

if (ageInputTouched) {
    if (ageValidation()) {
        document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
}

if (passwordInputTouched) {
    if (passwordValidation()) {
        document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
}
if (repasswordInputTouched) {
    if (repasswordValidation()) {
        document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
        document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

    }
}


if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
} else {
    submitBtn.setAttribute("disabled", true)
}
}

function nameValidation() {
return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
