/// <reference path="../global.d.ts" />
'use strict'
import argon2 from 'argon2'
import sensible from '@fastify/sensible'

/**
 * @typedef {import('fastify').FastifySchema} FastifySchema
 */
/** @type {FastifySchema} */
const schema = {
	body: {
		type: 'object',
		required: ['username', 'password'],
		properties: {
			username: { type: 'string' },
			password: { type: 'string' },
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				token: { type: 'string' },
			}
		},
	},
	security: []
}

/** @type {FastifySchema} */
const signupSchema = {
	body: {
		type: 'object',
		required: ['username', 'password', 'fullName'],
		properties: {
			username: { type: 'string' },
			password: { type: 'string' },
			fullName: { type: 'string' },
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				token: { type: 'string' },
			}
		},
	},
	security: []
}
/** @param {import('fastify').FastifyInstance} fastify */
export default async function(fastify, opts) {
	fastify.register(sensible);
	fastify.post('/login', { schema }, async (request, reply) => {
		const secret = Buffer.from(opts.secret)
		const { username, password } = request.body
		const [user] = await fastify.platformatic.entities.user.find({
			where: {
				username: { eq: username },
			},
			limit: 1,
		})
		if (!user) {
			throw fastify.httpErrors.unauthorized();
		}
		const { password: hashedPass, ...payload } = user;
		if (!await argon2.verify(hashedPass, password, { secret })) {
			throw fastify.httpErrors.unauthorized();
		}
		const [role] = await fastify.platformatic.entities.role.find({
			where: { id: { eq: user.role } },
			limit: 1
		})
		const token = fastify.jwt.sign({
			id: user.id,
			username: user.username,
			role: role.name,
			fullName: user.fullName,
		})
		return { token }
	})

	fastify.post('/signup', { schema: signupSchema }, async (request, reply) => {
		const secret = Buffer.from(opts.secret)
		const { username, password, fullName } = request.body
		const hashedPass = await argon2.hash(password, { secret })
		const user = await fastify.platformatic.entities.user.save({
			input: {
				username,
				full_name: fullName,
				password: hashedPass
			}
		})
		if (!user) {
			throw fastify.httpErrors.badRequest();
		}
		const [role] = await fastify.platformatic.entities.role.find({
			where: { id: { eq: user.role } },
			limit: 1
		})
		const token = fastify.jwt.sign({
			id: user.id,
			username: user.username,
			role: role.name,
			fullName: user.fullName,
		})
		return { token }
	})
}
