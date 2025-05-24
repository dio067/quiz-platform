import fs from "fs";
import crypto from "crypto";

export default class Repository {
	constructor(filename) {
		if (!filename) {
			throw new Error("Require a filename");
		}

		this.filename = filename;

		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, "[]");
		}
	}

	async getAll() {
		return JSON.parse(await fs.readFileSync(this.filename, "utf8")); // again
	}

	async writeAll(records) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(records, null, 2)
		);
	}

	randomId() {
		return crypto.randomBytes(4).toString("hex"); // again
	}

	async create(attrs) {
		attrs.id = this.randomId();
		const records = await this.getAll();
		const record = { ...attrs };

		records.push(record);
		await this.writeAll(records);
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find((record) => record.id === id);
	}

	async delete(id) {
		const records = await this.getAll();
		const filteredRecords = records.filter((record) => record.id !== id);
		await this.writeAll(filteredRecords);
	}

	async update(id, attrs) {
		const records = await this.getAll();
		const record = records.find((record) => record.id === id);

		if (!record) {
			throw new Error(`Record with the id ${id} not found`);
		}
		Object.assign(attrs, record);
		await this.writeAll(records);
	}

	async getOneBy(filters) {
		const records = await this.getAll();

		for (let record of records) {
			let found = true;
			for (let key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) {
				return record;
			}
		}
	}
}
