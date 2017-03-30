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



## 私たち、輝きたい
