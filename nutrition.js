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
            let data = response.foods;
            let list = document.getElementById('nutrition-list');
            while(list.firstChild) {
                list.firstChild.remove();
            }
            for(let i=0; i<data.length; i++) {
                console.log(data[i].length);
                let item = data[i];
                
                // wrapper
                let div = document.createElement('DIV');
                div.classList.add('nutrition-item');
                
                // img
                let img = document.createElement('IMG');
                img.src = item.photo.thumb;
                img.alt = item.food_name;
                div.appendChild(img);

                // name
                let name = document.createElement('H3');
                name.textContent = item.food_name;
                div.appendChild(name);
                
                // nutrition facts
                let nf = document.createElement('div');
                nf.classList.add('nutrition-facts');
                let cal = document.createElement('DIV');
                cal.textContent = 'Calories: ' + item.nf_calories;
                let pro = document.createElement('DIV');
                pro.textContent = 'Protien: ' + item.nf_protein;
                let fat = document.createElement('DIV');
                fat.textContent = 'Fats: ' + item.nf_total_fat;
                let carb = document.createElement('DIV');
                carb.textContent = 'Carbs: ' + item.nf_total_carbohydrate;
                nf.appendChild(cal);
                nf.appendChild(pro);
                nf.appendChild(fat);
                nf.appendChild(carb);
                div.appendChild(nf);

                list.appendChild(div);
            }
        }
    });
});