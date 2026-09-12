/* ================= PAGE LOADER ================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".page-loader");

    if (loader) {
        setTimeout(() => loader.classList.add("loaded"), 250);
    }

});



/* ================= CURSOR ================= */

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;


window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();



/* ================= CURSOR HOVER ================= */

document
    .querySelectorAll(
        "a, button, .certificate, .skill-list span"
    )
    .forEach((element) => {

        element.addEventListener("mouseenter", () => {

            ring.style.width = "48px";
            ring.style.height = "48px";

        });


        element.addEventListener("mouseleave", () => {

            ring.style.width = "34px";
            ring.style.height = "34px";

        });

    });



/* ================= SCROLL REVEAL ================= */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.12
    }

);


document
    .querySelectorAll(".reveal")
    .forEach((element) => {

        observer.observe(element);

    });



/* ================= SECTION ANIMATION ================= */

document
    .querySelectorAll(".section")
    .forEach((section) => {

        const heading =
            section.querySelector(
                ".big-heading, .section-heading"
            );

        if (heading) {

            heading.classList.add("reveal");

            observer.observe(heading);

        }

    });



/* ================= STAGGERED REVEAL ================= */

function staggerReveal(selector, step = 90) {

    document.querySelectorAll(selector).forEach((element, index) => {

        element.classList.add("reveal");

        element.style.setProperty("--delay", `${(index % 8) * step}ms`);

        observer.observe(element);

    });

}

staggerReveal(".project-row");
staggerReveal(".certificate");
staggerReveal(".timeline-item");
staggerReveal(".skill-group");



/* ================= MOBILE NAV TOGGLE ================= */

const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {

    navToggle.addEventListener("click", () => {

        const isOpen = primaryNav.classList.toggle("open");

        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen);

    });

    primaryNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            primaryNav.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");

        });

    });

}



/* ================= SCROLLSPY (ACTIVE NAV LINK) ================= */

const navLinks = document.querySelectorAll("#primaryNav a");
const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const spyObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const id = `#${entry.target.id}`;

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === id
                    );

                });

            }

        });

    },

    {
        rootMargin: "-45% 0px -50% 0px"
    }

);

sections.forEach((section) => spyObserver.observe(section));



/* ================= SCROLL PROGRESS BAR ================= */

const scrollProgressBar = document.getElementById("scrollProgressBar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
    }


    /* BACK TO TOP VISIBILITY */

    if (backToTop) {
        backToTop.classList.toggle("visible", scrollTop > 500);
    }

}, { passive: true });



/* ================= BACK TO TOP ================= */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({ top: 0, behavior: "smooth" });

    });

}



/* ================= PHOTO TILT EFFECT ================= */

const photoCard = document.getElementById("photoCard");

if (photoCard && window.matchMedia("(hover: hover)").matches) {

    photoCard.addEventListener("mousemove", (event) => {

        const rect = photoCard.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        const rotateY = x * 16;
        const rotateX = y * -16;

        photoCard.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    photoCard.addEventListener("mouseleave", () => {

        photoCard.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

    });

}



/* ================= TYPEWRITER ================= */

const typewriterEl = document.getElementById("typewriter");

const typewriterWords = [
    "Game Development",
    "Artificial Intelligence",
    "Cloud Computing",
    "Freelance App Testing"
];

if (typewriterEl) {

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {

        const currentWord = typewriterWords[wordIndex];

        if (!deleting) {

            charIndex++;
            typewriterEl.textContent = currentWord.slice(0, charIndex);

            if (charIndex === currentWord.length) {

                deleting = true;
                setTimeout(typeLoop, 1400);
                return;

            }

        } else {

            charIndex--;
            typewriterEl.textContent = currentWord.slice(0, charIndex);

            if (charIndex === 0) {

                deleting = false;
                wordIndex = (wordIndex + 1) % typewriterWords.length;

            }

        }

        setTimeout(typeLoop, deleting ? 45 : 90);

    }

    typeLoop();

}