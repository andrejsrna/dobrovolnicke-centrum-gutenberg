/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * React Icons import
 */
import {
	FaPhone, FaMobileAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
	FaCalendarAlt, FaUser, FaUsers, FaBuilding, FaGlobe,
} from 'react-icons/fa';

// Mapovanie ikonových komponentov
const ICON_COMPONENTS = {
	phone: FaPhone,
	mobile: FaMobileAlt,
	mail: FaEnvelope,
	location: FaMapMarkerAlt,
	hours: FaClock,
	calendar: FaCalendarAlt,
	person: FaUser,
	group: FaUsers,
	building: FaBuilding,
	web: FaGlobe,
};

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
		field1Icon,
		field1Bold,
		field1Text,
		field2Icon,
		field2Bold,
		field2Text,
		field3Icon,
		field3Bold,
		field3Text,
		buttonText,
		buttonUrl,
		buttonNewTab,
		backgroundColor,
		textColor,
		accentColor,
		buttonColor,
		buttonTextColor,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			'--konzultacie-background': backgroundColor,
			'--konzultacie-text-color': textColor,
			'--konzultacie-accent-color': accentColor,
			'--konzultacie-button-color': buttonColor,
			'--konzultacie-button-text': buttonTextColor,
		}
	});

	// Renderovanie ikony
	const renderIcon = (iconName) => {
		const IconComponent = ICON_COMPONENTS[iconName];
		if (!IconComponent) return null;

		return <IconComponent className="field-icon" />;
	};

	return (
		<div {...blockProps}>
			<div className="konzultacie-container">
				<RichText.Content
					tagName="h2"
					className="konzultacie-title"
					value={title}
				/>

				<RichText.Content
					tagName="p"
					className="konzultacie-description"
					value={description}
				/>

				<div className="konzultacie-fields">
					<div className="konzultacie-field field-1">
						{renderIcon(field1Icon)}
						<div className="field-content">
							<RichText.Content
								tagName="span"
								className="field-bold"
								value={field1Bold}
							/>
							<RichText.Content
								tagName="span"
								className="field-text"
								value={field1Text}
							/>
						</div>
					</div>

					<div className="konzultacie-field field-2">
						{renderIcon(field2Icon)}
						<div className="field-content">
							<RichText.Content
								tagName="span"
								className="field-bold"
								value={field2Bold}
							/>
							<RichText.Content
								tagName="span"
								className="field-text"
								value={field2Text}
							/>
						</div>
					</div>

					<div className="konzultacie-field field-3">
						{renderIcon(field3Icon)}
						<div className="field-content">
							<RichText.Content
								tagName="span"
								className="field-bold"
								value={field3Bold}
							/>
							<RichText.Content
								tagName="span"
								className="field-text"
								value={field3Text}
							/>
						</div>
					</div>
				</div>

				<div className="konzultacie-button-container">
					<a
						className="konzultacie-button"
						href={buttonUrl || '#'}
						target={buttonNewTab ? '_blank' : '_self'}
						rel={buttonNewTab ? 'noopener noreferrer' : undefined}
					>
						{buttonText || 'Kontaktovať nás'}
					</a>
				</div>
			</div>
		</div>
	);
}
