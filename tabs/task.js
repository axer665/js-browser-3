const tabs = function(elem) {
    const tabs = Array.from(document.querySelectorAll(elem + " .tab"));
    const tabsContent = Array.from(document.querySelectorAll(elem + " .tab__content"));

    tabs.forEach((tab, index) => {
        tab.onclick = () => {
            // убираем активный таб
            tabs.forEach((tabItem) => {
                tabItem.classList.remove("tab_active");
            });

            // убираем активную вкладку
            tabsContent.forEach((tabsContent) => {
                tabsContent.classList.remove("tab__content_active");
            });

            // делаем активным тукущий юлемент и его вкладку
            tab.classList.add("tab_active");
            tabsContent[index].classList.add("tab__content_active");
        }
    })
}

tabs("#tabs1");
tabs("#tabs2");