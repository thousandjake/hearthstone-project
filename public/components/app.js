var App = function() {
  document.addEventListener('DOMContentLoaded',function(){
    //dispatch the dom-load event
    AppDispatcher.dispatch('dom-load', {});
  });
};
