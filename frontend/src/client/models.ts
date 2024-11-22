export type AnswerCreate = {
	description: string;
	is_correct_answer: boolean;
};

export type AnswerPublic = {
	description: string;
	id: string;
	is_correct_answer: boolean;
};

export type AnswerUpdate = {
	description: string | null;
	id: string;
	is_correct_answer: boolean;
};

export type Body_login_login_access_token = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};

export type Body_question_groups_create_question_group_resources = {
	file: Blob | File;
};

export type CandidateExamRegister = {
	start_time: string;
};

export type CandidateExamStatus =
	| "SCHEDULED"
	| "STARTED"
	| "FINISHED"
	| "CANCELED";

export type ExamCreate = {
	title: string;
	description: string;
};

export type ExamPublic = {
	title: string;
	description: string;
	id: string;
	status: ExamStatus;
	parts: Array<PartPublic>;
};

export type ExamReadonly = {
	title: string;
	description: string;
	id: string;
	parts: Array<PartReadonly>;
};

export type ExamStatus = "DRAFT" | "ACTIVE";

export type ExamUpdate = {
	title: string | null;
	description: string | null;
	status: ExamStatus | null;
	question_groups: Array<string>;
};

export type ExamsPublic = {
	data: Array<ExamPublic>;
	count: number;
};

export type ExamsReadonly = {
	data: Array<ExamReadonly>;
	count: number;
};

export type HTTPValidationError = {
	detail?: Array<ValidationError>;
};

export type Message = {
	message: string;
};

export type NewPassword = {
	token: string;
	new_password: string;
};

export type PartCreate = {
	question_group_id: string;
	order: number;
};

export type PartPublic = {
	order: number;
	question_group: QuestionGroupPublic;
};

export type PartReadonly = {
	order: number;
	question_group: QuestionGroupReadonly;
};

export type QuestionCreate = {
	description: string;
	answers: Array<AnswerCreate>;
};

export type QuestionGroupCreate = {
	description: string;
	resource: string | null;
	skill: Skill;
	duration: number;
};

export type QuestionGroupPublic = {
	description: string;
	resource: string | null;
	skill: Skill;
	duration: number;
	id: string;
	questions: Array<QuestionPublic>;
};

export type QuestionGroupReadonly = {
	description: string;
	resource: string | null;
	skill: Skill;
	duration: number;
};

export type QuestionGroupUpdate = {
	description: string;
	resource: string | null;
	skill: Skill;
	duration: number;
	id: string;
	status: QuestionStatusEnum | null;
};

export type QuestionGroupsPublic = {
	data: Array<QuestionGroupPublic>;
	count: number;
};

export type QuestionPublic = {
	description: string;
	id: string;
	answers: Array<AnswerPublic>;
};

export type QuestionStatusEnum = "DRAFT" | "ACTIVE";

export type QuestionUpdate = {
	description: string | null;
	id: string | null;
};

export type QuestionsPublic = {
	data: Array<QuestionPublic>;
	count: number;
};

export type RegisteredExam = {
	id: string;
	status: CandidateExamStatus;
	exam: ExamReadonly;
};

export type RegisteredExams = {
	data: Array<RegisteredExam>;
	count: number;
};

export type Role = "CANDIDATE" | "EXAMINER";

export type Skill = "LISTENING" | "READING" | "WRITING " | "SPEAKING";

export type Token = {
	access_token: string;
	token_type?: string;
};

export type UpdatePassword = {
	current_password: string;
	new_password: string;
};

export type UserCreate = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	role?: Role;
	full_name?: string | null;
	password: string;
};

export type UserPublic = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	role?: Role;
	full_name?: string | null;
	id: string;
};

export type UserRegister = {
	email: string;
	password: string;
	full_name?: string | null;
};

export type UserUpdate = {
	email?: string | null;
	is_active?: boolean;
	is_superuser?: boolean;
	role?: Role;
	full_name?: string | null;
	password?: string | null;
};

export type UserUpdateMe = {
	email?: string | null;
	is_active?: boolean;
	is_superuser?: boolean;
	role?: Role;
	full_name?: string | null;
};

export type UsersPublic = {
	data: Array<UserPublic>;
	count: number;
};

export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};
