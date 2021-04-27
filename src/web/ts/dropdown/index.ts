export default (): void => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((element) => {
    element
      .querySelector(".dropdown__button")
      ?.addEventListener("click", () => {
        element
          .querySelector(".dropdown__content")
          ?.classList.toggle("dropdown__content--shown");
      });
  });
};
