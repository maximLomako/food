function tabs(params) {
  // tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContetnt = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  const hideTabContent = () => {
    tabsContetnt.forEach((element) => {
      element.style.display = "none";
    });

    tabs.forEach((element) => {
      element.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (i = 0) => {
    tabsContetnt[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((element, i) => {
        if (target == element) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

module.exports = tabs;
