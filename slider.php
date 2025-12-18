<?php
/**
 * Plugin Name:       DCTK Gutenberg
 * Description:       A modern slider block built with Gutenberg.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            DCTK Team
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slider
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'DCTK_SUPPORT_BUTTON_OPTION' ) ) {
	define( 'DCTK_SUPPORT_BUTTON_OPTION', 'dctk_support_button_enabled' );
}

function dctk_gutenberg_block_init() {
	add_theme_support( 'wp-block-styles' );

	// Remove Swiper CSS registration via PHP - rely on JS import
	// wp_register_style(
	// 	'swiper-css',
	// 	plugins_url( 'node_modules/swiper/swiper-bundle.min.css', __FILE__ ),
	// 	array(),
	// 	'11.2.6'
	// );

	// Remove frontend enqueue via PHP
	// if ( ! is_admin() ) {
	// 	add_action( 'wp_enqueue_scripts', function() {
	// 		wp_enqueue_style( 'swiper-css' );
	// 	});
	// }

	// Register Font Awesome for frontend
	wp_register_style(
		'font-awesome',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
		array(),
		'6.5.1'
	);

	// Enqueue Font Awesome on frontend
	if ( ! is_admin() ) {
		add_action( 'wp_enqueue_scripts', function() {
			wp_enqueue_style( 'font-awesome' );
		});
	}

	// Register other blocks from build directory EXCEPT recent-posts
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	unset($manifest_data['recent-posts']); // Remove recent-posts from manifest

	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'dctk_gutenberg_block_init' );

// Function to add editor width constraints
function dctk_add_editor_styles() {
	$editor_width_css = <<<CSS
body.block-editor-page .editor-styles-wrapper,
body.block-editor-page .block-editor-block-list__layout.is-root-container {
	--dctk-editor-max-width: 1200px;
	--dctk-editor-side-padding: clamp(16px, 3vw, 40px);
	max-width: var(--dctk-editor-max-width);
	margin-left: auto;
	margin-right: auto;
	padding-left: var(--dctk-editor-side-padding);
	padding-right: var(--dctk-editor-side-padding);
	box-sizing: border-box;
}

body.block-editor-page .editor-styles-wrapper .wp-block,
body.block-editor-page .block-editor-block-list__layout.is-root-container .wp-block {
	box-sizing: border-box;
	max-width: 100%;
}

body.block-editor-page .editor-styles-wrapper .wp-block[data-align="wide"],
body.block-editor-page .block-editor-block-list__layout.is-root-container > .wp-block[data-align="wide"] {
	max-width: calc(var(--dctk-editor-max-width) + var(--dctk-editor-side-padding) * 2);
}

body.block-editor-page .editor-styles-wrapper .wp-block[data-align="full"],
body.block-editor-page .block-editor-block-list__layout.is-root-container > .wp-block[data-align="full"] {
	max-width: none;
	width: calc(100% + var(--dctk-editor-side-padding) * 2);
	margin-left: calc(var(--dctk-editor-side-padding) * -1);
	margin-right: calc(var(--dctk-editor-side-padding) * -1);
}
CSS;

	wp_add_inline_style( 'wp-edit-blocks', $editor_width_css );
}
// Use the enqueue_block_editor_assets hook
add_action( 'enqueue_block_editor_assets', 'dctk_add_editor_styles' );

/**
 * Returns true when the sticky support button should be visible.
 *
 * @return bool
 */
function dctk_support_button_is_enabled() {
	return '0' !== get_option( DCTK_SUPPORT_BUTTON_OPTION, '1' );
}

/**
 * Sanitize the stored option value.
 *
 * @param mixed $value
 * @return string
 */
function dctk_support_button_sanitize_option( $value ) {
	return $value ? '1' : '0';
}

/**
 * Registers the admin setting that toggles the support button visibility.
 */
function dctk_support_button_register_setting() {
	register_setting(
		'dctk_support_button_group',
		DCTK_SUPPORT_BUTTON_OPTION,
		array(
			'type'              => 'string',
			'sanitize_callback' => 'dctk_support_button_sanitize_option',
			'default'           => '1',
		)
	);
}
add_action( 'admin_init', 'dctk_support_button_register_setting' );

/**
 * Adds the settings page under Settings > Podporte nás.
 */
function dctk_support_button_add_admin_menu() {
	add_options_page(
		__( 'Podporte nás', 'slider' ),
		__( 'Podporte nás', 'slider' ),
		'manage_options',
		'dctk-support-button',
		'dctk_support_button_settings_page'
	);
}
add_action( 'admin_menu', 'dctk_support_button_add_admin_menu' );

/**
 * Renders the settings form for the sticky support button.
 */
function dctk_support_button_settings_page() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Podporte nás', 'slider' ); ?></h1>
		<p><?php esc_html_e( 'Použite túto voľbu na zobrazenie alebo skrytie tmavomodrého tlačidla Podporte nás v pravom hornom rohu všetkých stránok (relatívne k obsahu).', 'slider' ); ?></p>
		<form method="post" action="options.php">
			<?php
			settings_fields( 'dctk_support_button_group' );
			do_settings_sections( 'dctk_support_button_group' );
			$current_value = dctk_support_button_is_enabled();
			?>
			<table class="form-table">
				<tr>
					<th scope="row">
						<label for="<?php echo esc_attr( DCTK_SUPPORT_BUTTON_OPTION ); ?>"><?php esc_html_e( 'Podporte nás tlačidlo', 'slider' ); ?></label>
					</th>
					<td>
						<label>
							<input
								type="checkbox"
								id="<?php echo esc_attr( DCTK_SUPPORT_BUTTON_OPTION ); ?>"
								name="<?php echo esc_attr( DCTK_SUPPORT_BUTTON_OPTION ); ?>"
								value="1"
								<?php checked( true, $current_value ); ?>
							/>
							<?php esc_html_e( 'Zobraziť plávajúce tlačidlo Podporte nás na verejnej časti webu.', 'slider' ); ?>
						</label>
						<p class="description">
							<?php esc_html_e( 'Tlačidlo vedie na darcovskú stránku DCTK a je optimalizované pre telefóny aj desktop.', 'slider' ); ?>
						</p>
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

/**
 * Outputs the sticky support button markup and inline styling on the frontend.
 */
function dctk_support_button_render() {
	if ( is_admin() || ! dctk_support_button_is_enabled() ) {
		return;
	}

	$donation_link = 'https://dctk.darujme.sk/podporte-dobrovolnicke-centrum-trnavskeho-kraja-b1476/?referral_tag_id=2c996ac9-1236-4d77-a147-5e475abb50c9';
	$button_text   = __( 'Podporte nás', 'slider' );
	$button_html   = <<<HTML
	<style id="dctk-support-button-style">
				.dctk-support-button {
					position: absolute;
					top: clamp(1rem, 2vw, 1.5rem);
					right: clamp(1rem, 2vw, 1.5rem);
			background: #08254d;
			color: #ffffff;
			font-weight: 600;
			font-size: clamp(0.95rem, 1vw, 1.1rem);
			padding: 0.75rem 1.2rem;
			border-radius: 999px;
			display: inline-flex;
			align-items: center;
			gap: 0.65rem;
			box-shadow: 0 10px 30px rgba(5, 10, 30, 0.35);
			text-decoration: none;
			transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
			z-index: 9999;
		}
		.dctk-support-button:hover {
			transform: translateY(-2px);
			box-shadow: 0 15px 30px rgba(5, 10, 30, 0.45);
			background: #0b3c76;
		}
		.dctk-support-button .dctk-support-icon {
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.1);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 1rem;
		}
		@media (max-width: 480px) {
			.dctk-support-button {
				padding: 0.65rem 1rem;
				gap: 0.5rem;
			}
			.dctk-support-button .dctk-support-icon {
				width: 1.8rem;
				height: 1.8rem;
			}
		}
	</style>
	<a class="dctk-support-button" href="{$donation_link}" target="_blank" rel="noopener noreferrer" aria-label="{$button_text}">
		<span class="dctk-support-icon"><i class="fa-solid fa-hand-holding-heart" aria-hidden="true"></i></span>
		<span>{$button_text}</span>
	</a>
	HTML;

	echo $button_html;
}
add_action( 'wp_footer', 'dctk_support_button_render', 20 );

// Separate registration for recent-posts - SIMPLIFIED VERSION
function register_simple_recent_posts_block() {
	// Register styles and scripts
	wp_register_style(
		'create-block-recent-posts-style',
		plugins_url( 'build/recent-posts/style-index.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/style-index.css' )
	);

	wp_register_style(
		'create-block-recent-posts-editor-style',
		plugins_url( 'build/recent-posts/index.css', __FILE__ ),
		array('wp-edit-blocks'),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/index.css' )
	);

	// Register the editor script
	wp_register_script(
		'create-block-recent-posts-editor-script',
		plugins_url( 'build/recent-posts/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor', 'wp-components', 'wp-api-fetch', 'wp-date' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/index.js' ),
		true
	);

	// Include render callback file
	require_once plugin_dir_path( __FILE__ ) . 'src/recent-posts/render.php';

	// Register the block with minimal settings
	register_block_type(
		'create-block/recent-posts',
		array(
			'apiVersion' => 3,
			'title' => 'Posledné články',
			'category' => 'design',
			'icon' => 'admin-post',
			'description' => 'Blok na zobrazenie posledných článkov s tlačidlom.',
			'supports' => array(
				'html' => false,
				'align' => array('wide', 'full'),
			),
			'example' => array(),
			'editor_script' => 'create-block-recent-posts-editor-script',
			'editor_style' => 'create-block-recent-posts-editor-style',
			'style' => 'create-block-recent-posts-style',
			'render_callback' => 'render_recent_posts_block',
			'attributes' => array(
				'sectionTitle' => array(
					'type' => 'string',
					'default' => 'Posledné články'
				),
				'sectionDescription' => array(
					'type' => 'string',
					'default' => 'Prečítajte si naše najnovšie aktuality a články.'
				),
				'postsToShow' => array(
					'type' => 'number',
					'default' => 3
				),
				'displayFeaturedImage' => array(
					'type' => 'boolean',
					'default' => true
				),
				'displayExcerpt' => array(
					'type' => 'boolean',
					'default' => true
				),
				'displayDate' => array(
					'type' => 'boolean',
					'default' => true
				),
				'displayAuthor' => array(
					'type' => 'boolean',
					'default' => false
				),
				'textAlignment' => array(
					'type' => 'string',
					'default' => 'left'
				),
				'textColor' => array(
					'type' => 'string',
					'default' => '#333333'
				),
				'accentColor' => array(
					'type' => 'string',
					'default' => '#fcb722'
				),
				'useCustomBackground' => array(
					'type' => 'boolean',
					'default' => false
				),
				'backgroundColor' => array(
					'type' => 'string',
					'default' => '#f5f5f5'
				),
				'buttonText' => array(
					'type' => 'string',
					'default' => 'Všetky články'
				),
				'buttonUrl' => array(
					'type' => 'string',
					'default' => '/blog'
				),
				'buttonNewTab' => array(
					'type' => 'boolean',
					'default' => false
				),
				'showButton' => array(
					'type' => 'boolean',
					'default' => true
				),
				'buttonColor' => array(
					'type' => 'string',
					'default' => '#fcb722'
				),
				'buttonTextColor' => array(
					'type' => 'string',
					'default' => '#ffffff'
				)
			)
		)
	);

	// Ensure styles are loaded on frontend
	if (!is_admin()) {
		add_action('wp_enqueue_scripts', function() {
			wp_enqueue_style('create-block-recent-posts-style');
		});
	}
}
add_action( 'init', 'register_simple_recent_posts_block', 20 );

// Register the block type in editor without JavaScript (for testing)
/* Commenting out potentially redundant/conflicting registration
function add_recent_posts_to_available_blocks() {
    // Make sure block is available in editor
    wp_register_script(
        'recent-posts-dummy-editor-script',
        plugins_url( 'build/recent-posts/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/index.js' )
    );

    // Register editor styles
    wp_register_style(
        'recent-posts-editor-style',
        plugins_url( 'build/recent-posts/index.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/index.css' )
    );

    // Force enqueue in editor
    // This is generally not needed if editor_style is set in register_block_type
    // if (is_admin()) {
    //     add_action('enqueue_block_editor_assets', function() {
    //         wp_enqueue_style('recent-posts-editor-style');
    //     });
    // }
}
// add_action( 'init', 'add_recent_posts_to_available_blocks', 25 ); // Also comment out the action hook
*/

function debug_block_registration() {
	if (current_user_can('manage_options')) {
		echo '<!-- Recent Posts Block Debug: ';
		echo 'Block registered: ' . (WP_Block_Type_Registry::get_instance()->is_registered('create-block/recent-posts') ? 'Yes' : 'No') . '<br>';
		echo 'Render file exists: ' . (file_exists(plugin_dir_path(__FILE__) . 'src/recent-posts/render.php') ? 'Yes' : 'No') . '<br>';
		echo 'Build file exists: ' . (file_exists(plugin_dir_path(__FILE__) . 'build/recent-posts/index.js') ? 'Yes' : 'No') . '<br>';
		echo 'Scripts registered: ' . (wp_script_is('recent-posts-dummy-editor-script', 'registered') ? 'Yes' : 'No') . '<br>';
		echo 'Styles registered: ' . (wp_style_is('create-block-recent-posts-style', 'registered') ? 'Yes' : 'No') . '<br>';
		echo '-->';
	}
}
add_action('wp_footer', 'debug_block_registration');
