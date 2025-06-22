import Repository from "./repo.js";

class Quiz extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();
	}
}

export default new Quiz("quizes.json");
