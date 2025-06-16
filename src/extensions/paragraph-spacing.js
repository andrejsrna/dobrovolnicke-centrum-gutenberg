console.log('CUSTOM BLOCK SPACING MODULE LOADED - BUILD CHECK');

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalBoxControl as BoxControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const MARGIN_ATTRIBUTE_NAME = 'customMargin';
const PADDING_ATTRIBUTE_NAME = 'customPadding';
const DISABLE_PADDING_ATTRIBUTE_NAME = 'disablePadding';

// Zoznam blokov, pre ktoré chceme pridať odsadenie
const SUPPORTED_BLOCKS = ['core/paragraph', 'core/columns'];

/**
 * Pridá atribúty pre margin a padding do podporovaných blokov.
 */
function addSpacingAttributes(settings, name) {
	if (!SUPPORTED_BLOCKS.includes(name)) {
		return settings;
	}

	const newAttributes = {
		...settings.attributes,
		[MARGIN_ATTRIBUTE_NAME]: {
			type: 'object',
			default: {},
		},
	};

	if (name === 'core/columns') {
		newAttributes[DISABLE_PADDING_ATTRIBUTE_NAME] = {
			type: 'boolean',
			default: false,
		};
	} else {
		newAttributes[PADDING_ATTRIBUTE_NAME] = {
			type: 'object',
			default: {},
		};
	}

	return {
		...settings,
		attributes: newAttributes,
	};
}

/**
 * Komponent vyššieho rádu, ktorý pridáva ovládacie prvky pre margin a padding.
 */
const withSpacingControl = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!SUPPORTED_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes, name } = props;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls group="dimensions">
					<PanelBody title={__('Odsadenie', 'slider')} initialOpen={false}>
						<BoxControl
							label={__('Margin', 'slider')}
							values={attributes[MARGIN_ATTRIBUTE_NAME]}
							onChange={(value) => setAttributes({ [MARGIN_ATTRIBUTE_NAME]: value })}
							sides={['top', 'right', 'bottom', 'left']}
							units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, {value: 'rem', label: 'rem'}, {value: 'vw', label: 'vw'}, {value: 'vh', label: 'vh'}]}
							allowReset
						/>
						{name === 'core/columns' ? (
							<ToggleControl
								label={__('Vypnúť paddingy', 'slider')}
								checked={!!attributes[DISABLE_PADDING_ATTRIBUTE_NAME]}
								onChange={(value) => setAttributes({ [DISABLE_PADDING_ATTRIBUTE_NAME]: value })}
								help={
									attributes[DISABLE_PADDING_ATTRIBUTE_NAME]
										? __('Vlastné paddingy sú vypnuté (nastavené na 0).', 'slider')
										: __('Zachovať pôvodné paddingy bloku.', 'slider')
								}
							/>
						) : (
							<BoxControl
								label={__('Padding', 'slider')}
								values={attributes[PADDING_ATTRIBUTE_NAME]}
								onChange={(value) => setAttributes({ [PADDING_ATTRIBUTE_NAME]: value })}
								sides={['top', 'right', 'bottom', 'left']}
								units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, {value: 'rem', label: 'rem'}, {value: 'vw', label: 'vw'}, {value: 'vh', label: 'vh'}]}
								allowReset
							/>
						)}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withSpacingControl');

/**
 * Aplikuje štýly pre margin a padding na wrapper element bloku pri ukladaní.
 */
function applySpacingStylesToSave(extraProps, blockType, attributes) {
	if (!SUPPORTED_BLOCKS.includes(blockType.name)) {
		return extraProps;
	}

	const margin = attributes[MARGIN_ATTRIBUTE_NAME];
	const padding = attributes[PADDING_ATTRIBUTE_NAME];
	const newStyles = { ...extraProps.style };

	if (margin) {
		if (margin.top) newStyles.marginTop = margin.top;
		if (margin.right) newStyles.marginRight = margin.right;
		if (margin.bottom) newStyles.marginBottom = margin.bottom;
		if (margin.left) newStyles.marginLeft = margin.left;
	}

	if (blockType.name === 'core/columns' && attributes[DISABLE_PADDING_ATTRIBUTE_NAME]) {
		newStyles.paddingTop = '0px';
		newStyles.paddingRight = '0px';
		newStyles.paddingBottom = '0px';
		newStyles.paddingLeft = '0px';
	} else if (padding) {
		if (padding.top) newStyles.paddingTop = padding.top;
		if (padding.right) newStyles.paddingRight = padding.right;
		if (padding.bottom) newStyles.paddingBottom = padding.bottom;
		if (padding.left) newStyles.paddingLeft = padding.left;
	}

	return { ...extraProps, style: newStyles };
}

addFilter('blocks.registerBlockType', 'slider/add-spacing-attributes', addSpacingAttributes);
addFilter('editor.BlockEdit', 'slider/with-spacing-control', withSpacingControl);
addFilter('blocks.getSaveContent.extraProps', 'slider/apply-spacing-styles-to-save', applySpacingStylesToSave);
