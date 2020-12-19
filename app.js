const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//the first role entered is assumed to be a manager
let role = "Manager";
//this array will store our employee objects
const employees = [];

//general questions
const empQuestions = [
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the employee's id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email",
  },
  //Start with manager specific question. We replace with a new question for each role
  {
    type: "input",
    message: "What is the employee's office number?",
    name: "officeNumber",
  },
  {
    type: "list",
    message: "Which type of team member would you like to add next?",
    choices: ["Engineer", "Intern", "I don't want more team members"],
    name: "nextRole",
  },
];

//role specific questions
function askRoleSpecificQuestion(theNextRole) {
  switch (theNextRole) {
    case "Engineer":
      empQuestions[3] = {
        type: "input",
        message: "What is the employee's github id?",
        name: "github",
      };
      break;

    case "Intern":
      empQuestions[3] = {
        type: "input",
        message: "What is the employee's school?",
        name: "school",
      };
      break;
  }
}

function createEmployee(data) {
  switch (data.role) {
    case "Manager":
      employee = new Manager(data.name, data.id, data.email, data.officeNumber);
      break;
    case "Engineer":
      employee = new Engineer(data.name, data.id, data.email, data.github);
      break;
    case "Intern":
      employee = new Intern(data.name, data.id, data.email, data.school);
      break;
  }
}

//start inquirer
function start() {
  inquirer
    //for the first run, we know the role is manager. Subsequent runs
    //replace this question
    .prompt(empQuestions)

    .then((data) => {
      //we can assume the first employee will be the manager and we set it in the object
      data["role"] = role;

      askRoleSpecificQuestion(data.nextRole);
      createEmployee(data);
      employees.push(employee);
      if (data.nextRole === `I don't want more team members`) {
        const renderStuff = render(employees);
        fs.writeFile("./output/team.html", renderStuff, "utf8", (err) =>
          err
            ? console.log(err)
            : console.log("You have successfully generated a new team site!")
        );
      } else {
        //we asked for the next role in inquirer and set it for the next render
        role = data.nextRole;
        //we start the process over again for the next employee
        start();
      }
    });
}

console.log("Create your team! \n Please enter your information first.");
start();
