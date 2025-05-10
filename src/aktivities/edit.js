/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	TextControl,
	SelectControl,
	__experimentalGrid as Grid,
} from '@wordpress/components';

/**
 * React Icons import - importing common icon sets
 */
import {
	FaRegStar, FaStar, FaHeart, FaThumbsUp, FaHandsHelping, FaUsers,
	FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaBook, FaPencilAlt,
	FaLaptop, FaGraduationCap, FaChalkboardTeacher, FaChild, FaSeedling,
	FaLeaf, FaTree, FaBriefcase, FaSmile, FaRocket, FaLink, FaClock,
	FaBullhorn, FaPhone, FaEnvelope, FaGlobe
} from 'react-icons/fa';

/**
 * Internal dependencies
 */
import './editor.scss';

// Icon options for the dropdown
const ICON_OPTIONS = [
	{ label: __('Star (outlined)', 'slider'), value: 'FaRegStar' },
	{ label: __('Star', 'slider'), value: 'FaStar' },
	{ label: __('Heart', 'slider'), value: 'FaHeart' },
	{ label: __('Thumbs Up', 'slider'), value: 'FaThumbsUp' },
	{ label: __('Helping Hands', 'slider'), value: 'FaHandsHelping' },
	{ label: __('Group', 'slider'), value: 'FaUsers' },
	{ label: __('Calendar', 'slider'), value: 'FaCalendarAlt' },
	{ label: __('Location', 'slider'), value: 'FaMapMarkerAlt' },
	{ label: __('University', 'slider'), value: 'FaUniversity' },
	{ label: __('Book', 'slider'), value: 'FaBook' },
	{ label: __('Pencil', 'slider'), value: 'FaPencilAlt' },
	{ label: __('Laptop', 'slider'), value: 'FaLaptop' },
	{ label: __('Graduation Cap', 'slider'), value: 'FaGraduationCap' },
	{ label: __('Teacher', 'slider'), value: 'FaChalkboardTeacher' },
	{ label: __('Child', 'slider'), value: 'FaChild' },
	{ label: __('Seedling', 'slider'), value: 'FaSeedling' },
	{ label: __('Leaf', 'slider'), value: 'FaLeaf' },
	{ label: __('Tree', 'slider'), value: 'FaTree' },
	{ label: __('Briefcase', 'slider'), value: 'FaBriefcase' },
	{ label: __('Smile', 'slider'), value: 'FaSmile' },
	{ label: __('Rocket', 'slider'), value: 'FaRocket' },
	{ label: __('Link', 'slider'), value: 'FaLink' },
	{ label: __('Clock', 'slider'), value: 'FaClock' },
	{ label: __('Bullhorn', 'slider'), value: 'FaBullhorn' },
	{ label: __('Phone', 'slider'), value: 'FaPhone' },
	{ label: __('Email', 'slider'), value: 'FaEnvelope' },
	{ label: __('Globe', 'slider'), value: 'FaGlobe' },
];

// Icon component mapping
const ICON_COMPONENTS = {
	FaRegStar, FaStar, FaHeart, FaThumbsUp, FaHandsHelping, FaUsers,
	FaCalendarAlt, FaMapMarkerAlt, FaUniversity, FaBook, FaPencilAlt,
	FaLaptop, FaGraduationCap, FaChalkboardTeacher, FaChild, FaSeedling,
	FaLeaf, FaTree, FaBriefcase, FaSmile, FaRocket, FaLink, FaClock,
	FaBullhorn, FaPhone, FaEnvelope, FaGlobe
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		activities = [],
		columns,
		textAlignment,
		textColor,
		accentColor
	} = attributes;

	const blockProps = useBlockProps({
		className: `text-align-${textAlignment} columns-${columns}`,
		style: {
			'--activity-text-color': textColor,
			'--activity-accent-color': accentColor,
		}
	});

	const addActivity = () => {
		const newActivities = [
			...activities,
			{
				id: `activity-${new Date().getTime()}`,
				icon: 'FaStar',
				title: '',
				description: '',
			},
		];
		setAttributes({ activities: newActivities });
	};

	const updateActivity = (index, key, value) => {
		const newActivities = activities.map((activity, i) => {
			if (i === index) {
				return { ...activity, [key]: value };
			}
			return activity;
		});
		setAttributes({ activities: newActivities });
	};

	const removeActivity = (index) => {
		const newActivities = activities.filter((_, i) => i !== index);
		setAttributes({ activities: newActivities });
	};

	// Render the icon component
	const renderIcon = (iconName) => {
		const IconComponent = ICON_COMPONENTS[iconName];
		if (!IconComponent) return null;

		return <IconComponent size={24} />;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Nastavenia aktivít', 'slider')}>
					<Button
						variant="primary"
						onClick={addActivity}
						className="activity-add-button"
					>
						{__('Pridať aktivitu', 'slider')}
					</Button>

					<RangeControl
						label={__('Počet stĺpcov', 'slider')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={1}
						max={4}
					/>

					<PanelColorSettings
						title={__('Nastavenia farieb', 'slider')}
						initialOpen={true}
						colorSettings={[
							{
								value: textColor,
								onChange: (color) => setAttributes({ textColor: color }),
								label: __('Farba textu', 'slider'),
							},
							{
								value: accentColor,
								onChange: (color) => setAttributes({ accentColor: color }),
								label: __('Farba ikon a zvýraznenia', 'slider'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={(alignment) => setAttributes({ textAlignment: alignment })}
				/>
			</BlockControls>

			<div {...blockProps}>
				{activities.length === 0 ? (
					<div className="activities-placeholder">
						<p>
							{__('Zatiaľ nebola pridaná žiadna aktivita.', 'slider')}
						</p>
						<Button
							variant="primary"
							onClick={addActivity}
						>
							{__('Pridať aktivitu', 'slider')}
						</Button>
					</div>
				) : (
					<div className="activities-container">
						{activities.map((activity, index) => (
							<div key={activity.id} className="activity-item">
								<div className="activity-editor-controls">
									<SelectControl
										label={__('Vyber ikonu', 'slider')}
										value={activity.icon}
										options={ICON_OPTIONS}
										onChange={(value) => updateActivity(index, 'icon', value)}
									/>

									<Button
										variant="secondary"
										onClick={() => removeActivity(index)}
										isDestructive
										className="activity-remove-button"
									>
										{__('Odstrániť', 'slider')}
									</Button>
								</div>

								<div className="activity-content">
									<div className="activity-icon">
										{renderIcon(activity.icon)}
									</div>

									<RichText
										tagName="h3"
										className="activity-title"
										value={activity.title}
										onChange={(content) => updateActivity(index, 'title', content)}
										placeholder={__('Názov aktivity...', 'slider')}
										allowedFormats={['core/bold', 'core/italic']}
									/>

									<RichText
										tagName="p"
										className="activity-description"
										value={activity.description}
										onChange={(content) => updateActivity(index, 'description', content)}
										placeholder={__('Popis aktivity...', 'slider')}
										allowedFormats={['core/bold', 'core/italic', 'core/link']}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
