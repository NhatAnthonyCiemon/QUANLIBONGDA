let loaicauthu =["Trong nước", "Nước ngoài"];
let age_min = 16
let age_max = 40
let num_max = 22
let num_min = 15
let foreign_max = 3
let cauthu = []




function taocauthu(name, type, birthdate, notes){
    this.name = name
    this.type = type
    this.birthdate = birthdate
    this.notes = notes
}
let btn_add = document.querySelector(".btn__add")
let shadow = document.querySelector(".shadow")
let shadow__box = document.querySelector(".shadow__box")//modal
let shadow__false = document.querySelector(".shadow__false")
let shadow_desc = document.querySelector(".shadow__desc")
let shadow_img = document.querySelector(".shadow__img")
let tbody = document.querySelector(".table__body")
let btn_submit = document.querySelector(".btn__submit")
let btn_regulation = document.querySelector(".btn__regulation")
let shadow__box_conf = document.querySelector(".shadow__box-conf")
let btn_conf = document.querySelector(".btn__conf")

function showRegulation(){
document.querySelector(".football_type").innerHTML = loaicauthu.join(", ")
document.querySelector(".age_min").innerHTML = age_min
document.querySelector(".age_max").innerHTML = age_max
document.querySelector(".num_min").innerHTML = num_min
document.querySelector(".num_max").innerHTML = num_max
document.querySelector(".foreign_max").innerHTML = foreign_max
}

showRegulation()

let num_foreign = 0

btn_add.addEventListener("click", function(){
    let name = document.querySelector("#player-name").value
    let type = document.querySelector("#player-type").value
    let birthdate = document.querySelector("#birth-date").value
    let notes = document.querySelector("#notes").value
    if(name == "" || type == "" || birthdate == ""){
        ShadowFalse()
        showShadow()
        shadow__false.innerHTML = "Vui lòng nhập đầy đủ thông tin"
        return
    }
    const birth_Date = new Date(birthdate); 
    const today = new Date(); 
    let age = today.getFullYear() - birth_Date.getFullYear(); // Tính số năm
    if(age < age_min || age > age_max){
        ShadowFalse()
        showShadow()
        shadow__false.innerHTML = "Tuổi cầu thủ từ <strong>16</strong> đến <strong>40</strong> "
        return
    }
    if(loaicauthu.includes(type) == false){
        ShadowFalse()
        showShadow()
        shadow__false.innerHTML = "Loại cầu thủ không hợp lệ, vui lòng đọc quy định của chúng tôi"
        return
    }
    document.querySelector("#player-name").value = ""
    document.querySelector("#player-type").value = ""
    document.querySelector("#birth-date").value = ""
    document.querySelector("#notes").value = ""
    if(type == "Nước ngoài"){
        num_foreign++
    }
    let newPlayer = new taocauthu(name, type, birthdate, notes)
    cauthu.push(newPlayer)
    let tr = document.createElement("tr")
    tr.innerHTML = `<td>${cauthu.length}</td>
                    <td>${name}</td>
                    <td>${type}</td>
                    <td>${birthdate}</td>
                    <td>${notes}</td>
                    <td><button class="btn__remove">Xóa</button></td>`
    tbody.appendChild(tr)
})

function ShadowSuccess(){
    shadow_desc.innerHTML = "ĐĂNG KÝ THÀNH CÔNG. VUI LÒNG ĐỢI PHẢN HỒI TỪ CHÚNG TÔI."
    shadow_desc.style.color = "green"
    shadow_img.src = "../assets/successdky.svg"
    shadow__false.innerHTML = ""
}
function ShadowFalse(){
    shadow_desc.innerHTML = "ĐĂNG KÝ THẤT BẠI. VUI LÒNG THỬ LẠI."
    shadow_desc.style.color = "red"
    shadow_img.src = "../assets/falsedky.svg"
}
function showShadow(){
    shadow.classList.add("shadow-active")
    shadow__box.classList.add("shadow__box-active")
    document.body.style.overflow = "hidden";
}
shadow.addEventListener("click", function(){
    shadow.classList.remove("shadow-active")
    shadow__box.classList.remove("shadow__box-active")
    shadow__box_conf.classList.remove("shadow__box-conf-active")
    document.body.style.overflow = "auto";
})

tbody.addEventListener("click", function(event) {
    if (event.target.classList.contains('btn__remove')) {
        let tr = event.target.parentElement.parentElement; 
        let index = tr.children[0].innerText; 
        if (cauthu[index - 1].type === "Nước ngoài") {
            num_foreign--; 
        }
        tbody.removeChild(tr);
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

btn_submit.addEventListener("click", function(){
    if(cauthu.length < num_min || cauthu.length > num_max){
        ShadowFalse()
        showShadow()
        shadow__false.innerHTML = `Số lượng cầu thủ từ <strong>${num_min}</strong> đến <strong>${num_max}</strong>`
        return
    }
    if(num_foreign > foreign_max){
        ShadowFalse()
        showShadow()
        shadow__false.innerHTML = `Số lượng cầu thủ nước ngoài không vượt quá <strong>${foreign_max}</strong>`
        return
    }
    if(document.querySelector("#team-name").value=="" || document.querySelector("#stadium").value=="" || document.querySelector("#email").value=="")
        {
            ShadowFalse()
            showShadow()
            shadow__false.innerHTML = "Vui lòng điền đầy đủ thông tin của đội bóng"
            return
        }
    if(validateEmail(document.querySelector("#email").value) == false){
        ShadowFalse()
        showShadow()
        shadow__false.innerHTML = "Email không hợp lệ"
        let email = document.querySelector("#email")
        email.innerHTML = ""
        email.style.border = "1px solid red"
        email.target.focus()
        return
    }
    ShadowSuccess()
    showShadow()
    document.querySelector("#team-name").value = ""
    document.querySelector("#stadium").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#email").style.border = "3px solid #00ad1a";
    tbody.innerHTML = ""
    //gửi 1 object cho backend
    cauthu = []
})

btn_regulation.addEventListener("click", function(){
    shadow.classList.add("shadow-active")
    shadow__box_conf.classList.add("shadow__box-conf-active")
})

btn_conf.addEventListener("click", function(){
    age_min = document.querySelector("#minAge-conf").value || age_min
    age_max = document.querySelector("#maxAge-conf").value ||age_max
    num_min = document.querySelector("#minNum-conf").value ||num_min
    num_max = document.querySelector("#maxNum-conf").value ||num_max
    foreign_max = document.querySelector("#maxForeign-conf").value ||foreign_max
    if(document.querySelector("#footballType-conf").value!=""){
        loaicauthu = document.querySelector("#footballType-conf").value.split(",").map(item => item.trim())
    }
    showRegulation()
    shadow.classList.remove("shadow-active")
    shadow__box_conf.classList.remove("shadow__box-conf-active")
})