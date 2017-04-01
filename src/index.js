import _ from "lodash"
import {debug, err, isObj} from "./util"

const isMatch = function ({url, match}, config) {
    if (_.isRegExp(url) || _.isFunction(match)) {
        return url.test(config.url) || match(config)
    }
    return false
}

const filter = function ({structure, strict}, data) {
    let filtered = _.cloneDeep(data)
    if (strict) {
        // remove redundancy on strict mode, to do
    }
    return dispatch(structure, filtered)
}

const dispatch = function (structure, data) {
    return _.isArray(data) ? filterArray(structure, data) : filterObject(structure, data)
}

const filterArray = function (structure, data) {
    let result = []
    data.forEach(each => {
        result.push(filterObject(structure[0], each))
    })
    return result
}

const filterObject = function (structure, data) {
    let result = _.cloneDeep(data)
    for (let key in structure) {
        if (!(key in result)) {
            result[key] = ""
        }
        if (isObj(result[key]) || _.isArray(result[key])) {
            result[key] = dispatch(structure[key].child, result[key])
        } else {
            result[key] = check(structure, result[key])
        }
    }
    return result
}

const checkType = {
    String: "",
    Number: "",
    Date: ""
}

const defaultConfig = {
    String: "invalid type",
    Number: 0,
    Date: new Date()
}

const getDefault = function (defaultVal, type) {
    return defaultVal ? defaultVal : defaultConfig[type] ? defaultConfig[type] : "invalid type"
}

const check = function ({type: types, custom, defaultVal, length, child} = format, data) {
    let valid = false, result = _.cloneDeep(data)
    if (typeof format == "string") {
        checkType[format] && checkType[format](result) && (valid = true)
    }
    if (_.isFunction(custom)) {
        custom(result) && (valid = true)
    } else {
        // 这里可能多余, 本来想着以结构为主, 现在以数据为主以后这些情况其实已经被分到dispatch里了(filterObject就处理掉了)
        if (types == "Array") {
            length && !length(result.length) && debug(err.invalid_length)
            result.map(each => check(child, each))
        }
        if (types == "Object") {
            result = filterObject(child, result)
        }
        if (!_.isArray(types)) {
            types = [types]
        }
        if (types) {
            types.forEach(type => {
                checkType[type] && checkType[type](result) && (valid = true)
            })
        }else {
            types = ["String"]
        }
    }
    return valid ? result : getDefault(defaultVal, format ? format : types[0])
}

export default function (rules, config, data) {
    if (!_.isArray(rules)) {
        debug(err.invalid_rules)
        return data
    }
    for (let rule of rules) {
        if (isMatch(rule, config)) {
            return filter(rule, data)
        }
    }
}