document.getElementById("button-login").addEventListener("click", login);

var message = document.getElementById("message");
var remember = document.getElementById("remember");

firstLoad();

function getLoginInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = {
        username: username,
        password: password
    }
    return user;
}

function login() {
    var user = getLoginInfo();
    var check_info = checkValidInput(user.username, user.password); 
    if (!check_info) {
        return;
    }

    if (doLogin()) {
        doRememberMe();
        // go to dashboard
        window.location.href = "../index.html";
    } else {
        message.innerText = "Sai tài khoản hoặc mật khẩu";
    }
}

function checkValidInput(username, password) {
    if (username == "") {
        message.innerText = "Vui lòng nhập tên đăng nhập";
        return false;
    }
    else if (password == "") {
        message.innerText = "Vui lòng nhập mật khẩu";
        return false;
    }
    else {
        message.innerText = "";
        return true;
    }
}

function doLogin() {
    // Check username and password on database
    return false;
}

function doRememberMe() {
    if (remember.checked) {
        var user = getLoginInfo();
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
    }
    else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
}

function firstLoad() {
    var _username = localStorage.getItem("username");
    var _password = localStorage.getItem("password");
    remember.checked = true;

    if (_username != null && _password != null) {
        username.value = _username;
        password.value = _password;
    }
}