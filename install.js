const npm = require('npm')
const pkg = require('./package.json')

const dependencies = pkg.dependencies
const packages = Object.keys(dependencies).map((packageName) => {
const packageVersion = dependencies[packageName]
  return packageName + '@' + packageVersion
})

function install () {
  return new Promise((resolve, reject) => {
    npm.load({ progress: false }, (npmErr) => {
      if (npmErr) return reject(npmErr)
      npm.commands.install(process.cwd(), packages, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  })
}

install().then(() => { // First install - installs correctly
  return install() // Second install - installs incorrectly ]:
}).catch((e) => {
  console.log('ugh', e)
})
