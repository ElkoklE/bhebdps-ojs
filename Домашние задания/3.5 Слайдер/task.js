document.addEventListener("DOMContentLoaded", () => {
    const sliderItems = document.querySelectorAll(".slider__item");
    const prevButton = document.querySelector(".slider__arrow_prev");
    const nextButton = document.querySelector(".slider__arrow_next");
    const dotsContainer = document.querySelector(".slider__dots");
    const totalSlides = sliderItems.length;

    let currentSlide = 0;

    const setActiveSlide = (index) => {
        sliderItems.forEach((slide, idx) => {
            slide.classList.toggle("slider__item_active", idx === index);
        });

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll(".slider__dot");
            dots.forEach((dot, idx) => {
                dot.classList.toggle("slider__dot_active", idx === index);
            });
        }
    };

    const goToNextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        setActiveSlide(currentSlide);
    };


    const goToPrevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        setActiveSlide(currentSlide);
    };

    prevButton.addEventListener("click", goToPrevSlide);
    nextButton.addEventListener("click", goToNextSlide);

    if (dotsContainer) {
        Array.from(dotsContainer.children);
        sliderItems.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.className = "slider__dot";
            if (idx === currentSlide) {
                dot.classList.add("slider__dot_active");
            }
            dot.addEventListener("click", () => {
                currentSlide = idx;
                setActiveSlide(currentSlide);
            });
            dotsContainer.appendChild(dot);
        });
    }
});
