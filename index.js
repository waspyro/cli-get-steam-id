#!/usr/bin/env node
const getProfileIDFromUrl = url => url.match(/\/*id*\/(\w*)\/?/)?.[1]
const getStaemIDFromUrl = url => url.match(/\/*profile*\/(\d*)\/?/)?.[1]

const get = (url, cb) => {
  require('https')
    .get(url)
    .on("response", res => {
      let data = ''
      res.on('data', d => data += d)
        .on('end', () => cb(data))
    })
}

const getFromAPI = (key, id, cb) =>
  get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?key=${key}&vanityurl=${id}`,
      data => cb(JSON.parse(data).response.steamid || null))

const scrapeFromUserPage = (id, cb) => {
  get('https://steamcommunity.com/id/'+id, html => {
    cb(html.match(/"steamid":"(\d*)"/)?.[1])
  })
}

const getSteamID = (url, apikey, cb) => {
  if(!url) process.exit(1)

  const urlSID = getStaemIDFromUrl(url)
  if(urlSID) return cb(urlSID)
  const profileID = getProfileIDFromUrl(url) || url

  if(apikey) getFromAPI(apikey, profileID, cb)
  else scrapeFromUserPage(profileID, cb)
}

getSteamID(process.argv[2], process.env.GETSID_CLI_API_KEY, console.log)