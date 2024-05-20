function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "";
    }
}
//salvar os usuários no localstorage 
function saveUsers(users) {
        localStorage.setItem('users',JSON.stringify(users));
}
function loadUsers(){
    return JSON.parse(localStorage.getItem('users')) || [];
}
//add um user
function addUser(email,password){
    const users = loadUsers();
    users.push({email,password});
    saveUsers(users);
    renderUsers();
}
function editUser(index) {
    const users = loadUsers();
    const { name, email } = users[index];
    const newName = prompt('Novo nome:', name);
    const newEmail = prompt('Novo email:', email);
    if (newName !== null && newEmail !== null) {
        users[index] = { name: newName, email: newEmail };
        saveUsers(users);
        renderUsers();
    }
}
function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    const users = loadUsers();
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.name} (${user.email})</span>
            <button onclick="editUser(${index})">Editar</button>
            <button onclick="deleteUser(${index})">Excluir</button>
        `;
        userList.appendChild(li);
    });
}
//delete user
function deleteUser(index){
    const users = loadUsers();
    users.splice(index,1);
    saveUsers(users);
    renderUsers();
}
//pegar informações do form
document.getElementById('login-form').addEventListener('submit',function(event){
    event.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    addUser(email,password);
    console.log(email,password);
    this.reset();
});
renderUsers();