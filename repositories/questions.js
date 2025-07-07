import Repository from "./repo.js";

class Questions extends Repository {
	async create(attrs) {
		attrs.id = this.randomId();
		const records = await this.getAll();
		records.push(attrs);

		await this.writeAll(records);

		return attrs;
	}
}

export default new Questions("questions.json");
