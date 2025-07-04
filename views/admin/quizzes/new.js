import helpers from "../../helpers.js";
import layout from "./layout.js";

export default ({ quizzes, errors }) => {
	return layout(` 
        <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Quiz</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="title">
              <p class="help is-danger">${helpers.getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Discription</label>
              <input class="input" placeholder="Discription" name="price">
              <p class="help is-danger">${helpers.getError(
								errors,
								"discription"
							)}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `);
};
