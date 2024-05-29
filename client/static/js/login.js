const container = document.getElementById('container')
const registerBtn = document.getElementById('register')
const loginBtn = document.getElementById('login')

function saveState(isActive) {
	sessionStorage.setItem('containerActive', isActive)
}

function loadState() {
	const isActive = sessionStorage.getItem('containerActive')
	if (isActive === 'true') {
		container.classList.add('active')
	} else {
		container.classList.remove('active')
	}
}

registerBtn.addEventListener('click', () => {
	container.classList.add('active')
	saveState(true)
})

loginBtn.addEventListener('click', () => {
	container.classList.remove('active')
	saveState(false)
})

window.addEventListener('load', () => {
	loadState()
})

setTimeout(function () {
	const toast = document.querySelector('.toast-container')
	if (toast) {
		toast.parentNode.removeChild(toast)
	}
}, 4000)
