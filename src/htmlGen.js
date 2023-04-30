// Including Bootstrap and fontawesome
const generateHTML = function (teamString) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Team Profile</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
</style>
</head>
<body>
<div class="header">
   <h1 style="background-color: white; width: 30%; padding: 5px; border-radius: 3px;">My Team</h1>
</div>
</div>
<div class="container-body container-fluid">
   <div style="background-color: grey; width: 30%; padding: 5px; border-radius: 5px;">
        ${teamString} 
    </div>
</div>
<script src="https://kit.fontawesome.com/257de25400.js" crossorigin="anonymous"></script>  
</body>
</html>`

}
// create employee cards
const generateCard = function (arr) {
    
    // display role information
    let roleInfo;

    if (arr.title === "Manager") {
        roleInfo = `Office Number: ${arr.officeNumber}`
    } else if (arr.title === "Engineer") {
        roleInfo = `GitHub Username: <a href="https://github.com/${arr.github}" target="_blank">${arr.github}</a>`
    } else if (arr.title === "Intern") {
        roleInfo = `School: ${arr.school}`
    }

    return `
    
<div>
    <div>
        <div>
            <h3>${arr.name}</h3>
            <h4>${arr.title}</h4>
        </div>
        <div>
            <ul>
                <li>Employee ID: ${arr.id}</li>
                <li>Email: <a href="mailto:${arr.email}">${arr.email}</a></li>
                <li>${roleInfo}</i>
            </u>
        </div>
    </div>
  </div>
`
}

exports.generateHTML = generateHTML;
exports.generateCard = generateCard;