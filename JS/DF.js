function firstLoad() {
    var _username = localStorage.getItem("username");
    console.log(_username);

    var _password = localStorage.getItem("password");
    console.log(_password);
    if (_username != null && _password != null) {
        return { username: _username, password: _password };
    }
    return { username: "", password: "" };
}
let pageTitle = document.title;
let header = document.querySelector("header");
let path = "/page";
let path_index = "/index";
let path_img = "/assets";
if (pageTitle === "Trang chủ") {
    path_index = ".";
    path = "./page";
    path_img = ".";
} else {
    path = ".";
    path_index = "..";
    path_img = "..";
}
let headeInner = `<img src="${path_img}/assets/Logo.svg" alt="Logo">
            <ul class="header__links">
                <li><a class="header__link" href="${path_index}/index.html">TRANG CHỦ</a></li>
                <li><a id="dangki" class="header__link" href="${path}/Dangki.html">ĐĂNG KÝ</a></li>
                <li><a class="header__link" href="${path}/Lichthidau.html">LỊCH THI ĐẤU</a></li>
                <li><a class="header__link" href="${path}/Tracuu.html">TRA CỨU</a></li>
                <li><a class="header__link" href="${path}/Group.html">VỀ CHÚNG TÔI</a></li>
            </ul>
        <div class="header__wrapper">
            <p class="header__btn-desc">CHỈ DÀNH CHO ADMIN</p>
            <button class="header__btn">Đăng nhập</button>
        </div>`;
header.innerHTML = headeInner;

let headerLinks = document.querySelectorAll(".header__link");
headerLinks.forEach((link) => {
    if (link.innerText.toLowerCase() === pageTitle.toLowerCase()) {
        link.classList.add("header__link-active");
    }
});

if (pageTitle === "Đăng nhập") {
    headerWrapper = document.querySelector(".header__wrapper");
    headerWrapper.remove();
}
let headerBtn = document.querySelector(".header__btn");
if (headerBtn) {
    headerBtn.addEventListener("click", () => {
        window.location.href = `${path}/Dangnhap.html`;
    });
}

let footer = document.querySelector("footer");
let footerInner = `<div class="footer__main">
            <img src="${path_img}/assets/Logo.svg" alt="Logo">
            <div class="footer__pages">
                <h2><a class="footer__heading" href="${path_index}/index.html">Trang chủ</a></h2>
                <h2><a class="footer__heading" href="${path}/Group.html">Về chúng tôi</a></h2>
            </div>
            <div class="footer__services">
                <h2 class="footer__heading">Dịch vụ</h2>
                <a href="${path}/Lichthidau.html" class="footer__service">
                    <img src="${path_img}/assets/ball.svg" alt="">
                    <p class="footer__desc">Xem lịch thi đấu</p>
                </a>
                <a id="footer_dangki" href="${path}/Dangki.html" class="footer__service">
                    <img src="${path_img}/assets/signup.svg" alt="">
                    <p class="footer__desc">Đăng kí đội bóng</p>
                </a>
                <a href="${path}/Tracuu.html" class="footer__service">
                    <img src="${path_img}/assets/search.svg" alt="">
                    <p class="footer__desc">Tra cứu</p>
                </a>
            </div>
            <div class="footer__socials">
                <h2 class="footer__heading">Liên hệ</h2>
                <div class="footer__group">
                    <a href="https://www.facebook.com/Loi.Syn" class="footer__social" target="_blank">
                        <img src="${path_img}/assets/facebook.svg" alt="Facebook">
                        <p class="footer__desc">Facebook</p>
                    </a>
                    <a href="https://www.youtube.com/@thanhnhatmonster1937" class="footer__social" target="_blank">
                        <img src="${path_img}/assets/youtube.svg" alt="Youtube">
                        <p class="footer__desc">Youtube</p>
                    </a>
                    <a href="tel:012345678" class="footer__social" target="_blank">
                        <img src="${path_img}/assets/phone.svg" alt="Phone">
                        <p class="footer__desc">012345678</p>
                    </a>
                    <a href="mailto:bongdag5@gmail.com" class="footer__social" target="_blank">
                        <img src="${path_img}/assets/mail.svg" alt="Mail">
                        <p class="footer__desc">bongdag5@gmail.com</p>
                    </a>
                </div>
            </div>
        </div>
        <p class="footer__copyright">Bản quyền © 2024-2025 Nhóm 5</p>`;
footer.innerHTML = footerInner;

fetch("http://localhost:3000/admin/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(firstLoad()),
})
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Login failure");
    })
    .then((data) => {
        const btnDesc = document.querySelector(".header__btn-desc");
        headerBtn.innerText = "Đăng xuất";
        headerBtn.style.backgroundColor = "yellow";
        headerBtn.style.color = "black";
        btnDesc.innerText = "CHÀO MỪNG ADMIN";
        headerBtn.removeEventListener("click", () => {
            window.location.href = "/page/Dangnhap.html";
        });
        headerBtn.addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            window.location.href = "/index.html";
        });
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

fetch("http://localhost:3000/admin/checkNextSeason", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to check next season");
        }
        return response.json();
    })
    .then((data) => {
        if (data.nextSeason === null || data.numTeamsNextSeason >= 6) {
            document.querySelector("#dangki").remove();
            document.querySelector("#footer_dangki").remove();
            if (pageTitle === "Đăng kí") {
                window.location.href = "./Lichthidau.html";
            }
        }
    })
    .catch((error) => {});
