
declare interface Number {
    scientificNotationToRealNumberString(): string;
}

Number.prototype.scientificNotationToRealNumberString = function (this: Number) {
    let result = this.toString();
    if (this.toString().search('e') > 0) {
        const value = Number(this.toString().split('e')[1]);
        if (value > 0) {
            result = Number(this).toPrecision().toString();
        } else {
            result = Number(this).toFixed(-1 * value);
        }
    }
    return result;
};