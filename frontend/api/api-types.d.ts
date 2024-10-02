export interface FullResponse<T, U extends number> {
  'statusCode': U;
  'headers': object;
  'body': T;
}

export type EntityGetRolesRequest = {
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

export type EntityGetRolesResponseOK = Array<{ 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null }>
export type EntityGetRolesResponses =
  EntityGetRolesResponseOK

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

export type EntityUpdateRolesRequest = {
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

export type EntityUpdateRolesResponseOK = Array<{ 'id'?: number | null; 'name'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateRolesResponses =
  EntityUpdateRolesResponseOK

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

export type EntityDeleteRolesRequest = {
  'fields'?: Array<'createdAt' | 'id' | 'name'>;
  'id': number;
}

export type EntityDeleteRolesResponseOK = {
  'id': number | null;
  'name': string | null;
  'createdAt': string | null;
}
export type EntityDeleteRolesResponses =
  EntityDeleteRolesResponseOK

export type EntityGetUsersForRoleRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityGetUsersForRoleResponseOK = Array<{ 'id'?: number | null; 'username'?: string | null; 'password'?: string | null; 'role'?: number | null; 'fullName'?: string | null; 'createdAt'?: string | null }>
export type EntityGetUsersForRoleResponses =
  EntityGetUsersForRoleResponseOK

export type EntityGetUsersRequest = {
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

export type EntityGetUsersResponseOK = Array<{ 'id'?: number | null; 'username'?: string | null; 'password'?: string | null; 'role'?: number | null; 'fullName'?: string | null; 'createdAt'?: string | null }>
export type EntityGetUsersResponses =
  EntityGetUsersResponseOK

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

export type EntityUpdateUsersRequest = {
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

export type EntityUpdateUsersResponseOK = Array<{ 'id'?: number | null; 'username'?: string | null; 'password'?: string | null; 'role'?: number | null; 'fullName'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateUsersResponses =
  EntityUpdateUsersResponseOK

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

export type EntityDeleteUsersRequest = {
  'fields'?: Array<'createdAt' | 'fullName' | 'id' | 'password' | 'role' | 'username'>;
  'id': number;
}

export type EntityDeleteUsersResponseOK = {
  'id': number | null;
  'username': string | null;
  'password': string | null;
  'role': number | null;
  'fullName': string | null;
  'createdAt': string | null;
}
export type EntityDeleteUsersResponses =
  EntityDeleteUsersResponseOK

export type EntityGetExamsForUserRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetExamsForUserResponseOK = Array<{ 'id'?: number | null; 'createdBy'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamsForUserResponses =
  EntityGetExamsForUserResponseOK

export type EntityGetExamineeExamsForUserRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityGetExamineeExamsForUserResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamsForUserResponses =
  EntityGetExamineeExamsForUserResponseOK

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

export type EntityGetExamsRequest = {
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

export type EntityGetExamsResponseOK = Array<{ 'id'?: number | null; 'createdBy'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamsResponses =
  EntityGetExamsResponseOK

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

export type EntityUpdateExamsRequest = {
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

export type EntityUpdateExamsResponseOK = Array<{ 'id'?: number | null; 'createdBy'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateExamsResponses =
  EntityUpdateExamsResponseOK

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

export type EntityDeleteExamsRequest = {
  'fields'?: Array<'createdAt' | 'createdBy' | 'description' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityDeleteExamsResponseOK = {
  'id': number | null;
  'createdBy': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityDeleteExamsResponses =
  EntityDeleteExamsResponseOK

export type EntityGetQuestionsForExamRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityGetQuestionsForExamResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetQuestionsForExamResponses =
  EntityGetQuestionsForExamResponseOK

export type EntityGetExamineeExamsForExamRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityGetExamineeExamsForExamResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamsForExamResponses =
  EntityGetExamineeExamsForExamResponseOK

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

export type EntityGetQuestionsRequest = {
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

export type EntityGetQuestionsResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetQuestionsResponses =
  EntityGetQuestionsResponseOK

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

export type EntityUpdateQuestionsRequest = {
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

export type EntityUpdateQuestionsResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'title'?: string | null; 'description'?: string | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateQuestionsResponses =
  EntityUpdateQuestionsResponseOK

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

export type EntityDeleteQuestionsRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'examId' | 'id' | 'status' | 'title'>;
  'id': number;
}

export type EntityDeleteQuestionsResponseOK = {
  'id': number | null;
  'examId': number | null;
  'title': string | null;
  'description': string | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityDeleteQuestionsResponses =
  EntityDeleteQuestionsResponseOK

export type EntityGetAnswersForQuestionRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetAnswersForQuestionResponseOK = Array<{ 'id'?: number | null; 'questionId'?: number | null; 'description'?: string | null; 'createdAt'?: string | null }>
export type EntityGetAnswersForQuestionResponses =
  EntityGetAnswersForQuestionResponseOK

export type EntityGetExamineeExamAnswersForQuestionRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswersForQuestionResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswersForQuestionResponses =
  EntityGetExamineeExamAnswersForQuestionResponseOK

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

export type EntityGetAnswersRequest = {
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

export type EntityGetAnswersResponseOK = Array<{ 'id'?: number | null; 'questionId'?: number | null; 'description'?: string | null; 'createdAt'?: string | null }>
export type EntityGetAnswersResponses =
  EntityGetAnswersResponseOK

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

export type EntityUpdateAnswersRequest = {
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

export type EntityUpdateAnswersResponseOK = Array<{ 'id'?: number | null; 'questionId'?: number | null; 'description'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateAnswersResponses =
  EntityUpdateAnswersResponseOK

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

export type EntityDeleteAnswersRequest = {
  'fields'?: Array<'createdAt' | 'description' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityDeleteAnswersResponseOK = {
  'id': number | null;
  'questionId': number | null;
  'description': string | null;
  'createdAt': string | null;
}
export type EntityDeleteAnswersResponses =
  EntityDeleteAnswersResponseOK

export type EntityGetExamineeExamAnswersForAnswerRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswersForAnswerResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswersForAnswerResponses =
  EntityGetExamineeExamAnswersForAnswerResponseOK

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

export type EntityGetExamineeExamsRequest = {
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

export type EntityGetExamineeExamsResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamsResponses =
  EntityGetExamineeExamsResponseOK

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

export type EntityUpdateExamineeExamsRequest = {
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

export type EntityUpdateExamineeExamsResponseOK = Array<{ 'id'?: number | null; 'examId'?: number | null; 'examineeId'?: number | null; 'startTime'?: string | null; 'duration'?: number | null; 'status'?: string | null; 'createdAt'?: string | null }>
export type EntityUpdateExamineeExamsResponses =
  EntityUpdateExamineeExamsResponseOK

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

export type EntityDeleteExamineeExamsRequest = {
  'fields'?: Array<'createdAt' | 'duration' | 'examId' | 'examineeId' | 'id' | 'startTime' | 'status'>;
  'id': number;
}

export type EntityDeleteExamineeExamsResponseOK = {
  'id': number | null;
  'examId': number | null;
  'examineeId': number | null;
  'startTime': string | null;
  'duration': number | null;
  'status': string | null;
  'createdAt': string | null;
}
export type EntityDeleteExamineeExamsResponses =
  EntityDeleteExamineeExamsResponseOK

export type EntityGetExamineeExamAnswersForExamineeExamRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityGetExamineeExamAnswersForExamineeExamResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswersForExamineeExamResponses =
  EntityGetExamineeExamAnswersForExamineeExamResponseOK

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

export type EntityGetExamineeExamAnswersRequest = {
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

export type EntityGetExamineeExamAnswersResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityGetExamineeExamAnswersResponses =
  EntityGetExamineeExamAnswersResponseOK

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

export type EntityUpdateExamineeExamAnswersRequest = {
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

export type EntityUpdateExamineeExamAnswersResponseOK = Array<{ 'id'?: number | null; 'examineeExamId'?: number | null; 'questionId'?: number | null; 'answerId'?: number | null; 'createdAt'?: string | null }>
export type EntityUpdateExamineeExamAnswersResponses =
  EntityUpdateExamineeExamAnswersResponseOK

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

export type EntityDeleteExamineeExamAnswersRequest = {
  'fields'?: Array<'answerId' | 'createdAt' | 'examineeExamId' | 'id' | 'questionId'>;
  'id': number;
}

export type EntityDeleteExamineeExamAnswersResponseOK = {
  'id': number | null;
  'examineeExamId': number | null;
  'questionId': number | null;
  'answerId': number | null;
  'createdAt': string | null;
}
export type EntityDeleteExamineeExamAnswersResponses =
  EntityDeleteExamineeExamAnswersResponseOK

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

export type PostEntityLoginResponseOK = {
  'token': string;
}
export type PostEntityLoginResponses =
  PostEntityLoginResponseOK

export type PostEntitySignupRequest = {
  'username': string;
  'password': string;
  'fullName': string;
}

export type PostEntitySignupResponseOK = {
  'token': string;
}
export type PostEntitySignupResponses =
  PostEntitySignupResponseOK

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
  entityGetRoles(req?: EntityGetRolesRequest): Promise<EntityGetRolesResponses>;
  entityCreateRole(req?: EntityCreateRoleRequest): Promise<EntityCreateRoleResponses>;
  entityUpdateRoles(req?: EntityUpdateRolesRequest): Promise<EntityUpdateRolesResponses>;
  entityGetRoleById(req?: EntityGetRoleByIdRequest): Promise<EntityGetRoleByIdResponses>;
  entityUpdateRole(req?: EntityUpdateRoleRequest): Promise<EntityUpdateRoleResponses>;
  entityDeleteRoles(req?: EntityDeleteRolesRequest): Promise<EntityDeleteRolesResponses>;
  entityGetUsersForRole(req?: EntityGetUsersForRoleRequest): Promise<EntityGetUsersForRoleResponses>;
  entityGetUsers(req?: EntityGetUsersRequest): Promise<EntityGetUsersResponses>;
  entityCreateUser(req?: EntityCreateUserRequest): Promise<EntityCreateUserResponses>;
  entityUpdateUsers(req?: EntityUpdateUsersRequest): Promise<EntityUpdateUsersResponses>;
  entityGetUserById(req?: EntityGetUserByIdRequest): Promise<EntityGetUserByIdResponses>;
  entityUpdateUser(req?: EntityUpdateUserRequest): Promise<EntityUpdateUserResponses>;
  entityDeleteUsers(req?: EntityDeleteUsersRequest): Promise<EntityDeleteUsersResponses>;
  entityGetExamsForUser(req?: EntityGetExamsForUserRequest): Promise<EntityGetExamsForUserResponses>;
  entityGetExamineeExamsForUser(req?: EntityGetExamineeExamsForUserRequest): Promise<EntityGetExamineeExamsForUserResponses>;
  entityGetRoleForUser(req?: EntityGetRoleForUserRequest): Promise<EntityGetRoleForUserResponses>;
  entityGetExams(req?: EntityGetExamsRequest): Promise<EntityGetExamsResponses>;
  entityCreateExam(req?: EntityCreateExamRequest): Promise<EntityCreateExamResponses>;
  entityUpdateExams(req?: EntityUpdateExamsRequest): Promise<EntityUpdateExamsResponses>;
  entityGetExamById(req?: EntityGetExamByIdRequest): Promise<EntityGetExamByIdResponses>;
  entityUpdateExam(req?: EntityUpdateExamRequest): Promise<EntityUpdateExamResponses>;
  entityDeleteExams(req?: EntityDeleteExamsRequest): Promise<EntityDeleteExamsResponses>;
  entityGetQuestionsForExam(req?: EntityGetQuestionsForExamRequest): Promise<EntityGetQuestionsForExamResponses>;
  entityGetExamineeExamsForExam(req?: EntityGetExamineeExamsForExamRequest): Promise<EntityGetExamineeExamsForExamResponses>;
  entityGetUserForExam(req?: EntityGetUserForExamRequest): Promise<EntityGetUserForExamResponses>;
  entityGetQuestions(req?: EntityGetQuestionsRequest): Promise<EntityGetQuestionsResponses>;
  entityCreateQuestion(req?: EntityCreateQuestionRequest): Promise<EntityCreateQuestionResponses>;
  entityUpdateQuestions(req?: EntityUpdateQuestionsRequest): Promise<EntityUpdateQuestionsResponses>;
  entityGetQuestionById(req?: EntityGetQuestionByIdRequest): Promise<EntityGetQuestionByIdResponses>;
  entityUpdateQuestion(req?: EntityUpdateQuestionRequest): Promise<EntityUpdateQuestionResponses>;
  entityDeleteQuestions(req?: EntityDeleteQuestionsRequest): Promise<EntityDeleteQuestionsResponses>;
  entityGetAnswersForQuestion(req?: EntityGetAnswersForQuestionRequest): Promise<EntityGetAnswersForQuestionResponses>;
  entityGetExamineeExamAnswersForQuestion(req?: EntityGetExamineeExamAnswersForQuestionRequest): Promise<EntityGetExamineeExamAnswersForQuestionResponses>;
  entityGetExamForQuestion(req?: EntityGetExamForQuestionRequest): Promise<EntityGetExamForQuestionResponses>;
  entityGetAnswers(req?: EntityGetAnswersRequest): Promise<EntityGetAnswersResponses>;
  entityCreateAnswer(req?: EntityCreateAnswerRequest): Promise<EntityCreateAnswerResponses>;
  entityUpdateAnswers(req?: EntityUpdateAnswersRequest): Promise<EntityUpdateAnswersResponses>;
  entityGetAnswerById(req?: EntityGetAnswerByIdRequest): Promise<EntityGetAnswerByIdResponses>;
  entityUpdateAnswer(req?: EntityUpdateAnswerRequest): Promise<EntityUpdateAnswerResponses>;
  entityDeleteAnswers(req?: EntityDeleteAnswersRequest): Promise<EntityDeleteAnswersResponses>;
  entityGetExamineeExamAnswersForAnswer(req?: EntityGetExamineeExamAnswersForAnswerRequest): Promise<EntityGetExamineeExamAnswersForAnswerResponses>;
  entityGetQuestionForAnswer(req?: EntityGetQuestionForAnswerRequest): Promise<EntityGetQuestionForAnswerResponses>;
  entityGetExamineeExams(req?: EntityGetExamineeExamsRequest): Promise<EntityGetExamineeExamsResponses>;
  entityCreateExamineeExam(req?: EntityCreateExamineeExamRequest): Promise<EntityCreateExamineeExamResponses>;
  entityUpdateExamineeExams(req?: EntityUpdateExamineeExamsRequest): Promise<EntityUpdateExamineeExamsResponses>;
  entityGetExamineeExamById(req?: EntityGetExamineeExamByIdRequest): Promise<EntityGetExamineeExamByIdResponses>;
  entityUpdateExamineeExam(req?: EntityUpdateExamineeExamRequest): Promise<EntityUpdateExamineeExamResponses>;
  entityDeleteExamineeExams(req?: EntityDeleteExamineeExamsRequest): Promise<EntityDeleteExamineeExamsResponses>;
  entityGetExamineeExamAnswersForExamineeExam(req?: EntityGetExamineeExamAnswersForExamineeExamRequest): Promise<EntityGetExamineeExamAnswersForExamineeExamResponses>;
  entityGetUserForExamineeExam(req?: EntityGetUserForExamineeExamRequest): Promise<EntityGetUserForExamineeExamResponses>;
  entityGetExamForExamineeExam(req?: EntityGetExamForExamineeExamRequest): Promise<EntityGetExamForExamineeExamResponses>;
  entityGetExamineeExamAnswers(req?: EntityGetExamineeExamAnswersRequest): Promise<EntityGetExamineeExamAnswersResponses>;
  entityCreateExamineeExamAnswer(req?: EntityCreateExamineeExamAnswerRequest): Promise<EntityCreateExamineeExamAnswerResponses>;
  entityUpdateExamineeExamAnswers(req?: EntityUpdateExamineeExamAnswersRequest): Promise<EntityUpdateExamineeExamAnswersResponses>;
  entityGetExamineeExamAnswerById(req?: EntityGetExamineeExamAnswerByIdRequest): Promise<EntityGetExamineeExamAnswerByIdResponses>;
  entityUpdateExamineeExamAnswer(req?: EntityUpdateExamineeExamAnswerRequest): Promise<EntityUpdateExamineeExamAnswerResponses>;
  entityDeleteExamineeExamAnswers(req?: EntityDeleteExamineeExamAnswersRequest): Promise<EntityDeleteExamineeExamAnswersResponses>;
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
