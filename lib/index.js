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

var escapeString = function escapeString(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

var createTranslator = function createTranslator(_ref) {
  var language = _ref.language,
      translations = _ref.translations,
      _ref$replaceString = _ref.replaceString,
      replaceString = _ref$replaceString === void 0 ? '###' : _ref$replaceString,
      _ref$linebreakString = _ref.linebreakString,
      linebreakString = _ref$linebreakString === void 0 ? '///' : _ref$linebreakString,
      _ref$noWrapString = _ref.noWrapString,
      noWrapString = _ref$noWrapString === void 0 ? '+++' : _ref$noWrapString;

  var translate = function translate(term, capitalize) {
    var translation;

    try {
      var alias = translations[term].alias;

      if (alias) {
        translation = translations[alias][language];
      }

      translation = translations[term][language];
    } catch (error) {
      translation = term;
    }

    return capitalize ? translation.charAt(0).toUpperCase() + translation.slice(1) : translation;
  };

  var t = function t(term, options) {
    var terms = Array.isArray(term) ? term : [term];

    if (options !== null && options !== void 0 && options.replace) {
      var _terms = _toArray(terms),
          mainTerm = _terms[0],
          subTerms = _terms.slice(1);

      var mainTranslation = translate(mainTerm);
      return mainTranslation.replace(replaceString, subTerms.map(function (term) {
        return translate(term, options.capitalize);
      }).join(' ')).replace(new RegExp(escapeString(linebreakString), 'g'), '\n').replace(new RegExp(escapeString(noWrapString), 'g'), "\xA0");
    } else {
      return terms.map(function (term) {
        return translate(term, options === null || options === void 0 ? void 0 : options.capitalize);
      }).join(' ').replace(new RegExp(escapeString(linebreakString), 'g'), '\n').replace(new RegExp(escapeString(noWrapString), 'g'), "\xA0");
    }
  };

  var pluralize = function pluralize(term) {
    return "".concat(term, "s");
  };

  return {
    t: t,
    pluralize: pluralize,
    replaceString: replaceString,
    linebreakString: linebreakString,
    noWrapString: noWrapString
  };
};

exports.createTranslator = createTranslator;