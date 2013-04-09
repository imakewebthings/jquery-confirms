(function(undefined) {
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], function($) {
        return factory($, root);
      });
    }
    return factory(root.jQuery, root);
  })(this, function($, window) {

    var fillTemplateText = function($template, options) {
      $template.find(options.promptSelector).text(options.promptText);
      $template.find(options.yesSelector).text(options.yesText);
      $template.find(options.noSelector).text(options.noText);
    };

    var setSubjectData = function($element, options) {
      $element.data('confirms-event', options.event);
    };

    var bindSubjectEvents = function($element, $confirmation, options) {
      var eventName = options.event + '.confirms';

      $element.on(eventName, function() {
        $element.after($confirmation).detach();
      });
    };

    var bindConfirmationEvents = function($element, $confirmation, options) {
      var $yes = $confirmation.find(options.yesSelector);
      var $no = $confirmation.find(options.noSelector);
      var element = $element[0];
      var eventName = 'click.confirms';

      $yes.on(eventName, $.proxy(options.onYes, element));
      $no.on(eventName, function() {
        $confirmation.after($element).detach();
        options.onNo.call(element);
      });
    };

    var methods = {
      init: function(options) {
        this.each(function() {
          var $element = $(this);
          var options = $.extend({}, $.fn.confirms.defaults, options);
          var $confirmation = $(options.confirmsTemplate);

          fillTemplateText($confirmation, options);
          setSubjectData($element, options);
          bindSubjectEvents($element, $confirmation, options);
          bindConfirmationEvents($element, $confirmation, options);
        });
      }
    };

    $.fn.confirms = function() {
      var method = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      if (methods[method]) {
        return methods[method].apply(this, args);
      }
      return methods.init.apply(this, method);
    };

    $.fn.confirms.defaults = {
      event: 'click',
      promptText: 'Are you sure?',
      yesText: 'Yes',
      noText: 'No',
      onYes: function() {
        var $this = $(this);
        $this.unbind('.confirms').trigger($this.data('confirms-event'));
      },
      onNo: $.noop,
      confirmsTemplate: '<div class="confirms"><p class="confirms-prompt"></p><a class="confirms-yes" href="#"></a><a class="confirms-no" href="#"></a></div>',
      promptSelector: '.confirms-prompt',
      yesSelector: '.confirms-yes',
      noSelector: '.confirms-no'
    };
  });
})();