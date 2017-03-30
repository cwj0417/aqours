import _ from "lodash"
import {debug, err, isObj} from "./util"

const isMatch = function ({url, match}, config) {
    if (_.isRegExp(url) || _.isFunction(match)) {
        return url.test(config.url) || match(config)
    }
    return false
}

const filter = function ({structure, strict}, data) {
    let filtered =  _.cloneDeep(data)
    if (strict) {
        //
    }
}

export default function (rules, config, data) {
    if (!_.isArray(rules)) {
        debug(err.invalid_rules)
        return data
    }
    for (let rule of rules) {
        if (isMatch(rule, config)) {
            return filter(rule, data)
            break
        }
    }
}