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

const openModalFunc = () => {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerId);
};

const closeModalFunc = (event) => {
  if (
    (event.code === "Escape" && modal.classList.contains("show")) ||
    event.target.closest(".modal__close") ||
    event.target.classList.contains("modal")
  ) {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }
};

const modalTimerId = setTimeout(openModalFunc, 50000);
const showModalByScroll = () => {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModalFunc();
    window.removeEventListener("scroll", showModalByScroll);
  }
};

window.addEventListener("scroll", showModalByScroll);

openModal.forEach((element) =>
  element.addEventListener("click", openModalFunc)
);
closeModal.addEventListener("click", closeModalFunc);
document.addEventListener("keydown", closeModalFunc);
modal.addEventListener("click", closeModalFunc);

// cards with classes

class MenuCard {
  constructor(src, alt, title, description, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.description = description;
    this.price = price;
    this.classes = classes;
    this.parentSelector = document.querySelector(parentSelector);
    this.transfer = 27;
    this.changeToUAH();
  }

  changeToUAH() {
    this.price = this.price * this.transfer;
  }

  render() {
    const element = document.createElement("div");
    if (this.classes.length === 0) {
      this.element = "menu__item";
      element.classList.add(this.element);
    } else {
      this.classes.forEach((className) => element.classList.add(className));
    }
    element.innerHTML = `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                      <div class="menu__item-descr">${this.description}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                      </div>
    `;
    this.parentSelector.append(element);
  }
}

const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }

  return await res.json();
};

// getResource('http://localhost:3000/menu')
// .then(data => {
//   data.forEach(({img, altimg, title, descr, price}) => {
//     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//   });
// });

// axios.get("http://localhost:3000/menu").then((data) => {
//   data.data.forEach(({ img, altimg, title, descr, price }) => {
//     new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//   });
// });

// getResource("http://localhost:3000/menu").then((data) => createCard(data));

// function createCard(data) {
//   data.forEach(({ img, altimg, title, descr, price }) => {
//     const element = document.createElement("div");
//     element.classList.add("menu__item");
//     element.innerHTML = `
//       <img src=${img} alt=${altimg}>
//       <h3 class="menu__item-subtitle">${title}</h3>
//       <div class="menu__item-descr">${descr}</div>
//       <div class="menu__item-divider"></div>
//       <div class="menu__item-price">
//       <div class="menu__item-cost">Цена:</div>
//       <div class="menu__item-total"><span>${price}</span> грн/день</div>
//       </div>
//     `;
//     document.querySelector(".menu .container").append(element);
//   });
// }

// Form
const forms = document.querySelectorAll("form");
const message = {
  loading: "icons/spinner.svg",
  success: "спасибо, скоро с Вами свяжемся",
  fail: "что-то пошло не так...",
};

forms.forEach((element) => {
  bindPostData(element);
});

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });
  return await res.json();
};

function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    event.preventDefault();

    const statusMessage = document.createElement("img");
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `;
    form.insertAdjacentElement("afterend", statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);

        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.fail);
      })
      .finally(() => {
        form.reset();
      });
  });
}

const showThanksModal = (message) => {
  const prevModalDialog = document.querySelector(".modal__dialog");

  prevModalDialog.classList.add("hide");
  prevModalDialog.classList.remove("show");
  openModalFunc();

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");
  thanksModal.innerHTML = `
    <div class="modal__content">
    <div data-close="" class="modal__close">×</div>
    <div class="modal__title">${message}</div>
    </div>`;
  document.querySelector(".modal").append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide");
    modal.classList.remove("show");
    modal.classList.add("hide");
  }, 4000);
};

fetch("http://localhost:3000/menu")
  .then((data) => data.json())
  .then((res) => console.log(res));
