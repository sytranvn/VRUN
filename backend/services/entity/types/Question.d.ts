/**
 * Question
 * A Question
 */
declare interface Question {
    id?: number;
    createdAt?: string | null;
    description?: string | null;
    examId?: number | null;
    status: string;
    title: string;
}
export { Question };
