#!/usr/bin/env node

// Use CLI to generate boilerplate: npx webpack-react-express-ssr my-app

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.')
  console.log('For example: npx webpack-react-express-ssr my-app')
  process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const gitRepo = 'https://github.com/lhz516/webpack-react-express-ssr.git'

try {
  fs.mkdirSync(projectPath)
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    )
  } else {
    console.log(err)
  }
  process.exit(1)
}

async function main() {
  try {
    console.log(`Generating the project ${projectName}...`)
    console.log('[1] Downloading boilerplate...')
    execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`)

    process.chdir(projectPath)

    console.log('[2] Removing useless files')
    execSync('npx rimraf ./.git')
    await fs.rmSync(path.join(projectPath, 'bin'), { recursive: true })

    console.log('[3] Initializing git...')
    execSync('git init')

    console.log(
      '[4] Installing dependencies (takes some time based on your network)...'
    )
    execSync('yarn')

    console.log('✨ The installation is done, now ready to use!')
  } catch (error) {
    console.log(error)
    console.log('\nGenerating boilerplate failed due to the error above.')
  }
}

main()
