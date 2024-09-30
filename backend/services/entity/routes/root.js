/// <reference path="../global.d.ts" />
'use strict'
import argon2 from 'argon2'

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

const signupSchema = {
	body: {
		type: 'object',
		required: ['username', 'password', 'fullName'],
		properties: {
			username: { type: 'string' },
			password: { type: 'string' },
			fullName: { type: 'string' },
		}
	}
}
/** @param {import('fastify').FastifyInstance} fastify */
export default async function(fastify, opts) {
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
			throw fastify.platformatic.httpErrors.unauthorized();
		}
		const { password: hashedPass, ...payload } = user;
		if (!await argon2.verify(hashedPass, password, { secret })) {
			throw fastify.platformatic.httpErrors.unauthorized();
		}
		const [role] = await fastify.platformatic.entities.role.find({
			where: { id: { eq: user.role } },
			limit: 1
		})
		user.role = role.name
		const token = fastify.jwt.sign(payload)
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
			throw fastify.platformatic.httpErrors.badRequest();
		}
		const token = fastify.jwt.sign({
			id: user.id,
			username: user.username,
			role: user.role,
			fullName: user.fullName,
		})
		return { token }
	})
}
