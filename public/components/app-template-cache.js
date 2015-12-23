var AppTemplateCache =  {
  templates : {},
  getTemplate : function (HTMLpath) {
    var that = this;
    var templateReady = new Promise(function (resolve, reject) {
        if(that.templates.hasOwnProperty(HTMLpath)) {
          resolve(that.templates[HTMLpath]);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener('load', function (response) {
            that.templates[HTMLpath] = response.currentTarget.response;
            resolve(that.templates[HTMLpath]);
          });
          xhr.addEventListener('error', function () {reject()});
          xhr.open('GET', HTMLpath);
          xhr.send();
        };
    });
    return templateReady;
  }
};
