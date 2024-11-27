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
    if (firstLoad() != null) {
        btn_conf.addEventListener("click", function () {
            const winInput = document.querySelector("#win__point-conf").value;
            if (winInput.trim() !== "" && !isNaN(Number(winInput))) {
                win_point = Number(winInput);
            }

            const loseInput = document.querySelector("#lose__point-conf").value;
            if (loseInput.trim() !== "" && !isNaN(Number(loseInput))) {
                lose_point = Number(loseInput);
            }

            const drawInput = document.querySelector("#draw__point-conf").value;
            if (drawInput.trim() !== "" && !isNaN(Number(drawInput))) {
                draw_point = Number(drawInput);
            }
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
                .then((response) => response.json())
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
                });
        });
    } else {
        btn_regulation.style.display = "none";
    }
}
