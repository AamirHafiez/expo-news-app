export enum DateError {
    INVALID_DATE = "Invalid date",
}

class DateErrorInstance extends Error {
    constructor(message: DateError) {
        super(message);
        this.name = "DateError";
    }
}

export default DateErrorInstance;