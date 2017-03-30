import _ from "lodash"
import {debug, err} from "./util"
export default function (rules, data) {
    if (!_.isArray(rules)) {
        debug(err.invalid_rules)
        return data
    }
}