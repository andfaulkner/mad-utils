"use strict";
// TODO Unit test CharInputStream
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Character input stream.
 * Allows you to iterate through and read a string one character at a time.
 *
 * @returns {Object { peek:  Show next value without removing it from the stream.
 *                    next:  Show the next value and discards it from the stream.
 *                    isEOF: Returns true if stream is at end.
 *                    throw: Throw input stream errors. }
 */
var CharInputStream = (function () {
    /**
     * @param {string} Input string to iterate through.
     */
    function CharInputStream(input) {
        var _this = this;
        this.input = input;
        this.pos = 0; // Position
        this.col = 0;
        this.line = 0; // Coordinates (col & line)
        //
        // ITERATION METHODS
        //
        /**
         * @returns the next value without removing it from the stream.
         */
        this.peek = function () { return _this.input.charAt(_this.pos); };
        /**
         * @returns the next value and discards it from the stream
         */
        this.next = function () {
            _this.chr = _this.input.charAt(_this.pos++); // Get chr, store in object, shift pos
            if (_this.isEOL())
                _this.eol();
            else
                _this.col++; // Shift row & col based on whether at eol
            return _this.chr;
        };
        //
        // ERROR HANDLING
        //
        /**
         * Throw an error with the given message, also displaying the current stream position.
         */
        this.throw = function (msg) {
            throw new Error(msg + " (Position " + _this.pos + ": line " + _this.line + ", col " + _this.col + ")");
        };
        //
        // CHARACTER INFO
        //
        /**
         * @returns true if at end of file (no more vals in stream), otherwise false
         */
        this.isEOF = function () { return _this.peek() === ''; };
        /**
         * @return true if at end of line (i.e. if given character is '\n')
         */
        this.isEOL = function (ch) { return (ch || _this.chr) === '\n'; };
        /**
         * @return true if current or given char is a whitespace character (including newline)
         */
        this.isWhitespace = function (ch) { return '\t\n\s '.indexOf(ch || _this.chr) >= 0; };
        //
        // PRIVATE HELPERS
        //
        // Handle end of line (shift column & line)
        this.eol = function () { _this.col = 0; _this.line++; };
    }
    return CharInputStream;
}());
exports.CharInputStream = CharInputStream;
//# sourceMappingURL=stream.js.map