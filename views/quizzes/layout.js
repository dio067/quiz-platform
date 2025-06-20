export default ({ content }) => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quiz Platform</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <strong>Quiz Platform</strong>
            </a>
          </div>

          <div class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" href="/quizzes">Browse Quizzes</a>
              ${
								user
									? `
                <a class="navbar-item" href="/quizzes/new">Create Quiz</a>
                <a class="navbar-item" href="/profile">Profile</a>
                <a class="navbar-item" href="/logout">Logout</a>
              `
									: `
                <a class="navbar-item" href="/login">Login</a>
                <a class="navbar-item" href="/register">Register</a>
              `
							}
            </div>
          </div>
        </div>
      </nav>

      ${content}

      <footer class="footer">
        <div class="content has-text-centered">
          <p>© ${new Date().getFullYear()} Quiz Platform</p>
        </div>
      </footer>
    </body>
    </html>
  `;
};
