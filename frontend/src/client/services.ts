import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";

import type {
	Body_login_login_access_token,
	Message,
	NewPassword,
	Token,
	UserPublic,
	AnswerCreate,
	AnswerPublic,
	AnswerUpdate,
	Body_admin_create_question_group_resources,
	ExamCreate,
	ExamPublic,
	ExamsPublic,
	ExamUpdate,
	PartCreate,
	QuestionCreate,
	QuestionGroupCreate,
	QuestionGroupPublic,
	QuestionGroupsPublic,
	QuestionGroupUpdate,
	QuestionPublic,
	QuestionsPublic,
	QuestionStatusEnum,
	QuestionUpdate,
	Skill,
	UserCreate,
	UsersPublic,
	UserUpdate,
	UpdatePassword,
	UserRegister,
	UserUpdateMe,
	Body_candidate_add_speaking_record,
	CandidateExamRegister,
	ExamFinished,
	ExamReadonly,
	ExamsReadonly,
	ExamSubmit,
	RegisteredExamPublic,
	RegisteredExamsPublic,
} from "./models";

export type TDataLoginAccessToken = {
	formData: Body_login_login_access_token;
};
export type TDataRecoverPassword = {
	email: string;
};
export type TDataResetPassword = {
	requestBody: NewPassword;
};
export type TDataRecoverPasswordHtmlContent = {
	email: string;
};

export class LoginService {
	/**
	 * Login Access Token
	 * OAuth2 compatible token login, get an access token for future requests
	 * @returns Token Successful Response
	 * @throws ApiError
	 */
	public static loginAccessToken(
		data: TDataLoginAccessToken,
	): CancelablePromise<Token> {
		const { formData } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/login/access-token",
			formData: formData,
			mediaType: "application/x-www-form-urlencoded",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Test Token
	 * Test access token
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static testToken(): CancelablePromise<UserPublic> {
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/login/test-token",
		});
	}

	/**
	 * Recover Password
	 * Password Recovery
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static recoverPassword(
		data: TDataRecoverPassword,
	): CancelablePromise<Message> {
		const { email } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/password-recovery/{email}",
			path: {
				email,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Reset Password
	 * Reset password
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static resetPassword(
		data: TDataResetPassword,
	): CancelablePromise<Message> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/reset-password/",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Recover Password Html Content
	 * HTML Content for Password Recovery
	 * @returns string Successful Response
	 * @throws ApiError
	 */
	public static recoverPasswordHtmlContent(
		data: TDataRecoverPasswordHtmlContent,
	): CancelablePromise<string> {
		const { email } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/password-recovery-html-content/{email}",
			path: {
				email,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}
}

export type TDataTestEmail = {
	emailTo: string;
};

export class UtilsService {
	/**
	 * Test Email
	 * Test emails.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static testEmail(data: TDataTestEmail): CancelablePromise<Message> {
		const { emailTo } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/utils/test-email/",
			query: {
				email_to: emailTo,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Health Check
	 * @returns boolean Successful Response
	 * @throws ApiError
	 */
	public static healthCheck(): CancelablePromise<boolean> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/utils/health-check/",
		});
	}
}

export type TDataReadExams = {
	limit?: number;
	skip?: number;
};
export type TDataCreateExam = {
	requestBody: ExamCreate;
};
export type TDataReadExam = {
	id: string;
};
export type TDataUpdateExam = {
	id: string;
	requestBody: ExamUpdate;
};
export type TDataDeleteExam = {
	id: string;
};
export type TDataAddExamQuestionGroup = {
	id: string;
	requestBody: PartCreate;
};
export type TDataUpdateExamQuestionGroups = {
	id: string;
	requestBody: Array<PartCreate>;
};
export type TDataDeleteExamQuestionGroup = {
	id: string;
	questionGroupId: string;
};
export type TDataReadUsers = {
	limit?: number;
	skip?: number;
};
export type TDataCreateUser = {
	requestBody: UserCreate;
};
export type TDataReadUserById = {
	userId: string;
};
export type TDataUpdateUser = {
	requestBody: UserUpdate;
	userId: string;
};
export type TDataDeleteUser = {
	userId: string;
};
export type TDataReadQuestionGroups = {
	limit?: number;
	skill?: Skill | null;
	skip?: number;
	status?: QuestionStatusEnum | null;
};
export type TDataCreateQuestionGroup = {
	requestBody: QuestionGroupCreate;
};
export type TDataReadQuestionGroup = {
	id: string;
};
export type TDataUpdateQuestionGroup = {
	id: string;
	requestBody: QuestionGroupUpdate;
};
export type TDataDeleteQuestionGroup = {
	id: string;
};
export type TDataCreateQuestionGroupResources = {
	formData: Body_admin_create_question_group_resources;
	id: string;
};
export type TDataReadQuestions = {
	questionGroupId: string;
};
export type TDataCreateQuestion = {
	questionGroupId: string;
	requestBody: QuestionCreate;
};
export type TDataReadQuestion = {
	id: string;
	questionGroupId: string;
};
export type TDataUpdateQuestion = {
	id: string;
	questionGroupId: string;
	requestBody: QuestionUpdate;
};
export type TDataDeleteQuestion = {
	id: string;
	questionGroupId: string;
};
export type TDataReadAnswers = {
	questionGroupId: string;
	questionId: string;
};
export type TDataCreateAnswer = {
	questionGroupId: string;
	questionId: string;
	requestBody: AnswerCreate;
};
export type TDataReadAnswer = {
	id: string;
	questionGroupId: string;
	questionId: string;
};
export type TDataUpdateAnswer = {
	id: string;
	questionGroupId: string;
	questionId: string;
	requestBody: AnswerUpdate;
};
export type TDataDeleteAnswer = {
	id: string;
	questionGroupId: string;
	questionId: string;
};

export class AdminService {
	/**
	 * Read Exams
	 * Retrieve exams.
	 * @returns ExamsPublic Successful Response
	 * @throws ApiError
	 */
	public static readExams(
		data: TDataReadExams = {},
	): CancelablePromise<ExamsPublic> {
		const { limit = 100, skip = 0 } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/exams/",
			query: {
				skip,
				limit,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Exam
	 * Create new exam.
	 * @returns ExamPublic Successful Response
	 * @throws ApiError
	 */
	public static createExam(
		data: TDataCreateExam,
	): CancelablePromise<ExamPublic> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/exams/",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Exam
	 * Get exam by ID.
	 * @returns ExamPublic Successful Response
	 * @throws ApiError
	 */
	public static readExam(data: TDataReadExam): CancelablePromise<ExamPublic> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/exams/{id}",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Exam
	 * Update an exam.
	 * @returns ExamPublic Successful Response
	 * @throws ApiError
	 */
	public static updateExam(
		data: TDataUpdateExam,
	): CancelablePromise<ExamPublic> {
		const { id, requestBody } = data;
		return __request(OpenAPI, {
			method: "PUT",
			url: "/api/v1/admin/exams/{id}",
			path: {
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Exam
	 * Delete an exam.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteExam(data: TDataDeleteExam): CancelablePromise<Message> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/admin/exams/{id}",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Add Exam Question Group
	 * @returns ExamPublic Successful Response
	 * @throws ApiError
	 */
	public static addExamQuestionGroup(
		data: TDataAddExamQuestionGroup,
	): CancelablePromise<ExamPublic> {
		const { id, requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/exams/{id}/question_groups",
			path: {
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Exam Question Groups
	 * @returns ExamPublic Successful Response
	 * @throws ApiError
	 */
	public static updateExamQuestionGroups(
		data: TDataUpdateExamQuestionGroups,
	): CancelablePromise<ExamPublic> {
		const { id, requestBody } = data;
		return __request(OpenAPI, {
			method: "PUT",
			url: "/api/v1/admin/exams/{id}/question_groups",
			path: {
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Exam Question Group
	 * @returns ExamPublic Successful Response
	 * @throws ApiError
	 */
	public static deleteExamQuestionGroup(
		data: TDataDeleteExamQuestionGroup,
	): CancelablePromise<ExamPublic> {
		const { id, questionGroupId } = data;
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/admin/exams/{id}/question_groups/{question_group_id}",
			path: {
				id,
				question_group_id: questionGroupId,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Users
	 * Retrieve users.
	 * @returns UsersPublic Successful Response
	 * @throws ApiError
	 */
	public static readUsers(
		data: TDataReadUsers = {},
	): CancelablePromise<UsersPublic> {
		const { limit = 100, skip = 0 } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/users/",
			query: {
				skip,
				limit,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create User
	 * Create new user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static createUser(
		data: TDataCreateUser,
	): CancelablePromise<UserPublic> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/users/",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read User By Id
	 * Get a specific user by id.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static readUserById(
		data: TDataReadUserById,
	): CancelablePromise<UserPublic> {
		const { userId } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/users/{user_id}",
			path: {
				user_id: userId,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update User
	 * Update a user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static updateUser(
		data: TDataUpdateUser,
	): CancelablePromise<UserPublic> {
		const { requestBody, userId } = data;
		return __request(OpenAPI, {
			method: "PATCH",
			url: "/api/v1/admin/users/{user_id}",
			path: {
				user_id: userId,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete User
	 * Delete a user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
		const { userId } = data;
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/admin/users/{user_id}",
			path: {
				user_id: userId,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Question Groups
	 * Retrieve question groups.
	 * @returns QuestionGroupsPublic Successful Response
	 * @throws ApiError
	 */
	public static readQuestionGroups(
		data: TDataReadQuestionGroups = {},
	): CancelablePromise<QuestionGroupsPublic> {
		const { limit = 100, skill, skip = 0, status } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/question_groups/",
			query: {
				skip,
				limit,
				skill,
				status,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Question Group
	 * Create new question group.
	 * @returns QuestionGroupPublic Successful Response
	 * @throws ApiError
	 */
	public static createQuestionGroup(
		data: TDataCreateQuestionGroup,
	): CancelablePromise<QuestionGroupPublic> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/question_groups/",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Question Group
	 * Get question group by ID.
	 * @returns QuestionGroupPublic Successful Response
	 * @throws ApiError
	 */
	public static readQuestionGroup(
		data: TDataReadQuestionGroup,
	): CancelablePromise<QuestionGroupPublic> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/question_groups/{id}",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Question Group
	 * Update an question group.
	 * @returns QuestionGroupPublic Successful Response
	 * @throws ApiError
	 */
	public static updateQuestionGroup(
		data: TDataUpdateQuestionGroup,
	): CancelablePromise<QuestionGroupPublic> {
		const { id, requestBody } = data;
		return __request(OpenAPI, {
			method: "PUT",
			url: "/api/v1/admin/question_groups/{id}",
			path: {
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Question Group
	 * Delete an question group.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteQuestionGroup(
		data: TDataDeleteQuestionGroup,
	): CancelablePromise<Message> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/admin/question_groups/{id}",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Question Group Resources
	 * Create new question group.
	 * @returns QuestionGroupPublic Successful Response
	 * @throws ApiError
	 */
	public static createQuestionGroupResources(
		data: TDataCreateQuestionGroupResources,
	): CancelablePromise<QuestionGroupPublic> {
		const { formData, id } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/question_groups/{id}/resources",
			path: {
				id,
			},
			formData: formData,
			mediaType: "multipart/form-data",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Questions
	 * Retrieve questions.
	 * @returns QuestionsPublic Successful Response
	 * @throws ApiError
	 */
	public static readQuestions(
		data: TDataReadQuestions,
	): CancelablePromise<QuestionsPublic> {
		const { questionGroupId } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/",
			path: {
				question_group_id: questionGroupId,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Question
	 * Create new question.
	 * @returns QuestionPublic Successful Response
	 * @throws ApiError
	 */
	public static createQuestion(
		data: TDataCreateQuestion,
	): CancelablePromise<QuestionPublic> {
		const { questionGroupId, requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/",
			path: {
				question_group_id: questionGroupId,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Question
	 * Get question by ID.
	 * @returns QuestionPublic Successful Response
	 * @throws ApiError
	 */
	public static readQuestion(
		data: TDataReadQuestion,
	): CancelablePromise<QuestionPublic> {
		const { id, questionGroupId } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{id}",
			path: {
				question_group_id: questionGroupId,
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Question
	 * Update an question.
	 * @returns QuestionPublic Successful Response
	 * @throws ApiError
	 */
	public static updateQuestion(
		data: TDataUpdateQuestion,
	): CancelablePromise<QuestionPublic> {
		const { id, questionGroupId, requestBody } = data;
		return __request(OpenAPI, {
			method: "PUT",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{id}",
			path: {
				question_group_id: questionGroupId,
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Question
	 * Delete an question.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteQuestion(
		data: TDataDeleteQuestion,
	): CancelablePromise<Message> {
		const { id, questionGroupId } = data;
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{id}",
			path: {
				question_group_id: questionGroupId,
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Answers
	 * Retrieve questions.
	 * @returns AnswerPublic Successful Response
	 * @throws ApiError
	 */
	public static readAnswers(
		data: TDataReadAnswers,
	): CancelablePromise<Array<AnswerPublic>> {
		const { questionGroupId, questionId } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{question_id}/answers/",
			path: {
				question_group_id: questionGroupId,
				question_id: questionId,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Create Answer
	 * Create new answer.
	 * @returns AnswerPublic Successful Response
	 * @throws ApiError
	 */
	public static createAnswer(
		data: TDataCreateAnswer,
	): CancelablePromise<AnswerPublic> {
		const { questionGroupId, questionId, requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{question_id}/answers/",
			path: {
				question_group_id: questionGroupId,
				question_id: questionId,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Answer
	 * Get answer by ID.
	 * @returns AnswerPublic Successful Response
	 * @throws ApiError
	 */
	public static readAnswer(
		data: TDataReadAnswer,
	): CancelablePromise<AnswerPublic> {
		const { id, questionGroupId, questionId } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{question_id}/answers/{id}",
			path: {
				question_group_id: questionGroupId,
				question_id: questionId,
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Answer
	 * Update an answer.
	 * @returns AnswerPublic Successful Response
	 * @throws ApiError
	 */
	public static updateAnswer(
		data: TDataUpdateAnswer,
	): CancelablePromise<AnswerPublic> {
		const { id, questionGroupId, questionId, requestBody } = data;
		return __request(OpenAPI, {
			method: "PUT",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{question_id}/answers/{id}",
			path: {
				question_group_id: questionGroupId,
				question_id: questionId,
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete Answer
	 * Delete an answer.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteAnswer(
		data: TDataDeleteAnswer,
	): CancelablePromise<Message> {
		const { id, questionGroupId, questionId } = data;
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/admin/question_groups/{question_group_id}/questions/{question_id}/answers/{id}",
			path: {
				question_group_id: questionGroupId,
				question_id: questionId,
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}
}

export type TDataRegisterUser = {
	requestBody: UserRegister;
};
export type TDataUpdateUserMe = {
	requestBody: UserUpdateMe;
};
export type TDataUpdatePasswordMe = {
	requestBody: UpdatePassword;
};

export class MeService {
	/**
	 * Read User Me
	 * Get current user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static readUserMe(): CancelablePromise<UserPublic> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/me/",
		});
	}

	/**
	 * Register User
	 * Create new user without the need to be logged in.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static registerUser(
		data: TDataRegisterUser,
	): CancelablePromise<UserPublic> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/me/",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Delete User Me
	 * Delete own user.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static deleteUserMe(): CancelablePromise<Message> {
		return __request(OpenAPI, {
			method: "DELETE",
			url: "/api/v1/me/",
		});
	}

	/**
	 * Update User Me
	 * Update own user.
	 * @returns UserPublic Successful Response
	 * @throws ApiError
	 */
	public static updateUserMe(
		data: TDataUpdateUserMe,
	): CancelablePromise<UserPublic> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "PATCH",
			url: "/api/v1/me/",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Update Password Me
	 * Update own password.
	 * @returns Message Successful Response
	 * @throws ApiError
	 */
	public static updatePasswordMe(
		data: TDataUpdatePasswordMe,
	): CancelablePromise<Message> {
		const { requestBody } = data;
		return __request(OpenAPI, {
			method: "PATCH",
			url: "/api/v1/me/password",
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}
}

export type TDataReadAvailableExams = {
	limit?: number;
	skip?: number;
};
export type TDataReadAvailableExam = {
	id: string;
};
export type TDataRegisterExam = {
	id: string;
	requestBody: CandidateExamRegister;
};
export type TDataReadRegisteredExam = {
	id: string;
};
export type TDataReadExamResult = {
	id: string;
};
export type TDataAddAnswer = {
	id: string;
};
export type TDataAddSpeakingRecord = {
	formData: Body_candidate_add_speaking_record;
	id: string;
};
export type TDataSubmitAnswer = {
	id: string;
	requestBody: ExamSubmit;
};

export class CandidateService {
	/**
	 * Read Available Exams
	 * Retrieve exams.
	 * @returns ExamsReadonly Successful Response
	 * @throws ApiError
	 */
	public static readAvailableExams(
		data: TDataReadAvailableExams = {},
	): CancelablePromise<ExamsReadonly> {
		const { limit = 100, skip = 0 } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/exams/",
			query: {
				skip,
				limit,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Available Exam
	 * Get exam by ID.
	 * @returns ExamReadonly Successful Response
	 * @throws ApiError
	 */
	public static readAvailableExam(
		data: TDataReadAvailableExam,
	): CancelablePromise<ExamReadonly> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/exams/{id}",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Register Exam
	 * Register for an exam.
	 * @returns RegisteredExamPublic Successful Response
	 * @throws ApiError
	 */
	public static registerExam(
		data: TDataRegisterExam,
	): CancelablePromise<Array<RegisteredExamPublic>> {
		const { id, requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/exams/{id}/register",
			path: {
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Registered Exams
	 * Retrieve exams.
	 * @returns RegisteredExamsPublic Successful Response
	 * @throws ApiError
	 */
	public static readRegisteredExams(): CancelablePromise<RegisteredExamsPublic> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/registered_exams/",
		});
	}

	/**
	 * Read Registered Exam
	 * Get exam by ID.
	 * @returns RegisteredExamPublic Successful Response
	 * @throws ApiError
	 */
	public static readRegisteredExam(
		data: TDataReadRegisteredExam,
	): CancelablePromise<RegisteredExamPublic> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/registered_exams/{id}",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Read Exam Result
	 * Get exam result
	 * @returns ExamFinished Successful Response
	 * @throws ApiError
	 */
	public static readExamResult(
		data: TDataReadExamResult,
	): CancelablePromise<ExamFinished> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "GET",
			url: "/api/v1/registered_exams/{id}/result",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Add Answer
	 * Add an answer.
	 * @returns RegisteredExamPublic Successful Response
	 * @throws ApiError
	 */
	public static addAnswer(
		data: TDataAddAnswer,
	): CancelablePromise<RegisteredExamPublic> {
		const { id } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/registered_exams/{id}/answers",
			path: {
				id,
			},
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Add Speaking Record
	 * @returns RegisteredExamPublic Successful Response
	 * @throws ApiError
	 */
	public static addSpeakingRecord(
		data: TDataAddSpeakingRecord,
	): CancelablePromise<RegisteredExamPublic> {
		const { formData, id } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/registered_exams/{id}/essays",
			path: {
				id,
			},
			formData: formData,
			mediaType: "multipart/form-data",
			errors: {
				422: `Validation Error`,
			},
		});
	}

	/**
	 * Submit Answer
	 * Submit questions' answers of a skill.
	 * @returns ExamReadonly Successful Response
	 * @throws ApiError
	 */
	public static submitAnswer(
		data: TDataSubmitAnswer,
	): CancelablePromise<ExamReadonly> {
		const { id, requestBody } = data;
		return __request(OpenAPI, {
			method: "POST",
			url: "/api/v1/registered_exams/{id}/submit",
			path: {
				id,
			},
			body: requestBody,
			mediaType: "application/json",
			errors: {
				422: `Validation Error`,
			},
		});
	}
}
