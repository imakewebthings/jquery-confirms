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
        var spy;

        beforeEach(function() {
          spy = jasmine.createSpy('on original click');
          $target.on('click', spy);
          $prompt.find('.confirms-yes').click();
        });

        it('triggers click on original element', function() {
          expect(spy).toHaveBeenCalled();
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
});