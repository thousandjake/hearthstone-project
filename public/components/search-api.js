var SearchAPI = {
  doSearch : function (args) {
    var dataReady = new Promise(
      function (resolve, reject) {
        if(args.term !== '') {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener('load', function (xhrResponse) {
            resolve(xhrResponse);
          });
          xhr.addEventListener('fail', function () {
            reject();
          });
          xhr.open('GET',
            '/api/search?searchType='
            + encodeURIComponent(args.searchType)
            + '&searchTerm='
            + encodeURIComponent(args.searchTerm)
          );
          xhr.send();
        }
      }).catch(function () {
        AppDispatcher.dispatch('update-status',
          {
          statusType : 'error',
          statusText: 'AJAX call failed!'
          }
        );
      }).then(function (xhrResponse) {
        if(xhrResponse.currentTarget.status === 200) {
          var cardDataArray = JSON.parse(arguments[0].currentTarget.response);
          if (Array.isArray(cardDataArray)) {
            AppDispatcher.dispatch('have-data', {dataArray : cardDataArray});
            AppDispatcher.dispatch('update-status',
              {
              statusType : 'success',
              statusText: 'Card search successful!'
              }
            );
          } else {
            AppDispatcher.dispatch('update-status',
              {
              statusType : 'error',
              statusText: 'No results found! Please try again!'
              }
            );
          }
        } else {
          AppDispatcher.dispatch('update-status',
            {
            statusType : 'error',
            statusText: 'Response status != 200'
            }
          );
        }
      });
  }
};

AppDispatcher.register('need-data', SearchAPI.doSearch);
