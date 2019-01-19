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
        if (resp.ok) {
            
        } else {
            
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
        if (resp.ok) {
            
        } else {
            
        }
    }).then((json) => {
        console.log(JSON.stringify(json));
        
    });
}