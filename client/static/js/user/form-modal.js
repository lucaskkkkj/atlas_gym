const addClientButton = document.querySelector('.add-client')
const closeButton = document.querySelector('.add-client-modal .close')

addClientButton.addEventListener('click', () => {
	ClientsModal.style.display = 'block'
})

closeButton.onclick = function () {
	ClientsModal.style.display = 'none'
}