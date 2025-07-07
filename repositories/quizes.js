import Repository from "./repo.js";
import questionsRepo from "./questions.js";

class Quiz extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();
		attrs.questionIds = attrs.questionIds || [];
		attrs.createdAt = new Date().toISOString();
		const records = await this.getAll();
		records.push(attrs);

		await this.writeAll(records);
		return attrs;
	}

	async getQuestionsWithQuiz(quizId) {
		const quiz = await this.getOne(quizId);
		if (!quiz) {
			throw new Error("Quiz not found");
		}

		const questions = [];
		for (const questionId of quiz.questionIds || []) {
			const question = await questionsRepo.getOne(questionId);
			if (question) {
				questions.push(question);
			}
		}

		return {
			...quiz,
			questions,
		};
	}

	async getAllWithQuestions() {
		const quizzes = await this.getAll();
		const quizzesWithQuestions = [];

		for (let quiz of quizzes) {
			quizzesWithQuestions.push(await this.getQuestionsWithQuiz(quiz.id));
		}

		return quizzesWithQuestions;
	}

	async addQuestionsToQuiz(quizId, questionId) {
		const quiz = await this.getOne(quizId);
		if (!quiz) {
			throw new Error(`Quiz not found with id ${quizId}`);
		}

		const question = await questionsRepo.getOne(questionId);
		if (!question) {
			throw new Error(`Question not found with id ${questionId}`);
		}

		if (!quiz.questionIds) {
			quiz.questionIds = [];
		}

		if (!quiz.questionIds.includes(questionId)) {
			quiz.questionIds.push(questionId);
			await this.update(quizId, { questionIds: quiz.questionIds });
		}

		return quiz;
	}

	async removeQuestionFromQuiz(quizId, questionId) {
		const quiz = await this.getOne(quizId);
		if (!quiz) {
			throw new Error(`Quiz with id ${quizId} not found`);
		}

		if (quiz.questionIds) {
			quiz.questionIds = quiz.questionIds.filter((id) => id !== questionId);
			await this.update(quizId, { questionIds: quiz.questionIds });
		}

		return quiz;
	}

	async getAvailableQuestions(quizId) {
		const quiz = await this.getOne(quizId);
		const allQuestions = await questionsRepo.getAll();
		const usedQuestions = quiz?.questionIds || [];

		return allQuestions.filter(
			(question) => !usedQuestions.includes(question.id)
		);
	}
}

export default new Quiz("quizes.json");
