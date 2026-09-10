
// =========================================================
// TRANSLATIONS
// =========================================================

const translations = {

  // =======================================================
  // RUSSIAN
  // =======================================================

  ru: {
    title: "AGStroy — строительство и ремонт",

    lang: "ru",

    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    mainNav: "Основная навигация",

    navServices: "Услуги",
    navAbout: "О нас",
    navWorks: "Работы",
    navProcess: "Как работаем",
    navContacts: "Контакты",

    worksEyebrow: "ПОРТФОЛИО",
    worksTitle: "Примеры работ",

    allWorks: "Все",
    furnitureWorks: "Мебель",
    sinksWorks: "Раковины",
    plumbingWorks: "Сантехника",
    otherWorks: "Остальное",

    prevPage: "Предыдущая страница",
    nextPage: "Следующая страница",

    close: "Закрыть",
    openPhoto: "Открыть фотографию",

    footerText:
      "Ремонт домов под ключ · отделка · инженерия · индивидуальные решения",

    toTop: "Наверх ↑"
  },


  // =======================================================
  // ENGLISH
  // =======================================================

  en: {
    title: "AGStroy — construction & renovation",

    lang: "en",

    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNav: "Main navigation",

    navServices: "Services",
    navAbout: "About",
    navWorks: "Works",
    navProcess: "Process",
    navContacts: "Contacts",

    worksEyebrow: "PORTFOLIO",
    worksTitle: "Selected work",

    allWorks: "All",
    furnitureWorks: "Furniture",
    sinksWorks: "Sinks",
    plumbingWorks: "Plumbing",
    otherWorks: "Other",

    prevPage: "Previous page",
    nextPage: "Next page",

    close: "Close",
    openPhoto: "Open photo",

    footerText:
      "Turnkey renovation · finishing · engineering · custom solutions",

    toTop: "Back to top ↑"
  },


  // =======================================================
  // ARMENIAN
  // =======================================================

  hy: {
    title: "AGStroy — շինարարություն և վերանորոգում",

    lang: "hy",

    menuOpen: "Բացել մենյուն",
    menuClose: "Փակել մենյուն",
    mainNav: "Հիմնական նավիգացիա",

    navServices: "Ծառայություններ",
    navAbout: "Մեր մասին",
    navWorks: "Աշխատանքներ",
    navProcess: "Ինչպես ենք աշխատում",
    navContacts: "Կապ",

    worksEyebrow: "ՊՈՐՏՖՈԼԻՈ",
    worksTitle: "Կատարված աշխատանքներ",

    allWorks: "Բոլորը",
    furnitureWorks: "Կահույք",
    sinksWorks: "Լվացարաններ",
    plumbingWorks: "Սանտեխնիկա",
    otherWorks: "Մնացածը",

    prevPage: "Նախորդ էջ",
    nextPage: "Հաջորդ էջ",

    close: "Փակել",
    openPhoto: "Բացել լուսանկարը",

    footerText:
      "Տների վերանորոգում · հարդարում · ինժեներական աշխատանքներ · անհատական լուծումներ",

    toTop: "Վերև ↑"
  }

};


// =========================================================
// LANGUAGE
// =========================================================

let currentLang =
  localStorage.getItem("agstroy-language") || "ru";

const tr = () => {
  return translations[currentLang] || translations.ru;
};


// =========================================================
// APPLY TRANSLATIONS
// =========================================================

function applyTranslations() {

  const lang = tr();

  // Язык страницы
  document.documentElement.lang = lang.lang;

  // Title
  document.title = lang.title;


  // -------------------------------------------------------
  // data-i18n
  // -------------------------------------------------------

  document
    .querySelectorAll("[data-i18n]")
    .forEach(el => {

      const key = el.dataset.i18n;

      if (lang[key] !== undefined) {
        el.innerHTML = lang[key];
      }

    });


  // -------------------------------------------------------
  // aria-label
  // -------------------------------------------------------

  document
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach(el => {

      const key = el.dataset.i18nAriaLabel;

      if (lang[key] !== undefined) {
        el.setAttribute(
          "aria-label",
          lang[key]
        );
      }

    });


  // -------------------------------------------------------
  // ACTIVE LANGUAGE
  // -------------------------------------------------------

  document
    .querySelectorAll(".language-button")
    .forEach(button => {

      button.classList.toggle(
        "is-active",
        button.dataset.lang === currentLang
      );

    });


  // -------------------------------------------------------
  // UPDATE MENU ARIA
  // -------------------------------------------------------

  const menuToggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".nav");

  if (menuToggle && nav) {

    const isOpen =
      nav.classList.contains("is-open");

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? lang.menuClose
        : lang.menuOpen
    );

  }


  // -------------------------------------------------------
  // NOTIFY OTHER SCRIPTS
  // -------------------------------------------------------

  window.dispatchEvent(
    new Event("languagechange-agstroy")
  );
}


// =========================================================
// THEME
// =========================================================

function applyTheme(theme) {

  // Устанавливаем тему
  document.documentElement.dataset.theme = theme;


  // Сохраняем
  localStorage.setItem(
    "agstroy-theme",
    theme
  );


  // Обновляем aria-pressed
  const toggle =
    document.getElementById("themeToggle");

  if (toggle) {

    toggle.setAttribute(
      "aria-pressed",
      theme === "dark"
        ? "true"
        : "false"
    );

  }

}


// =========================================================
// GET INITIAL THEME
// =========================================================

function getInitialTheme() {

  const savedTheme =
    localStorage.getItem("agstroy-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }


  // Если пользователь ещё ничего не выбирал,
  // смотрим системную тему

  if (
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
  ) {
    return "dark";
  }


  return "light";
}


// =========================================================
// COMMON SITE SETUP
// =========================================================

function setupCommon() {

  // =======================================================
  // THEME
  // =======================================================

  applyTheme(
    getInitialTheme()
  );


  // =======================================================
  // LANGUAGES
  // =======================================================

  document
    .querySelectorAll(".language-button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const selectedLanguage =
            button.dataset.lang;

          if (
            !selectedLanguage ||
            !translations[selectedLanguage]
          ) {
            return;
          }


          currentLang =
            selectedLanguage;


          localStorage.setItem(
            "agstroy-language",
            currentLang
          );


          applyTranslations();

        }
      );

    });


  // =======================================================
  // THEME TOGGLE
  // =======================================================

  const themeToggle =
    document.getElementById("themeToggle");

  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const currentTheme =
          document.documentElement.dataset.theme;

        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : "dark";

        applyTheme(nextTheme);

      }
    );

  }


  // =======================================================
  // MOBILE MENU
  // =======================================================

  const nav =
    document.querySelector(".nav");

  const menuToggle =
    document.querySelector(".menu-toggle");


  if (nav && menuToggle) {

    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          nav.classList.toggle("is-open");


        menuToggle.classList.toggle(
          "is-open",
          open
        );


        menuToggle.setAttribute(
          "aria-expanded",
          String(open)
        );


        menuToggle.setAttribute(
          "aria-label",
          open
            ? tr().menuClose
            : tr().menuOpen
        );


        document.body.classList.toggle(
          "menu-open",
          open
        );

      }
    );


    // Закрываем меню после клика по ссылке

    nav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            nav.classList.remove(
              "is-open"
            );

            menuToggle.classList.remove(
              "is-open"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            menuToggle.setAttribute(
              "aria-label",
              tr().menuOpen
            );

            document.body.classList.remove(
              "menu-open"
            );

          }
        );

      });

  }


  // =======================================================
  // APPLY TRANSLATIONS
  // =======================================================

  applyTranslations();

}


// =========================================================
// WORKS / PORTFOLIO
// =========================================================

const worksGrid =
  document.querySelector("#worksGrid");

const pagination =
  document.querySelector("#pagination");


const perPage = 9;

let currentPage = 1;

let currentCategory = "all";


// =========================================================
// COUNT
// =========================================================
//
// Здесь указываешь количество фотографий
// в каждой папке.
//
// Например:
//
// images/furniture/photo1.webp
// images/furniture/photo2.webp
// images/furniture/photo3.webp
//
// значит:
//
// furniture: 3
//
// =========================================================

const worksCount = {

  furniture: 24,

  sinks: 19,

  plumbing: 33,

  other: 200,

  // ВАЖНО:
  // all здесь НЕ используется для общего количества.
  //
  // "Все" автоматически собирается из:
  //
  // furniture + sinks + plumbing + other
};


// =========================================================
// IMAGE EXTENSION
// =========================================================

const imageExtension = ".webp";


// =========================================================
// GENERATE WORKS
// =========================================================

function generateWorks() {

  const furniture = [];

  const sinks = [];

  const plumbing = [];

  const other = [];


  // -------------------------------------------------------
  // FURNITURE
  // -------------------------------------------------------

  for (
    let i = 1;
    i <= worksCount.furniture;
    i++
  ) {

    furniture.push(
      `images/furniture/photo${i}${imageExtension}`
    );

  }


  // -------------------------------------------------------
  // SINKS
  // -------------------------------------------------------

  for (
    let i = 1;
    i <= worksCount.sinks;
    i++
  ) {

    sinks.push(
      `images/sinks/photo${i}${imageExtension}`
    );

  }


  // -------------------------------------------------------
  // PLUMBING
  // -------------------------------------------------------

  for (
    let i = 1;
    i <= worksCount.plumbing;
    i++
  ) {

    plumbing.push(
      `images/plumbing/photo${i}${imageExtension}`
    );

  }


  // -------------------------------------------------------
  // OTHER
  // -------------------------------------------------------

  for (
    let i = 1;
    i <= worksCount.other;
    i++
  ) {

    other.push(
      `images/other/photo${i}${imageExtension}`
    );

  }


  // -------------------------------------------------------
  // ALL
  // -------------------------------------------------------

  const all = [

    ...furniture,

    ...sinks,

    ...plumbing,

    ...other

  ];


  return {

    all,

    furniture,

    sinks,

    plumbing,

    other

  };

}


let worksByCategory =
  generateWorks();


// =========================================================
// CURRENT WORKS
// =========================================================

function getCurrentWorks() {

  return (
    worksByCategory[currentCategory] || []
  );

}


// =========================================================
// CURRENT PAGE
// =========================================================

function getPageWorks() {

  const works =
    getCurrentWorks();


  const start =
    (currentPage - 1) * perPage;


  return works.slice(
    start,
    start + perPage
  );

}


// =========================================================
// RENDER
// =========================================================

function renderWorks() {

  if (!worksGrid || !pagination) {
    return;
  }


  const works =
    getCurrentWorks();


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        works.length / perPage
      )
    );


  if (currentPage > totalPages) {
    currentPage = totalPages;
  }


  const pageWorks =
    getPageWorks();


  // =======================================================
  // RENDER IMAGES
  // =======================================================

  worksGrid.innerHTML =

    pageWorks
      .map((path, index) => {

        const number =
          (currentPage - 1) * perPage +
          index +
          1;


        return `

          <article class="work-card">

            <button
              class="work-card__image"
              type="button"
              data-image="${path}"
              aria-label="${tr().openPhoto} ${number}"
            >

              <img
                src="${path}"
                alt="AGStroy — ${tr().openPhoto} ${number}"
                loading="${
                  index < 3
                    ? "eager"
                    : "lazy"
                }"
                decoding="async"
              >

              <span
                class="work-card__zoom"
                aria-hidden="true"
              >
                ↗
              </span>

            </button>

          </article>

        `;

      })
      .join("");


  // =======================================================
  // PAGINATION
  // =======================================================

  const pages = [1];


  if (currentPage > 4) {
    pages.push("...");
  }


  for (

    let i =
      Math.max(
        2,
        currentPage - 2
      );

    i <=
      Math.min(
        totalPages - 1,
        currentPage + 2
      );

    i++

  ) {

    pages.push(i);

  }


  if (
    currentPage <
    totalPages - 3
  ) {

    pages.push("...");

  }


  if (
    totalPages > 1 &&
    !pages.includes(totalPages)
  ) {

    pages.push(totalPages);

  }


  pagination.innerHTML = `

    <button
      class="pagination__button"
      data-page="${currentPage - 1}"
      aria-label="${tr().prevPage}"
      ${
        currentPage === 1
          ? "disabled"
          : ""
      }
    >
      ←
    </button>


    ${pages
      .map(page => {

        if (page === "...") {

          return `

            <span class="pagination__dots">
              ...
            </span>

          `;

        }


        return `

          <button
            class="pagination__button ${
              page === currentPage
                ? "is-active"
                : ""
            }"
            data-page="${page}"
          >
            ${page}
          </button>

        `;

      })
      .join("")}


    <button
      class="pagination__button"
      data-page="${currentPage + 1}"
      aria-label="${tr().nextPage}"
      ${
        currentPage === totalPages
          ? "disabled"
          : ""
      }
    >
      →
    </button>

  `;


  // =======================================================
  // PAGINATION EVENTS
  // =======================================================

  pagination
    .querySelectorAll(
      "button:not(:disabled)"
    )
    .forEach(button => {

      button.onclick = () => {

        currentPage =
          Number(
            button.dataset.page
          );


        renderWorks();


        document
          .querySelector("#works")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      };

    });


  // =======================================================
  // DEBUG
  // =======================================================

  console.log(
    "Категория:",
    currentCategory
  );

  console.log(
    "Количество фото:",
    works.length
  );

  console.log(
    "Фото на странице:",
    perPage
  );

}


// =========================================================
// FILTERS
// =========================================================

function createFilters() {

  const heading =
    document.querySelector(
      ".section-heading--works"
    );


  if (!heading) {
    return;
  }


  const oldFilters =
    document.querySelector(
      ".works-filter"
    );


  if (oldFilters) {
    oldFilters.remove();
  }


  const filters =
    document.createElement("div");


  filters.className =
    "works-filter";


  filters.innerHTML = `

    <button
      type="button"
      class="filter-button ${
        currentCategory === "all"
          ? "is-active"
          : ""
      }"
      data-category="all"
    >
      ${tr().allWorks}
    </button>


    <button
      type="button"
      class="filter-button ${
        currentCategory === "furniture"
          ? "is-active"
          : ""
      }"
      data-category="furniture"
    >
      ${tr().furnitureWorks}
    </button>


    <button
      type="button"
      class="filter-button ${
        currentCategory === "sinks"
          ? "is-active"
          : ""
      }"
      data-category="sinks"
    >
      ${tr().sinksWorks}
    </button>


    <button
      type="button"
      class="filter-button ${
        currentCategory === "plumbing"
          ? "is-active"
          : ""
      }"
      data-category="plumbing"
    >
      ${tr().plumbingWorks}
    </button>


    <button
      type="button"
      class="filter-button ${
        currentCategory === "other"
          ? "is-active"
          : ""
      }"
      data-category="other"
    >
      ${tr().otherWorks}
    </button>

  `;


  heading.insertAdjacentElement(
    "afterend",
    filters
  );


  filters
    .querySelectorAll(
      ".filter-button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          currentCategory =
            button.dataset.category;


          currentPage = 1;


          createFilters();

          renderWorks();


          document
            .querySelector("#works")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

        }
      );

    });

}


// =========================================================
// LANGUAGE CHANGE
// =========================================================

window.addEventListener(
  "languagechange-agstroy",
  () => {

    createFilters();

    renderWorks();

  }
);


// =========================================================
// INIT
// =========================================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Общие функции сайта
    setupCommon();


    // Если это не страница works
    if (!worksGrid) {
      return;
    }


    createFilters();

    renderWorks();

  }
);