const btn = document.getElementById("start-btn");

const img = btn.querySelector('img');

btn.addEventListener('click', () => {
    if (img.src.includes('http://127.0.0.1:5500/assets/images/Start.png')) {
        img.src = './assets/images/Start-pressed.png'
    } else {
        img.src = 'http://127.0.0.1:5500/assets/images/Start.png'
    }
});

function updateTime() {
    let currentTime = new Date().toLocaleTimeString()

    let timeText = document.querySelector("#date-time")

    timeText.innerHTML = currentTime
}

setInterval(updateTime, 1000);






let win = document.getElementById('window')

let dragging = false;
let offsetX = 0;
let offsetY = 0;

win.addEventListener('mousedown', (e) => {
    dragging = true;

    offsetX = e.clientX - win.offsetLeft
    offsetY = e.clientY - win.offsetTop
});

document.addEventListener('mousemove', (e) => {
    if (dragging === false) {
        return
    } else {
        win.style.left = (e.clientX - offsetX) + 'px'
        win.style.top = (e.clientY - offsetY) + 'px'
        
    }
})

document.addEventListener('mouseup', () => {
    dragging = false
})


