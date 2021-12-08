
declare interface Date {
    toDateString(): string;
    getAge(): number;
    toDateTimeString(): string;
    toShortTimeString(): string;
    addDay(day: number): Date;
}

Date.prototype.toDateString = function (this: Date) {
    const day = this.getDate() > 9 ? this.getDate() : '0' + this.getDate();
    const mounth = (this.getMonth() + 1) > 9 ? (this.getMonth() + 1) : '0' + (this.getMonth() + 1);
    const date = day + '.' + mounth + '.' + this.getFullYear();
    return date;
};

Date.prototype.toShortTimeString = function (this: Date) {
    const hours = this.getHours() > 9 ? this.getHours() : '0' + this.getHours();
    const minutes = this.getMinutes() > 9 ? this.getMinutes() : '0' + this.getMinutes();
    const seconds = this.getSeconds() > 9 ? this.getSeconds() : '0' + this.getSeconds();
    const date2 = hours + ':' + minutes + ':' + seconds;
    return date2;
};

Date.prototype.toDateTimeString = function (this: Date) {
    const date1 = this.toDateString();
    const date2 = this.toShortTimeString();
    return date1 + ' ' + date2;
};

Date.prototype.getAge = function (this: Date) {

    return new Date().getFullYear() - this.getFullYear();
};

Date.prototype.addDay = function (this: Date, day: number) {
    const date = this.getTime() + (day * (1000 * 60 * 60 * 24));
    return new Date(date);
};