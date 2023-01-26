export const textStyles = {
    h1: "font-bold text-2xl",
    h2: "font-bold text-xl ",
}

const input = `rounded-md h-10 bg-white rounded-md px-3 py-2
placeholder:text-gray outline-none border border-gray-light`
export const inputStyles = {
    time: "w-full px-3" + input,
    text: input + " px-6",
    select: input + " text-sm w-min px-3",
}

export const buttonStyles = {
    basic: "py-2 w-full rounded-full text-white text-sm font-semibold",
    primary: "py-2 bg-primary w-full rounded-full text-white text-sm font-semibold",
}