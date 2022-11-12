import { request } from '@playwright/test'

export async function getRequestWithParams(
	endpointPath: string,
	params: {},
	elementAction: () => void
) {
	const _response = await (
		await request.newContext()
	).get(`${endpointPath}`, {
		params: params
	})
}
