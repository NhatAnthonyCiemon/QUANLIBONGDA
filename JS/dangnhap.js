document.getElementById("login").addEventListener("click", login);

const message = document.getElementById("message");
const remember = document.getElementById("remember");

firstLoad();

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
        if (remember.checked) {
            doRememberMe();
        }
        else {
            doNotRememberMe();
        }

        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
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

function firstLoad() 
{
    var username = getCookie("username");
    var password = getCookie("password");
    var remember = getCookie("remember");

    if (remember === "true") {
        document.getElementById("username").value = username;
        document.getElementById("password").value = password;
        document.getElementById("remember").checked = true;
    }
}

function doRememberMe() {
    setCookies("username", document.getElementById("username").value, 86400);
    setCookies("password", document.getElementById("password").value, 86400);
    setCookies("remember", "true", 86400);
}

function doNotRememberMe() {
    setCookies("username", "", -1);
    setCookies("password", "", -1);
    setCookies("remember", "false", -1);
}

function setCookies(name, value, maxAge) {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/`;
}

function getCookie(name) {
    const cookieArray = document.cookie.split("; ");
    for (let cookie of cookieArray) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return "";
}
