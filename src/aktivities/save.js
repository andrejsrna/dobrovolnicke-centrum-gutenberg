/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * React Icons import - importing common icon sets
 */
import {
	FaRegStar, FaStar, FaHeart, FaThumbsUp, FaHandsHelping, FaUsers,
	FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaBook, FaPencilAlt,
	FaLaptop, FaGraduationCap, FaChalkboardTeacher, FaChild, FaSeedling,
	FaLeaf, FaTree, FaBriefcase, FaSmile, FaRocket, FaLink, FaClock,
	FaBullhorn, FaPhone, FaEnvelope, FaGlobe, FaArrowRight
} from 'react-icons/fa';

// Icon component mapping
const ICON_COMPONENTS = {
	FaRegStar, FaStar, FaHeart, FaThumbsUp, FaHandsHelping, FaUsers,
	FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaBook, FaPencilAlt,
	FaLaptop, FaGraduationCap, FaChalkboardTeacher, FaChild, FaSeedling,
	FaLeaf, FaTree, FaBriefcase, FaSmile, FaRocket, FaLink, FaClock,
	FaBullhorn, FaPhone, FaEnvelope, FaGlobe
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
		activities = [],
		columns,
		textAlignment,
		textColor,
		accentColor,
		sectionTitle,
		sectionDescription,
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
		className: `text-align-${textAlignment} columns-${columns} ${useCustomBackground ? 'has-background' : ''}`,
		style: {
			'--activity-text-color': textColor,
			'--activity-accent-color': accentColor,
			'--activity-background-color': useCustomBackground ? (backgroundColor || '#093e52') : 'transparent',
			'--activity-button-color': buttonColor,
			'--activity-button-text-color': buttonTextColor,
		}
	});

	// Render the icon component
	const renderIcon = (iconName) => {
		const IconComponent = ICON_COMPONENTS[iconName];
		if (!IconComponent) return null;

		return <IconComponent />;
	};

	return (
		<div {...blockProps}>
			{(sectionTitle || sectionDescription) && (
				<div className="activities-section-header">
					{sectionTitle && (
						<RichText.Content
							tagName="h2"
							className="activities-section-title"
							value={sectionTitle}
						/>
					)}

					{sectionDescription && (
						<RichText.Content
							tagName="p"
							className="activities-section-description"
							value={sectionDescription}
						/>
					)}
				</div>
			)}

			{activities.length > 0 && (
				<div className="activities-container">
					{activities.map((activity) => (
						<div key={activity.id} className="activity-item">
							<div className="activity-content">
								<div className="activity-icon">
									{renderIcon(activity.icon)}
								</div>

								<RichText.Content
									tagName="h3"
									className="activity-title"
									value={activity.title}
								/>

								<RichText.Content
									tagName="p"
									className="activity-description"
									value={activity.description}
								/>
							</div>
						</div>
					))}
				</div>
			)}

			{showButton && (
				<div className="activity-button-container">
					<a
						href={buttonUrl || '#'}
						className="activity-button"
						target={buttonNewTab ? '_blank' : undefined}
						rel={buttonNewTab ? 'noopener noreferrer' : undefined}
					>
						<span>{buttonText || 'Zobraziť všetky aktivity'}</span>
						<FaArrowRight className="button-icon" />
					</a>
				</div>
			)}
		</div>
	);
}
