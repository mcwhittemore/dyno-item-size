# Dyno Item Size

This is a simple untility to calculate the size of an item as [DynamoDB]() would. The goal of this project is to be accruate within a byte so that you can make optimized requests to DynamoDB.

## Usage

```
var dynoItemSize = require('dyno-item-size');
var item = {
  'string': 'string',
  'number': 27,
  'buffer': new Buffer('buffer', 'utf8')
};
var size = dynoItemSize(item);
console.log(size);
// => 33
```

## API

`dynoItemSize` comes with a two helper functions to translate the size of an object into it's read or write capacity cost.

### `dynoItemSize(object)`

Takes an object like the one shown in usage and returns the size in bytes.

### `dynoItemSize.read(object)`

Takes an object like the one shown in usage and returns the read capacity cost.

### `dynoItemSize.write(object)`

Takes an object like the one shown in usage and returns the write capacity cost.
