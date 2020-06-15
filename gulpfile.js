
const fs = require('fs')
const path = require('path')
const ts = require('gulp-typescript')
const gulp = require('gulp')
const tsProject = ts.createProject('tsconfig.json')
const baseConfig = require('./tsconfig.json').compilerOptions
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

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
  if (fs.existsSync(distDir)) {
    cleanDirectory(distDir)
  }
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
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')))
      }
      return resolve()
    })
  })
})

exports.clean = clean
exports.build = gulp.series(clean, 'buildweb', 'buildnode')
