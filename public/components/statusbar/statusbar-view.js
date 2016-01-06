var StatusBarView = {
  render : function (statusData) {
    AppTemplateCache.getTemplate('/components/statusbar/statusbar.html')
      .then(function (statusBarTemplate) {
        document.getElementsByTagName('StatusBar')[0]
          .innerHTML = Mustache.render(statusBarTemplate, statusData);
      });
  }
}

AppDispatcher.register('update-status', StatusBarView.render);
