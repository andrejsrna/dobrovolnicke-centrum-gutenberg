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

	register_block_type( __DIR__ . '/build/recent-posts', array(
		'render_callback' => 'render_recent_posts_block',
	) );
}
add_action( 'init', 'create_block_recent_posts_block_init', 20 );

function exclude_recent_posts_from_auto_registration($block_types) {
	// Vylúči blok recent-posts z automatickej registrácie
	$excluded_blocks = array('recent-posts');
	foreach ($excluded_blocks as $block) {
		if (isset($block_types[$block])) {
			unset($block_types[$block]);
		}
	}
	return $block_types;
}
add_filter('wp_block_metadata_collection', 'exclude_recent_posts_from_auto_registration', 10, 1);
