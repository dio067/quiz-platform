import layout from '../layout.js';

export default ({ quiz }) => {
    return layout(`
		<div class="container">
			<div class="section">
				<div class="box">
					<h1 class="title">${quiz.title || 'No Title Available'}</h1>
					<p class="subtitle">${quiz.description || 'No description available'}</p>
					
					<div class="content">
						<h4 class="title is-5">Quiz Information</h4>
						<ul>
							<li><strong>Total Questions:</strong> ${
                                quiz.questionIds ? quiz.questionIds.length : 0
                            }</li>
							<li><strong>Estimated Time:</strong> ${
                                quiz.questionIds
                                    ? Math.ceil(quiz.questionIds.length * 1.5)
                                    : 0
                            } minutes</li>
							<li><strong>Difficulty:</strong> ${
                                quiz.questionIds && quiz.questionIds.length > 10
                                    ? 'Advanced'
                                    : quiz.questionIds &&
                                      quiz.questionIds.length > 5
                                    ? 'Intermediate'
                                    : 'Beginner'
                            }</li>
						</ul>
					</div>
					
					<div class="field is-grouped">
						${
                            quiz.questionIds && quiz.questionIds.length > 0
                                ? `<a href="/user/quizzes/${quiz.id}/take" class="button is-primary">Take Quiz</a>`
                                : `<button class="button is-primary" disabled>No questions available</button>`
                        }
						<a href="/user/quizzes" class="button">Back to Quizzes</a>
					</div>
				</div>
			</div>
		</div>
	`);
};
