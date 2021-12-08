declare interface String {
    toCamelCase(): string;
    toDateTime(): Date;
}

String.prototype.toDateTime = function (this: string) {
    let dateSplit = this.split('/');
    let date = new Date();
    if (dateSplit.length > 1) {
        date = new Date(dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2]);
    } else {
        dateSplit = this.split('.');
        if (dateSplit.length > 0) {
            date = new Date(dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2]);
        }
    }
    date = new Date(date.getTime() + ((date.getTimezoneOffset() * -1) * 60 * 1000));
    return date;
};

String.prototype.toCamelCase = function (this: string) {
    return this.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) { return ''; }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};