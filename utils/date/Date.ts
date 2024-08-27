export default interface Date {
    isValidDate(): boolean;
    format(format: string): string
}