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
    let key = document.getElementById("key").value;
    let id = document.getElementById("id").value;
    let questionId = document.getElementById("questionId").value;
    let questionOptionId = document.getElementById("questionOptionId").value;
    let questionAnswerId = document.getElementById("questionAnswerId").value;
    let recommendationId = document.getElementById("recommendationId").value;

    if (key !== "") {
        console.log("Key", key);
        url += '?key=' + key;
    }
    if (id !== "") {
        console.log("ID", id);
        url += '?id=' + id;
    }
    if (questionId !== "") {
        console.log("QuestionId", questionId);
        url += '?questionId=' + questionId;
    }
    if (questionOptionId !== "") {
        console.log("QuestionId", questionOptionId);
        url += '?questionOptionId=' + questionOptionId;
    }
    if (questionAnswerId !== "") {
        console.log("QuestionId", questionAnswerId);
        url += '?questionAnswerId=' + questionAnswerId;
    }
    if (recommendationId !== "") {
        console.log("RecommendationId", recommendationId);
        url += '?recommendationId=' + recommendationId;
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