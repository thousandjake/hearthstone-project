var SearchView = function(search, tagName) {
  this.search = search;
  this.tagName = tagName;
};

SearchView.prototype.render = function() {
  var searchTemplate = "";
  var that = this;
  var templateReady = new Promise(
    function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function(response){
        resolve(response.currentTarget.response);
        searchTemplate = response.currentTarget.response;
      });
      xhr.addEventListener('error', function(){reject('fuckkk')});
      xhr.open('GET','/components/search/search.html');
      xhr.send();
    }).catch(function(message){
      console.log('promise caught');
      alert(message);
    }).then(function(searchTemplate){
      [].slice
        .call(document.getElementsByTagName(that.tagName))
        .forEach(function (currentSearchElement) {
          currentSearchElement.innerHTML = Mustache.render(searchTemplate,{});
        });
    });
};
