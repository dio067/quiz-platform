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
	}
}

export default new Quiz("quizes.json");
