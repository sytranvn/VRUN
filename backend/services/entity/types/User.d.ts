/**
 * User
 * A User
 */
declare interface User {
    id?: number;
    createdAt?: string | null;
    email: string;
    fullName: string;
    provider: string;
    providerId: string;
    role?: number | null;
}
export { User };
