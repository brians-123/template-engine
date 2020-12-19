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
let role = "manager";

const employees = [];
//Ask for manager info
// function askMgrQuestions (){

// }

// Name?
// Id?
// email?
// Role?
//   dependent on what's give, office, git, school
// Add another?

//add general questions
const genericQuestions = [
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
  {
    type: "list",
    message: "Which type of team member would you like to add next?",
    choices: ["Engineer", "Intern", "I don't want more team members"],
    name: "role",
  },
];

//role specific questions
function askRoleSpecificQuestion(theRole) {
  // var specificQuestion = {};
  switch (theRole) {
    case "Manager":
      console.log("it's a manager");
      // return (specificQuestion = {
      //   type: "input",
      //   message: "What is the employee's office number?",
      //   name: "officeNumber",
      // });
      break;

    case "Engineer":
      console.log("it's an engineer");
      // return (specificQuestion = {
      //   type: "input",
      //   message: "What is the employee's github id?",
      //   name: "github",
      // });
      break;

    case "Intern":
      console.log("it's an intern");
      // return (specificQuestion = {
      //   type: "input",
      //   message: "What is the employee's school?",
      //   name: "email",
      // });
      break;
  }
}

const mgrQuestions = [
  {
    type: "input",
    message: "What is the manager's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is manager's id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the manager's email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the manager's office number?",
    name: "officeNumber",
  },
  {
    type: "list",
    message: "Which type of team member would you like to add?",
    choices: ["Engineer", "Intern", "I don't want more team members"],
    name: "role",
  },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// function askEngQuestions (){

// }
const engQuestions = [
  {
    type: "name",
    message: "What is your engineer's name?",
    name: "name",
  },
  {
    type: "id",
    message: "What is engineer's id?",
    name: "id",
  },
  {
    type: "email",
    message: "What is your engineer's email?",
    name: "email",
  },
  {
    type: "role",
    message: "What is your engineer's github username?",
    name: "role",
  },
];

//intern questions
// function askInternQuestions (){

// }
//can i write a function inside the object for the last question? It seems like I can

const intQuestions = [
  {
    type: "name",
    message: "What is your intern's name?",
    name: "name",
  },
  {
    type: "id",
    message: "What is intern's id?",
    name: "id",
  },
  {
    type: "email",
    message: "What is your intern's email?",
    name: "email",
  },
  {
    type: "role",
    message: "What is your intern's school?",
    name: "role",
  },
];

//start inquirer
function start() {
  inquirer
    //for the first run, we know the role is manager
    //we will get the role for the next run, prior to this being run
    //save that in a variable that starts as manager
    .prompt(genericQuestions)

    .then((data) => {
      //we can assume the first employee will be the manager
      data["role"] = "manag123er";

      console.log(data);
      //use a switch case to determine the last question

      askRoleSpecificQuestion(data.role);

      if (data.role === `I don't want more team members`) {
        console.log(`this is where i'll insert the render function`);
      } else {
        console.log(`this is where i'll add start()`);
      }
      // employee = new Manager(data.name, data.id, data.email, data.officeNumber);
      // After the user has input all employees desired, call the `render` function (required
      // above) and pass in an array containing all employee objects; the `render` function will
      // generate and return a block of HTML including templated divs for each employee!
      // employees.push(employee);
      // const renderStuff = render(employees);
      // fs.writeFile("./output/team.html", renderStuff, "utf8", (err) =>
      // err
      // ? console.log(err)
      // : console.log("You have successfully generated a new team site!")
      // );
    });
}
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

console.log("enter your information first");
start();
