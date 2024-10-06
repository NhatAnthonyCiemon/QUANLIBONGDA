let header = document.querySelector('header');
let headeInner= `<img src="/assets/Logo.svg" alt="Logo">
            <ul class="header__links">
                <li><a class="header__link" href="/index.html">TRANG CHỦ</a></li>
                <li><a class="header__link" href="/page/Dangki.html">ĐĂNG KÝ</a></li>
                <li><a class="header__link" href="/page/Lichthidau.html">LỊCH THI ĐẤU</a></li>
                <li><a class="header__link" href="/page/Tracuu.html">TRA CỨU</a></li>
                <li><a class="header__link" href="/page/Group.html">VỀ CHÚNG TÔI</a></li>
            </ul>
        <div class="header__wrapper">
            <p class="header__btn-desc">CHỈ DÀNH CHO ADMIN</p>
            <button class="header__btn">Đăng nhập</button>
        </div>`
header.innerHTML = headeInner;
let pageTitle = document.title;
let headerLinks = document.querySelectorAll('.header__link');
headerLinks.forEach(link => {
    if (link.innerText.toLowerCase() === pageTitle.toLowerCase()) {
        link.classList.add('header__link-active');
    }
})

if(pageTitle === 'Đăng nhập') {
   headerWrapper = document.querySelector('.header__wrapper');
   headerWrapper.remove();
}
let headerBtn =document.querySelector(".header__btn")
if(headerBtn) {
    headerBtn.addEventListener('click', () => {
        window.location.href = '/page/Dangnhap.html';
    })
}

let footer = document.querySelector('footer');
let footerInner = `<div class="footer__main">
            <img src="/assets/Logo.svg" alt="Logo">
            <div class="footer__pages">
                <h2><a class="footer__heading" href="/index.html">Trang chủ</a></h2>
                <h2><a class="footer__heading" href="/page/Group.html">Về chúng tôi</a></h2>
            </div>
            <div class="footer__services">
                <h2 class="footer__heading">Dịch vụ</h2>
                <a href="/page/Lichthidau.html" class="footer__service">
                    <img src="/assets/ball.svg" alt="">
                    <p class="footer__desc">Xem lịch thi đấu</p>
                </a>
                <a href="/page/Dangki.html" class="footer__service">
                    <img src="/assets/signup.svg" alt="">
                    <p class="footer__desc">Đăng kí đội bóng</p>
                </a>
                <a href="/page/Tracuu.html" class="footer__service">
                    <img src="/assets/search.svg" alt="">
                    <p class="footer__desc">Tra cứu</p>
                </a>
            </div>
            <div class="footer__socials">
                <h2 class="footer__heading">Liên hệ</h2>
                <div class="footer__group">
                    <a href="https://www.facebook.com/Loi.Syn" class="footer__social" target="_blank">
                        <img src="/assets/facebook.svg" alt="Facebook">
                        <p class="footer__desc">Facebook</p>
                    </a>
                    <a href="https://www.youtube.com/@thanhnhatmonster1937" class="footer__social" target="_blank">
                        <img src="/assets/youtube.svg" alt="Youtube">
                        <p class="footer__desc">Youtube</p>
                    </a>
                    <a href="tel:012345678" class="footer__social" target="_blank">
                        <img src="/assets/phone.svg" alt="Phone">
                        <p class="footer__desc">012345678</p>
                    </a>
                    <a href="mailto:bongdag5@gmail.com" class="footer__social" target="_blank">
                        <img src="/assets/mail.svg" alt="Mail">
                        <p class="footer__desc">bongdag5@gmail.com</p>
                    </a>
                </div>
            </div>
        </div>
        <p class="footer__copyright">Bản quyền © 2024-2025 Nhóm 5</p>`
footer.innerHTML = footerInner;


