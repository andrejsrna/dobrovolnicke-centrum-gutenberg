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

	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}

	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}
add_action( 'init', 'dctk_gutenberg_block_init' );

function create_block_recent_posts_block_init() {
	// Načítanie súboru s render funkciou
	require_once plugin_dir_path(__FILE__) . 'src/recent-posts/render.php';

	// Direktná registrácia bloku bez rely na automatický systém
	register_block_type( 'create-block/recent-posts', array(
		'editor_script' => 'create-block-recent-posts-editor-script',
		'editor_style'  => 'create-block-recent-posts-editor-style',
		'style'         => 'create-block-recent-posts-style',
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
			'useCustomBackground' => array(
				'type' => 'boolean',
				'default' => false
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#f5f5f5'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'accentColor' => array(
				'type' => 'string',
				'default' => '#fcb722'
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
	));

	// Registrácia skriptov a štýlov manuálne
	wp_register_script(
		'create-block-recent-posts-editor-script',
		plugins_url('build/recent-posts/index.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-api-fetch'),
		filemtime(plugin_dir_path(__FILE__) . 'build/recent-posts/index.js')
	);

	wp_register_style(
		'create-block-recent-posts-editor-style',
		plugins_url('build/recent-posts/index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/recent-posts/index.css')
	);

	wp_register_style(
		'create-block-recent-posts-style',
		plugins_url('build/recent-posts/style-index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/recent-posts/style-index.css')
	);
}
add_action('init', 'create_block_recent_posts_block_init', 20);

// Ešte sa uistíme, že blok je vylúčený z automatickej registrácie
function exclude_recent_posts_from_auto_registration($block_types) {
	if (is_array($block_types) && isset($block_types['recent-posts'])) {
		unset($block_types['recent-posts']);
	}
	return $block_types;
}
add_filter('wp_block_metadata_collection', 'exclude_recent_posts_from_auto_registration', 10, 1);

function debug_block_registration() {
	// Ak máš prístup k development logu
	error_log('Registered blocks: ' . print_r(WP_Block_Type_Registry::get_instance()->get_all_registered(), true));

	// Alebo pre admin užívateľov (pridaj na frontend)
	if (current_user_can('manage_options')) {
		echo '<!-- Recent Posts Block Debug: ';
		echo 'Plugin Dir: ' . plugin_dir_path(__FILE__) . '<br>';
		echo 'Render file exists: ' . (file_exists(plugin_dir_path(__FILE__) . 'src/recent-posts/render.php') ? 'Yes' : 'No') . '<br>';
		echo 'Build file exists: ' . (file_exists(plugin_dir_path(__FILE__) . 'build/recent-posts/index.js') ? 'Yes' : 'No') . '<br>';
		echo '-->';
	}
}
add_action('wp_footer', 'debug_block_registration');
