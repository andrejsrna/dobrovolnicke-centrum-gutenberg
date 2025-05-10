/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { FaArrowRight } from 'react-icons/fa';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const {
		sectionTitle,
		sectionDescription,
		textAlignment,
		textColor,
		accentColor,
		useCustomBackground,
		backgroundColor,
		buttonText,
		buttonUrl,
		buttonNewTab,
		showButton,
		buttonColor,
		buttonTextColor
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `text-align-${textAlignment} ${useCustomBackground ? 'has-background' : ''}`,
		style: {
			'--post-text-color': textColor,
			'--post-accent-color': accentColor,
			'--post-background-color': useCustomBackground ? (backgroundColor || '#f5f5f5') : 'transparent',
			'--post-button-color': buttonColor,
			'--post-button-text-color': buttonTextColor,
		}
	});

	return (
		<div {...blockProps}>
			<div className="recent-posts-section-header">
				{sectionTitle && (
					<RichText.Content
						tagName="h2"
						className="recent-posts-section-title"
						value={sectionTitle}
					/>
				)}

				{sectionDescription && (
					<RichText.Content
						tagName="p"
						className="recent-posts-section-description"
						value={sectionDescription}
					/>
				)}
			</div>

			{/*
				Posts container - content will be loaded dynamically by the server render callback.
				We just define the container here for consistent styling.
			*/}
			<div className="recent-posts-container">
				{/* Posts will be rendered here */}
			</div>

			{showButton && (
				<div className="post-button-container">
					<a
						href={buttonUrl || '#'}
						className="post-button"
						target={buttonNewTab ? '_blank' : undefined}
						rel={buttonNewTab ? 'noopener noreferrer' : undefined}
					>
						<span>{buttonText || 'Všetky články'}</span>
						<FaArrowRight className="button-icon" />
					</a>
				</div>
			)}
		</div>
	);
}
