document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }

    console.log('Usuários cadastrados:', loadUsers());
});

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function handleCadastro(event) {
    event.preventDefault();
    
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    if (email && password && name) {
        const users = loadUsers();
        
        if (users.find(user => user.email === email)) {
            alert('Usuário já cadastrado com esse email.');
        } else {
            const newUser = { name, email, password };
            users.push(newUser);
            saveUsers(users);
            alert('Usuário cadastrado com sucesso!');
            console.log('Usuário cadastrado:', newUser);
            console.log('Usuários cadastrados:', users);
            window.location.href = 'index.html';
        }
    } else {
        alert('Todos os campos são obrigatórios.');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    const users = loadUsers();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert('Login realizado com sucesso!');
        console.log('Usuário logado:', user);
        window.location.href = '../html/main-page.html';
    } else {
        alert('Email ou senha incorretos.');
    }
}

function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "/imgs/icons8-menu.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "/imgs/icons8-close.svg";
    }
} 
//para usar no console 
function clearUsers() {
    localStorage.removeItem('users');
    console.log('Todos os usuários foram removidos do localStorage.');
    renderUsers();  // Atualiza a lista de usuários na interface, se aplicável
}
