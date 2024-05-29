document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('trainingModal')
	const addTrainingBtn = document.getElementById('addTrainingBtn')
	const closeModal = document.getElementById('closeModal')

	addTrainingBtn.addEventListener('click', function () {
		modal.classList.remove('hidden')
		modal.style.display = 'block'
	})

	closeModal.addEventListener('click', function () {
		modal.classList.add('hidden')
		modal.style.display = 'none'
	})

	window.addEventListener('click', function (event) {
		if (event.target === modal) {
			modal.classList.add('hidden')
			modal.style.display = 'none'
		}
	})

	const exerciseSelect = document.getElementById('exerciseSelect')
	exerciseSelect.addEventListener('change', handleExerciseSelectChange)
})

function resetForm() {
	document.getElementById('form').reset()
	document.getElementById('exercises').classList.add('hidden')
	document.getElementById('exerciseList').innerHTML = ''
}