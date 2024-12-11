export type AnswerCreate = {
	description: string;
	is_correct_answer: boolean;
};

export type AnswerIn = {
	question_id: string;
	answer_id: string;
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

export type Body_admin_create_question_group_resources = {
	file: Blob | File;
};

export type Body_candidate_add_speaking_record = {
	file: Blob | File;
};

export type Body_login_login_access_token = {
	grant_type?: string | null;
	username: string;
	password: string;
	scope?: string;
	client_id?: string | null;
	client_secret?: string | null;
};

export type CandidateExamEssayResult = {
	id: string;
	question_id: string;
	content: string | null;
	resource: string | null;
	score: number | null;
	assessment: string | null;
};

export type CandidateExamPublic = {
	id: string;
	candidate_id: string;
	exam_id: string;
	start_time: string;
	end_time: string;
	status: CandidateExamStatus;
	score: number | null;
	listening_score: number | null;
	reading_score: number | null;
	speaking_score: number | null;
	writing_score: number | null;
};

export type CandidateExamRegister = {
	start_time?: string | null;
};

export enum CandidateExamStatus {
	SCHEDULED = "SCHEDULED",
	STARTED = "STARTED",
	FINISHED = "FINISHED",
	ASSESSED = "ASSESSED",
	CANCELED = "CANCELED",
}

export type EssayIn = {
	question_id: string;
	content: string | null;
};

export type EssayPublic = {
	id: string;
	question_id: string;
	content: string | null;
	resource: string | null;
};

export type ExamCreate = {
	title: string;
	description: string;
};

export type ExamFinished = {
	id: string;
	score: number;
	listening_score: number;
	reading_score: number;
	speaking_score: number;
	writing_score: number;
	selected_answers: Array<AnswerIn>;
	essays: Array<CandidateExamEssayResult>;
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

export enum ExamStatus {
	DRAFT = "DRAFT",
	ACTIVE = "ACTIVE",
}

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

export enum QuestionStatusEnum {
	DRAFT = "DRAFT",
	ACTIVE = "ACTIVE",
}

export type QuestionUpdate = {
	description: string | null;
	id: string | null;
};

export type QuestionsPublic = {
	data: Array<QuestionPublic>;
	count: number;
};

export type RegisteredExamPublic = {
	id: string;
	status: CandidateExamStatus;
	start_time: string;
	end_time: string | null;
	exam: ExamPublic;
};

export type RegisteredExamsPublic = {
	data: Array<RegisteredExamPublic>;
	count: number;
};

export enum Role {
	CANDIDATE = "CANDIDATE",
	EXAMINER = "EXAMINER",
}

export enum Skill {
	LISTENING = "LISTENING",
	READING = "READING",
	WRITING = "WRITING",
	SPEAKING = "SPEAKING",
}

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
	role: Role | null;
	full_name?: string | null;
	password: string;
};

export type UserPublic = {
	email: string;
	is_active?: boolean;
	is_superuser?: boolean;
	role: Role | null;
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
	role: Role | null;
	full_name?: string | null;
	password?: string | null;
};

export type UserUpdateMe = {
	full_name?: string | null;
	email?: string | null;
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
