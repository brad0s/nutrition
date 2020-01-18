const APP_ID = config.APP_ID;
const APP_KEY = config.APP_KEY;

const searchButton = document.getElementById('search-button');
const searchBox = document.getElementById('input');
const flipButton = document.getElementsByClassName('flip-btn');
const flip2Button = document.getElementsByClassName('flip2-btn');

for(let i=0; i<flipButton.length; i++) {
    flipButton[i].addEventListener('click', flipItem);
}

for(let i=0;i<flip2Button.length; i++) {
    flip2Button[i].addEventListener('click', flipItemBack);
}

function flipItem() {
    let side1 = this.parentNode;
    let side2 = side1.nextElementSibling;
    let item = side1.parentNode;
    item.classList.add('flipped');
    setTimeout(() => {
        side1.style.display = 'none';
        side2.style.display = 'block';
    }, 300);
    side2.classList.add('active');

};

function flipItemBack() {
    let side2 = this.parentNode;
    let side1 = side2.previousElementSibling;
    let item = side1.parentNode;
    item.classList.remove('flipped');
    setTimeout(() => {
        side2.style.display = 'none';
        side1.style.display = 'block';
    }, 300);
    
}

searchBox.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        search();
    }
});

searchButton.addEventListener('click', search);

    function search() {
    let params = searchBox.value;
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
            "timezone": "US/Pacific",
        },
        error:function (textstatus){ 
            console.log(textstatus); 
            searchBox.classList.add('bad-req');
            let list = document.getElementById('nutrition-list');
            while(list.firstChild) {
                list.firstChild.remove();
            }
            let p = document.createElement('P');
            p.textContent = textstatus.status + textstatus.statusText;
            let pp = document.createElement('P');
            pp.textContent += textstatus.responseJSON.message;
            list.appendChild(p);
            list.appendChild(pp);
            
        },
        success: function(response,text,xhr) {
            console.log(response); console.log(text); console.log(xhr); 
            searchBox.classList.remove('bad-req');
            let data = response.foods;
            let list = document.getElementById('nutrition-list');
            while(list.firstChild) {
                list.firstChild.remove();
            }
            for(let i=0; i<data.length; i++) {
                let item = data[i];
                
                // item
                let div = document.createElement('DIV');
                div.classList.add('nutrition-item');
                // side 1
                let side1 = document.createElement('DIV');
                side1.classList.add('side1');
                //svg
                let svg = document.createElement('SPAN');
                svg.addEventListener('click', flipItem);
                svg.classList.add('flip-btn');
                svg.classList.add('flip');
                svg.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="-1 -1 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg>';
                side1.appendChild(svg);
                
                // img
                let img = document.createElement('IMG');
                img.src = item.photo.thumb;
                img.alt = item.food_name;
                side1.appendChild(img);

                // name
                let name = document.createElement('H3');
                name.textContent = item.food_name;
                side1.appendChild(name);

                //servings
                let serving = document.createElement('DIV');
                serving.classList.add('serving-info');
                serving.textContent = "Serving:";
                let servQty = document.createElement('DIV');
                servQty.textContent = "Qty: " + item.serving_qty;
                serving.appendChild(servQty);
                let servUnit = document.createElement('DIV');
                servUnit.textContent = "Unit: " + item.serving_unit;
                serving.appendChild(servUnit);
                let servWtg = document.createElement('DIV');
                servWtg.textContent = "Wgt(g): " + item.serving_weight_grams;
                serving.appendChild(servWtg);
                side1.appendChild(serving);

                //nutrition facts
                let nf = document.createElement('DIV');
                nf.classList.add('nutrition-facts');
                let table = document.createElement('Table');

                let nfTable = {};
                nfTable['Calories'] = item.nf_calories;
                nfTable['Protein'] = item.nf_protein;
                nfTable['Fat'] = item.nf_total_fat;
                nfTable['Carbs'] = item.nf_total_carbohydrate;
                nfTable['Sugar'] = item.nf_sugars;

                for(let fact in nfTable) {
                    let tr = document.createElement('TR');
                    let tdKey = document.createElement('TD');
                    tdKey.textContent = fact;
                    tr.appendChild(tdKey);
                    let tdVal = document.createElement('TD');
                    tdVal.textContent = nfTable[fact] + 'g';
                    tr.appendChild(tdVal);
                    table.appendChild(tr);
                }
                nf.appendChild(table);
                side1.appendChild(nf);
                div.appendChild(side1);

                //side2
                let side2 = document.createElement('DIV');
                side2.classList.add('side2');

                //svg
                let svg2 = document.createElement('SPAN');
                svg2.addEventListener('click', flipItemBack);
                svg2.classList.add('flip2-btn');
                svg2.classList.add('flip');
                svg2.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="-1 -1 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z"/><path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"/></svg>';
                side2.appendChild(svg2);

                // Full nutrients
                let fnTable = {};
                console.log(item.full_nutrients);
                let fnTbl = document.createElement('TABLE');
                for(let i=0; i<item.full_nutrients.length; i++) {
                    console.log(item.full_nutrients[i]);
                    let tr = document.createElement('TR');
                    if(nutrIdData[item.full_nutrients[i].attr_id] !== undefined) {
                        let tdKey = document.createElement('TD');
                        tdKey.textContent = nutrIdData[item.full_nutrients[i].attr_id];
                        tr.appendChild(tdKey);
                        let tdVal = document.createElement('TD');
                        tdVal.textContent = Math.round( item.full_nutrients[i].value * 10) / 10;
                        tr.appendChild(tdVal);
                        fnTbl.appendChild(tr);
                    }
                }
                side2.appendChild(fnTbl)
                div.appendChild(side2);
                list.appendChild(div);
            }
        }
    });
};


const nutrIdData = {};
nutrIdData[203] =	'Protein';
nutrIdData[204] = 'Total lipid (fat)';
nutrIdData[205] = 'Carbohydrate, by difference';
nutrIdData[209] = 'Starch';
nutrIdData[210] = 'Sucrose';
nutrIdData[211] = 'Glucose (dextrose)';
nutrIdData[212] = 'Fructose';
nutrIdData[213] = 'Lactose';
nutrIdData[214] = 'Maltose';
nutrIdData[221] = 'Alcohol, ethyl';
nutrIdData[255] = 'Water';
nutrIdData[257] = 'Adjusted Protein';
nutrIdData[262] = 'Caffeine';
nutrIdData[269] = 'Sugars, total';
nutrIdData[287] = 'Galactose';
nutrIdData[291] = 'Fiber, total dietary';
nutrIdData[301] = 'Calcium, Ca';
nutrIdData[303] = 'Iron, Fe';
nutrIdData[304] = 'Magnesium, Mg';
nutrIdData[305] = 'Phosphorus, P';
nutrIdData[306] = 'Potassium, K';
nutrIdData[307] = 'Sodium, Na';
nutrIdData[309] = 'Zinc, Zn';
nutrIdData[312] = 'Copper, Cu';
nutrIdData[313] = 'Fluoride, F';
nutrIdData[315] = 'Manganese, Mn';
nutrIdData[317] = 'Selenium, Se';
nutrIdData[318] = 'Vitamin A, IU';
nutrIdData[319] = 'Retinol';
nutrIdData[323] = 'Vitamin E (alpha-tocopherol)';
nutrIdData[324] = 'Vitamin D';
nutrIdData[325] = 'Vitamin D2 (ergocalciferol)';
nutrIdData[326] = 'Vitamin D3 (cholecalciferol)';
nutrIdData[328] = 'Vitamin D (D2 + D3)';
nutrIdData[401] = 'Vitamin C, total ascorbic acid';
nutrIdData[404] = 'Thiamin';
nutrIdData[405] = 'Riboflavin';
nutrIdData[406] = 'Niacin';
nutrIdData[410] = 'Pantothenic acid';
nutrIdData[415] = 'Vitamin B-6';
nutrIdData[417] = 'Folate, total';
nutrIdData[418] = 'Vitamin B-12';
nutrIdData[421] = 'Choline, total';
nutrIdData[430] = 'Vitamin K (phylloquinone)';
nutrIdData[431] = 'Folic acid';
nutrIdData[432] = 'Folate, food';
nutrIdData[435] = 'Folate, DFE';
nutrIdData[539] = 'Sugars, added';
nutrIdData[573] = 'Vitamin E, added';
nutrIdData[578] = 'Vitamin B-12, added';
nutrIdData[601] = 'Cholesterol';
nutrIdData[605] = 'Fatty acids, total trans';
nutrIdData[606] = 'Fatty acids, total saturated';
nutrIdData[645] = 'Fatty acids, total monounsaturated';
nutrIdData[646] = 'Fatty acids, total polyunsaturated';
nutrIdData[693] = 'Fatty acids, total trans-monoenoic';
nutrIdData[695] = 'Fatty acids, total trans-polyenoic';