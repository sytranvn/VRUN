/// <reference path="../global.d.ts" />
'use strict'
/** @param {import('fastify').FastifyInstance} fastify */
export default async function (fastify, opts) {
  fastify.decorate('example', 'foobar')
}
