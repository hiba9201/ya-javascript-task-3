'use strict';

exports.wrap = function (obj) {
    const check = {
        isNull: function () {
            return obj === null;
        },
        containsKeys: function (keys) {
            return checkObjTypes(obj, [Object, Array]) &&
                contains(Object.keys(obj), keys);
        },
        hasKeys: function (keys) {
            return checkObjTypes(obj, [Object, Array]) &&
                has(Object.keys(obj), keys);
        },
        containsValues: function (values) {
            return checkObjTypes(obj, [Object, Array]) &&
                contains(Object.values(obj), values);
        },
        hasValues: function (values) {
            return checkObjTypes(obj, [Object, Array]) &&
                has(Object.values(obj), values);
        },
        hasValueType: function (key, type) {
            return checkObjTypes(obj, [Object, Array]) &&
                hasValueType(obj, key, type);
        },
        hasParamsCount: function (count) {
            return checkObjTypes(obj, [Function]) && checkLengthValue(obj, count);
        },
        hasLength: function (length) {
            return checkObjTypes(obj, [String, Array]) &&
                checkLengthValue(obj, length);
        },
        hasWordsCount: function (count) {
            return checkObjTypes(obj, [String]) && hasWordsCount(obj, count);
        }
    };
    check.not = createNot(check);

    return check;
};

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            const check = {
                containsKeys: contains.bind(null, Object.keys(this)),
                hasKeys: has.bind(null, Object.keys(this)),
                containsValues: contains.bind(null, Object.values(this)),
                hasValues: has.bind(null, Object.values(this)),
                hasValueType: hasValueType.bind(null, this)
            };
            check.not = createNot(check);

            return check;
        }
    });
    Object.defineProperty(Function.prototype, 'check', {
        get: function () {
            const check = {
                hasParamsCount: checkLengthValue.bind(null, this)
            };
            check.not = createNot(check);

            return check;
        }
    });
    Object.defineProperty(String.prototype, 'check', {
        get: function () {
            const check = {
                hasLength: checkLengthValue.bind(null, this),
                hasWordsCount: hasWordsCount.bind(null, this)
            };
            check.not = createNot(check);

            return check;
        }
    });
    Object.defineProperty(Array.prototype, 'check', {
        get: function () {
            const check = {
                hasLength: checkLengthValue.bind(null, this),
                containsKeys: contains.bind(null, Object.keys(this)),
                hasKeys: has.bind(null, Object.keys(this)),
                containsValues: contains.bind(null, Object.values(this)),
                hasValues: has.bind(null, Object.values(this)),
                hasValueType: hasValueType.bind(null, this)
            };
            check.not = createNot(check);

            return check;
        }
    });
};

const availableTypes = [String, Number, Function, Array];

function checkObjTypes(obj, types) {
    for (const type of types) {
        if (obj instanceof type) {
            return true;
        }
    }

    return false;
}

function negotiate(predicate, ...args) {
    return !predicate(...args);
}

function createNot(obj) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[key] = negotiate.bind(null, obj[key]);
    });

    return newObj;
}

function contains(containing, contained) {
    return contained.every(key => containing.includes(key));
}

function has(containing, contained) {
    return containing.every(key => contained.includes(key)) &&
        contained.every(key => containing.includes(key));
}

function hasValueType(obj, key, type) {
    if (!availableTypes.includes(type)) {
        throw new TypeError('Given type is not supported!');
    }

    return Object.keys(obj).includes(key) && obj[key].constructor === type;
}

function checkLengthValue(obj, count) {
    return obj.length === count;
}

function hasWordsCount(str, count) {
    return str.split(' ').filter(Boolean).length === count;
}
