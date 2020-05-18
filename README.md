# STEPS

1. moved necessary files from the UCLA repo
2. installed npm files
3. began work on the lib folder, starting with employee.
    * first began trying to write the file using function/constructor, but could not get it to work. then moved onto using class/constructor name/constructor attributes and things began to fall in place.
    * added callback functions to pull this.name/id/email on employee.js, and the other more specific information on manager, engineer, and intern.
    * made sure to require employee.js on engineer/intern/manager files so they could use information from the employee file.
4. began writing code for app.js
    * Wrote inquirer prompts and responses, using methods and if/else statements to "validate" responses.
    * used a .then promise to organize response information and pushed responses to members and ids array
    * used fs.writeFileSync to write the "team.html" file. I tried just using fs.writeFile but that throws an error. this is because writeFileSync preforms input/output syncronously and blocks the node.js event loop while the file is written.
5. ran tests
    * in lib files, using this."Name of variable" does not work, except in Employee file and other variables not in the employee file (i.e. in the intern file using this.school). This is because you need to call back to the employee files to get that information, using super in the constructor.
    
    I ran into a lot of errors with this when i tried just using this.NAMEHERE.

Because of how the tests were written i felt that the code needed to be written in a very specific way as to not throw errors. If I had not been given the lib/template/and tests along with example code I may have written this assignment much differently, and probably in a lot less organized way. Being able to break down code and figure out why something works and another way doesn't really helped me out in this assignment.

