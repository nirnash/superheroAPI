
const superheroToken = '10160081348609354'
const baseURL = `https://www.superheroapi.com/api.php/${superheroToken}`
const heroButton = document.getElementById('newHeroButton')
const heroImage = document.getElementById('heroImage')
const searchButton = document.getElementById('searchButton')
const text = document.getElementById('inputSearch')


const getSuperHero = (id, name) => {
  fetch(`${baseURL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.powerstats)
      const name = `<h2>${json.name}</h2>`
      const stats = getStatsHTML(json)
      heroImage.innerHTML = `${name}<img src='${json.image.url}' width=200 height=200/>${stats}`
    })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️',
  power: '📊',
  combat: '⚔️'
}

const getStatsHTML = (character) => {
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]}${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  })
  return stats.join('')
}

const newHero = () => {
  let randomNumber = Math.floor(Math.random() * 732)
  return randomNumber
}

heroButton.onclick = () => {
  text.value = ''
  getSuperHero(newHero())
}

const search = (name) => {
  fetch(`${baseURL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      const name = `<h2>${hero.name}</h2>`
      const stats = getStatsHTML(hero)
      heroImage.innerHTML = `${name}<img src='${hero.image.url}' width=200 height=200/>${stats}`
    })
}

searchButton.onclick = () => search(text.value)