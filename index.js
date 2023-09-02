const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const statAsync = util.promisify(fs.stat);
const { Triangle, Square, Circle } = require('./lib/shapes');

const prompts = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for logo:',
        // Validate that input does not exceed 3 characters
        validate: function (input) {
            if (input.length <= 3) {
                return true;
            } else {
                return 'Input must be 3 characters of less.'
            }
        }
    },
    {
        type: 'input',
        name: 'text_color',
        message: 'Enter the text color (or hexadecimal number):'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['Circle','Triangle','Square']
    },
    {
        type: 'input',
        name: 'shape_color',
        message: 'Enter the shape color (or hexadecmial number):'
    }
]

inquirer
    .prompt(prompts)
    .then((answers) => {
        var shapeLine;
        var text = answers.text.toUpperCase();
        var text_color = answers.text_color;
        var text_y;
        var shape;
        if (answers.shape === 'Triangle') {
            text_y = '85%';
            shape = new Triangle();
        } else if (answers.shape === 'Square') {
            text_y = '60%';
            shape = new Square();
        } else {
            text_y = '60%';
            shape = new Circle();
        }
        shape.setColor(answers.shape_color);
        shapeLine = shape.render();

        // Data to be written to file
        fileData = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeLine}
    <text x="50%" y="${text_y}" font-size="60" text-anchor="middle" fill="${text_color}">${text}</text>
</svg>`;
        
        // This function ensures that old logos are not written over. A new file with a unique name is created for each logo generated.
        async function findAvailableFilePath(basePath, count) {
            const filePath = `./dist/logo_${count}.svg`;
        
            try {
                await statAsync(filePath);
                return findAvailableFilePath(basePath, count + 1);
            } catch (err) {
                return filePath;
            }
        }
        
        (async () => {
            const basePath = './dist/logo_';
            const availableFilePath = await findAvailableFilePath(basePath, 1);
        
            fs.writeFile(availableFilePath,fileData, (err) => {
                if (err) {
                    console.error('Error writing to the file:', err);
                } else {
                    console.log('Generated logo.svg')
                }
            });
        })();
    })
    .catch((error) => {
        console.error(error);
    })