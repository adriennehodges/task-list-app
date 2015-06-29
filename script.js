//this is the object constructor
function TaskList(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

  //this is the init function
  TaskList.prototype.init = function(options) {
    this.settings = {
        'debug': false,
        taskList: {}
    };

    this.initializeTasks();
    this.setObservers();
  };

  TaskList.prototype.initializeTasks = function () {
    var self = this,
        taskStore = JSON.parse(localStorage.getItem('taskList'));
      if (localStorage.taskList !== undefined) {
          taskStore = JSON.parse(localStorage.getItem('taskList'));
      } else {
          taskStore = {};
          localStorage.setItem('taskList', JSON.stringify(taskStore));
      }
    self.updateTasks();
  };

  TaskList.prototype.setObservers = function () {
    var self = this;
    $('#addTaskButton').on('click', function () {
      self.addTask();
    });
    
    $('ul').on('click', '.delete', function(event) {
      var element = $(event.currentTarget).parent(),
          id = element.attr('id');
      self.deleteTask(id);
    });
    
    $('ul').on('click', '.complete', function(event) {
      var element = $(event.currentTarget).parent(),
          id = element.attr('id');
      self.completeTask(id);
    });
  };

  TaskList.prototype.addTask = function () {
    var self = this,
        taskId = Date.now(),
        taskName = $('#addTaskBox').val(),
        status = 0,
        taskObject = {},
        taskStore = JSON.parse(localStorage.getItem('taskList'));

    taskObject[taskId] = {
      'taskName' : taskName,
      'status' : status
    };

    $.extend(taskStore, taskObject);
    localStorage.setItem('taskList', JSON.stringify(taskStore));
    console.log(JSON.parse(localStorage.getItem('taskList')));

    self.updateTasks();
  };

  TaskList.prototype.deleteTask = function (id) {
    var self = this,
        taskStore = JSON.parse(localStorage.getItem('taskList'));

    $('#' + id).remove();
    delete taskStore[id];
    localStorage.setItem('taskList', JSON.stringify(taskStore));
  };

  TaskList.prototype.completeTask = function (id) {
    var self = this,
        taskStore = JSON.parse(localStorage.getItem('taskList'));
    
    $('#' + id).addClass('done').find('.complete').addClass('disabled');//.attr('contenteditable', 'false');
    taskStore[status] = 1;
    console.log('made it here');
    //taskInfo.attr('status', 1);
    //taskInfo.status === 1;
    //$('#' + id).prop('status', '1');
    //localStorage.setItem('taskList', JSON.stringify(taskStore));
  };

  TaskList.prototype.updateTasks = function () {
    var self = this,
        html = '',
        taskStore = JSON.parse(localStorage.getItem('taskList'));
    for (task in taskStore) {
      var taskInfo = taskStore[task],
          taskStatus = '';
      
      if (taskInfo.status === 1) {
        taskStatus = 'complete';
      }

      if (taskInfo.taskName !== "") {
        html += "<li contenteditable='true' id='" + task + "'>" + taskInfo.taskName + "<button contenteditable='false' class='delete'>x</button><button contenteditable='false' class='complete'>DONE</button></li>";
      }

    }  
    $('#taskList').html(html);
    $('#addTaskBox').val('');
  };
    
    var task = new TaskList({"debug":false});

});

/*

TaskList.prototype.delegateDelete = function(event) {
      var element = $(event.currentTarget).parent(),
          id = element.attr('id');
      this.deleteTask(id);
  };
  
  this is to make sure the delete event is bound to the dynamically
  created DOM elements that are created after the DOM has loaded
  and the setObservers() function has already been called

  ----OR----

  something like $('#' + id).find('.delete').on('click', function ...

*/

