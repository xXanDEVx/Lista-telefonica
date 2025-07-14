const changeTabArea = document.getElementById('changeTab')
const allTabs = document.querySelectorAll("[data-tab-name]")
const searchArea = document.getElementsByClassName('search-area')
const buttonsTab = document.getElementsByClassName('button-area')
const buttonSave = document.getElementById('btnSave')
const nameArea = document.getElementById('nameArea')
const telArea = document.getElementById('telArea')
const listaSearch = document.getElementById('listaTelSearch')
const listaTel = document.getElementById('listaTel')
const pesquisar = document.getElementById('searchContact')
const states = {
    items: [],

    get profiles() {
        return this.items.map((x) => x.name[0])
    },
    searchContact(name = '') {
        const filteredItems = this.items.filter(item => {
            if (name === '') return true;

            const itemMinusculo = String(item.name).toLowerCase()
            const nameMinusculo = String(name).toLowerCase()
            const numberWithOutSpecialChars = String(item.number)

            if (numberWithOutSpecialChars.includes(nameMinusculo)) return true;
            return itemMinusculo.includes(nameMinusculo)
        })
        return filteredItems
    }
}

function choseTab(tabList, name = '', className) {
    for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].classList.contains(className)) {
            tabList[i].classList.remove(className);
        }
        if (tabList[i].dataset.tabName === name) {
            tabList[i].classList.add(className)
        }
    }
}

function changeButtonStatus(activeRef) {
    const allButtons = document.querySelectorAll("[data-ref]")

    for (const button of Array.from(allButtons)) {
        button.classList.remove("button-active")
        if (button.dataset.ref === activeRef) button.classList.add("button-active")
    }
}

function createContact(name, number) {
    return states.items.push({
        name: name,
        number: number
    })
}

function renderContact(list, contactArea) {
    function generateContact(item) {
        const div = document.createElement('div')
        const profile = document.createElement('div')
        const profilePicture = document.createElement('p')
        const informations = document.createElement('div')
        const h1 = document.createElement('h1')
        const p = document.createElement('p')

        h1.innerText = item.name
        p.innerText = `+55 ${item.number}`
        div.classList.add("contact")
        informations.classList.add("informations")

        profile.classList.add('profile')
        profilePicture.innerText = item.name[0]

        profile.appendChild(profilePicture)
        informations.appendChild(h1)
        informations.appendChild(p)
        div.appendChild(profile)
        div.appendChild(informations)
        return div
    }

    const fragment = document.createDocumentFragment()

    for (const item of list) {
        const div = generateContact(item)
        fragment.appendChild(div)
    }

    contactArea.replaceChildren()
    contactArea.append(fragment)
}

function renderProfile(NameProfile, contactArea) {
    function generateProfile(item) {
        const div = document.createElement('div')
        const p = document.createElement('p')

        p.innerText = item
        div.classList = "profile-area"

        div.appendChild(p)
        return div
    }

    const fragment = document.createDocumentFragment()

    for (const item of NameProfile) {
        const div = generateProfile(item)
        fragment.appendChild(div)
    }

    contactArea.replaceChildren()
    contactArea.append(fragment)
}

changeTabArea.addEventListener('click', e => {
    if (e.target.dataset.ref) {
        choseTab(allTabs, e.target.dataset.ref, "active")
        changeButtonStatus(e.target.dataset.ref)
    }
})


buttonSave.addEventListener('click', () => {
    if (!nameArea.value == '' && !telArea.value == '' && telArea.value.length === 9) {
        createContact(nameArea.value, telArea.value)
        renderProfile(states.profiles, listaTel)
        renderContact(states.items, listaTel)
        renderContact(states.items, listaSearch)
        nameArea.value = ""
        telArea.value = ""

    }
})

pesquisar.addEventListener('input', e => {
    renderContact(states.searchContact(e.target.value), listaSearch)
})

document.addEventListener('DOMContentLoaded', () => {
    choseTab(allTabs, "new-tab", "active")
    changeButtonStatus("new-tab")

})