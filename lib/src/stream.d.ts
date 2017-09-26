/**
 * Character input stream.
 * Allows you to iterate through and read a string one character at a time.
 *
 * @returns {Object { peek:  Show next value without removing it from the stream.
 *                    next:  Show the next value and discards it from the stream.
 *                    isEOF: Returns true if stream is at end.
 *                    throw: Throw input stream errors. }
 */
export declare class CharInputStream {
    input: string;
    chr: string;
    pos: number;
    col: number;
    line: number;
    /**
     * @param {string} Input string to iterate through.
     */
    constructor(input: string);
    /**
     * @returns the next value without removing it from the stream.
     */
    peek: () => string;
    /**
     * @returns the next value and discards it from the stream
     */
    next: () => string;
    /**
     * Throw an error with the given message, also displaying the current stream position.
     */
    throw: (msg: string) => never;
    /**
     * @returns true if at end of file (no more vals in stream), otherwise false
     */
    isEOF: () => boolean;
    /**
     * @return true if at end of line (i.e. if given character is '\n')
     */
    isEOL: (ch?: string) => boolean;
    /**
     * @return true if current or given char is a whitespace character (including newline)
     */
    isWhitespace: (ch?: string) => boolean;
    private eol;
}
