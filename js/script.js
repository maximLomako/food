const tabs = document.querySelectorAll(".tabheader__item"),
  tabsContetnt = document.querySelectorAll(".tabcontent"),
  tabsParent = document.querySelector(".tabheader__items");

// tabs
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

// timer
const deadLine = "2020-12-31";

const getTimeRemaining = (endtime) => {
  const t = Date.parse(endtime) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);

  return {
    t,
    days,
    hours,
    minutes,
    seconds,
  };
};

const getZero = (num) => {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
};

const setClock = (selector, endTime) => {
  const timer = document.querySelector(selector),
    days = timer.querySelector("#days"),
    hours = timer.querySelector("#hours"),
    minutes = timer.querySelector("#minutes"),
    seconds = timer.querySelector("#seconds");
  const updateClock = () => {
    const t = getTimeRemaining(endTime);
    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);
    if (t.totla >= 0) {
      clearInterval(timeInterval);
    }
  };
  updateClock();
  let timeInterval = setInterval(updateClock, 1000);
};
setClock(".timer", deadLine);

//modal

const openModal = document.querySelectorAll("[data-modal]"),
  closeModal = document.querySelector("[data-close]"),
  modal = document.querySelector(".modal");

const closeModalFunc = (event) => {
  if (event.code === "Escape" || event.target.closest(".modal__close") || event.target.classList.contains('modal')) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

openModal.forEach((element) => {
  element.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener("click", closeModalFunc);
document.addEventListener("keydown", closeModalFunc);
modal.addEventListener('click', closeModalFunc);
