import Repository from "./repo.js";

class Quiz extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();
		const records = await this.getAll();
		records.push(attrs);

		await this.writeAll(records);

		return attrs;
	}
}

export default new Quiz("quizes.json");
