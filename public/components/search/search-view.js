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
        xhr.addEventListener('error', function () {reject()});
        xhr.open('GET','/components/search/search.html');
        xhr.send();
      } else {
        resolve(that.searchTemplate); //Why are we passing in searchTemplate?  It is a property
      }
    }).catch(function () {
      console.log('failed to get search template from server');
    }).then(function (searchTemplate) {
      [].slice.call(document.getElementsByTagName(that.tagName))
      //cast HTML collection returned by response to an array
        .forEach(function (currentSearchElement) {
          currentSearchElement.innerHTML = Mustache.render(searchTemplate,{});
          var searchTermElement = currentSearchElement
            .getElementsByClassName('search-term')[0];
          var searchTypeElement = currentSearchElement
            .getElementsByClassName('search-type')[0];
          searchTermElement.addEventListener(
            'keyup',
            that.debounce(
              that.search.doSearch.bind(
                that.search,
                searchTermElement,
                searchTypeElement
              ),
              250
            )
          );
        });
    });
};

SearchView.prototype.debounce = function (func, wait) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
