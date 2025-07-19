import layout from '../layout.js';

export default ({ quizzes }) => {
    const renderedQuizzes = quizzes
        .map((quiz) => {
            return `
				<tr>
					<td>${quiz.title}</td>
					<td>${quiz.description || 'No description'}</td>
					<td>${quiz.questionIds ? quiz.questionIds.length : 0}</td>
					<td>
						<a href="/admin/quizzes/${
                            quiz.id
                        }/edit" class="button is-small is-info">Edit</a>
					</td>
					<td>
						<a href="/admin/quizzes/${
                            quiz.id
                        }/questions" class="button is-small is-primary">Questions</a>
					</td>
					<td>
						<form action="/admin/quizzes/${
                            quiz.id
                        }/delete" method="POST" style="display: inline;">
							<button class="button is-small is-danger" type="submit" onclick="return confirm('Are you sure?')">Delete</button>
						</form>
					</td>
				</tr>
			`;
        })
        .join('');

    return layout(`
		<div class="container">
			<div class="level">
				<div class="level-left">
					<h1 class="title">Manage Quizzes</h1>
				</div>
				<div class="level-right">
					<a href="/admin/quizzes/new" class="button is-primary">Create New Quiz</a>
				</div>
			</div>
			
			<table class="table is-fullwidth">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Questions</th>
						<th>Edit</th>
						<th>Manage Questions</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					${renderedQuizzes}
				</tbody>
			</table>
		</div>
	`);
};
