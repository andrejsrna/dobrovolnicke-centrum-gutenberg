<?php
// This file is generated. Do not modify it manually.
return array(
	'aktivities' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/activities',
		'version' => '0.1.0',
		'title' => 'Aktivity',
		'category' => 'design',
		'icon' => 'list-view',
		'description' => 'Blok na zobrazenie aktivít s ikonami.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'activities' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'id' => array(
							'type' => 'string'
						),
						'icon' => array(
							'type' => 'string',
							'default' => 'star'
						),
						'title' => array(
							'type' => 'string',
							'source' => 'html',
							'selector' => '.activity-title'
						),
						'description' => array(
							'type' => 'string',
							'source' => 'html',
							'selector' => '.activity-description'
						)
					)
				)
			),
			'columns' => array(
				'type' => 'number',
				'default' => 3
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
			'sectionTitle' => array(
				'type' => 'string',
				'default' => 'Naše aktivity'
			),
			'sectionDescription' => array(
				'type' => 'string',
				'default' => 'Zoznámte sa s našimi aktivitami a službami, ktoré poskytujeme.'
			),
			'useCustomBackground' => array(
				'type' => 'boolean',
				'default' => true
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#093e52'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Zobraziť všetky aktivity'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => '#'
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
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'call-to-action' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/call-to-action',
		'version' => '0.1.0',
		'title' => 'Call to Action',
		'category' => 'widgets',
		'icon' => 'megaphone',
		'description' => 'Block pre zobrazenie výzvy na akciu s nadpisom a tlačidlom.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.cta-title'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Kliknite sem'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'buttonNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#fcb722'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'buttonColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'buttonTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'textAlignment' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'fancy-heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/fancy-heading',
		'version' => '0.1.0',
		'title' => 'Fancy Heading',
		'category' => 'design',
		'icon' => 'heading',
		'description' => 'A fancy heading block with title and description.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.fancy-heading-title'
			),
			'description' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.fancy-heading-description'
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
			)
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'konzultacie' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/konzultacie',
		'version' => '0.1.0',
		'title' => 'Konzultácie',
		'category' => 'design',
		'icon' => 'info',
		'description' => 'Blok pre zobrazenie konzultačných hodín.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Konzultačné hodiny'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Zaujíma vás naša činnosť? Chcete sa niečo poradiť? Navštívte nás počas konzultačných hodín.'
			),
			'field1Icon' => array(
				'type' => 'string',
				'default' => 'clock'
			),
			'field1Bold' => array(
				'type' => 'string',
				'default' => 'Konzultačné hodiny:'
			),
			'field1Text' => array(
				'type' => 'string',
				'default' => 'Pondelok – Piatok: 9:00 – 15:00'
			),
			'field2Icon' => array(
				'type' => 'string',
				'default' => 'location'
			),
			'field2Bold' => array(
				'type' => 'string',
				'default' => 'Adresa:'
			),
			'field2Text' => array(
				'type' => 'string',
				'default' => 'Ulica 123, 000 00 Mesto'
			),
			'field3Icon' => array(
				'type' => 'string',
				'default' => 'phone'
			),
			'field3Bold' => array(
				'type' => 'string',
				'default' => 'Kontakt:'
			),
			'field3Text' => array(
				'type' => 'string',
				'default' => '+421 000 000 000'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Kontaktovať nás'
			),
			'buttonUrl' => array(
				'type' => 'string',
				'default' => '#'
			),
			'buttonNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'accentColor' => array(
				'type' => 'string',
				'default' => '#fcb722'
			),
			'buttonColor' => array(
				'type' => 'string',
				'default' => '#fcb722'
			),
			'buttonTextColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'imageId' => array(
				'type' => 'number'
			),
			'imageUrl' => array(
				'type' => 'string'
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'recent-posts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/recent-posts',
		'version' => '0.1.0',
		'title' => 'Posledné články',
		'category' => 'design',
		'icon' => 'admin-post',
		'description' => 'Blok na zobrazenie posledných článkov s tlačidlom.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
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
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'file:./index.css',
			'file:./admin.css'
		),
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/slider',
		'version' => '0.1.0',
		'title' => 'Slider',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'slides' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object',
					'properties' => array(
						'id' => array(
							'type' => 'string'
						),
						'title' => array(
							'type' => 'string'
						),
						'description' => array(
							'type' => 'string'
						),
						'buttonText' => array(
							'type' => 'string',
							'source' => 'text',
							'selector' => '.slide-button'
						),
						'buttonLink' => array(
							'type' => 'string',
							'source' => 'attribute',
							'selector' => '.slide-button',
							'attribute' => 'href'
						),
						'imageId' => array(
							'type' => 'number'
						),
						'imageUrl' => array(
							'type' => 'string',
							'source' => 'attribute',
							'selector' => '.slide-image img',
							'attribute' => 'src'
						),
						'defaultIcon' => array(
							'type' => 'string',
							'default' => ''
						),
						'colorScheme' => array(
							'type' => 'string',
							'default' => 'yellow-orange'
						),
						'backgroundImageId' => array(
							'type' => 'number'
						),
						'backgroundImageUrl' => array(
							'type' => 'string'
						),
						'useBackgroundImage' => array(
							'type' => 'boolean',
							'default' => false
						)
					)
				)
			)
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
