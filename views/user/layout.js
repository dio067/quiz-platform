export default (content) => {
	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Quiz Platform</title>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
			<link rel="stylesheet" href="/css/main.css">
			<link rel="icon" type="image/x-icon" href="/images/img.ico">
		</head>
		<body>
			<!-- Navigation -->
			<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a class="navbar-item" href="/user/quizzes">
						<strong>Quiz Platform</strong>
					</a>
				</div>

				<div class="navbar-menu">
					<div class="navbar-start">
						<a class="navbar-item" href="/user/quizzes">
							Browse Quizzes
						</a>
					</div>

					<div class="navbar-end">
						<div class="navbar-item">
							<div class="buttons">
								<a class="button is-light" href="/signin">
									<strong>Sign In</strong>
								</a>
								<a class="button is-info" href="/signup">
									Sign Up
								</a>
								<a class="button is-light" href="/signout">
									Sign Out
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<!-- Main Content -->
			<main>
				${content}
			</main>

			<!-- Footer -->
			<footer class="footer">
				<div class="content has-text-centered">
					<p>
						<strong>Quiz Platform</strong> - Test your knowledge with our collection of quizzes.
					</p>
					<p>
						© ${new Date().getFullYear()} Quiz Platform. All rights reserved.
					</p>
				</div>
			</footer>
		</body>
		</html>
	`;
};
