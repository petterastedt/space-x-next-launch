
let upcomingLaunches

(() => {
  // SET PROPER HEIGHT ON MOBILE DEVICES
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)

  fetch('http://localhost:9000/getdata')
  .then(response => response.json())
  .then(response => {
    upcomingLaunches = response
    renderList()
    removeLoading()
  })
  .catch(error => console.log("error", error))
})()

const renderList = () => {
  const list = document.querySelector('.list')
  const today = new Date().toJSON().slice(0,10).replace(/-/g,'-')

  upcomingLaunches.forEach((item, index) => {
    const launchDate = item.date_utc.substr(0).split("T")[0]

    if (index === 0) {
      const html = `
        <li class="list-item">
          <h2 class="list-item-title">${item.name} <strong>${today === launchDate ? `Today - (${launchDate})` : `${launchDate}`}</strong></h2>
          <p class="list-item-description">${item.details ? item.details : 'No details provided yet for this launch'}</p>
          <ul class="links resetList">
            ${item.links.webcast ? `<li><a href=${item.links.webcast} target="_blank" rel="noopener noreferrer">Webcast</a></li>` : ``}
            ${item.links.presskit ? `<li><a href=${item.links.presskit} target="_blank" rel="noopener noreferrer">Presskit</a></li>` : ``}
            ${item.links.wikipedia ? `<li><a href=${item.links.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a></li>` : ``}
            ${item.links.reddit.campaign ? `<li><a href=${item.links.reddit.campaign} target="_blank" rel="noopener noreferrer">Reddit Campaign Thread</a></li>` : ``}
            ${item.links.reddit.media ? `<li><a href=${item.links.reddit.media} target="_blank" rel="noopener noreferrer">Reddit Media Thread</a></li>` : ``}
            ${item.links.reddit.launch ? `<li><a href=${item.links.reddit.launc} target="_blank" rel="noopener noreferrer">Reddit Launch Thread</a></li>` : ``}
          </ul>
        </li>
      `
      list.insertAdjacentHTML('beforeend', html)
    }
  })
}

const removeLoading = () => document.querySelector('.content-loading').classList.add('content-loading--isHidden')
