let loaicauthu = ["Trong nước", "Nước ngoài"];
let age_min = 16;
let age_max = 40;
let num_max = 22;
let num_min = 15;
let foreign_max = 3;
let cauthu = [];
let soao = [];
fetch("http://localhost:3000/Standards/DK")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        loaicauthu = data.loaicauthu.split(",");
        loaicauthu = loaicauthu.map((item) => item.trim());
        age_min = data.age_min;
        age_max = data.age_max;
        num_min = data.num_min;
        num_max = data.num_max;
        foreign_max = data.foreign_max;
        main();
    })
    .catch((err) => {
        console.error(err);
        main();
    });

function main() {
    function taocauthu(name, type, birthdate, shirtNumber, notes) {
        this.player_name = name;
        this.player_type = type;
        this.birth_date = birthdate;
        this.note = notes;
        this.ao_number = shirtNumber;
    }
    let btn_add = document.querySelector(".btn__add");
    let shadow = document.querySelector(".shadow");
    let shadow__box = document.querySelector(".shadow__box"); //modal
    let shadow__false = document.querySelector(".shadow__false");
    let shadow_desc = document.querySelector(".shadow__desc");
    let shadow_img = document.querySelector(".shadow__img");
    let tbody = document.querySelector(".table__body");
    let btn_submit = document.querySelector(".btn__submit");
    let btn_regulation = document.querySelector(".btn__regulation");
    let shadow__box_conf = document.querySelector(".shadow__box-conf");
    let btn_conf = document.querySelector(".btn__conf");

    function showRegulation() {
        document.querySelector(".football_type").innerHTML =
            loaicauthu.join(", ");
        document.querySelector(".age_min").innerHTML = age_min;
        document.querySelector(".age_max").innerHTML = age_max;
        document.querySelector(".num_min").innerHTML = num_min;
        document.querySelector(".num_max").innerHTML = num_max;
        document.querySelector(".foreign_max").innerHTML = foreign_max;
    }

    showRegulation();

    let num_foreign = 0;

    btn_add.addEventListener("click", function () {
        let name = document.querySelector("#player-name").value;
        let type = document.querySelector("#player-type").value;
        let birthdate = document.querySelector("#birth-date").value;
        let notes = document.querySelector("#notes").value;
        let shirtNumber = document.querySelector("#shirtNumber").value;
        if (name == "" || type == "" || birthdate == "" || shirtNumber == "") {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML = "Vui lòng nhập đầy đủ thông tin";
            return;
        }
        const birth_Date = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birth_Date.getFullYear(); // Tính số năm
        if (age < age_min || age > age_max) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML =
                "Tuổi cầu thủ từ <strong>16</strong> đến <strong>40</strong> ";
            return;
        }
        if (loaicauthu.includes(type) == false) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML =
                "Loại cầu thủ không hợp lệ, vui lòng đọc quy định của chúng tôi";
            return;
        }
        if (soao.includes(shirtNumber)) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML = "Số áo đã tồn tại";
            return;
        }
        soao.push(shirtNumber);

        document.querySelector("#player-name").value = "";
        document.querySelector("#player-type").value = "";
        document.querySelector("#birth-date").value = "";
        document.querySelector("#notes").value = "";
        document.querySelector("#shirtNumber").value = "";
        if (type == "Nước ngoài") {
            num_foreign++;
        }
        let newPlayer = new taocauthu(
            name,
            type,
            birthdate,
            shirtNumber,
            notes
        );
        cauthu.push(newPlayer);
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${cauthu.length}</td>
                        <td>${name}</td>
                        <td>${type}</td>
                        <td>${birthdate}</td>
                        <td>${notes} số áo(${shirtNumber})</td>
                        <td><button class="btn__remove">Xóa</button></td>`;
        tbody.appendChild(tr);
    });

    function ShadowSuccess(
        text = "ĐĂNG KÝ THÀNH CÔNG. VUI LÒNG ĐỢI PHẢN HỒI TỪ CHÚNG TÔI."
    ) {
        shadow_desc.innerHTML = text;
        shadow_desc.style.color = "green";
        shadow_img.src = "../assets/successdky.svg";
        shadow__false.innerHTML = "";
    }
    function ShadowFalse() {
        shadow_desc.innerHTML = "ĐĂNG KÝ THẤT BẠI. VUI LÒNG THỬ LẠI.";
        shadow_desc.style.color = "red";
        shadow_img.src = "../assets/falsedky.svg";
    }
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

    tbody.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn__remove")) {
            let tr = event.target.parentElement.parentElement;
            let index = tr.children[0].innerText;
            if (cauthu[index - 1].type === "Nước ngoài") {
                num_foreign--;
            }
            tbody.removeChild(tr);
            soao = soao.filter((item) => item != cauthu[index - 1].ao_number);
            cauthu.splice(index - 1, 1);
            let trs = document.querySelectorAll("tbody tr");
            trs.forEach((tr, index) => {
                tr.children[0].innerText = index + 1;
            });
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    function isIntegerInput(value) {
        const numberValue = Number(value);
        console.log(numberValue);
        return Number.isInteger(numberValue);
    }
    btn_submit.addEventListener("click", async function () {
        if (cauthu.length < num_min || cauthu.length > num_max) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML = `Số lượng cầu thủ từ <strong>${num_min}</strong> đến <strong>${num_max}</strong>`;
            return;
        }
        if (num_foreign > foreign_max) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML = `Số lượng cầu thủ nước ngoài không vượt quá <strong>${foreign_max}</strong>`;
            return;
        }
        if (
            document.querySelector("#team-name").value == "" ||
            document.querySelector("#stadium").value == "" ||
            document.querySelector("#email").value == ""
        ) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML =
                "Vui lòng điền đầy đủ thông tin của đội bóng";
            return;
        }
        if (validateEmail(document.querySelector("#email").value) == false) {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML = "Email không hợp lệ";
            let email = document.querySelector("#email");
            email.innerHTML = "";
            email.style.border = "1px solid red";
            email.target.focus();
            return;
        }

        //gửi 1 object cho backend
        const football_team = {
            team_name: document.querySelector("#team-name").value,
            stadium: document.querySelector("#stadium").value,
            email: document.querySelector("#email").value,
        };
        const response = await fetch("http://localhost:3000/Teams/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(football_team),
        });
        const id = await response.json();
        if (response.ok) {
            console.log("Team added:", id);
        } else {
            ShadowFalse();
            showShadow();
            shadow__false.innerHTML = "Đã xảy ra lỗi";
            return;
        }
        let isSuccessful = true;

        for (const [index, player] of cauthu.entries()) {
            try {
                const response = await fetch(
                    "http://localhost:3000/Players/create",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            player_name: player.player_name,
                            birth_date: player.birth_date,
                            player_type: player.player_type,
                            team_id: id,
                            ao_number: player.ao_number,
                            note: player.note,
                            pos:
                                index === cauthu.length - 1 ? "last" : "normal",
                        }),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log("Player added:", data);
                } else {
                    isSuccessful = false;
                    console.error(
                        "Failed to add player:",
                        await response.text()
                    );
                }
            } catch (err) {
                isSuccessful = false;
                console.error("Error while adding player:", err.message);
            }
        }
        if (!isSuccessful) {
            shadow__false.innerHTML = "Đã xảy ra lỗi";
            ShadowFalse();
            showShadow();
            return;
        }
        ShadowSuccess();
        showShadow();
        cauthu = [];
        soao = [];
        document.querySelector("#team-name").value = "";
        document.querySelector("#stadium").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#email").style.border = "3px solid #00ad1a";
        tbody.innerHTML = "";
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
    function isValidate(Input) {
        if (
            Input !== "" &&
            !isNaN(Number(Input)) &&
            Number(Input) > 0 &&
            isIntegerInput(Input)
        )
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
        btn_conf.addEventListener("click", async function () {
            const minAgeInput = document
                .querySelector("#minAge-conf")
                .value.trim();
            const maxAgeInput = document
                .querySelector("#maxAge-conf")
                .value.trim();
            let age_min_temp = age_min;
            let age_max_temp = age_max;
            if (!isIntegerInput(minAgeInput) || !isIntegerInput(maxAgeInput)) {
                textErrorConf("Tuổi cầu thủ phải là số nguyên");
                return;
            }
            if (isValidate(minAgeInput)) {
                age_min_temp = Number(minAgeInput);
            }

            if (isValidate(maxAgeInput)) {
                age_max_temp = Number(maxAgeInput);
            }

            if (age_min_temp > age_max_temp) {
                textErrorConf("Tuổi cầu thủ không hợp lệ");
                return;
            }
            age_min = age_min_temp;
            age_max = age_max_temp;
            const minNumInput = document
                .querySelector("#minNum-conf")
                .value.trim();
            const maxNumInput = document
                .querySelector("#maxNum-conf")
                .value.trim();
            if (!isIntegerInput(minNumInput) || !isIntegerInput(maxNumInput)) {
                textErrorConf("Số lượng cầu thủ phải là số nguyên");
                return;
            } else {
                console.log("minNumInput", minNumInput);
                console.log("maxNumInput", maxNumInput);
            }
            let num_min_temp = num_min;
            let num_max_temp = num_max;
            if (isValidate(minNumInput)) {
                num_min_temp = Number(minNumInput);
            }

            if (isValidate(maxNumInput)) {
                num_max_temp = Number(maxNumInput);
            }

            if (num_min_temp > num_max_temp) {
                textErrorConf("Số lượng cầu thủ không hợp lệ");
                return;
            }
            num_min = num_min_temp;
            num_max = num_max_temp;

            const maxForeignInput = document
                .querySelector("#maxForeign-conf")
                .value.trim();
            if (isValidate(maxForeignInput)) {
                foreign_max = Number(maxForeignInput);
            } else {
                if (maxForeignInput !== "") {
                    ShadowFalse();
                    showShadow();
                    shadow__false.innerHTML =
                        "Số lượng cầu thủ nước ngoài không hợp lệ";
                    shadow__box_conf.classList.remove(
                        "shadow__box-conf-active"
                    );
                    return;
                }
            }
            if (document.querySelector("#footballType-conf").value != "") {
                loaicauthu = document
                    .querySelector("#footballType-conf")
                    .value.split(",")
                    .map((item) => item.trim());
            }
            const message = {
                loaicauthu: loaicauthu.join(","),
                age_min: age_min,
                age_max: age_max,
                num_min: num_min,
                num_max: num_max,
                foreign_max: foreign_max,
            };
            const info = firstLoad();
            const content = {
                message: message,
                info: info,
            };
            const res = await fetch("http://localhost:3000/Standards/DK", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(content),
            });
            if (res.ok) {
                ShadowSuccess("Thay đổi quy định thành công");
                showShadow();
                showRegulation();
                shadow__box_conf.classList.remove("shadow__box-conf-active");
            } else {
                ShadowFalse();
                showShadow();
                shadow__false.innerHTML = "Đã xảy ra lỗi";
                shadow__box_conf.classList.remove("shadow__box-conf-active");
            }
        });
    } else {
        btn_regulation.remove();
    }
}
