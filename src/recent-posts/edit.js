/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Placeholder,
	Spinner,
	Notice,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import './editor.scss';

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
		sectionTitle,
		sectionDescription,
		postsToShow,
		displayFeaturedImage,
		displayExcerpt,
		displayDate,
		displayAuthor,
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

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Nastavenia obsahu', 'slider')} initialOpen={true}>
					<TextControl
						label={__('Nadpis sekcie', 'slider')}
						value={sectionTitle}
						onChange={(value) => setAttributes({ sectionTitle: value })}
					/>
					<TextControl
						label={__('Popis sekcie', 'slider')}
						value={sectionDescription}
						onChange={(value) => setAttributes({ sectionDescription: value })}
					/>
					<RangeControl
						label={__('Počet článkov', 'slider')}
						value={postsToShow}
						onChange={(value) => setAttributes({ postsToShow: value })}
						min={1}
						max={6}
					/>
					<ToggleControl
						label={__('Zobraziť obrázky', 'slider')}
						checked={displayFeaturedImage}
						onChange={(value) => setAttributes({ displayFeaturedImage: value })}
					/>
					<ToggleControl
						label={__('Zobraziť výňatok', 'slider')}
						checked={displayExcerpt}
						onChange={(value) => setAttributes({ displayExcerpt: value })}
					/>
					<ToggleControl
						label={__('Zobraziť dátum', 'slider')}
						checked={displayDate}
						onChange={(value) => setAttributes({ displayDate: value })}
					/>
					<ToggleControl
						label={__('Zobraziť autora', 'slider')}
						checked={displayAuthor}
						onChange={(value) => setAttributes({ displayAuthor: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Nastavenia vzhľadu', 'slider')}>
					<ToggleControl
						label={__('Použiť vlastné pozadie', 'slider')}
						checked={useCustomBackground}
						onChange={(value) => setAttributes({ useCustomBackground: value })}
					/>

					{useCustomBackground && (
						<PanelColorSettings
							title={__('Farba pozadia', 'slider')}
							initialOpen={true}
							colorSettings={[
								{
									value: backgroundColor || '#f5f5f5',
									onChange: (color) => setAttributes({ backgroundColor: color }),
									label: __('Farba pozadia sekcie', 'slider'),
								},
							]}
						/>
					)}

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
								label: __('Farba zvýraznenia', 'slider'),
							},
						]}
					/>
				</PanelBody>

				<PanelBody title={__('Nastavenia tlačidla', 'slider')}>
					<ToggleControl
						label={__('Zobraziť tlačidlo', 'slider')}
						checked={showButton}
						onChange={(value) => setAttributes({ showButton: value })}
					/>

					{showButton && (
						<>
							<TextControl
								label={__('Text tlačidla', 'slider')}
								value={buttonText}
								onChange={(value) => setAttributes({ buttonText: value })}
							/>
							<TextControl
								label={__('URL odkazu', 'slider')}
								value={buttonUrl}
								onChange={(value) => setAttributes({ buttonUrl: value })}
							/>
							<ToggleControl
								label={__('Otvoriť v novom okne', 'slider')}
								checked={buttonNewTab}
								onChange={(value) => setAttributes({ buttonNewTab: value })}
							/>
							<PanelColorSettings
								title={__('Farby tlačidla', 'slider')}
								initialOpen={true}
								colorSettings={[
									{
										value: buttonColor,
										onChange: (color) => setAttributes({ buttonColor: color }),
										label: __('Farba pozadia tlačidla', 'slider'),
									},
									{
										value: buttonTextColor,
										onChange: (color) => setAttributes({ buttonTextColor: color }),
										label: __('Farba textu tlačidla', 'slider'),
									},
								]}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={(alignment) => setAttributes({ textAlignment: alignment })}
				/>
			</BlockControls>

			<div {...blockProps}>
				<ServerSideRender
					block="create-block/recent-posts"
					attributes={attributes}
					LoadingResponsePlaceholder={() => (
						<Placeholder label={__('Načítavanie najnovších článkov...', 'slider')}>
							<Spinner />
						</Placeholder>
					)}
					EmptyResponsePlaceholder={() => (
						<Placeholder label={__('Žiadne články', 'slider')}>
							<Notice status="warning" isDismissible={false}>
								{__('Nenašli sa žiadne články na zobrazenie.', 'slider')}
							</Notice>
						</Placeholder>
					)}
					ErrorResponsePlaceholder={({ response }) => (
						<Placeholder label={__('Chyba', 'slider')}>
							<Notice status="error" isDismissible={false}>
								{response ? response.message : __('Nastala chyba pri načítavaní článkov.', 'slider')}
							</Notice>
						</Placeholder>
					)}
				/>
			</div>
		</>
	);
}
