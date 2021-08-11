const getCountry = 'https://api.first.org/data/v1/countries';
const country = document.querySelector(".country");
const cover = document.querySelector(".cover");

// MAKE A RANDOM IMAGES TRANSITION
let componentHTML;

const ImageList = ['maryna-nikolaieva-DEROPbWCbKk-unsplash.jpg', 'nina-hill-p41VAaJTdNw-unsplash.jpg',
    'siena-yu-iBcFPp_sXqI-unsplash.jpg', 'stone-hood-7GZ6mr5k9DU-unsplash.jpg',
    'geraltyichen-IguOPx2ZVLA-unsplash.jpg'];


const rImage = setInterval(() => {
    const randomImage = Math.floor(Math.random() * ImageList.length);
    cover.classList.toggle("opacity-image");
    cover.style.backgroundImage = `url("./img/${ImageList[randomImage]}")`;
},5000);



// GET ALL COUNTRY
fetch(getCountry)
 .then((result) =>
     result.json())
    .then((dataCountry) => {
        for (const m in dataCountry.data) {
            componentHTML = `<option value="${dataCountry.data[m].country}">${dataCountry.data[m].country}</option>`;
            country.innerHTML += componentHTML;
        }
    });


// VALIDATE
const regEx = {
    name : /^[a-zA-Z ]+$/mi,
    email : /^([^!@#\$%&'\*\+\/=\?\^\{\}\|~])(?!.*[\.\-_]{2}).[^!@#\$%&'\*\+\/=\?\^\{\}\|~]+([^!@#\$%&'\*\+\/=\?\^\{\}\|~])@([\w-]{2,20})\.([a-zA-Z]{2,20})(.[a-zA-Z]{2,20})?$/mi,
    phone : /^[\d]{11,12}$/mi,
    city : /^([a-zA-Z ])+(,[\w ]+)?$/mi,
    password : /^[\w!@#\$%&'\*\+\/=\?\^\{\}\|~]{8,20}$/mi,
};

function validationCheckRegEx(validatorPattern, valueString){
    if (validatorPattern.test(valueString)){
        return true
    } else {
        return false
    }
};


const passwordOriginal = document.getElementById("password");
const formInput = document.querySelector(".form-inputs");
formInput.addEventListener("keyup",(event) => {

    if (event.target.getAttribute('name')) {
        if (validationCheckRegEx(regEx[event.target.getAttribute('name')], event.target.value)) {
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
        } else {
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
        }
    } else {

        //    CHECK IF CONFIRM PASSWORD SAME
        if (event.target.getAttribute('id') === 'confirm') {
            if (event.target.value !== passwordOriginal.value) {
                event.target.classList.remove("is-valid");
                event.target.classList.add("is-invalid");
            } else {
                event.target.classList.remove("is-invalid");
                event.target.classList.add("is-valid");
            }
        }
    }

    // IF VALUE FORM INPUT EMPTY BORDER COLOR CHANGE BLUE
    if (event.target.value === "") {
        event.target.classList.remove("is-invalid");
    }
});




// CHECK INPUT VALUE GENDER
function checkedForm(event) {
    if (event.checked) {
        return true
    } else {
        return false
    }
}

const inputGender = document.querySelector(".check-gender");
const inputGenderCheck = document.querySelector(".gender").children;

inputGender.addEventListener("click", (event) => {
    if (event.target.getAttribute('id') === 'male' || event.target.getAttribute('id') === 'female') {
        if (checkedForm(event.target)) {
            event.target.classList.add("is-valid");
            event.target.parentElement.classList.add("is-valid");
            for (const x of inputGenderCheck) {
                for (const y of x.children) {
                    if (y.checked === false) {
                        y.disabled = true
                    }
                }
            }
        } else {
            event.target.classList.remove("is-valid");
            event.target.parentElement.classList.remove("is-valid");
            for (const x of inputGenderCheck) {
                for (const y of x.children) {
                    if (y.disabled === true) {
                        y.disabled = false;
                    }
                }
            }
        }
    }
});

// CHECK INPUT VALUE SELECT
formInput.addEventListener("change", (event) => {
    if (event.target.getAttribute('id') === 'country' || event.target.getAttribute('id') === 'apply') {
        event.target.classList.add("is-valid");
    }
});

formInput.addEventListener("click", (event) => {
    if (event.target.getAttribute('id') === 'country' || event.target.getAttribute('id') === 'apply') {
       if (event.target.value === 'Select Country' || event.target.value === 'Position Intern') {
           event.target.classList.remove("is-valid");
       }
    }
});


// CLICK BUTTON NEXT STEP
const buttonNext = document.querySelector(".confirm-value-input");
const formValue = document.querySelectorAll(".mb-3");

buttonNext.addEventListener("click",() => {

    const inputValueResult = [];
    for (const x of formValue) {
        for (const y of x.children) {
            if (y.classList.contains("is-valid")) {
                inputValueResult.push(y);
            }
        }
    }

    if (inputValueResult.length === 9) {
        console.log(inputValueResult);
        alert("ANDA BERHASIL MENDAFTAR")
    } else {

        // alert("TELITI JAWABAN ANDA");
        alert("TELITI JAWABAN ANDA");
        if (inputValueResult.length > 0) {
            let removeDuplicateResult = inputValueResult.filter((c, index) => {
                return inputValueResult.indexOf(c) === index;
            });
            inputValueResult.length = 0;
            for (const x of removeDuplicateResult ) {
                inputValueResult.push(x);
            }
        }
    }
});


