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

const tr = () =>
  translations[currentLang] || translations.ru;


// =========================================================
// APPLY TRANSLATIONS
// =========================================================

function applyTranslations() {

  const lang = tr();

  document.documentElement.lang = lang.lang;
  document.title = lang.title;


  // data-i18n

  document
    .querySelectorAll("[data-i18n]")
    .forEach(el => {

      const key = el.dataset.i18n;

      if (lang[key] !== undefined) {
        el.innerHTML = lang[key];
      }

    });


  // aria-label

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


  // active language

  document
    .querySelectorAll(".language-button")
    .forEach(button => {

      button.classList.toggle(
        "is-active",
        button.dataset.lang === currentLang
      );

    });


  // menu aria-label

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


  window.dispatchEvent(
    new Event("languagechange-agstroy")
  );

}


// =========================================================
// THEME
// =========================================================

function applyTheme(theme) {

  document.documentElement.dataset.theme = theme;

  localStorage.setItem(
    "agstroy-theme",
    theme
  );


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
// INITIAL THEME
// =========================================================

function getInitialTheme() {

  const savedTheme =
    localStorage.getItem("agstroy-theme");


  if (
    savedTheme === "dark" ||
    savedTheme === "light"
  ) {

    return savedTheme;

  }


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

  // -------------------------------------------------------
  // Theme
  // -------------------------------------------------------

  applyTheme(
    getInitialTheme()
  );


  // -------------------------------------------------------
  // Languages
  // -------------------------------------------------------

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


  // -------------------------------------------------------
  // Theme toggle
  // -------------------------------------------------------

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


  // -------------------------------------------------------
  // Mobile menu
  // -------------------------------------------------------

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


  applyTranslations();

}


// =========================================================
// WORKS / PORTFOLIO
// =========================================================

const worksGrid =
  document.querySelector("#worksGrid");

const pagination =
  document.querySelector("#pagination");


const perPage = 6;

let currentPage = 1;

let currentCategory = "all";


// =========================================================
// COUNT
// =========================================================
//
// Указываем количество фотографий
// в каждой папке.
//
// images/all/photo1.webp
// images/all/photo2.webp
//
// images/furniture/photo1.webp
// images/furniture/photo2.webp
//
// =========================================================

const worksCount = {

  all: 276,

  furniture: 24,

  sinks: 33,

  plumbing: 19,

  other: 200

};


// =========================================================
// IMAGE EXTENSION
// =========================================================

const imageExtension = ".webp";


// =========================================================
// GENERATE CATEGORY
// =========================================================

function generateCategory(
  folder,
  count
) {

  const images = new Array(count);


  for (let i = 0; i < count; i++) {

    images[i] =
      `images/${folder}/photo${i + 1}${imageExtension}`;

  }


  return images;

}


// =========================================================
// GENERATE WORKS
// =========================================================

function generateWorks() {

  return {

    all: generateCategory(
      "all",
      worksCount.all
    ),

    furniture: generateCategory(
      "furniture",
      worksCount.furniture
    ),

    sinks: generateCategory(
      "sinks",
      worksCount.sinks
    ),

    plumbing: generateCategory(
      "plumbing",
      worksCount.plumbing
    ),

    other: generateCategory(
      "other",
      worksCount.other
    )

  };

}


const worksByCategory =
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
// PAGE WORKS
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
// RENDER WORKS
// =========================================================

// =========================================================
// PROGRESSIVE IMAGE LOADING
// =========================================================
// Изображения не загружаются все сразу.
// Сначала создаются пустые карточки,
// затем фото подгружаются постепенно при приближении к экрану.

let worksImageObserver = null;

function getWorksImageObserver() {
  if (!("IntersectionObserver" in window)) {
    return null;
  }

  if (worksImageObserver) {
    return worksImageObserver;
  }

  worksImageObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const img = entry.target;
        const src = img.dataset.src;

        if (!src) {
          worksImageObserver.unobserve(img);
          return;
        }

        // Начинаем загрузку
        img.src = src;
        img.removeAttribute("data-src");

        worksImageObserver.unobserve(img);
      });
    },
    {
      // Начинаем загрузку немного заранее,
      // чтобы пользователь почти никогда не видел ожидание.
      rootMargin: "500px 0px",
      threshold: 0.01
    }
  );

  return worksImageObserver;
}


// =========================================================
// LOAD SINGLE IMAGE
// =========================================================

function loadWorkImage(img, priority = "low") {
  if (!img) {
    return;
  }

  const src = img.dataset.src;

  if (!src) {
    return;
  }

  img.src = src;
  img.removeAttribute("data-src");
  img.fetchPriority = priority;

  if (worksImageObserver) {
    worksImageObserver.unobserve(img);
  }
}


// =========================================================
// START PROGRESSIVE LOADING
// =========================================================

function setupProgressiveImages() {
  if (!worksGrid) {
    return;
  }

  const images = worksGrid.querySelectorAll("img[data-src]");

  if (!images.length) {
    return;
  }

  const observer = getWorksImageObserver();

  images.forEach((img, index) => {

    // Только первые 2 изображения грузим сразу.
    // Остальные — по мере приближения к экрану.

    if (index === 0) {
      loadWorkImage(img, "high");
      return;
    }

    if (index === 1) {
      loadWorkImage(img, "auto");
      return;
    }

    // Если браузер поддерживает IntersectionObserver,
    // наблюдаем за изображением.
    if (observer) {
      observer.observe(img);
    } else {
      // Резервный вариант для старых браузеров.
      loadWorkImage(img, "low");
    }
  });
}


// =========================================================
// IMAGE APPEAR ANIMATION
// =========================================================

(function installImageLoadingStyles() {

  if (
    document.getElementById(
      "agstroy-image-loading-styles"
    )
  ) {
    return;
  }

  const style = document.createElement("style");

  style.id =
    "agstroy-image-loading-styles";

  style.textContent = `

    .work-card__image img {
      opacity: 0;
      transition: opacity .25s ease;
    }

    .work-card__image img.is-loaded {
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .work-card__image img {
        transition: none;
      }
    }

  `;

  document.head.appendChild(style);


  // Отслеживаем момент завершения загрузки картинки.

  document.addEventListener(
    "load",
    event => {

      const img = event.target;

      if (
        img instanceof HTMLImageElement &&
        img.closest(".work-card__image")
      ) {
        img.classList.add("is-loaded");
      }

    },
    true
  );

})();


// =========================================================
// RENDER WORKS
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


  // ---------------------------------------------------------
  // CLEAN OLD IMAGES
  // ---------------------------------------------------------

  if (worksImageObserver) {
    worksImageObserver.disconnect();
  }

  worksGrid.innerHTML = "";


  // ---------------------------------------------------------
  // CREATE FRAGMENT
  // ---------------------------------------------------------

  const fragment =
    document.createDocumentFragment();


  pageWorks.forEach(
    (path, index) => {

      const number =
        (currentPage - 1) *
          perPage +
        index +
        1;


      // -----------------------------------------------------
      // ARTICLE
      // -----------------------------------------------------

      const article =
        document.createElement("article");

      article.className =
        "work-card";


      // -----------------------------------------------------
      // BUTTON
      // -----------------------------------------------------

      const button =
        document.createElement("button");

      button.className =
        "work-card__image";

      button.type =
        "button";

      button.dataset.image =
        path;

      button.setAttribute(
        "aria-label",
        `${tr().openPhoto} ${number}`
      );


      // -----------------------------------------------------
      // IMAGE
      // -----------------------------------------------------

      const img =
        document.createElement("img");


      // ВАЖНО:
      // Не используем img.src = path здесь.
      //
      // URL сохраняем в data-src.
      // Поэтому браузер не начинает скачивать
      // все изображения сразу.

      img.dataset.src =
        path;


      img.alt =
        `AGStroy — ${tr().openPhoto} ${number}`;


      img.loading =
        "lazy";


      img.decoding =
        "async";


      // Приоритет:
      // первые изображения важнее остальных.

      if (index === 0) {
        img.fetchPriority =
          "high";
      } else if (index === 1) {
        img.fetchPriority =
          "auto";
      } else {
        img.fetchPriority =
          "low";
      }


      // -----------------------------------------------------
      // PLACEHOLDER
      // -----------------------------------------------------

      img.classList.add(
        "work-image-placeholder"
      );


      // -----------------------------------------------------
      // ZOOM ICON
      // -----------------------------------------------------

      const zoom =
        document.createElement("span");

      zoom.className =
        "work-card__zoom";

      zoom.setAttribute(
        "aria-hidden",
        "true"
      );

      zoom.textContent =
        "↗";


      // -----------------------------------------------------
      // BUILD CARD
      // -----------------------------------------------------

      button.appendChild(img);
      button.appendChild(zoom);

      article.appendChild(button);

      fragment.appendChild(article);

    }
  );


  worksGrid.appendChild(fragment);


  // ---------------------------------------------------------
  // START IMAGE LOADING
  // ---------------------------------------------------------

  setupProgressiveImages();


  // ---------------------------------------------------------
  // PAGINATION
  // ---------------------------------------------------------

  renderPagination(
    totalPages
  );

}


// =========================================================
// PAGINATION
// =========================================================

function renderPagination(totalPages) {

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
      ${currentPage === 1 ? "disabled" : ""}
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
      ${currentPage === totalPages ? "disabled" : ""}
    >
      →
    </button>

  `;


  // Один обработчик вместо
  // множества onclick

  pagination.onclick = event => {

    const button =
      event.target.closest(
        "button[data-page]"
      );


    if (
      !button ||
      button.disabled
    ) {

      return;

    }


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


  // Один обработчик на контейнер

  filters.onclick = event => {

    const button =
      event.target.closest(
        ".filter-button"
      );


    if (!button) {
      return;
    }


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

  };

}


// =========================================================
// LIGHTBOX
// =========================================================

function setupLightbox() {

  // Создаём lightbox один раз

  let lightbox =
    document.querySelector(".lightbox");


  if (!lightbox) {

    lightbox =
      document.createElement("div");

    lightbox.className =
      "lightbox";

    lightbox.innerHTML = `

      <div
        class="lightbox__backdrop"
        data-lightbox-close
      ></div>

      <div class="lightbox__content">

        <button
          class="lightbox__close"
          type="button"
          aria-label="${tr().close}"
          data-lightbox-close
        >
          ×
        </button>

        <img
          class="lightbox__image"
          src=""
          alt=""
        >

      </div>

    `;

    document.body.appendChild(lightbox);

  }


  const image =
    lightbox.querySelector(
      ".lightbox__image"
    );


  // -------------------------------------------------------
  // Открытие фотографии
  // -------------------------------------------------------

  worksGrid.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".work-card__image"
        );


      if (!button) {
        return;
      }


      const path =
        button.dataset.image;


      if (!path) {
        return;
      }


      image.src = path;

      image.alt =
        button
          .querySelector("img")
          ?.alt || "";


      lightbox.classList.add(
        "is-open"
      );


      document.body.classList.add(
        "lightbox-open"
      );


      // Запрещаем прокрутку страницы

      document.body.style.overflow =
        "hidden";

    }
  );


  // -------------------------------------------------------
  // Закрытие
  // -------------------------------------------------------

  lightbox.addEventListener(
    "click",
    event => {

      if (
        event.target.closest(
          "[data-lightbox-close]"
        )
      ) {

        closeLightbox();

      }

    }
  );


  // -------------------------------------------------------
  // ESC
  // -------------------------------------------------------

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains(
          "is-open"
        )
      ) {

        closeLightbox();

      }

    }
  );


  // -------------------------------------------------------
  // Close function
  // -------------------------------------------------------

  function closeLightbox() {

    lightbox.classList.remove(
      "is-open"
    );


    document.body.classList.remove(
      "lightbox-open"
    );


    document.body.style.overflow =
      "";

    image.src = "";

  }

}

// =========================================================
// LIGHTBOX
// =========================================================

function setupLightbox() {

  if (!worksGrid) {
    return;
  }


  const lightbox =
    document.createElement("div");

  lightbox.className =
    "image-lightbox";


  lightbox.innerHTML = `

    <button
      class="image-lightbox__close"
      type="button"
      aria-label="${tr().close}"
    >
      ×
    </button>

    <img
      class="image-lightbox__image"
      src=""
      alt=""
    >

  `;


  document.body.appendChild(
    lightbox
  );


  const image =
    lightbox.querySelector(
      ".image-lightbox__image"
    );


  const closeButton =
    lightbox.querySelector(
      ".image-lightbox__close"
    );


  const close = () => {

    lightbox.classList.remove(
      "is-open"
    );

    document.body.classList.remove(
      "lightbox-open"
    );

    image.src = "";

  };


  worksGrid.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".work-card__image"
        );


      if (!button) {
        return;
      }


      image.src =
        button.dataset.image;


      image.alt =
        button.querySelector(
          "img"
        )?.alt || "";


      lightbox.classList.add(
        "is-open"
      );


      document.body.classList.add(
        "lightbox-open"
      );

    }
  );


  closeButton.onclick = close;


  lightbox.onclick = event => {

    if (
      event.target === lightbox
    ) {

      close();

    }

  };


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        close();
      }

    }
  );

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

    setupCommon();


    if (!worksGrid) {
      return;
    }

      // ВАЖНО: подключаем lightbox
  setupLightbox();


    createFilters();

    renderWorks();

  }
);
