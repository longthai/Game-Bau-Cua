// Quay
let intervalId;
const resetBtn = document.getElementById('btn-reset');
const spinBtn = document.getElementById('btn-spin');

const spin = () => {
    let spinRes = [];
    document.getElementById('message').innerHTML = "";
    resetBtn.disabled = true;
    spinBtn.disabled = true;

    clearInterval(intervalId);

    if (betRes.length < 3) {
        document.getElementById('message').innerHTML = "<h2>Vui lòng đặt đủ ô trước khi quay</h2>"
        spinBtn.disabled = false;
    } else {
        intervalId = setInterval( () => {
            const numOfItem = 3;
            const itemImages = document.getElementById('item-img');
            const images = [];
            const values = [];

            for (let i = 0; i < numOfItem; i++) {
                const value = Math.floor(Math.random()*3) + 1;
                values.push(value);
                images.push(`<img src="./images/${value}.png" class="img-count">`)
            }
            spinRes = values;
            itemImages.innerHTML=images.join('')
        }, 100);

        setTimeout(() => {
            console.log(`Kết quả quay: ${spinRes}`);
            console.log(`Dự đoán của bạn: ${betRes}`);

            clearInterval(intervalId);
            compareResult(spinRes, betRes);
            resetBtn.disabled = false;
            spinBtn.disabled = false;
        }, 100);
    }
}

//Đếm 
const btns = [...document.querySelectorAll('button.btn-click-count')],
btnsClicksCountArr = [btns.length];
let betRes = [];

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
             betRes.push(betItem);
         } else {
             el.querySelector('div').textContent = btnsClicksCountArr[i];
         }
     });
 }

//  Reset cửa đặt
const resetCount = () => {
    betRes=[]
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
    
    let s1 = a1.slice().sort();
    let s2 = a2.slice().sort();

    if (JSON.stringify(s1) == JSON.stringify(s2)) {
        msg = 'Bạn đã thắng !!!'
    } else {
        msg = 'Chúc may mắn lần sau!'
    }
    
    console.log(msg)
    document.getElementById('message').innerHTML = `<h2>${msg}</h2>`
}



