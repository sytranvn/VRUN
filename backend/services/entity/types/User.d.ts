/**
 * User
 * A User
 */
declare interface User {
    id?: number;
    createdAt?: string | null;
    fullName: string;
    password: string;
    role?: number | null;
    username: string;
}
export { User };
