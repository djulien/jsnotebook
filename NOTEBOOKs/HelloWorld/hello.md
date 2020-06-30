---
title: Javascript Notebook Demo
author: djulien
reference: https://github.com/djulien/fxnotebook
keywords: 
description: interactive Javascript notebook demo
---
# Hello World
This is a basic example of an interactive Javascript Notebook page.

## Basics
**Javascript Notebook** pages are text files that use *Markdown* syntax.  The file contains sections of text and Markdown directives, and the file name ends with ".md".

When a Notebook page is opened, the file contents are rendered into HTML using the [Showdown][] markdown engine.

The file can also contain HTML tags.  For example, here is a 200 x 100 px cyan rectangle using HTML tags and embedded CSS: 
<div style="width: 200px; height: 100px; background-color: #0ff; border: 1px solid black;"></div>

## Example Commands
Here are some other basic Markdown commands.

Code fragment:
```
void main() {
    gl_FragColor = vec4(1,0,0,1);	// ERROR
}
```

Bullet list:
* first item
* second item
* third item

Table:
| Column 1 | column 2 | col 3 |
| -------- | -------- | ----- |
| *first*  | row | ... |
| **second** | row | ... |

Tasklists (GFM Style):
- [x] write this intr0
- [ ] create more examples

For a complete description of Markdown syntax, see the [Showdown syntax wiki page](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax).

## References
[Showdown]: https://github.com/showdownjs/showdown

#### (eof)