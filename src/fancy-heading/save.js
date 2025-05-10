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
		description,
		textAlignment,
		textColor,
		accentColor
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `text-align-${textAlignment}`,
		style: {
			'--fancy-text-color': textColor,
			'--fancy-accent-color': accentColor,
		}
	});

	return (
		<div {...blockProps}>
			<div className="fancy-heading-container">
				<RichText.Content
					tagName="h2"
					className="fancy-heading-title"
					value={title}
				/>
				<RichText.Content
					tagName="p"
					className="fancy-heading-description"
					value={description}
				/>
			</div>
		</div>
	);
}
