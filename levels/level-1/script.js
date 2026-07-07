const lines = [
    { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 200 },
    { text: "Copyright (C) 1984-1997, Award Software, Inc.", delay: 800 },
    { text: "", delay: 400 },
    { text: "Intel Pentium II 266MHz", delay: 300 },
    { text: "Memory Test: 65536K OK", delay: 1200 },
    { text: "", delay: 300 },
    { text: "Detecting Primary Master... ST3204820A", delay: 1500 },
    { text: "Detecting Primary Slave... None", delay: 400 },
    { text: "", delay: 200 },
    { text: "Loading Windows 95...", delay: 1000 },
    { text: "SYSTEM.INI loaded", delay: 300 },
    { text: "WIN.INI loaded", delay: 300 },
    { text: "Initializing device drivers...", delay: 800 },
    { text: "░▒▓█ ERR0R: C0RRUPT █▓▒░ /safe-mode ░▒▓█ F1LE M1SS1NG █▓▒░", delay: 1500 },
    { text: "Retrying...", delay: 600 },
    { text: "Retrying...", delay: 800 },
    { text: "FATAL ERROR: System cannot continue.", delay: 1000 },
]

let screen = document.getElementById('screen')
let time = 0
lines.forEach((line, index) => {
    time += line.delay
    setTimeout(() => {
        if (line.text.includes('░')) {
            screen.innerHTML += `<span class="corrupt">${line.text}</span> \n`
        }else{

            screen.innerHTML += line.text + '\n'
        }
    }, time)
})