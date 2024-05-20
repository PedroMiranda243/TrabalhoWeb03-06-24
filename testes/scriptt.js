

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }
});

function handleCadastro(event) {
    event.preventDefault();
    
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    if (email && password && name) {
        const user = { name, email, password };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.find(user => user.email === email)) {
            alert('Usuário já cadastrado com esse email.');
        } else {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'testes/index.html';
        }
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert('Login realizado com sucesso!');
        // Redirecionar para a página principal ou outra página
        window.location.href = '../html/main-page.html';
    } else {
        alert('Email ou senha incorretos.');
    }
}
