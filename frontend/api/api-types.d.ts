export interface FullResponse<T, U extends number> {
  'statusCode': U;
  'headers': object;
  'body': T;
}

export type EntityGetRoleRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.name.eq'?: string;
  'where.name.neq'?: string;
  'where.name.gt'?: string;
  'where.name.gte'?: string;
  'where.name.lt'?: string;
  'where.name.lte'?: string;
  'where.name.like'?: string;
  'where.name.in'?: string;
  'where.name.nin'?: string;
  'where.name.contains'?: string;
  'where.name.contained'?: string;
  'where.name.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.name'?: 'asc' | 'desc';
}

export type EntityGetRoleResponseOK = Array<{ 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null }>
export type EntityGetRoleResponses =
  EntityGetRoleResponseOK

export type EntityCreateRoleRequest = {
  'id'?: number;
  'name': string;
  'createdAt'?: string | null;
}

export type EntityCreateRoleResponseOK = {
  'id': number | null;
  'name': string | null;
  'createdAt': string | null;
}
export type EntityCreateRoleResponses =
  EntityCreateRoleResponseOK

export type EntityUpdateRoleRequest = {
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.name.eq'?: string;
  'where.name.neq'?: string;
  'where.name.gt'?: string;
  'where.name.gte'?: string;
  'where.name.lt'?: string;
  'where.name.lte'?: string;
  'where.name.like'?: string;
  'where.name.in'?: string;
  'where.name.nin'?: string;
  'where.name.contains'?: string;
  'where.name.contained'?: string;
  'where.name.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'name': string;
  'createdAt'?: string | null;
}

export type EntityUpdateRoleResponseOK = Array<{ 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateRoleResponses =
  EntityUpdateRoleResponseOK

export type EntityGetRoleByIdRequest = {
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'id': number;
}

export type EntityGetRoleByIdResponseOK = {
  'id': number | null;
  'name': string | null;
  'createdAt': string | null;
}
export type EntityGetRoleByIdResponses =
  EntityGetRoleByIdResponseOK

export type EntityUpdateRoleRequest = {
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'id': number;
  'name': string;
  'createdAt'?: string | null;
}

export type EntityUpdateRoleResponseOK = {
  'id': number | null;
  'name': string | null;
  'createdAt': string | null;
}
export type EntityUpdateRoleResponses =
  EntityUpdateRoleResponseOK

export type EntityDeleteRoleRequest = {
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'id': number;
}

export type EntityDeleteRoleResponseOK = {
  'id': number | null;
  'name': string | null;
  'createdAt': string | null;
}
export type EntityDeleteRoleResponses =
  EntityDeleteRoleResponseOK

export type EntityGetUserForRoleRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityGetUserForRoleResponseOK = Array<{ 'id'?: number | null; 'username'?: string | null; 'password'?: string | null; 'role'?: number | null; 'fullName'?: string | null; 'createdAt'?: string | null }>
export type EntityGetUserForRoleResponses =
  EntityGetUserForRoleResponseOK

export type EntityGetUserRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.fullName.eq'?: string;
  'where.fullName.neq'?: string;
  'where.fullName.gt'?: string;
  'where.fullName.gte'?: string;
  'where.fullName.lt'?: string;
  'where.fullName.lte'?: string;
  'where.fullName.like'?: string;
  'where.fullName.in'?: string;
  'where.fullName.nin'?: string;
  'where.fullName.contains'?: string;
  'where.fullName.contained'?: string;
  'where.fullName.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.password.eq'?: string;
  'where.password.neq'?: string;
  'where.password.gt'?: string;
  'where.password.gte'?: string;
  'where.password.lt'?: string;
  'where.password.lte'?: string;
  'where.password.like'?: string;
  'where.password.in'?: string;
  'where.password.nin'?: string;
  'where.password.contains'?: string;
  'where.password.contained'?: string;
  'where.password.overlaps'?: string;
  'where.role.eq'?: number;
  'where.role.neq'?: number;
  'where.role.gt'?: number;
  'where.role.gte'?: number;
  'where.role.lt'?: number;
  'where.role.lte'?: number;
  'where.role.like'?: number;
  'where.role.in'?: string;
  'where.role.nin'?: string;
  'where.role.contains'?: string;
  'where.role.contained'?: string;
  'where.role.overlaps'?: string;
  'where.username.eq'?: string;
  'where.username.neq'?: string;
  'where.username.gt'?: string;
  'where.username.gte'?: string;
  'where.username.lt'?: string;
  'where.username.lte'?: string;
  'where.username.like'?: string;
  'where.username.in'?: string;
  'where.username.nin'?: string;
  'where.username.contains'?: string;
  'where.username.contained'?: string;
  'where.username.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.fullName'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.password'?: 'asc' | 'desc';
  'orderby.role'?: 'asc' | 'desc';
  'orderby.username'?: 'asc' | 'desc';
}

export type EntityGetUserResponseOK = Array<{ 'id'?: number | null; 'username'?: string | null; 'password'?: string | null; 'role'?: number | null; 'fullName'?: string | null; 'createdAt'?: string | null }>
export type EntityGetUserResponses =
  EntityGetUserResponseOK

export type EntityCreateUserRequest = {
  'id'?: number;
  'username': string;
  'password': string;
  'role'?: number | null;
  'fullName': string;
  'createdAt'?: string | null;
}

export type EntityCreateUserResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityCreateUserResponses =
  EntityCreateUserResponseOK

export type EntityUpdateUserRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.fullName.eq'?: string;
  'where.fullName.neq'?: string;
  'where.fullName.gt'?: string;
  'where.fullName.gte'?: string;
  'where.fullName.lt'?: string;
  'where.fullName.lte'?: string;
  'where.fullName.like'?: string;
  'where.fullName.in'?: string;
  'where.fullName.nin'?: string;
  'where.fullName.contains'?: string;
  'where.fullName.contained'?: string;
  'where.fullName.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.password.eq'?: string;
  'where.password.neq'?: string;
  'where.password.gt'?: string;
  'where.password.gte'?: string;
  'where.password.lt'?: string;
  'where.password.lte'?: string;
  'where.password.like'?: string;
  'where.password.in'?: string;
  'where.password.nin'?: string;
  'where.password.contains'?: string;
  'where.password.contained'?: string;
  'where.password.overlaps'?: string;
  'where.role.eq'?: number;
  'where.role.neq'?: number;
  'where.role.gt'?: number;
  'where.role.gte'?: number;
  'where.role.lt'?: number;
  'where.role.lte'?: number;
  'where.role.like'?: number;
  'where.role.in'?: string;
  'where.role.nin'?: string;
  'where.role.contains'?: string;
  'where.role.contained'?: string;
  'where.role.overlaps'?: string;
  'where.username.eq'?: string;
  'where.username.neq'?: string;
  'where.username.gt'?: string;
  'where.username.gte'?: string;
  'where.username.lt'?: string;
  'where.username.lte'?: string;
  'where.username.like'?: string;
  'where.username.in'?: string;
  'where.username.nin'?: string;
  'where.username.contains'?: string;
  'where.username.contained'?: string;
  'where.username.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'username': string;
  'password': string;
  'role'?: number | null;
  'fullName': string;
  'createdAt'?: string | null;
}

export type EntityUpdateUserResponseOK = Array<{ 'id'?: number | null; 'username'?: string | null; 'password'?: string | null; 'role'?: number | null; 'fullName'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateUserResponses =
  EntityUpdateUserResponseOK

export type EntityGetUserByIdRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityGetUserByIdResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityGetUserByIdResponses =
  EntityGetUserByIdResponseOK

export type EntityUpdateUserRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
  'username': string;
  'password': string;
  'role'?: number | null;
  'fullName': string;
  'createdAt'?: string | null;
}

export type EntityUpdateUserResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityUpdateUserResponses =
  EntityUpdateUserResponseOK

export type EntityDeleteUserRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityDeleteUserResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityDeleteUserResponses =
  EntityDeleteUserResponseOK

export type EntityGetExamForUserRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetExamForUserResponseOK = Array<{ 'id'?: number | null; 'createdBy'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamForUserResponses =
  EntityGetExamForUserResponseOK

export type EntityGetExamineeExamForUserRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityGetExamineeExamForUserResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamForUserResponses =
  EntityGetExamineeExamForUserResponseOK

export type EntityGetRoleForUserRequest = {
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'id': number;
}

export type EntityGetRoleForUserResponseOK = {
  'id': number | null;
  'name': string | null;
  'createdAt': string | null;
}
export type EntityGetRoleForUserResponses =
  EntityGetRoleForUserResponseOK

export type EntityGetExamRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.createdBy.eq'?: number;
  'where.createdBy.neq'?: number;
  'where.createdBy.gt'?: number;
  'where.createdBy.gte'?: number;
  'where.createdBy.lt'?: number;
  'where.createdBy.lte'?: number;
  'where.createdBy.like'?: number;
  'where.createdBy.in'?: string;
  'where.createdBy.nin'?: string;
  'where.createdBy.contains'?: string;
  'where.createdBy.contained'?: string;
  'where.createdBy.overlaps'?: string;
  'where.description.eq'?: string;
  'where.description.neq'?: string;
  'where.description.gt'?: string;
  'where.description.gte'?: string;
  'where.description.lt'?: string;
  'where.description.lte'?: string;
  'where.description.like'?: string;
  'where.description.in'?: string;
  'where.description.nin'?: string;
  'where.description.contains'?: string;
  'where.description.contained'?: string;
  'where.description.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.status.eq'?: string;
  'where.status.neq'?: string;
  'where.status.gt'?: string;
  'where.status.gte'?: string;
  'where.status.lt'?: string;
  'where.status.lte'?: string;
  'where.status.like'?: string;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.title.eq'?: string;
  'where.title.neq'?: string;
  'where.title.gt'?: string;
  'where.title.gte'?: string;
  'where.title.lt'?: string;
  'where.title.lte'?: string;
  'where.title.like'?: string;
  'where.title.in'?: string;
  'where.title.nin'?: string;
  'where.title.contains'?: string;
  'where.title.contained'?: string;
  'where.title.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.createdBy'?: 'asc' | 'desc';
  'orderby.description'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.status'?: 'asc' | 'desc';
  'orderby.title'?: 'asc' | 'desc';
}

export type EntityGetExamResponseOK = Array<{ 'id'?: number | null; 'createdBy'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamResponses =
  EntityGetExamResponseOK

export type EntityCreateExamRequest = {
  'id'?: number;
  'createdBy'?: number | null;
  'title': string;
  'description'?: string | null;
  'status': string;
  'createdAt'?: string | null;
}

export type EntityCreateExamResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityCreateExamResponses =
  EntityCreateExamResponseOK

export type EntityUpdateExamRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.createdBy.eq'?: number;
  'where.createdBy.neq'?: number;
  'where.createdBy.gt'?: number;
  'where.createdBy.gte'?: number;
  'where.createdBy.lt'?: number;
  'where.createdBy.lte'?: number;
  'where.createdBy.like'?: number;
  'where.createdBy.in'?: string;
  'where.createdBy.nin'?: string;
  'where.createdBy.contains'?: string;
  'where.createdBy.contained'?: string;
  'where.createdBy.overlaps'?: string;
  'where.description.eq'?: string;
  'where.description.neq'?: string;
  'where.description.gt'?: string;
  'where.description.gte'?: string;
  'where.description.lt'?: string;
  'where.description.lte'?: string;
  'where.description.like'?: string;
  'where.description.in'?: string;
  'where.description.nin'?: string;
  'where.description.contains'?: string;
  'where.description.contained'?: string;
  'where.description.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.status.eq'?: string;
  'where.status.neq'?: string;
  'where.status.gt'?: string;
  'where.status.gte'?: string;
  'where.status.lt'?: string;
  'where.status.lte'?: string;
  'where.status.like'?: string;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.title.eq'?: string;
  'where.title.neq'?: string;
  'where.title.gt'?: string;
  'where.title.gte'?: string;
  'where.title.lt'?: string;
  'where.title.lte'?: string;
  'where.title.like'?: string;
  'where.title.in'?: string;
  'where.title.nin'?: string;
  'where.title.contains'?: string;
  'where.title.contained'?: string;
  'where.title.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'createdBy'?: number | null;
  'title': string;
  'description'?: string | null;
  'status': string;
  'createdAt'?: string | null;
}

export type EntityUpdateExamResponseOK = Array<{ 'id'?: number | null; 'createdBy'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateExamResponses =
  EntityUpdateExamResponseOK

export type EntityGetExamByIdRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetExamByIdResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetExamByIdResponses =
  EntityGetExamByIdResponseOK

export type EntityUpdateExamRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
  'createdBy'?: number | null;
  'title': string;
  'description'?: string | null;
  'status': string;
  'createdAt'?: string | null;
}

export type EntityUpdateExamResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityUpdateExamResponses =
  EntityUpdateExamResponseOK

export type EntityDeleteExamRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityDeleteExamResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityDeleteExamResponses =
  EntityDeleteExamResponseOK

export type EntityGetQuestionForExamRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetQuestionForExamResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetQuestionForExamResponses =
  EntityGetQuestionForExamResponseOK

export type EntityGetExamineeExamForExamRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityGetExamineeExamForExamResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamForExamResponses =
  EntityGetExamineeExamForExamResponseOK

export type EntityGetUserForExamRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityGetUserForExamResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityGetUserForExamResponses =
  EntityGetUserForExamResponseOK

export type EntityGetQuestionRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.description.eq'?: string;
  'where.description.neq'?: string;
  'where.description.gt'?: string;
  'where.description.gte'?: string;
  'where.description.lt'?: string;
  'where.description.lte'?: string;
  'where.description.like'?: string;
  'where.description.in'?: string;
  'where.description.nin'?: string;
  'where.description.contains'?: string;
  'where.description.contained'?: string;
  'where.description.overlaps'?: string;
  'where.examId.eq'?: number;
  'where.examId.neq'?: number;
  'where.examId.gt'?: number;
  'where.examId.gte'?: number;
  'where.examId.lt'?: number;
  'where.examId.lte'?: number;
  'where.examId.like'?: number;
  'where.examId.in'?: string;
  'where.examId.nin'?: string;
  'where.examId.contains'?: string;
  'where.examId.contained'?: string;
  'where.examId.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.status.eq'?: string;
  'where.status.neq'?: string;
  'where.status.gt'?: string;
  'where.status.gte'?: string;
  'where.status.lt'?: string;
  'where.status.lte'?: string;
  'where.status.like'?: string;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.title.eq'?: string;
  'where.title.neq'?: string;
  'where.title.gt'?: string;
  'where.title.gte'?: string;
  'where.title.lt'?: string;
  'where.title.lte'?: string;
  'where.title.like'?: string;
  'where.title.in'?: string;
  'where.title.nin'?: string;
  'where.title.contains'?: string;
  'where.title.contained'?: string;
  'where.title.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.description'?: 'asc' | 'desc';
  'orderby.examId'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.status'?: 'asc' | 'desc';
  'orderby.title'?: 'asc' | 'desc';
}

export type EntityGetQuestionResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetQuestionResponses =
  EntityGetQuestionResponseOK

export type EntityCreateQuestionRequest = {
  'id'?: number;
  'examId'?: number | null;
  'title': string;
  'description'?: string | null;
  'status': string;
  'createdAt'?: string | null;
}

export type EntityCreateQuestionResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityCreateQuestionResponses =
  EntityCreateQuestionResponseOK

export type EntityUpdateQuestionRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.description.eq'?: string;
  'where.description.neq'?: string;
  'where.description.gt'?: string;
  'where.description.gte'?: string;
  'where.description.lt'?: string;
  'where.description.lte'?: string;
  'where.description.like'?: string;
  'where.description.in'?: string;
  'where.description.nin'?: string;
  'where.description.contains'?: string;
  'where.description.contained'?: string;
  'where.description.overlaps'?: string;
  'where.examId.eq'?: number;
  'where.examId.neq'?: number;
  'where.examId.gt'?: number;
  'where.examId.gte'?: number;
  'where.examId.lt'?: number;
  'where.examId.lte'?: number;
  'where.examId.like'?: number;
  'where.examId.in'?: string;
  'where.examId.nin'?: string;
  'where.examId.contains'?: string;
  'where.examId.contained'?: string;
  'where.examId.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.status.eq'?: string;
  'where.status.neq'?: string;
  'where.status.gt'?: string;
  'where.status.gte'?: string;
  'where.status.lt'?: string;
  'where.status.lte'?: string;
  'where.status.like'?: string;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.title.eq'?: string;
  'where.title.neq'?: string;
  'where.title.gt'?: string;
  'where.title.gte'?: string;
  'where.title.lt'?: string;
  'where.title.lte'?: string;
  'where.title.like'?: string;
  'where.title.in'?: string;
  'where.title.nin'?: string;
  'where.title.contains'?: string;
  'where.title.contained'?: string;
  'where.title.overlaps'?: string;
  'where.or'?: Array<string>;
  'id'?: number;
  'examId'?: number | null;
  'title': string;
  'description'?: string | null;
  'status': string;
  'createdAt'?: string | null;
}

export type EntityUpdateQuestionResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateQuestionResponses =
  EntityUpdateQuestionResponseOK

export type EntityGetQuestionByIdRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetQuestionByIdResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetQuestionByIdResponses =
  EntityGetQuestionByIdResponseOK

export type EntityUpdateQuestionRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
  'examId'?: number | null;
  'title': string;
  'description'?: string | null;
  'status': string;
  'createdAt'?: string | null;
}

export type EntityUpdateQuestionResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityUpdateQuestionResponses =
  EntityUpdateQuestionResponseOK

export type EntityDeleteQuestionRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityDeleteQuestionResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityDeleteQuestionResponses =
  EntityDeleteQuestionResponseOK

export type EntityGetAnswerForQuestionRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetAnswerForQuestionResponseOK = Array<{ 'id'?: number | null; 'questionId'?: number | null; 'description'?: string | null; 'createdAt'?: string | null }>
export type EntityGetAnswerForQuestionResponses =
  EntityGetAnswerForQuestionResponseOK

export type EntityGetExamineeExamAnswerForQuestionRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswerForQuestionResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswerForQuestionResponses =
  EntityGetExamineeExamAnswerForQuestionResponseOK

export type EntityGetExamForQuestionRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetExamForQuestionResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetExamForQuestionResponses =
  EntityGetExamForQuestionResponseOK

export type EntityGetAnswerRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.description.eq'?: string;
  'where.description.neq'?: string;
  'where.description.gt'?: string;
  'where.description.gte'?: string;
  'where.description.lt'?: string;
  'where.description.lte'?: string;
  'where.description.like'?: string;
  'where.description.in'?: string;
  'where.description.nin'?: string;
  'where.description.contains'?: string;
  'where.description.contained'?: string;
  'where.description.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.questionId.eq'?: number;
  'where.questionId.neq'?: number;
  'where.questionId.gt'?: number;
  'where.questionId.gte'?: number;
  'where.questionId.lt'?: number;
  'where.questionId.lte'?: number;
  'where.questionId.like'?: number;
  'where.questionId.in'?: string;
  'where.questionId.nin'?: string;
  'where.questionId.contains'?: string;
  'where.questionId.contained'?: string;
  'where.questionId.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.description'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.questionId'?: 'asc' | 'desc';
}

export type EntityGetAnswerResponseOK = Array<{ 'id'?: number | null; 'questionId'?: number | null; 'description'?: string | null; 'createdAt'?: string | null }>
export type EntityGetAnswerResponses =
  EntityGetAnswerResponseOK

export type EntityCreateAnswerRequest = {
  'id': number;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}

export type EntityCreateAnswerResponseOK = {
  'id': number | null;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}
export type EntityCreateAnswerResponses =
  EntityCreateAnswerResponseOK

export type EntityUpdateAnswerRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.description.eq'?: string;
  'where.description.neq'?: string;
  'where.description.gt'?: string;
  'where.description.gte'?: string;
  'where.description.lt'?: string;
  'where.description.lte'?: string;
  'where.description.like'?: string;
  'where.description.in'?: string;
  'where.description.nin'?: string;
  'where.description.contains'?: string;
  'where.description.contained'?: string;
  'where.description.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.questionId.eq'?: number;
  'where.questionId.neq'?: number;
  'where.questionId.gt'?: number;
  'where.questionId.gte'?: number;
  'where.questionId.lt'?: number;
  'where.questionId.lte'?: number;
  'where.questionId.like'?: number;
  'where.questionId.in'?: string;
  'where.questionId.nin'?: string;
  'where.questionId.contains'?: string;
  'where.questionId.contained'?: string;
  'where.questionId.overlaps'?: string;
  'where.or'?: Array<string>;
  'id': number;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}

export type EntityUpdateAnswerResponseOK = Array<{ 'id'?: number | null; 'questionId'?: number | null; 'description'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateAnswerResponses =
  EntityUpdateAnswerResponseOK

export type EntityGetAnswerByIdRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetAnswerByIdResponseOK = {
  'id': number | null;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}
export type EntityGetAnswerByIdResponses =
  EntityGetAnswerByIdResponseOK

export type EntityUpdateAnswerRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}

export type EntityUpdateAnswerResponseOK = {
  'id': number | null;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}
export type EntityUpdateAnswerResponses =
  EntityUpdateAnswerResponseOK

export type EntityDeleteAnswerRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityDeleteAnswerResponseOK = {
  'id': number | null;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}
export type EntityDeleteAnswerResponses =
  EntityDeleteAnswerResponseOK

export type EntityGetExamineeExamAnswerForAnswerRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswerForAnswerResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswerForAnswerResponses =
  EntityGetExamineeExamAnswerForAnswerResponseOK

export type EntityGetQuestionForAnswerRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetQuestionForAnswerResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetQuestionForAnswerResponses =
  EntityGetQuestionForAnswerResponseOK

export type EntityGetExamineeExamRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.duration.eq'?: number;
  'where.duration.neq'?: number;
  'where.duration.gt'?: number;
  'where.duration.gte'?: number;
  'where.duration.lt'?: number;
  'where.duration.lte'?: number;
  'where.duration.like'?: number;
  'where.duration.in'?: string;
  'where.duration.nin'?: string;
  'where.duration.contains'?: string;
  'where.duration.contained'?: string;
  'where.duration.overlaps'?: string;
  'where.examId.eq'?: number;
  'where.examId.neq'?: number;
  'where.examId.gt'?: number;
  'where.examId.gte'?: number;
  'where.examId.lt'?: number;
  'where.examId.lte'?: number;
  'where.examId.like'?: number;
  'where.examId.in'?: string;
  'where.examId.nin'?: string;
  'where.examId.contains'?: string;
  'where.examId.contained'?: string;
  'where.examId.overlaps'?: string;
  'where.examineeId.eq'?: number;
  'where.examineeId.neq'?: number;
  'where.examineeId.gt'?: number;
  'where.examineeId.gte'?: number;
  'where.examineeId.lt'?: number;
  'where.examineeId.lte'?: number;
  'where.examineeId.like'?: number;
  'where.examineeId.in'?: string;
  'where.examineeId.nin'?: string;
  'where.examineeId.contains'?: string;
  'where.examineeId.contained'?: string;
  'where.examineeId.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.startTime.eq'?: string;
  'where.startTime.neq'?: string;
  'where.startTime.gt'?: string;
  'where.startTime.gte'?: string;
  'where.startTime.lt'?: string;
  'where.startTime.lte'?: string;
  'where.startTime.like'?: string;
  'where.startTime.in'?: string;
  'where.startTime.nin'?: string;
  'where.startTime.contains'?: string;
  'where.startTime.contained'?: string;
  'where.startTime.overlaps'?: string;
  'where.status.eq'?: string;
  'where.status.neq'?: string;
  'where.status.gt'?: string;
  'where.status.gte'?: string;
  'where.status.lt'?: string;
  'where.status.lte'?: string;
  'where.status.like'?: string;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.duration'?: 'asc' | 'desc';
  'orderby.examId'?: 'asc' | 'desc';
  'orderby.examineeId'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.startTime'?: 'asc' | 'desc';
  'orderby.status'?: 'asc' | 'desc';
}

export type EntityGetExamineeExamResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamResponses =
  EntityGetExamineeExamResponseOK

export type EntityCreateExamineeExamRequest = {
  'id': number;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}

export type EntityCreateExamineeExamResponseOK = {
  'id': number | null;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityCreateExamineeExamResponses =
  EntityCreateExamineeExamResponseOK

export type EntityUpdateExamineeExamRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.duration.eq'?: number;
  'where.duration.neq'?: number;
  'where.duration.gt'?: number;
  'where.duration.gte'?: number;
  'where.duration.lt'?: number;
  'where.duration.lte'?: number;
  'where.duration.like'?: number;
  'where.duration.in'?: string;
  'where.duration.nin'?: string;
  'where.duration.contains'?: string;
  'where.duration.contained'?: string;
  'where.duration.overlaps'?: string;
  'where.examId.eq'?: number;
  'where.examId.neq'?: number;
  'where.examId.gt'?: number;
  'where.examId.gte'?: number;
  'where.examId.lt'?: number;
  'where.examId.lte'?: number;
  'where.examId.like'?: number;
  'where.examId.in'?: string;
  'where.examId.nin'?: string;
  'where.examId.contains'?: string;
  'where.examId.contained'?: string;
  'where.examId.overlaps'?: string;
  'where.examineeId.eq'?: number;
  'where.examineeId.neq'?: number;
  'where.examineeId.gt'?: number;
  'where.examineeId.gte'?: number;
  'where.examineeId.lt'?: number;
  'where.examineeId.lte'?: number;
  'where.examineeId.like'?: number;
  'where.examineeId.in'?: string;
  'where.examineeId.nin'?: string;
  'where.examineeId.contains'?: string;
  'where.examineeId.contained'?: string;
  'where.examineeId.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.startTime.eq'?: string;
  'where.startTime.neq'?: string;
  'where.startTime.gt'?: string;
  'where.startTime.gte'?: string;
  'where.startTime.lt'?: string;
  'where.startTime.lte'?: string;
  'where.startTime.like'?: string;
  'where.startTime.in'?: string;
  'where.startTime.nin'?: string;
  'where.startTime.contains'?: string;
  'where.startTime.contained'?: string;
  'where.startTime.overlaps'?: string;
  'where.status.eq'?: string;
  'where.status.neq'?: string;
  'where.status.gt'?: string;
  'where.status.gte'?: string;
  'where.status.lt'?: string;
  'where.status.lte'?: string;
  'where.status.like'?: string;
  'where.status.in'?: string;
  'where.status.nin'?: string;
  'where.status.contains'?: string;
  'where.status.contained'?: string;
  'where.status.overlaps'?: string;
  'where.or'?: Array<string>;
  'id': number;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}

export type EntityUpdateExamineeExamResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateExamineeExamResponses =
  EntityUpdateExamineeExamResponseOK

export type EntityGetExamineeExamByIdRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityGetExamineeExamByIdResponseOK = {
  'id': number | null;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetExamineeExamByIdResponses =
  EntityGetExamineeExamByIdResponseOK

export type EntityUpdateExamineeExamRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}

export type EntityUpdateExamineeExamResponseOK = {
  'id': number | null;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityUpdateExamineeExamResponses =
  EntityUpdateExamineeExamResponseOK

export type EntityDeleteExamineeExamRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityDeleteExamineeExamResponseOK = {
  'id': number | null;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityDeleteExamineeExamResponses =
  EntityDeleteExamineeExamResponseOK

export type EntityGetExamineeExamAnswerForExamineeExamRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswerForExamineeExamResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswerForExamineeExamResponses =
  EntityGetExamineeExamAnswerForExamineeExamResponseOK

export type EntityGetUserForExamineeExamRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityGetUserForExamineeExamResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityGetUserForExamineeExamResponses =
  EntityGetUserForExamineeExamResponseOK

export type EntityGetExamForExamineeExamRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetExamForExamineeExamResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetExamForExamineeExamResponses =
  EntityGetExamForExamineeExamResponseOK

export type EntityGetExamineeExamAnswerRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'where.answerId.eq'?: number;
  'where.answerId.neq'?: number;
  'where.answerId.gt'?: number;
  'where.answerId.gte'?: number;
  'where.answerId.lt'?: number;
  'where.answerId.lte'?: number;
  'where.answerId.like'?: number;
  'where.answerId.in'?: string;
  'where.answerId.nin'?: string;
  'where.answerId.contains'?: string;
  'where.answerId.contained'?: string;
  'where.answerId.overlaps'?: string;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.examineeExamId.eq'?: number;
  'where.examineeExamId.neq'?: number;
  'where.examineeExamId.gt'?: number;
  'where.examineeExamId.gte'?: number;
  'where.examineeExamId.lt'?: number;
  'where.examineeExamId.lte'?: number;
  'where.examineeExamId.like'?: number;
  'where.examineeExamId.in'?: string;
  'where.examineeExamId.nin'?: string;
  'where.examineeExamId.contains'?: string;
  'where.examineeExamId.contained'?: string;
  'where.examineeExamId.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.questionId.eq'?: number;
  'where.questionId.neq'?: number;
  'where.questionId.gt'?: number;
  'where.questionId.gte'?: number;
  'where.questionId.lt'?: number;
  'where.questionId.lte'?: number;
  'where.questionId.like'?: number;
  'where.questionId.in'?: string;
  'where.questionId.nin'?: string;
  'where.questionId.contains'?: string;
  'where.questionId.contained'?: string;
  'where.questionId.overlaps'?: string;
  'where.or'?: Array<string>;
  'orderby.answerId'?: 'asc' | 'desc';
  'orderby.createdAt'?: 'asc' | 'desc';
  'orderby.examineeExamId'?: 'asc' | 'desc';
  'orderby.id'?: 'asc' | 'desc';
  'orderby.questionId'?: 'asc' | 'desc';
}

export type EntityGetExamineeExamAnswerResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswerResponses =
  EntityGetExamineeExamAnswerResponseOK

export type EntityCreateExamineeExamAnswerRequest = {
  'id': number;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}

export type EntityCreateExamineeExamAnswerResponseOK = {
  'id': number | null;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}
export type EntityCreateExamineeExamAnswerResponses =
  EntityCreateExamineeExamAnswerResponseOK

export type EntityUpdateExamineeExamAnswerRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'where.answerId.eq'?: number;
  'where.answerId.neq'?: number;
  'where.answerId.gt'?: number;
  'where.answerId.gte'?: number;
  'where.answerId.lt'?: number;
  'where.answerId.lte'?: number;
  'where.answerId.like'?: number;
  'where.answerId.in'?: string;
  'where.answerId.nin'?: string;
  'where.answerId.contains'?: string;
  'where.answerId.contained'?: string;
  'where.answerId.overlaps'?: string;
  'where.createdAt.eq'?: string;
  'where.createdAt.neq'?: string;
  'where.createdAt.gt'?: string;
  'where.createdAt.gte'?: string;
  'where.createdAt.lt'?: string;
  'where.createdAt.lte'?: string;
  'where.createdAt.like'?: string;
  'where.createdAt.in'?: string;
  'where.createdAt.nin'?: string;
  'where.createdAt.contains'?: string;
  'where.createdAt.contained'?: string;
  'where.createdAt.overlaps'?: string;
  'where.examineeExamId.eq'?: number;
  'where.examineeExamId.neq'?: number;
  'where.examineeExamId.gt'?: number;
  'where.examineeExamId.gte'?: number;
  'where.examineeExamId.lt'?: number;
  'where.examineeExamId.lte'?: number;
  'where.examineeExamId.like'?: number;
  'where.examineeExamId.in'?: string;
  'where.examineeExamId.nin'?: string;
  'where.examineeExamId.contains'?: string;
  'where.examineeExamId.contained'?: string;
  'where.examineeExamId.overlaps'?: string;
  'where.id.eq'?: number;
  'where.id.neq'?: number;
  'where.id.gt'?: number;
  'where.id.gte'?: number;
  'where.id.lt'?: number;
  'where.id.lte'?: number;
  'where.id.like'?: number;
  'where.id.in'?: string;
  'where.id.nin'?: string;
  'where.id.contains'?: string;
  'where.id.contained'?: string;
  'where.id.overlaps'?: string;
  'where.questionId.eq'?: number;
  'where.questionId.neq'?: number;
  'where.questionId.gt'?: number;
  'where.questionId.gte'?: number;
  'where.questionId.lt'?: number;
  'where.questionId.lte'?: number;
  'where.questionId.like'?: number;
  'where.questionId.in'?: string;
  'where.questionId.nin'?: string;
  'where.questionId.contains'?: string;
  'where.questionId.contained'?: string;
  'where.questionId.overlaps'?: string;
  'where.or'?: Array<string>;
  'id': number;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}

export type EntityUpdateExamineeExamAnswerResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityUpdateExamineeExamAnswerResponses =
  EntityUpdateExamineeExamAnswerResponseOK

export type EntityGetExamineeExamAnswerByIdRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswerByIdResponseOK = {
  'id': number | null;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}
export type EntityGetExamineeExamAnswerByIdResponses =
  EntityGetExamineeExamAnswerByIdResponseOK

export type EntityUpdateExamineeExamAnswerRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}

export type EntityUpdateExamineeExamAnswerResponseOK = {
  'id': number | null;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}
export type EntityUpdateExamineeExamAnswerResponses =
  EntityUpdateExamineeExamAnswerResponseOK

export type EntityDeleteExamineeExamAnswerRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityDeleteExamineeExamAnswerResponseOK = {
  'id': number | null;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}
export type EntityDeleteExamineeExamAnswerResponses =
  EntityDeleteExamineeExamAnswerResponseOK

export type EntityGetAnswerForExamineeExamAnswerRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetAnswerForExamineeExamAnswerResponseOK = {
  'id': number | null;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}
export type EntityGetAnswerForExamineeExamAnswerResponses =
  EntityGetAnswerForExamineeExamAnswerResponseOK

export type EntityGetQuestionForExamineeExamAnswerRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetQuestionForExamineeExamAnswerResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetQuestionForExamineeExamAnswerResponses =
  EntityGetQuestionForExamineeExamAnswerResponseOK

export type EntityGetExamineeExamForExamineeExamAnswerRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityGetExamineeExamForExamineeExamAnswerResponseOK = {
  'id': number | null;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityGetExamineeExamForExamineeExamAnswerResponses =
  EntityGetExamineeExamForExamineeExamAnswerResponseOK

export type PostEntityLoginRequest = {
  'username': string;
  'password': string;
}

export type PostEntityLoginResponseOK = unknown
export type PostEntityLoginResponses =
  FullResponse<PostEntityLoginResponseOK, 200>

export type PostEntitySignupRequest = {
  'username': string;
  'password': string;
  'fullName': string;
}

export type PostEntitySignupResponseOK = unknown
export type PostEntitySignupResponses =
  FullResponse<PostEntitySignupResponseOK, 200>

export type AiPromptRequest = {
  'prompt': string;
  'chatHistory'?: Array<{ 'prompt': string; 'response': string }>;
}

export type AiPromptResponseOK = {
  'response': string;
}
export type AiPromptdefaultResponse = {
  'code'?: string;
  'message': string;
}
export type AiPromptResponses =
  AiPromptResponseOK
  | AiPromptdefaultResponse

export type AiStreamRequest = {
  'prompt': string;
  'chatHistory'?: Array<{ 'prompt': string; 'response': string }>;
}

export type AiStreamResponseOK = unknown
export type AiStreamResponses =
  FullResponse<AiStreamResponseOK, 200>



export interface Api {
  setBaseUrl(newUrl: string) : void;
  setDefaultHeaders(headers: Object) : void;
  entityGetRole(req?: EntityGetRoleRequest): Promise<EntityGetRoleResponses>;
  entityCreateRole(req?: EntityCreateRoleRequest): Promise<EntityCreateRoleResponses>;
  entityUpdateRole(req?: EntityUpdateRoleRequest): Promise<EntityUpdateRoleResponses>;
  entityGetRoleById(req?: EntityGetRoleByIdRequest): Promise<EntityGetRoleByIdResponses>;
  entityUpdateRole(req?: EntityUpdateRoleRequest): Promise<EntityUpdateRoleResponses>;
  entityDeleteRole(req?: EntityDeleteRoleRequest): Promise<EntityDeleteRoleResponses>;
  entityGetUserForRole(req?: EntityGetUserForRoleRequest): Promise<EntityGetUserForRoleResponses>;
  entityGetUser(req?: EntityGetUserRequest): Promise<EntityGetUserResponses>;
  entityCreateUser(req?: EntityCreateUserRequest): Promise<EntityCreateUserResponses>;
  entityUpdateUser(req?: EntityUpdateUserRequest): Promise<EntityUpdateUserResponses>;
  entityGetUserById(req?: EntityGetUserByIdRequest): Promise<EntityGetUserByIdResponses>;
  entityUpdateUser(req?: EntityUpdateUserRequest): Promise<EntityUpdateUserResponses>;
  entityDeleteUser(req?: EntityDeleteUserRequest): Promise<EntityDeleteUserResponses>;
  entityGetExamForUser(req?: EntityGetExamForUserRequest): Promise<EntityGetExamForUserResponses>;
  entityGetExamineeExamForUser(req?: EntityGetExamineeExamForUserRequest): Promise<EntityGetExamineeExamForUserResponses>;
  entityGetRoleForUser(req?: EntityGetRoleForUserRequest): Promise<EntityGetRoleForUserResponses>;
  entityGetExam(req?: EntityGetExamRequest): Promise<EntityGetExamResponses>;
  entityCreateExam(req?: EntityCreateExamRequest): Promise<EntityCreateExamResponses>;
  entityUpdateExam(req?: EntityUpdateExamRequest): Promise<EntityUpdateExamResponses>;
  entityGetExamById(req?: EntityGetExamByIdRequest): Promise<EntityGetExamByIdResponses>;
  entityUpdateExam(req?: EntityUpdateExamRequest): Promise<EntityUpdateExamResponses>;
  entityDeleteExam(req?: EntityDeleteExamRequest): Promise<EntityDeleteExamResponses>;
  entityGetQuestionForExam(req?: EntityGetQuestionForExamRequest): Promise<EntityGetQuestionForExamResponses>;
  entityGetExamineeExamForExam(req?: EntityGetExamineeExamForExamRequest): Promise<EntityGetExamineeExamForExamResponses>;
  entityGetUserForExam(req?: EntityGetUserForExamRequest): Promise<EntityGetUserForExamResponses>;
  entityGetQuestion(req?: EntityGetQuestionRequest): Promise<EntityGetQuestionResponses>;
  entityCreateQuestion(req?: EntityCreateQuestionRequest): Promise<EntityCreateQuestionResponses>;
  entityUpdateQuestion(req?: EntityUpdateQuestionRequest): Promise<EntityUpdateQuestionResponses>;
  entityGetQuestionById(req?: EntityGetQuestionByIdRequest): Promise<EntityGetQuestionByIdResponses>;
  entityUpdateQuestion(req?: EntityUpdateQuestionRequest): Promise<EntityUpdateQuestionResponses>;
  entityDeleteQuestion(req?: EntityDeleteQuestionRequest): Promise<EntityDeleteQuestionResponses>;
  entityGetAnswerForQuestion(req?: EntityGetAnswerForQuestionRequest): Promise<EntityGetAnswerForQuestionResponses>;
  entityGetExamineeExamAnswerForQuestion(req?: EntityGetExamineeExamAnswerForQuestionRequest): Promise<EntityGetExamineeExamAnswerForQuestionResponses>;
  entityGetExamForQuestion(req?: EntityGetExamForQuestionRequest): Promise<EntityGetExamForQuestionResponses>;
  entityGetAnswer(req?: EntityGetAnswerRequest): Promise<EntityGetAnswerResponses>;
  entityCreateAnswer(req?: EntityCreateAnswerRequest): Promise<EntityCreateAnswerResponses>;
  entityUpdateAnswer(req?: EntityUpdateAnswerRequest): Promise<EntityUpdateAnswerResponses>;
  entityGetAnswerById(req?: EntityGetAnswerByIdRequest): Promise<EntityGetAnswerByIdResponses>;
  entityUpdateAnswer(req?: EntityUpdateAnswerRequest): Promise<EntityUpdateAnswerResponses>;
  entityDeleteAnswer(req?: EntityDeleteAnswerRequest): Promise<EntityDeleteAnswerResponses>;
  entityGetExamineeExamAnswerForAnswer(req?: EntityGetExamineeExamAnswerForAnswerRequest): Promise<EntityGetExamineeExamAnswerForAnswerResponses>;
  entityGetQuestionForAnswer(req?: EntityGetQuestionForAnswerRequest): Promise<EntityGetQuestionForAnswerResponses>;
  entityGetExamineeExam(req?: EntityGetExamineeExamRequest): Promise<EntityGetExamineeExamResponses>;
  entityCreateExamineeExam(req?: EntityCreateExamineeExamRequest): Promise<EntityCreateExamineeExamResponses>;
  entityUpdateExamineeExam(req?: EntityUpdateExamineeExamRequest): Promise<EntityUpdateExamineeExamResponses>;
  entityGetExamineeExamById(req?: EntityGetExamineeExamByIdRequest): Promise<EntityGetExamineeExamByIdResponses>;
  entityUpdateExamineeExam(req?: EntityUpdateExamineeExamRequest): Promise<EntityUpdateExamineeExamResponses>;
  entityDeleteExamineeExam(req?: EntityDeleteExamineeExamRequest): Promise<EntityDeleteExamineeExamResponses>;
  entityGetExamineeExamAnswerForExamineeExam(req?: EntityGetExamineeExamAnswerForExamineeExamRequest): Promise<EntityGetExamineeExamAnswerForExamineeExamResponses>;
  entityGetUserForExamineeExam(req?: EntityGetUserForExamineeExamRequest): Promise<EntityGetUserForExamineeExamResponses>;
  entityGetExamForExamineeExam(req?: EntityGetExamForExamineeExamRequest): Promise<EntityGetExamForExamineeExamResponses>;
  entityGetExamineeExamAnswer(req?: EntityGetExamineeExamAnswerRequest): Promise<EntityGetExamineeExamAnswerResponses>;
  entityCreateExamineeExamAnswer(req?: EntityCreateExamineeExamAnswerRequest): Promise<EntityCreateExamineeExamAnswerResponses>;
  entityUpdateExamineeExamAnswer(req?: EntityUpdateExamineeExamAnswerRequest): Promise<EntityUpdateExamineeExamAnswerResponses>;
  entityGetExamineeExamAnswerById(req?: EntityGetExamineeExamAnswerByIdRequest): Promise<EntityGetExamineeExamAnswerByIdResponses>;
  entityUpdateExamineeExamAnswer(req?: EntityUpdateExamineeExamAnswerRequest): Promise<EntityUpdateExamineeExamAnswerResponses>;
  entityDeleteExamineeExamAnswer(req?: EntityDeleteExamineeExamAnswerRequest): Promise<EntityDeleteExamineeExamAnswerResponses>;
  entityGetAnswerForExamineeExamAnswer(req?: EntityGetAnswerForExamineeExamAnswerRequest): Promise<EntityGetAnswerForExamineeExamAnswerResponses>;
  entityGetQuestionForExamineeExamAnswer(req?: EntityGetQuestionForExamineeExamAnswerRequest): Promise<EntityGetQuestionForExamineeExamAnswerResponses>;
  entityGetExamineeExamForExamineeExamAnswer(req?: EntityGetExamineeExamForExamineeExamAnswerRequest): Promise<EntityGetExamineeExamForExamineeExamAnswerResponses>;
  postEntityLogin(req?: PostEntityLoginRequest): Promise<PostEntityLoginResponses>;
  postEntitySignup(req?: PostEntitySignupRequest): Promise<PostEntitySignupResponses>;
  aiPrompt(req?: AiPromptRequest): Promise<AiPromptResponses>;
  aiStream(req?: AiStreamRequest): Promise<AiStreamResponses>;
}
type PlatformaticFrontendClient = Omit<Api, 'setBaseUrl'>
type BuildOptions = {
  headers?: Object
}
export default function build(url: string, options?: BuildOptions): PlatformaticFrontendClient
