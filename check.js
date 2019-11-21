'use strict';

exports.wrap = function (obj) {
    return {
        isNull: function () {
            return obj === null;
        },
        containsKeys: function (keys) {
            return (obj instanceof Object || obj instanceof Array) &&
                contains(keys, Object.keys(obj));
        },
        hasKeys: function (keys) {
            return (obj instanceof Object || obj instanceof Array) &&
                has(keys, Object.keys(obj));
        },
        containsValues: function (values) {
            return (obj instanceof Object || obj instanceof Array) &&
                contains(values, Object.values(obj));
        },
        hasValues: function (values) {
            return (obj instanceof Object || obj instanceof Array) &&
                has(values, Object.values(obj));
        },
        hasValueType: function (key, type) {
            return (obj instanceof Object || obj instanceof Array) &&
                hasValueType(key, type, obj);
        },
        hasParamsCount: function (count) {
            return obj instanceof Function && hasLength(count, obj);
        },
        hasLength: function (length) {
            return (obj instanceof String || obj instanceof Array) &&
                hasLength(length, obj);
        },
        hasWordsCount: function (count) {
            return obj instanceof String && hasWordsCount(count, obj);
        },
        not: {
            isNull: () => {
                return obj !== null;
            },
            containsKeys: function (keys) {
                return !((obj instanceof Object || obj instanceof Array) &&
                    contains(keys, Object.keys(obj)));
            },
            hasKeys: function (keys) {
                return !((obj instanceof Object || obj instanceof Array) &&
                    has(keys, Object.keys(obj)));
            },
            containsValues: function (values) {
                return !((obj instanceof Object || obj instanceof Array) &&
                    contains(values, Object.values(obj)));
            },
            hasValues: function (values) {
                return !((obj instanceof Object || obj instanceof Array) &&
                    has(values, Object.values(obj)));
            },
            hasValueType: function (key, type) {
                return !((obj instanceof Object || obj instanceof Array) &&
                    hasValueType(key, type, obj));
            },
            hasParamsCount: function (count) {
                return !(obj instanceof Function && hasLength(count, obj));
            },
            hasLength: function (length) {
                return !((obj instanceof String || obj instanceof Array) &&
                    hasLength(length, obj));
            },
            hasWordsCount: function (count) {
                return !(obj instanceof String && hasWordsCount(count, obj));
            }
        }
    };
};

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            return {
                containsKeys: (keys) => contains(keys, Object.keys(this)),
                hasKeys: (keys) => has(keys, Object.keys(this)),
                containsValues: (values) => contains(values, Object.values(this)),
                hasValues: (values) => has(values, Object.values(this)),
                hasValueType: (key, type) => hasValueType(key, type, this),
                not: {
                    containsKeys: (keys) => !contains(keys, Object.keys(this)),
                    hasKeys: (keys) => !has(keys, Object.keys(this)),
                    containsValues: (values) => !contains(values, Object.values(this)),
                    hasValues: (values) => !has(values, Object.values(this)),
                    hasValueType: (key, type) => !hasValueType(key, type, this)
                }
            };
        }
    });
    Object.defineProperty(Function.prototype, 'check', {
        get: function () {
            return {
                hasParamsCount: count => hasLength(count, this),
                not: {
                    hasParamsCount: count => !hasLength(count, this)
                }
            };
        }
    });
    Object.defineProperty(String.prototype, 'check', {
        get: function () {
            return {
                hasLength: (length) => hasLength(length, this),
                hasWordsCount: count => hasWordsCount(count, this),
                not: {
                    hasLength: (length) => !hasLength(length, this),
                    hasWordsCount: count => !hasWordsCount(count, this)
                }
            };
        }
    });
    Object.defineProperty(Array.prototype, 'check', {
        get: function () {
            return {
                hasLength: (length) => hasLength(length, this),
                containsKeys: (keys) => contains(keys, Object.keys(this)),
                hasKeys: (keys) => has(keys, Object.keys(this)),
                containsValues: (values) => contains(values, Object.values(this)),
                hasValues: (values) => has(values, Object.values(this)),
                hasValueType: (key, type) => hasValueType(key, type, this),
                not: {
                    hasLength: (length) => !hasLength(length, this),
                    containsKeys: (keys) => !contains(keys, Object.keys(this)),
                    hasKeys: (keys) => !has(keys, Object.keys(this)),
                    containsValues: (values) => !contains(values, Object.values(this)),
                    hasValues: (values) => !has(values, Object.values(this)),
                    hasValueType: (key, type) => !hasValueType(key, type, this)
                }
            };
        }
    });
};

function contains(contained, containing) {
    return contained.every(key => containing.includes(key));
}
function has(contained, containing) {
    return containing.every(key => contained.includes(key)) &&
        contained.every(key => containing.includes(key));
}
function hasValueType(key, type, obj) {
    const availableTypes = [String, Number, Function, Array];
    if (!availableTypes.includes(type)) {
        throw new TypeError('Given type is not supported!');
    }

    return Object.keys(obj).includes(key) && obj[key].constructor === type;
}

function hasLength(count, obj) {
    return obj.length === count;
}

function hasWordsCount(count, str) {
    return str.split(/ +/).filter(word => Boolean(word.length)).length === count;
}
