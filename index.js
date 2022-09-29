const fs = require("fs");
const apps = fs.readdirSync(__dirname + "/apps");

let content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <main>
    <h1> Apps xd</h1>
`;
apps.forEach( app => {
  content += `<h2> ${app} </h2>
  <ul>`;

  const names = fs.readdirSync(__dirname + "/apps/" + app)
  names.forEach( n => {
    content += ` <li>
      <a href="./apps/${app}/${n}" > ${ n } </a>
    </li> `
  })
  content += `</ul>`
});

content += `
  </main>
</body>
</html>`;

fs.writeFileSync(__dirname + "/index.html", content);