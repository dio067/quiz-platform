import layout from "../layout.js";

export default ({ quiz, results, score, totalQuestions, percentage }) => {
	return layout(`
		<div class="container">
			<div class="section">
				<h1 class="title">Quiz Results: ${quiz.title}</h1>
				
				<div class="notification ${
					percentage >= 70
						? "is-success"
						: percentage >= 50
						? "is-warning"
						: "is-danger"
				}">
					<h2 class="subtitle">
						Your Score: ${score}/${totalQuestions} (${percentage}%)
					</h2>
					<p>
						${
							percentage >= 70
								? "Excellent work!"
								: percentage >= 50
								? "Good job!"
								: "Keep practicing!"
						}
					</p>
				</div>
				
				<h3 class="title is-4">Question Review</h3>
				
				${results
					.map(
						(result, index) => `
					<div class="box">
						<h4 class="title is-6">${index + 1}. ${result.question}</h4>
						<div class="columns">
							<div class="column">
								<p><strong>Your Answer:</strong> 
									<span class="${result.isCorrect ? "has-text-success" : "has-text-danger"}">
										${
											result.userAnswer !== undefined
												? result.options[result.userAnswer]
												: "No answer"
										}
										${result.isCorrect ? " ✓" : " ✗"}
									</span>
								</p>
								${
									!result.isCorrect
										? `
									<p><strong>Correct Answer:</strong> 
										<span class="has-text-success">
											${result.options[result.correctAnswer]} ✓
										</span>
									</p>
								`
										: ""
								}
							</div>
						</div>
					</div>
				`
					)
					.join("")}
				
				<div class="field">
					<a href="/user/quizzes" class="button is-primary">Back to Quizzes</a>
					<a href="/user/quizzes/${quiz.id}/take" class="button">Retake Quiz</a>
				</div>
			</div>
		</div>
	`);
};
