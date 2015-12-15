var AppTemplateCache =  {
  templates : {},
  getTemplate : function (tagName, HTMLpath) {
    var templateReady = new Promise(function (resolve, reject) {
        if(Object.keys(AppTemplateCache.templates).indexOf(tagName) === -1) {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener('load', function (response) {
            AppTemplateCache.templates[tagName] = response.currentTarget.response;
            resolve(AppTemplateCache.templates[tagName]);
          });
          xhr.addEventListener('error', function () {reject()});
          xhr.open('GET', HTMLpath);
          xhr.send();
        } else {
          resolve(AppTemplateCache.templates[tagName]);
        }
    })
    return templateReady;
  }
};
