export default interface Parser {
    /** 
    * @throws {Parsing Error}
    */
    parse<K>(input: string): K

    stringify(input: any): string
}