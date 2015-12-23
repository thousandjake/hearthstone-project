var AppDispatcher = {
  listeners : {},
  register : function (eventName, callback) {
    if(this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  },
  dispatch : function (eventName, args) {
    if(this.listeners.hasOwnProperty(eventName)){
      this.listeners[eventName].forEach(function (currentValue) {
        currentValue(args);
      });
    } else {
      console.error(
        'Event undefined.  Event:',
        eventName,
        'with Arguments:',
        args,
        'is not a registered event'
      );
    }
  }
};
