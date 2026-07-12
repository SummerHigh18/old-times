const btn = document.getElementById("start-btn");

const img = btn.querySelector('img');

btn.addEventListener('click', () => {
    if (img.src.includes('http://127.0.0.1:3000/assets/images/Start-pressed.png')) {
        img.src = 'http://127.0.0.1:3000/assets/images/Start.png'
    } else {
        img.src = 'http://127.0.0.1:3000/assets/images/Start-pressed.png'
    }
});

function updateTime() {
    let currentTime = new Date().toLocaleTimeString()

    let timeText = document.querySelector("#date-time")

    timeText.innerHTML = currentTime
}

setInterval(updateTime, 1000);



let windows = document.querySelectorAll('.window')


windows.forEach(window => {
    makeDraggable(window)
})


function makeDraggable(window) {
    const titleBar = window.querySelector('.titlebar')
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener('mousedown', (e) => {
        dragging = true

        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;

        
    })
    
    document.addEventListener('mousemove', (e) => {
        if (!dragging) {
            return;
        }

        window.style.left = (e.clientX - offsetX) + 'px'
        window.style.top = (e.clientY - offsetY) + 'px'
    })

    document.addEventListener('mouseup', () => {
        dragging = false;
    })

}





const minimizeBtns = document.querySelectorAll('.minimize-btn');
const maximizeBtns = document.querySelectorAll('.maximize-btn');
const closeBtns = document.querySelectorAll('.close-btn');


minimizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let win = btn.closest('.window')
        win.style.display = 'none'
    })

})
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let win = btn.closest('.window')
        win.style.display = 'none'
    })
    
})


let isMaximized = false;
let original = {}


maximizeBtns.forEach(btn => {
    let win = btn.closest('.window')
    
    btn.addEventListener('click', () => {
        if(!isMaximized) {
    
            original = {
                width: '320px',
                height: 'auto',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
    
            }
            win.style.width = '100%'
            win.style.height = '94%'
            win.style.top = '0'
            win.style.left = '0'
            win.style.transform = 'none'
            isMaximized = true
        } else {
            win.style.width = original.width
            win.style.height = original.height
            win.style.top = original.top
            win.style.left = original.left
            win.style.transform = original.transform
    
            isMaximized = false
        }
    })
})



let apps = document.querySelectorAll('.app')

let selectedApp = null;
// apps.forEach(app => {
//     app.addEventListener('click', (e) => {
//         e.stopPropagation();

//         if(selectedApp === app) {
//             selectedApp.classList.remove('selected')
//             selectedApp = null;
//             return;
//         }


//         if(selectedApp && selectedApp != app) {
//             selectedApp.classList.remove('selected')
//         }
        
//         app.classList.add('selected')
//         selectedApp = app;
// })
// })

document.addEventListener('click', (e) => {
    const app = e.target.closest('.app')
    if (!app) {
        return
    }
    if(selectedApp === app) {
            selectedApp.classList.remove('selected')
            selectedApp = null;
            return;
        }


        if(selectedApp && selectedApp != app) {
            selectedApp.classList.remove('selected')
        }
        
        app.classList.add('selected');
        selectedApp = app;

})

document.querySelector('body').addEventListener('click', () => {
    apps.forEach(app => {
        app.classList.remove('selected');
    })
})


apps.forEach(app => {
    app.addEventListener('dblclick', () => {
        let appName= app.dataset.app
        if (appName == undefined) {
            return
        }

        let window = document.getElementById(`${appName}-window`)
        window.style.display = 'block'
    })
})


const rightClickContainer = document.getElementById('right-click');

// let isRightClick = false;

// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();

//     isRightClick = true
//     rightClickContainer.style.display = 'block'
//     rightClickContainer.style.top = `${e.clientY}px`
//     rightClickContainer.style.left = `${e.clientX}px`
// })

document.addEventListener('click', (e) => {
    rightClickContainer.style.display = 'none';
})


const binContainer = document.querySelector('.bin.file-row');
const docContainer = document.querySelector('.doc.file-row');

document.querySelector('.bin #txt-file').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickContainer.style.display = 'block';
    rightClickContainer.style.top = `${e.clientY}px`;
    rightClickContainer.style.left = `${e.clientX}px`;

})

document.getElementById('restore').addEventListener('click', () => {
    docContainer.innerHTML = binContainer.innerHTML
    binContainer.innerHTML = '<div class="app empty-row"><p class="icon-name empty-text">Empty</p></div>'

    docContainer.querySelector('.app').classList.add('text-document');
})

// if (document.querySelector('.text-document') !== null) {

//     document.querySelector('.text-document').addEventListener('dblclick', (e) => {
//             const noteWindow = document.getElementById('bin-window').cloneNode(true);
    
//             noteWindow.removeAttribute('id');
//             noteWindow.querySelector('.titlebar').querySelector('p').innerText = 'data.txt'
    
//             noteWindow.querySelector('.window-content').remove();

//             document.querySelector('body').appendChild(noteWindow)
    
            
//     })
// }


docContainer.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('.text-document')) {
        doc = e.target
    } else {
        doc = e.target.closest('.text-document'); 
    }
    if (!doc) {
        return
    }

    let noteWindow = document.getElementById('bin-window').cloneNode(true);

    noteWindow.removeAttribute('id');
    noteWindow.querySelector('.titlebar').querySelector('p').textContent = 'data.txt';
    noteWindow.querySelector('.window-content').remove();

    document.querySelector('body').appendChild(noteWindow);
    makeDraggable(noteWindow)

})