import { Answer } from './Answer'
import { Exam } from './Exam'
import { ExamineeExam } from './ExamineeExam'
import { ExamineeExamAnswer } from './ExamineeExamAnswer'
import { Question } from './Question'
import { Role } from './Role'
import { User } from './User'
  
interface EntityTypes  {
  Answer: Answer
    Exam: Exam
    ExamineeExam: ExamineeExam
    ExamineeExamAnswer: ExamineeExamAnswer
    Question: Question
    Role: Role
    User: User
}
  
export { EntityTypes, Answer, Exam, ExamineeExam, ExamineeExamAnswer, Question, Role, User }