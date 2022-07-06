"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTranslator = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createTranslator = function createTranslator(_ref) {
  var language = _ref.language,
      translations = _ref.translations,
      _ref$replaceString = _ref.replaceString,
      replaceString = _ref$replaceString === void 0 ? '###' : _ref$replaceString,
      _ref$linebreakString = _ref.linebreakString,
      linebreakString = _ref$linebreakString === void 0 ? '///' : _ref$linebreakString;

  var translate = function translate(term) {
    try {
      var alias = translations[term].alias;

      if (alias) {
        return translations[alias][language];
      }

      return translations[term][language];
    } catch (error) {
      return term;
    }
  };

  var t = function t(term, replace) {
    var terms = Array.isArray(term) ? term : [term];

    if (replace) {
      var _terms = _toArray(terms),
          mainTerm = _terms[0],
          subTerms = _terms.slice(1);

      var mainTranslation = translate(mainTerm);
      return mainTranslation.replace(replaceString, subTerms.map(translate).join(' ')).replace(linebreakString, '\n');
    } else {
      return terms.map(function (term) {
        return translate(term);
      }).join(' ').replace(linebreakString, '\n');
    }
  };

  var pluralize = function pluralize(term) {
    return "".concat(term, "s");
  };

  return {
    t: t,
    pluralize: pluralize
  };
};

exports.createTranslator = createTranslator;