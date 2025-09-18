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
