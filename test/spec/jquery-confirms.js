describe('jQuery Confirms', function() {
  var $target;
  var $prompt;

  beforeEach(function() {
    setFixtures('<a class="target" href="#">Test</a>');
    $target = $('.target');
  });

  describe('with defaults', function() {
    beforeEach(function() {
      $target.confirms();
    });

    describe('when clicked', function() {
      beforeEach(function() {
        $target.click();
        $prompt = $('.confirms');
      });

      it('removes the clicked element', function() {
        expect($('.target')).not.toExist();
      });

      it('inserts the confirmation prompt', function() {
        expect($('.confirms')).toExist();
      });

      describe('when confirmation yes selected', function() {
        var originalClickSpy;

        beforeEach(function() {
          originalClickSpy = jasmine.createSpy('on original click');
          $target.on('click', originalClickSpy);
          $prompt.find('.confirms-yes').click();
        });

        it('triggers click on original element', function() {
          expect(originalClickSpy).toHaveBeenCalled();
        });
      });

      describe('when confirmation no selected', function() {
        beforeEach(function() {
          $prompt.find('.confirms-no').click();
        });

        it('restores the original target element', function() {
          expect($('.target')).toExist();
        });

        it('removes the confirm prompt', function() {
          expect($('.confirms')).not.toExist();
        });
      });
    });
  });

  describe('with custom options', function() {
    var yesSpy, noSpy;

    beforeEach(function() {
      yesSpy = jasmine.createSpy('on yes callback');
      noSpy = jasmine.createSpy('on no callback');

      $target.confirms({
        event: 'customtestevent',
        promptText: 'Do custom thing?',
        yesText: 'Affirmative',
        noText: 'Negative',
        onYes: yesSpy,
        onNo: noSpy,
        confirmsTemplate: '<p class="custom-confirm"><span class="custom-prompt"></span><i class="affirmative"></i><b class="negative"></b></p>',
        promptSelector: '.custom-prompt',
        yesSelector: '.affirmative',
        noSelector: '.negative'
      });
      $target.trigger('customtestevent');
    });

    it('shows custom confirmation on specified event', function() {
      expect($('.custom-confirm')).toExist();
    });

    it('uses custom prompt text and selector', function() {
      expect($('.custom-prompt')).toHaveText('Do custom thing?');
    });

    it('uses custom yes text and selector', function() {
      expect($('.affirmative')).toHaveText('Affirmative');
    });

    it('uses custom no text and selector', function() {
      expect($('.negative')).toHaveText('Negative');
    });

    describe('on yes', function() {
      beforeEach(function() {
        $('.affirmative').click();
      });

      it('runs custom callback', function() {
        expect(yesSpy).toHaveBeenCalled();
      });
    });

    describe('on no', function() {
      beforeEach(function() {
        $('.negative').click();
      });

      it('runs custom callback', function() {
        expect(noSpy).toHaveBeenCalled();
      });

      it('still restores original button', function() {
        expect($('.custom-confirm')).not.toExist();
        expect($('.target')).toExist();
      });
    });
  });

  describe('declarative options', function() {
    beforeEach(function() {
      setFixtures('<a class="target" data-confirms-event="decevent" data-confirms-prompt-text="Confirm declarative?" data-confirms-yes-text="Sure" data-confirms-no-text="Nope" href="#">Test</a>');
      $target = $('.target');
      $target.confirms();
      $target.trigger('decevent');
    });

    it('uses declared event', function() {
      expect($('.confirms')).toExist();
    });

    it('uses declared prompt text', function() {
      expect($('.confirms-prompt')).toHaveText('Confirm declarative?');
    });

    it('uses declared yes text', function() {
      expect($('.confirms-yes')).toHaveText('Sure');
    });

    it('uses declared no text', function() {
      expect($('.confirms-no')).toHaveText('Nope');
    });
  });
});