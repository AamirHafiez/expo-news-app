class UnknownError extends Error { 
    code: number | undefined

    constructor(message: string, code?: number) {
        super(message);
        this.name = "UnknownError";
        this.code = code;
    }
}

export default UnknownError;