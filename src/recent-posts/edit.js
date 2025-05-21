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
	ToggleControl,
	TextControl,
	Placeholder,
	Spinner,
	Notice,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { format, dateI18n, getSettings } from '@wordpress/date';
import { FaArrowRight, FaCalendarAlt, FaUser, FaNewspaper } from 'react-icons/fa';

/**
 * Internal dependencies
 */
import './editor.scss';

// Inline styles pre admin zobrazenie
const blockStyle = {
	border: '2px solid #e0e0e0',
	backgroundColor: '#f9f9f9',
	borderRadius: '8px',
	padding: '20px',
	marginBottom: '20px',
	boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const headerStyle = {
	marginBottom: '20px'
};

const titleStyle = {
	fontSize: '24px',
	fontWeight: 'bold',
	color: '#333',
	marginTop: '0',
	marginBottom: '10px'
};

const descriptionStyle = {
	fontSize: '16px',
	color: '#555',
	marginTop: '0'
};

const placeholderStyle = {
	textAlign: 'center',
	padding: '40px 20px',
	backgroundColor: '#fff',
	border: '2px dashed #ddd',
	borderRadius: '6px',
	margin: '15px auto',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
};

const containerStyle = {
	minHeight: '150px',
	backgroundColor: 'rgba(0, 0, 0, 0.03)',
	borderRadius: '6px',
	padding: '15px',
	position: 'relative'
};

const emptyContainerStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '150px',
	backgroundColor: 'rgba(0, 0, 0, 0.03)',
	borderRadius: '6px',
	padding: '15px'
};

const emptyTextStyle = {
	color: '#666',
	fontStyle: 'italic',
	textAlign: 'center'
};

const buttonContainerStyle = {
	marginTop: '20px',
	textAlign: 'center'
};

const buttonStyle = {
	display: 'inline-flex',
	alignItems: 'center',
	padding: '10px 24px',
	backgroundColor: '#fcb722',
	color: '#fff',
	borderRadius: '30px',
	textDecoration: 'none',
	fontWeight: 'bold'
};

const buttonIconStyle = {
	marginLeft: '8px'
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

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Použijeme základné štýly namiesto CSS premenných pre lepšiu kompatibilitu
	const customBlockProps = useBlockProps({
		className: `text-align-${textAlignment} ${useCustomBackground ? 'has-background' : ''}`,
		style: blockStyle
	});

	useEffect(() => {
		setLoading(true);
		setError(null);

		apiFetch({ path: `/wp/v2/posts?per_page=${postsToShow}&_embed` })
			.then((fetchedPosts) => {
				setPosts(fetchedPosts);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, [postsToShow]);

	// Format date based on WordPress settings
	const formatDate = (date) => {
		const settings = getSettings();
		return dateI18n(settings.formats.date, date);
	};

	// Extract excerpt safely
	const getExcerpt = (post) => {
		if (!post.excerpt || !post.excerpt.rendered) {
			return '';
		}

		// Remove HTML tags from excerpt
		const excerptText = post.excerpt.rendered.replace(/<[^>]*>/g, '');
		// Trim to 140 chars
		return excerptText.length > 140 ? excerptText.substring(0, 140) + '...' : excerptText;
	};

	// Render the UI for loading, error, or no posts
	const renderPlaceholder = () => {
		if (loading) {
			return (
				<div style={placeholderStyle}>
					<Spinner />
					<p>{__('Načítanie príspevkov...', 'slider')}</p>
				</div>
			);
		}

		if (error) {
			return (
				<div style={placeholderStyle}>
					<Notice status="error" isDismissible={false}>
						{__('Chyba pri načítaní príspevkov: ', 'slider') + error}
					</Notice>
					<p>{__('Zobrazenie príspevkov bude funkčné na stránke.', 'slider')}</p>
				</div>
			);
		}

		if (posts.length === 0) {
			return (
				<div style={placeholderStyle}>
					<FaNewspaper size={32} style={{ marginBottom: '10px', color: '#ddd' }} />
					<p>{__('Nenašli sa žiadne články.', 'slider')}</p>
					<p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{__('Na stránke sa zobrazia príspevky podľa nastavení.', 'slider')}</p>
				</div>
			);
		}

		return null;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Nastavenia obsahu', 'slider')} initialOpen={true}>
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
					onChange={(value) => setAttributes({ textAlignment: value })}
				/>
			</BlockControls>

			<div {...customBlockProps}>
				<div style={headerStyle}>
					<RichText
						tagName="h2"
						style={titleStyle}
						value={sectionTitle}
						onChange={(value) => setAttributes({ sectionTitle: value })}
						placeholder={__('Nadpis sekcie s príspevkami...', 'slider')}
					/>

					<RichText
						tagName="p"
						style={descriptionStyle}
						value={sectionDescription}
						onChange={(value) => setAttributes({ sectionDescription: value })}
						placeholder={__('Popis sekcie s príspevkami...', 'slider')}
					/>
				</div>

				{/* Upravené zobrazenie pre admin */}
				{loading || error || posts.length === 0 ? (
					renderPlaceholder()
				) : (
					<div style={containerStyle}>
						{posts.length > 0 ? (
							posts.map((post) => (
								<div
									key={post.id}
									style={{
										backgroundColor: '#fff',
										borderRadius: '6px',
										boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
										overflow: 'hidden',
										marginBottom: '15px',
										padding: '15px'
									}}
								>
									{displayFeaturedImage && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && (
										<div style={{ marginBottom: '10px' }}>
											<img
												src={post._embedded['wp:featuredmedia'][0].source_url}
												alt={post.title.rendered}
												style={{
													width: '100%',
													height: 'auto',
													maxHeight: '200px',
													objectFit: 'cover',
													borderRadius: '4px'
												}}
											/>
										</div>
									)}

									<div style={{ padding: '5px' }}>
										{(displayDate || displayAuthor) && (
											<div style={{
												display: 'flex',
												gap: '10px',
												marginBottom: '8px',
												fontSize: '14px',
												color: '#666'
											}}>
												{displayDate && (
													<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
														<FaCalendarAlt color="#fcb722" size={14} />
														<span>{formatDate(post.date)}</span>
													</div>
												)}

												{displayAuthor && post._embedded && post._embedded.author && (
													<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
														<FaUser color="#fcb722" size={14} />
														<span>{post._embedded.author[0].name}</span>
													</div>
												)}
											</div>
										)}

										<h3 style={{
											fontSize: '18px',
											fontWeight: 'bold',
											marginTop: '0',
											marginBottom: '8px',
											color: '#333'
										}}>
											{post.title.rendered}
										</h3>

										{displayExcerpt && (
											<div style={{
												fontSize: '14px',
												color: '#555',
												marginBottom: '10px'
											}}>
												<p>{getExcerpt(post)}</p>
											</div>
										)}

										<a href="#" style={{
											display: 'inline-flex',
											alignItems: 'center',
											color: '#fcb722',
											textDecoration: 'none',
											fontWeight: 'bold',
											fontSize: '14px'
										}}>
											{__('Čítať viac', 'slider')}
											<FaArrowRight style={{ marginLeft: '5px', fontSize: '12px' }} />
										</a>
									</div>
								</div>
							))
						) : (
							<div style={emptyContainerStyle}>
								<p style={emptyTextStyle}>
									{__('Príspevky budú automaticky načítané na frontend stránke', 'slider')}
								</p>
							</div>
						)}
					</div>
				)}

				{showButton && (
					<div style={buttonContainerStyle}>
						<a
							href={buttonUrl || '#'}
							style={{
								...buttonStyle,
								backgroundColor: buttonColor || '#fcb722',
								color: buttonTextColor || '#ffffff'
							}}
						>
							<span>{buttonText || __('Všetky články', 'slider')}</span>
							<FaArrowRight style={buttonIconStyle} />
						</a>
					</div>
				)}
			</div>
		</>
	);
}
