var menu = document.querySelector("#menu div");
menu.addEventListener("click", windowTitle);

function windowTitle(event) {
    var menuSelected = document.querySelector(".menu_selected");
    if (menuSelected) {
        menuSelected.classList.remove("menu_selected");
    }

    event.target.classList.add("menu_selected");
    var table = document.querySelector("table");
    if (table) {
        table.classList.add("off");
    }
    var new_title = document.createElement("h1");
    new_title.textContent = event.target.textContent;
    var manage_div = document.querySelector("#title_window");
    if (manage_div) {
        manage_div.innerHTML = "";
    }
    manage_div.appendChild(new_title);
    windowMenu(new_title.textContent);
}

function windowMenu(title) {
    switch(title) {
        case "Stock Comparison":
            loadingGif();
            fetch('statistics/comparison').then(onResponse).then(onQuotes);
            break;
        case "Stock Market":
            workInProgress();
            break;
        case "Market Share":
            workInProgress();
            break;
        case "Historical":
            workInProgress();
            break;
      }
}

function loadingGif() {
    clearManage();
    var manage = document.querySelector(".manage");
    
    let image = document.querySelector("#loadingGif");
    if (!image) {
        let image = document.createElement("img");
        image.setAttribute("id", "loadingGif")
        image.src = "loading.gif";
        manage.appendChild(image);
    } else {
        image.classList.remove("off");
        }
}

function workInProgress() { 
    clearManage();
    let notice = document.querySelector(".work");
    var manage = document.querySelector(".manage");
    if (!notice) {
        let notice = document.createElement("h3");
        notice.classList.add("work");
        notice.textContent = "Stiamo lavorando per voi";
        manage.appendChild(notice);
    } else {
        notice.classList.remove("off");
        notice.classList.add("work");
        }
    
    let image = document.querySelector("#willie");
    if (!image) {
        let image = document.createElement("img");
        image.setAttribute("id", "willie");
        image.src = "workInProgress.jpeg";
        manage.appendChild(image);
    } else {
        image.classList.remove("off");
        }
}

function clearManage() {
    let notice = document.querySelector(".manage h3");
    if (notice) {
        notice.classList.add("off");
    }
    let images = document.querySelectorAll(".manage img");
    if (images) {
        for (let image of images) {
            image.classList.add("off");
        }
    }
}

function onQuotes (json) {
    clearManage();

    let table = document.querySelector(".manage table");
    if (table) {
        var t_body = document.querySelector("tbody");
        t_body.innerHTML = '';
    }

    var company_list = json['companies'];
    var company_quotes = json['quotes'];
    document.querySelector("table").classList.remove("off");
    var new_row = document.createElement("tr");
    var new_column = document.createElement("td");
    new_column.classList.add("mh_td");
    new_column.textContent = "M&H";
    new_row.appendChild(new_column);
    var new_column = document.createElement("td");
    new_column.classList.add("mh_td");
    new_column.textContent = json['meh'].open;
    new_row.appendChild(new_column);
    var new_column = document.createElement("td");
    new_column.classList.add("mh_td");
    new_column.textContent = json['meh'].close;
    new_row.appendChild(new_column);
    t_body.appendChild(new_row);

    for (i = 0; i < company_list.length; i++) {
        n = 0;
        while (n !== -1) {
            if (company_quotes[n].symbol == company_list[i].symbol) {
                var new_row = document.createElement("tr");
                var new_column = document.createElement("td");
                new_column.textContent = company_list[i].name;
                new_row.appendChild(new_column);
                var new_column = document.createElement("td");
                new_column.textContent = company_quotes[n].open;
                new_row.appendChild(new_column);
                var new_column = document.createElement("td");
                new_column.textContent = company_quotes[n].close;
                new_row.appendChild(new_column);
                new_row.appendChild(new_column);
                new_row.appendChild(new_column);
                t_body.appendChild(new_row);
                n = -2;
            }
            n++
        }
    }
    var rows = document.querySelectorAll('tbody tr');
    var i = 0;
    for (let row of rows) {
        if (i %2 == 0) {
            row.classList.add('even');
        }
        i++;
}
}

function onResponse(response) {
    return response.json();
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
    new_username.textContent = "Username: " + json["username"];
    var new_direzione = document.createElement("h4");
    new_direzione.textContent = "Director of: " + json["direzione"];
    var new_livello = document.createElement("h4");
    new_livello.textContent = "Contract level: " + json["livello"];
    var new_logout = document.createElement("a");
    new_logout.textContent = "Logout";
    new_logout.href = "logout/statistics";
    div_user.appendChild(new_name);
    div_user.appendChild(new_username);
    div_user.appendChild(new_direzione);
    div_user.appendChild(new_livello);
    div_user.appendChild(new_logout);
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
} else {
    form_login.addEventListener("submit", signIn);
}