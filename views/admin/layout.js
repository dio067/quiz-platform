export default (content) => {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz Platform</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="icon" type="image/x-icon" href="/images/img.ico">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      </head>

      <body class="admin">
        <header>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div class="navbar-brand">
                <a href="/admin/quizzes">
                  <h3 class="title">Admin Panel</h3>
                </a>
              </div>
              <div class="navbar-menu">
                <div class="navbar-start">
                  <div class="navbar-item">
                    <a href="/admin/quizzes"><i class="fa fa-star"></i> Quizzes</a>
                  </div>
                </div>
                <div class="navbar-end">
                  <div class="navbar-item">
                    <a href="/admin/signout">Sign Out</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>
  `;
};
