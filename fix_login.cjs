const fs = require('fs');

const file = 'src/components/auth/LoginPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    "const loginEmail = email || 'student@test.com';",
    "const loginEmail = demoEmail || 'student@test.com';"
);

content = content.replace(
    "const loginPass = password || 'password';",
    "const loginPass = demoPass || 'password';"
);

content = content.replace(
    "const result = await login(loginEmail, loginPass, finalRole);",
    "const result = await login(loginEmail, loginPass, role);"
);

fs.writeFileSync(file, content);
console.log('Fixed LoginPage.jsx');
