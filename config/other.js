let OTHERCONFIG;
if (process.env.NODE_ENV === 'production') {
	OTHERCONFIG = {
		SECRET: 's3cr3tSes'
	};
} else {
	OTHERCONFIG = {
		SECRET: 's3cr3tSessioN'
	};
}

module.exports = { OTHERCONFIG };