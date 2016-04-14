

class Pane {
  constructor() {
    this.require = '^tabs';
    this.restrict = 'E';
    this.transclude = true;
    this.scope = {
      title: '@'
    };
    this.templateUrl = '../app/build/templates/pane.html';
  }

  link(scope, element, attrs, tabsCtrl) {
    tabsCtrl.addPane(scope);
  }

  static paneFactory() {
    Pane.instance = new Pane();
    return Pane.instance;
  }


}

exports.pane = Pane.paneFactory;
