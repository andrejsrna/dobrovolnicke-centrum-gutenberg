/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

/**
 * React Icons import
 */
import {
	FaPhone, FaMobileAlt, FaEnvelope, FaMapMarkerAlt, FaClock,
	FaCalendarAlt, FaUser, FaUsers, FaBuilding, FaGlobe,
} from 'react-icons/fa';

/**
 * Internal dependencies
 */
import './editor.scss';

// Dostupné ikony
const ICON_OPTIONS = [
	{ label: __('Telefón', 'slider'), value: 'phone' },
	{ label: __('Mobil', 'slider'), value: 'mobile' },
	{ label: __('Email', 'slider'), value: 'mail' },
	{ label: __('Lokalita', 'slider'), value: 'location' },
	{ label: __('Hodiny', 'slider'), value: 'hours' },
	{ label: __('Kalendár', 'slider'), value: 'calendar' },
	{ label: __('Osoba', 'slider'), value: 'person' },
	{ label: __('Skupina', 'slider'), value: 'group' },
	{ label: __('Budova', 'slider'), value: 'building' },
	{ label: __('Web', 'slider'), value: 'web' },
];

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
		imageId,
		imageUrl,
		imageAlt,
	} = attributes;

	const blockProps = useBlockProps({
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
		<>
			<InspectorControls>
				<PanelBody title={__('Nastavenia obrázka', 'slider')}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									imageId: media.id,
									imageUrl: media.url,
									imageAlt: media.alt || '',
								});
							}}
							allowedTypes={['image']}
							value={imageId}
							render={({ open }) => (
								<div>
									{!imageUrl ? (
										<Button
											onClick={open}
											variant="secondary"
											className="editor-konzultacie-image-button"
										>
											{__('Vybrať obrázok', 'slider')}
										</Button>
									) : (
										<div>
											<img
												src={imageUrl}
												alt={imageAlt}
												style={{
													maxWidth: '100%',
													marginBottom: '10px',
													borderRadius: '4px'
												}}
											/>
											<div style={{ display: 'flex', gap: '8px' }}>
												<Button
													onClick={open}
													variant="secondary"
												>
													{__('Zmeniť obrázok', 'slider')}
												</Button>
												<Button
													onClick={() => setAttributes({
														imageId: undefined,
														imageUrl: undefined,
														imageAlt: '',
													})}
													variant="tertiary"
													isDestructive
												>
													{__('Odstrániť', 'slider')}
												</Button>
											</div>
										</div>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
					{imageUrl && (
						<TextControl
							label={__('Alternatívny text obrázka', 'slider')}
							value={imageAlt}
							onChange={(value) => setAttributes({ imageAlt: value })}
							help={__('Popis obrázka pre čítačky obrazovky', 'slider')}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Nastavenia textových polí', 'slider')}>
					<SelectControl
						label={__('Ikona pre pole 1', 'slider')}
						value={field1Icon}
						options={ICON_OPTIONS}
						onChange={(value) => setAttributes({ field1Icon: value })}
					/>

					<SelectControl
						label={__('Ikona pre pole 2', 'slider')}
						value={field2Icon}
						options={ICON_OPTIONS}
						onChange={(value) => setAttributes({ field2Icon: value })}
					/>

					<SelectControl
						label={__('Ikona pre pole 3', 'slider')}
						value={field3Icon}
						options={ICON_OPTIONS}
						onChange={(value) => setAttributes({ field3Icon: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Nastavenia tlačidla', 'slider')}>
					<TextControl
						label={__('Text tlačidla', 'slider')}
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<TextControl
						label={__('URL tlačidla', 'slider')}
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
					<ToggleControl
						label={__('Otvoriť v novom okne', 'slider')}
						checked={buttonNewTab}
						onChange={(value) => setAttributes({ buttonNewTab: value })}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Nastavenia farieb', 'slider')}
					initialOpen={true}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
							label: __('Farba pozadia', 'slider'),
						},
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
						{
							value: buttonColor,
							onChange: (color) => setAttributes({ buttonColor: color }),
							label: __('Farba tlačidla', 'slider'),
						},
						{
							value: buttonTextColor,
							onChange: (color) => setAttributes({ buttonTextColor: color }),
							label: __('Farba textu tlačidla', 'slider'),
						},
					]}
				/>
			</InspectorControls>

			<div {...blockProps}>
				<div className="konzultacie-container">
					<div className="konzultacie-content">
						<RichText
							tagName="h2"
							className="konzultacie-title"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Zadajte nadpis...', 'slider')}
							allowedFormats={['core/bold', 'core/italic']}
						/>

						<RichText
							tagName="p"
							className="konzultacie-description"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder={__('Zadajte popis...', 'slider')}
							allowedFormats={['core/bold', 'core/italic', 'core/link']}
						/>

						<div className="konzultacie-fields">
							<div className="konzultacie-field field-1">
								{renderIcon(field1Icon)}
								<div className="field-content">
									<RichText
										tagName="span"
										className="field-bold"
										value={field1Bold}
										onChange={(value) => setAttributes({ field1Bold: value })}
										placeholder={__('Zvýraznený text...', 'slider')}
										allowedFormats={[]}
									/>
									<RichText
										tagName="span"
										className="field-text"
										value={field1Text}
										onChange={(value) => setAttributes({ field1Text: value })}
										placeholder={__('Normálny text...', 'slider')}
										allowedFormats={[]}
									/>
								</div>
							</div>

							<div className="konzultacie-field field-2">
								{renderIcon(field2Icon)}
								<div className="field-content">
									<RichText
										tagName="span"
										className="field-bold"
										value={field2Bold}
										onChange={(value) => setAttributes({ field2Bold: value })}
										placeholder={__('Zvýraznený text...', 'slider')}
										allowedFormats={[]}
									/>
									<RichText
										tagName="span"
										className="field-text"
										value={field2Text}
										onChange={(value) => setAttributes({ field2Text: value })}
										placeholder={__('Normálny text...', 'slider')}
										allowedFormats={[]}
									/>
								</div>
							</div>

							<div className="konzultacie-field field-3">
								{renderIcon(field3Icon)}
								<div className="field-content">
									<RichText
										tagName="span"
										className="field-bold"
										value={field3Bold}
										onChange={(value) => setAttributes({ field3Bold: value })}
										placeholder={__('Zvýraznený text...', 'slider')}
										allowedFormats={[]}
									/>
									<RichText
										tagName="span"
										className="field-text"
										value={field3Text}
										onChange={(value) => setAttributes({ field3Text: value })}
										placeholder={__('Normálny text...', 'slider')}
										allowedFormats={[]}
									/>
								</div>
							</div>
						</div>

						<div className="konzultacie-button-container">
							<button
								className="konzultacie-button"
								type="button"
							>
								{buttonText || __('Kontaktovať nás', 'slider')}
							</button>
						</div>
					</div>

					{imageUrl && (
						<div className="konzultacie-image">
							<img src={imageUrl} alt={imageAlt} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
