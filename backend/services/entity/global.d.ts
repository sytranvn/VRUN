import type { PlatformaticApp, PlatformaticDBMixin, PlatformaticDBConfig, Entity, Entities, EntityHooks } from '@platformatic/db'
import { EntityTypes, Answer,Exam,ExamineeExam,ExamineeExamAnswer,Question,Role,User } from './types'

declare module 'fastify' {
  interface FastifyInstance {
    getSchema<T extends 'Answer' | 'Exam' | 'ExamineeExam' | 'ExamineeExamAnswer' | 'Question' | 'Role' | 'User'>(schemaId: T): {
      '$id': string,
      title: string,
      description: string,
      type: string,
      properties: {
        [x in keyof EntityTypes[T]]: { type: string, nullable?: boolean }
      },
      required: string[]
    };
  }
}

interface AppEntities extends Entities {
  answer: Entity<Answer>,
    exam: Entity<Exam>,
    examineeExam: Entity<ExamineeExam>,
    examineeExamAnswer: Entity<ExamineeExamAnswer>,
    question: Entity<Question>,
    role: Entity<Role>,
    user: Entity<User>,
}

interface AppEntityHooks {
  addEntityHooks(entityName: 'answer', hooks: EntityHooks<Answer>): any
    addEntityHooks(entityName: 'exam', hooks: EntityHooks<Exam>): any
    addEntityHooks(entityName: 'examineeExam', hooks: EntityHooks<ExamineeExam>): any
    addEntityHooks(entityName: 'examineeExamAnswer', hooks: EntityHooks<ExamineeExamAnswer>): any
    addEntityHooks(entityName: 'question', hooks: EntityHooks<Question>): any
    addEntityHooks(entityName: 'role', hooks: EntityHooks<Role>): any
    addEntityHooks(entityName: 'user', hooks: EntityHooks<User>): any
}

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<PlatformaticDBConfig> &
      PlatformaticDBMixin<AppEntities> &
      AppEntityHooks
  }
}
