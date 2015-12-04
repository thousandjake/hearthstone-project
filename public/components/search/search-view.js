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
          var searchTermElement = currentSearchElement
            .getElementsByClassName('search-term')[0];
          var searchTypeElement = currentSearchElement
            .getElementsByClassName('search-type')[0];
          searchTermElement.addEventListener(
            'change',
            that.search.doSearch.bind(
              that.search,
              function () {return searchTypeElement.value},
              function () {return searchTermElement.value},
              function (xhrResponse) {
                if(xhrResponse.currentTarget.status === 200){
                  console.log(JSON.parse(arguments[0].currentTarget.response));
                }else {
                  alert('You fucked up son');
                }
              },
              function () {alert('IDK WHAT THE FUCK YOU DID')}
            )
          );
        });
    });
};
