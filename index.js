// Quay
let intervalId;
const resetBtn = document.getElementById('btn-reset');
const spinBtn = document.getElementById('btn-spin');

const spin = () => {
    let spinRes = [];
    document.getElementById('message').innerHTML = "";

    //Disable 2 nút quay và reset khi đang quay
    resetBtn.disabled = true;
    spinBtn.disabled = true;

    clearInterval(intervalId);
    //Kiểm tra xem người dùng đã đặt cửa chưa.
    if (betRes.length < 3) {
        document.getElementById('message').innerHTML = "<h2>Vui lòng đặt đủ ô trước khi quay</h2>"
        resetBtn.disabled = false;
        spinBtn.disabled = false;
    } else {
        intervalId = setInterval( () => {
            const numOfItem = 3;
            const itemImages = document.getElementById('item-img');
            const images = [];
            const values = [];

            // Tạo một vòng loop để chọn random item và item.value.
            // display ảnh vào giao diện.
            // value vào spinRes để so sánh với betRes.
            // Hiệu ứng xoay tôm cua cá, mỗi nháy 0.1s.
            for (let i = 0; i < numOfItem; i++) {
                const value = Math.floor(Math.random()*6) + 1;
                values.push(value);
                images.push(`<img src="./images/${value}.png" class="img-count">`)
            }
            spinRes = values;
            itemImages.innerHTML=images.join('')
        }, 100);

        //Hiện kết quả spin, tin nhắn, so sánh sau 5s 
        setTimeout(() => {
            console.log(`Kết quả quay: ${spinRes}`);
            console.log(`Dự đoán của bạn: ${betRes}`);

            clearInterval(intervalId);
            compareResult(spinRes, betRes);
            resetBtn.disabled = false;
            spinBtn.disabled = false;
        }, 5000);
    }
}

//Đếm
const btns = [...document.querySelectorAll('button.btn-click-count')],
btnsClicksCountArr = [btns.length];
let betRes = [];

//el = button hiện tại trong array, i là index trong array đó
for (const [i, el] of btns.entries()) {
    //reset bộ đếm ban đầu của tất cả các button về 0
    btnsClicksCountArr[i] = 0;
    el.querySelector('div').textContent = btnsClicksCountArr[i];

    //click event handler cho các button
    el.addEventListener('click', () => {
        const betItem = Number(el.value);
        let sum = 0;
        //sum là tổng số lần người chơi click vào button, dùng để kiểm tra điều kiện
        for (let j = 0; j < btnsClicksCountArr.length; j++) {
            sum += btnsClicksCountArr[j];
        }

        //kiểm tra điều kiện mỗi button chỉ được click tối đa 3 lần, và tổng số các button click tối đá là 3. 
        //Thỏa mãn thì tính +1 lần click.
        //Thêm cửa đặt của người chơi vào arr betRes với value từ button.btn-click-count
        if (btnsClicksCountArr[i] < 3 && sum < 3) {
            el.querySelector('div').textContent = ++btnsClicksCountArr[i]
            betRes.push(betItem);
        } else {
            el.querySelector('div').textContent = btnsClicksCountArr[i];
        }
    });
}

//  Reset cửa đặt, bộ đếm và tin nhắn về rỗng
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



