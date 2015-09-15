var Cell = function(object) {
  this.marked = false;
  this.$el = $('<div/>');
  this.object = object;

  this.$el.on('click', function() {
    this.marked = !this.marked;
    this.$el.removeClass('marked');
    if(this.marked) {
      this.$el.addClass('marked');
    }
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
    $('<div/>').addClass('clearfix').appendTo($row);
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
    name: 'Fast Food',
  },
  {
    name: 'Airplane',
  },
  {
    name: 'Yellow Car',
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
    name: 'Delivery Truck',
  },
  {
    name: 'Bridge',
  },
  {
    name: 'House',
  },
  {
    name: 'Green Car',
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
  {
    name: 'Sewer Cover',
  },
  {
    name: 'Gas Station',
  },
  {
    name: 'Speed Limit Sign',
  },
  {
    name: 'Church',
  },
  {
    name: 'Yield Sign',
  },
  {
    name: 'Playground',
  },
  {
    name: 'Skyscraper',
  },
  {
    name: 'Flag Pole'
  },
  {
    name: 'Post Office',
  },
  {
    name: 'Library',
  },
  {
    name: 'Fence',
  },
  {
    name: 'Park',
  },
  {
    name: 'Fountain',
  },
  {
    name: 'Statue'
  },
  {
    name: 'Coffee Shop'
  },
  {
    name: 'Rainbow'
  },
  {
    name: 'Train',
  },
  {
    name: 'Boat'
  },
  {
    name: 'River'
  },
];

var correctBoards = [
  // rows
  [ 0,  1,  2,  3, 4],
  [ 5,  6,  7,  8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],

  // columns
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],

  // diagonals
  [0, 6, 12, 18, 24],
  [20, 16, 12, 8, 4]
];

var missingBoardPieces = function(configuration) {
  var buildSelector = function(row, column) {
    return '.row:nth-child(' + (row + 1) + ') > .cell:nth-child(' + (column + 1) + ')'; 
  };

  configuration.map(function(index) {
    var row = Math.floor(index / 5);
    var column = index % 5;
    return $(buildSelector(row, column));
  }).filter(function($el) {
    return !$el.hasClass('marked');
  });
};

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

var refresh = function() {
  new CellContainer(chooseBoard()).render($('#board'));
}

var totalSeconds = 0;
var formatSeconds = function() {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  return minutes + ':' + seconds;
};
var drawSeconds = function() {
  $('#timer').html(formatSeconds());
  totalSeconds++;
}

$(function() {
  $('#reset').on('click', refresh);
  refresh();
  setInterval(drawSeconds, 1000);
});
