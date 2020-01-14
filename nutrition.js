const APP_ID = config.APP_ID;
const APP_KEY = config.APP_KEY;

const searchButton = $('#search-button');
const inputBox = $('#input');

searchButton.click(function() {
    console.log('click');
    let params = inputBox.val();
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
        "query": "apple",
        
        }, 
        success: function(response,text,xhr) {
            console.log(response); console.log(text); console.log(xhr); 
        }, 
        error:function (textstatus){ 
            console.log(textstatus); 
        } 
    });
});