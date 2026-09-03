const forgotPass = document.getElementById('forgot')

forgotPass.addEventListener('click', () => {
    alert('Always check the source of the problem.')
})

document.getElementById('login-btn').addEventListener('click', () => {
    if (document.getElementById('user').value == '/straw' && document.getElementById('pass').value == '/safe-001') {
        window.location.href = "/levels/welcome.html"
    }
})