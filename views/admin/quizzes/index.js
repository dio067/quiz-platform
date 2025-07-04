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
              <a href="/quizzes/${
								quiz.id
							}/edit" class="card-footer-item">Edit</a>
              <form action="/quizzes/${
								quiz.id
							}" method="POST" class="card-footer-item">
                <input type="hidden" name="_method" value="DELETE">
                <button class="button is-text" type="submit">Delete</button>
              </form>
          </footer>
        </div>
      </div>
    `;
		})
		.join("\n");

	return layout(
		{
			content: `
          <div class="control">
        <h1 class="subtitle">Quizzes</h1>  
        <a href="/admin/quizzes/new" class="button is-primary">New Quizes</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedQuizzes}
        </tbody>
      </table>
    `,
		},
		user
	);
};
