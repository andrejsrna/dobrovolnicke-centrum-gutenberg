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

	wp_register_style(
		'swiper-css',
		plugins_url( 'node_modules/swiper/swiper-bundle.min.css', __FILE__ ),
		array(),
		'11.2.6'
	);

	if ( ! is_admin() ) {
		add_action( 'wp_enqueue_scripts', function() {
			wp_enqueue_style( 'swiper-css' );
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

// Separate registration for recent-posts - SERVER SIDE RENDER VERSION
function register_simple_recent_posts_block() {
	// Include render callback file
	require_once plugin_dir_path( __FILE__ ) . 'src/recent-posts/render.php';

	// Register styles
	wp_register_style(
		'create-block-recent-posts-style',
		plugins_url( 'build/recent-posts/style-index.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/style-index.css' )
	);

	wp_register_style(
		'create-block-recent-posts-editor-style',
		plugins_url( 'build/recent-posts/index.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/index.css' )
	);

	// Register the block using server-side rendering
	register_block_type(
		'create-block/recent-posts',
		array(
			'api_version' => 3,
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

	// Register scripts for editor
	wp_register_script(
		'create-block-recent-posts-editor-script',
		plugins_url( 'build/recent-posts/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-server-side-render' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/recent-posts/index.js' )
	);

	// Ensure styles are loaded on frontend
	if (!is_admin()) {
		add_action('wp_enqueue_scripts', function() {
			wp_enqueue_style('create-block-recent-posts-style');
		});
	}
}
add_action( 'init', 'register_simple_recent_posts_block', 20 );