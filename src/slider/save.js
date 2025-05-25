/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
// import defaultIcons from './icons'; // Removed old icon import

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

	// Function to get the icon component for a specific icon name - REMOVED
	// const getIconComponent = (iconName) => {
	// 	return iconName && defaultIcons[iconName] ? defaultIcons[iconName] : null;
	// };

	// Helper function to generate Font Awesome icon HTML
	const renderFontAwesomeIcon = (iconName) => {
		if (!iconName || typeof iconName !== 'string') return null;

		let iconClasses = iconName;
		// If iconName doesn't have a prefix like 'fa-', assume it's just the icon name
		// and prepend the default 'fas fa-' for solid icons.
		if (!iconName.includes('fa-') && !iconName.includes(' ')) {
			iconClasses = `fas fa-${iconName}`;
		} else if (iconName.includes(' ') && !iconName.startsWith('fa')) {
		    // Handles cases like "fas coffee" -> should be "fas fa-coffee"
            const parts = iconName.split(' ');
            if (parts.length === 2 && !parts[1].startsWith('fa-')) {
                iconClasses = `${parts[0]} fa-${parts[1]}`;
            }
        }
		// For names like "user" -> <i class="fas fa-user"></i>
		// For names like "fas fa-coffee" -> <i class="fas fa-coffee"></i>
		return <i className={iconClasses}></i>;
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
												{renderFontAwesomeIcon(slide.defaultIcon)}
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
