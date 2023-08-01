import { handleModal } from "./modal.js"
import { insertedValues } from "./values.js"
import { render, renderFilter, renderSumValues } from "./render.js"

export const createCard = (value) => {
    const card = document.createElement('li')
    const cardContainer = document.createElement('div')
    const cardContent = document.createElement('div')
    const cardValue = document.createElement('h4')
    const cardFlag = document.createElement('span')
    const cardTrash = document.createElement('img')

    card.classList.add('values__items')
    cardContainer.classList.add('values__container')
    cardContent.classList.add('values__content')

    cardTrash.alt = 'Limpar Valor'
    cardTrash.src = './src/assets/trash-default.svg'

    card.dataset.valueID = value.id
    cardValue.innerText = `R$ ${(value.value).toFixed(2).replace('.', ',')}`

    if (value.categoryID === 0) {
        cardFlag.innerText = 'Entrada'
    } else if (value.categoryID === 1) {
        cardFlag.innerText = 'Saída'
    }

    cardTrash.addEventListener('mouseover', () => {
        cardTrash.src = './src/assets/trash-hover.svg'
    })

    cardTrash.addEventListener('mouseout', () => {
        cardTrash.src = './src/assets/trash-default.svg'
    })

    cardTrash.addEventListener('click', () => {
        const valueIndex = insertedValues.findIndex(element => element.id === value.id)
        insertedValues.splice(valueIndex, 1)
        render(insertedValues)
        renderSumValues(insertedValues)
    })
    
    cardContent.append(cardFlag, cardTrash)
    cardContainer.append(cardValue, cardContent)
    card.appendChild(cardContainer)

    return card
}

handleModal()
render(insertedValues)
renderFilter(insertedValues)
renderSumValues(insertedValues)