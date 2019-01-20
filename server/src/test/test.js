function send(pressed) {
    let url = document.URL + pressed;
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;

    //QUERY PARAMETERS
    if(name !== "") {
        console.log("NAME", name);
        url += '?name=' + document.getElementById("name").value;
    }
    if (id !== "") {
        console.log("ID", id);
        url += '?id=' + document.getElementById("id").value;
    }

    //METHODS
    if (document.getElementById("GET").checked) {
        console.log("GET", url);
        get(url);
    }
    else if (document.getElementById("POST").checked) {
        console.log("POST");
    } else {
        console.log("PUT");
    }
    
}

async function post(url, data) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify({
            data: data
        }),
        credentials: 'same-origin',
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        let error = document.getElementById("error");
        if (resp.ok) {
            error.innerHTML = "";
        } else {
            console.log(resp.status + ' ' + resp.statusText);
            error.innerHTML = resp.status + ' ' + resp.statusText;
        }
    }).then((json) => {
        console.log(JSON.stringify(json));
        
    });
}

async function get(url) {
    return fetch(url, {
        method: "GET",
        credentials: "omit",
        mode: 'cors',
        cache: "no-cache",
        redirect: "follow",
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((resp) => {
        let error = document.getElementById("error");
        if (resp.ok) {
            error.innerHTML = "";
        } else {
            console.log(resp.status + ' ' + resp.statusText);
            error.innerHTML = resp.status + ' ' + resp.statusText;
        }
    }).then((json) => {
        console.log(JSON.stringify(json));
        
    });
}

async function put(url, data) {
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            data: data
        }),
        credentials: 'same-origin',
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        let error = document.getElementById("error");
        if (resp.ok) {
            error.innerHTML = "";
        } else {
            console.log(resp.status + ' ' + resp.statusText);
            error.innerHTML = resp.status + ' ' + resp.statusText;
        }
    }).then((json) => {
        console.log(JSON.stringify(json));

    });
}