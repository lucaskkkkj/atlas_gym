const buttonsSidemenu = document.querySelectorAll('#sidebar .side-menu.top li a')
const menuBar = document.querySelector('#sidebar .top-sidebar i.ph-list')
const sidebar = document.getElementById('sidebar')
const content = document.getElementById('content')
const ClientsModal = document.getElementById('alunoModal')
const modal = document.getElementById('modal') // Adicionei a referência ao modal

// Função para salvar o estado da div ativa no sessionStorage
function salvarEstadoDivAtiva() {
	const divAtiva = document.querySelector('#sidebar .side-menu.top li.active')
	if (divAtiva) {
		sessionStorage.setItem('divAtiva', divAtiva.getAttribute('id'))
	}
}

// Função para restaurar o estado da div ativa do sessionStorage
function restaurarEstadoDivAtiva() {
	const idDivAtiva = sessionStorage.getItem('divAtiva')
	if (idDivAtiva) {
		const divAtiva = document.getElementById(idDivAtiva)
		if (divAtiva) {
			divAtiva.parentElement.classList.add('active')
		}
	}
}

// Adicionando listeners para os botões do menu lateral
buttonsSidemenu.forEach(item => {
	const li = item.parentElement
	item.addEventListener('click', function () {
		buttonsSidemenu.forEach(i => {
			i.parentElement.classList.remove('active')
		})
		li.classList.add('active')
		salvarEstadoDivAtiva() // Salvando o estado da div ativa
	})
})

// Restaurando o estado da div ativa ao carregar a página
window.addEventListener('load', restaurarEstadoDivAtiva)

// Restaurando o estado da div ativa ao recarregar a página
window.addEventListener('beforeunload', salvarEstadoDivAtiva)

// Toggle do menu lateral
menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide')
	content.classList.toggle('hide')
})

// Modal Logout
document.querySelector('.logout').addEventListener('click', event => {
	event.preventDefault()
	modal.classList.add('modal-active')
})

document.querySelector('#btnNo').addEventListener('click', event => {
	event.preventDefault()
	modal.classList.remove('modal-active')
})

document.querySelector('.modal-overlay').addEventListener('click', event => {
	if (!event.target.closest('.modal-content')) {
		modal.classList.remove('modal-active')
	}
})

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('search').addEventListener('keyup', function () {
		var value = this.value.toLowerCase()
		var rows = document.querySelectorAll('.clients-table-custom tbody tr')

		rows.forEach(function (row) {
			var name = row.querySelector('td:nth-child(2)').textContent.toLowerCase()
			if (name.indexOf(value) > -1) {
				row.style.display = ''
			} else {
				row.style.display = 'none'
			}
		})
	})
})

// Remover toast após 4 segundos
setTimeout(function () {
	const toast = document.querySelector('.toast-container')
	if (toast) {
		toast.parentNode.removeChild(toast)
	}
}, 4000)
