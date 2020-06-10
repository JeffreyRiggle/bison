
const fs = require('fs')
const path = require('path')
const ts = require('gulp-typescript')
const gulp = require('gulp')
const tsProject = ts.createProject('tsconfig.json')
const baseConfig = require('./tsconfig.json').compilerOptions

function cleanDirectory (directory) {
  const files = fs.readdirSync(directory)
  files.forEach(file => {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isFile()) {
      fs.unlinkSync(filePath)
    }

    if (stat.isDirectory()) {
      cleanDirectory(filePath)
    }
  })
}

function clean (cb) {
  const distDir = path.join(__dirname, 'dist')
  cleanDirectory(distDir)
  cb()
}

gulp.task('buildnode', () => {
  return tsProject.src()
    .pipe(ts({
      ...baseConfig,
      module: 'CommonJS'
    }))
    .pipe(gulp.dest('dist/cjs'))
})

gulp.task('buildweb', () => {
  return tsProject.src()
    .pipe(ts({
      ...baseConfig,
      module: 'ESNext',
      moduleResolution: 'Node'
    }))
    .pipe(gulp.dest('dist/esm'))
})

exports.clean = clean
exports.build = gulp.series(clean, 'buildweb', 'buildnode')
