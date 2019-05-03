'use strict';

module.exports = function () {
  function pageTitle(_ref) {
    var diffImages = _ref.diffImages,
        newImages = _ref.newImages;

    var title = [];
    if (diffImages.length === 1) {
      title.push('1 diff');
    } else if (diffImages.length > 1) {
      title.push(String(diffImages.length) + ' diffs');
    }
    if (newImages.length) {
      title.push(String(newImages.length) + ' new');
    }

    if (!title.length) {
      return 'Happo';
    }

    return String(title.join(', ')) + ' \xB7 Happo';
  }

  return pageTitle;
}();