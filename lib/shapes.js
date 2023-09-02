class Triangle {
    setColor(color) {
        this.color = color
    }
    render() {
        return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`;
    }
}
class Square {
    setColor(color) {
        this.color = color
    }
    render() {
        return `<rect x="70" y="20" width="160" height="160" fill = "${this.color}" />`
    }
}
class Circle {
    setColor(color) {
        this.color = color
    }
    render() {
        return `<circle cx="50%" cy="50%" r="80" fill="${this.color}" />`
    }
}

module.exports = { Triangle, Square, Circle };
