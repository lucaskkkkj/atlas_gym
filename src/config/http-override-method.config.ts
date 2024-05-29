import { Request } from 'express'

export function methodOverrideCallback(request: Request) {
	if (request.body && typeof request.body === 'object' && '_method' in request.body) {
		var method = request.body._method
		delete request.body._method
		return method
	}
}
