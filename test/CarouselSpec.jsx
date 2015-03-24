/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Carousel        = require('../lib/Carousel');
var CarouselItem    = require('../lib/CarouselItem');

describe('Carousel', function () {
  it('Should show the correct item', function () {

    var instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);

    instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={1}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(
        ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators'), 'li'
      ).length, 2
    );
  });

  it('Should handle null children', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        {null}
        {false}
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(
        ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators'), 'li'
      ).length, 2
    );
  });

  it('Should call onSelect when indicator selected', function (done) {
    function onSelect(index, direction) {
      assert.equal(index, 0);
      assert.equal(direction, 'prev');
      done();
    }

    var instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(
        ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators'), 'li'
      )[0]
    );
  });

  it('Should show all controls on the first/last image if wrap is true', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={0} controls={true} wrap={true}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    var backButton = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'left');

    assert.ok(backButton);
    assert.equal(backButton.props.href, '#prev');

    instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} controls={true} wrap={true}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    var nextButton = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'right');

    assert.ok(nextButton);
    assert.equal(nextButton.props.href, '#next');
  });

  it('Should not show the prev button on the first image if wrap is false', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={0} controls={true} wrap={false}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    var backButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'left');
    var nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'right');

    assert.equal(backButtons.length, 0);
    assert.equal(nextButtons.length, 1);
  });
});
