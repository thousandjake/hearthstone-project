var AppDispatcher = {
  listeners : {},
  register : function (eventName, callback) {
    var that = this, eventFound = 'false';
    for(var key in that.listeners) {
      if(eventName === key) {
        eventFound = 'true';
      };
    };
    if(eventFound === 'true') {
      that.listeners[eventName].push(callback);
    } else {
      that.listeners[eventName] = [callback];
    };
  },
  dispatch : function (eventName, args) {
    var that = this, eventFound = 'false';
    for(var key in that.listeners) {
      if(eventName === key) {
        eventFound = 'true';
      };
    };
    if(eventFound === 'true'){
      that.listeners[eventName].forEach(function (currentValue) {
        currentValue(args);
      }, that);
    } else {
      console.error('Event undefined.  Event: '
        + eventName
        + ' with Arguments: '
        + args
        + ' is not a registered event'
      );
    };
  }
};
