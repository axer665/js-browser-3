// обработчик клика по списку 
const selectClick = function(list){
    return function(event){
        const element = event.target;
        list.style.left = element.getBoundingClientRect().left-10 + "px";
        list.classList.toggle("dropdown__list_active");
    }
} 

// функция работы select'а определенной структуры
function select(item) {
    const value = document.querySelector(item + " .dropdown__value");
    const list = document.querySelector(item + " .dropdown__list");
    const links = document.querySelectorAll(item + " .dropdown__link");

    links.forEach((link) => {
        link.removeAttribute("href");
        link.parentNode.closest(".dropdown__item").onclick = function() {
            list.classList.remove("dropdown__list_active");
            value.textContent = link.textContent;
        }
    })

    value.addEventListener("click", selectClick(list));
}

select(".dropdown");
select(".dropdown2");
select("#dropdownId");