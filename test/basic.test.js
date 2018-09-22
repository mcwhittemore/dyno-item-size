var dynoItemSize = require('..');

var items = {
  string: { content: 'string', size: 12 },
  number: { content: 27, size: 10 },
  buffer: { content: new Buffer('hi', 'utf8'), size: 8 }
};

describe('should report back item size', function() {
  it('for an item with string values', function() {
    var item = {
        string: items.string.content
    };
    var size = dynoItemSize(item);
    if (size !== items.string.size) throw new Error(`Expected ${items.string.size} but got ${size}`);
  });
  
  it('for an item with number values', function() {
    var item = {
        number: items.number.content
    };
    var size = dynoItemSize(item);
    if (size !== items.number.size) throw new Error(`Expected ${items.number.size} but got ${size}`);
  });

  it('for an item with buffer values', function() {
    var item = {
        buffer: items.buffer.content
    };
    var size = dynoItemSize(item);
    if (size !== items.buffer.size) throw new Error(`Expected ${items.buffer.size} but got ${size}`);
  });

  it('for an item with string, number and buffer values', function() {
    var item = {
        string: items.string.content,
        number: items.number.content,
        buffer: items.buffer.content
    };
    var size = dynoItemSize(item);
    var expectedSize = items.string.size + items.buffer.size + items.number.size;
    if (size !== expectedSize) throw new Error(`Expected ${expectedSize} but got ${size}`);
  });
});

describe('should report back capactiy cost', function() {
  it('for reading an item with string, number and buffer values', function() {
    var item = {
        string: items.string.content,
        number: items.number.content,
        buffer: items.buffer.content
    };
    var cap = dynoItemSize.read(item);
    if (cap !== 1) throw new Error(`Expected 1 but got ${cap}`);
  });

  it('for writing an item with string, number and buffer values', function() {
    var item = {
        string: items.string.content,
        number: items.number.content,
        buffer: items.buffer.content
    };
    var cap = dynoItemSize.read(item);
    if (cap !== 1) throw new Error(`Expected 1 but got ${cap}`);
  });
});
