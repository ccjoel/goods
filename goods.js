// to add a method to the prototype of an already existing function: [search]
// Add a method conditionally.
Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
  return this;
};

// example of adding a new method:
Number.method('integer', function() {
  return Math[this < 0 ? 'ceiling' : 'floor'](this);
});

// also -> hasOwnProperty
var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== 'function') {
    document.writeln(name + ': ' + another_stooge[name]);
  }
}

// to inherit or use prototype of another base object:
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}

// forget about global issues
var MYAPP = {};
MYAPP.stooge = {
  "first-name": "Joe",
  "last-name": "Howard"
};

// closure:

// BAD EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the
//wrong way.
  // When you click on a node, an alert box is supposed to display the ordinal of the
//node.
  // But it always displays the number of nodes instead.
var add_the_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(e) {
      alert(i);
    };
  }
};
// END BAD EXAMPLE

// BETTER EXAMPLE
// Make a function that assigns event handler functions to an array of nodes the
//right way.
  // When you click on a node, an alert box will display the ordinal of the node.
var add_the_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(i) {
      return function(e) {
        alert(e);
      };
    }(i);
  }
};


// Modules, with functions:

String.method('deentityify', function() {
  // The entity table. It maps entity names to
  // characters.
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  // Return the deentityify method.
  return function() {
    // This is the deentityify method. It calls the string
    // replace method, looking for substrings that start
    // with '&' and end with ';'. If the characters in
    // between are in the entity table, then replace the
    // entity with the character from the table. It uses
    // a regular expression (Chapter 7).
    return this.replace(/&([^&;]+);/g,
      function(a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}());

//Information hiding:

var serial_maker = function() {
  // Produce an object that produces unique strings. A
  // unique string is made up of two parts: a prefix
  // and a sequence number. The object comes with
  // methods for setting the prefix and sequence

  // number, and a gensym method that produces unique
  // strings.
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};
var seqer = serial_maker();
seqer.set_prefix = ('Q';)
seqer.set_seq = (1000);
var unique = seqer.gensym(); // unique is "Q1000"


/*Curry */
Function.method('curry', function() {
  var slice = Array.prototype.slice,
    args = slice.apply(arguments),
    that = this;
  return function() {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

// memoization: store values of functions on an array/object that is
//accessible via closure

// Chapter 5 - Inheritance:
//Define a constructor:
var Mammal = function(name) {
  this.name = name;
};
Mammal.prototype.get_name = function() {
  return this.name;
};

// making and instance:

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(); // 'Herb the Mammal'

// making a class Cat that inherits from class mammal:

var Cat = function(name) {
  this.name = name;
  this.saying = 'meow';
};
// Replace Cat.prototype with a new instance of Mammal
Cat.prototype = new Mammal();
// Augment the new prototype with
// purr and get_name methods.
Cat.prototype.purr = function(n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
Cat.prototype.get_name = function() {
  return this.says() + ' ' + this.name +
    ' ' + this.says();
};
var myCat = new Cat('Henrietta');
var says = myCat.says(); // 'meow'
var purr = myCat.purr(5); // 'r-r-r-r-r' var name = myCat.get_name();
// 'meow Henrietta meow'

//hide uglyness of inheritance:

Function.method('inherits', function(Parent) {
  this.prototype = new Parent();
  return this;
});

// example of using that ^

var Cat = function(name) {
  this.name = name;
  this.saying = 'meow';
}.
inherits(Mammal).
method('purr', function(n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
}).
method('get_name', function() {
  return this.says() + ' ' + this.name +
    ' ' + this.says();
});

// Object inheritance instead of class inheritance:

//sample parent object* important
var myMammal = {
  name: 'Herb the Mammal',
  get_name: function() {
    return this.name;
  },
  says: function() {
    return this.saying || '';
  }
};

// using the cat that inherits:

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
myCat.get_name = function() {
  return this.says() + ' ' + this.name + ' ' + this.says();
};


// or a simple way of me seeing it:

var parent = {name:'parent'};
var child = {};
child.prototype = parent;

// then we can add more properties to child, or request parent properties
//by using: child.prototype.name, for example

//but properties are not hidden, i.e. not private (information hiding)

// sample constructor function to hide info:
var constructor = function (spec, my) {
  var that;
  // , other private instance variables;
  my = my || {};
  // Add shared variables and functions to my that = a new object;
  // Add privileged methods to that
  return that;
};


// call: calls function in new context
// apply: call function with array as context
// bind: creates a call but returns a function to use later, instead of applying
//the call immediately
