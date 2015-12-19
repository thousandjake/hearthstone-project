var AppTemplateCache =  {
  templates : {},
  getTemplate : function (tagName, HTMLpath) {
    var that = this;
    var templateReady = new Promise(function (resolve, reject) {
        if(Object.keys(that.templates).indexOf(tagName) === -1) {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener('load', function (response) {
            that.templates[tagName] = response.currentTarget.response;
            resolve(that.templates[tagName]);
          });
          xhr.addEventListener('error', function () {reject()});
          xhr.open('GET', HTMLpath);
          xhr.send();
        } else {
          resolve(that.templates[tagName]);
        };
    });
    return templateReady;
  }
};
