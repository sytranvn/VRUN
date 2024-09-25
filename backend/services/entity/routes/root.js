/// <reference path="../global.d.ts" />
'use strict'

const schema = {
	body: {
		type: 'object',
		required: ['username', 'password'],
		properties: {
			username: { type: 'string' },
			password: { type: 'string' },
		}
	}
}

/** @param {import('fastify').FastifyInstance} fastify */
export default async function(fastify, opts) {
	fastify.post('/login', { schema }, async (request, reply) => {
		console.log('platformatic', Object.keys(fastify.jwt))
		const token = fastify.jwt.sign({
			...request.body,
			role: 'platformatic-admin'
		})
		return { token }
	})
}
