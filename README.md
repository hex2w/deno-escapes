# ANSI escapes
Makes it easier to handle ANSI escapes. Basically a set of methods that return the correct escapes which can be based of dynamically passed parameters.

```ts
import * as escapes from "https://deno.land/x/escapes/mod.ts"

escapes.link("https://example.com/", "text"),
// "\u001B]8;;https://example.com/\u0007text\u001B]8;;\u0007"

escapes.eraseLines(4),
// "\x1b[2K\x1b[1A\x1b[2K\x1b[1A\x1b[2K\x1b[1A\x1b[2K\x1b[G"

// ...
```


```ts
import { link, eraseLines } from "https://deno.land/x/escapes/mod.ts"

link("https://example.com/", "text"),
// "\u001B]8;;https://example.com/\u0007text\u001B]8;;\u0007"

eraseLines(4),
// "\x1b[2K\x1b[1A\x1b[2K\x1b[1A\x1b[2K\x1b[1A\x1b[2K\x1b[G"

// ...
```

Inspired by [ansi-escapes](https://github.com/sindresorhus/ansi-escapes) by Sindre Sorhus <sindresorhus@gmail.com>
