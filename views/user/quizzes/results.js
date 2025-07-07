import layout from "../layout.js";

export default ({ quiz }) => {
	return layout(`
		<div class="container">
			<div class="section">
				<h1 class="title">${quiz.title}</h1>
				<p class="subtitle">${quiz.description || ""}</p>
				
				<form method="POST" action="/user/quizzes/${quiz.id}/submit">
					${quiz.questions
						.map(
							(question, index) => `
						<div class="box">
							<h4 class="title is-5">${index + 1}. ${question.questionText}</h4>
							<div class="field">
								${question.options
									.map(
										(option, optIndex) => `
									<label class="radio">
										<input type="radio" name="answers[${question.id}]" value="${optIndex}">
										${option}
									</label><br>
								`
									)
									.join("")}
							</div>
						</div>
					`
						)
						.join("")}
					
					<div class="field">
						<button class="button is-primary is-large" type="submit">Submit Quiz</button>
						<a href="/user/quizzes" class="button">Cancel</a>
					</div>
				</form>
			</div>
		</div>
	`);
};
