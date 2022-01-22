const navAnimationHandler = () => {
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const burger = document.querySelector(".burger");
  nav.classList.toggle("nav-active");
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      // link.style.animation = `navLinkDisappear 0.4s ease backwards ${
      //   index / 6 + 0.3
      // }s`;
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 6 + 0.1
      }s`;
    }
    //Burger animation
    burger.classList.toggle("toggle");
  });
};

export default navAnimationHandler;
