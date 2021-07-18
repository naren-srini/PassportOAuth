//* File contains the user information interfaces
export interface IMongoDBUser {
    googleId?: string;
    twitterId?: string;
    githubId?: string;
    username: string;
    __v: number;
    _id: string;
}