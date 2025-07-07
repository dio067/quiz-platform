import helpers from "../../helpers.js";
import layout from "./layout.js";

export default ({ errors }) => {
	return layout(` 
    <div class="container">
        <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Create New Quiz</h1>

          <form method="POST">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Quiz Title" name="title">
              <p class="help is-danger">${helpers.getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Description</label>
              <textarea class="textarea" placeholder="Quiz Discription" name="description"></textarea>
              <p class="help is-danger">${helpers.getError(
								errors,
								"description"
							)}</p>
            </div>
            
            <div class="field">
            <button class="button is-primary" type="submit">Create Quiz</button>
            <a href="/admin/quizzes" class="button is-primary">Cancel</a>
            </div>
          </form>
        </div>
      </div>
      </div>
    `);
};
