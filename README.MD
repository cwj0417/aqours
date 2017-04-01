## aqours

filter and detect data type

## installing 

```shell
npm i aqours -S
```

## usage

```js
import aqours from "aqours"
```

### in interceptor

```js
let structure = {
    alertType: {
        type: "String",
        defaultVal: "紧急"
    },
    startTime: {
        custom: value => value < new Date().valueOf(),
        defaultVal: new Date().setHours(0).valueOf()
    },
    department: {
        type: "Object", // buxuyao?
        child: {
           description: {
               type: "String"
           },
           id: {
               type: "Number",
               defaultVal: 0
           }
       }
    },
    solutions: {
        type: "Array",// buxuyao?
        length: length => length >= 5,
        child: {
            type: "Number"
        }
    },
    remarks: {
        type: "Array",// buxuyao?
        length: length => length === 15,
        child: {
            type: "Object",
            child: {
                // shortcut for type and no more config
                message: "String"
            }
        }
    },
    users: [{
        // shortcut for elementType "Object" and no length limit
        CNName: {
            custom: name => !/^a-zA-Z$/.test(name),
            defaultVal: "中文名"
        }
    }]
}
let rules = [{
    url: /events$/,
    strict: true,
    structure
}, {
    match: config => /events$/.test(config.url),
    structure
}]
let interceptor = function(response) {
    let {status, data, config} = response
    if (status === 200) {
        response.data = aqours(rules, config, data)
    }
}
```

## document
to be continued.

## api

### rules

filter data in interceptor

+   **url:**  regular expression, match `config.url`
+   **match:** function (response),  return whether single rule matches the structure
+   **strict:** boolean, optional, if true, aqours will remove redundancy
+   **structure:** object, aqours will filter response according to the structure

### structure

+   **type:** array / string [string:[String, Number, Date, Object, Array]], when object aqours will recursive into child object
+   **custom:** function, was first priority if has custom validate type will be ignored, weather value was validate
+   **defaultVal:** mixed, default to "invalid value", when type verify failed the origin value will be replaced by default value



## 私たち、輝きたい
