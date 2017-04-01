const isDev = process.env.NODE_ENV !== "production"
// judge env via reading NODE_ENV
export const debug = (...args) => {
    if (isDev) {
        console.log(...args)
    }
}
export const err = {
    invalid_rules: "invalid_rules",
    invalid_length: "invalid_length"
}

// this method considered "{}" not an object
export const isObj = function(obj) {
    if (typeof obj !== "object") {
        return false
    }
    for (let test in obj) {
        return true
    }
    return false
}