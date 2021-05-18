// Copyright 2021 hex3928 (https://github.com/hex3928). All rights reserved. MIT license.

const ESC = "\u001B["
const OSC = "\u001B]"
const BEL = "\u0007"
const SEP = ";"
const isTermApp = Deno.env.get("TERM_PROGRAM")

interface Pos {
	x: number
	y?: number
}

interface ITermOpts {
	pos: { x?: number, y?: number }
	length?: number
	isHidden?: boolean
}

interface ImageOpts {
	width?: any
	height?: any
	preserveAspectRatio?: any
}

export const curTo = (pos: Pos) => {

	return pos.y
		? ESC + (pos.y + 1) + ";" + (pos.x + 1) + "H"
		: ESC + (pos.x + 1) + "G"
}

export const curMove = (pos: Pos) => {
	let result = ""

	if (pos.x < 0) result += ESC + (-pos.x) + "D"
	else
		if (pos.x > 0) result += ESC + pos.x + "C"

	if (pos.y)
		if (pos.y < 0) result += ESC + (-pos.y) + "A"
		else
			if (pos.y > 0) result += ESC + pos.y + "B"

	return result
}

export const curUp = (count = 1) => ESC + count + "A"
export const curDown = (count = 1) => ESC + count + "B"
export const curForward = (count = 1) => ESC + count + "C"
export const curBackward = (count = 1) => ESC + count + "D"

export const curLeft = () => ESC + "G"
export const curSavePosition = () => isTermApp ? "\u001B7" : ESC + "s"
export const curRestorePosition = () => isTermApp ? "\u001B8" : ESC + "u"
export const curGetPosition = () => ESC + "6n"
export const curNextLine = () => ESC + "E"
export const curPrevLine = () => ESC + "F"
export const curHide = () => ESC + "?25l"
export const curShow = () => ESC + "?25h"

export const eraseLines = (count: any) => {
	let clear = ""

	for (let i = 0; i < count; i++) clear += eraseLine() + (i < count - 1 ? curUp() : "")

	if (count) clear += curLeft()

	return clear
}

export const eraseEndLine = () => ESC + "K"
export const eraseStartLine = () => ESC + "1K"
export const eraseLine = () => ESC + "2K"
export const eraseDown = () => ESC + "J"
export const eraseUp = () => ESC + "1J"
export const eraseScreen = () => ESC + "2J"
export const scrollUp = () => ESC + "S"
export const scrollDown = () => ESC + "T"

export const clearScreen = () => "\u001Bc"

export const clearTerm = () => Deno.build.os === "windows" ?
	`${eraseScreen()}${ESC}0f` :
	`${eraseScreen()}${ESC}3J${ESC}H`

export const beep = () => BEL

export const link = (url: string | URL, text?: string) => `${OSC}8${SEP}${SEP}${url.toString()}${BEL}${text ? text : url.toString()}${OSC}8${SEP}${SEP}${BEL}`

export const image = (buffer: any, opts: ImageOpts) => {
	let result = `${OSC}1337;File=inline=1`

	if (opts.width) result += `;width=${opts.width}`

	if (opts.height) result += `;height=${opts.height}`

	if (opts.preserveAspectRatio === false) result += ";preserveAspectRatio=0"

	return result + ":" + btoa(`${buffer}`) + BEL
}

export const iTerm = {
	setCwd: (cwd = new URL(".", import.meta.url).pathname) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

	annotation: (msg: any, opts: ITermOpts) => {
		let result = `${OSC}1337;`

		const hasX = typeof opts.pos.x !== "undefined"
		const hasY = typeof opts.pos.y !== "undefined"
		if ((hasX || hasY) && !(hasX && hasY && typeof opts.length !== "undefined")) throw new Error("`length` required when a position is provied")

		msg = msg.replace(/\|/g, "")

		result += opts.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation="

		if (opts.length && opts.length > 0)
				result +=
					(hasX
						? [msg, opts.length, opts.pos.x, opts.pos.y]
						: [opts.length, msg]).join("|")
		else result += msg

		return result + BEL
	}
}
