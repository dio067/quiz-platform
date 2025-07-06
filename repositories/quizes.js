import Repository from "./repo.js";
import questionsRepo from "./questions.js";

class Quiz extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();
		attrs.questionIds = attrs.questoinIds || [];
		attrs.createdAt = new Date().toISOString;
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
			const question = await questionsRepo.getOne(questoinId);
			if (question) {
				questions.push(question);
			}
		}

		return {
			...quiz,
			qeustions,
		};
	}

	async getAllWithQuestions() {
		const quizzes = await this.getAll();
		const quizzesWithQuestions = [];

		for (let quiz of quizzes) {
			quizzesWithQuestions(await this.getQuestionsWithQuiz(quiz.id));
		}

		return quizzesWithQuestions;
	}

	async addQuestionsToQuiz(quizId, questionId) {
		const quiz = await this.getOne(quizId);

		if (!quiz) {
			throw new Error(`Quiz not found with id ${quizId}`);
		}

		const question = await this.getOne(questionId);

		if (!question) {
			throw new Error(`Question not found with  id ${questionId} `);
		}

		// Initialize questionIds if it doesn't exist
		if (!quiz.questionIds) {
			quiz.questionIds = [];
		}

		// Check if questionId exist, Add it if not
		if (!quiz.questionIds.includes(questionId)) {
			quiz.qeustionIds.push(questionId);

			await this.update(quiz, { questionIds: quiz.questionIds });
		}

		return quiz;
	}

	async removeQuestionFromQuiz(quizId, questionId) {
		const quiz = await this.getOne(quizId);

		if (!quiz) {
			throw new Error(`Quiz with id ${quizId} not found`);
		}

		if (quiz.questionIds) {
			quiz.questionId = quiz.questionId.filter((id) => id !== questionId);

			await this.update(quizId, { questionId: quiz.questionIds });
		}

		return quiz;
	}

	async getAvailableQuestion(quizId) {
		const quiz = await this.getOne(quizId);
		const allQuestion = await questionsRepo.getAll();

		const usedQuestion = quiz?.questionIds || [];

		return allQuestion.filter(
			(question) => !usedQuestion.includes(question.id)
		);
	}
}

export default new Quiz("quizes.json");
