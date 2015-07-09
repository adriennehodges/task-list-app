function TaskList(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

  TaskList.prototype = {

    init : function(options) {
      this.settings = {
          'debug': false,
          taskList: {}
      };

      this.initializeTasks();
      this.setObservers();
    },

    initializeTasks : function () {
      var self = this,
          taskStore = JSON.parse(localStorage.getItem('taskList'));
        if (localStorage.taskList !== undefined) {
            taskStore = JSON.parse(localStorage.getItem('taskList'));
        } else {
            taskStore = {};
            localStorage.setItem('taskList', JSON.stringify(taskStore));
        }
      self.updateTasks();
    },

    setObservers : function () {
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

      $('span').on('keyup', function(event) {
        var element = $(event.currentTarget).parent(),
            id = element.attr('id');
        self.editTask(id); 
      });
    },

    addTask : function () {
      var self = this,
          taskId = Date.now(),
          taskName = $('#addTaskBox').val(),
          status = 0,
          taskObject = {},
          taskStore = JSON.parse(localStorage.getItem('taskList'));

      taskObject[taskId] = {
        'taskName' : taskName,
        'status' : status
      },

      $.extend(taskStore, taskObject);
      localStorage.setItem('taskList', JSON.stringify(taskStore));
      console.log(JSON.parse(localStorage.getItem('taskList')));

      self.updateTasks();
    },

    deleteTask : function (id) {
      var self = this,
          taskStore = JSON.parse(localStorage.getItem('taskList'));

      $('#' + id).remove();
      delete taskStore[id];
      localStorage.setItem('taskList', JSON.stringify(taskStore));
    },

    completeTask : function (id) {
      var self = this,
          taskStore = JSON.parse(localStorage.getItem('taskList'));
      
      $('#' + id).addClass('done').find('.complete').addClass('disabled');
      taskStore[id].status = 1;

      localStorage.setItem('taskList', JSON.stringify(taskStore));
    },

    editTask : function (id) {
      var self = this,
          taskStore = JSON.parse(localStorage.getItem('taskList'));
          newTaskName = $('#' + id + ' span').text();

      taskStore[id].taskName = newTaskName;
          
      localStorage.setItem('taskList', JSON.stringify(taskStore));
    },

    updateTasks : function () {
      var self = this,
          html = '',
          taskStore = JSON.parse(localStorage.getItem('taskList'));
      for (task in taskStore) {
        var taskInfo = taskStore[task],
            taskStatus = '',
            classHtml = '',
            buttonHtml = '';
        
        if (taskInfo.status === 1) {
          classHtml = 'class="done"';
          buttonHtml = 'disabled';
        }

        if (taskInfo.taskName !== "") {
          html += "<li id='" + task + "' " + classHtml + ">" + "<span contenteditable=true>" + taskInfo.taskName + "</span><button contenteditable='false' class='delete'>x</button><button contenteditable='false' class='complete " + buttonHtml + "'>DONE</button></li>";
        }

      }

      $('#taskList').html(html);
      $('#addTaskBox').val('');

      this.setObservers();
    }
  }  
      
      var task = new TaskList({"debug":false});

});