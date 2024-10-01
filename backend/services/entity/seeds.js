'use strict'
/// <reference path="./global.d.ts" />
/** @typedef {import('@platformatic/sql-mapper').Entities} Entities */

import argon2 from 'argon2'

const users = [{
	username: 'admin1',
	fullName: 'Admin 1',
	role: 1,
},
{
	username: 'admin2',
	fullName: 'Admin 2',
	role: 1,
}]
/**
 * @param {Object} opts
 * @param {Entities} opts.entities 
 * @param {*} opts.db 
 * @param {*} opts.sql 
 */
export async function seed(opts) {
	const secret = Buffer.from(process.env.PLT_SECRET)
	const password = process.env.PLT_ADMIN_PASS
	for (const user of users) {
		const input = { ...user, password: await argon2.hash(password, { secret }) }
		await opts.entities.user.save({ input })
	}
}
