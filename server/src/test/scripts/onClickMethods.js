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
    let url = document.URL + pressed;
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let questionId = document.getElementById("questionId").value;
    let questionOptionId = document.getElementById("questionOptionId").value;
    let questionAnswerId = document.getElementById("questionAnswerId").value;
    let recommendationId = document.getElementById("recommendationId").value;

    //QUERY PARAMETERS
    if (name !== "") {
        console.log("NAME", name);
        url += '?name=' + document.getElementById("name").value;
    }
    if (id !== "") {
        console.log("ID", id);
        url += '?id=' + document.getElementById("id").value;
    }
    if (questionId !== "") {
        console.log("QuestionId", questionId);
        url += '?questionId=' + document.getElementById("questionId").value;
    }
    if (questionOptionId !== "") {
        console.log("QuestionId", questionOptionId);
        url += '?questionOptionId=' + document.getElementById("questionOptionId").value;
    }
    if (questionAnswerId !== "") {
        console.log("QuestionId", questionAnswerId);
        url += '?questionAnswerId=' + document.getElementById("questionAnswerId").value;
    }
    if (recommendationId !== "") {
        console.log("RecommendationId", recommendationId);
        url += '?recommendationId=' + document.getElementById("recommendationId").value;
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
        }
    } else {
        console.log("PUT", url);
        let data = document.getElementById("jsonPayload").value;
        try {
            JSON.parse(data);
            put(url, data);
        } catch (e) {
            console.log(e.toString(), "Incorrect JSON format");
        }
    }
}