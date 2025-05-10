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
	TextControl,
	ToggleControl,
} from '@wordpress/components';

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

	const blockProps = useBlockProps({
		className: `text-align-${textAlignment}`,
		style: {
			'--cta-background-color': backgroundColor,
			'--cta-text-color': textColor,
			'--cta-button-background': buttonColor,
			'--cta-button-text-color': buttonTextColor,
		}
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Nastavenia tlačidla', 'slider')}>
					<TextControl
						label={__('URL odkazu', 'slider')}
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
						placeholder={__('Zadajte URL pre odkaz tlačidla', 'slider')}
					/>
					<TextControl
						label={__('Text tlačidla', 'slider')}
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
						placeholder={__('Zadajte text tlačidla', 'slider')}
					/>
					<ToggleControl
						label={__('Otvoriť odkaz v novom okne', 'slider')}
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
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={(value) => setAttributes({ textAlignment: value })}
				/>
			</BlockControls>

			<div {...blockProps}>
				<div className="cta-container">
					<RichText
						tagName="h2"
						className="cta-title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Zadajte nadpis výzvy...', 'slider')}
						allowedFormats={['core/bold', 'core/italic']}
					/>

					<div className="cta-button-container">
						<span
							className="cta-button"
							role="button"
							tabIndex="0"
						>
							{buttonText || __('Kliknite sem', 'slider')}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
