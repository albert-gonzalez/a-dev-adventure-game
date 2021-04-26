export default (): void => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((element) => {
    console.log(element);

    element
      .querySelector(".dropdown__button")
      ?.addEventListener("click", () => {
        console.log("ei");

        element
          .querySelector(".dropdown__content")
          ?.classList.toggle("dropdown__content--shown");
      });
  });
};
