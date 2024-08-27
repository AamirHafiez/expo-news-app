import dayjs from "@/lib/day-js/dayjs";
import Date from "./Date"
import DateErrorInstance, { DateError } from "./error-instance";

class DateUtil implements Date {
    constructor(private date: string) {
    }

    isValidDate(): boolean {
        return dayjs(this.date).isValid()
    }

    /**
     * @throws {DateErrorInstance - Invalid Date}
     */
    format(format: string): string {
        if (!this.isValidDate()) {
            throw new DateErrorInstance(DateError.INVALID_DATE)
        }
        return dayjs(this.date).format(format)
    }
}

export default DateUtil