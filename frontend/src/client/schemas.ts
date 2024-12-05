export const $AnswerCreate = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		is_correct_answer: {
			type: "boolean",
			isRequired: true,
		},
	},
} as const;

export const $AnswerPublic = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		is_correct_answer: {
			type: "boolean",
			isRequired: true,
		},
	},
} as const;

export const $AnswerUpdate = {
	properties: {
		description: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		is_correct_answer: {
			type: "boolean",
			isRequired: true,
		},
	},
} as const;

export const $Body_admin_create_question_group_resources = {
	properties: {
		file: {
			type: "binary",
			isRequired: true,
			format: "binary",
		},
	},
} as const;

export const $Body_candidate_add_speaking_record = {
	properties: {
		essay_in: {
			type: "EssayIn",
			isRequired: true,
		},
		file: {
			type: "any-of",
			contains: [
				{
					type: "binary",
					format: "binary",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
	},
} as const;

export const $Body_login_login_access_token = {
	properties: {
		grant_type: {
			type: "any-of",
			contains: [
				{
					type: "string",
					pattern: "password",
				},
				{
					type: "null",
				},
			],
		},
		username: {
			type: "string",
			isRequired: true,
		},
		password: {
			type: "string",
			isRequired: true,
		},
		scope: {
			type: "string",
			default: "",
		},
		client_id: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
		client_secret: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $CandidateExamRegister = {
	properties: {
		start_time: {
			type: "string",
			isRequired: true,
			format: "date-time",
		},
	},
} as const;

export const $CandidateExamStatus = {
	type: "Enum",
	enum: ["SCHEDULED", "STARTED", "FINISHED", "ASSESSED", "CANCELED"],
} as const;

export const $EssayIn = {
	properties: {
		question_id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		content: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
	},
} as const;

export const $EssaySubmit = {
	properties: {
		content: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		resource: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
	},
} as const;

export const $ExamCreate = {
	properties: {
		title: {
			type: "string",
			isRequired: true,
			maxLength: 255,
		},
		description: {
			type: "string",
			isRequired: true,
		},
	},
} as const;

export const $ExamFinished = {
	properties: {
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		score: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $ExamPublic = {
	properties: {
		title: {
			type: "string",
			isRequired: true,
			maxLength: 255,
		},
		description: {
			type: "string",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		status: {
			type: "ExamStatus",
			isRequired: true,
		},
		parts: {
			type: "array",
			contains: {
				type: "PartPublic",
			},
			isRequired: true,
		},
	},
} as const;

export const $ExamReadonly = {
	properties: {
		title: {
			type: "string",
			isRequired: true,
			maxLength: 255,
		},
		description: {
			type: "string",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		parts: {
			type: "array",
			contains: {
				type: "PartReadonly",
			},
			isRequired: true,
		},
	},
} as const;

export const $ExamStatus = {
	type: "Enum",
	enum: ["DRAFT", "ACTIVE"],
} as const;

export const $ExamSubmit = {
	properties: {
		question_groups: {
			type: "array",
			contains: {
				type: "QuestionGroupSubmit",
			},
			isRequired: true,
		},
	},
} as const;

export const $ExamUpdate = {
	properties: {
		title: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		description: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		status: {
			type: "any-of",
			contains: [
				{
					type: "ExamStatus",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		question_groups: {
			type: "array",
			contains: {
				type: "string",
				format: "uuid",
			},
			isRequired: true,
		},
	},
} as const;

export const $ExamsPublic = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "ExamPublic",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $ExamsReadonly = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "ExamReadonly",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $HTTPValidationError = {
	properties: {
		detail: {
			type: "array",
			contains: {
				type: "ValidationError",
			},
		},
	},
} as const;

export const $Message = {
	properties: {
		message: {
			type: "string",
			isRequired: true,
		},
	},
} as const;

export const $NewPassword = {
	properties: {
		token: {
			type: "string",
			isRequired: true,
		},
		new_password: {
			type: "string",
			isRequired: true,
			maxLength: 40,
			minLength: 8,
		},
	},
} as const;

export const $PartCreate = {
	properties: {
		question_group_id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		order: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $PartPublic = {
	properties: {
		order: {
			type: "number",
			isRequired: true,
		},
		question_group: {
			type: "QuestionGroupPublic",
			isRequired: true,
		},
	},
} as const;

export const $PartReadonly = {
	properties: {
		order: {
			type: "number",
			isRequired: true,
		},
		question_group: {
			type: "QuestionGroupReadonly",
			isRequired: true,
		},
	},
} as const;

export const $QuestionCreate = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		answers: {
			type: "array",
			contains: {
				type: "AnswerCreate",
			},
			isRequired: true,
		},
	},
} as const;

export const $QuestionGroupCreate = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		resource: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		skill: {
			type: "Skill",
			isRequired: true,
		},
		duration: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $QuestionGroupPublic = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		resource: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		skill: {
			type: "Skill",
			isRequired: true,
		},
		duration: {
			type: "number",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		questions: {
			type: "array",
			contains: {
				type: "QuestionPublic",
			},
			isRequired: true,
		},
	},
} as const;

export const $QuestionGroupReadonly = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		resource: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		skill: {
			type: "Skill",
			isRequired: true,
		},
		duration: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $QuestionGroupSubmit = {
	properties: {
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		questions: {
			type: "array",
			contains: {
				type: "QuestionSubmit",
			},
			isRequired: true,
		},
		essays: {
			type: "array",
			contains: {
				type: "EssaySubmit",
			},
			isRequired: true,
		},
	},
} as const;

export const $QuestionGroupUpdate = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		resource: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		skill: {
			type: "Skill",
			isRequired: true,
		},
		duration: {
			type: "number",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		status: {
			type: "any-of",
			contains: [
				{
					type: "QuestionStatusEnum",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
	},
} as const;

export const $QuestionGroupsPublic = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "QuestionGroupPublic",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $QuestionPublic = {
	properties: {
		description: {
			type: "string",
			isRequired: true,
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		answers: {
			type: "array",
			contains: {
				type: "AnswerPublic",
			},
			isRequired: true,
		},
	},
} as const;

export const $QuestionStatusEnum = {
	type: "Enum",
	enum: ["DRAFT", "ACTIVE"],
} as const;

export const $QuestionSubmit = {
	properties: {
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		answer: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
	},
} as const;

export const $QuestionUpdate = {
	properties: {
		description: {
			type: "any-of",
			contains: [
				{
					type: "string",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		id: {
			type: "any-of",
			contains: [
				{
					type: "string",
					format: "uuid",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
	},
} as const;

export const $QuestionsPublic = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "QuestionPublic",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $RegisteredExamPublic = {
	properties: {
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
		status: {
			type: "CandidateExamStatus",
			isRequired: true,
		},
		start_time: {
			type: "string",
			isRequired: true,
			format: "date-time",
		},
		end_time: {
			type: "any-of",
			contains: [
				{
					type: "string",
					format: "date-time",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		exam: {
			type: "ExamPublic",
			isRequired: true,
		},
	},
} as const;

export const $RegisteredExamsPublic = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "RegisteredExamPublic",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $Role = {
	type: "Enum",
	enum: ["CANDIDATE", "EXAMINER"],
} as const;

export const $Skill = {
	type: "Enum",
	enum: ["LISTENING", "READING", "WRITING ", "SPEAKING"],
} as const;

export const $Token = {
	properties: {
		access_token: {
			type: "string",
			isRequired: true,
		},
		token_type: {
			type: "string",
			default: "bearer",
		},
	},
} as const;

export const $UpdatePassword = {
	properties: {
		current_password: {
			type: "string",
			isRequired: true,
			maxLength: 40,
			minLength: 8,
		},
		new_password: {
			type: "string",
			isRequired: true,
			maxLength: 40,
			minLength: 8,
		},
	},
} as const;

export const $UserCreate = {
	properties: {
		email: {
			type: "string",
			isRequired: true,
			format: "email",
			maxLength: 255,
		},
		is_active: {
			type: "boolean",
			default: true,
		},
		is_superuser: {
			type: "boolean",
			default: false,
		},
		role: {
			type: "any-of",
			contains: [
				{
					type: "Role",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
		password: {
			type: "string",
			isRequired: true,
			maxLength: 40,
			minLength: 8,
		},
	},
} as const;

export const $UserPublic = {
	properties: {
		email: {
			type: "string",
			isRequired: true,
			format: "email",
			maxLength: 255,
		},
		is_active: {
			type: "boolean",
			default: true,
		},
		is_superuser: {
			type: "boolean",
			default: false,
		},
		role: {
			type: "any-of",
			contains: [
				{
					type: "Role",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
		id: {
			type: "string",
			isRequired: true,
			format: "uuid",
		},
	},
} as const;

export const $UserRegister = {
	properties: {
		email: {
			type: "string",
			isRequired: true,
			format: "email",
			maxLength: 255,
		},
		password: {
			type: "string",
			isRequired: true,
			maxLength: 40,
			minLength: 8,
		},
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $UserUpdate = {
	properties: {
		email: {
			type: "any-of",
			contains: [
				{
					type: "string",
					format: "email",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
		is_active: {
			type: "boolean",
			default: true,
		},
		is_superuser: {
			type: "boolean",
			default: false,
		},
		role: {
			type: "any-of",
			contains: [
				{
					type: "Role",
				},
				{
					type: "null",
				},
			],
			isRequired: true,
		},
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
		password: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 40,
					minLength: 8,
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $UserUpdateMe = {
	properties: {
		full_name: {
			type: "any-of",
			contains: [
				{
					type: "string",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
		email: {
			type: "any-of",
			contains: [
				{
					type: "string",
					format: "email",
					maxLength: 255,
				},
				{
					type: "null",
				},
			],
		},
	},
} as const;

export const $UsersPublic = {
	properties: {
		data: {
			type: "array",
			contains: {
				type: "UserPublic",
			},
			isRequired: true,
		},
		count: {
			type: "number",
			isRequired: true,
		},
	},
} as const;

export const $ValidationError = {
	properties: {
		loc: {
			type: "array",
			contains: {
				type: "any-of",
				contains: [
					{
						type: "string",
					},
					{
						type: "number",
					},
				],
			},
			isRequired: true,
		},
		msg: {
			type: "string",
			isRequired: true,
		},
		type: {
			type: "string",
			isRequired: true,
		},
	},
} as const;
