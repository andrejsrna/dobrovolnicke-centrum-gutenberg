import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const initSwipers = () => {
    // Select only the main block containers
    const sliderBlocks = document.querySelectorAll('.wp-block-create-block-slider');

    sliderBlocks.forEach((sliderElement, index) => {
        // Find the swiper container *within* this block
        const swiperEl = sliderElement.querySelector('.swiper');

        // If no swiper container found, or it's already initialized, skip
        if (!swiperEl || swiperEl.classList.contains('swiper-initialized')) {
            return;
        }

        try {
            new Swiper(swiperEl, {
                modules: [Navigation, Pagination],
                loop: true,
                grabCursor: true,
                autoHeight: true,
                navigation: {
                    // Ensure buttons are queried within the specific swiperEl
                    nextEl: swiperEl.querySelector('.swiper-button-next'),
                    prevEl: swiperEl.querySelector('.swiper-button-prev'),
                },
                pagination: {
                    // Ensure pagination is queried within the specific swiperEl
                    el: swiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                },
            });

            // Mark this specific swiper container as initialized
            swiperEl.classList.add('swiper-initialized');

        } catch (error) {
            console.error(`Error initializing slider #${index + 1}:`, error);
        }
    });
};

// Remove redundant initialization logic
// const initSliders = () => {
// 	initSwipers();
// 	setTimeout(initSwipers, 500);
// };

// Initialize only once on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initSwipers);
// Remove window.load listener
// window.addEventListener('load', initSwipers);
