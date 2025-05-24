import util from "util";
import crypto from "crypto";
import Repository from "./repo.js";

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
	async comparePassword(saved, supplied) {
		const [hashed, salt] = saved.split(".");
		const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

		return hashedSuppliedBuffer.toString("hex") === hashed;
	}
	async create(attrs) {
		attrs.id = this.randomId();
		const records = await this.getAll();
		const record = { ...attrs };

		records.push(record);
		await this.writeAll(records);
	}
}

export default new UsersRepository("users.json");
