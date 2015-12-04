var SearchView = function(search) {
  this.search = search;
};

SearchView.prototype.render = function() {
  var searchTemplate = "";
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
    });
    templateReady.catch(function(message){
      console.log('promise caught');
      document.alert(message);
    });
    templateReady.then(function(message){
      console.log('promise then');
      console.log(searchTemplate);
    });
};
