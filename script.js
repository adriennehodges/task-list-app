//this is the object constructor
function TaskList(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

  //this is the init function
  TaskList.prototype.init = function(options) {
    this.settings = {
        'debug': false,
        'id': Date.now(),
        taskList: {}
    };

    this.initializeTasks();
    this.setObservers();
  };

  TaskList.prototype.initializeTasks = function () {
    var self = this;
      if (localStorage.taskList !== undefined) {
          self.settings.taskList = JSON.parse(localStorage.getItem('taskList'));
      } else {
          self.settings.taskList = {};
          localStorage.setItem('taskList', JSON.stringify(self.settings.taskList));
      }
      self.updateTasks();
  };

  TaskList.prototype.setObservers = function () {
    var self = this;
    $('#addTaskButton').on('click', function () {
      self.addTask();
    });
    $('#delete').on('click', function () {
      self.deleteTask();
    });
  };

  TaskList.prototype.addTask = function () {
    var self = this,
        taskId = Date.now(),
        taskName = $('#addTaskBox').val(),
        status = 0,
        taskObject = {};

    taskObject[taskId] = {
      'taskName' : taskName,
      'status' : status
    };

    $.extend(this.settings.taskList, taskObject);
    localStorage.setItem('taskList', JSON.stringify(self.settings.taskList));
    console.log(JSON.parse(localStorage.getItem('taskList')));

    self.updateTasks();
    
  };

  TaskList.prototype.deleteTask = function () {
    var self = this,
        id = TaskList.settings.taskId,
        taskStore = JSON.parse(localStorage.getItem('taskList'));

    $('#' + id).remove();    
    delete taskStore[id];

    //$('#' + task).remove(); //ONLY REMOVES LAST LI OF UL AND ONLY IF YOU CLICK THE DELETE BUTTON OF THE FIRST LI
    //localStorage.removeItem('task', JSON.stringify(self.settings.taskList));
    //localStorage.setItem('taskList', JSON.stringify(self.settings.taskList));
    //self.updateTasks();

    /*deleteSelectedTask: function() {
            var data = JSON.parse(localStorage.getItem('task-list')),
                id = selectedTask.settings.id,

            $('#' + id).remove();
            delete data[id];
            localStorage.setItem('task-list', JSON.stringify(data));
            self.resetSelectedTaskDisplay();
        },*/
    
  };

  TaskList.prototype.updateTasks = function () {
    var self = this,
        html = '';
    for (task in self.settings.taskList) {
      var taskInfo = self.settings.taskList[task],
          taskStatus = '';
      
      if (taskInfo.status === 1) {
        taskStatus = 'complete';
      }

      if (taskInfo.taskName !== "") {
        html += "<li contenteditable='true' id='" + task + "'>" + taskInfo.taskName + "<button id='delete' contenteditable='false' class='delete'>x</button><button id='complete' contenteditable='false' class='complete'>DONE</button></li>";
      }

    }  
      $('#taskList').html(html);
      $('#addTaskBox').val('');
  };
      var task = new TaskList({"debug":false});
});

/*TaskList.prototype.completeTask = function () {
    if ($(this).parent().hasClass('done')) {
      $(this).parent().removeClass('done');
  } else {
      $(this).parent().addClass('done');
  }
    //change the class of the object and update the information stored in the array
    //or think of better way to do this
    //localStorage.setItem('taskListData', JSON.stringify(taskList));
  };

  TaskList.prototype.deleteTask = function () {
    $(this).parent().remove();
    //remove the item from the array by using id
    //localStorage.removeItem('name');
    //localStorage.setItem('taskListData', JSON.stringify(taskList));
  };
    
  $(document).on('click', '.delete', task.deleteTask);
  $(document).on('click', '.complete', task.completeTask);*/