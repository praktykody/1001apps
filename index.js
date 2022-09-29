const fs = require("fs");

let content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./style/style.css">
</head>
<body>
  <main>
    <h1> Apps xd</h1>
    <section class='ranking'>
          <h2>RANKING</h2>
          <ol>
            <li>
              <a href="https://VRiabko.github.io"> 1500 Varja </a>
            </li>
            <li>
              <a href="https://szczesniakk.github.io">1300 Karolina Sz</a>
            </li>
            <li>
              <a href="https://izabelakatarzyna.github.io">1000 Izabela</a>
            </li>
            <li>
              <a href="https://kmikonowicz.github.io">800 Karolina M</a>
            </li>
            <li>
              <a href="https://monikabudzinska.github.io">600 Monika</a>
            </li>
            <li>
              <a href="https://kz80.github.io">100 Kasia</a>
            </li>
            <li>
              <a href="https://BBierna.github.io">25 Bartek</a>
            </li>
          </ol>


        </section>




    <section class='projects'>
`;
const apps = fs.readdirSync(__dirname + "/apps");
apps.forEach( app => {
  content += `<ul>
    <h2> ${app} </h2>`;
  const names = fs.readdirSync(__dirname + "/apps/" + app)
  names.forEach( n => {
    content += ` <li>
      <a href="./apps/${app}/${n}" > ${ n } </a>
    </li> `
  })
  content += `</ul>`
});

content += `
    </section>
  </main>
</body>
</html>`;

fs.writeFileSync(__dirname + "/index.html", content);