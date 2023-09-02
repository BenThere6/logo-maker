const { Triangle, Square, Circle } = require('./shapes');

describe('Shapes Test', () => {
    it('Should return correct points and color for Triangle', () => {
        const shape = new Triangle();
        shape.setColor("blue");
        expect(shape.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="blue" />');
    })
    it('Should return correct points and color for Square', () => {
        const shape = new Square();
        shape.setColor("blue");
        expect(shape.render()).toEqual('<rect x="70" y="20" rx=\"5\" ry=\"5\" width="160" height="160" fill = "blue" />');
    })
    it('Should return correct points and color for Circle', () => {
        const shape = new Circle();
        shape.setColor("blue");
        expect(shape.render()).toEqual('<circle cx="50%" cy="50%" r="80" fill="blue" />');
    })
})