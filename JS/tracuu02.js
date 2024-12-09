let win_point = 0;
let lose_point = 0;
let draw_point = 0;
fetch("http://localhost:3000/Standards/DK")
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".win_point").innerHTML = data.win_score;
        win_point = data.win_score;
        document.querySelector(".lose_point").innerHTML = data.lose_score;
        lose_point = data.lose_score;
        document.querySelector(".draw_point").innerHTML = data.draw_score;
        draw_point = data.draw_score;
        main();
    });
let shadow__false = document.querySelector(".shadow__false");
let shadow_img = document.querySelector(".shadow__img");
function main() {
    let shadow__box = document.querySelector(".shadow__box"); //modal
    let shadow = document.querySelector(".shadow");
    let btn_regulation = document.querySelector(".btn__regulation");
    let shadow__box_conf = document.querySelector(".shadow__box-conf");
    let btn_conf = document.querySelector(".btn__conf");
    function showShadow() {
        shadow.classList.add("shadow-active");
        shadow__box.classList.add("shadow__box-active");
        document.body.style.overflow = "hidden";
    }
    function ShadowFalse() {
        const shadow_desc = document.querySelector(".shadow__desc");
        shadow_desc.innerHTML = "ĐĂNG KÝ THẤT BẠI. VUI LÒNG THỬ LẠI.";
        shadow_desc.style.color = "red";
        shadow_img.src = "../assets/falsedky.svg";
    }
    shadow.addEventListener("click", function () {
        shadow.classList.remove("shadow-active");
        shadow__box.classList.remove("shadow__box-active");
        shadow__box_conf.classList.remove("shadow__box-conf-active");
        document.body.style.overflow = "auto";
    });
    btn_regulation.addEventListener("click", function () {
        shadow.classList.add("shadow-active");
        shadow__box_conf.classList.add("shadow__box-conf-active");
    });
    function firstLoad() {
        var _username = localStorage.getItem("username");
        var _password = localStorage.getItem("password");
        if (_username != null && _password != null) {
            return { username: _username, password: _password };
        }
        return null;
    }
    function isIntegerInput(value) {
        const numberValue = Number(value);
        return Number.isInteger(numberValue);
    }
    function isValidate(Input) {
        if (Input !== "" && !isNaN(Number(Input)) && isIntegerInput(Input))
            return true;
        return false;
    }
    function textErrorConf(text) {
        ShadowFalse();
        showShadow();
        shadow__false.innerHTML = text;
        shadow__box_conf.classList.remove("shadow__box-conf-active");
    }
    if (firstLoad() != null) {
        btn_conf.addEventListener("click", function () {
            const winInput = document
                .querySelector("#win__point-conf")
                .value.trim();
            const loseInput = document
                .querySelector("#lose__point-conf")
                .value.trim();

            let win_point_temp = win_point;
            let lose_point_temp = lose_point;
            let draw_point_temp = draw_point;
            const drawInput = document
                .querySelector("#draw__point-conf")
                .value.trim();
            if (
                !isIntegerInput(winInput) ||
                !isIntegerInput(loseInput) ||
                !isIntegerInput(drawInput)
            ) {
                textErrorConf("Vui lòng nhập số nguyên");
                return;
            }
            if (isValidate(winInput)) win_point_temp = Number(winInput);
            if (isValidate(loseInput)) lose_point_temp = Number(loseInput);
            if (isValidate(drawInput)) draw_point_temp = Number(drawInput);
            if (
                !(
                    win_point_temp > draw_point_temp &&
                    draw_point_temp > lose_point_temp
                )
            ) {
                textErrorConf(
                    "Vui lòng nhập điểm thắng > điểm hòa > điểm thua"
                );
                return;
            }
            win_point = win_point_temp;
            lose_point = lose_point_temp;
            draw_point = draw_point_temp;
            fetch("http://localhost:3000/Standards/DK1", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: {
                        win_score: win_point,
                        lose_score: lose_point,
                        draw_score: draw_point,
                    },
                    info: firstLoad(),
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        textErrorConf("Đăng ký thất bại. Vui lòng thử lại.");
                        throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
                    }
                    return response.json();
                })
                .then((data) => {
                    document.querySelector(".win_point").innerHTML = win_point;
                    document.querySelector(".lose_point").innerHTML =
                        lose_point;
                    document.querySelector(".draw_point").innerHTML =
                        draw_point;
                    shadow.classList.remove("shadow-active");
                    shadow__box_conf.classList.remove(
                        "shadow__box-conf-active"
                    );
                    document.body.style.overflow = "auto";
                    location.reload();
                })
                .catch((error) => {
                    textErrorConf("Đăng ký thất bại. Vui lòng thử lại.");
                });
        });
    } else {
        btn_regulation.style.display = "none";
    }
}
