var Cell = function(object) {
  this.marked = false;
  this.$el = $('<div/>');
  this.object = object;

  this.$el.on('click', function() {
    this.marked = !this.marked;
  }.bind(this));
};

Cell.prototype.render = function($parent) {
  this.$el.addClass('cell');
  if(this.marked) {
    this.$el.addClass('marked');
  }

  this.$el.html(this.object.name);

  this.$el.appendTo($parent);
};

var CellContainer = function(objects) {
  this.cells = objects.map(function(objectRow) {
    return objectRow.map(function(object) {
      return new Cell(object);
    });
  });
};

CellContainer.prototype.render = function($parent) {
  $parent.empty();

  this.cells.forEach(function(cellRow) {
    var $row = $('<div/>').addClass('row');
    cellRow.forEach(function(cell) {
      cell.render($row);
    });
    $row.appendTo($parent);
  });
};

var objects = [
  {
    name: 'Fire Hydrant',
  },
  {
    name: 'Stop Sign',
  },
  {
    name: 'Policeman',
  },
  {
    name: 'Motorcycle',
  },
  {
    name: 'Tree',
  },
  {
    name: 'Firetruck',
  },
  {
    name: 'Ambulance',
  },
  {
    name: 'McDonald\'s',
  },
  {
    name: 'Airplane',
  },
  {
    name: 'Red Car',
  },
  {
    name: 'Yellow Light',
  },
  {
    name: 'Dog',
  },
  {
    name: 'A School',
  },
  {
    name: 'Swimming Pool',
  },
  {
    name: 'Hospital',
  },
  {
    name: 'Grocery Store',
  },
  {
    name: 'Construction Worker',
  },
  {
    name: 'Crane',
  },
  {
    name: '18-Wheeler',
  },
  {
    name: 'Bridge',
  },
  {
    name: 'House',
  },
  {
    name: 'Blue Car',
  },
  {
    name: 'Crane',
  },
  {
    name: 'Dump Truck',
  },
  {
    name: 'Helicopter',
  },
];

var chooseBoard = function() {
  var shuffled = _.shuffle(objects);

  var board = [];
  for(var i = 0; i < 5; i++) {
    var row = [];
    for(var j = 0; j < 5; j++) {
      row.push(shuffled[i * 5 + j]);
    }
    board.push(row);
  }

  return board;
};

$(function() {
  new CellContainer(chooseBoard()).render($('#board'));
});
