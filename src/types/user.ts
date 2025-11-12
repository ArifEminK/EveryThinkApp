/**
 * User Type Definitions
 * TypeScript types for user entity
 */

export interface User {
  id: string; // uuid
  name: string;
  email: string;
  password: string; // hashed
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

