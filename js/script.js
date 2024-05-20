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
//salvar no localstorage

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
//-> essa função salva a lista de usuários no localStorage
// do navegador, convertendo-a em uma string JSON.
}
function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
// essa função carrega a lista de usuários do localStorage, 
//convertendo-a de volta em um objeto JavaScript (array). 
//Se não houver usuários salvos, ela retorna um array vazio.
}
//pegar os valores de cadastro de usuário
function handleCadastro(event) {
    //prevenir default do form
    event.preventDefault();
    
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    //verificação para saber se o usuário já foi cadastrado
    if (email && password && name) {
        const users = loadUsers();
        
        if (users.find(user => user.email === email)) {
            alert('Usuário já cadastrado com esse email.');
            //caso nao esteja cadastrado, cadastrar -> 
        } else {
            const newUser = { name, email, password };

            //coloca no final da lista de users
            users.push(newUser);
            saveUsers(users);

            //verificações

            alert('Usuário cadastrado com sucesso!');
            console.log('Usuário cadastrado:', newUser);
            console.log('Usuários cadastrados:', users);
            window.location.href = 'loginpage.html';
        }

    } else {
        alert('Todos os campos são obrigatórios.');
    }
}

//praticamente mesma coisa para o login 
const failedAttempts = {};

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    if (!attemptLogin(email)) {
        return;
    }

    const users = loadUsers();
    //se encontrar o usuário, efetuar login
    const user = users.find(user => user.email === email && user.password === password);
    
    //se user nao for undefined (pois a função find retorna o objeto user encontrado 
    //ou undefined)->login efetuado
    if (user) {
        alert('Login realizado com sucesso!');
        console.log('Usuário logado:', user);
        window.location.href = '../html/main-page.html';
    //caso user não seja encontrado -> error!
    //tratativa para tentativas excessivas de login erradas
    } else {
        if(!failedAttempts[email]){
            failedAttempts[email] = {count:0,timeout:null};
        }
        failedAttempts[email].count+=1;

        if(failedAttempts[email].count>=3){
            failedAttempts[email].timeout = Date.now() + 120000;
            alert('Muitas tentativas não sucedidas. Por favor, tente novamente após 2min')
        }
        alert('Email ou senha incorretos.');
    }
}
function attemptLogin(email){
    if(failedAttempts[email] && failedAttempts[email].timeout){
        const now  = Date.now();
        if(now < failedAttempts[email].timeout){
            const remainingTime =  Math.ceil((failedAttempts[email].timeout - now)/1000);
            alert(`Por favor, aguarde ${remainingTime} segundos antes de tentar novamente`)
            return false;
        }
        else{
            failedAttempts[email].count = 0; // resetar count depois do timeout
            failedAttempts[email].timeout = null;
        }
    }
    return true;
}
//para responsividade do menu-nav-bar
function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../imgs/icons8-menu.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../imgs/icons8-excluir-50.png";
    }
} 
//para usar no console 
function clearUsers() {
    localStorage.removeItem('users');
    console.log('Todos os usuários foram removidos do localStorage.');
    renderUsers();  // Atualiza a lista de usuários na interface, se aplicável
}
