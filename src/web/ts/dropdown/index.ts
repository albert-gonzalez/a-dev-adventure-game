export default (): void => {
  const dropDowns = document.querySelectorAll(".dropdown");

  dropDowns.forEach((element) => {
    element
      .querySelector(".dropdown__button")
      ?.addEventListener("click", () => {
        element
          .querySelector(".dropdown__content")
          ?.classList.toggle("dropdown__content--shown");
      });
  });
};
