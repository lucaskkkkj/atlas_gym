import Joi from 'joi'

const authSchema = Joi.object({
	email: Joi.string().email().messages({
		'string.email': 'Por favor, insira um endereço de e-mail válido.',
		'string.empty': 'O campo de e-mail não pode estar vazio.',
		'any.required': 'O campo de e-mail é obrigatório.',
	}),
	password: Joi.string().min(8).max(32).messages({
		'string.min': 'A senha deve ter pelo menos {#limit} caracteres.',
		'string.max': 'A senha deve ter no máximo {#limit} caracteres.',
		'string.empty': 'O campo de senha não pode estar vazio.',
		'any.required': 'O campo de senha é obrigatório.',
	}),
})

export { authSchema }
