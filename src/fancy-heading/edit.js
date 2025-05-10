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
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Funkcia edit popisuje štruktúru bloku v kontexte editora.
 * Reprezentuje, čo editor vykreslí pri použití bloku.
 *
 * @param {Object}   props               Vlastnosti bloku.
 * @param {Object}   props.attributes    Atribúty bloku.
 * @param {Function} props.setAttributes Funkcia na nastavenie atribútov bloku.
 * @return {WPElement} Element na vykreslenie.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		description,
		textAlignment,
		textColor,
		accentColor
	} = attributes;

	const blockProps = useBlockProps({
		className: `text-align-${textAlignment}`,
		style: {
			'--fancy-text-color': textColor,
			'--fancy-accent-color': accentColor,
		}
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Nastavenia nadpisu', 'slider')}>
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
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={textAlignment}
					onChange={(alignment) => setAttributes({ textAlignment: alignment })}
				/>
			</BlockControls>
			<div {...blockProps}>
				<div className="fancy-heading-container">
					<RichText
						tagName="h2"
						className="fancy-heading-title"
						value={title}
						onChange={(content) => setAttributes({ title: content })}
						placeholder={__('Napíšte nadpis...', 'slider')}
						allowedFormats={['core/bold', 'core/italic']}
					/>
					<RichText
						tagName="p"
						className="fancy-heading-description"
						value={description}
						onChange={(content) => setAttributes({ description: content })}
						placeholder={__('Napíšte popis...', 'slider')}
						allowedFormats={['core/bold', 'core/italic', 'core/link']}
					/>
				</div>
			</div>
		</>
	);
}
