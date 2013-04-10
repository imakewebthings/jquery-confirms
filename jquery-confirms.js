/*!
  jQuery Confirms - v0.0.1
  © 2013 - Caleb Troughton
  MIT Licensed: http://opensource.org/licenses/MIT
  For more information, visit https://github.com/imakewebthings/jquery-confirms
*/
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

      $element.on(eventName, function(event) {
        $element.after($confirmation).detach();
        event.preventDefault();
      });
    };

    var bindConfirmationEvents = function($element, $confirmation, options) {
      var $yes = $confirmation.find(options.yesSelector);
      var $no = $confirmation.find(options.noSelector);
      var element = $element[0];
      var eventName = 'click.confirms';
      var restoreOriginal = function(event) {
        $confirmation.after($element).detach();
        event.preventDefault();
      };

      $yes.on(eventName, restoreOriginal)
          .on(eventName, $.proxy(options.onYes, element));
      $no.on(eventName, restoreOriginal)
         .on(eventName, $.proxy(options.onNo, element));
    };

    var methods = {
      init: function(userOptions) {
        this.each(function() {
          var $element = $(this);
          var dataOptions = {
            event: $element.data('confirms-event'),
            promptText: $element.data('confirms-prompt-text'),
            yesText: $element.data('confirms-yes-text'),
            noText: $element.data('confirms-no-text')
          };
          var options = $.extend(
            {},
            $.fn.confirms.defaults,
            dataOptions,
            userOptions
          );
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
      return methods.init.call(this, method);
    };

    $.fn.confirms.defaults = {
      event: 'click',
      promptText: 'Are you sure?',
      yesText: 'Yes',
      noText: 'No',
      onYes: function(event) {
        var $this = $(this);
        var originalEvent = $this.data('confirms-event');

        $this.unbind('.confirms');
        if ($this.is('a') && originalEvent === 'click') {
          window.location.href = this.href;
        }
        else {
          $this.trigger(originalEvent);
        }
      },
      onNo: $.noop,
      confirmsTemplate: '<div class="confirms"><p class="confirms-prompt"></p><a class="confirms-yes" href="#"></a><a class="confirms-no" href="#"></a></div>',
      promptSelector: '.confirms-prompt',
      yesSelector: '.confirms-yes',
      noSelector: '.confirms-no'
    };
  });
})();