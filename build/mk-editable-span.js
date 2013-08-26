var mod = angular.module('mk.editablespan', []);

mod.directive('editablespan', function() {
  return {
    restrict: 'E',
    template: '<div><span ng-hide="editing">{{text}}</span><form ng-show="editing"><input type="text"></form><div>',
    scope: {
      text: '=model',
      onReady: '&' 
    },
    replace: true,
    link: function(scope, element, attrs) {
      var span = angular.element(element.children()[0]);
      var form = angular.element(element.children()[1]);  
      var input = angular.element(element.children()[1][0]);

      span.bind('click', function(event) {
        input[0].value = scope.text;
        startEdit();        
      });

      function startEdit() {
        bindEditElements();
        setEdit(true);
        input.focus();
      }

      function bindEditElements() {        
        input.bind('blur keyup', function(event) {
          if(isKeyUp(event) && !isEscape(event)) {
            return;
          }
          stopEdit();        
        });

        form.bind('submit', function() {
          save();
          stopEdit(); 
        });
      }

      function save() {
        scope.text = input[0].value;
        scope.$apply();
        scope.onReady();
      }

      function stopEdit() {
        unbindEditElements();
        setEdit(false);
      }

      function unbindEditElements() {
        input.unbind();
        form.unbind();        
      }

      function setEdit(value) {
        scope.editing = value;
        scope.$apply();
      }

      function isEscape(event) {
        return event.originalEvent.keyCode == 27;
      }

      function isKeyUp(event) {
        return event && event.type == "keyup";
      }
    }
  };
});
