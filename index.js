const inquirer = require('inquirer');
const shapes = require('./lib/shapes');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./lib/shapes');

const prompts = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for logo:',
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

        fileData = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeLine}
    <text x="50%" y="${text_y}" font-size="60" text-anchor="middle" fill="${text_color}">${text}</text>
</svg>`;
        fs.writeFile('./dist/logo.svg',fileData, (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('Generated logo.svg')
            }
        })
    })
    .catch((error) => {
        console.error(error);
    })