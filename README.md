[![CircleCI](https://circleci.com/gh/jmhummel/dyno-item-size/tree/master.svg?style=svg&circle-token=c3dcad6dd3bbd2347fcc8eaaacbdd4dcb1e030c9)](https://circleci.com/gh/jmhummel/dyno-item-size/tree/master)

# Dyno Item Size

This is a simple utility to calculate the size of an item as [DynamoDB](https://aws.amazon.com/documentation/dynamodb/) would. The goal of this project is to be accurate within a byte so that you can make optimized requests to DynamoDB.

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
// => 32
```

## API

`dynoItemSize` comes with a two helper functions to translate the size of an object into it's read or write capacity cost.

### `dynoItemSize(object)`

Takes an object like the one shown in usage and returns the size in bytes.

### `dynoItemSize.read(object)`

Takes an object like the one shown in usage and returns the read capacity cost.

### `dynoItemSize.write(object)`

Takes an object like the one shown in usage and returns the write capacity cost.

## Resources

This module has been implemented by reading a few resources.

- [Item Size in DdynamoDB from stack overflow](http://stackoverflow.com/questions/8988389/itemsize-in-dynamodb)
- [Provision Throughput from the AWS DynamoDB docs](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html)
- [Naming Rules and Data Types](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes)
- [Item Sizes and Capacity Unit Consumption](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CapacityUnitCalculations.html#ItemSizeCalculations.Reads)