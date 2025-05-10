/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
		title,
		buttonText,
		buttonUrl,
		buttonNewTab,
		backgroundColor,
		textColor,
		buttonColor,
		buttonTextColor,
		textAlignment,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `text-align-${textAlignment}`,
		style: {
			'--cta-background-color': backgroundColor,
			'--cta-text-color': textColor,
			'--cta-button-background': buttonColor,
			'--cta-button-text-color': buttonTextColor,
		}
	});

	return (
		<div {...blockProps}>
			<div className="cta-container">
				<RichText.Content
					tagName="h2"
					className="cta-title"
					value={title}
				/>

				<div className="cta-button-container">
					<a
						className="cta-button"
						href={buttonUrl || '#'}
						target={buttonNewTab ? '_blank' : '_self'}
						rel={buttonNewTab ? 'noopener noreferrer' : undefined}
					>
						{buttonText || 'Kliknite sem'}
					</a>
				</div>
			</div>
		</div>
	);
}
