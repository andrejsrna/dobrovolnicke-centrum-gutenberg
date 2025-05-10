<?php
/**
 * Debug script to list all registered blocks
 * Place this file in your WordPress root directory and access it via browser
 */

// Load WordPress
define('WP_USE_THEMES', false);
require('./wp-load.php');

// Get all registered blocks
$registry = WP_Block_Type_Registry::get_instance();
$blocks = $registry->get_all_registered();

// Output blocks list
echo '<h1>Registered Blocks</h1>';
echo '<pre>';
foreach ($blocks as $block_name => $block) {
    echo htmlspecialchars($block_name) . "\n";
}
echo '</pre>';

// Check specific block
$recent_posts_block = $registry->get_registered('create-block/recent-posts');
echo '<h2>Recent Posts Block Details</h2>';
echo '<pre>';
if ($recent_posts_block) {
    echo "Block exists!\n";
    echo "Block name: " . htmlspecialchars($recent_posts_block->name) . "\n";
    echo "Render callback: " . (is_callable($recent_posts_block->render_callback) ? 'Yes' : 'No') . "\n";
    echo "Scripts registered:\n";

    // Print script handles
    if (isset($recent_posts_block->editor_script) && !empty($recent_posts_block->editor_script)) {
        echo " - Editor script: " . htmlspecialchars($recent_posts_block->editor_script) . "\n";
        echo "   Registered: " . (wp_script_is($recent_posts_block->editor_script, 'registered') ? 'Yes' : 'No') . "\n";
    }

    if (isset($recent_posts_block->script) && !empty($recent_posts_block->script)) {
        echo " - Script: " . htmlspecialchars($recent_posts_block->script) . "\n";
        echo "   Registered: " . (wp_script_is($recent_posts_block->script, 'registered') ? 'Yes' : 'No') . "\n";
    }

    // Print style handles
    if (isset($recent_posts_block->editor_style) && !empty($recent_posts_block->editor_style)) {
        echo " - Editor style: " . htmlspecialchars($recent_posts_block->editor_style) . "\n";
        echo "   Registered: " . (wp_style_is($recent_posts_block->editor_style, 'registered') ? 'Yes' : 'No') . "\n";
    }

    if (isset($recent_posts_block->style) && !empty($recent_posts_block->style)) {
        echo " - Style: " . htmlspecialchars($recent_posts_block->style) . "\n";
        echo "   Registered: " . (wp_style_is($recent_posts_block->style, 'registered') ? 'Yes' : 'No') . "\n";
    }

    // Print attributes
    echo "Attributes:\n";
    print_r($recent_posts_block->attributes);
} else {
    echo "Block 'create-block/recent-posts' is NOT registered!";
}
echo '</pre>';

// Debug JS files
echo '<h2>JavaScript Files</h2>';
echo '<pre>';
echo "File exists (src): " . (file_exists(WP_PLUGIN_DIR . '/slider/src/recent-posts/index.js') ? 'Yes' : 'No') . "\n";
echo "File exists (build): " . (file_exists(WP_PLUGIN_DIR . '/slider/build/recent-posts/index.js') ? 'Yes' : 'No') . "\n";
echo "File readable (build): " . (is_readable(WP_PLUGIN_DIR . '/slider/build/recent-posts/index.js') ? 'Yes' : 'No') . "\n";
echo "File size (build): " . (file_exists(WP_PLUGIN_DIR . '/slider/build/recent-posts/index.js') ? filesize(WP_PLUGIN_DIR . '/slider/build/recent-posts/index.js') . ' bytes' : 'N/A') . "\n";
echo '</pre>';

// Additional block checks
echo '<h2>Block Category Info</h2>';
echo '<pre>';
$categories = WP_Block_Categories_Registry::get_instance()->get_all_categories();
echo "Block Categories:\n";
foreach ($categories as $category) {
    echo " - " . htmlspecialchars($category['slug']) . ": " . htmlspecialchars($category['title']) . "\n";
}
echo '</pre>';
