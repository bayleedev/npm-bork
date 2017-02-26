const npm = require('npm')
const pkg = require('./package.json')
const {cooldown} = require('./manager')

const dependencies = pkg.dependencies
const packages = Object.keys(dependencies).map((packageName) => {
const packageVersion = dependencies[packageName]
  return packageName + '@' + packageVersion
})

const install = cooldown(() => {
  return new Promise((resolve, reject) => {
    npm.load({ progress: false }, (npmErr) => {
      if (npmErr) return reject(npmErr)
      npm.commands.install(process.cwd(), packages, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  })
}, () => {
  Object.keys(require.cache).forEach((file) => {
    if (file.match(/node_modules.npm/)) {
      delete require.cache[file]
    }
  })
})

// Install first
install().then(() => {
  // Install after
  install()
})

// Install while
install()
