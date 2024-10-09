let btn_back= document.querySelector(".button__back")
let btn_next= document.querySelector(".button__next")

btn_back.style.display = "none"

function getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41; 
}


btn_next.addEventListener("click", function(){
    let section_active= document.querySelector(".info__section-active")
    // tôi muốn đẩy section_active ra 1 đoạn bằng đúng width của section bằng transform
    let width = section_active.clientWidth
    let parent_child = section_active.parentElement.children
    parent_child = Array.from(parent_child)
    parent_child.forEach((section, index) => {
        let old_transform = getTranslateX(section)
        section.style.transform = `translateX(${-width- 125+ old_transform}px)`
    })
    section_active.classList.remove("info__section-active")
    section_active.nextElementSibling.classList.add("info__section-active")
    if(section_active.nextElementSibling.nextElementSibling == null){
        btn_next.style.display = "none"
    }
    btn_back.style.display = "block"
})

btn_back.addEventListener("click", function(){
    let section_active= document.querySelector(".info__section-active")
    let width = section_active.clientWidth
    let parent_child = section_active.parentElement.children
    parent_child = Array.from(parent_child)
    parent_child.forEach((section, index) => {
        let old_transform = getTranslateX(section)
        section.style.transform = `translateX(${width+ 125+ old_transform}px)`
    })
    section_active.classList.remove("info__section-active")
    section_active.previousElementSibling.classList.add("info__section-active")
    if(section_active.previousElementSibling.previousElementSibling == null){
        btn_back.style.display = "none"
    }
    btn_next.style.display = "block"
})