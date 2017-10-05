0.35.0
======
Upgraded Typescript to 2.5.2
Upgraded Node to 8.6.0

0.25.0
======
Upgraded Typescript version to 2.3.0, from 2.2.1
Set all React packages to install from 15.x  

0.24.0
======
withLeftIndent has breaking changes
*   Behaves more predictably (and usefully).
    *   Defaults to indent of 0 (first-line variable thus no longer always required)
    *   Removes unpredictable addition of 4 spaces to indent (it now always indents to the expected size)
    *   No longer includes the last line in its 'initial indent' calculation.
        *   Thus avoiding issues where the last line knocks everything forward or backward based on the text alignment scheme.
*   Essentially anything relying on previous broken withLeftIndent behaviour will have errors.
