const Element = class {
    constructor(number, symbol, name, weight) {
        this.atomicNumber = number;
        this.symbol = symbol;
        this.name = name;
        this.weight = weight;
        this.errorCount = 0;
    }
};

Element.prototype.buildElementCell = function() {
    var cellData = "<div style='width: 100%'>" + this.atomicNumber + " " + this.name + "</div>"
        + "<div style='text-align: center; width: 100%'>" + this.symbol + "</div>";
    if (this.weight != 0) {
        cellData += "<div style='text-align: center; width: 100%'>" + this.weight + "</div>";
    }

    return cellData;
};

Element.prototype.toString = function () {
    return "Name: " + this.name + "\nAtomic Number: " + this.atomicNumber + "\nSymbol: " + this.symbol
};
