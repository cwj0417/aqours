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
let rules = [{
    url: /events$/,
    strict: true,
    structure: {
        
    }
}, {
    match: response => /events$/.test(response.config.url),
    structure: {
        
    }
}]
let interceptor = function(response) {
    let {status, data} = response
    if (status === 200) {
        aqours(rules, data)
    }
}
```

## document
to be continued.

## api

### rules

filter data in interceptor

+   **url:**  regular expression, match `response.config.url`
+   **match:** function (response),  return whether single rule matches the structure
+   **strict:** boolean, optional, if true, aqours will remove redundancy
+   **structure:** object, aqours will filter response according to the structure

## 私たち、輝きたい
