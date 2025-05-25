/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	TextareaControl,
	ToggleControl,
	TabPanel,
	SelectControl,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
	RadioControl,
	Dashicon,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardDivider,
	Flex,
	FlexItem,
	FlexBlock,
	Icon,
	Tooltip,
	Panel,
	PanelRow,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { Fragment, useState, memo, useCallback, useEffect } from '@wordpress/element';
import { plusCircle, trash, image, update, close, info, formatBold, link } from '@wordpress/icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Internal dependencies
 */
import './editor.scss';

library.add(fas); // Add all free solid icons to the library

// Color options for slides
const SLIDE_COLORS = [
	{ value: 'yellow-orange', label: __('Žlto-oranžová', 'slider') },
	{ value: 'light-blue', label: __('Bledomodrá', 'slider') },
	{ value: 'dark-blue', label: __('Tmavomodrá', 'slider') },
];

// Popular Font Awesome icons for visual selector
const POPULAR_ICONS = [
	'user', 'users', 'heart', 'star', 'home', 'envelope', 'phone', 'calendar',
	'clock', 'check', 'times', 'search', 'cog', 'trash', 'edit', 'download',
	'upload', 'share', 'comment', 'comments', 'thumbs-up', 'thumbs-down',
	'bell', 'bookmark', 'flag', 'lock', 'unlock', 'key', 'camera', 'image',
	'video', 'music', 'play', 'pause', 'stop', 'forward', 'backward', 'volume-up',
	'chart-bar', 'chart-line', 'chart-pie', 'dollar-sign', 'euro-sign', 'pound-sign',
	'credit-card', 'shopping-cart', 'shopping-bag', 'gift', 'birthday-cake', 'coffee',
	'utensils', 'pizza-slice', 'apple-alt', 'carrot', 'cookie', 'ice-cream',
	'car', 'bus', 'bicycle', 'motorcycle', 'plane', 'ship', 'rocket', 'globe',
	'map', 'map-marker-alt', 'compass', 'sun', 'moon', 'cloud', 'cloud-sun', 'cloud-rain',
	'bolt', 'fire', 'snowflake', 'tree', 'leaf', 'seedling', 'spa',
	'paw', 'dog', 'cat', 'fish', 'horse', 'dove', 'dragon', 'spider',
	'book', 'graduation-cap', 'school', 'chalkboard-teacher', 'university', 'laptop',
	'desktop', 'mobile-alt', 'tablet-alt', 'keyboard', 'mouse', 'headphones',
	'gamepad', 'tv', 'wifi', 'battery-full', 'plug', 'lightbulb',
	'brain', 'tooth', 'eye', 'hand-paper', 'hand-rock', 'hand-scissors', 'hand-peace',
	'handshake', 'praying-hands', 'fist-raised', 'smile', 'laugh', 'grin', 'sad-tear',
	'angry', 'surprise', 'meh', 'medal', 'trophy', 'award', 'crown', 'gem',
	'ring', 'magic', 'hat-wizard', 'wand-magic-sparkles', 'palette', 'paint-brush',
	'pen', 'pencil-alt', 'marker', 'highlighter', 'eraser', 'ruler', 'scissors',
	'paperclip', 'thumbtack', 'sticky-note', 'clipboard', 'folder', 'folder-open',
	'file', 'file-alt', 'copy', 'cut', 'paste', 'save', 'print', 'undo', 'redo',
	'sync', 'database', 'server', 'cloud-upload-alt', 'cloud-download-alt',
	'shield-alt', 'exclamation-triangle', 'exclamation-circle', 'question-circle',
	'info-circle', 'check-circle', 'times-circle', 'plus-circle', 'minus-circle',
	'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'arrows-alt',
	'expand', 'compress', 'external-link-alt', 'link', 'unlink', 'anchor',
	'hashtag', 'at', 'percent', 'divide', 'equals', 'not-equal', 'less-than',
	'greater-than', 'code', 'terminal', 'bug', 'robot', 'ghost'
];

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
	const [activeSlideIndex, setActiveSlideIndex] = useState(slides.length > 0 ? 0 : -1);

	const addSlide = () => {
		const slideId = `slide-${new Date().getTime()}`;
		const newSlides = [
			...slides,
			{
				id: slideId,
				title: '',
				description: '',
				buttonText: '',
				buttonLink: '',
				imageId: 0,
				imageUrl: '',
				defaultIcon: '',
				colorScheme: 'yellow-orange',
				backgroundImageId: 0,
				backgroundImageUrl: '',
				useBackgroundImage: false,
			},
		];
		setAttributes({ slides: newSlides });
		setActiveSlideIndex(newSlides.length - 1);
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

		if (activeSlideIndex === index) {
			if (newSlides.length > 0) {
				setActiveSlideIndex(Math.min(activeSlideIndex, newSlides.length - 1));
			} else {
				setActiveSlideIndex(-1);
			}
		} else if (activeSlideIndex > index) {
			setActiveSlideIndex(activeSlideIndex - 1);
		}
	};

	// Stabilize functions with useCallback
	const updateSlideCallback = useCallback((index, key, value) => {
		// Create a shallow copy of the slides array from the current state
		const newSlides = [...slides];
		// Create a new object for the slide being updated
		newSlides[index] = { ...newSlides[index], [key]: value };
		// Set attributes directly
		setAttributes({ slides: newSlides });
	}, [slides, setAttributes]);

	// New function for updating multiple attributes at once
	const updateMultipleSlideAttributes = useCallback((index, updates) => {
		// Create a shallow copy of the slides array from the current state
		const newSlides = [...slides];
		newSlides[index] = { ...newSlides[index], ...updates }; // Merge updates
		// Set attributes directly
		setAttributes({ slides: newSlides });
	}, [slides, setAttributes]);

	const removeSlideCallback = useCallback((index) => {
		const newSlides = slides.filter((_, i) => i !== index);
		setAttributes({ slides: newSlides });

		if (activeSlideIndex === index) {
			if (newSlides.length > 0) {
				setActiveSlideIndex(Math.min(activeSlideIndex, newSlides.length - 1));
			} else {
				setActiveSlideIndex(-1);
			}
		} else if (activeSlideIndex > index) {
			setActiveSlideIndex(activeSlideIndex - 1);
		}
	}, [slides, setAttributes, activeSlideIndex]);

	// Function to get the icon component for a specific icon name
	const getIconComponentCallback = useCallback((iconName) => {
		if (!iconName) return null;
		try {
			// FontAwesomeIcon expects an icon definition or an array like ['fas', 'coffee']
			let iconProp = iconName;
			if (typeof iconName === 'string' && iconName.includes(' ')) {
				iconProp = iconName.split(' '); // Handles cases like "fas fa-coffee"
			} else if (typeof iconName === 'string' && !iconName.includes(' ')) {
				// Assumes 'fas' prefix if only name is provided, e.g. "coffee"
				iconProp = ['fas', iconName];
			}
			return <FontAwesomeIcon icon={iconProp} />;
		} catch (e) {
			console.warn(`Font Awesome icon not found or invalid: ${iconName}`, e);
			return <FontAwesomeIcon icon={['fas', 'question-circle']} />; // Fallback icon
		}
	}, []); // Empty dependency array since it doesn't depend on any props or state

	// Helper for SlideItem component to render appropriate controls based on slide content
	const SlideEditor = memo(({ slide, index, updateSlide: updateSlideProp, updateMultipleAttributes: updateMultipleAttributesProp, removeSlide: removeSlideProp, getIconComponent: getIconComponentProp, isActive }) => {
		if (!isActive) return null;

		// Keep tab state local to component
		const [activeImageTab, setActiveImageTab] = useState('default');

		// Local state ONLY for text-based input fields
		const [localTitle, setLocalTitle] = useState(slide.title);
		const [localDescription, setLocalDescription] = useState(slide.description);
		const [localButtonText, setLocalButtonText] = useState(slide.buttonText);
		const [localButtonLink, setLocalButtonLink] = useState(slide.buttonLink);
		const [localIconSearch, setLocalIconSearch] = useState(''); // Add search state

		// Effect to reset local text state if the slide prop changes
		useEffect(() => {
			setLocalTitle(slide.title);
			setLocalDescription(slide.description);
			setLocalButtonText(slide.buttonText);
			setLocalButtonLink(slide.buttonLink);
		}, [slide.id, slide.title, slide.description, slide.buttonText, slide.buttonLink]); // Depend on specific slide props

		return (
			<>
				<Card className="slide-editor-card">
					<CardHeader>
						<Flex align="center" justify="space-between">
							<FlexItem>
								<strong>{__('Základné nastavenia', 'slider')}</strong>
							</FlexItem>
						</Flex>
					</CardHeader>
					<CardBody>
						<TextControl
							label={
								<Flex align="center">
									<Icon icon={formatBold} size={18} />
									<span style={{ marginLeft: 8 }}>{__('Nadpis slidu', 'slider')}</span>
								</Flex>
							}
							value={localTitle}
							onChange={setLocalTitle}
							onBlur={() => updateSlideProp(index, 'title', localTitle)}
							placeholder={__('Zadajte nadpis slidu', 'slider')}
							className="slide-title-input"
						/>
						<TextareaControl
							label={
								<Flex align="center">
									<Dashicon icon="editor-paragraph" />
									<span style={{ marginLeft: 8 }}>{__('Popis slidu', 'slider')}</span>
								</Flex>
							}
							value={localDescription}
							onChange={setLocalDescription}
							onBlur={() => updateSlideProp(index, 'description', localDescription)}
							placeholder={__('Zadajte popis slidu', 'slider')}
							rows={3}
						/>

						<Flex align="stretch" className="button-controls-container">
							<FlexBlock>
								<TextControl
									label={
										<Flex align="center">
											<Dashicon icon="button" />
											<span style={{ marginLeft: 8 }}>{__('Text tlačidla', 'slider')}</span>
										</Flex>
									}
									value={localButtonText}
									onChange={setLocalButtonText}
									onBlur={() => updateSlideProp(index, 'buttonText', localButtonText)}
									placeholder={__('Text tlačidla (voliteľné)', 'slider')}
									__next40pxDefaultSize={true}
									__nextHasNoMarginBottom={true}
								/>
							</FlexBlock>
							<FlexBlock>
								<TextControl
									label={
										<Flex align="center">
											<Icon icon={link} size={20} />
											<span style={{ marginLeft: 8 }}>{__('Odkaz tlačidla', 'slider')}</span>
										</Flex>
									}
									value={localButtonLink}
									onChange={setLocalButtonLink}
									onBlur={() => updateSlideProp(index, 'buttonLink', localButtonLink)}
									placeholder={__('URL odkazu (voliteľné)', 'slider')}
									type="url"
									__next40pxDefaultSize={true}
									__nextHasNoMarginBottom={true}
								/>
							</FlexBlock>
						</Flex>
					</CardBody>
				</Card>

				<Card className="slide-editor-card">
					<CardHeader>
						<Flex align="center" justify="space-between">
							<FlexItem>
								<strong>{__('Vizuálne nastavenia', 'slider')}</strong>
							</FlexItem>
						</Flex>
					</CardHeader>
					<CardBody>
						<RadioControl
							label={__('Typ pozadia', 'slider')}
							help={__('Vyberte, či chcete použiť predvolenú farebnú schému alebo vlastný obrázok na pozadí', 'slider')}
							selected={slide.useBackgroundImage ? 'background-image' : 'color-scheme'}
							options={[
								{ label: __('Farebná schéma', 'slider'), value: 'color-scheme' },
								{ label: __('Obrázok na pozadí', 'slider'), value: 'background-image' },
							]}
							onChange={(value) => {
								const useBg = value === 'background-image';
								updateSlideProp(index, 'useBackgroundImage', useBg);
							}}
						/>
					</CardBody>
					<CardDivider />

					{slide.useBackgroundImage ? (
						<CardBody>
							<div className="slide-background-image-selector">
								<div className="editor-section-label">
									<Flex align="center">
										<Icon icon={image} size={20} />
										<span style={{ marginLeft: 8 }}>{__('Obrázok na pozadí', 'slider')}</span>
									</Flex>
								</div>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) => {
											const updates = {
												backgroundImageId: media.id,
												backgroundImageUrl: media.url
											};
											updateMultipleAttributesProp(index, updates);
										}}
										allowedTypes={['image']}
										value={slide.backgroundImageId}
										render={({ open }) => (
											<div>
												{!slide.backgroundImageUrl ? (
													<Button
														onClick={open}
														variant="secondary"
														className="upload-button"
														icon={image}
													>
														{__('Vybrať obrázok na pozadie', 'slider')}
													</Button>
												) : (
													<div className="slide-background-image-preview">
														<img
															src={slide.backgroundImageUrl}
															alt={__('Náhľad pozadia', 'slider')}
														/>
														<div className="slide-image-actions">
															<Button
																onClick={open}
																variant="secondary"
																className="image-action-button"
																icon={update}
															>
																{__('Zmeniť obrázok', 'slider')}
															</Button>
															<Button
																onClick={() => {
																	const updates = {
																		backgroundImageId: 0,
																		backgroundImageUrl: ''
																	};
																	updateMultipleAttributesProp(index, updates);
																}}
																variant="tertiary"
																className="image-action-button"
																isDestructive
																icon={trash}
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
								<div className="info-message">
									<Icon icon={info} size={18} />
									<span>{__('Po nastavení obrázka na pozadí sa deaktivujú možnosti farebnej schémy a ikony/obrázku v pravej časti.', 'slider')}</span>
								</div>
							</div>
						</CardBody>
					) : (
						<>
							{/* Section for Color Scheme Settings */}
							<CardBody className="color-scheme-settings">
								<div className="slide-color-selector">
									<div className="editor-section-label">
										<Flex align="center">
											<Dashicon icon="art" />
											<span style={{ marginLeft: 8 }}>{__('Farebná schéma slidu', 'slider')}</span>
										</Flex>
									</div>
									<div className="color-options-grid">
										{SLIDE_COLORS.map((color) => (
											<div
												key={color.value}
												className={`color-option-card ${slide.colorScheme === color.value ? 'selected' : ''}`}
												onClick={() => {
													updateSlideProp(index, 'colorScheme', color.value);
												}}
											>
												<div className={`color-preview ${color.value}`}></div>
												<div className="color-label">{color.label}</div>
											</div>
										))}
									</div>
								</div>
							</CardBody>
							<CardDivider />
							{/* Section for Image/Icon within Color Scheme */}
							<CardBody className="color-scheme-image-icon-settings">
								<TabPanel
									className="image-source-tabs"
									activeClass="active-tab"
									onSelect={setActiveImageTab}
									initialTabName={activeImageTab}
									tabs={[
										{
											name: 'default',
											title: (
												<Flex align="center">
													<Dashicon icon="art" />
													<span style={{ marginLeft: 5 }}>{__('Predvolené ikony', 'slider')}</span>
												</Flex>
											),
											className: 'tab-default',
										},
										{
											name: 'custom',
											title: (
												<Flex align="center">
													<Icon icon={image} size={18} />
													<span style={{ marginLeft: 5 }}>{__('Vlastný obrázok', 'slider')}</span>
												</Flex>
											),
											className: 'tab-custom',
										},
									]}
								>
									{(tab) => {
										if (tab.name === 'custom') {
											return (
												<div className="slide-image-selector">
													<p className="editor-section-label">{__('Vlastný obrázok slidu', 'slider')}</p>
													<MediaUploadCheck>
														<MediaUpload
															onSelect={(media) => {
																const updates = {
																	imageId: media.id,
																	imageUrl: media.url,
																	defaultIcon: ''
																};
																updateMultipleAttributesProp(index, updates);
															}}
															allowedTypes={['image']}
															value={slide.imageId}
															render={({ open }) => (
																<div>
																	{!slide.imageUrl ? (
																		<Button
																			onClick={open}
																			variant="secondary"
																			className="upload-button"
																			icon={image}
																		>
																			{__('Vybrať obrázok', 'slider')}
																		</Button>
																	) : (
																		<div className="slide-image-preview">
																			<img
																				src={slide.imageUrl}
																				alt={__('Náhľad obrázku', 'slider')}
																			/>
																			<div className="slide-image-actions">
																				<Button
																					onClick={open}
																					variant="secondary"
																					className="image-action-button"
																					icon={update}
																				>
																					{__('Zmeniť obrázok', 'slider')}
																				</Button>
																				<Button
																					onClick={() => {
																						const updates = {
																						imageId: 0,
																						imageUrl: ''
																					};
																					updateMultipleAttributesProp(index, updates);
																					}}
																					variant="tertiary"
																					className="image-action-button"
																					isDestructive
																					icon={trash}
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
												</div>
											);
										} else {
											return (
												<div className="default-icon-selector">
													<p className="editor-section-label">{__('Vyberte predvolenú ikonu', 'slider')}</p>
													{slide.imageUrl && (
														<div className="notice-message">
															<Icon icon={info} size={18} />
															<span>{__('Ikona bude viditeľná iba po odstránení vlastného obrázku.', 'slider')}</span>
														</div>
													)}
													<div className="font-awesome-icon-selector">
														{/* Search input for filtering icons */}
														<TextControl
															label={__('Hľadať ikonu', 'slider')}
															value={localIconSearch || ''}
															onChange={(value) => setLocalIconSearch(value)}
															placeholder={__('Zadajte názov ikony...', 'slider')}
															className="icon-search-input"
														/>

														{/* Visual icon grid */}
														<div className="icon-grid-container">
															<div className="icon-grid">
																{POPULAR_ICONS
																	.filter(iconName =>
																		!localIconSearch ||
																		iconName.toLowerCase().includes(localIconSearch.toLowerCase())
																	)
																	.map((iconName) => (
																		<Tooltip text={iconName} key={iconName}>
																			<button
																				className={`icon-grid-item ${slide.defaultIcon === iconName ? 'selected' : ''}`}
																				onClick={() => {
																					const updates = {
																						defaultIcon: iconName,
																						imageId: 0,
																						imageUrl: ''
																					};
																					updateMultipleAttributesProp(index, updates);
																				}}
																				type="button"
																				aria-label={iconName}
																			>
																				{getIconComponentProp(iconName)}
																			</button>
																		</Tooltip>
																	))
																}
															</div>
														</div>

														{/* Manual input option */}
														<details className="manual-icon-input">
															<summary>{__('Alebo zadajte názov ikony manuálne', 'slider')}</summary>
															<TextControl
																label={__('Názov ikony (Font Awesome)', 'slider')}
																value={slide.defaultIcon}
																onChange={(value) => {
																	const updates = {
																		defaultIcon: value.trim(),
																		imageId: 0,
																		imageUrl: ''
																	};
																	updateMultipleAttributesProp(index, updates);
																}}
																placeholder={__('napr. coffee, user, heart', 'slider')}
																help={__("Zadajte názov ikony z Font Awesome. Viac ikon nájdete na fontawesome.com/icons", 'slider')}
															/>
														</details>

														{/* Current selection preview */}
														{slide.defaultIcon && (
															<div className="current-icon-preview">
																<p>{__('Vybraná ikona:', 'slider')} <strong>{slide.defaultIcon}</strong></p>
																<div className="icon-preview-large">
																	{getIconComponentProp(slide.defaultIcon)}
																</div>
															</div>
														)}
													</div>
												</div>
											);
										}
									}}
								</TabPanel>
							</CardBody>
						</>
					)}
					<CardFooter>
						<Button
							variant="secondary"
							onClick={() => removeSlideProp(index)}
							isDestructive
							icon={trash}
						>
							{__('Odstrániť slide', 'slider')}
						</Button>
					</CardFooter>
				</Card>
			</>
		);
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Nastavenia slidera', 'slider')} initialOpen={true}>
					<PanelRow>
						<ToggleControl
							label={__('Režim náhľadu', 'slider')}
							checked={previewMode}
							onChange={() => setPreviewMode(!previewMode)}
							help={__('Prepnúť medzi úpravou a náhľadom slideru', 'slider')}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					<PanelRow>
						<Button
							variant="primary"
							onClick={addSlide}
							className="add-slide-button"
							icon={plusCircle}
						>
							{__('Pridať nový slide', 'slider')}
						</Button>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{!previewMode ? (
				<div className="slider-editor-container">
					{slides.length > 0 ? (
						<div className="slider-editor-interface">
							<div className="slide-tabs">
								{slides.map((slide, index) => (
									<div
										key={slide.id || index}
										className={`slide-tab ${index === activeSlideIndex ? 'active' : ''}`}
										onClick={() => setActiveSlideIndex(index)}
									>
										<span className="slide-tab-number">{index + 1}</span>
										<span className="slide-tab-title">
											{__('Slide', 'slider')} {index + 1}
										</span>
										<Button
											className="slide-tab-remove"
											icon={close}
											onClick={(e) => {
												e.stopPropagation();
												removeSlide(index);
											}}
											label={__('Odstrániť slide', 'slider')}
											isSmall
										/>
									</div>
								))}
								<div className="slide-tab add-slide-tab" onClick={addSlide}>
									<Icon icon={plusCircle} />
									<span>{__('Pridať slide', 'slider')}</span>
								</div>
							</div>

							<div className="slide-editor-workspace">
								{activeSlideIndex !== -1 && slides[activeSlideIndex] && (
									<SlideEditor
										key={slides[activeSlideIndex].id || activeSlideIndex}
										slide={slides[activeSlideIndex]}
										index={activeSlideIndex}
										updateSlide={updateSlideCallback}
										updateMultipleAttributes={updateMultipleSlideAttributes}
										removeSlide={removeSlideCallback}
										getIconComponent={getIconComponentCallback}
										isActive={true}
									/>
								)}

								{activeSlideIndex === -1 && (
									<div className="no-slide-selected">
										<p>{__('Vyberte slide v hornej časti alebo pridajte nový slide', 'slider')}</p>
										<Button
											variant="primary"
											onClick={addSlide}
											icon={plusCircle}
										>
											{__('Pridať nový slide', 'slider')}
										</Button>
									</div>
								)}
							</div>
						</div>
					) : (
						<div className="no-slides-message">
							<Icon icon={plusCircle} size={48} />
							<p>{__('Zatiaľ žiadne slidy. Pridajte prvý slide pomocou tlačidla nižšie.', 'slider')}</p>
							<Button variant="primary" onClick={addSlide} icon={plusCircle}>
								{__('Pridať prvý slide', 'slider')}
							</Button>
						</div>
					)}
				</div>
			) : (
				<div className="slider-preview-container">
					<div className="slider-preview-header">
						<Flex align="center" justify="space-between">
							<span className="preview-label">{__('Náhľad slidu', 'slider')}</span>
							<Button
								variant="secondary"
								onClick={() => setPreviewMode(false)}
								icon={update}
							>
								{__('Späť na úpravy', 'slider')}
							</Button>
						</Flex>
					</div>
					<div className="slider-container">
						<div className="swiper-wrapper">
							{slides.length > 0 ? (
								slides.map((slide, index) => (
									<div
										key={slide.id || index}
										className={`swiper-slide ${!slide.useBackgroundImage ? `color-scheme-${slide.colorScheme || 'yellow-orange'}` : 'has-background-image'}`}
										style={slide.useBackgroundImage && slide.backgroundImageUrl ? {
											backgroundImage: `url(${slide.backgroundImageUrl})`,
										} : {}}
									>
										<div className="slide-inner-container">
											<div className="slide-content">
												<h3 className="slide-title">{slide.title || __('Nadpis slidu', 'slider')}</h3>
												<p className="slide-description">{slide.description || __('Popis slidu', 'slider')}</p>
												{(slide.buttonText || slide.buttonLink) && (
													<a href="#" className="slide-button">
														{slide.buttonText || __('Tlačidlo', 'slider')}
													</a>
												)}
											</div>
											{!slide.useBackgroundImage && (
												<div className="slide-image">
													{slide.imageUrl ? (
														<img src={slide.imageUrl} alt={slide.title || __('Obrázok slidu', 'slider')} />
													) : slide.defaultIcon ? (
														<div className="default-icon">
															{getIconComponentCallback(slide.defaultIcon)}
														</div>
													) : (
														<div className="placeholder-image">
															<Icon icon={image} size={48} />
														</div>
													)}
												</div>
											)}
										</div>
									</div>
								))
							) : (
								<div className="no-slides-preview">
									<p>{__('Žiadne slidy na zobrazenie. Prepnite späť na režim úprav a pridajte slide.', 'slider')}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
