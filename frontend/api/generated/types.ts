/* Run `npm run codegen` with backend at localhost:3002 to regenerate */
import { parse } from 'graphql'
import type { DocumentNode } from 'graphql'

export type AuthUserFragment = {
  __typename?: 'User'
  id: number
  email: string
  status: string
}

export type CreateUserMutationVariables = {
  data: {
    email: string
    password: string
    status: string
  }
}

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: AuthUserFragment
}

export type SigninMutationVariables = {
  data: {
    email: string
    password: string
  }
}

export type SigninMutation = {
  __typename?: 'Mutation'
  signin: AuthUserFragment
}

export type SignOutMutation = {
  __typename?: 'Mutation'
  signOut: AuthUserFragment
}

export type MeQuery = {
  __typename?: 'Query'
  me: AuthUserFragment
}

const CREATE_USER = parse(`
  fragment AuthUser on User {
    id
    email
    status
  }
  mutation createUser($data: CreateUserDto!) {
    createUser(data: $data) {
      ...AuthUser
    }
  }
`)

const SIGNIN = parse(`
  fragment AuthUser on User {
    id
    email
    status
  }
  mutation signin($data: SigninDto!) {
    signin(data: $data) {
      ...AuthUser
    }
  }
`)

const SIGNOUT = parse(`
  fragment AuthUser on User {
    id
    email
    status
  }
  mutation signOut {
    signOut {
      ...AuthUser
    }
  }
`)

const ME = parse(`
  fragment AuthUser on User {
    id
    email
    status
  }
  query me {
    me {
      ...AuthUser
    }
  }
`)

export const CreateUserDocument = CREATE_USER as DocumentNode
export const SigninDocument = SIGNIN as DocumentNode
export const SignOutDocument = SIGNOUT as DocumentNode
export const MeDocument = ME as DocumentNode
