import chalk from "chalk";
import inquirer from "inquirer";
class Student {
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(chalk.bold.italic.magentaBright(`Balance of ${this.name} is ${this.balance}`));
    }
    payFee(amount) {
        this.balance -= amount;
        console.log(chalk.bold.italic.whiteBright(`$${amount} paid for ${this.name}`));
        console.log(chalk.bold.italic.redBright(`Remaining Balance is : $${this.balance}`));
    }
    studentStatus() {
        console.log(chalk.bold.italic.redBright(`ID:${this.id} `));
        console.log(chalk.bold.italic.yellowBright(`Name:${this.name} `));
        console.log(chalk.bold.italic.greenBright(`Courses:${this.courses} `));
        console.log(chalk.bold.italic.blueBright(`Balance:${this.balance} `));
    }
}
Student.counter = 100;
class StudentMangement {
    constructor() {
        this.students = [];
    }
    addNewStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bold.italic.cyanBright(`Student: ${name} added successfully!\n Student ID: ${student.id}`));
    }
    enrollStudent(student_id, course) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.bold.italic.blueBright(`${student.name} enrolled in ${course} successfully!`));
        }
    }
    viewStudentBalance(student_id) {
        let student = this.findStudent(student_id);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.bold.italic.redBright(`Given ID does not exist!\n Please enter valid ID`));
        }
    }
    payFees(student_id, amount) {
        let student = this.findStudent(student_id);
        if (student) {
            student.payFee(amount);
        }
        else {
            console.log(chalk.bold.italic.redBright(`Given ID does not exist!\n Please enter valid ID`));
        }
    }
    showStudentStatus(student_id) {
        let student = this.findStudent(student_id);
        if (student) {
            student.studentStatus();
        }
    }
    findStudent(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log(chalk.bold.redBright("WELCOME TO - MY STUDENT MANAGEMENT SYSTEM"));
    console.log("-".repeat(50));
    let studentMangement = new StudentMangement();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option:",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "Pay Fees",
                    "View Student Balance",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    { name: "name",
                        type: "input",
                        message: "Enter Student Name:"
                    }
                ]);
                studentMangement.addNewStudent(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID:"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name:",
                    }
                ]);
                studentMangement.enrollStudent(courseInput.student_id, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID:"
                    }
                ]);
                studentMangement.viewStudentBalance(balanceInput.student_id);
                break;
            case "Pay Fees":
                let feeInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID:"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount you want to pay:"
                    }
                ]);
                studentMangement.payFees(feeInput.student_id, feeInput.amount);
                break;
            case "Show Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID:"
                    }
                ]);
                studentMangement.showStudentStatus(statusInput.student_id);
                break;
            case "Exit":
                console.log(chalk.bold.italic.blueBright("EXITING....."));
                process.exit();
        }
    }
}
main();
