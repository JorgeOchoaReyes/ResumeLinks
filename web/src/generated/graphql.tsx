import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Education = {
  __typename?: 'Education';
  _id: Scalars['Float'];
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  school?: Maybe<Scalars['String']>;
};

export type EducationInput = {
  date: Scalars['String'];
  description: Scalars['String'];
  school: Scalars['String'];
};

export type Experience = {
  __typename?: 'Experience';
  _id: Scalars['Float'];
  company?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ExperienceInput = {
  company: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createPost: Post;
  createResume?: Maybe<Resume>;
  deletePost: Scalars['Boolean'];
  deleteResume: Scalars['Boolean'];
  editResume?: Maybe<ResumeOutput>;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateResumeArgs = {
  input: ResumeInput;
};


export type MutationDeletePostArgs = {
  _id: Scalars['Int'];
};


export type MutationEditResumeArgs = {
  input: ResumeInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  _id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['Float'];
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  points: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findResume?: Maybe<ResumeOutput>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPost;
};


export type QueryFindResumeArgs = {
  _id: Scalars['Float'];
};


export type QueryPostArgs = {
  _id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Resume = {
  __typename?: 'Resume';
  _id: Scalars['Float'];
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  skills: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ResumeInput = {
  education: Array<EducationInput>;
  experience: Array<ExperienceInput>;
  skill: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type ResumeOutput = {
  __typename?: 'ResumeOutput';
  _id: Scalars['Float'];
  createdAt?: Maybe<Scalars['String']>;
  education?: Maybe<Array<Education>>;
  experience?: Maybe<Array<Experience>>;
  skills?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['Int'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  resumeId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', _id: number, username: string, resumeId?: number | null | undefined };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', _id: number, username: string, resumeId?: number | null | undefined } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', _id: number, username: string, resumeId?: number | null | undefined } | null | undefined } };

export type CreateResumeMutationVariables = Exact<{
  input: ResumeInput;
}>;


export type CreateResumeMutation = { __typename?: 'Mutation', createResume?: { __typename?: 'Resume', _id: number } | null | undefined };

export type DeleteResumeMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteResumeMutation = { __typename?: 'Mutation', deleteResume: boolean };

export type EditResumeMutationVariables = Exact<{
  input: ResumeInput;
}>;


export type EditResumeMutation = { __typename?: 'Mutation', editResume?: { __typename?: 'ResumeOutput', _id: number, createdAt?: string | null | undefined, title: string, skills?: Array<string> | null | undefined, education?: Array<{ __typename?: 'Education', date?: string | null | undefined, description?: string | null | undefined, school?: string | null | undefined }> | null | undefined, experience?: Array<{ __typename?: 'Experience', date?: string | null | undefined, description?: string | null | undefined, company?: string | null | undefined }> | null | undefined } | null | undefined };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', _id: number, username: string, resumeId?: number | null | undefined } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', _id: number, username: string, resumeId?: number | null | undefined } | null | undefined } };

export type ResumeQueryVariables = Exact<{
  _id: Scalars['Float'];
}>;


export type ResumeQuery = { __typename?: 'Query', findResume?: { __typename?: 'ResumeOutput', _id: number, createdAt?: string | null | undefined, title: string, skills?: Array<string> | null | undefined, education?: Array<{ __typename?: 'Education', date?: string | null | undefined, description?: string | null | undefined, school?: string | null | undefined }> | null | undefined, experience?: Array<{ __typename?: 'Experience', date?: string | null | undefined, description?: string | null | undefined, company?: string | null | undefined }> | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: number, username: string, resumeId?: number | null | undefined } | null | undefined };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  username
  resumeId
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateResumeDocument = gql`
    mutation CreateResume($input: ResumeInput!) {
  createResume(input: $input) {
    _id
  }
}
    `;

export function useCreateResumeMutation() {
  return Urql.useMutation<CreateResumeMutation, CreateResumeMutationVariables>(CreateResumeDocument);
};
export const DeleteResumeDocument = gql`
    mutation deleteResume {
  deleteResume
}
    `;

export function useDeleteResumeMutation() {
  return Urql.useMutation<DeleteResumeMutation, DeleteResumeMutationVariables>(DeleteResumeDocument);
};
export const EditResumeDocument = gql`
    mutation editResume($input: ResumeInput!) {
  editResume(input: $input) {
    _id
    createdAt
    title
    skills
    education {
      date
      description
      school
    }
    experience {
      date
      description
      company
    }
  }
}
    `;

export function useEditResumeMutation() {
  return Urql.useMutation<EditResumeMutation, EditResumeMutationVariables>(EditResumeDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResumeDocument = gql`
    query Resume($_id: Float!) {
  findResume(_id: $_id) {
    _id
    createdAt
    title
    skills
    education {
      date
      description
      school
    }
    experience {
      date
      description
      company
    }
  }
}
    `;

export function useResumeQuery(options: Omit<Urql.UseQueryArgs<ResumeQueryVariables>, 'query'>) {
  return Urql.useQuery<ResumeQuery>({ query: ResumeDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};