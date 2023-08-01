import { createCard } from "./index.js"
import { createModal } from "./modal.js"
import { insertedValues } from "./values.js"

export const render = (array) => {
    const list = document.querySelector('.values__list')
    list.innerHTML = ''

    array.forEach(value => {
        const card = createCard(value)
        list.appendChild(card)
    })
    renderEmptyValues(insertedValues)
}

export const renderFilter = (array) => {
    const filterAll = document.querySelector('#all')
    const filterInputs = document.querySelector('#inputs')
    const filterOutputs = document.querySelector('#outputs')
    const sumValues = document.querySelector('.sum__value')
    
    filterAll.addEventListener('click', () => {
        const inputValues = array.filter(value => value.categoryID === 0)
        const outputValues = array.filter(value => value.categoryID === 1)
        const totalInputSum = inputValues.reduce((acc, actual) => acc + actual.value, 0)
        const totalOutputSum = outputValues.reduce((acc, actual) => acc + actual.value, 0)

        const result = totalInputSum - totalOutputSum
        sumValues.innerText = `R$ ${result.toFixed(2).replace('.', ',')}`
        render(array)
    })
    
    filterInputs.addEventListener('click', () => {
        const filteredValues = array.filter(value => value.categoryID === 0)

        if (filteredValues.length === 0) {
            alert('Registre um valor de entrada')
            const filterButton = document.querySelector('#inputs')
            filterButton.blur()
            return
        }
        
        const filteredSum = filteredValues.reduce((sum, value) => sum + value.value, 0)
        sumValues.innerText = `R$ ${filteredSum.toFixed(2).replace('.', ',')}`
        render(filteredValues)
    })
    
    filterOutputs.addEventListener('click', () => {
        const filteredValues = array.filter(value => value.categoryID === 1)

        if (filteredValues.length === 0) {
            alert('Registre um valor de saída')
            const filterButton = document.querySelector('#outputs')
            filterButton.blur() 
            return
        }
        
        const filteredSum = filteredValues.reduce((acc, actual) => acc + actual.value, 0)
        sumValues.innerText = `R$ -${filteredSum.toFixed(2).replace('.', ',')}`

        if (filteredValues.length === 0) {
            alert('Registre um valor de saída')
        } else {
            render(filteredValues)
        }
    })
}

export const renderSumValues = (array) => {
    const sumValue = document.querySelector('.sum__value')
    const result = array.reduce((acc, actual) => {
        if (actual.categoryID === 0) {
            return acc + actual.value
        } else if (actual.categoryID === 1) {
            return acc - actual.value
        } else {
            return acc
        }
    }, 0)

    sumValue.innerText = `R$ ${result.toFixed(2).replace('.', ',')}`
}

const renderEmptyValues = (array) => {
    const emptyContainer = document.querySelector('.empty__container')
    const emptyTitle = document.createElement('h2')
    const emptyButton = document.createElement('span')

    emptyTitle.classList.add('empty__title')
    emptyButton.classList.add('empty__button', 'modal__open')

    emptyTitle.innerText = 'Nenhum valor cadastrado'
    emptyButton.innerText = 'Registre novo valor'

    emptyContainer.innerHTML = ''

    if (array.length === 0) {
        emptyContainer.classList.remove('hidden')
        emptyContainer.append(emptyTitle, emptyButton)

        emptyButton.addEventListener('click', () => {
            const modal = document.querySelector('.modal__controller')
            modal.innerHTML = ''
            createModal()
            modal.showModal()
        })
    } else {
        emptyContainer.classList.add('hidden')
        const section = document.querySelector('.values__section')
        section.style.marginTop = '-65px'
    }
}