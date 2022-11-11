import { test, expect } from '@playwright/test'

const expectedResponse = {}

test.describe.parallel('API Testing', () => {
	const baseUrl = 'https://regres.in.api'
	const endpoint = '/users/3'
	const postData = {
		id: 1
	}

	const loginData = {}

	test('Basic API Test - Assert Response Status', async ({ request }) => {
		const response = await request.get(`${baseUrl}${endpoint}`)
		expect(response.status).toBe(200)

		const responseBody = JSON.parse(await response.text())
		expect(responseBody).toEqual(expectedResponse)
	})

	test('Basic API Test - Assert POST Request', async ({ request }) => {
		const response = await request.post(`${baseUrl}${endpoint}`, {
			data: postData
		})

		const responseBody = JSON.parse(await response.text())
		expect(responseBody.id).toBe(1)
	})

	test('Basic API Test - Assert Login Request', async ({ request }) => {
		const response = await request.post(`${baseUrl}${endpoint}`, {
			data: loginData
		})

		const responseBody = JSON.parse(await response.text())
		expect(responseBody.status).toBe(200)
		expect(responseBody.token).toBeTruthy()
	})
})
