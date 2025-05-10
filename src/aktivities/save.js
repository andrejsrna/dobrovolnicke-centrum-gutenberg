/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * React Icons import
 */
import {
	FaRegStar, FaStar, FaHeart, FaThumbsUp, FaHandsHelping, FaUsers,
	FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaBook, FaPencilAlt,
	FaLaptop, FaGraduationCap, FaChalkboardTeacher, FaChild, FaSeedling,
	FaLeaf, FaTree, FaBriefcase, FaSmile, FaRocket, FaLink, FaClock,
	FaBullhorn, FaPhone, FaEnvelope, FaGlobe
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
		accentColor
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `text-align-${textAlignment} columns-${columns}`,
		style: {
			'--activity-text-color': textColor,
			'--activity-accent-color': accentColor,
		}
	});

	// Render the icon component
	const renderIcon = (iconName) => {
		const IconComponent = ICON_COMPONENTS[iconName];
		if (!IconComponent) return null;

		return <IconComponent size={24} />;
	};

	if (activities.length === 0) {
		return <div {...blockProps}></div>;
	}

	return (
		<div {...blockProps}>
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
		</div>
	);
}
