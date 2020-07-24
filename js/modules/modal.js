function modal() {
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
}

module.exports = modal;
