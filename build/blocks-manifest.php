<?php
// This file is generated. Do not modify it manually.
return array(
	'aktivities' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/activities',
		'version' => '0.1.0',
		'title' => 'Aktivity',
		'category' => 'widgets',
		'icon' => 'grid-view',
		'description' => 'Block pre zobrazenie aktivít s ikonami a popisom.',
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
				'default' => 'center'
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
		'category' => 'widgets',
		'icon' => 'format-aside',
		'description' => 'Blok pre zobrazenie konzultačných služieb s nadpisom, popisom a kontaktnými informáciami.',
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
				'selector' => '.konzultacie-title'
			),
			'description' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.konzultacie-description'
			),
			'field1Icon' => array(
				'type' => 'string',
				'default' => 'phone'
			),
			'field1Bold' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.field-1 .field-bold'
			),
			'field1Text' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.field-1 .field-text'
			),
			'field2Icon' => array(
				'type' => 'string',
				'default' => 'mail'
			),
			'field2Bold' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.field-2 .field-bold'
			),
			'field2Text' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.field-2 .field-text'
			),
			'field3Icon' => array(
				'type' => 'string',
				'default' => 'location'
			),
			'field3Bold' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.field-3 .field-bold'
			),
			'field3Text' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.field-3 .field-text'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Kontaktovať nás'
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
			)
		),
		'textdomain' => 'slider',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
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
							'type' => 'string',
							'source' => 'html',
							'selector' => '.slide-title'
						),
						'description' => array(
							'type' => 'string',
							'source' => 'html',
							'selector' => '.slide-description'
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
