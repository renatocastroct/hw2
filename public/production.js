var form_login = document.forms["login"];
var login = document.querySelector("#login");
var div_user = document.querySelector("#user");

var menu = document.querySelector("#menu div");
menu.addEventListener("click", windowTitle);


let formSearch = document.forms["search"];
if (formSearch) {
    formSearch.addEventListener("submit", tableLots);
    formSearch.clear.addEventListener("click", clearForm);
}

var formCreate = document.forms["create"];
if (formCreate) {
    formCreate.addEventListener("submit", createLots);
    formCreate.clear.addEventListener("click", clearForm);
}

function clearForm() {
    let forms = document.querySelectorAll(".manage form");

    for (let form of forms) {
        if (!form.classList.contains("off")) {
            form.lot.value = '';
            form.product.value = '';
            if (form.flag) {
                form.flag.value = '';
            }
            if (form.n_wfs) {
                form.n_wfs.value = '';
            }
        }
    }
    document.querySelector(".manage h3").textContent = "Total lots: 0";
    let table = document.querySelector("table");
    if(table) {
        table.classList.add("off");
    }
}

var title = document.querySelector("#title_window h1");
if (title) {
    windowMenu(title.textContent);
    let menuDiv = document.querySelectorAll("#menu a");
    for (let menu of menuDiv) {
        if (menu.textContent == title.textContent) {
            menu.classList.add("menu_selected");
        }
    }
}

login.addEventListener("click", viewLogin);

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

function windowTitle(event) {
    var menuSelected = document.querySelector(".menu_selected");
    if (menuSelected) {
        menuSelected.classList.remove("menu_selected");
    }
    event.target.classList.add("menu_selected");

    var manage_div = document.querySelector("#title_window");
    if (manage_div) {
        manage_div.innerHTML = "";
        var operations = document.querySelector(".operation");
        if (operations) {
            operations.classList.remove("operation");
            operations.classList.add("off");
        }

        let forms = document.querySelectorAll(".manage form");
        for (let form of forms) {
            if (form || operations) {
                form.classList.add("off");
                let table = document.querySelector(".manage table");
                table.classList.add("off");
            }
        }

        let notices = document.querySelectorAll(".manage h3");
        if (notices) {
            for (let notice of notices) {
                notice.classList.add("off");
            }
        }

        let image = document.querySelector(".manage img");
        if (image) {
            image.classList.add("off");
        }
        
    }
    var new_title = document.createElement("h1");
    new_title.textContent = event.target.textContent;
    manage_div.appendChild(new_title);
    windowMenu(new_title.textContent);
}

function windowMenu(title) {
    switch(title) {
        case "Last Results":
            fetch(routeNotLog).then(onResponse).then(lastResults);
            break;
        case "Manage Machines":
            fetch(routeDepartment).then(onResponse).then(manageMachines);
            break;
        case "Manage Lots":
            fetch(routeManageLots + "/1").then(onResponse).then(manageLots);
            break;
        case "Week News":
            fetch(routeNotLog).then(onResponse).then(weekNews);
            break;
      }
}

function weekNews(json) {
    var manage_div = document.querySelector("#title_window");
    for (var news of json[0]) {
        var new_news = document.createElement("h2");
        new_news.textContent = news["day"] + ": " + news["descrizione"];
        manage_div.appendChild(new_news); 
    }
}

function lastResults(json) {
    var manage_div = document.querySelector("#title_window");
    for (var ach of json[1]) {
        var new_ach = document.createElement("h2");
        new_ach.textContent = ach["nome"] + ": " + ach["target"] + "%";
        manage_div.appendChild(new_ach); 
        }
}

function operationSelected(event) {
    let operationSelected = document.querySelector(".operation_selected");
    if (operationSelected) {
        operationSelected.classList.remove("operation_selected");
    }
    event.target.classList.add("operation_selected");

    clearManage();

    switch(event.target.textContent) {
        case "Search":
            document.forms["search"].classList.remove("off");
            let notice = document.querySelector(".manage h3");
            notice.classList.remove("off");
            notice.textContent = "Total lots: 0";
            break;    
        case "Create":
            formCreate.classList.remove("off");
            break;   
        case "Locate":
            workInProgress();
            break;         
    }
}

function clearManage() {
    let forms = document.querySelectorAll(".manage form");
    for (let form of forms) {
        if (!form.classList.contains("off")) {
            form.classList.add("off");
        }
    }
    let notices = document.querySelectorAll(".manage h3");
    for (let notice of notices) {
        if (!notice.classList.contains("off")) {
            notice.classList.add("off");
        }
    }
    let table = document.querySelector(".manage table");
    if (table && !table.classList.contains("off")) {
        table.classList.add("off");
    }

    let image = document.querySelector(".manage img");
    if (image && !image.classList.contains("off")) {
        image.classList.add("off");
    }
}

function workInProgress() { 
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
    
    let image = document.querySelector(".manage img");
    if (!image) {
        let image = document.createElement("img");
        image.src = "workInProgress.jpeg";
        manage.appendChild(image);
    } else {
        image.classList.remove("off");
        }
}

function manageLots(json) {
    let selected = document.querySelector(".operation_selected");
    if (selected) {
        selected.classList.remove("operation_selected");
    }

    let operationSearch = document.querySelector(".manage h2");
    if (operationSearch) {
        operationSearch.classList.add("operation_selected");
    }

    clearManage();

    switch(typeof json) {
        case "string":
            var manage_div = document.querySelector("#title_window");
            var notice = document.createElement("h2");
            notice.textContent = json;
            manage_div.appendChild(notice);
            break;
        case "object":
            var table = document.querySelector("tbody");
            table.innerHTML = '';
            var operations = document.querySelector(".manage div.off");
            operations.classList.add("operation");  
            operations.addEventListener("click", operationSelected);
            formSearch.classList.remove("off");
            var total = document.querySelector(".manage h3");
            let i = 0;
            if (json !== null) {
                for (var lot of json) {
                    var table = document.querySelector(".manage table");
                    table.classList.remove("off");
                    var t_body = document.querySelector("tbody");
                    var new_row = document.createElement("tr");
                    var new_column = document.createElement("td");
                    new_column.headers = "serie";
                    new_column.textContent = lot["serie"];
                    new_row.appendChild(new_column);
                    var new_column = document.createElement("td");
                    new_column.textContent = lot["prodotto"];
                    new_row.appendChild(new_column);
                    var new_column = document.createElement("td");
                    new_column.textContent = lot["n_wfs"];
                    new_row.appendChild(new_column);
                    var new_column = document.createElement("td");
                    new_column.textContent = lot["flag"];
                    new_row.appendChild(new_column);
                    var new_column = document.createElement("td");
                    var drop = document.createElement("input");
                    drop.type = "button";
                    drop.name = "drop";
                    drop.value = "X";
                    new_column.appendChild(drop);
                    new_row.appendChild(new_column);
                    t_body.appendChild(new_row);
                    i++;
                }
            }
            total.textContent = "Total lots: " + i;
            total.classList.remove("off"); 
            var rows = document.querySelectorAll('tbody tr');
            i = 0;
            for (let row of rows) {
                if (i %2 == 0) {
                    row.classList.add('even');
                }
                i++;
            }
            break;
    }
    let dropButtons = document.getElementsByName("drop");
    if (dropButtons) {
        for (let dropButton of dropButtons) {
            dropButton.addEventListener("click", dropLot);
        }
    }
} 

var fetchDrop;

function dropLot(event) {
    let lot = event.currentTarget.parentNode.parentNode.querySelector("td").textContent;
    let buttonsDiv = document.querySelector("#confirmButtons");
    let alert = document.querySelector("div");
    if (buttonsDiv.classList.contains("off")) {
        buttonsDiv.classList.remove("off");
    }
    alert.classList.remove("off");
    alert.classList.add("alert");
    alert.querySelector("h2").textContent = "Confermi l'eliminazione del lotto: " + lot + "?";
    fetchDrop = "droplot/" + lot;
    let buttons = document.querySelectorAll("#confirmButtons input");
    for (let button of buttons) {
        button.addEventListener("click", confirmDrop);
    }
}

function confirmDrop(event) {
    document.querySelector("#confirmButtons").classList.add("off");
    switch (event.target.value) {
        case "Yes":
            fetch(fetchDrop).then(onResponse).then(showConfirmDrop);
            break;
        case "No":
            event.target.parentNode.parentNode.parentNode.classList.remove("alert");
            event.target.parentNode.parentNode.parentNode.classList.add("off");
            break;
    }
}

function showConfirmDrop(json) {
    let alert = document.querySelector("div");
    alert.classList.remove("off");
    alert.classList.add("alert");
    alert.querySelector("h2").textContent = json;
    alert.addEventListener("click", hiddenAlert);
    let buttonsDiv = document.querySelector("#confirmButtons");
    buttonsDiv.classList.add("off");
    tableLots();
}

function confirmCreate(json) {
    let alert = document.querySelector("div");
    alert.classList.remove("off");
    alert.classList.add("alert");
    alert.querySelector("h2").textContent = json;
    alert.addEventListener("click", hiddenAlert)
    clearForm();
}

function hiddenAlert(event) {
    let buttonsDiv = document.querySelector("#confirmButtons");
    if (event.target.classList.contains("alert") && buttonsDiv.classList.contains("off")) {
        event.currentTarget.classList.remove("alert");
        event.currentTarget.classList.add("off");
    }
}

function createLots(event) {
    const newFormCreate = new FormData(formCreate);
    let i = 0;
    for (let value of newFormCreate.values()) {
        if (value) {
            i++;
        }
    }
    if (i !== 3) { 
        alert("Compila tutti i campi");
        event.preventDefault();
        return;
    }
    var lot = newFormCreate.get('lot');
    var product = newFormCreate.get('product');
    var nWfs = newFormCreate.get('n_wfs');
    fetch("createlot/"+encodeURIComponent(lot)+"/"+product.toUpperCase()+"/"+nWfs).then(onResponse).then(confirmCreate);
    event.preventDefault();
}

function tableLots(event) {
    let formSearch = document.forms["search"];
    const newFormSearch = new FormData(formSearch);
    let lot = (newFormSearch.get('lot')) ? newFormSearch.get('lot') : null;
    let product = (newFormSearch.get('product')) ? newFormSearch.get('product') : null;
    let flag = (newFormSearch.get('flag')) ? newFormSearch.get('flag') : null;
    fetch(routeManageLots + "/0/" + encodeURIComponent(lot) + "/" + product + "/" + flag).then(onResponse).then(manageLots);
    if (event) {
        event.preventDefault();
    }
}

function manageMachines(json) {
    var manage_div = document.querySelector("#title_window");

    if (Array.isArray(json)) { 
        var div_machines = document.createElement("div");
        div_machines.classList.add("manage_machines");
        manage_div.appendChild(div_machines);
        var new_div = document.createElement("div");
        new_div.classList.add("head");
        var new_machine = document.createElement("h2");
        new_machine.textContent = "ID: ";
        var new_state = document.createElement("h2");
        new_state.textContent = "Stato:";
        var new_lot = document.createElement("h2");
        new_lot.textContent = "Lotto allo step:";
        var new_comment = document.createElement("h2");
        new_comment.textContent = "Commento:";
        var new_collocation = document.createElement("h2");
        new_collocation.textContent = "Collocazione macchinario:";
        div_machines.appendChild(new_div);
        new_div.appendChild(new_machine);
        new_div.appendChild(new_state);
        new_div.appendChild(new_lot);
        new_div.appendChild(new_comment);
        new_div.appendChild(new_collocation);
        for (var machine of json) {
            var new_div = document.createElement("div");
            var new_machine = document.createElement("h2");
            new_machine.textContent = machine["id"];
            var new_state = document.createElement("h2");
            new_state.textContent = machine["stato"];
            var new_lot = document.createElement("h2");
            new_lot.textContent = machine["serie"] + " /  " + machine["step"];
            var new_comment = document.createElement("h2");
            new_comment.textContent = machine["commento"];
            var new_collocation = document.createElement("h2");
            new_collocation.textContent = machine["collocazione"];

            div_machines.appendChild(new_div);
            new_div.appendChild(new_machine);
            new_div.appendChild(new_state);
            new_div.appendChild(new_lot);
            new_div.appendChild(new_comment);
            new_div.appendChild(new_collocation);
        }
    } else {
        var notice = document.createElement("h2");
        notice.textContent = json;
        manage_div.appendChild(notice);
    }
    
}

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