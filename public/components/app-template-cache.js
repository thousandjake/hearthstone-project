var AppTemplateCache = {
  templates : {},
  getTemplate : function (HTMLpath) {
    return new Promise(function (resolve, reject) {
      if(AppTemplateCache.templates.hasOwnProperty(HTMLpath)) {
        resolve(AppTemplateCache.templates[HTMLpath]);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (response) {
          AppTemplateCache.templates[HTMLpath] = response.currentTarget.response;
          resolve(AppTemplateCache.templates[HTMLpath]);
        });
        xhr.addEventListener('error', function () {
          reject();
        });
        xhr.open('GET', HTMLpath);
        xhr.send();
      }
    })
      .catch(function () {
        console.error('failed to get template from server');
      });
  }
};
