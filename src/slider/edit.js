/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	TextareaControl,
	ToggleControl,
	TabPanel,
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

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
 * @return {Element} Element na vykreslenie.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { slides = [] } = attributes;
	const [previewMode, setPreviewMode] = useState(false);

	const addSlide = () => {
		const newSlides = [
			...slides,
			{
				id: `slide-${new Date().getTime()}`,
				title: '',
				description: '',
				buttonText: '',
				buttonLink: '',
			},
		];
		setAttributes({ slides: newSlides });
	};

	const updateSlide = (index, key, value) => {
		const newSlides = slides.map((slide, i) => {
			if (i === index) {
				return { ...slide, [key]: value };
			}
			return slide;
		});
		setAttributes({ slides: newSlides });
	};

	const removeSlide = (index) => {
		const newSlides = slides.filter((_, i) => i !== index);
		setAttributes({ slides: newSlides });
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Nastavenia slidera', 'slider')}>
					<Button variant="primary" onClick={addSlide}>
						{__('Pridať slide', 'slider')}
					</Button>
					<ToggleControl
						label={__('Náhľad', 'slider')}
						checked={previewMode}
						onChange={() => setPreviewMode(!previewMode)}
						help={__('Prepnúť medzi úpravou a náhľadom', 'slider')}
					/>
				</PanelBody>
			</InspectorControls>

			{!previewMode ? (
				<div className="slider-editor-container">
					{slides.map((slide, index) => (
						<div key={slide.id} className="slide-editor-item">
							<TextControl
								label={__('Nadpis slidu', 'slider')}
								value={slide.title}
								onChange={(value) => updateSlide(index, 'title', value)}
								placeholder={__('Zadajte nadpis slidu', 'slider')}
							/>
							<TextareaControl
								label={__('Popis slidu', 'slider')}
								value={slide.description}
								onChange={(value) =>
									updateSlide(index, 'description', value)
								}
								placeholder={__('Zadajte popis slidu', 'slider')}
							/>
							<TextControl
								label={__('Text tlačidla', 'slider')}
								value={slide.buttonText}
								onChange={(value) =>
									updateSlide(index, 'buttonText', value)
								}
								placeholder={__('Zadajte text tlačidla (voliteľné)', 'slider')}
							/>
							<TextControl
								label={__('Odkaz tlačidla', 'slider')}
								value={slide.buttonLink}
								onChange={(value) =>
									updateSlide(index, 'buttonLink', value)
								}
								placeholder={__('Zadajte odkaz tlačidla (voliteľné)', 'slider')}
								type="url"
							/>
							<Button
								variant="secondary"
								onClick={() => removeSlide(index)}
								isDestructive
							>
								{__('Odstrániť slide', 'slider')}
							</Button>
							<hr />
						</div>
					))}
					{slides.length === 0 && (
						<p>{__('Zatiaľ žiadne slidy. Pridajte slidy pomocou tlačidla "Pridať slide" v postrannom paneli.', 'slider')}</p>
					)}
				</div>
			) : (
				<div className="slider-container">
					<div className="swiper-wrapper">
						{slides.map((slide, index) => (
							<div key={slide.id || index} className="swiper-slide">
								<div className="slide-inner-container">
									<h3 className="slide-title">{slide.title}</h3>
									<p className="slide-description">{slide.description}</p>
									{slide.buttonText && slide.buttonLink && (
										<a href="#" className="slide-button">
											{slide.buttonText}
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
