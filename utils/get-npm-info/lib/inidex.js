'use strict';

const axios = require('axios')
const urlJoin = require('url-join')
const semver = require('semver')

function getNpmInfo(npmName, registry) {
  if(!npmName){
    return null
  }
  const registryUrl = registry || getDefaultRegistry()
  const npmInfoUrl = urlJoin(registryUrl, npmName)
  // console.log(npmInfoUrl);
  return axios.get(npmInfoUrl).then((response) => {
    // console.log(response);
    if(response.status === 200){
      return response.data
    }
    return null
  }).catch((err) => {
    return Promise.reject(err)
  })
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org'
}

async function getNpmVersions(npmName, registry) {
  const data = await getNpmInfo(npmName, registry)
  if(data){
    return Object.keys(data.versions)
  }else{
    return []
  }
}

function getSemverVersions(baseVersion, versions) {
  // console.log(versions, baseVersion)
  versions = versions.filter((version) => {
    return semver.satisfies(version, `^${baseVersion}`)
    // return semver.gt(version, baseVersion)
  })
  // console.log(versions)
  versions.sort((a,b) => {
    if(a===b){
      return 0
    }else{
      return semver.gt(b,a)?1:-1
    }
  })
  // console.log(versions)
  // console.log(  semver.gt('1.0.6','1.0.5'))
  return versions
}

async function getNpmSemverVersion(baseVersion, npmName, registry){
  const versions = await getNpmVersions(npmName, registry)
  // console.log(versions)
  const newVersions = getSemverVersions(baseVersion, versions)
  // console.log(newVersions)
  // return newVersions
  if(newVersions && newVersions.length > 0){
    return newVersions[0]
  }
}
module.exports = {
  getNpmInfo,
  getNpmVersions,
  getNpmSemverVersion
};
