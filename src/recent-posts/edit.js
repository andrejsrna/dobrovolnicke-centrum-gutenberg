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
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';

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

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const blockProps = useBlockProps({
		className: `text-align-${textAlignment} ${useCustomBackground ? 'has-background' : ''}`,
		style: {
			'--post-text-color': textColor,
			'--post-accent-color': accentColor,
			'--post-background-color': useCustomBackground ? (backgroundColor || '#f5f5f5') : 'transparent',
			'--post-button-color': buttonColor,
			'--post-button-text-color': buttonTextColor,
		}
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
					onChange={(alignment) => setAttributes({ textAlignment: alignment })}
				/>
			</BlockControls>

			<div {...blockProps}>
				<div className="recent-posts-section-header">
					<RichText
						tagName="h2"
						className="recent-posts-section-title"
						value={sectionTitle}
						onChange={(content) => setAttributes({ sectionTitle: content })}
						placeholder={__('Nadpis sekcie...', 'slider')}
						allowedFormats={['core/bold', 'core/italic']}
					/>

					<RichText
						tagName="p"
						className="recent-posts-section-description"
						value={sectionDescription}
						onChange={(content) => setAttributes({ sectionDescription: content })}
						placeholder={__('Popis sekcie...', 'slider')}
						allowedFormats={['core/bold', 'core/italic', 'core/link']}
					/>
				</div>

				{loading && (
					<Placeholder>
						<Spinner />
						<p>{__('Načítavam posledné články...', 'slider')}</p>
					</Placeholder>
				)}

				{error && !loading && (
					<Notice status="error" isDismissible={false}>
						{__('Chyba pri načítaní článkov: ', 'slider') + error}
					</Notice>
				)}

				{!loading && !error && posts.length === 0 && (
					<div className="recent-posts-placeholder">
						<p>{__('Nenašli sa žiadne články.', 'slider')}</p>
					</div>
				)}

				{!loading && !error && posts.length > 0 && (
					<div className="recent-posts-container">
						{posts.map((post) => {
							const featuredImage = post._embedded &&
								post._embedded['wp:featuredmedia'] &&
								post._embedded['wp:featuredmedia'][0];

							const author = post._embedded &&
								post._embedded.author &&
								post._embedded.author[0];

							return (
								<div key={post.id} className="post-item">
									{displayFeaturedImage && featuredImage && featuredImage.source_url && (
										<div className="post-image">
											<img src={featuredImage.source_url} alt={featuredImage.alt_text || post.title.rendered} />
										</div>
									)}

									<div className="post-content">
										{(displayDate || displayAuthor) && (
											<div className="post-meta">
												{displayDate && (
													<div className="post-date">
														<FaCalendarAlt className="meta-icon" />
														<span>{formatDate(post.date)}</span>
													</div>
												)}
												{displayAuthor && author && (
													<div className="post-author">
														<FaUser className="meta-icon" />
														<span>{author.name}</span>
													</div>
												)}
											</div>
										)}

										<h3 className="post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

										{displayExcerpt && (
											<div className="post-excerpt">
												<p>{getExcerpt(post)}</p>
											</div>
										)}

										<a href={post.link} className="post-read-more">
											{__('Čítať viac', 'slider')} <FaArrowRight className="read-more-icon" />
										</a>
									</div>
								</div>
							);
						})}
					</div>
				)}

				{showButton && (
					<div className="post-button-container">
						<button type="button" className="post-button">
							<span>{buttonText || __('Všetky články', 'slider')}</span>
							<FaArrowRight className="button-icon" />
						</button>
					</div>
				)}
			</div>
		</>
	);
}
