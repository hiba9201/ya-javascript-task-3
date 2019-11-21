'use strict';

exports.wrap = function (obj) {
    return {
        obj: obj,
        isNull: function () {
            return this.obj === null;
        },
        containsKeys: function (keys) {
            return (this.obj instanceof Object || this.obj instanceof Array) &&
                contains(keys, Object.keys(this.obj));
        },
        hasKeys: function (keys) {
            return (this.obj instanceof Object || this.obj instanceof Array) &&
                has(keys, Object.keys(this.obj));
        },
        containsValues: function (values) {
            return (this.obj instanceof Object || this.obj instanceof Array) &&
                contains(values, Object.values(this.obj));
        },
        hasValues: function (values) {
            return (this.obj instanceof Object || this.obj instanceof Array) &&
                has(values, Object.values(this.obj));
        },
        hasValueType: function (key, type) {
            return (this.obj instanceof Object || this.obj instanceof Array) &&
                hasValueType(key, type, this.obj);
        },
        hasParamsCount: function (count) {
            return this.obj instanceof Function && hasLength(count, this.obj);
        },
        hasLength: function (length) {
            return (this.obj instanceof String || this.obj instanceof Array) &&
                hasLength(length, this.obj);
        },
        hasWordsCount: function (count) {
            return this.obj instanceof String && hasWordsCount(count, this.obj);
        },
        not: {
            isNull: function () {
                return this.obj !== null;
            },
            containsKeys: function (keys) {
                return !((this.obj instanceof Object || this.obj instanceof Array) &&
                    contains(keys, Object.keys(this.obj)));
            },
            hasKeys: function (keys) {
                return !((this.obj instanceof Object || this.obj instanceof Array) &&
                    has(keys, Object.keys(this.obj)));
            },
            containsValues: function (values) {
                return !((this.obj instanceof Object || this.obj instanceof Array) &&
                    contains(values, Object.values(this.obj)));
            },
            hasValues: function (values) {
                return !((this.obj instanceof Object || this.obj instanceof Array) &&
                    has(values, Object.values(this.obj)));
            },
            hasValueType: function (key, type) {
                return !((this.obj instanceof Object || this.obj instanceof Array) &&
                    hasValueType(key, type, this.obj));
            },
            hasParamsCount: function (count) {
                return !(this.obj instanceof Function && hasLength(count, this.obj));
            },
            hasLength: function (length) {
                return !((this.obj instanceof String || this.obj instanceof Array) &&
                    hasLength(length, this.obj));
            },
            hasWordsCount: function (count) {
                return !(this.obj instanceof String && hasWordsCount(count, this.obj));
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
    return containing.every(key => contained.includes(key));
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
