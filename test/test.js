let assert = require("chai").assert
let aqours = require("../aqours")
const equalAssert = function (target, aq1, aq2, aq3) {
    return assert.equal(JSON.stringify(aqours([aq1], aq2, aq3)), JSON.stringify(target))
}
let config = {
    url: "abc"
}
const getStructure = function (num) {
    let url = /abc/
    let structures = [{
        a: {
            type: "String",
            defaultVal: "i am default"
        }
    }, {
        a: {
            type: "Number",
            defaultVal: "i am default"
        }
    }, {
        a: {
            type: "Number"
        }
    }]
    return {
        url,
        structure: structures[num]
    }
}
describe("test", function () {
    it("type ok", function () {
        equalAssert({a: "a"}, getStructure(0), config, {a: "a"})
    })
    it("type fail & have default", function () {
        equalAssert({a: "i am default"}, getStructure(1), config, {a: "a"})
    })
    it("type fail & have not default", function () {
        equalAssert({a: "invalid type"}, getStructure(2), config, {a: "a"})
    })
})
