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
		extend: {},
	},
	variants: {},
	plugins: [],
};
