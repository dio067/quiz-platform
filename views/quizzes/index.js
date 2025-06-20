import layout from "./layout.js";

export default ({ quizzes, user }) => {
	const renderedQuizzes = quizzes
		.map((quiz) => {
			return `
      <div class="column is-one-third">
        <div class="card product-card">
          <div class="card-content">
            <h3 class="title is-4">${quiz.title}</h3>
            <p class="subtitle is-6">${
							quiz.description || "No description available"
						}</p>
            <p>Questions: ${quiz.questions ? quiz.questions.length : 0}</p>
          </div>
          <footer class="card-footer">
            <a href="/quizzes/${quiz.id}" class="card-footer-item">Take Quiz</a>
            ${
							user && user.id === quiz.creator
								? `
              <a href="/quizzes/${quiz.id}/edit" class="card-footer-item">Edit</a>
              <form action="/quizzes/${quiz.id}" method="POST" class="card-footer-item">
                <input type="hidden" name="_method" value="DELETE">
                <button class="button is-text" type="submit">Delete</button>
              </form>
            `
								: ""
						}
          </footer>
        </div>
      </div>
    `;
		})
		.join("\n");

	return layout({
		content: `
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
              <div class="level">
                <h2 class="title">Available Quizzes</h2>
                ${
									user
										? `<a href="/quizzes/new" class="button is-primary">Create New Quiz</a>`
										: ""
								}
              </div>
              <div class="columns is-multiline">
                ${
									quizzes.length > 0
										? renderedQuizzes
										: `
                  <div class="column">
                    <div class="notification is-info">
                      No quizzes available yet.
                      ${
												user
													? '<a href="/quizzes/new">Create the first one!</a>'
													: '<a href="/login">Login to create one</a>'
											}
                    </div>
                  </div>
                `
								}
              </div>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </section>
    `,
	});
};
