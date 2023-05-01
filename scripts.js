/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "ecosia"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"NYkdub5GpLG3z1OE","label":"home","bookmarks":[{"id":"RWr1DgQmIks7d2iz","label":"gmail","url":"https://mail.google.com/mail/u/0/?hl=es#inbox"},{"id":"J6Limvbzxg4V0YUg","label":"notion","url":"https://www.notion.so/"},{"id":"QMtgWgNVOved2cbi","label":"whatsapps","url":"https://web.whatsapp.com/"}]},{"id":"IfoaVP1rjCTdANZr","label":"offimatica","bookmarks":[{"id":"jzMMVVOm8JQWqV97","label":"coolors","url":"https://coolors.co/image-picker"},{"id":"qR7n2dzAcLXJT5Md","label":"Pinterest","url":"https://www.pinterest.com/"},{"id":"yy45ip4bM7ILxvPH","label":"texture Ninja","url":"https://texture.ninja/"},{"id":"8rTBHmPC1qzfI1lS","label":"google fonts","url":"https://fonts.google.com/"}]},{"id":"jAN4sew2lR2MLsel","label":"seekers","bookmarks":[{"id":"0lq84zYfrh168rcM","label":"académico","url":"https://scholar.google.com.mx/schhp?hl=es&as_sdt=0,5"},{"id":"6RWtGbvbUHY07c1o","label":"Renati","url":"https://renati.sunedu.gob.pe/"},{"id":"5sZeyBATmJhzoFfF","label":"scielo","url":"https://scielo.org/es/"}]},{"id":"wEm2uiyuCYAkjyb9","label":"upc","bookmarks":[{"id":"ZZDN2UjGZURMqyzK","label":"blackboard","url":"https://aulavirtual.upc.edu.pe/ultra/institution-page"},{"id":"ehAFS6MO7ep7Goph","label":"mi upc","url":"https://estudiante.upc.edu.pe/"},{"id":"GJwpdUp2iy5xjc2T","label":"biblioteca","url":"https://biblioteca.upc.edu.pe/portal/presentacion"},{"id":"AK7EdwRjWemxk514","label":"avc","url":"https://upc.academiavirtualdeciencias.com/login?next=/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
