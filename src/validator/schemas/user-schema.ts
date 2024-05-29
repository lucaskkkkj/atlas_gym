import Joi from 'joi'

const userSchema = Joi.object({
	name: Joi.string().min(3).max(50).messages({
		'string.min': 'O nome deve ter pelo menos {#limit} caracteres.',
		'string.max': 'O nome deve ter no máximo {#limit} caracteres.',
		'string.empty': 'O campo de nome não pode estar vazio.',
		'any.required': 'O campo de nome é obrigatório.',
	}),
	age: Joi.number().min(12).positive().integer().messages({
		'number.base': 'A idade deve ser um número válido.',
		'number.min': 'A idade deve ser no mínimo {#limit}.',
		'number.positive': 'A idade deve ser um número positivo.',
		'number.integer': 'A idade deve ser um número inteiro.',
		'any.required': 'O campo de idade é obrigatório.',
	}),
	email: Joi.string().email().messages({
		'string.email': 'Por favor, insira um endereço de e-mail válido.',
		'string.empty': 'O campo de e-mail não pode estar vazio.',
		'any.required': 'O campo de e-mail é obrigatório.',
	}),
	phone: Joi.string(),
	photo: Joi.string(),
	state: Joi.string().valid('Iniciante', 'Intermediário', 'Avançado').messages({
		'any.only':
			'O estado deve ser um dos valores permitidos: Iniciante, Intermediário, Avançado.',
		'string.empty': 'O campo de estado não pode estar vazio.',
		'any.required': 'O campo de estado é obrigatório.',
	}),
	sex: Joi.string().valid('Masculino', 'Feminino').messages({
		'any.only': 'O sexo deve ser Masculino ou Feminino.',
		'string.empty': 'O campo de sexo não pode estar vazio.',
		'any.required': 'O campo de sexo é obrigatório.',
	}),
	focus: Joi.string(),
})

export { userSchema }
