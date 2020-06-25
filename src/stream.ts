// TODO Unit test CharInputStream

/**
 * Character input stream.
 * Allows you to iterate through and read a string one character at a time.
 *
 * @return {Object} Keys:
 *             peek: Show next value without removing it from the stream.
 *             next:  Show the next value and discards it from the stream.
 *             isEOL: Returns true if stream is at end of line.
 *             isEOF: Returns true if stream is at end.
 *             throw: Throw input stream errors. }
 */
export class CharInputStream {
    /*------------------------------------------ STATE -------------------------------------------*/
    /** Current character */
    chr: string;
    /** Current position */
    pos = 0;
    /** Current column (position in current line) */
    col = 0;
    /** Current line */
    line = 0;

    /** @param {string} Input string to iterate through. */
    constructor(public input: string) {}

    /*-------------------------- ITERATION METHODS ---------------------------*/
    /** Return the next value without removing it from the stream. */
    public peek = (): string => this.input.charAt(this.pos);

    /** Return the next value and discards it from the stream. */
    public next = (): string => {
        // Get chr, store in object, shift pos
        this.chr = this.input.charAt(this.pos++);

        // Shift row & col based on whether at eol
        if (this.isEOL()) this.eol();
        else this.col++;

        return this.chr;
    };

    /*---------------------------- ERROR HANDLING ----------------------------*/
    /** Throw error with given message, also displaying the current stream position. */
    public throw = (msg: string): never => {
        throw new Error(`${msg} (Position ${this.pos}: line ${this.line}, col ${this.col})`);
    };

    /*---------------------------- CHARACTER INFO ----------------------------*/
    /** Return true if at end of file (no more vals in stream), otherwise false */
    public isEOF = (): boolean => this.peek() === '';

    /** Return true if at end of line (i.e. if given char is '\n') */
    public isEOL = (ch?: string): boolean => (ch || this.chr) === '\n';

    /* Return true if current or given char is a whitespace char (including newline) */
    public isWhitespace = (ch?: string): boolean => '\t\ns '.indexOf(ch || this.chr) >= 0;

    /*--------------------------- PRIVATE HELPERS ----------------------------*/
    /** Handle end of line (shift column & line) */
    private eol = (): void => {
        this.col = 0;
        this.line++;
    };
}
