'use strict'

let fs = require('fs')
let path = require('path')

/**
 * Get the names of the folders within a folder.
 * @param {string} folder - Folder to perform the search within.
 * @return {Array} The list of the names of the folders.
 */
const getFoldersNameInFolder = (folder) => {
  let foldersName = fs
    .readdirSync(folder)
    .filter(item => fs.lstatSync(path.join(folder, item)).isDirectory())

  return foldersName
}

/**
 * Load the modules within a folder.
 * @param {string} folder - Folder to load the modules from.
 * @param {array} excepts - Modules to exclude.
 * @return {Object} An object containing the modules in a key-value representation.
 */
const loadModulesFromFolder = (folder, excepts = []) => {
  let modules = {}

  fs
    .readdirSync(folder)
    .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js' && !excepts.includes(file))
    .forEach(file => {
      modules[file.replace('.js', '')] = require(path.join(folder, file))
    })

  return modules
}

module.exports = {
  getFoldersNameInFolder,
  loadModulesFromFolder
}
