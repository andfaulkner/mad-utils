

/**
 * Character input stream.
 * Allows you to iterate through and read a string one character at a time.
 *
 * @returns {Object { peek:  Show next value without removing it from the stream.
 *                    next:  Show the next value and discards it from the stream.
 *                    isEOF: Returns true if stream is at end.
 *                    throw: Throw input stream errors. }
 */
export class CharInputStream {
    chr: string                            // Current character
    pos = 0;                               // Position
    col = 0; line = 0                      // Coordinates (col & line)

    /**
     * @param {string} Input string to iterate through.
     */
    constructor (public input: string) {}

    /**
     * @returns the next value without removing it from the stream.
     */
    public peek = (): string => this.input.charAt(this.pos)

    /**
     * @returns the next value and discards it from the stream
     */
    public next = (): string => {
        this.chr = this.input.charAt(this.pos++);      // Get chr, store in object, shift pos
        if (this.isEOL()) this.eol(); else this.col++; // Shift row & col based on whether at eol
        return this.chr;
    }

    /**
     * @returns true if at end of file (no more vals in stream), otherwise false
     */
    public isEOF = (): boolean => this.peek() === ''

    /**
     * Throw an error with the given message, also displaying the current stream position.
     */
    public throw = (msg: string): never => {
        throw new Error(`${msg} (Position ${this.pos}: line ${this.line}, col ${this.col})`);
    }


    //
    // PRIVATE HELPERS
    //

    // Handle end of line (shift column & line)
    private eol = (): void => { this.col = 0; this.line++; }

    // @return true if at end of line (i.e. if given character is '\n')
    private isEOL = (ch?: string): boolean => (ch || this.chr) === '\n'

    // @return true if current or given char is a whitespace character
    private is_whitespace = (ch?: string): boolean => '\t\n\s '.indexOf(ch || this.chr) >= 0;
}
