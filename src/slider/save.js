/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props Props
 * @param {Object} props.attributes Attributes
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { slides = [] } = attributes;

	return (
		<div {...blockProps}>
			{/* Main Swiper container */}
			<div className="slider-container swiper">
				{/* Additional required wrapper */}
				<div className="swiper-wrapper">
					{slides.map((slide, index) => (
						// Each slide
						<div key={slide.id || index} className="swiper-slide">
							<div className="slide-inner-container">
								<RichText.Content tagName="h3" className="slide-title" value={slide.title} />
								<RichText.Content tagName="p" className="slide-description" value={slide.description} />
								{slide.buttonText && slide.buttonLink && (
									<a href={slide.buttonLink} className="slide-button">
										{slide.buttonText}
									</a>
								)}
							</div>
						</div>
					))}
				</div>
				{/* Optional: Add pagination */}
				{slides.length > 1 && <div className="swiper-pagination"></div>}

				{/* Optional: Add navigation buttons */}
				{slides.length > 1 && (
					<>
						<div className="swiper-button-prev"></div>
						<div className="swiper-button-next"></div>
					</>
				)}
			</div>
		</div>
	);
}
