const forgotPass = document.getElementById('forgot')

forgotPass.addEventListener('click', () => {
    alert('Always check the source of the problem.')
})

document.getElementById('login-btn').addEventListener('click', () => {
    if (document.getElementById('user').value == 'rext0r' && document.getElementById('pass').value == '/safe-001') {
        window.location.href = "http://127.0.0.1:3000/levels/level-1.html?vscode-livepreview=true"
    }
})