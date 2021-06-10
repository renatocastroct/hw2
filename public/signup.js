var login = document.querySelector("#login");
login.addEventListener("click", viewLogin);

var div_user = document.querySelector("#user");

function viewLogin() {
    if (div_user.classList.contains("off")) {
        div_user.classList.remove("off");
        div_user.classList.add("login");
    } else {
        div_user.classList.remove("login");
        div_user.classList.add("off");
    }
    document.addEventListener("click", hiddenLogin);
}

function hiddenLogin(event) {
    if ((div_user !== event.target) && !div_user.contains(event.target) && (login !== event.target) && !login.contains(event.target) ) {
        div_user.classList.remove("login");
        div_user.classList.add("off");
    }
}

const formRegistration = document.forms["registration"];

var data = {};

if (formRegistration) {
    formRegistration.addEventListener("submit", checkForm);
}

function checkForm(event) {
    let newFormRegistration = new FormData(formRegistration);
    i = 0;
    for (let value of newFormRegistration.values()) {
        if (value) {
            i++;
        }
    }
    if (i !== 7) { 
        alert("Compila tutti i campi");
        event.preventDefault();
        return;
    }
    if ((newFormRegistration.get('password').length < 8) || (newFormRegistration.get('password').length > 15)) {
        alert("Lunghezza password non valida");
        event.preventDefault();
        return;
    }
    fetch("checkusername/" + encodeURIComponent(newFormRegistration.get('firstName')) + 
    "/" + encodeURIComponent(newFormRegistration.get('lastName')) + 
    "/" + newFormRegistration.get('department')).then(onResponse).then(checkUsername);
    event.preventDefault();
}


function checkUsername(json) {
    if (json.length !== 2) {
        alert(json);
        return;
    }
    let newFormRegistration = new FormData(formRegistration);
    newFormRegistration.append("username", json[0]);
    newFormRegistration.append("send", json[0]);
    fetch('signupvalidation', {
        method: 'POST',
        body: newFormRegistration
    }).then(onResponse).then(confirmRegistration);
}


function confirmRegistration(json) {
    if (typeof json == "string") {
        alert(json);
        return;
    } else {
        let buttons = document.querySelector("#confirmButtons");
        let buttonsDiv = document.querySelector("div");
        buttonsDiv.classList.remove("off");
        buttonsDiv.classList.add("alert");
        buttons.addEventListener("click", redirectHome);
    }
}

function redirectHome() {
    let buttonsDiv = document.querySelector("div");
    buttonsDiv.classList.remove("alert");
    buttonsDiv.classList.add("off");
    location.href = "home";
}

var form_login = document.forms["login"];

function signIn(event) {
    let newFormLogin = new FormData(form_login);
    let metaToken = document.querySelector('[name="csrf-token"]');
    fetch('user', {
        headers: {
            'X-CSRF-TOKEN': metaToken["content"]
          },
        method: 'POST',
        body: newFormLogin
    }).then(onResponse).then(onInfoUser).catch(function(error) {
        if (error == "SyntaxError: Unexpected token < in JSON at position 0") {
            window.location.replace("http://localhost/hw2/public/home");
        }
    });
    if (event) {
        event.preventDefault();
    }
}

if (!form_login) {
    signIn();
} else {
    form_login.addEventListener("submit", signIn);
}

function onInfoUser(json) {
    if (typeof json == "string") {
        alert(json);
        return;
    }
    var div_user = document.querySelector("#user");
    var new_name = document.createElement("h1");
    new_name.textContent = json["nome"] + " " + json["cognome"];
    var new_username = document.createElement("h4");
    new_username.textContent = "Username: " + json["username"];
    var new_direzione = document.createElement("h4");
    new_direzione.textContent = "Director of: " + json["direzione"];
    var new_livello = document.createElement("h4");
    new_livello.textContent = "Contract level: " + json["livello"];
    var new_logout = document.createElement("a");
    new_logout.textContent = "Logout";
    new_logout.href = "logout/production";
    div_user.appendChild(new_name);
    div_user.appendChild(new_username);
    div_user.appendChild(new_direzione);
    div_user.appendChild(new_livello);
    div_user.appendChild(new_logout);
}

function onResponse(response) {
    return response.json();
}