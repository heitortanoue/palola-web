function getTailwindColors () {
    const colors = require("./colors");
    const colorsArray = Object.entries(colors).map(([name, value]) => ({
        name,
        value
    }));

    let newObj = {};
    colorsArray.forEach((color) => {    
        newObj = {...newObj, [convertToKebabCase(color.name)]: withOpacity(color.value)}
    });

    return newObj;
}

function withOpacity(hex) {
    const [r, g, b] = getRGBfromHex(hex);
    return `rgb(${r} ${g} ${b}/<alpha-value>)`
} 

function getRGBfromHex(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function convertToKebabCase(str) {
    // Use a regular expression to match uppercase letters
    // and insert a hyphen before them
    return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
  }

module.exports = getTailwindColors();