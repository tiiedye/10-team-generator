// required
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// paths to put "team.html" into "output" folder when the html file is generated later in the code
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// calls back to the htmlRenderer.js in the lib file. this will be used to render the html in the templates folder
const render = require("./lib/htmlRenderer");

// *** INSTRUCTIONS ***
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// *** /INSTRUCTIONS ***

// empty arrays for team members and team id numbers. information gathered from the inquirer.prompt will be pushed to the arrays
const members = [];
const ids = [];

// this function runs the application, and includes the inquirer.prompt content, as well as creating the html file.
function appMenu() {

    // creates manager profile
    function createManager() {
        console.log("Please build your team");
        inquirer
            .prompt ([
                {
                    type: "input",
                    name: "managerName",
                    message: "What is your Manager's name?",
                    validate: answer => {
                        if (!answer) {
                            return "Please enter at least one character.";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "managerId",
                    message: "What is your Manager's id?",
                    validate: answer => {
                        if (answer > 0) {
                            return true;
                        } else {
                            return "Please enter a number greater than zero.";
                        }
                    }
                },
                {
                    type: "input",
                    name: "managerEmail",
                    message: "What is your Manager's email address?",
                    validate: answer => {
                        if (!answer) {
                            return "Please enter a valid email address.";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "managerOfficeNumber",
                    message: "What is your Manager's office number?",
                    validate: answer => {
                        if (answer > 0) {
                            return true;
                        } else {
                            return "Please enter a number greater than zero.";
                        }
                    }
                }
            ]).then(answers => {
                const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
                members.push(manager);
                ids.push(answers.managerId);
                createTeam();
            });
    }

    // begins to create team-members profiles
    function createTeam() {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "memberChoice",
                    message: "Which type of team member would you like to add?",
                    choices: [
                        "Engineer",
                        "Intern",
                        "I don't want ot add any more team members."
                    ]
                }
            ]).then(userChoice => {
                switch(userChoice.memberChoice) {
                    case "Engineer":
                        addEngineer();
                        break;
                    case "Intern":
                        addIntern();
                        break;
                    default:
                        buildTeam();
                }
            });
    }

    // creates engineer profile if adding engineer is chosen
    function addEngineer() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is your Engineer's name?",
                    validate: answer => {
                        if (!answer) {
                            return "PLease enter at least one character.";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is your Engineer's Id?",
                    validate: answer => {
                        if (ids.includes(answer)) {
                            return "This Id is already taken, please enter a different one.";
                        } else if (answer > 0) {
                            return true;
                        } else {
                            return "Please enter a number greater than 0.";
                        }
                    }
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is your Engineer's email address?",
                    validate: answer => {
                        if (!answer) {
                            return "PLease enter a valid email address.";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "engineerGithub",
                    message: "What is your Engineer's GitHub username?",
                    validate: answer => {
                        if (!answer) {
                            return "Please enter at least one character.";
                        } else {
                            return true;
                        }
                    }
                }
            ]).then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                members.push(engineer);
                ids.push(answers.engineerId);
                createTeam();
            })
    }

    // adds intern profile if add intern is chosen
    function addIntern() {
        inquirer
            .prompt ([
                {
                    type: "input",
                    name: "internName",
                    message: "What is  your Intern's name?",
                    validate: answer => {
                        if (!answer) {
                            return "Please enter at least one character.";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "internId",
                    message: "Please enter your Intern's Id.",
                    validate: answer => {
                        if (ids.includes(answer)) {
                            return "This Id is already taken, please enter a different one.";
                        } else if (answer > 0) {
                            return true;
                        } else {
                            return "Please enter a number greater than zero.";
                        }
                    }
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is your Intern's email address?",
                    validate: answer => {
                        if (!answer) {
                            return "Please enter a valid email address.";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "internSchool",
                    message: "What is your Instern's school?",
                    validate: answer => {
                        if (!answer) {
                            return "Please enter at least one character.";
                        } else {
                            return true;
                        }
                    }
                }
            ]).then(answers => {
                const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                members.push(intern);
                ids.push(answers.internId);
                createTeam();
            });
    }

    // *** INTSRUCTIONS ***
    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.
    // *** /INTSRUCTIONS ***

    // writes the team.html file using the information gathered and puts that file in the "output" folder
    function buildTeam() {
        fs.writeFileSync(outputPath, render(members), "utf-8");
    }

    createManager();
}

appMenu();



// *** MORE INSTRUCTIONS ***
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
