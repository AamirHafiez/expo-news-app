class parserImpl implements Parser {
    parse<K>(input: string): K {
        return JSON.parse(input) as K
    }

    stringify(input: any): string {
        return JSON.stringify(input);
    }
}

export default parserImpl;