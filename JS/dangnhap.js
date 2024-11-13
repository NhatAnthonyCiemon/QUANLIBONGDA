document.getElementById("login").addEventListener("click", login);

const message = document.getElementById("message");

function getLoginInfo() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = {
        username: username,
        password: password,
    };
    return user;
}

async function login() {
    var user = getLoginInfo();
    var check_info = checkValidInput(user.username, user.password);
    if (!check_info) {
        return;
    }
    let true_user = await doLogin();
    console.log(true_user);
    if (true_user) {
        doRememberMe();
        window.location.href = "../index.html";
    } else {
        message.innerText = "Sai tài khoản hoặc mật khẩu";
    }
}

function checkValidInput(username, password) {
    if (username == "") {
        message.innerText = "Vui lòng nhập tên đăng nhập";
        return false;
    } else if (password == "") {
        message.innerText = "Vui lòng nhập mật khẩu";
        return false;
    } else {
        message.innerText = "";
        return true;
    }
}

async function doLogin() {
    try {
        const response = await fetch("http://localhost:3000/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getLoginInfo()),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        } else {
            throw new Error("Login failure");
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

function doRememberMe() {
    var user = getLoginInfo();
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password);
}

function firstLoad() {
    var _username = localStorage.getItem("username");
    var _password = localStorage.getItem("password");
    if (_username != null && _password != null) {
        return { username: _username, password: _password };
    }
    return null;
}
