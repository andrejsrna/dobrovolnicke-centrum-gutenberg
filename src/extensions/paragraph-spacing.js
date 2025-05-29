console.log('CUSTOM BLOCK SPACING MODULE LOADED - BUILD CHECK');

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const MARGIN_ATTRIBUTE_NAME = 'customMargin';
const PADDING_ATTRIBUTE_NAME = 'customPadding';

// Zoznam blokov, pre ktoré chceme pridať odsadenie
const SUPPORTED_BLOCKS = ['core/paragraph', 'core/columns'];

/**
 * Pridá atribúty pre margin a padding do podporovaných blokov.
 */
function addSpacingAttributes(settings, name) {
    if (!SUPPORTED_BLOCKS.includes(name)) {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            [MARGIN_ATTRIBUTE_NAME]: {
                type: 'object',
                default: {},
            },
            [PADDING_ATTRIBUTE_NAME]: {
                type: 'object',
                default: {},
            },
        },
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

        const { attributes, setAttributes } = props;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls group="dimensions">
                    <PanelBody title={__('Odsadenie (Margin & Padding)', 'slider')} initialOpen={false}>
                        <BoxControl
                            label={__('Margin', 'slider')}
                            values={attributes[MARGIN_ATTRIBUTE_NAME]}
                            onChange={(value) => setAttributes({ [MARGIN_ATTRIBUTE_NAME]: value })}
                            sides={['top', 'right', 'bottom', 'left']}
                            units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, {value: 'rem', label: 'rem'}, {value: 'vw', label: 'vw'}, {value: 'vh', label: 'vh'}]}
                            allowReset
                        />
                        <BoxControl
                            label={__('Padding', 'slider')}
                            values={attributes[PADDING_ATTRIBUTE_NAME]}
                            onChange={(value) => setAttributes({ [PADDING_ATTRIBUTE_NAME]: value })}
                            sides={['top', 'right', 'bottom', 'left']}
                            units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, {value: 'rem', label: 'rem'}, {value: 'vw', label: 'vw'}, {value: 'vh', label: 'vh'}]}
                            allowReset
                        />
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
    if (padding) {
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