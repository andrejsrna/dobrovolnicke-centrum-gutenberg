import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
	const sliderBlocks = document.querySelectorAll('.wp-block-create-block-slider .swiper');

	sliderBlocks.forEach((sliderElement) => {
		new Swiper(sliderElement, {
			modules: [Navigation, Pagination],
			loop: true,
			grabCursor: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	});

	if (sliderBlocks.length > 0) {
		console.log(`Slider block(s) initialized with Swiper.js (${sliderBlocks.length} instance(s)).`);
	}
});
