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

$(function() {
  new CellContainer([[]]).render($('#board'));
});
