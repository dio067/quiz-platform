import layout from "../layout.js";

export default ({ quizzes }) => {
	return layout(`
		<div class="container">
			<div class="hero is-primary">
				<div class="hero-body">
					<h1 class="title">Available Quizzes</h1>
					<p class="subtitle">Test your knowledge with our collection of quizzes</p>
				</div>
			</div>
			
			<section class="section">
				<div class="columns is-multiline">
					${
						quizzes.length === 0
							? '<div class="column is-full"><p class="has-text-grey has-text-centered">No quizzes available at the moment.</p></div>'
							: quizzes
									.map(
										(quiz) => `
							<div class="column is-one-third">
								<div class="card">
									<div class="card-content">
										<h3 class="title is-4">${quiz.title}</h3>
										<p class="content">${quiz.description || "No description available"}</p>
										<p class="has-text-grey">Questions: ${
											quiz.questions ? quiz.questions.length : 0
										}</p>
									</div>
									<footer class="card-footer">
										${
											quiz.questions && quiz.questions.length > 0
												? `<a href="/user/quizzes/${quiz.id}/take" class="card-footer-item button is-primary">Take Quiz</a>`
												: `<span class="card-footer-item has-text-grey">No questions available</span>`
										}
									</footer>
								</div>
							</div>
						`
									)
									.join("")
					}
				</div>
			</section>
		</div>
	`);
};
