//FETCH METHODS
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
        return resp.json();
    }).then((json) => {
        console.log(json);
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
        return resp.json();
    }).then((json) => {
        console.log(json);   
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
        return resp.json();
    }).then((json) => {
        console.log(json);
    });
}