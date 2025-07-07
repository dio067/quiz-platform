import layout from "../layout.js";
import helpers from "../../helpers.js";

export default ({ quiz, availableQuestions, errors }) => {
	const currentQuestions = quiz.questions || [];
	const available = availableQuestions || [];

	return layout(`
		<div class="container">
			<h1 class="title">Manage Questions for: ${quiz.title}</h1>
			
			<div class="columns">
				<div class="column is-half">
					<h2 class="subtitle">Current Questions</h2>
					${
						currentQuestions.length === 0
							? '<p class="has-text-grey">No questions added yet.</p>'
							: currentQuestions
									.map(
										(question, index) => `
							<div class="box">
								<h4 class="title is-6">${index + 1}. ${question.questionText}</h4>
								<ul>
									${question.options
										.map(
											(option, optIndex) => `
										<li class="${
											optIndex === question.correctAnswer
												? "has-text-success has-text-weight-bold"
												: ""
										}">
											${option} ${optIndex === question.correctAnswer ? "✓" : ""}
										</li>
									`
										)
										.join("")}
								</ul>
								<form action="/admin/quizzes/${quiz.id}/questions/${
											question.id
										}/remove" method="POST" style="display: inline;">
									<button class="button is-small is-danger" type="submit">Remove</button>
								</form>
							</div>
						`
									)
									.join("")
					}
				</div>
				
				<div class="column is-half">
					<h2 class="subtitle">Add New Question</h2>
					<form method="POST" action="/admin/quizzes/${quiz.id}/questions/new">
						<div class="field">
							<label class="label">Question Text</label>
							<input class="input" placeholder="Enter question" name="questionText">
							<p class="help is-danger">${helpers.getError(errors, "questionText")}</p>
						</div>
						
						<div class="field">
							<label class="label">Options</label>
							<input class="input" placeholder="Option 1" name="options" style="margin-bottom: 10px;">
							<input class="input" placeholder="Option 2" name="options" style="margin-bottom: 10px;">
							<input class="input" placeholder="Option 3" name="options" style="margin-bottom: 10px;">
							<input class="input" placeholder="Option 4" name="options">
							<p class="help is-danger">${helpers.getError(errors, "options")}</p>
						</div>
						
						<div class="field">
							<label class="label">Correct Answer</label>
							<div class="select">
								<select name="correctAnswer">
									<option value="0">Option 1</option>
									<option value="1">Option 2</option>
									<option value="2">Option 3</option>
									<option value="3">Option 4</option>
								</select>
							</div>
							<p class="help is-danger">${helpers.getError(errors, "correctAnswer")}</p>
						</div>
						
						<button class="button is-primary" type="submit">Add Question</button>
					</form>
					
					${
						available.length > 0
							? `
						<hr>
						<h2 class="subtitle">Available Questions</h2>
						${available
							.map(
								(question) => `
							<div class="box">
								<p>${question.questionText}</p>
								<form action="/admin/quizzes/${quiz.id}/questions/${question.id}/add" method="POST">
									<button class="button is-small is-info" type="submit">Add to Quiz</button>
								</form>
							</div>
						`
							)
							.join("")}
					`
							: ""
					}
				</div>
			</div>
			
			<a href="/admin/quizzes" class="button">Back to Quizzes</a>
		</div>
	`);
};
