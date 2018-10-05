var assert = require('assert');
var dynoItemSize = require('..');
var sizeOfValue = dynoItemSize.sizeOfValue;

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
    it('0', function() {
      let number = 0;
      let expectedSize = 1;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('1', function() {
      let number = 1;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('0.10', function() {
      let number = 1;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('01', function() {
      let number = 01;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('10', function() {
      let number = 10;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('1000.000', function() {
      let number = 1000.000;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('1000.0001', function() {
      let number = 1000.0001;
      let expectedSize = 5;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('1.111E-130', function() {
      let number = 1.111E-130;
      let expectedSize = 3;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('9.999E125', function() {
      let number = 9.999E125;
      let expectedSize = 3;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('9.999999999999998', function() {
      let number = 9.999999999999998;
      let expectedSize = 9;
      assert.equal(sizeOfValue(number), expectedSize);
    });
    
    it('-11', function() {
      let number = -11;
      let expectedSize = 2;
      assert.equal(sizeOfValue(number), expectedSize);
    });
  });
  
  describe('binary / bytes / buffer', function() {
    it('Empty buffer', function() {
      let buffer = Buffer.alloc(0);
      let expectedSize = 0;
      assert.equal(sizeOfValue(buffer), expectedSize);
    });
    
    it('Array', function() {
      let arr = [1,2,3,4];
      let buffer = Buffer.from(arr);
      let expectedSize = arr.length;
      assert.equal(sizeOfValue(buffer), expectedSize);
    });
    
    it('Hex', function() {
      let hex = "c4fe";
      let buffer = Buffer.from(hex, "hex");
      let expectedSize = 2;
      assert.equal(sizeOfValue(buffer), expectedSize);
    });
  });
  
  describe('boolean', function() {
    it('true', function() {
      let boolean = true;
      let expectedSize = 1;
      assert.equal(sizeOfValue(boolean), expectedSize);
    });
    
    it('false', function() {
      let boolean = false;
      let expectedSize = 1;
      assert.equal(sizeOfValue(boolean), expectedSize);
    });
  });
  
  describe('null', function() {
    it('null', function() {
      let expectedSize = 1;
      assert.equal(sizeOfValue(null), expectedSize);
    });
  });
  
  describe('list', function() {
    it('empty list', function() {
      let list = [];
      let expectedSize = 3;
      assert.equal(sizeOfValue(list), expectedSize);
    });
    
    it('list of lists', function() {
      let list = [ [], [], [], ];
      let expectedSize = 12;
      assert.equal(sizeOfValue(list), expectedSize);
    });
    
    it('nested lists', function() {
      let list = [ [ [ [] ] ] ];
      let expectedSize = 12;
      assert.equal(sizeOfValue(list), expectedSize);
    });
  });
  
  describe('map', function() {
    it('empty map', function() {
      let map = {};
      let expectedSize = 3;
      assert.equal(sizeOfValue(map), expectedSize);
    });
  });
});