import layout from "./layout.js";
import helpers from "../helpers.js";
export default ({ req, errors }) => {
	return layout(`
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign in</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${helpers.getError(
									errors,
									"email"
								)}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${helpers.getError(
									errors,
									"password"
								)}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/admin/signup">Need an account? Sign Up</a>
          </div>
        </div>
      </div>
    `);
};
