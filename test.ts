import { assertEquals } from "./test_deps.ts"
import * as escapes from "./mod.ts"

Deno.test("escapes | curTo", () => assertEquals(
    escapes.curTo({ x: 5, y: 7 }),
    "\u001B[8;6H"
))

Deno.test("escapes | curTo x only", () => assertEquals(
    escapes.curTo({ x: 5 }),
    "\x1b[6G"
))

Deno.test("escapes | link", () => assertEquals(
    escapes.link("https://example.com/", "text"),
    "\u001B]8;;https://example.com/\u0007text\u001B]8;;\u0007"
))

Deno.test("escapes | link URL only", () => assertEquals(
    escapes.link("https://example.com/"),
    "\u001B]8;;https://example.com/\u0007https://example.com/\u001B]8;;\u0007"
))

Deno.test("escapes | eraseLines", () => assertEquals(
    escapes.eraseLines(4),
    "\x1b[2K\x1b[1A\x1b[2K\x1b[1A\x1b[2K\x1b[1A\x1b[2K\x1b[G"
))
