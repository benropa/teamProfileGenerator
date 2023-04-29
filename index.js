// ALl requirements
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const Manager = require("./library/Manager");
const Engineer = require("./library/Engineer");
const Intern = require("./library/Intern");
const html = require("./src/htmlGen");
const validator = require("email-validator");

// Async functions
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

let teamArray = [];
let teamString = ``;

console.clear();
console.log("Ben Ropa's Team Profile Generator")

// To run application
async function main() {
    try {
        await prompt()

        for (let i = 0; i < teamArray.length; i++) {
            teamString = teamString + html.generateCard(teamArray[i]);
        }

        let genHtml = html.generateHTML(teamString)

        console.clear();
        console.log("Creating index.html file...");

        writeFileAsync("./src/index.html", genHtml);

        console.clear();
        console.log("index.html created successfully");

    } catch (err) {
        return console.log(err);
    }
}

// Inquirer prompts
async function prompt() {
    let responseDone = "";

    do {
        try {
            console.log("___________________________________");
            let response = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the employee's name?",
                    validate: function validateName(name) {
                        return name !== "";
                    }
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is the employee's ID?: ",
                    validate: function validateName(name) {
                        return name !== "";
                    }
                },
                {
                    type: "input",
                    name: "email",
                    message: "Enter employee's email address: ",
                    // validating using email
                    validate: function validateName(name) {
                        return validator.validate(name);
                    }
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is this employee's role: ",
                    choices: [
                        "Engineer",
                        "Intern",
                        "Manager"
                    ]
                }
            ]);

            let response2 = ""

            if (response.role === "Engineer") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "x",
                    message: "What is this employee's github username?: ",
                    validate: function validateName(name){
                        return name !== "";
                    },
                }, ]);

                // add to the team array
                const engineer = new Engineer(response.name, response.id, response.email, response2.x);
                teamArray.push(engineer);
            
            } else if (response.role === "Manager") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "x",
                    message: "What is the manager's office number?: ",
                    validate: function validateName(name){
                        return name !== "";
                    },
                }, ]);

                // add to the team array
                const manager = new Manager(response.name, response.id, response.email, response2.x);
                teamArray.push(manager);

            } else if (response.role === "Intern") {
                response2 = await inquirer.prompt([{
                    type: "input",
                    name: "x",
                    message: "What school does the employee attend: ",
                    validate: function validateName(name){
                        return name !== "";
                    },
                }, ]);

                // add to the team array
                const intern = new Intern(response.name, response.id, response.email, response2.x);
                teamArray.push(intern);
            }
        } catch (err) {
            return console.log(err);
        }
        responseDone = await inquirer.prompt([{
            type: "list",
            name: "finish",
            message: "Would you like to continue?: ",
            choices: [
                "Yes",
                "No"
            ]
        },]);
    } while (responseDone.finish === "Yes");
}

main();