module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	purge: {
		content: [
			'./src/**/*.html',
			'./src/**/*.ts',
			'./src/**/*.tsx',
			'./src/**/*.js',
			'./src/**/*.jsx',
		],
	},
	theme: {
		extend: {
			maxWidth: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
			}
		},
	},
	variants: {},
	plugins: [],
};
