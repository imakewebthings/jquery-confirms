# jQuery Confirms

A jQuery plugin for confirming a user action. The confirmation prompt is presented inline as a replacement to the original action.

- Master: [![Master Build Status](https://travis-ci.org/imakewebthings/jquery-confirms.png?branch=master)](https://travis-ci.org/imakewebthings/jquery-confirms)

## Basic Usage

The simplest usage:

```js
$('.some-button').confirms();
```

This will use all of the default options of Confirms, replacing `.some-button` with this snippet on click:

```html
<div class="confirms">
  <p class="confirms-prompt">Are you sure?</p>
  <a class="confirms-yes" href="#">Yes</a>
  <a class="confirms-no" href="#">No</a>
</div>
```

If the "No" option is chosen, the original button replaces the prompt. If "Yes" is chosen, the confirmation handler is unbound from the button and a click is triggered on the button. The prompt and its behavior can be customized with by passing an options object to the `confirms` call.

## Options

- **event** - The event to intercept with confirmation. This is `click` by default.
- **promptText** - The prompt given to the user. *Are you sure?* is not a great prompt to give a user. A better prompt would tell the user exactly what happens on confirmation. *Are you sure you want to delete your account? Your data will not be recoverable after you delete it.*
- **yesText** - The text for the confirm (Yes) action. *Yes* may be too generic. It's better to say exactly what the button does. *Yes, Delete Account*.
- **noText** - The text for the cancel (No) action. *No* may be too generic. It's better to say exactly what the button does. *No, Leave my Account Alone*.
- **onYes** - A callback function executed when the user chooses the confirm (Yes) action. Overriding this will prevent Confirms from triggering the native event that was interrupted, and leave it to you, the programmer, to do anything useful.
- **onNo** - A callback function executed when the user chooses the cancel (No) action. The prompt will be hidden and the original button restored even if this option is overridden.
- **confirmsTemplate** - The HTML string used as a template for creating prompts. If you don't like the snippet shown above, you can change it along with the selector options below to customize the HTML structure.
- **promptSelector** - Selector that matches the prompt text element within the template. The `promptText` option will be set as the text of this element.
- **yesSelector** - Selector that matches the confirm (Yes) action element. `yesText` will be set as the text of this element.
- **noSelector** - Selector that matches the cancel (No) action element. `noText` will be set as the text of this element.

## Defaults

```js
{
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
}
```

## Declarative Equivalents

If you prefer to declare options as `data-*` attributes on your confirmable element, you can do that for several options. Here's how they map to the options object:

```coffee
data-confirms-event: event
data-confirms-prompt-text: promptText
data-confirms-yes-text: yesText
data-confirms-no-text: noText
```

All other options, such as the `onYes` and `onNo` callbacks, must be defined in script if they are to be used.

## What About Styling?

This repository includes no CSS. It is up to you to style the confirmations to fit your needs.

## License

© 2013 - Caleb Troughton. Licensed under the [MIT license](http://opensource.org/licenses/MIT).