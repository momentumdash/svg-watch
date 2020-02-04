'use strict'

const { dest, series, src, watch } = require('gulp')
const del = require('del')
const svgo = require('gulp-svgo')

// set up input/output folders
let dir = {
	home: require('os').homedir(),
	subfolder: '/Downloads/svg/'
}
dir.input = dir.home + dir.subfolder + '*.svg'
dir.output = dir.home + dir.subfolder + 'clean'

// clean the output folder
function clean() {
	// force needed to delete outside of repo
	return del([ dir.output ], { force: true })
}

// clean the svgs
function prepareSvg() {
	return src( dir.input )
		.pipe(svgo())
		.pipe(dest(dir.output))
}

// export tasks
exports.default = function () {
	series(clean, prepareSvg)()
	watch(dir.input, series(clean, prepareSvg))
}
