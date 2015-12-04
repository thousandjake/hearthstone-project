var SearchView = function (search, tagName) {
  this.search = search;
  this.tagName = tagName;
  this.searchTemplate = '';
};

SearchView.prototype.render = function () {
  var that = this;

  var templateReady = new Promise(
    function (resolve, reject) {
      if (that.searchTemplate.length === 0) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (response) {
          resolve(response.currentTarget.response);
          that.searchTemplate = response.currentTarget.response;
        });
        xhr.addEventListener('error', function () {reject('fuckkk')});
        xhr.open('GET','/components/search/search.html');
        xhr.send();
      } else {
        resolve(that.searchTemplate);
      }

    }).catch(function (message) {
      alert(message);
    }).then(function (searchTemplate) {
      [].slice
        .call(document.getElementsByTagName(that.tagName))
        .forEach(function (currentSearchElement) {
          currentSearchElement.innerHTML = Mustache.render(searchTemplate,{});
        });
    });
};
