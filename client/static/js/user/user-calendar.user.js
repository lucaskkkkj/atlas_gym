document.addEventListener('DOMContentLoaded', function () {
	const calendarEl = document.getElementById('calendar')

	// Obter data de hoje
	const today = new Date()

	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		aspectRatio: 1.5,
		height: 'auto',
		initialView: 'dayGridMonth',
		events: [
			{
				title: 'Treino A',
				daysOfWeek: [1],
				color: 'blue',
			},
			{
				title: 'Treino B',
				daysOfWeek: [2],
				color: 'green',
			},
			{
				title: 'Treino C',
				daysOfWeek: [3],
			},
			{
				title: 'Treino D',
				daysOfWeek: [4],
				color: 'brown',
			},
			{
				title: 'Treino E',
				daysOfWeek: [5],
				color: 'orange',
			},
		],
		locale: 'pt',
	})

	calendar.render()
})
