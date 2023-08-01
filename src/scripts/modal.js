import { render, renderSumValues } from "./render.js"
import { insertedValues } from "./values.js"

export const createModal = () => {
    const modal = document.querySelector('.modal__controller')

    const modalContainer = document.createElement('div')
    const modalHeader = document.createElement('div')
    const modalTitle = document.createElement('h2')
    const modalClose = document.createElement('button')
    const modalText = document.createElement('p')
    const modalContainerValue = document.createElement('div')
    const labelValue = document.createElement('label')
    const inputValue = document.createElement('input')
    const modalContainerType = document.createElement('div')
    const labelType = document.createElement('label')
    const inputType = document.createElement('button')
    const outputType = document.createElement('button')
    const modalContainerButtons = document.createElement('div')
    const buttonCancel = document.createElement('button')
    const buttonInsert = document.createElement('button')

    modalContainer.classList.add('modal__container')
    modalHeader.classList.add('modal__header')
    modalClose.classList.add('modal__close')
    modalContainerValue.classList.add('modal__container--value')
    inputValue.classList.add('modal__input--value')
    modalContainerType.classList.add('modal__container--type')
    inputType.classList.add('modal__type--input')
    outputType.classList.add('modal__type--output')
    modalContainerButtons.classList.add('modal__container--buttons')
    buttonCancel.classList.add('modal__button--cancel')
    buttonInsert.classList.add('modal__button--insert')

    modalTitle.innerText = 'Registro de valor'
    modalClose.innerText = 'X'
    modalText.innerText = 'Digite o valor e em seguida aperte no botão referente ao tipo do valor'
    labelValue.innerText = 'Valor'
    labelType.innerText = 'Tipo de valor'
    inputType.innerText = 'Entrada'
    outputType.innerText = 'Saída'
    buttonCancel.innerText = 'Cancelar'
    buttonInsert.innerText = 'Inserir valor'

    inputValue.type = 'number'
    inputValue.placeholder = 'R$ 00,00'

    modalClose.addEventListener('click', () => modal.close())
    buttonCancel.addEventListener('click', () => modal.close())

    inputType.addEventListener('click', () => {
        inputType.classList.add('active')
        outputType.classList.remove('active')
    })

    outputType.addEventListener('click', () => {
        outputType.classList.add('active')
        inputType.classList.remove('active')
    })

    buttonInsert.addEventListener('click', () => {
        const inputValue = document.querySelector('.modal__input--value')
        const value = parseFloat(inputValue.value)

        if (isNaN(value)) {
            alert('Por favor, insira um valor.')
            return
        }

        let categoryID

        if (inputType.classList.contains('active')) {
            categoryID = 0
        } else if (outputType.classList.contains('active')) {
            categoryID = 1
        } else {
            alert('Por favor, selecione um tipo de valor.')
            return
        }

        const newObject = {
            id: insertedValues.length + 1,
            value: value,
            categoryID: categoryID
        }
        insertedValues.push(newObject)
        render(insertedValues)
        renderSumValues(insertedValues)

        const modal = document.querySelector('.modal__controller')
        modal.close()
    })
    modalHeader.append(modalTitle, modalClose)
    modalContainerButtons.append(buttonCancel, buttonInsert)
    modalContainerType.append(labelType, inputType, outputType)
    modalContainerValue.append(labelValue, inputValue)
    modalContainer.append(modalHeader, modalText, modalContainerValue, modalContainerType, modalContainerButtons)
    modal.appendChild(modalContainer)
}

export const handleModal = () => {
    const button = document.querySelector('.modal__open')
    
    button.addEventListener('click', () => {
        const modal = document.querySelector('.modal__controller')
        modal.innerHTML = ''
        createModal()
        modal.showModal()
    })
}