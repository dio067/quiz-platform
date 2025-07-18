import layout from "./layout.js";
import helpers from "../helpers.js";
export default ({ req, errors }) => {
	return layout(`
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
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
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                <p class="help is-danger">${helpers.getError(
									errors,
									"passwordConfirmation"
								)}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/admin/signin">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `);
};
