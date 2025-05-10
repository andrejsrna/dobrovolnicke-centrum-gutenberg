<?php
function render_recent_posts_block($attributes) {
    $args = array(
        'posts_per_page' => $attributes['postsToShow'] ?? 3,
        'post_status' => 'publish',
        'order' => 'DESC',
        'orderby' => 'date',
    );

    $recent_posts = get_posts($args);

    if (empty($recent_posts)) {
        return '<div class="wp-block-create-block-recent-posts">
            <div class="recent-posts-placeholder">
                <p>' . __('Nenašli sa žiadne články.', 'slider') . '</p>
            </div>
        </div>';
    }

    ob_start();
    ?>
    <div class="wp-block-create-block-recent-posts text-align-<?php echo esc_attr($attributes['textAlignment'] ?? 'left'); ?> <?php echo isset($attributes['useCustomBackground']) && $attributes['useCustomBackground'] ? 'has-background' : ''; ?>"
         style="--post-text-color: <?php echo esc_attr($attributes['textColor'] ?? '#333333'); ?>;
                --post-accent-color: <?php echo esc_attr($attributes['accentColor'] ?? '#fcb722'); ?>;
                --post-background-color: <?php echo esc_attr(isset($attributes['useCustomBackground']) && $attributes['useCustomBackground'] ? ($attributes['backgroundColor'] ?? '#f5f5f5') : 'transparent'); ?>;
                --post-button-color: <?php echo esc_attr($attributes['buttonColor'] ?? '#fcb722'); ?>;
                --post-button-text-color: <?php echo esc_attr($attributes['buttonTextColor'] ?? '#ffffff'); ?>;">

        <?php if (!empty($attributes['sectionTitle']) || !empty($attributes['sectionDescription'])): ?>
        <div class="recent-posts-section-header">
            <?php if (!empty($attributes['sectionTitle'])): ?>
                <h2 class="recent-posts-section-title"><?php echo wp_kses_post($attributes['sectionTitle']); ?></h2>
            <?php endif; ?>

            <?php if (!empty($attributes['sectionDescription'])): ?>
                <p class="recent-posts-section-description"><?php echo wp_kses_post($attributes['sectionDescription']); ?></p>
            <?php endif; ?>
        </div>
        <?php endif; ?>

        <div class="recent-posts-container">
            <?php foreach ($recent_posts as $post):
                $post_link = get_permalink($post->ID);
                $title = get_the_title($post->ID);
                $excerpt = get_the_excerpt($post->ID);
                $date = get_the_date('', $post->ID);
                $author = get_the_author_meta('display_name', $post->post_author);
                $featured_image = get_the_post_thumbnail_url($post->ID, 'medium');
            ?>
                <div class="post-item">
                    <?php if (isset($attributes['displayFeaturedImage']) && $attributes['displayFeaturedImage'] && $featured_image): ?>
                    <div class="post-image">
                        <img src="<?php echo esc_url($featured_image); ?>" alt="<?php echo esc_attr($title); ?>">
                    </div>
                    <?php endif; ?>

                    <div class="post-content">
                        <?php if ((isset($attributes['displayDate']) && $attributes['displayDate']) ||
                                 (isset($attributes['displayAuthor']) && $attributes['displayAuthor'])): ?>
                        <div class="post-meta">
                            <?php if (isset($attributes['displayDate']) && $attributes['displayDate']): ?>
                            <div class="post-date">
                                <svg class="meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
                                </svg>
                                <span><?php echo esc_html($date); ?></span>
                            </div>
                            <?php endif; ?>

                            <?php if (isset($attributes['displayAuthor']) && $attributes['displayAuthor']): ?>
                            <div class="post-author">
                                <svg class="meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                                </svg>
                                <span><?php echo esc_html($author); ?></span>
                            </div>
                            <?php endif; ?>
                        </div>
                        <?php endif; ?>

                        <h3 class="post-title"><?php echo esc_html($title); ?></h3>

                        <?php if (isset($attributes['displayExcerpt']) && $attributes['displayExcerpt']): ?>
                        <div class="post-excerpt">
                            <p><?php echo wp_trim_words($excerpt, 20); ?></p>
                        </div>
                        <?php endif; ?>

                        <a href="<?php echo esc_url($post_link); ?>" class="post-read-more">
                            <?php echo esc_html__('Čítať viac', 'slider'); ?>
                            <svg class="read-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em">
                                <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <?php if (isset($attributes['showButton']) && $attributes['showButton']): ?>
        <div class="post-button-container">
            <a href="<?php echo esc_url($attributes['buttonUrl'] ?? '#'); ?>"
               class="post-button"
               <?php echo isset($attributes['buttonNewTab']) && $attributes['buttonNewTab'] ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>>
                <span><?php echo esc_html($attributes['buttonText'] ?? __('Všetky články', 'slider')); ?></span>
                <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="1em" height="1em">
                    <path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                </svg>
            </a>
        </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
