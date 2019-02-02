//RADIO ONCLICK
function showPayload(){ 
    if (document.getElementById("GET").checked) {
        console.log("GET");
        document.getElementById("payload").style.display = "none";
    } else {
        console.log("PUT/POST");
        document.getElementById("payload").style.display = "block";
    }
}

//BUTTON CLICKS
function send(pressed) {
    let query = [];

    let url = document.URL + pressed;
    let key = document.getElementById("key").value;
    let id = document.getElementById("id").value;
    let questionId = document.getElementById("questionId").value;
    let questionOptionId = document.getElementById("questionOptionId").value;
    let recommendationId = document.getElementById("recommendationId").value;

    query.push({key : key});
    query.push({id : id});
    query.push({questionId : questionId});
    query.push({questionOptionId : questionOptionId});
    query.push({recommendationId : recommendationId});
    let firstQuery = true
    for(let x = 0; x < query.length; x++) {
        let keyName = Object.keys(query[x])[0];
        if (query[x][keyName] === "" || query[x][keyName] === undefined)
            continue;
            
        let queryChar = firstQuery ? '?' : '&';
        firstQuery = false; //make query char = & after first use
        
        console.log(keyName, query[x]);
        url += queryChar + keyName + '=' + query[x][keyName];
    }

    //METHODS
    if (document.getElementById("GET").checked) {
        console.log("GET", url);
        get(url);
    } else if (document.getElementById("POST").checked) {
        console.log("POST", url);
        let data = document.getElementById("jsonPayload").value;
        try {
            JSON.parse(data);
            post(url, data);
        } catch (e) {
            console.log(e.toString(), "Incorrect JSON format");
            document.getElementById("error").innerHTML = e.toString();
        }
    } else {
        console.log("PUT", url);
        let data = document.getElementById("jsonPayload").value;
        try {
            JSON.parse(data);
            put(url, data);
        } catch (e) {
            console.log(e.toString(), "Incorrect JSON format");
            document.getElementById("error").innerHTML = e.toString();
        }
    }
}