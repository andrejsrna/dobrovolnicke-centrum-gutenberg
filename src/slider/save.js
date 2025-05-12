/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import defaultIcons from './icons';

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

	// Function to get the icon component for a specific icon name
	const getIconComponent = (iconName) => {
		return iconName && defaultIcons[iconName] ? defaultIcons[iconName] : null;
	};

	return (
		<div {...blockProps}>
			{/* Main Swiper container */}
			<div className="slider-container swiper">
				{/* Additional required wrapper */}
				<div className="swiper-wrapper">
					{slides.map((slide, index) => (
						// Each slide
						<div
							key={slide.id || index}
							className={`swiper-slide ${!slide.useBackgroundImage ? `color-scheme-${slide.colorScheme || 'yellow-orange'}` : 'has-background-image'}`}
							style={slide.useBackgroundImage && slide.backgroundImageUrl ? {
								backgroundImage: `url(${slide.backgroundImageUrl})`,
							} : {}}
						>
							<div className="slide-inner-container">
								<div className="slide-content">
									<h3 className="slide-title">{slide.title}</h3>
									<p className="slide-description">{slide.description}</p>
									{slide.buttonText && slide.buttonLink && (
										<a href={slide.buttonLink} className="slide-button">
											{slide.buttonText}
										</a>
									)}
								</div>
								{!slide.useBackgroundImage && (
									<div className="slide-image">
										{slide.imageUrl ? (
											<img src={slide.imageUrl} alt={slide.title || ''} />
										) : slide.defaultIcon ? (
											<div className="default-icon">
												{getIconComponent(slide.defaultIcon)}
											</div>
										) : null}
									</div>
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
