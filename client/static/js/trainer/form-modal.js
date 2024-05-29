const addClientButton = document.querySelector('.add-client')
const closeButton = document.querySelector('.add-client-modal .close')

addClientButton.addEventListener('click', () => {
	ClientsModal.style.display = 'block'
})

closeButton.onclick = function () {
	ClientsModal.style.display = 'none'
}

/* Masked Inputs */
VMasker(document.querySelector('#tel')).maskPattern('(99) 9999-99999')
VMasker.toPattern({ pattern: '(99) 9999-99999	', placeholder: 'x' })
