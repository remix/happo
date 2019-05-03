'use strict';

module.exports = {
  triggeredByUrl: 'https://test.example',
  diffImages: [{
    description: '“normal” <Small>',
    viewportName: 'small',
    previous: '/small-previous.png',
    current: '/small-current.png',
    height: 22
  }, {
    description: '<Small> inverted',
    viewportName: 'small',
    previous: '/small-current.png',
    current: '/small-previous.png',
    height: 22
  }, {
    description: '<FullPage> small',
    viewportName: 'small',
    current: '/full-page-small-current.png',
    previous: '/full-page-small-previous.png',
    height: 672
  }, {
    description: '<FullPage> large',
    viewportName: 'large',
    current: '/full-page-large-current.png',
    previous: '/full-page-large-previous.png',
    height: 718
  }, {
    description: 'Globe',
    viewportName: 'large',
    current: '/globe-current.png',
    previous: '/globe-previous.png',
    height: 1200
  }, {
    description: 'Completely different',
    viewportName: 'small',
    previous: '/modal-previous.png',
    current: '/card-current.png',
    height: 373
  }, {
    description: 'Completely different, reversed',
    viewportName: 'small',
    previous: '/card-current.png',
    current: '/modal-previous.png',
    height: 373
  }, {
    description: '<First> with "test"',
    viewportName: 'small',
    previous: '/modal-previous.png',
    current: '/modal-current.png',
    height: 373
  }, {
    description: '<First> some other \'test\'',
    viewportName: 'medium',
    previous: '/card-previous.png',
    current: '/card-current.png',
    height: 373
  }, {
    description: '<First> /$&^',
    viewportName: 'large',
    previous: '/wide-previous.png',
    current: '/wide-current.png',
    height: 300
  }, {
    description: '<First>',
    viewportName: 'large',
    previous: '/dialog-previous.png',
    current: '/dialog-current.png',
    height: 373
  }, {
    description: '<MajorDiff> large',
    viewportName: 'large',
    current: '/major-diff-large-current.png',
    previous: '/major-diff-large-previous.png',
    height: 718
  }, {
    description: '<MajorDiff> small',
    viewportName: 'small',
    current: '/major-diff-small-current.png',
    previous: '/major-diff-small-previous.png',
    height: 672
  }],
  newImages: [{
    description: '<New>',
    viewportName: 'small',
    current: 'http://placehold.it/350x150',
    height: 150
  }, {
    description: '<New>',
    viewportName: 'medium',
    current: 'http://placehold.it/550x150',
    height: 150
  }, {
    description: '<New>',
    viewportName: 'large',
    current: 'http://placehold.it/850x150',
    height: 150
  }, {
    description: '<SomethingElseNew>',
    viewportName: 'small',
    current: 'http://placehold.it/350x150',
    height: 150
  }]
};