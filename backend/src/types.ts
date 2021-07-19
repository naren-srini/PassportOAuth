//* File contains the user information interfaces
// Reason: Each OAuth provider gives different set of user information
export interface IMongoDBUser {
    // companyId? means id is "Optional"  
    googleId?: string;
    twitterId?: string;
    githubId?: string;
    username: string;
    __v: number;
    _id: string;
}