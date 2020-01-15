const APP_ID = config.APP_ID;
const APP_KEY = config.APP_KEY;

const searchButton = document.getElementById('search-button');
const inputBox = document.getElementById('input');

searchButton.addEventListener('click', function() {
    let params = inputBox.value;
    console.log(params);
    // $.ajax({
    //     'async': true,
    //     'crossDomain': true,
    //     'url': 'https://api.nutritionix.com/v1_1/search/',
    //     'method': 'POST',
    //     'headers': {
    //     'Content-Type':'application/x-www-form-urlencoded'
    //     },
    //     'processData': true,
    //     "data": {
    //     "query": "apple",
    //     "appId": "",
    //     "appKey": "",
    //     }, 
    //     success: function(response,text,xhr) {
    //         console.log(response); console.log(text); console.log(xhr); 
    //     }, 
    //     error:function (textstatus){ 
    //         console.log(textstatus); 
    //     } 
    // });
    $.ajax({
        'async': true,
        'crossDomain': true,
        'url': 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        'method': 'POST',
        'headers': {
        'x-app-id': APP_ID,
        'x-app-key': APP_KEY,
        'x-remote-user-id': '0',
        'Content-Type':'application/x-www-form-urlencoded'
        },
        'processData': true,
        "data": {
        "query": params,
        
        },
        error:function (textstatus){ 
            console.log(textstatus); 
        },
        success: function(response,text,xhr) {
            console.log(response); console.log(text); console.log(xhr); 
            console.log(response.foods);
            console.log(response.foods.length);
            let data = response.foods;
            for(let i=0; i<data.length; i++) {
                console.log(data[i].length);
                let div = document.createElement('DIV');
                div.classList.add('nutrition-item');
                div.textContent = data[i].food_name;
                document.getElementById('nutrition-list').appendChild(div);
            }
        }
    });
});