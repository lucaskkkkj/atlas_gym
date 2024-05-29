import { Schema } from 'joi'

interface ValidationResult {
	isValid: boolean
	errors: string[]
}

export function SchemaHandler(schema: Schema, data: any): ValidationResult {
	const result: ValidationResult = {
		isValid: false,
		errors: [],
	}

	const { error } = schema.validate(data, { abortEarly: false })

	if (error) {
		result.errors = error.details.map(detail => detail.message)
	} else {
		result.isValid = true
	}

	return result
}
