export interface FullResponse<T, U extends number> {
  'statusCode': U;
  'headers': object;
  'body': T;
}

export type GetExampleRequest = {
  unknown
}

export type GetExampleResponseOK = unknown
export type GetExampleResponses =
  FullResponse<GetExampleResponseOK, 200>

export type EntityGetMoviesRequest = {
  'limit'?: number;
  'offset'?: number;
  'totalCount'?: boolean;
  'fields'?: Array<'id' | 'title'>;
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
  'orderby.id'?: 'asc' | 'desc';
  'orderby.title'?: 'asc' | 'desc';
}

export type EntityGetMoviesResponseOK = Array<{ 'id'?: number | null; 'title'?: string | null }>
export type EntityGetMoviesResponses =
  EntityGetMoviesResponseOK

export type EntityCreateMovieRequest = {
  'id'?: number;
  'title': string;
}

export type EntityCreateMovieResponseOK = {
  'id': number | null;
  'title': string | null;
}
export type EntityCreateMovieResponses =
  EntityCreateMovieResponseOK

export type EntityUpdateMoviesRequest = {
  'fields'?: Array<'id' | 'title'>;
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
  'title': string;
}

export type EntityUpdateMoviesResponseOK = Array<{ 'id'?: number | null; 'title'?: string | null }>
export type EntityUpdateMoviesResponses =
  EntityUpdateMoviesResponseOK

export type EntityGetMovieByIdRequest = {
  'fields'?: Array<'id' | 'title'>;
  'id': number;
}

export type EntityGetMovieByIdResponseOK = {
  'id': number | null;
  'title': string | null;
}
export type EntityGetMovieByIdResponses =
  EntityGetMovieByIdResponseOK

export type EntityUpdateMovieRequest = {
  'fields'?: Array<'id' | 'title'>;
  'id': number;
  'title': string;
}

export type EntityUpdateMovieResponseOK = {
  'id': number | null;
  'title': string | null;
}
export type EntityUpdateMovieResponses =
  EntityUpdateMovieResponseOK

export type EntityDeleteMoviesRequest = {
  'fields'?: Array<'id' | 'title'>;
  'id': number;
}

export type EntityDeleteMoviesResponseOK = {
  'id': number | null;
  'title': string | null;
}
export type EntityDeleteMoviesResponses =
  EntityDeleteMoviesResponseOK

export type GetEntityExampleRequest = {
  unknown
}

export type GetEntityExampleResponseOK = unknown
export type GetEntityExampleResponses =
  FullResponse<GetEntityExampleResponseOK, 200>

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
  getExample(req?: GetExampleRequest): Promise<GetExampleResponses>;
  entityGetMovies(req?: EntityGetMoviesRequest): Promise<EntityGetMoviesResponses>;
  entityCreateMovie(req?: EntityCreateMovieRequest): Promise<EntityCreateMovieResponses>;
  entityUpdateMovies(req?: EntityUpdateMoviesRequest): Promise<EntityUpdateMoviesResponses>;
  entityGetMovieById(req?: EntityGetMovieByIdRequest): Promise<EntityGetMovieByIdResponses>;
  entityUpdateMovie(req?: EntityUpdateMovieRequest): Promise<EntityUpdateMovieResponses>;
  entityDeleteMovies(req?: EntityDeleteMoviesRequest): Promise<EntityDeleteMoviesResponses>;
  getEntityExample(req?: GetEntityExampleRequest): Promise<GetEntityExampleResponses>;
  aiPrompt(req?: AiPromptRequest): Promise<AiPromptResponses>;
  aiStream(req?: AiStreamRequest): Promise<AiStreamResponses>;
}
type PlatformaticFrontendClient = Omit<Api, 'setBaseUrl'>
type BuildOptions = {
  headers?: Object
}
export default function build(url: string, options?: BuildOptions): PlatformaticFrontendClient
