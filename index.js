// Quay
const spin = async () => {
    const numOfItem = 3;
    const itemImages = document.getElementById('item-img');
    const images = [];
    const values = [];

    for (let i = 0; i < numOfItem; i++) {
        const value = Math.floor(Math.random()*6) + 1;
        values.push(value);
        images.push(`<img src="./images/${value}.png" class="img-count">`)
    }
    itemImages.innerHTML=images.join('')

    let values1 = values.slice().sort();
    let betResult1 = betResult.slice().sort();
    
    console.log(`Kết quả quay: ${values}`);
    console.log(`Dự đoán của bạn: ${betResult}`);

    compareResult(values1, betResult1);
}

//Đếm 
const btns = [...document.querySelectorAll('button.btn-click-count')],
btnsClicksCountArr = [btns.length];
let betResult = [];

 for (const [i, el] of btns.entries()) {
     btnsClicksCountArr[i] = 0;
     el.querySelector('div').textContent = btnsClicksCountArr[i];

     el.addEventListener('click', () => {
         const betItem = Number(el.value);
         sum = 0;
         for (let j = 0; j < btnsClicksCountArr.length; j++) {
             sum += btnsClicksCountArr[j];
         }

         if (btnsClicksCountArr[i] < 3 && sum < 3) {
             el.querySelector('div').textContent = ++btnsClicksCountArr[i]
             betResult.push(betItem);
         } else {
             el.querySelector('div').textContent = btnsClicksCountArr[i];
         }
     });
 }

//  Reset cửa đặt
const resetCount = () => {
    betResult=[]
    //window.location.reload();
    btns.forEach((el, i) => {
         btnsClicksCountArr[i] = 0;
         document.getElementById('message').innerHTML = ""
         el.querySelector('div').textContent = btnsClicksCountArr[i]

     })
}

// So sánh cửa đặt và kết quả quay
const compareResult = (a1, a2) => {
    let msg = "";

    if (a1.length !== a2.length) {
        msg = "Vui lòng đặt đủ ô trước khi quay"
    } else {
        if (JSON.stringify(a1) == JSON.stringify(a2)) {
            msg = 'Bạn đã thắng !!!'
        } else {
            msg = 'Chúc may mắn lần sau!'
        }
    }
    
    console.log(msg)
    document.getElementById('message').innerHTML = `<h2>${msg}</h2>`
}



