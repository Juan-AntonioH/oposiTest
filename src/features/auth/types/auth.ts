import { User } from "firebase/auth";
import { Role } from '@/core/types/roles';
export interface UserProfile {
    email: string;
    displayName: string;
    accountName: string;
    avatar: string;
    role: Role;
    deleted?: boolean;
    createdAt?: any;
    updatedAt?: any;
}

export interface LoginResult {
    authUser: User;
    profile: UserProfile;
}