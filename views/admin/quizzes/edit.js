import layout from "../layout.js";
import helpers from "../../helpers.js";

export default ({ quiz, errors }) => {
	return layout`<div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Quiz</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
								quiz.title
							}" class="input" placeholder="Title" name="title">
              <p class="help is-danger">${helpers.getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">discription</label>
              <input value="${
								product.price
							}" class="input" placeholder="discription" name="discription">
              <p class="help is-danger">${helpers.getError(
								errors,
								"discription"
							)}</p>
            </div>
        
            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `;
};
