var assert = require('assert');
var dynoItemSize = require('..');
var sizeOfValue = dynoItemSize.sizeOfValue;

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

describe('should calculate value sizes', function() {
  describe('string', function() {
    it('empty string', function() {
      let string = ''
      let expectedSize = 0;
      assert.equal(sizeOfValue(string), expectedSize);
    });
    
    it('basic string', function() {
      let string = 'helloworld';
      let expectedSize = string.length;
      assert.equal(sizeOfValue(string), expectedSize);
    });
    
    it('unicode string 1', function() {
      // U+00A9 COPYRIGHT SIGN; see http://codepoints.net/U+00A9
      let utf16String = '\u00A9';
      let utf8EncodedString = '\xC2\xA9';
      let expectedSize = utf8EncodedString.length;
      assert.equal(sizeOfValue(utf16String), expectedSize);
    });
    
    it('unicode string 2', function() {
      // U+10001 LINEAR B SYLLABLE B038 E; see http://codepoints.net/U+10001
      let utf16String = '\uD800\uDC01';
      let utf8EncodedString = '\xF0\x90\x80\x81';
      let expectedSize = utf8EncodedString.length;
      assert.equal(sizeOfValue(utf16String), expectedSize);
    });
  });
  
  describe('number', function() {
    it('11', function() {
      let number = 11;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('basic string', function() {
      let string = 'helloworld';
      let expectedSize = string.length;
      assert.equal(sizeOfValue(string), expectedSize);
    });
    
    it('unicode string 1', function() {
      // U+00A9 COPYRIGHT SIGN; see http://codepoints.net/U+00A9
      let utf16String = '\u00A9';
      let utf8EncodedString = '\xC2\xA9';
      let expectedSize = utf8EncodedString.length;
      assert.equal(sizeOfValue(utf16String), expectedSize);
    });
    
    it('unicode string 2', function() {
      // U+10001 LINEAR B SYLLABLE B038 E; see http://codepoints.net/U+10001
      let utf16String = '\uD800\uDC01';
      let utf8EncodedString = '\xF0\x90\x80\x81';
      let expectedSize = utf8EncodedString.length;
      assert.equal(sizeOfValue(utf16String), expectedSize);
    });
  });
});