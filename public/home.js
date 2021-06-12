//ad ogni accesso alla home verifica se c'è il form di login, se non c'è vuol dire che si ha una sessione
//se si ha una sessione si richiama direttamente la funzione signIn() che richiede le info utente
//se non si ha la sessione si attende il submit del form di login per accedere alla funzione signIn() che richiederà le info utente

function onInfoUser(json) {
    if (typeof json == "string") {
        alert(json);
        return;
    }
    var div_user = document.querySelector("#user");
    if (form_login) {
        window.location.reload();
    }
    div_user.classList.remove("login");
    div_user.classList.add("off");
    var new_name = document.createElement("h1");
    new_name.textContent = json["nome"] + " " + json["cognome"];
    var new_username = document.createElement("h4");
    new_username.textContent = "Username:  " + json["username"];
    var new_direzione = document.createElement("h4");
    new_direzione.textContent = "Director of:  " + json["direzione"];
    var new_livello = document.createElement("h4");
    new_livello.textContent = "Contract level:  " + json["livello"];
    var new_logout = document.createElement("a");
    new_logout.textContent = "Logout";
    new_logout.href = "logout/home";
    div_user.appendChild(new_name);
    div_user.appendChild(new_username);
    div_user.appendChild(new_direzione);
    div_user.appendChild(new_livello);
    div_user.appendChild(new_logout);
}

function onInfoDeparment(json) {
    var div_department = document.querySelector(".blocks");
    var new_department = document.createElement("h1");
    new_department.textContent = json[0]["collocazione"];
    var div_elements = document.createElement("div");
    div_elements.classList.add("elements");
    div_department.appendChild(new_department);
    div_department.appendChild(div_elements);
    let i = 0;
    for (var machine of json) {
        var new_div = document.createElement("div");
        new_div.classList.add("div_element");
        new_div.dataset.index = i;
        var new_machine = document.createElement("h2");
        new_machine.textContent = machine["id"];
        switch (machine["stato"]) {
            case "up":
                new_div.style.backgroundColor = "rgb(0, 146, 138)";
                break;
            case "down":
                new_div.style.backgroundColor = "rgb(207, 29, 8)";
                break;
        }
        var new_comment = document.createElement("h4");
        var new_collocation = document.createElement("h4");
        var new_span = document.createElement("span");
        new_span.classList.add("off");
        new_comment.textContent = "Stato: " + machine["commento"];
        new_collocation.textContent = "Collocazione attuale: " + machine["collocazione"];
        new_span.appendChild(new_comment);
        new_span.appendChild(new_collocation);
        var new_stato = document.createElement("h3");
        new_stato.textContent = machine["stato"].toUpperCase();
        div_elements.appendChild(new_div);
        new_div.appendChild(new_machine);
        new_div.appendChild(new_stato);
        new_div.appendChild(new_span);
        i++;
    }
    var elements = document.querySelectorAll(".div_element");
    for(let element of elements) {
        element.addEventListener('click', descr);
    }
}

function descr(event) {
    var comments = event.currentTarget.querySelectorAll("span");
    for (let comment of comments) {
        if (comment.classList.contains("off")) {
            comment.classList.remove("off");
        } else {
            comment.classList.add("off");
        }
    }
}


function onNotLog(json) {
    var div_comment1 = document.querySelector("#comment1");
    var new_title = document.createElement("h1");
    new_title.textContent = "Week News";
    div_comment1.appendChild(new_title);
    for (var news of json[0]) {
        var new_news = document.createElement("h2");
        new_news.textContent = news["day"] + ": " + news["descrizione"];
        div_comment1.appendChild(new_news); 
    }
    var new_more = document.createElement("a");
    new_more.classList.add("more");
    new_more.textContent = "more";
    new_more.href = "production/" + encodeURI(new_title.textContent);;
    div_comment1.appendChild(new_more);

    var div_comment2 = document.querySelector("#comment2");
    var new_title = document.createElement("h1");
    new_title.textContent = "Last Results";
    div_comment2.appendChild(new_title);
    for (var ach of json[1]) {
        var new_ach = document.createElement("h2");
        new_ach.textContent = ach["nome"] + ": " + ach["target"] + "%";
        div_comment2.appendChild(new_ach); 
        }
    var new_more = document.createElement("a");
    new_more.textContent = "more";
    new_more.classList.add("more");
    new_more.href = "production/" + encodeURI(new_title.textContent);
    div_comment2.appendChild(new_more);
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
    }).then(onResponse).then(onInfoUser);
    if (event) {
        event.preventDefault();
    }
}

if (!form_login) {
    signIn();   
    fetch("department").then(onResponse).then(onInfoDeparment);
} else {
    form_login.addEventListener("submit", signIn);
}

var section_notLog = document.querySelector("div.highlights");

if (section_notLog) {
    fetch("notlog").then(onResponse).then(onNotLog);
}

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

function onResponse(response) {
    return response.json();
}

function research(event) {
    var elementi = document.querySelectorAll('.elements div');
    for (let elemento of elementi) {
        elemento.classList.remove('off');
        elemento.classList.add('div_element');
    }
    var titoli = document.querySelectorAll('.blocks h2');
    var descrizioni = document.querySelectorAll('.blocks h4');
    var text = event.currentTarget.value.toLowerCase();
    var i = 0;
    for (let titolo of titoli) {    
        if ((titolo.textContent.toLowerCase().indexOf(text) == -1) && (descrizioni[i].textContent.toLowerCase().indexOf(text) == -1)) {
            titolo.parentNode.classList.remove('div_element');
            titolo.parentNode.classList.add('off');
        }
        i++;
    }
}

var search = document.querySelector('#search');
if (search) {
    search.addEventListener('input', research);
}