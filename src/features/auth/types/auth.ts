import { User } from "firebase/auth";

export interface UserProfile {
    email: string;
    displayName: string;
    accountName: string;
    avatar: string;
    role: string;
}

export interface LoginResult {
    authUser: User;
    profile: UserProfile;
}