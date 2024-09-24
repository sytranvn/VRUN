/**
 * Exam
 * A Exam
 */
declare interface Exam {
    id?: number;
    createdAt?: string | null;
    createdBy?: number | null;
    description?: string | null;
    status: string;
    title: string;
}
export { Exam };
