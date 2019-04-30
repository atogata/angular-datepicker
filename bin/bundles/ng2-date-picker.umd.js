(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('moment'), require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ng2-date-picker', ['exports', '@angular/common', 'moment', '@angular/core', '@angular/forms'], factory) :
    (factory((global['ng2-date-picker'] = {}),global.ng.common,global.momentNs,global.ng.core,global.ng.forms));
}(this, (function (exports,common,momentNs,core,forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ECalendarMode = {
        Day: 0,
        DayTime: 1,
        Month: 2,
        Time: 3,
        Year: 4,
    };
    ECalendarMode[ECalendarMode.Day] = 'Day';
    ECalendarMode[ECalendarMode.DayTime] = 'DayTime';
    ECalendarMode[ECalendarMode.Month] = 'Month';
    ECalendarMode[ECalendarMode.Time] = 'Time';
    ECalendarMode[ECalendarMode.Year] = 'Year';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var ECalendarValue = {
        Moment: 1,
        MomentArr: 2,
        String: 3,
        StringArr: 4,
    };
    ECalendarValue[ECalendarValue.Moment] = 'Moment';
    ECalendarValue[ECalendarValue.MomentArr] = 'MomentArr';
    ECalendarValue[ECalendarValue.String] = 'String';
    ECalendarValue[ECalendarValue.StringArr] = 'StringArr';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var SelectEvent = {
        INPUT: 'input',
        SELECTION: 'selection',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DomHelper = /** @class */ (function () {
        function DomHelper() {
        }
        /**
         * @private
         * @param {?} element
         * @param {?} container
         * @param {?} anchor
         * @param {?} drops
         * @return {?}
         */
        DomHelper.setYAxisPosition = /**
         * @private
         * @param {?} element
         * @param {?} container
         * @param {?} anchor
         * @param {?} drops
         * @return {?}
         */
            function (element, container, anchor, drops) {
                /** @type {?} */
                var anchorRect = anchor.getBoundingClientRect();
                /** @type {?} */
                var containerRect = container.getBoundingClientRect();
                /** @type {?} */
                var bottom = anchorRect.bottom - containerRect.top;
                /** @type {?} */
                var top = anchorRect.top - containerRect.top;
                if (drops === 'down') {
                    element.style.top = (bottom + 1 + 'px');
                }
                else {
                    element.style.top = (top - 1 - element.scrollHeight) + 'px';
                }
            };
        /**
         * @private
         * @param {?} element
         * @param {?} container
         * @param {?} anchor
         * @param {?} dimElem
         * @param {?} opens
         * @return {?}
         */
        DomHelper.setXAxisPosition = /**
         * @private
         * @param {?} element
         * @param {?} container
         * @param {?} anchor
         * @param {?} dimElem
         * @param {?} opens
         * @return {?}
         */
            function (element, container, anchor, dimElem, opens) {
                /** @type {?} */
                var anchorRect = anchor.getBoundingClientRect();
                /** @type {?} */
                var containerRect = container.getBoundingClientRect();
                /** @type {?} */
                var left = anchorRect.left - containerRect.left;
                if (opens === 'right') {
                    element.style.left = left + 'px';
                }
                else {
                    element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
                }
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DomHelper.isTopInView = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                var top = el.getBoundingClientRect().top;
                return (top >= 0);
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DomHelper.isBottomInView = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                var bottom = el.getBoundingClientRect().bottom;
                return (bottom <= window.innerHeight);
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DomHelper.isLeftInView = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                var left = el.getBoundingClientRect().left;
                return (left >= 0);
            };
        /**
         * @private
         * @param {?} el
         * @return {?}
         */
        DomHelper.isRightInView = /**
         * @private
         * @param {?} el
         * @return {?}
         */
            function (el) {
                var right = el.getBoundingClientRect().right;
                return (right <= window.innerWidth);
            };
        /**
         * @param {?} config
         * @return {?}
         */
        DomHelper.prototype.appendElementToPosition = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                var _this = this;
                var container = config.container, element = config.element;
                if (!container.style.position || container.style.position === 'static') {
                    container.style.position = 'relative';
                }
                if (element.style.position !== 'absolute') {
                    element.style.position = 'absolute';
                }
                element.style.visibility = 'hidden';
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    _this.setElementPosition(config);
                    element.style.visibility = 'visible';
                }));
            };
        /**
         * @param {?} __0
         * @return {?}
         */
        DomHelper.prototype.setElementPosition = /**
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var element = _a.element, container = _a.container, anchor = _a.anchor, dimElem = _a.dimElem, drops = _a.drops, opens = _a.opens;
                DomHelper.setYAxisPosition(element, container, anchor, 'down');
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
                if (drops !== 'down' && drops !== 'up') {
                    if (DomHelper.isBottomInView(dimElem)) {
                        DomHelper.setYAxisPosition(element, container, anchor, 'down');
                    }
                    else if (DomHelper.isTopInView(dimElem)) {
                        DomHelper.setYAxisPosition(element, container, anchor, 'up');
                    }
                }
                else {
                    DomHelper.setYAxisPosition(element, container, anchor, drops);
                }
                if (opens !== 'left' && opens !== 'right') {
                    if (DomHelper.isRightInView(dimElem)) {
                        DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
                    }
                    else if (DomHelper.isLeftInView(dimElem)) {
                        DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'left');
                    }
                }
                else {
                    DomHelper.setXAxisPosition(element, container, anchor, dimElem, opens);
                }
            };
        DomHelper.decorators = [
            { type: core.Injectable }
        ];
        return DomHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = momentNs;
    var UtilsService = /** @class */ (function () {
        function UtilsService() {
        }
        /**
         * @param {?} func
         * @param {?} wait
         * @return {?}
         */
        UtilsService.debounce = /**
         * @param {?} func
         * @param {?} wait
         * @return {?}
         */
            function (func, wait) {
                /** @type {?} */
                var timeout;
                return ( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var context = this;
                    /** @type {?} */
                    var args = arguments;
                    timeout = clearTimeout(timeout);
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        func.apply(context, args);
                    }), wait);
                });
            };
        /**
         * @param {?} size
         * @return {?}
         */
        UtilsService.prototype.createArray = /**
         * @param {?} size
         * @return {?}
         */
            function (size) {
                return new Array(size).fill(1);
            };
        /**
         * @param {?} date
         * @param {?} format
         * @return {?}
         */
        UtilsService.prototype.convertToMoment = /**
         * @param {?} date
         * @param {?} format
         * @return {?}
         */
            function (date, format) {
                if (!date) {
                    return null;
                }
                else if (typeof date === 'string') {
                    return moment(date, format);
                }
                else {
                    return date.clone();
                }
            };
        /**
         * @param {?} date
         * @param {?} format
         * @return {?}
         */
        UtilsService.prototype.isDateValid = /**
         * @param {?} date
         * @param {?} format
         * @return {?}
         */
            function (date, format) {
                if (date === '') {
                    return true;
                }
                return moment(date, format, true).isValid();
            };
        // todo:: add unit test
        // todo:: add unit test
        /**
         * @param {?} current
         * @param {?} selected
         * @param {?} allowMultiSelect
         * @param {?} minDate
         * @return {?}
         */
        UtilsService.prototype.getDefaultDisplayDate =
            // todo:: add unit test
            /**
             * @param {?} current
             * @param {?} selected
             * @param {?} allowMultiSelect
             * @param {?} minDate
             * @return {?}
             */
            function (current, selected, allowMultiSelect, minDate) {
                if (current) {
                    return current.clone();
                }
                else if (minDate && minDate.isAfter(moment())) {
                    return minDate.clone();
                }
                else if (allowMultiSelect) {
                    if (selected && selected[selected.length]) {
                        return selected[selected.length].clone();
                    }
                }
                else if (selected && selected[0]) {
                    return selected[0].clone();
                }
                return moment();
            };
        // todo:: add unit test
        // todo:: add unit test
        /**
         * @param {?} value
         * @param {?} allowMultiSelect
         * @return {?}
         */
        UtilsService.prototype.getInputType =
            // todo:: add unit test
            /**
             * @param {?} value
             * @param {?} allowMultiSelect
             * @return {?}
             */
            function (value, allowMultiSelect) {
                if (Array.isArray(value)) {
                    if (!value.length) {
                        return ECalendarValue.MomentArr;
                    }
                    else if (typeof value[0] === 'string') {
                        return ECalendarValue.StringArr;
                    }
                    else if (moment.isMoment(value[0])) {
                        return ECalendarValue.MomentArr;
                    }
                }
                else {
                    if (typeof value === 'string') {
                        return ECalendarValue.String;
                    }
                    else if (moment.isMoment(value)) {
                        return ECalendarValue.Moment;
                    }
                }
                return allowMultiSelect ? ECalendarValue.MomentArr : ECalendarValue.Moment;
            };
        // todo:: add unit test
        // todo:: add unit test
        /**
         * @param {?} value
         * @param {?} format
         * @param {?} allowMultiSelect
         * @return {?}
         */
        UtilsService.prototype.convertToMomentArray =
            // todo:: add unit test
            /**
             * @param {?} value
             * @param {?} format
             * @param {?} allowMultiSelect
             * @return {?}
             */
            function (value, format, allowMultiSelect) {
                switch (this.getInputType(value, allowMultiSelect)) {
                    case (ECalendarValue.String):
                        return value ? [moment(( /** @type {?} */(value)), format, true)] : [];
                    case (ECalendarValue.StringArr):
                        return (( /** @type {?} */(value))).map(( /**
                         * @param {?} v
                         * @return {?}
                         */function (v) { return v ? moment(v, format, true) : null; })).filter(Boolean);
                    case (ECalendarValue.Moment):
                        return value ? [(( /** @type {?} */(value))).clone()] : [];
                    case (ECalendarValue.MomentArr):
                        return (( /** @type {?} */(value)) || []).map(( /**
                         * @param {?} v
                         * @return {?}
                         */function (v) { return v.clone(); }));
                    default:
                        return [];
                }
            };
        // todo:: add unit test
        // todo:: add unit test
        /**
         * @param {?} format
         * @param {?} value
         * @param {?} convertTo
         * @return {?}
         */
        UtilsService.prototype.convertFromMomentArray =
            // todo:: add unit test
            /**
             * @param {?} format
             * @param {?} value
             * @param {?} convertTo
             * @return {?}
             */
            function (format, value, convertTo) {
                switch (convertTo) {
                    case (ECalendarValue.String):
                        return value[0] && value[0].format(format);
                    case (ECalendarValue.StringArr):
                        return value.filter(Boolean).map(( /**
                         * @param {?} v
                         * @return {?}
                         */function (v) { return v.format(format); }));
                    case (ECalendarValue.Moment):
                        return value[0] ? value[0].clone() : value[0];
                    case (ECalendarValue.MomentArr):
                        return value ? value.map(( /**
                         * @param {?} v
                         * @return {?}
                         */function (v) { return v.clone(); })) : value;
                    default:
                        return value;
                }
            };
        /**
         * @param {?} value
         * @param {?} format
         * @return {?}
         */
        UtilsService.prototype.convertToString = /**
         * @param {?} value
         * @param {?} format
         * @return {?}
         */
            function (value, format) {
                var _this = this;
                /** @type {?} */
                var tmpVal;
                if (typeof value === 'string') {
                    tmpVal = [value];
                }
                else if (Array.isArray(value)) {
                    if (value.length) {
                        tmpVal = (( /** @type {?} */(value))).map(( /**
                         * @param {?} v
                         * @return {?}
                         */function (v) {
                            return _this.convertToMoment(v, format).format(format);
                        }));
                    }
                    else {
                        tmpVal = ( /** @type {?} */(value));
                    }
                }
                else if (moment.isMoment(value)) {
                    tmpVal = [value.format(format)];
                }
                else {
                    return '';
                }
                return tmpVal.filter(Boolean).join(' | ');
            };
        // todo:: add unit test
        // todo:: add unit test
        /**
         * @template T
         * @param {?} obj
         * @return {?}
         */
        UtilsService.prototype.clearUndefined =
            // todo:: add unit test
            /**
             * @template T
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                if (!obj) {
                    return obj;
                }
                Object.keys(obj).forEach(( /**
                 * @param {?} key
                 * @return {?}
                 */function (key) { return (obj[key] === undefined) && delete obj[key]; }));
                return obj;
            };
        /**
         * @param {?} isMultiple
         * @param {?} currentlySelected
         * @param {?} date
         * @param {?=} granularity
         * @return {?}
         */
        UtilsService.prototype.updateSelected = /**
         * @param {?} isMultiple
         * @param {?} currentlySelected
         * @param {?} date
         * @param {?=} granularity
         * @return {?}
         */
            function (isMultiple, currentlySelected, date, granularity) {
                if (granularity === void 0) {
                    granularity = 'day';
                }
                if (isMultiple) {
                    return !date.selected
                        ? currentlySelected.concat([date.date])
                        : currentlySelected.filter(( /**
                         * @param {?} d
                         * @return {?}
                         */function (d) { return !d.isSame(date.date, granularity); }));
                }
                else {
                    return !date.selected ? [date.date] : [];
                }
            };
        /**
         * @param {?} element
         * @param {?} selector
         * @return {?}
         */
        UtilsService.prototype.closestParent = /**
         * @param {?} element
         * @param {?} selector
         * @return {?}
         */
            function (element, selector) {
                if (!element) {
                    return undefined;
                }
                /** @type {?} */
                var match = ( /** @type {?} */(element.querySelector(selector)));
                return match || this.closestParent(element.parentElement, selector);
            };
        /**
         * @param {?} m
         * @return {?}
         */
        UtilsService.prototype.onlyTime = /**
         * @param {?} m
         * @return {?}
         */
            function (m) {
                return m && moment.isMoment(m) && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
            };
        /**
         * @param {?} calendarType
         * @return {?}
         */
        UtilsService.prototype.granularityFromType = /**
         * @param {?} calendarType
         * @return {?}
         */
            function (calendarType) {
                switch (calendarType) {
                    case 'time':
                        return 'second';
                    case 'daytime':
                        return 'second';
                    default:
                        return calendarType;
                }
            };
        /**
         * @param {?} __0
         * @param {?} format
         * @param {?} calendarType
         * @return {?}
         */
        UtilsService.prototype.createValidator = /**
         * @param {?} __0
         * @param {?} format
         * @param {?} calendarType
         * @return {?}
         */
            function (_a, format, calendarType) {
                var _this = this;
                var minDate = _a.minDate, maxDate = _a.maxDate, minTime = _a.minTime, maxTime = _a.maxTime;
                /** @type {?} */
                var isValid;
                /** @type {?} */
                var value;
                /** @type {?} */
                var validators = [];
                /** @type {?} */
                var granularity = this.granularityFromType(calendarType);
                if (minDate) {
                    /** @type {?} */
                    var md_1 = this.convertToMoment(minDate, format);
                    validators.push({
                        key: 'minDate',
                        isValid: ( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var _isValid = value.every(( /**
                             * @param {?} val
                             * @return {?}
                             */function (val) { return val.isSameOrAfter(md_1, granularity); }));
                            isValid = isValid ? _isValid : false;
                            return _isValid;
                        })
                    });
                }
                if (maxDate) {
                    /** @type {?} */
                    var md_2 = this.convertToMoment(maxDate, format);
                    validators.push({
                        key: 'maxDate',
                        isValid: ( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var _isValid = value.every(( /**
                             * @param {?} val
                             * @return {?}
                             */function (val) { return val.isSameOrBefore(md_2, granularity); }));
                            isValid = isValid ? _isValid : false;
                            return _isValid;
                        })
                    });
                }
                if (minTime) {
                    /** @type {?} */
                    var md_3 = this.onlyTime(this.convertToMoment(minTime, format));
                    validators.push({
                        key: 'minTime',
                        isValid: ( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var _isValid = value.every(( /**
                             * @param {?} val
                             * @return {?}
                             */function (val) { return _this.onlyTime(val).isSameOrAfter(md_3); }));
                            isValid = isValid ? _isValid : false;
                            return _isValid;
                        })
                    });
                }
                if (maxTime) {
                    /** @type {?} */
                    var md_4 = this.onlyTime(this.convertToMoment(maxTime, format));
                    validators.push({
                        key: 'maxTime',
                        isValid: ( /**
                         * @return {?}
                         */function () {
                            /** @type {?} */
                            var _isValid = value.every(( /**
                             * @param {?} val
                             * @return {?}
                             */function (val) { return _this.onlyTime(val).isSameOrBefore(md_4); }));
                            isValid = isValid ? _isValid : false;
                            return _isValid;
                        })
                    });
                }
                return ( /**
                 * @param {?} inputVal
                 * @return {?}
                 */function (inputVal) {
                    isValid = true;
                    value = _this.convertToMomentArray(inputVal, format, true).filter(Boolean);
                    if (!value.every(( /**
                     * @param {?} val
                     * @return {?}
                     */function (val) { return val.isValid(); }))) {
                        return {
                            format: {
                                given: inputVal
                            }
                        };
                    }
                    /** @type {?} */
                    var errors = validators.reduce(( /**
                     * @param {?} map
                     * @param {?} err
                     * @return {?}
                     */function (map, err) {
                        if (!err.isValid()) {
                            map[err.key] = {
                                given: value
                            };
                        }
                        return map;
                    }), {});
                    return !isValid ? errors : null;
                });
            };
        /**
         * @param {?} value
         * @return {?}
         */
        UtilsService.prototype.datesStringToStringArray = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return (value || '').split('|').map(( /**
                 * @param {?} m
                 * @return {?}
                 */function (m) { return m.trim(); })).filter(Boolean);
            };
        /**
         * @param {?} value
         * @param {?} format
         * @return {?}
         */
        UtilsService.prototype.getValidMomentArray = /**
         * @param {?} value
         * @param {?} format
         * @return {?}
         */
            function (value, format) {
                var _this = this;
                return this.datesStringToStringArray(value)
                    .filter(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return _this.isDateValid(d, format); }))
                    .map(( /**
             * @param {?} d
             * @return {?}
             */function (d) { return moment(d, format); }));
            };
        /**
         * @param {?} showGoToCurrent
         * @param {?} mode
         * @param {?} min
         * @param {?} max
         * @return {?}
         */
        UtilsService.prototype.shouldShowCurrent = /**
         * @param {?} showGoToCurrent
         * @param {?} mode
         * @param {?} min
         * @param {?} max
         * @return {?}
         */
            function (showGoToCurrent, mode, min, max) {
                return showGoToCurrent &&
                    mode !== 'time' &&
                    this.isDateInRange(moment(), min, max);
            };
        /**
         * @param {?} date
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
        UtilsService.prototype.isDateInRange = /**
         * @param {?} date
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
            function (date, from, to) {
                return date.isBetween(from, to, 'day', '[]');
            };
        /**
         * @param {?} obj
         * @param {?} format
         * @param {?} props
         * @return {?}
         */
        UtilsService.prototype.convertPropsToMoment = /**
         * @param {?} obj
         * @param {?} format
         * @param {?} props
         * @return {?}
         */
            function (obj, format, props) {
                var _this = this;
                props.forEach(( /**
                 * @param {?} prop
                 * @return {?}
                 */function (prop) {
                    if (obj.hasOwnProperty(prop)) {
                        obj[prop] = _this.convertToMoment(obj[prop], format);
                    }
                }));
            };
        /**
         * @template T
         * @param {?} prevConf
         * @param {?} currentConf
         * @return {?}
         */
        UtilsService.prototype.shouldResetCurrentView = /**
         * @template T
         * @param {?} prevConf
         * @param {?} currentConf
         * @return {?}
         */
            function (prevConf, currentConf) {
                if (prevConf && currentConf) {
                    if (!prevConf.min && currentConf.min) {
                        return true;
                    }
                    else if (prevConf.min && currentConf.min && !prevConf.min.isSame(currentConf.min, 'd')) {
                        return true;
                    }
                    else if (!prevConf.max && currentConf.max) {
                        return true;
                    }
                    else if (prevConf.max && currentConf.max && !prevConf.max.isSame(currentConf.max, 'd')) {
                        return true;
                    }
                    return false;
                }
                return false;
            };
        /**
         * @param {?} elem
         * @return {?}
         */
        UtilsService.prototype.getNativeElement = /**
         * @param {?} elem
         * @return {?}
         */
            function (elem) {
                if (!elem) {
                    return null;
                }
                else if (typeof elem === 'string') {
                    return ( /** @type {?} */(document.querySelector(elem)));
                }
                else {
                    return elem;
                }
            };
        UtilsService.decorators = [
            { type: core.Injectable }
        ];
        return UtilsService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$1 = momentNs;
    var DayCalendarService = /** @class */ (function () {
        function DayCalendarService(utilsService) {
            this.utilsService = utilsService;
            this.DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
            this.DEFAULT_CONFIG = {
                showNearMonthDays: true,
                showWeekNumbers: false,
                firstDayOfWeek: 'su',
                weekDayFormat: 'ddd',
                format: 'DD-MM-YYYY',
                allowMultiSelect: false,
                monthFormat: 'MMM, YYYY',
                enableMonthSelector: true,
                locale: moment$1.locale(),
                dayBtnFormat: 'DD',
                unSelectOnClick: true
            };
        }
        /**
         * @private
         * @param {?} currentMonth
         * @param {?} monthArray
         * @return {?}
         */
        DayCalendarService.prototype.removeNearMonthWeeks = /**
         * @private
         * @param {?} currentMonth
         * @param {?} monthArray
         * @return {?}
         */
            function (currentMonth, monthArray) {
                if (monthArray[monthArray.length - 1].find(( /**
                 * @param {?} day
                 * @return {?}
                 */function (day) { return day.date.isSame(currentMonth, 'month'); }))) {
                    return monthArray;
                }
                else {
                    return monthArray.slice(0, -1);
                }
            };
        /**
         * @param {?} config
         * @return {?}
         */
        DayCalendarService.prototype.getConfig = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                /** @type {?} */
                var _config = ( /** @type {?} */(__assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
                this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
                moment$1.locale(_config.locale);
                return _config;
            };
        /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        DayCalendarService.prototype.generateDaysMap = /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
            function (firstDayOfWeek) {
                /** @type {?} */
                var firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
                /** @type {?} */
                var daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
                return daysArr.reduce(( /**
                 * @param {?} map
                 * @param {?} day
                 * @param {?} index
                 * @return {?}
                 */function (map, day, index) {
                    map[day] = index;
                    return map;
                }), ( /** @type {?} */({})));
            };
        /**
         * @param {?} config
         * @param {?} month
         * @param {?} selected
         * @return {?}
         */
        DayCalendarService.prototype.generateMonthArray = /**
         * @param {?} config
         * @param {?} month
         * @param {?} selected
         * @return {?}
         */
            function (config, month, selected) {
                var _this = this;
                /** @type {?} */
                var monthArray = [];
                /** @type {?} */
                var firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
                /** @type {?} */
                var firstDayOfBoard = month.clone().startOf('month');
                while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
                    firstDayOfBoard.subtract(1, 'day');
                }
                /** @type {?} */
                var current = firstDayOfBoard.clone();
                /** @type {?} */
                var prevMonth = month.clone().subtract(1, 'month');
                /** @type {?} */
                var nextMonth = month.clone().add(1, 'month');
                /** @type {?} */
                var today = moment$1();
                /** @type {?} */
                var daysOfCalendar = this.utilsService.createArray(42)
                    .reduce(( /**
             * @param {?} array
             * @return {?}
             */function (array) {
                    array.push({
                        date: current.clone(),
                        selected: !!selected.find(( /**
                         * @param {?} selectedDay
                         * @return {?}
                         */function (selectedDay) { return current.isSame(selectedDay, 'day'); })),
                        currentMonth: current.isSame(month, 'month'),
                        prevMonth: current.isSame(prevMonth, 'month'),
                        nextMonth: current.isSame(nextMonth, 'month'),
                        currentDay: current.isSame(today, 'day'),
                        disabled: _this.isDateDisabled(current, config)
                    });
                    current.add(1, 'day');
                    return array;
                }), []);
                daysOfCalendar.forEach(( /**
                 * @param {?} day
                 * @param {?} index
                 * @return {?}
                 */function (day, index) {
                    /** @type {?} */
                    var weekIndex = Math.floor(index / 7);
                    if (!monthArray[weekIndex]) {
                        monthArray.push([]);
                    }
                    monthArray[weekIndex].push(day);
                }));
                if (!config.showNearMonthDays) {
                    monthArray = this.removeNearMonthWeeks(month, monthArray);
                }
                return monthArray;
            };
        /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        DayCalendarService.prototype.generateWeekdays = /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
            function (firstDayOfWeek) {
                /** @type {?} */
                var weekdayNames = {
                    su: moment$1().day(0),
                    mo: moment$1().day(1),
                    tu: moment$1().day(2),
                    we: moment$1().day(3),
                    th: moment$1().day(4),
                    fr: moment$1().day(5),
                    sa: moment$1().day(6)
                };
                /** @type {?} */
                var weekdays = [];
                /** @type {?} */
                var daysMap = this.generateDaysMap(firstDayOfWeek);
                for (var dayKey in daysMap) {
                    if (daysMap.hasOwnProperty(dayKey)) {
                        weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
                    }
                }
                return weekdays;
            };
        /**
         * @param {?} date
         * @param {?} config
         * @return {?}
         */
        DayCalendarService.prototype.isDateDisabled = /**
         * @param {?} date
         * @param {?} config
         * @return {?}
         */
            function (date, config) {
                if (config.isDayDisabledCallback) {
                    return config.isDayDisabledCallback(date);
                }
                if (config.min && date.isBefore(config.min, 'day')) {
                    return true;
                }
                return !!(config.max && date.isAfter(config.max, 'day'));
            };
        // todo:: add unit tests
        // todo:: add unit tests
        /**
         * @param {?} config
         * @param {?} month
         * @return {?}
         */
        DayCalendarService.prototype.getHeaderLabel =
            // todo:: add unit tests
            /**
             * @param {?} config
             * @param {?} month
             * @return {?}
             */
            function (config, month) {
                if (config.monthFormatter) {
                    return config.monthFormatter(month);
                }
                return month.format(config.monthFormat);
            };
        // todo:: add unit tests
        // todo:: add unit tests
        /**
         * @param {?} min
         * @param {?} currentMonthView
         * @return {?}
         */
        DayCalendarService.prototype.shouldShowLeft =
            // todo:: add unit tests
            /**
             * @param {?} min
             * @param {?} currentMonthView
             * @return {?}
             */
            function (min, currentMonthView) {
                return min ? min.isBefore(currentMonthView, 'month') : true;
            };
        // todo:: add unit tests
        // todo:: add unit tests
        /**
         * @param {?} max
         * @param {?} currentMonthView
         * @return {?}
         */
        DayCalendarService.prototype.shouldShowRight =
            // todo:: add unit tests
            /**
             * @param {?} max
             * @param {?} currentMonthView
             * @return {?}
             */
            function (max, currentMonthView) {
                return max ? max.isAfter(currentMonthView, 'month') : true;
            };
        /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        DayCalendarService.prototype.generateDaysIndexMap = /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
            function (firstDayOfWeek) {
                /** @type {?} */
                var firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
                /** @type {?} */
                var daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
                return daysArr.reduce(( /**
                 * @param {?} map
                 * @param {?} day
                 * @param {?} index
                 * @return {?}
                 */function (map, day, index) {
                    map[index] = day;
                    return map;
                }), ( /** @type {?} */({})));
            };
        /**
         * @param {?} componentConfig
         * @return {?}
         */
        DayCalendarService.prototype.getMonthCalendarConfig = /**
         * @param {?} componentConfig
         * @return {?}
         */
            function (componentConfig) {
                return this.utilsService.clearUndefined({
                    min: componentConfig.min,
                    max: componentConfig.max,
                    format: componentConfig.format,
                    isNavHeaderBtnClickable: true,
                    allowMultiSelect: false,
                    yearFormat: componentConfig.yearFormat,
                    yearFormatter: componentConfig.yearFormatter,
                    monthBtnFormat: componentConfig.monthBtnFormat,
                    monthBtnFormatter: componentConfig.monthBtnFormatter,
                    monthBtnCssClassCallback: componentConfig.monthBtnCssClassCallback,
                    multipleYearsNavigateBy: componentConfig.multipleYearsNavigateBy,
                    showMultipleYearsNavigation: componentConfig.showMultipleYearsNavigation,
                    showGoToCurrent: componentConfig.showGoToCurrent
                });
            };
        /**
         * @param {?} config
         * @param {?} day
         * @return {?}
         */
        DayCalendarService.prototype.getDayBtnText = /**
         * @param {?} config
         * @param {?} day
         * @return {?}
         */
            function (config, day) {
                if (config.dayBtnFormatter) {
                    return config.dayBtnFormatter(day);
                }
                return day.format(config.dayBtnFormat);
            };
        /**
         * @param {?} config
         * @param {?} day
         * @return {?}
         */
        DayCalendarService.prototype.getDayBtnCssClass = /**
         * @param {?} config
         * @param {?} day
         * @return {?}
         */
            function (config, day) {
                if (config.dayBtnCssClassCallback) {
                    return config.dayBtnCssClassCallback(day);
                }
                return '';
            };
        DayCalendarService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DayCalendarService.ctorParameters = function () {
            return [
                { type: UtilsService }
            ];
        };
        return DayCalendarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$2 = momentNs;
    /** @type {?} */
    var FIRST_PM_HOUR = 12;
    var TimeSelectService = /** @class */ (function () {
        function TimeSelectService(utilsService) {
            this.utilsService = utilsService;
            this.DEFAULT_CONFIG = {
                hours12Format: 'hh',
                hours24Format: 'HH',
                meridiemFormat: 'A',
                minutesFormat: 'mm',
                minutesInterval: 1,
                secondsFormat: 'ss',
                secondsInterval: 1,
                showSeconds: false,
                showTwentyFourHours: false,
                timeSeparator: ':',
                locale: moment$2.locale()
            };
        }
        /**
         * @param {?} config
         * @return {?}
         */
        TimeSelectService.prototype.getConfig = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                /** @type {?} */
                var timeConfigs = {
                    maxTime: this.utilsService.onlyTime(config && config.maxTime),
                    minTime: this.utilsService.onlyTime(config && config.minTime)
                };
                /** @type {?} */
                var _config = ( /** @type {?} */(__assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config), timeConfigs)));
                moment$2.locale(_config.locale);
                return _config;
            };
        /**
         * @param {?} config
         * @return {?}
         */
        TimeSelectService.prototype.getTimeFormat = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
                    + config.timeSeparator + config.minutesFormat
                    + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
                    + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
            };
        /**
         * @param {?} config
         * @param {?} t
         * @return {?}
         */
        TimeSelectService.prototype.getHours = /**
         * @param {?} config
         * @param {?} t
         * @return {?}
         */
            function (config, t) {
                /** @type {?} */
                var time = t || moment$2();
                return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
            };
        /**
         * @param {?} config
         * @param {?} t
         * @return {?}
         */
        TimeSelectService.prototype.getMinutes = /**
         * @param {?} config
         * @param {?} t
         * @return {?}
         */
            function (config, t) {
                /** @type {?} */
                var time = t || moment$2();
                return time && time.format(config.minutesFormat);
            };
        /**
         * @param {?} config
         * @param {?} t
         * @return {?}
         */
        TimeSelectService.prototype.getSeconds = /**
         * @param {?} config
         * @param {?} t
         * @return {?}
         */
            function (config, t) {
                /** @type {?} */
                var time = t || moment$2();
                return time && time.format(config.secondsFormat);
            };
        /**
         * @param {?} config
         * @param {?} time
         * @return {?}
         */
        TimeSelectService.prototype.getMeridiem = /**
         * @param {?} config
         * @param {?} time
         * @return {?}
         */
            function (config, time) {
                return time && time.format(config.meridiemFormat);
            };
        /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
        TimeSelectService.prototype.decrease = /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
            function (config, time, unit) {
                /** @type {?} */
                var amount = 1;
                switch (unit) {
                    case 'minute':
                        amount = config.minutesInterval;
                        break;
                    case 'second':
                        amount = config.secondsInterval;
                        break;
                }
                return time.clone().subtract(amount, unit);
            };
        /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
        TimeSelectService.prototype.increase = /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
            function (config, time, unit) {
                /** @type {?} */
                var amount = 1;
                switch (unit) {
                    case 'minute':
                        amount = config.minutesInterval;
                        break;
                    case 'second':
                        amount = config.secondsInterval;
                        break;
                }
                return time.clone().add(amount, unit);
            };
        /**
         * @param {?} time
         * @return {?}
         */
        TimeSelectService.prototype.toggleMeridiem = /**
         * @param {?} time
         * @return {?}
         */
            function (time) {
                if (time.hours() < FIRST_PM_HOUR) {
                    return time.clone().add(12, 'hour');
                }
                else {
                    return time.clone().subtract(12, 'hour');
                }
            };
        /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
        TimeSelectService.prototype.shouldShowDecrease = /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
            function (config, time, unit) {
                if (!config.min && !config.minTime) {
                    return true;
                }
                /** @type {?} */
                var newTime = this.decrease(config, time, unit);
                return (!config.min || config.min.isSameOrBefore(newTime))
                    && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
            };
        /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
        TimeSelectService.prototype.shouldShowIncrease = /**
         * @param {?} config
         * @param {?} time
         * @param {?} unit
         * @return {?}
         */
            function (config, time, unit) {
                if (!config.max && !config.maxTime) {
                    return true;
                }
                /** @type {?} */
                var newTime = this.increase(config, time, unit);
                return (!config.max || config.max.isSameOrAfter(newTime))
                    && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)));
            };
        /**
         * @param {?} config
         * @param {?} time
         * @return {?}
         */
        TimeSelectService.prototype.shouldShowToggleMeridiem = /**
         * @param {?} config
         * @param {?} time
         * @return {?}
         */
            function (config, time) {
                if (!config.min && !config.max && !config.minTime && !config.maxTime) {
                    return true;
                }
                /** @type {?} */
                var newTime = this.toggleMeridiem(time);
                return (!config.max || config.max.isSameOrAfter(newTime))
                    && (!config.min || config.min.isSameOrBefore(newTime))
                    && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)))
                    && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
            };
        TimeSelectService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        TimeSelectService.ctorParameters = function () {
            return [
                { type: UtilsService }
            ];
        };
        return TimeSelectService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$3 = momentNs;
    /** @type {?} */
    var DAY_FORMAT = 'YYYYMMDD';
    /** @type {?} */
    var TIME_FORMAT = 'HH:mm:ss';
    /** @type {?} */
    var COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
    var DayTimeCalendarService = /** @class */ (function () {
        function DayTimeCalendarService(utilsService, dayCalendarService, timeSelectService) {
            this.utilsService = utilsService;
            this.dayCalendarService = dayCalendarService;
            this.timeSelectService = timeSelectService;
            this.DEFAULT_CONFIG = {
                locale: moment$3.locale()
            };
        }
        /**
         * @param {?} config
         * @return {?}
         */
        DayTimeCalendarService.prototype.getConfig = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                /** @type {?} */
                var _config = __assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
                moment$3.locale(config.locale);
                return _config;
            };
        /**
         * @param {?} current
         * @param {?} day
         * @param {?} config
         * @return {?}
         */
        DayTimeCalendarService.prototype.updateDay = /**
         * @param {?} current
         * @param {?} day
         * @param {?} config
         * @return {?}
         */
            function (current, day, config) {
                /** @type {?} */
                var time = current ? current : moment$3();
                /** @type {?} */
                var updated = moment$3(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
                if (config.min) {
                    /** @type {?} */
                    var min = ( /** @type {?} */(config.min));
                    updated = min.isAfter(updated) ? min : updated;
                }
                if (config.max) {
                    /** @type {?} */
                    var max = ( /** @type {?} */(config.max));
                    updated = max.isBefore(updated) ? max : updated;
                }
                return updated;
            };
        /**
         * @param {?} current
         * @param {?} time
         * @return {?}
         */
        DayTimeCalendarService.prototype.updateTime = /**
         * @param {?} current
         * @param {?} time
         * @return {?}
         */
            function (current, time) {
                /** @type {?} */
                var day = current ? current : moment$3();
                return moment$3(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
            };
        DayTimeCalendarService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DayTimeCalendarService.ctorParameters = function () {
            return [
                { type: UtilsService },
                { type: DayCalendarService },
                { type: TimeSelectService }
            ];
        };
        return DayTimeCalendarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$4 = momentNs;
    var DatePickerService = /** @class */ (function () {
        function DatePickerService(utilsService, timeSelectService, daytimeCalendarService) {
            this.utilsService = utilsService;
            this.timeSelectService = timeSelectService;
            this.daytimeCalendarService = daytimeCalendarService;
            this.onPickerClosed = new core.EventEmitter();
            this.defaultConfig = {
                closeOnSelect: true,
                closeOnSelectDelay: 100,
                format: 'DD-MM-YYYY',
                openOnFocus: true,
                openOnClick: true,
                onOpenDelay: 0,
                disableKeypress: false,
                showNearMonthDays: true,
                showWeekNumbers: false,
                enableMonthSelector: true,
                showGoToCurrent: true,
                locale: moment$4.locale(),
                hideOnOutsideClick: true
            };
        }
        // todo:: add unit tests
        // todo:: add unit tests
        /**
         * @param {?} config
         * @param {?=} mode
         * @return {?}
         */
        DatePickerService.prototype.getConfig =
            // todo:: add unit tests
            /**
             * @param {?} config
             * @param {?=} mode
             * @return {?}
             */
            function (config, mode) {
                if (mode === void 0) {
                    mode = 'daytime';
                }
                /** @type {?} */
                var _config = ( /** @type {?} */(__assign({}, this.defaultConfig, { format: this.getDefaultFormatByMode(mode) }, this.utilsService.clearUndefined(config))));
                this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
                if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
                    _config.closeOnSelect = false;
                }
                moment$4.locale(_config.locale);
                return _config;
            };
        /**
         * @param {?} pickerConfig
         * @return {?}
         */
        DatePickerService.prototype.getDayConfigService = /**
         * @param {?} pickerConfig
         * @return {?}
         */
            function (pickerConfig) {
                return {
                    min: pickerConfig.min,
                    max: pickerConfig.max,
                    isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
                    weekDayFormat: pickerConfig.weekDayFormat,
                    showNearMonthDays: pickerConfig.showNearMonthDays,
                    showWeekNumbers: pickerConfig.showWeekNumbers,
                    firstDayOfWeek: pickerConfig.firstDayOfWeek,
                    format: pickerConfig.format,
                    allowMultiSelect: pickerConfig.allowMultiSelect,
                    monthFormat: pickerConfig.monthFormat,
                    monthFormatter: pickerConfig.monthFormatter,
                    enableMonthSelector: pickerConfig.enableMonthSelector,
                    yearFormat: pickerConfig.yearFormat,
                    yearFormatter: pickerConfig.yearFormatter,
                    dayBtnFormat: pickerConfig.dayBtnFormat,
                    dayBtnFormatter: pickerConfig.dayBtnFormatter,
                    dayBtnCssClassCallback: pickerConfig.dayBtnCssClassCallback,
                    monthBtnFormat: pickerConfig.monthBtnFormat,
                    monthBtnFormatter: pickerConfig.monthBtnFormatter,
                    monthBtnCssClassCallback: pickerConfig.monthBtnCssClassCallback,
                    multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
                    showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
                    locale: pickerConfig.locale,
                    returnedValueType: pickerConfig.returnedValueType,
                    showGoToCurrent: pickerConfig.showGoToCurrent,
                    unSelectOnClick: pickerConfig.unSelectOnClick
                };
            };
        /**
         * @param {?} pickerConfig
         * @return {?}
         */
        DatePickerService.prototype.getDayTimeConfigService = /**
         * @param {?} pickerConfig
         * @return {?}
         */
            function (pickerConfig) {
                return this.daytimeCalendarService.getConfig(pickerConfig);
            };
        /**
         * @param {?} pickerConfig
         * @return {?}
         */
        DatePickerService.prototype.getTimeConfigService = /**
         * @param {?} pickerConfig
         * @return {?}
         */
            function (pickerConfig) {
                return this.timeSelectService.getConfig(pickerConfig);
            };
        /**
         * @return {?}
         */
        DatePickerService.prototype.pickerClosed = /**
         * @return {?}
         */
            function () {
                this.onPickerClosed.emit();
            };
        // todo:: add unit tests
        // todo:: add unit tests
        /**
         * @param {?} value
         * @param {?} config
         * @return {?}
         */
        DatePickerService.prototype.isValidInputDateValue =
            // todo:: add unit tests
            /**
             * @param {?} value
             * @param {?} config
             * @return {?}
             */
            function (value, config) {
                var _this = this;
                value = value ? value : '';
                /** @type {?} */
                var datesStrArr = this.utilsService.datesStringToStringArray(value);
                return datesStrArr.every(( /**
                 * @param {?} date
                 * @return {?}
                 */function (date) { return _this.utilsService.isDateValid(date, config.format); }));
            };
        // todo:: add unit tests
        // todo:: add unit tests
        /**
         * @param {?} value
         * @param {?} config
         * @return {?}
         */
        DatePickerService.prototype.convertInputValueToMomentArray =
            // todo:: add unit tests
            /**
             * @param {?} value
             * @param {?} config
             * @return {?}
             */
            function (value, config) {
                value = value ? value : '';
                /** @type {?} */
                var datesStrArr = this.utilsService.datesStringToStringArray(value);
                return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect);
            };
        /**
         * @private
         * @param {?} mode
         * @return {?}
         */
        DatePickerService.prototype.getDefaultFormatByMode = /**
         * @private
         * @param {?} mode
         * @return {?}
         */
            function (mode) {
                switch (mode) {
                    case 'day':
                        return 'DD-MM-YYYY';
                    case 'daytime':
                        return 'DD-MM-YYYY HH:mm:ss';
                    case 'time':
                        return 'HH:mm:ss';
                    case 'month':
                        return 'MMM, YYYY';
                }
            };
        DatePickerService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DatePickerService.ctorParameters = function () {
            return [
                { type: UtilsService },
                { type: TimeSelectService },
                { type: DayTimeCalendarService }
            ];
        };
        return DatePickerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatePickerComponent = /** @class */ (function () {
        function DatePickerComponent(dayPickerService, domHelper, elemRef, renderer, utilsService, cd) {
            this.dayPickerService = dayPickerService;
            this.domHelper = domHelper;
            this.elemRef = elemRef;
            this.renderer = renderer;
            this.utilsService = utilsService;
            this.cd = cd;
            this.isInitialized = false;
            this.mode = 'day';
            this.placeholder = '';
            this.disabled = false;
            this.open = new core.EventEmitter();
            this.close = new core.EventEmitter();
            this.onChange = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
            this.onLeftNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this._areCalendarsShown = false;
            this.hideStateHelper = false;
            this._selected = [];
            this.isFocusedTrigger = false;
            this.handleInnerElementClickUnlisteners = [];
            this.globalListenersUnlisteners = [];
            this.api = {
                open: this.showCalendars.bind(this),
                close: this.hideCalendar.bind(this),
                moveCalendarTo: this.moveCalendarTo.bind(this)
            };
            this.selectEvent = SelectEvent;
        }
        Object.defineProperty(DatePickerComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */ function () {
                return this._selected;
            },
            set: /**
             * @param {?} selected
             * @return {?}
             */ function (selected) {
                this._selected = selected;
                this.inputElementValue = (( /** @type {?} */(this.utilsService
                    .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr))))
                    .join(' | ');
                /** @type {?} */
                var val = this.processOnChangeCallback(selected);
                this.onChangeCallback(val, false);
                this.onChange.emit(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerComponent.prototype, "areCalendarsShown", {
            get: /**
             * @return {?}
             */ function () {
                return this._areCalendarsShown;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this.startGlobalListeners();
                    this.domHelper.appendElementToPosition({
                        container: this.appendToElement,
                        element: this.calendarWrapper,
                        anchor: this.inputElementContainer,
                        dimElem: this.popupElem,
                        drops: this.componentConfig.drops,
                        opens: this.componentConfig.opens
                    });
                }
                else {
                    this.stopGlobalListeners();
                    this.dayPickerService.pickerClosed();
                }
                this._areCalendarsShown = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerComponent.prototype, "openOnFocus", {
            get: /**
             * @return {?}
             */ function () {
                return this.componentConfig.openOnFocus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerComponent.prototype, "openOnClick", {
            get: /**
             * @return {?}
             */ function () {
                return this.componentConfig.openOnClick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerComponent.prototype, "currentDateView", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentDateView;
            },
            set: /**
             * @param {?} date
             * @return {?}
             */ function (date) {
                this._currentDateView = date;
                if (this.dayCalendarRef) {
                    this.dayCalendarRef.moveCalendarTo(date);
                }
                if (this.monthCalendarRef) {
                    this.monthCalendarRef.moveCalendarTo(date);
                }
                if (this.dayTimeCalendarRef) {
                    this.dayTimeCalendarRef.moveCalendarTo(date);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.onClick = /**
         * @return {?}
         */
            function () {
                if (!this.openOnClick) {
                    return;
                }
                if (!this.isFocusedTrigger && !this.disabled) {
                    this.hideStateHelper = true;
                    if (!this.areCalendarsShown) {
                        this.showCalendars();
                    }
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.onBodyClick = /**
         * @return {?}
         */
            function () {
                if (this.componentConfig.hideOnOutsideClick) {
                    if (!this.hideStateHelper && this.areCalendarsShown) {
                        this.hideCalendar();
                    }
                    this.hideStateHelper = false;
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.onScroll = /**
         * @return {?}
         */
            function () {
                if (this.areCalendarsShown) {
                    this.domHelper.setElementPosition({
                        container: this.appendToElement,
                        element: this.calendarWrapper,
                        anchor: this.inputElementContainer,
                        dimElem: this.popupElem,
                        drops: this.componentConfig.drops,
                        opens: this.componentConfig.opens
                    });
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DatePickerComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
                if (value || value === '') {
                    this.selected = this.utilsService
                        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
                    this.init();
                }
                else {
                    this.selected = [];
                }
                this.cd.markForCheck();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        DatePickerComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} _
         * @param {?} changedByInput
         * @return {?}
         */
        DatePickerComponent.prototype.onChangeCallback = /**
         * @param {?} _
         * @param {?} changedByInput
         * @return {?}
         */
            function (_, changedByInput) {
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        DatePickerComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.onTouchedCallback = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @param {?} formControl
         * @return {?}
         */
        DatePickerComponent.prototype.validate = /**
         * @param {?} formControl
         * @return {?}
         */
            function (formControl) {
                return this.validateFn(formControl.value);
            };
        /**
         * @param {?} selected
         * @return {?}
         */
        DatePickerComponent.prototype.processOnChangeCallback = /**
         * @param {?} selected
         * @return {?}
         */
            function (selected) {
                if (typeof selected === 'string') {
                    return selected;
                }
                else {
                    return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.componentConfig.returnedValueType || this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect));
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.initValidators = /**
         * @return {?}
         */
            function () {
                this.validateFn = this.utilsService.createValidator({
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    minTime: this.minTime,
                    maxTime: this.maxTime
                }, this.componentConfig.format, this.mode);
                this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.isInitialized = true;
                this.init();
                this.initValidators();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        DatePickerComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (this.isInitialized) {
                    var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
                    this.init();
                    if (minDate || maxDate || minTime || maxTime) {
                        this.initValidators();
                    }
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.setElementPositionInDom();
            };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        DatePickerComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
                this.disabled = isDisabled;
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.setElementPositionInDom = /**
         * @return {?}
         */
            function () {
                this.calendarWrapper = ( /** @type {?} */(this.calendarContainer.nativeElement));
                this.setInputElementContainer();
                this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
                this.handleInnerElementClick(this.popupElem);
                var appendTo = this.componentConfig.appendTo;
                if (appendTo) {
                    if (typeof appendTo === 'string') {
                        this.appendToElement = ( /** @type {?} */(document.querySelector(( /** @type {?} */(appendTo)))));
                    }
                    else {
                        this.appendToElement = ( /** @type {?} */(appendTo));
                    }
                }
                else {
                    this.appendToElement = this.elemRef.nativeElement;
                }
                this.appendToElement.appendChild(this.calendarWrapper);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.setInputElementContainer = /**
         * @return {?}
         */
            function () {
                this.inputElementContainer = this.utilsService.getNativeElement(this.componentConfig.inputElementContainer)
                    || this.elemRef.nativeElement.querySelector('.dp-input-container')
                    || document.body;
            };
        /**
         * @param {?} element
         * @return {?}
         */
        DatePickerComponent.prototype.handleInnerElementClick = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                var _this = this;
                this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', ( /**
                 * @return {?}
                 */function () {
                    _this.hideStateHelper = true;
                })));
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
                this.currentDateView = this.displayDate
                    ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
                    : this.utilsService
                        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
                this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
                this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
                this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.inputFocused = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.openOnFocus) {
                    return;
                }
                this.isFocusedTrigger = true;
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    if (!_this.areCalendarsShown) {
                        _this.showCalendars();
                    }
                    _this.hideStateHelper = false;
                    _this.isFocusedTrigger = false;
                    _this.cd.markForCheck();
                }), this.componentConfig.onOpenDelay);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.inputBlurred = /**
         * @return {?}
         */
            function () {
                this.onTouchedCallback();
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.showCalendars = /**
         * @return {?}
         */
            function () {
                this.hideStateHelper = true;
                this.areCalendarsShown = true;
                if (this.timeSelectRef) {
                    this.timeSelectRef.api.triggerChange();
                }
                this.open.emit();
                this.cd.markForCheck();
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.hideCalendar = /**
         * @return {?}
         */
            function () {
                this.areCalendarsShown = false;
                if (this.dayCalendarRef) {
                    this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
                }
                this.close.emit();
                this.cd.markForCheck();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DatePickerComponent.prototype.onViewDateChange = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                /** @type {?} */
                var strVal = value ? this.utilsService.convertToString(value, this.componentConfig.format) : '';
                if (this.dayPickerService.isValidInputDateValue(strVal, this.componentConfig)) {
                    this.selected = this.dayPickerService.convertInputValueToMomentArray(strVal, this.componentConfig);
                    this.currentDateView = this.selected.length
                        ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min)
                        : this.currentDateView;
                    this.onSelect.emit({
                        date: strVal,
                        type: SelectEvent.INPUT,
                        granularity: null
                    });
                }
                else {
                    this._selected = this.utilsService
                        .getValidMomentArray(strVal, this.componentConfig.format);
                    this.onChangeCallback(this.processOnChangeCallback(strVal), true);
                }
            };
        /**
         * @param {?} date
         * @param {?} granularity
         * @param {?} type
         * @param {?=} ignoreClose
         * @return {?}
         */
        DatePickerComponent.prototype.dateSelected = /**
         * @param {?} date
         * @param {?} granularity
         * @param {?} type
         * @param {?=} ignoreClose
         * @return {?}
         */
            function (date, granularity, type, ignoreClose) {
                this.selected = this.utilsService
                    .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
                if (!ignoreClose) {
                    this.onDateClick();
                }
                this.onSelect.emit({
                    date: date.date,
                    granularity: granularity,
                    type: type
                });
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.onDateClick = /**
         * @return {?}
         */
            function () {
                if (this.componentConfig.closeOnSelect) {
                    setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        DatePickerComponent.prototype.onKeyPress = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                switch (event.keyCode) {
                    case (9):
                    case (27):
                        this.hideCalendar();
                        break;
                }
            };
        /**
         * @param {?} date
         * @return {?}
         */
        DatePickerComponent.prototype.moveCalendarTo = /**
         * @param {?} date
         * @return {?}
         */
            function (date) {
                /** @type {?} */
                var momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format);
                this.currentDateView = momentDate;
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DatePickerComponent.prototype.onLeftNavClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onLeftNav.emit(change);
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DatePickerComponent.prototype.onRightNavClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onRightNav.emit(change);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.startGlobalListeners = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.globalListenersUnlisteners.push(this.renderer.listen(document, 'keydown', ( /**
                 * @param {?} e
                 * @return {?}
                 */function (e) {
                    _this.onKeyPress(e);
                })), this.renderer.listen(document, 'scroll', ( /**
                 * @return {?}
                 */function () {
                    _this.onScroll();
                })), this.renderer.listen(document, 'click', ( /**
                 * @return {?}
                 */function () {
                    _this.onBodyClick();
                })));
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.stopGlobalListeners = /**
         * @return {?}
         */
            function () {
                this.globalListenersUnlisteners.forEach(( /**
                 * @param {?} ul
                 * @return {?}
                 */function (ul) { return ul(); }));
                this.globalListenersUnlisteners = [];
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.handleInnerElementClickUnlisteners.forEach(( /**
                 * @param {?} ul
                 * @return {?}
                 */function (ul) { return ul(); }));
                if (this.appendToElement) {
                    this.appendToElement.removeChild(this.calendarWrapper);
                }
            };
        DatePickerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-date-picker',
                        template: "<div [ngClass]=\"{'dp-open': areCalendarsShown}\">\n  <div class=\"dp-input-container\"\n       [hidden]=\"componentConfig.hideInputContainer\"\n       [attr.data-hidden]=\"componentConfig.hideInputContainer\">\n    <input type=\"text\"\n           class=\"dp-picker-input\"\n           [placeholder]=\"placeholder\"\n           [ngModel]=\"inputElementValue\"\n           (ngModelChange)=\"onViewDateChange($event)\"\n           (focus)=\"inputFocused()\"\n           (blur)=\"inputBlurred()\"\n           [readonly]=\"componentConfig.disableKeypress\"\n           [disabled]=\"disabled\"/>\n  </div>\n  <div #container>\n    <div class=\"dp-popup {{theme}}\"\n         [ngSwitch]=\"mode\"\n         [hidden]=\"!_areCalendarsShown\"\n         [attr.data-hidden]=\"!_areCalendarsShown\">\n      <dp-day-calendar #dayCalendar\n                       *ngSwitchCase=\"'day'\"\n                       [config]=\"dayCalendarConfig\"\n                       [ngModel]=\"_selected\"\n                       [displayDate]=\"displayDate\"\n                       [theme]=\"theme\"\n                       (onSelect)=\"dateSelected($event, 'day', selectEvent.SELECTION, false)\"\n                       (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                       (onLeftNav)=\"onLeftNavClick($event)\"\n                       (onRightNav)=\"onRightNavClick($event)\">\n      </dp-day-calendar>\n\n      <dp-month-calendar #monthCalendar\n                         *ngSwitchCase=\"'month'\"\n                         [config]=\"dayCalendarConfig\"\n                         [ngModel]=\"_selected\"\n                         [displayDate]=\"displayDate\"\n                         [theme]=\"theme\"\n                         (onSelect)=\"dateSelected($event, 'month', selectEvent.SELECTION, false)\"\n                         (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                         (onLeftNav)=\"onLeftNavClick($event)\"\n                         (onRightNav)=\"onRightNavClick($event)\">\n      </dp-month-calendar>\n\n      <dp-year-calendar #yearCalendar\n                         *ngSwitchCase=\"'year'\"\n                         [config]=\"dayCalendarConfig\"\n                         [ngModel]=\"_selected\"\n                         [displayDate]=\"displayDate\"\n                         [theme]=\"theme\"\n                         (onSelect)=\"dateSelected($event, 'year', selectEvent.SELECTION, false)\"\n                         (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                         (onLeftNav)=\"onLeftNavClick($event)\"\n                         (onRightNav)=\"onRightNavClick($event)\">\n      </dp-year-calendar>\n\n      <dp-time-select #timeSelect\n                      *ngSwitchCase=\"'time'\"\n                      [config]=\"timeSelectConfig\"\n                      [ngModel]=\"_selected && _selected[0]\"\n                      (onChange)=\"dateSelected($event, 'second', selectEvent.SELECTION, true)\"\n                      [theme]=\"theme\">\n      </dp-time-select>\n\n      <dp-day-time-calendar #daytimeCalendar\n                            *ngSwitchCase=\"'daytime'\"\n                            [config]=\"dayTimeCalendarConfig\"\n                            [displayDate]=\"displayDate\"\n                            [ngModel]=\"_selected && _selected[0]\"\n                            [theme]=\"theme\"\n                            (onChange)=\"dateSelected($event, 'second', selectEvent.SELECTION, true)\"\n                            (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                            (onLeftNav)=\"onLeftNavClick($event)\"\n                            (onRightNav)=\"onRightNavClick($event)\">\n      </dp-day-time-calendar>\n    </div>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            DatePickerService,
                            DayTimeCalendarService,
                            DayCalendarService,
                            TimeSelectService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return DatePickerComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return DatePickerComponent; })),
                                multi: true
                            }
                        ],
                        styles: ["dp-date-picker{display:inline-block}dp-date-picker.dp-material .dp-picker-input{box-sizing:border-box;height:30px;width:213px;font-size:13px;outline:0}dp-date-picker .dp-input-container{position:relative}dp-date-picker .dp-selected{background:#106cc8;color:#fff}.dp-popup{position:relative;background:#fff;box-shadow:1px 1px 5px 0 rgba(0,0,0,.1);border-left:1px solid rgba(0,0,0,.1);border-right:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1);z-index:9999;white-space:nowrap}"]
                    }] }
        ];
        /** @nocollapse */
        DatePickerComponent.ctorParameters = function () {
            return [
                { type: DatePickerService },
                { type: DomHelper },
                { type: core.ElementRef },
                { type: core.Renderer },
                { type: UtilsService },
                { type: core.ChangeDetectorRef }
            ];
        };
        DatePickerComponent.propDecorators = {
            config: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            minTime: [{ type: core.Input }],
            maxTime: [{ type: core.Input }],
            open: [{ type: core.Output }],
            close: [{ type: core.Output }],
            onChange: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }],
            onLeftNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }],
            onSelect: [{ type: core.Output }],
            calendarContainer: [{ type: core.ViewChild, args: ['container',] }],
            dayCalendarRef: [{ type: core.ViewChild, args: ['dayCalendar',] }],
            monthCalendarRef: [{ type: core.ViewChild, args: ['monthCalendar',] }],
            yearCalendarRef: [{ type: core.ViewChild, args: ['yearCalendar',] }],
            dayTimeCalendarRef: [{ type: core.ViewChild, args: ['daytimeCalendar',] }],
            timeSelectRef: [{ type: core.ViewChild, args: ['timeSelect',] }],
            onClick: [{ type: core.HostListener, args: ['click',] }],
            onScroll: [{ type: core.HostListener, args: ['window:resize',] }]
        };
        return DatePickerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatePickerDirectiveService = /** @class */ (function () {
        function DatePickerDirectiveService(utilsService) {
            this.utilsService = utilsService;
        }
        /**
         * @param {?} attachTo
         * @param {?} baseElement
         * @return {?}
         */
        DatePickerDirectiveService.prototype.convertToHTMLElement = /**
         * @param {?} attachTo
         * @param {?} baseElement
         * @return {?}
         */
            function (attachTo, baseElement) {
                if (typeof attachTo === 'string') {
                    return this.utilsService.closestParent(baseElement, attachTo);
                }
                else if (attachTo) {
                    return attachTo.nativeElement;
                }
                return undefined;
            };
        /**
         * @param {?=} config
         * @param {?=} baseElement
         * @param {?=} attachTo
         * @return {?}
         */
        DatePickerDirectiveService.prototype.getConfig = /**
         * @param {?=} config
         * @param {?=} baseElement
         * @param {?=} attachTo
         * @return {?}
         */
            function (config, baseElement, attachTo) {
                if (config === void 0) {
                    config = {};
                }
                /** @type {?} */
                var _config = __assign({}, config);
                _config.hideInputContainer = true;
                /** @type {?} */
                var native;
                if (config.inputElementContainer) {
                    native = this.utilsService.getNativeElement(config.inputElementContainer);
                }
                else {
                    native = baseElement ? baseElement.nativeElement : null;
                }
                if (native) {
                    _config.inputElementContainer = attachTo
                        ? this.convertToHTMLElement(attachTo, native)
                        : native;
                }
                return _config;
            };
        DatePickerDirectiveService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DatePickerDirectiveService.ctorParameters = function () {
            return [
                { type: UtilsService }
            ];
        };
        return DatePickerDirectiveService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatePickerDirective = /** @class */ (function () {
        function DatePickerDirective(viewContainerRef, elemRef, componentFactoryResolver, service, formControl, utilsService) {
            this.viewContainerRef = viewContainerRef;
            this.elemRef = elemRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.service = service;
            this.formControl = formControl;
            this.utilsService = utilsService;
            this._mode = 'day';
            this.open = new core.EventEmitter();
            this.close = new core.EventEmitter();
            this.onChange = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
            this.onLeftNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
        }
        Object.defineProperty(DatePickerDirective.prototype, "config", {
            get: /**
             * @return {?}
             */ function () {
                return this._config;
            },
            set: /**
             * @param {?} config
             * @return {?}
             */ function (config) {
                this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
                this.updateDatepickerConfig();
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "attachTo", {
            get: /**
             * @return {?}
             */ function () {
                return this._attachTo;
            },
            set: /**
             * @param {?} attachTo
             * @return {?}
             */ function (attachTo) {
                this._attachTo = attachTo;
                this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
                this.updateDatepickerConfig();
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "theme", {
            get: /**
             * @return {?}
             */ function () {
                return this._theme;
            },
            set: /**
             * @param {?} theme
             * @return {?}
             */ function (theme) {
                this._theme = theme;
                if (this.datePicker) {
                    this.datePicker.theme = theme;
                }
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "mode", {
            get: /**
             * @return {?}
             */ function () {
                return this._mode;
            },
            set: /**
             * @param {?} mode
             * @return {?}
             */ function (mode) {
                this._mode = mode;
                if (this.datePicker) {
                    this.datePicker.mode = mode;
                }
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "minDate", {
            get: /**
             * @return {?}
             */ function () {
                return this._minDate;
            },
            set: /**
             * @param {?} minDate
             * @return {?}
             */ function (minDate) {
                this._minDate = minDate;
                if (this.datePicker) {
                    this.datePicker.minDate = minDate;
                    this.datePicker.ngOnInit();
                }
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "maxDate", {
            get: /**
             * @return {?}
             */ function () {
                return this._maxDate;
            },
            set: /**
             * @param {?} maxDate
             * @return {?}
             */ function (maxDate) {
                this._maxDate = maxDate;
                if (this.datePicker) {
                    this.datePicker.maxDate = maxDate;
                    this.datePicker.ngOnInit();
                }
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "minTime", {
            get: /**
             * @return {?}
             */ function () {
                return this._minTime;
            },
            set: /**
             * @param {?} minTime
             * @return {?}
             */ function (minTime) {
                this._minTime = minTime;
                if (this.datePicker) {
                    this.datePicker.minTime = minTime;
                    this.datePicker.ngOnInit();
                }
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "maxTime", {
            get: /**
             * @return {?}
             */ function () {
                return this._maxTime;
            },
            set: /**
             * @param {?} maxTime
             * @return {?}
             */ function (maxTime) {
                this._maxTime = maxTime;
                if (this.datePicker) {
                    this.datePicker.maxTime = maxTime;
                    this.datePicker.ngOnInit();
                }
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePickerDirective.prototype, "displayDate", {
            get: /**
             * @return {?}
             */ function () {
                return this._displayDate;
            },
            set: /**
             * @param {?} displayDate
             * @return {?}
             */ function (displayDate) {
                this._displayDate = displayDate;
                this.updateDatepickerConfig();
                this.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DatePickerDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.datePicker = this.createDatePicker();
                this.api = this.datePicker.api;
                this.updateDatepickerConfig();
                this.attachModelToDatePicker();
                this.datePicker.theme = this.theme;
            };
        /**
         * @return {?}
         */
        DatePickerDirective.prototype.createDatePicker = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
                return this.viewContainerRef.createComponent(factory).instance;
            };
        /**
         * @return {?}
         */
        DatePickerDirective.prototype.attachModelToDatePicker = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.formControl) {
                    return;
                }
                this.datePicker.onViewDateChange(this.formControl.value);
                this.formControl.valueChanges.subscribe(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    if (value !== _this.datePicker.inputElementValue) {
                        /** @type {?} */
                        var strVal = _this.utilsService.convertToString(value, _this.datePicker.componentConfig.format);
                        _this.datePicker.onViewDateChange(strVal);
                    }
                }));
                /** @type {?} */
                var setup = true;
                this.datePicker.registerOnChange(( /**
                 * @param {?} value
                 * @param {?} changedByInput
                 * @return {?}
                 */function (value, changedByInput) {
                    if (value) {
                        /** @type {?} */
                        var isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                        if (!isMultiselectEmpty && !changedByInput) {
                            _this.formControl.control.setValue(_this.datePicker.inputElementValue);
                        }
                    }
                    /** @type {?} */
                    var errors = _this.datePicker.validateFn(value);
                    if (!setup) {
                        _this.formControl.control.markAsDirty({
                            onlySelf: true
                        });
                    }
                    else {
                        setup = false;
                    }
                    if (errors) {
                        if (errors.hasOwnProperty('format')) {
                            var given = errors['format'].given;
                            _this.datePicker.inputElementValue = given;
                            if (!changedByInput) {
                                _this.formControl.control.setValue(given);
                            }
                        }
                        _this.formControl.control.setErrors(errors);
                    }
                }));
            };
        /**
         * @return {?}
         */
        DatePickerDirective.prototype.onClick = /**
         * @return {?}
         */
            function () {
                this.datePicker.onClick();
            };
        /**
         * @return {?}
         */
        DatePickerDirective.prototype.onFocus = /**
         * @return {?}
         */
            function () {
                this.datePicker.inputFocused();
            };
        /**
         * @private
         * @return {?}
         */
        DatePickerDirective.prototype.updateDatepickerConfig = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.datePicker) {
                    this.datePicker.minDate = this.minDate;
                    this.datePicker.maxDate = this.maxDate;
                    this.datePicker.minTime = this.minTime;
                    this.datePicker.maxTime = this.maxTime;
                    this.datePicker.mode = this.mode || 'day';
                    this.datePicker.displayDate = this.displayDate;
                    this.datePicker.config = this.config;
                    this.datePicker.open = this.open;
                    this.datePicker.close = this.close;
                    this.datePicker.onChange = this.onChange;
                    this.datePicker.onGoToCurrent = this.onGoToCurrent;
                    this.datePicker.onLeftNav = this.onLeftNav;
                    this.datePicker.onRightNav = this.onRightNav;
                    this.datePicker.onSelect = this.onSelect;
                    this.datePicker.init();
                    if (this.datePicker.componentConfig.disableKeypress) {
                        this.elemRef.nativeElement.setAttribute('readonly', true);
                    }
                    else {
                        this.elemRef.nativeElement.removeAttribute('readonly');
                    }
                }
            };
        /**
         * @return {?}
         */
        DatePickerDirective.prototype.markForCheck = /**
         * @return {?}
         */
            function () {
                if (this.datePicker) {
                    this.datePicker.cd.markForCheck();
                }
            };
        DatePickerDirective.decorators = [
            { type: core.Directive, args: [{
                        exportAs: 'dpDayPicker',
                        providers: [DatePickerDirectiveService],
                        selector: '[dpDayPicker]'
                    },] }
        ];
        /** @nocollapse */
        DatePickerDirective.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef },
                { type: core.ElementRef },
                { type: core.ComponentFactoryResolver },
                { type: DatePickerDirectiveService },
                { type: forms.NgControl, decorators: [{ type: core.Optional }] },
                { type: UtilsService }
            ];
        };
        DatePickerDirective.propDecorators = {
            config: [{ type: core.Input, args: ['dpDayPicker',] }],
            attachTo: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            minTime: [{ type: core.Input }],
            maxTime: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            open: [{ type: core.Output }],
            close: [{ type: core.Output }],
            onChange: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }],
            onLeftNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }],
            onSelect: [{ type: core.Output }],
            onClick: [{ type: core.HostListener, args: ['click',] }],
            onFocus: [{ type: core.HostListener, args: ['focus',] }]
        };
        return DatePickerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$5 = momentNs;
    var DayCalendarComponent = /** @class */ (function () {
        function DayCalendarComponent(dayCalendarService, utilsService, cd) {
            this.dayCalendarService = dayCalendarService;
            this.utilsService = utilsService;
            this.cd = cd;
            this.onSelect = new core.EventEmitter();
            this.onMonthSelect = new core.EventEmitter();
            this.onNavHeaderBtnClick = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
            this.onLeftNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.CalendarMode = ECalendarMode;
            this.isInited = false;
            this.currentCalendarMode = ECalendarMode.Day;
            this._shouldShowCurrent = true;
            this.api = {
                moveCalendarsBy: this.moveCalendarsBy.bind(this),
                moveCalendarTo: this.moveCalendarTo.bind(this),
                toggleCalendarMode: this.toggleCalendarMode.bind(this)
            };
        }
        Object.defineProperty(DayCalendarComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */ function () {
                return this._selected;
            },
            set: /**
             * @param {?} selected
             * @return {?}
             */ function (selected) {
                this._selected = selected;
                this.onChangeCallback(this.processOnChangeCallback(selected));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DayCalendarComponent.prototype, "currentDateView", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentDateView;
            },
            set: /**
             * @param {?} current
             * @return {?}
             */ function (current) {
                this._currentDateView = current.clone();
                this.weeks = this.dayCalendarService
                    .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
                this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
                this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
                this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.isInited = true;
                this.init();
                this.initValidators();
            };
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                this.componentConfig = this.dayCalendarService.getConfig(this.config);
                this.selected = this.selected || [];
                this.currentDateView = this.displayDate
                    ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
                    : this.utilsService
                        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
                this.weekdays = this.dayCalendarService
                    .generateWeekdays(this.componentConfig.firstDayOfWeek);
                this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
                this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
                this._shouldShowCurrent = this.shouldShowCurrent();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        DayCalendarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (this.isInited) {
                    var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
                    this.handleConfigChange(config);
                    this.init();
                    if (minDate || maxDate) {
                        this.initValidators();
                    }
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DayCalendarComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
                if (value) {
                    this.selected = this.utilsService
                        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
                    this.inputValueType = this.utilsService
                        .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
                }
                else {
                    this.selected = [];
                }
                this.weeks = this.dayCalendarService
                    .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
                this.cd.markForCheck();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        DayCalendarComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} _
         * @return {?}
         */
        DayCalendarComponent.prototype.onChangeCallback = /**
         * @param {?} _
         * @return {?}
         */
            function (_) {
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        DayCalendarComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
            };
        /**
         * @param {?} formControl
         * @return {?}
         */
        DayCalendarComponent.prototype.validate = /**
         * @param {?} formControl
         * @return {?}
         */
            function (formControl) {
                if (this.minDate || this.maxDate) {
                    return this.validateFn(formControl.value);
                }
                else {
                    return ( /**
                     * @return {?}
                     */function () { return null; });
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DayCalendarComponent.prototype.processOnChangeCallback = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
            };
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.initValidators = /**
         * @return {?}
         */
            function () {
                this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day');
                this.onChangeCallback(this.processOnChangeCallback(this.selected));
            };
        /**
         * @param {?} day
         * @return {?}
         */
        DayCalendarComponent.prototype.dayClicked = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                if (day.selected && !this.componentConfig.unSelectOnClick) {
                    return;
                }
                this.selected = this.utilsService
                    .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
                this.weeks = this.dayCalendarService
                    .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
                this.onSelect.emit(day);
            };
        /**
         * @param {?} day
         * @return {?}
         */
        DayCalendarComponent.prototype.getDayBtnText = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
            };
        /**
         * @param {?} day
         * @return {?}
         */
        DayCalendarComponent.prototype.getDayBtnCssClass = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                /** @type {?} */
                var cssClasses = {
                    'dp-selected': day.selected,
                    'dp-current-month': day.currentMonth,
                    'dp-prev-month': day.prevMonth,
                    'dp-next-month': day.nextMonth,
                    'dp-current-day': day.currentDay
                };
                /** @type {?} */
                var customCssClass = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
                if (customCssClass) {
                    cssClasses[customCssClass] = true;
                }
                return cssClasses;
            };
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.onLeftNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.moveCalendarsBy(this.currentDateView, -1, 'month');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onLeftNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.onRightNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.moveCalendarsBy(this.currentDateView, 1, 'month');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onRightNav.emit({ from: from, to: to });
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DayCalendarComponent.prototype.onMonthCalendarLeftClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onLeftNav.emit(change);
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DayCalendarComponent.prototype.onMonthCalendarRightClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onRightNav.emit(change);
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DayCalendarComponent.prototype.onMonthCalendarSecondaryLeftClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onRightNav.emit(change);
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DayCalendarComponent.prototype.onMonthCalendarSecondaryRightClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onLeftNav.emit(change);
            };
        /**
         * @param {?} weekday
         * @return {?}
         */
        DayCalendarComponent.prototype.getWeekdayName = /**
         * @param {?} weekday
         * @return {?}
         */
            function (weekday) {
                if (this.componentConfig.weekDayFormatter) {
                    return this.componentConfig.weekDayFormatter(weekday.day());
                }
                return weekday.format(this.componentConfig.weekDayFormat);
            };
        /**
         * @param {?} mode
         * @return {?}
         */
        DayCalendarComponent.prototype.toggleCalendarMode = /**
         * @param {?} mode
         * @return {?}
         */
            function (mode) {
                if (this.currentCalendarMode !== mode) {
                    this.currentCalendarMode = mode;
                    this.onNavHeaderBtnClick.emit(mode);
                }
                this.cd.markForCheck();
            };
        /**
         * @param {?} month
         * @return {?}
         */
        DayCalendarComponent.prototype.monthSelected = /**
         * @param {?} month
         * @return {?}
         */
            function (month) {
                this.currentDateView = month.date.clone();
                this.currentCalendarMode = ECalendarMode.Day;
                this.onMonthSelect.emit(month);
            };
        /**
         * @param {?} current
         * @param {?} amount
         * @param {?=} granularity
         * @return {?}
         */
        DayCalendarComponent.prototype.moveCalendarsBy = /**
         * @param {?} current
         * @param {?} amount
         * @param {?=} granularity
         * @return {?}
         */
            function (current, amount, granularity) {
                if (granularity === void 0) {
                    granularity = 'month';
                }
                this.currentDateView = current.clone().add(amount, granularity);
                this.cd.markForCheck();
            };
        /**
         * @param {?} to
         * @return {?}
         */
        DayCalendarComponent.prototype.moveCalendarTo = /**
         * @param {?} to
         * @return {?}
         */
            function (to) {
                if (to) {
                    this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
                }
                this.cd.markForCheck();
            };
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.shouldShowCurrent = /**
         * @return {?}
         */
            function () {
                return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'day', this.componentConfig.min, this.componentConfig.max);
            };
        /**
         * @return {?}
         */
        DayCalendarComponent.prototype.goToCurrent = /**
         * @return {?}
         */
            function () {
                this.currentDateView = moment$5();
                this.onGoToCurrent.emit();
            };
        /**
         * @param {?} config
         * @return {?}
         */
        DayCalendarComponent.prototype.handleConfigChange = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                if (config) {
                    /** @type {?} */
                    var prevConf = this.dayCalendarService.getConfig(config.previousValue);
                    /** @type {?} */
                    var currentConf = this.dayCalendarService.getConfig(config.currentValue);
                    if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                        this._currentDateView = null;
                    }
                }
            };
        DayCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-day-calendar',
                        template: "<div class=\"dp-day-calendar-container\" *ngIf=\"currentCalendarMode ===  CalendarMode.Day\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [isLabelClickable]=\"componentConfig.enableMonthSelector\"\n      [showGoToCurrent]=\"_shouldShowCurrent\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode(CalendarMode.Month)\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\"\n       [ngClass]=\"{'dp-hide-near-month': !componentConfig.showNearMonthDays}\">\n    <div class=\"dp-weekdays\">\n      <span class=\"dp-calendar-weekday\"\n            *ngFor=\"let weekday of weekdays\"\n            [innerText]=\"getWeekdayName(weekday)\">\n      </span>\n    </div>\n    <div class=\"dp-calendar-week\" *ngFor=\"let week of weeks\">\n      <span class=\"dp-week-number\"\n            *ngIf=\"componentConfig.showWeekNumbers\"\n            [innerText]=\"week[0].date.isoWeek()\">\n      </span>\n      <button type=\"button\"\n              class=\"dp-calendar-day\"\n              *ngFor=\"let day of week\"\n              [attr.data-date]=\"day.date.format(componentConfig.format)\"\n              (click)=\"dayClicked(day)\"\n              [disabled]=\"day.disabled\"\n              [ngClass]=\"getDayBtnCssClass(day)\"\n              [innerText]=\"getDayBtnText(day)\">\n      </button>\n    </div>\n  </div>\n</div>\n\n<dp-month-calendar\n    *ngIf=\"currentCalendarMode ===  CalendarMode.Month\"\n    [config]=\"monthCalendarConfig\"\n    [displayDate]=\"_currentDateView\"\n    [theme]=\"theme\"\n    (onSelect)=\"monthSelected($event)\"\n    (onNavHeaderBtnClick)=\"toggleCalendarMode(CalendarMode.Day)\"\n    (onLeftNav)=\"onMonthCalendarLeftClick($event)\"\n    (onRightNav)=\"onMonthCalendarRightClick($event)\"\n    (onLeftSecondaryNav)=\"onMonthCalendarSecondaryLeftClick($event)\"\n    (onRightSecondaryNav)=\"onMonthCalendarSecondaryRightClick($event)\">\n</dp-month-calendar>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            DayCalendarService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return DayCalendarComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return DayCalendarComponent; })),
                                multi: true
                            }
                        ],
                        styles: ["dp-day-calendar{display:inline-block}dp-day-calendar .dp-day-calendar-container{background:#fff}dp-day-calendar .dp-calendar-wrapper{box-sizing:border-box;border:1px solid #000}dp-day-calendar .dp-calendar-wrapper .dp-calendar-weekday:first-child{border-left:none}dp-day-calendar .dp-weekdays{font-size:15px;margin-bottom:5px}dp-day-calendar .dp-calendar-weekday{box-sizing:border-box;display:inline-block;width:30px;text-align:center;border-left:1px solid #000;border-bottom:1px solid #000}dp-day-calendar .dp-calendar-day{box-sizing:border-box;width:30px;height:30px;cursor:pointer}dp-day-calendar .dp-selected{background:#106cc8;color:#fff}dp-day-calendar .dp-next-month,dp-day-calendar .dp-prev-month{opacity:.5}dp-day-calendar .dp-hide-near-month .dp-next-month,dp-day-calendar .dp-hide-near-month .dp-prev-month{visibility:hidden}dp-day-calendar .dp-week-number{position:absolute;font-size:9px}dp-day-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;color:#7a7a7a;border:none}dp-day-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-day-calendar.dp-material .dp-calendar-day,dp-day-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-day-calendar.dp-material .dp-calendar-day:hover,dp-day-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-day-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-day-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-day-calendar.dp-material .dp-current-day{border:1px solid #106cc8}"]
                    }] }
        ];
        /** @nocollapse */
        DayCalendarComponent.ctorParameters = function () {
            return [
                { type: DayCalendarService },
                { type: UtilsService },
                { type: core.ChangeDetectorRef }
            ];
        };
        DayCalendarComponent.propDecorators = {
            config: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            onSelect: [{ type: core.Output }],
            onMonthSelect: [{ type: core.Output }],
            onNavHeaderBtnClick: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }],
            onLeftNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }]
        };
        return DayCalendarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$6 = momentNs;
    var MonthCalendarService = /** @class */ (function () {
        function MonthCalendarService(utilsService) {
            this.utilsService = utilsService;
            this.DEFAULT_CONFIG = {
                allowMultiSelect: false,
                yearFormat: 'YYYY',
                format: 'MM-YYYY',
                isNavHeaderBtnClickable: false,
                monthBtnFormat: 'MMM',
                locale: moment$6.locale(),
                multipleYearsNavigateBy: 10,
                showMultipleYearsNavigation: false,
                unSelectOnClick: true
            };
        }
        /**
         * @param {?} config
         * @return {?}
         */
        MonthCalendarService.prototype.getConfig = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                /** @type {?} */
                var _config = ( /** @type {?} */(__assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
                this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
                moment$6.locale(_config.locale);
                return _config;
            };
        /**
         * @param {?} config
         * @param {?} year
         * @param {?=} selected
         * @return {?}
         */
        MonthCalendarService.prototype.generateYear = /**
         * @param {?} config
         * @param {?} year
         * @param {?=} selected
         * @return {?}
         */
            function (config, year, selected) {
                var _this = this;
                if (selected === void 0) {
                    selected = null;
                }
                /** @type {?} */
                var index = year.clone().startOf('year');
                return this.utilsService.createArray(3).map(( /**
                 * @return {?}
                 */function () {
                    return _this.utilsService.createArray(4).map(( /**
                     * @return {?}
                     */function () {
                        /** @type {?} */
                        var date = index.clone();
                        /** @type {?} */
                        var month = {
                            date: date,
                            selected: !!selected.find(( /**
                             * @param {?} s
                             * @return {?}
                             */function (s) { return index.isSame(s, 'month'); })),
                            currentMonth: index.isSame(moment$6(), 'month'),
                            disabled: _this.isMonthDisabled(date, config),
                            text: _this.getMonthBtnText(config, date)
                        };
                        index.add(1, 'month');
                        return month;
                    }));
                }));
            };
        /**
         * @param {?} date
         * @param {?} config
         * @return {?}
         */
        MonthCalendarService.prototype.isMonthDisabled = /**
         * @param {?} date
         * @param {?} config
         * @return {?}
         */
            function (date, config) {
                if (config.min && date.isBefore(config.min, 'month')) {
                    return true;
                }
                return !!(config.max && date.isAfter(config.max, 'month'));
            };
        /**
         * @param {?} min
         * @param {?} currentMonthView
         * @return {?}
         */
        MonthCalendarService.prototype.shouldShowLeft = /**
         * @param {?} min
         * @param {?} currentMonthView
         * @return {?}
         */
            function (min, currentMonthView) {
                return min ? min.isBefore(currentMonthView, 'year') : true;
            };
        /**
         * @param {?} max
         * @param {?} currentMonthView
         * @return {?}
         */
        MonthCalendarService.prototype.shouldShowRight = /**
         * @param {?} max
         * @param {?} currentMonthView
         * @return {?}
         */
            function (max, currentMonthView) {
                return max ? max.isAfter(currentMonthView, 'year') : true;
            };
        /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
        MonthCalendarService.prototype.getHeaderLabel = /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
            function (config, year) {
                if (config.yearFormatter) {
                    return config.yearFormatter(year);
                }
                return year.format(config.yearFormat);
            };
        /**
         * @param {?} config
         * @param {?} month
         * @return {?}
         */
        MonthCalendarService.prototype.getMonthBtnText = /**
         * @param {?} config
         * @param {?} month
         * @return {?}
         */
            function (config, month) {
                if (config.monthBtnFormatter) {
                    return config.monthBtnFormatter(month);
                }
                return month.format(config.monthBtnFormat);
            };
        /**
         * @param {?} config
         * @param {?} month
         * @return {?}
         */
        MonthCalendarService.prototype.getMonthBtnCssClass = /**
         * @param {?} config
         * @param {?} month
         * @return {?}
         */
            function (config, month) {
                if (config.monthBtnCssClassCallback) {
                    return config.monthBtnCssClassCallback(month);
                }
                return '';
            };
        MonthCalendarService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MonthCalendarService.ctorParameters = function () {
            return [
                { type: UtilsService }
            ];
        };
        return MonthCalendarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$7 = momentNs;
    var MonthCalendarComponent = /** @class */ (function () {
        function MonthCalendarComponent(monthCalendarService, utilsService, cd) {
            this.monthCalendarService = monthCalendarService;
            this.utilsService = utilsService;
            this.cd = cd;
            this.onSelect = new core.EventEmitter();
            this.onNavHeaderBtnClick = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
            this.onLeftNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.onLeftSecondaryNav = new core.EventEmitter();
            this.onRightSecondaryNav = new core.EventEmitter();
            this.isInited = false;
            this._shouldShowCurrent = true;
            this.api = {
                toggleCalendar: this.toggleCalendarMode.bind(this),
                moveCalendarTo: this.moveCalendarTo.bind(this)
            };
        }
        Object.defineProperty(MonthCalendarComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */ function () {
                return this._selected;
            },
            set: /**
             * @param {?} selected
             * @return {?}
             */ function (selected) {
                this._selected = selected;
                this.onChangeCallback(this.processOnChangeCallback(selected));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MonthCalendarComponent.prototype, "currentDateView", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentDateView;
            },
            set: /**
             * @param {?} current
             * @return {?}
             */ function (current) {
                this._currentDateView = current.clone();
                this.yearMonths = this.monthCalendarService
                    .generateYear(this.componentConfig, this._currentDateView, this.selected);
                this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
                this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
                this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
                this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
                this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.isInited = true;
                this.init();
                this.initValidators();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        MonthCalendarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (this.isInited) {
                    var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
                    this.handleConfigChange(config);
                    this.init();
                    if (minDate || maxDate) {
                        this.initValidators();
                    }
                }
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                this.componentConfig = this.monthCalendarService.getConfig(this.config);
                this.selected = this.selected || [];
                this.currentDateView = this.displayDate
                    ? this.displayDate
                    : this.utilsService
                        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
                this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
                this._shouldShowCurrent = this.shouldShowCurrent();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        MonthCalendarComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
                if (value) {
                    this.selected = this.utilsService
                        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
                    this.yearMonths = this.monthCalendarService
                        .generateYear(this.componentConfig, this.currentDateView, this.selected);
                    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
                }
                else {
                    this.selected = [];
                    this.yearMonths = this.monthCalendarService
                        .generateYear(this.componentConfig, this.currentDateView, this.selected);
                }
                this.cd.markForCheck();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        MonthCalendarComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} _
         * @return {?}
         */
        MonthCalendarComponent.prototype.onChangeCallback = /**
         * @param {?} _
         * @return {?}
         */
            function (_) {
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        MonthCalendarComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
            };
        /**
         * @param {?} formControl
         * @return {?}
         */
        MonthCalendarComponent.prototype.validate = /**
         * @param {?} formControl
         * @return {?}
         */
            function (formControl) {
                if (this.minDate || this.maxDate) {
                    return this.validateFn(formControl.value);
                }
                else {
                    return ( /**
                     * @return {?}
                     */function () { return null; });
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        MonthCalendarComponent.prototype.processOnChangeCallback = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.initValidators = /**
         * @return {?}
         */
            function () {
                this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month');
                this.onChangeCallback(this.processOnChangeCallback(this.selected));
            };
        /**
         * @param {?} month
         * @return {?}
         */
        MonthCalendarComponent.prototype.monthClicked = /**
         * @param {?} month
         * @return {?}
         */
            function (month) {
                if (month.selected && !this.componentConfig.unSelectOnClick) {
                    return;
                }
                this.selected = this.utilsService
                    .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
                this.yearMonths = this.monthCalendarService
                    .generateYear(this.componentConfig, this.currentDateView, this.selected);
                this.onSelect.emit(month);
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.onLeftNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
                this.onLeftNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.onLeftSecondaryNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var navigateBy = this.componentConfig.multipleYearsNavigateBy;
                /** @type {?} */
                var isOutsideRange = this.componentConfig.min &&
                    this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
                if (isOutsideRange) {
                    navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
                }
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onLeftSecondaryNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.onRightNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().add(1, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onRightNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.onRightSecondaryNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var navigateBy = this.componentConfig.multipleYearsNavigateBy;
                /** @type {?} */
                var isOutsideRange = this.componentConfig.max &&
                    this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
                if (isOutsideRange) {
                    navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
                }
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onRightSecondaryNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.toggleCalendarMode = /**
         * @return {?}
         */
            function () {
                this.onNavHeaderBtnClick.emit();
            };
        /**
         * @param {?} month
         * @return {?}
         */
        MonthCalendarComponent.prototype.getMonthBtnCssClass = /**
         * @param {?} month
         * @return {?}
         */
            function (month) {
                /** @type {?} */
                var cssClass = {
                    'dp-selected': month.selected,
                    'dp-current-month': month.currentMonth
                };
                /** @type {?} */
                var customCssClass = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);
                if (customCssClass) {
                    cssClass[customCssClass] = true;
                }
                return cssClass;
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.shouldShowCurrent = /**
         * @return {?}
         */
            function () {
                return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'month', this.componentConfig.min, this.componentConfig.max);
            };
        /**
         * @return {?}
         */
        MonthCalendarComponent.prototype.goToCurrent = /**
         * @return {?}
         */
            function () {
                this.currentDateView = moment$7();
                this.onGoToCurrent.emit();
            };
        /**
         * @param {?} to
         * @return {?}
         */
        MonthCalendarComponent.prototype.moveCalendarTo = /**
         * @param {?} to
         * @return {?}
         */
            function (to) {
                if (to) {
                    this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
                    this.cd.markForCheck();
                }
            };
        /**
         * @param {?} config
         * @return {?}
         */
        MonthCalendarComponent.prototype.handleConfigChange = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                if (config) {
                    /** @type {?} */
                    var prevConf = this.monthCalendarService.getConfig(config.previousValue);
                    /** @type {?} */
                    var currentConf = this.monthCalendarService.getConfig(config.currentValue);
                    if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                        this._currentDateView = null;
                    }
                }
            };
        MonthCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-month-calendar',
                        template: "<div class=\"dp-month-calendar-container\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [showRightSecondaryNav]=\"showSecondaryRightNav\"\n      [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n      [showGoToCurrent]=\"shouldShowCurrent()\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode()\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\">\n    <div class=\"dp-months-row\" *ngFor=\"let monthRow of yearMonths\">\n      <button type=\"button\"\n              class=\"dp-calendar-month\"\n              *ngFor=\"let month of monthRow\"\n              [attr.data-date]=\"month.date.format(componentConfig.format)\"\n              [disabled]=\"month.disabled\"\n              [ngClass]=\"getMonthBtnCssClass(month)\"\n              (click)=\"monthClicked(month)\"\n              [innerText]=\"month.text\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            MonthCalendarService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return MonthCalendarComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return MonthCalendarComponent; })),
                                multi: true
                            }
                        ],
                        styles: ["dp-month-calendar{display:inline-block}dp-month-calendar .dp-month-calendar-container{background:#fff}dp-month-calendar .dp-calendar-wrapper{border:1px solid #000}dp-month-calendar .dp-calendar-month{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-month-calendar .dp-calendar-month.dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-month-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-month-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-month-calendar.dp-material .dp-current-month{border:1px solid #106cc8}"]
                    }] }
        ];
        /** @nocollapse */
        MonthCalendarComponent.ctorParameters = function () {
            return [
                { type: MonthCalendarService },
                { type: UtilsService },
                { type: core.ChangeDetectorRef }
            ];
        };
        MonthCalendarComponent.propDecorators = {
            config: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            onSelect: [{ type: core.Output }],
            onNavHeaderBtnClick: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }],
            onLeftNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }],
            onLeftSecondaryNav: [{ type: core.Output }],
            onRightSecondaryNav: [{ type: core.Output }]
        };
        return MonthCalendarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$8 = momentNs;
    var YearCalendarService = /** @class */ (function () {
        function YearCalendarService(utilsService) {
            this.utilsService = utilsService;
            this.DEFAULT_CONFIG = {
                allowMultiSelect: false,
                yearFormat: 'YYYY',
                format: 'YYYY',
                isNavHeaderBtnClickable: false,
                yearBtnFormat: 'YYYY',
                locale: moment$8.locale(),
                multipleYearsNavigateBy: 10,
                showMultipleYearsNavigation: false,
                unSelectOnClick: true
            };
        }
        /**
         * @param {?} config
         * @return {?}
         */
        YearCalendarService.prototype.getConfig = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                /** @type {?} */
                var _config = ( /** @type {?} */(__assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
                this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
                moment$8.locale(_config.locale);
                return _config;
            };
        /**
         * @param {?} config
         * @param {?} year
         * @param {?=} selected
         * @return {?}
         */
        YearCalendarService.prototype.generateYear = /**
         * @param {?} config
         * @param {?} year
         * @param {?=} selected
         * @return {?}
         */
            function (config, year, selected) {
                var _this = this;
                if (selected === void 0) {
                    selected = null;
                }
                /** @type {?} */
                var index = year.clone().startOf('year');
                return this.utilsService.createArray(3).map(( /**
                 * @return {?}
                 */function () {
                    return _this.utilsService.createArray(4).map(( /**
                     * @return {?}
                     */function () {
                        /** @type {?} */
                        var date = index.clone();
                        /** @type {?} */
                        var year = {
                            date: date,
                            selected: !!selected.find(( /**
                             * @param {?} s
                             * @return {?}
                             */function (s) { return index.isSame(s, 'year'); })),
                            currentYear: index.isSame(moment$8(), 'year'),
                            disabled: _this.isYearDisabled(date, config),
                            text: _this.getYearBtnText(config, date)
                        };
                        index.add(1, 'year');
                        return year;
                    }));
                }));
            };
        /**
         * @param {?} date
         * @param {?} config
         * @return {?}
         */
        YearCalendarService.prototype.isYearDisabled = /**
         * @param {?} date
         * @param {?} config
         * @return {?}
         */
            function (date, config) {
                if (config.min && date.isBefore(config.min, 'year')) {
                    return true;
                }
                return !!(config.max && date.isAfter(config.max, 'year'));
            };
        /**
         * @param {?} min
         * @param {?} currentYearView
         * @return {?}
         */
        YearCalendarService.prototype.shouldShowLeft = /**
         * @param {?} min
         * @param {?} currentYearView
         * @return {?}
         */
            function (min, currentYearView) {
                return min ? min.isBefore(currentYearView, 'year') : true;
            };
        /**
         * @param {?} max
         * @param {?} currentYearView
         * @return {?}
         */
        YearCalendarService.prototype.shouldShowRight = /**
         * @param {?} max
         * @param {?} currentYearView
         * @return {?}
         */
            function (max, currentYearView) {
                return max ? max.isAfter(currentYearView, 'year') : true;
            };
        /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
        YearCalendarService.prototype.getHeaderLabel = /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
            function (config, year) {
                if (config.yearFormatter) {
                    return config.yearFormatter(year);
                }
                return year.format(config.yearFormat);
            };
        /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
        YearCalendarService.prototype.getYearBtnText = /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
            function (config, year) {
                if (config.yearBtnFormatter) {
                    return config.yearBtnFormatter(year);
                }
                return year.format(config.yearBtnFormat);
            };
        /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
        YearCalendarService.prototype.getYearBtnCssClass = /**
         * @param {?} config
         * @param {?} year
         * @return {?}
         */
            function (config, year) {
                if (config.yearBtnCssClassCallback) {
                    return config.yearBtnCssClassCallback(year);
                }
                return '';
            };
        YearCalendarService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        YearCalendarService.ctorParameters = function () {
            return [
                { type: UtilsService }
            ];
        };
        return YearCalendarService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$9 = momentNs;
    var YearCalendarComponent = /** @class */ (function () {
        function YearCalendarComponent(yearCalendarService, utilsService, cd) {
            this.yearCalendarService = yearCalendarService;
            this.utilsService = utilsService;
            this.cd = cd;
            this.onSelect = new core.EventEmitter();
            this.onNavHeaderBtnClick = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
            this.onLeftNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.onLeftSecondaryNav = new core.EventEmitter();
            this.onRightSecondaryNav = new core.EventEmitter();
            this.isInited = false;
            this._shouldShowCurrent = true;
            this.api = {
                toggleCalendar: this.toggleCalendarMode.bind(this),
                moveCalendarTo: this.moveCalendarTo.bind(this)
            };
        }
        Object.defineProperty(YearCalendarComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */ function () {
                return this._selected;
            },
            set: /**
             * @param {?} selected
             * @return {?}
             */ function (selected) {
                this._selected = selected;
                this.onChangeCallback(this.processOnChangeCallback(selected));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YearCalendarComponent.prototype, "currentDateView", {
            get: /**
             * @return {?}
             */ function () {
                return this._currentDateView;
            },
            set: /**
             * @param {?} current
             * @return {?}
             */ function (current) {
                this._currentDateView = current.clone();
                this.yearYears = this.yearCalendarService
                    .generateYear(this.componentConfig, this._currentDateView, this.selected);
                this.navLabel = this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
                this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
                this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
                this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
                this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.isInited = true;
                this.init();
                this.initValidators();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        YearCalendarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (this.isInited) {
                    var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
                    this.handleConfigChange(config);
                    this.init();
                    if (minDate || maxDate) {
                        this.initValidators();
                    }
                }
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                this.componentConfig = this.yearCalendarService.getConfig(this.config);
                this.selected = this.selected || [];
                this.currentDateView = this.displayDate
                    ? this.displayDate
                    : this.utilsService
                        .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
                this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
                this._shouldShowCurrent = this.shouldShowCurrent();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        YearCalendarComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
                if (value) {
                    this.selected = this.utilsService
                        .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
                    this.yearYears = this.yearCalendarService
                        .generateYear(this.componentConfig, this.currentDateView, this.selected);
                    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
                }
                else {
                    this.selected = [];
                    this.yearYears = this.yearCalendarService
                        .generateYear(this.componentConfig, this.currentDateView, this.selected);
                }
                this.cd.markForCheck();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        YearCalendarComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} _
         * @return {?}
         */
        YearCalendarComponent.prototype.onChangeCallback = /**
         * @param {?} _
         * @return {?}
         */
            function (_) {
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        YearCalendarComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
            };
        /**
         * @param {?} formControl
         * @return {?}
         */
        YearCalendarComponent.prototype.validate = /**
         * @param {?} formControl
         * @return {?}
         */
            function (formControl) {
                if (this.minDate || this.maxDate) {
                    return this.validateFn(formControl.value);
                }
                else {
                    return ( /**
                     * @return {?}
                     */function () { return null; });
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        YearCalendarComponent.prototype.processOnChangeCallback = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.initValidators = /**
         * @return {?}
         */
            function () {
                this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'year');
                this.onChangeCallback(this.processOnChangeCallback(this.selected));
            };
        /**
         * @param {?} year
         * @return {?}
         */
        YearCalendarComponent.prototype.yearClicked = /**
         * @param {?} year
         * @return {?}
         */
            function (year) {
                if (year.selected && !this.componentConfig.unSelectOnClick) {
                    return;
                }
                this.selected = this.utilsService
                    .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
                this.yearYears = this.yearCalendarService
                    .generateYear(this.componentConfig, this.currentDateView, this.selected);
                this.onSelect.emit(year);
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.onLeftNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().subtract(12, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.yearYears = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
                this.onLeftNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.onLeftSecondaryNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var navigateBy = this.componentConfig.multipleYearsNavigateBy;
                /** @type {?} */
                var isOutsideRange = this.componentConfig.min &&
                    this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
                if (isOutsideRange) {
                    navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
                }
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onLeftSecondaryNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.onRightNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().add(12, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onRightNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.onRightSecondaryNavClick = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var navigateBy = this.componentConfig.multipleYearsNavigateBy;
                /** @type {?} */
                var isOutsideRange = this.componentConfig.max &&
                    this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
                if (isOutsideRange) {
                    navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
                }
                /** @type {?} */
                var from = this.currentDateView.clone();
                this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
                /** @type {?} */
                var to = this.currentDateView.clone();
                this.onRightSecondaryNav.emit({ from: from, to: to });
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.toggleCalendarMode = /**
         * @return {?}
         */
            function () {
                this.onNavHeaderBtnClick.emit();
            };
        /**
         * @param {?} year
         * @return {?}
         */
        YearCalendarComponent.prototype.getYearBtnCssClass = /**
         * @param {?} year
         * @return {?}
         */
            function (year) {
                /** @type {?} */
                var cssClass = {
                    'dp-selected': year.selected,
                    'dp-current-year': year.currentYear
                };
                /** @type {?} */
                var customCssClass = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);
                if (customCssClass) {
                    cssClass[customCssClass] = true;
                }
                return cssClass;
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.shouldShowCurrent = /**
         * @return {?}
         */
            function () {
                return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'year', this.componentConfig.min, this.componentConfig.max);
            };
        /**
         * @return {?}
         */
        YearCalendarComponent.prototype.goToCurrent = /**
         * @return {?}
         */
            function () {
                this.currentDateView = moment$9();
                this.onGoToCurrent.emit();
            };
        /**
         * @param {?} to
         * @return {?}
         */
        YearCalendarComponent.prototype.moveCalendarTo = /**
         * @param {?} to
         * @return {?}
         */
            function (to) {
                if (to) {
                    this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
                    this.cd.markForCheck();
                }
            };
        /**
         * @param {?} config
         * @return {?}
         */
        YearCalendarComponent.prototype.handleConfigChange = /**
         * @param {?} config
         * @return {?}
         */
            function (config) {
                if (config) {
                    /** @type {?} */
                    var prevConf = this.yearCalendarService.getConfig(config.previousValue);
                    /** @type {?} */
                    var currentConf = this.yearCalendarService.getConfig(config.currentValue);
                    if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                        this._currentDateView = null;
                    }
                }
            };
        YearCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-year-calendar',
                        template: "<div class=\"dp-year-calendar-container\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [showRightSecondaryNav]=\"showSecondaryRightNav\"\n      [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n      [showGoToCurrent]=\"shouldShowCurrent()\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode()\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\">\n    <div class=\"dp-years-row\" *ngFor=\"let yearRow of yearYears\">\n      <button type=\"button\"\n              class=\"dp-calendar-year\"\n              *ngFor=\"let year of yearRow\"\n              [attr.data-date]=\"year.date.format(componentConfig.format)\"\n              [disabled]=\"year.disabled\"\n              [ngClass]=\"getYearBtnCssClass(year)\"\n              (click)=\"yearClicked(year)\"\n              [innerText]=\"year.text\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            YearCalendarService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return YearCalendarComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return YearCalendarComponent; })),
                                multi: true
                            }
                        ],
                        styles: ["dp-year-calendar{display:inline-block}dp-year-calendar .dp-year-calendar-container{background:#fff}dp-year-calendar .dp-calendar-wrapper{border:1px solid #000}dp-year-calendar .dp-calendar-year{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-year-calendar .dp-calendar-year.dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-year{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-year-calendar.dp-material .dp-calendar-year:hover{background:#e0e0e0}dp-year-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-year-calendar.dp-material .dp-current-year{border:1px solid #106cc8}"]
                    }] }
        ];
        /** @nocollapse */
        YearCalendarComponent.ctorParameters = function () {
            return [
                { type: YearCalendarService },
                { type: UtilsService },
                { type: core.ChangeDetectorRef }
            ];
        };
        YearCalendarComponent.propDecorators = {
            config: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            onSelect: [{ type: core.Output }],
            onNavHeaderBtnClick: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }],
            onLeftNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }],
            onLeftSecondaryNav: [{ type: core.Output }],
            onRightSecondaryNav: [{ type: core.Output }]
        };
        return YearCalendarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment$a = momentNs;
    var TimeSelectComponent = /** @class */ (function () {
        function TimeSelectComponent(timeSelectService, utilsService, cd) {
            this.timeSelectService = timeSelectService;
            this.utilsService = utilsService;
            this.cd = cd;
            this.onChange = new core.EventEmitter();
            this.isInited = false;
            this.api = {
                triggerChange: this.emitChange.bind(this)
            };
        }
        Object.defineProperty(TimeSelectComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */ function () {
                return this._selected;
            },
            set: /**
             * @param {?} selected
             * @return {?}
             */ function (selected) {
                this._selected = selected;
                this.calculateTimeParts(this.selected);
                this.showDecHour = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'hour');
                this.showDecMinute = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'minute');
                this.showDecSecond = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'second');
                this.showIncHour = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'hour');
                this.showIncMinute = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'minute');
                this.showIncSecond = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'second');
                this.showToggleMeridiem = this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this._selected);
                this.onChangeCallback(this.processOnChangeCallback(selected));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TimeSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.isInited = true;
                this.init();
                this.initValidators();
            };
        /**
         * @return {?}
         */
        TimeSelectComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                this.componentConfig = this.timeSelectService.getConfig(this.config);
                this.selected = this.selected || moment$a();
                this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        TimeSelectComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (this.isInited) {
                    var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
                    this.init();
                    if (minDate || maxDate || minTime || maxTime) {
                        this.initValidators();
                    }
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        TimeSelectComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
                if (value) {
                    /** @type {?} */
                    var momentValue = this.utilsService
                        .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
                    if (momentValue.isValid()) {
                        this.selected = momentValue;
                        this.inputValueType = this.utilsService
                            .getInputType(this.inputValue, false);
                    }
                }
                this.cd.markForCheck();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        TimeSelectComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} _
         * @return {?}
         */
        TimeSelectComponent.prototype.onChangeCallback = /**
         * @param {?} _
         * @return {?}
         */
            function (_) {
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        TimeSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
            };
        /**
         * @param {?} formControl
         * @return {?}
         */
        TimeSelectComponent.prototype.validate = /**
         * @param {?} formControl
         * @return {?}
         */
            function (formControl) {
                if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
                    return this.validateFn(formControl.value);
                }
                else {
                    return ( /**
                     * @return {?}
                     */function () { return null; });
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        TimeSelectComponent.prototype.processOnChangeCallback = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.componentConfig.returnedValueType || this.inputValueType);
            };
        /**
         * @return {?}
         */
        TimeSelectComponent.prototype.initValidators = /**
         * @return {?}
         */
            function () {
                this.validateFn = this.utilsService.createValidator({
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    minTime: this.minTime,
                    maxTime: this.maxTime
                }, undefined, 'day');
                this.onChangeCallback(this.processOnChangeCallback(this.selected));
            };
        /**
         * @param {?} unit
         * @return {?}
         */
        TimeSelectComponent.prototype.decrease = /**
         * @param {?} unit
         * @return {?}
         */
            function (unit) {
                this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
                this.emitChange();
            };
        /**
         * @param {?} unit
         * @return {?}
         */
        TimeSelectComponent.prototype.increase = /**
         * @param {?} unit
         * @return {?}
         */
            function (unit) {
                this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
                this.emitChange();
            };
        /**
         * @return {?}
         */
        TimeSelectComponent.prototype.toggleMeridiem = /**
         * @return {?}
         */
            function () {
                this.selected = this.timeSelectService.toggleMeridiem(this.selected);
                this.emitChange();
            };
        /**
         * @return {?}
         */
        TimeSelectComponent.prototype.emitChange = /**
         * @return {?}
         */
            function () {
                this.onChange.emit({ date: this.selected, selected: false });
                this.cd.markForCheck();
            };
        /**
         * @param {?} time
         * @return {?}
         */
        TimeSelectComponent.prototype.calculateTimeParts = /**
         * @param {?} time
         * @return {?}
         */
            function (time) {
                this.hours = this.timeSelectService.getHours(this.componentConfig, time);
                this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
                this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
                this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
            };
        TimeSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-time-select',
                        template: "<ul class=\"dp-time-select-controls\">\n  <li class=\"dp-time-select-control dp-time-select-control-hours\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showIncHour\"\n            (click)=\"increase('hour')\">\n    </button>\n    <span class=\"dp-time-select-display-hours\"\n          [innerText]=\"hours\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-time-select-control-down\"\n            [disabled]=\"!showDecHour\"\n            (click)=\"decrease('hour')\"></button>\n  </li>\n  <li class=\"dp-time-select-control dp-time-select-separator\"\n      [innerText]=\"componentConfig.timeSeparator\">\n  </li>\n  <li class=\"dp-time-select-control dp-time-select-control-minutes\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showIncMinute\"\n            (click)=\"increase('minute')\"></button>\n    <span class=\"dp-time-select-display-minutes\"\n          [innerText]=\"minutes\">\n    </span>\n    <button type=\"button\"\n            [disabled]=\"!showDecMinute\" class=\"dp-time-select-control-down\"\n            (click)=\"decrease('minute')\"></button>\n  </li>\n  <ng-container *ngIf=\"componentConfig.showSeconds\">\n    <li class=\"dp-time-select-control dp-time-select-separator\"\n        [innerText]=\"componentConfig.timeSeparator\">\n    </li>\n    <li class=\"dp-time-select-control dp-time-select-control-seconds\">\n      <button type=\"button\"\n              class=\"dp-time-select-control-up\"\n              [disabled]=\"!showIncSecond\"\n              (click)=\"increase('second')\"></button>\n      <span class=\"dp-time-select-display-seconds\"\n            [innerText]=\"seconds\">\n      </span>\n      <button type=\"button\"\n              class=\"dp-time-select-control-down\"\n              [disabled]=\"!showDecSecond\"\n              (click)=\"decrease('second')\"></button>\n    </li>\n  </ng-container>\n  <li class=\"dp-time-select-control dp-time-select-control-meridiem\" *ngIf=\"!componentConfig.showTwentyFourHours\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showToggleMeridiem\"\n            (click)=\"toggleMeridiem()\"></button>\n    <span class=\"dp-time-select-display-meridiem\"\n          [innerText]=\"meridiem\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-time-select-control-down\"\n            [disabled]=\"!showToggleMeridiem\"\n            (click)=\"toggleMeridiem()\"></button>\n  </li>\n</ul>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [
                            TimeSelectService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return TimeSelectComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return TimeSelectComponent; })),
                                multi: true
                            }
                        ],
                        styles: ["dp-time-select{display:inline-block}dp-time-select .dp-time-select-controls{margin:0;padding:0;text-align:center;line-height:normal;background:#fff}dp-time-select .dp-time-select-control{display:inline-block;width:35px;margin:0 auto;vertical-align:middle;font-size:inherit;letter-spacing:1px}dp-time-select .dp-time-select-control-down,dp-time-select .dp-time-select-control-up{position:relative;display:block;width:24px;height:24px;margin:3px auto;cursor:pointer}dp-time-select .dp-time-select-control-down::before,dp-time-select .dp-time-select-control-up::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0}dp-time-select .dp-time-select-control-up::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:4px}dp-time-select .dp-time-select-control-down::before{-webkit-transform:rotate(135deg);transform:rotate(135deg)}dp-time-select .dp-time-select-separator{width:5px}dp-time-select.dp-material .dp-time-select-control-down,dp-time-select.dp-material .dp-time-select-control-up{box-sizing:border-box;background:0 0;border:none;outline:0;border-radius:50%}dp-time-select.dp-material .dp-time-select-control-down::before,dp-time-select.dp-material .dp-time-select-control-up::before{left:0}dp-time-select.dp-material .dp-time-select-control-down:hover,dp-time-select.dp-material .dp-time-select-control-up:hover{background:#e0e0e0}"]
                    }] }
        ];
        /** @nocollapse */
        TimeSelectComponent.ctorParameters = function () {
            return [
                { type: TimeSelectService },
                { type: UtilsService },
                { type: core.ChangeDetectorRef }
            ];
        };
        TimeSelectComponent.propDecorators = {
            config: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            minTime: [{ type: core.Input }],
            maxTime: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            onChange: [{ type: core.Output }]
        };
        return TimeSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarNavComponent = /** @class */ (function () {
        function CalendarNavComponent() {
            this.isLabelClickable = false;
            this.showLeftNav = true;
            this.showLeftSecondaryNav = false;
            this.showRightNav = true;
            this.showRightSecondaryNav = false;
            this.leftNavDisabled = false;
            this.leftSecondaryNavDisabled = false;
            this.rightNavDisabled = false;
            this.rightSecondaryNavDisabled = false;
            this.showGoToCurrent = true;
            this.onLeftNav = new core.EventEmitter();
            this.onLeftSecondaryNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.onRightSecondaryNav = new core.EventEmitter();
            this.onLabelClick = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        CalendarNavComponent.prototype.leftNavClicked = /**
         * @return {?}
         */
            function () {
                this.onLeftNav.emit();
            };
        /**
         * @return {?}
         */
        CalendarNavComponent.prototype.leftSecondaryNavClicked = /**
         * @return {?}
         */
            function () {
                this.onLeftSecondaryNav.emit();
            };
        /**
         * @return {?}
         */
        CalendarNavComponent.prototype.rightNavClicked = /**
         * @return {?}
         */
            function () {
                this.onRightNav.emit();
            };
        /**
         * @return {?}
         */
        CalendarNavComponent.prototype.rightSecondaryNavClicked = /**
         * @return {?}
         */
            function () {
                this.onRightSecondaryNav.emit();
            };
        /**
         * @return {?}
         */
        CalendarNavComponent.prototype.labelClicked = /**
         * @return {?}
         */
            function () {
                this.onLabelClick.emit();
            };
        CalendarNavComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-calendar-nav',
                        template: "<div class=\"dp-calendar-nav-container\">\n  <div class=\"dp-nav-header\">\n    <span [hidden]=\"isLabelClickable\"\n          [attr.data-hidden]=\"isLabelClickable\"\n          [innerText]=\"label\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-nav-header-btn\"\n            [hidden]=\"!isLabelClickable\"\n            [attr.data-hidden]=\"!isLabelClickable\"\n            (click)=\"labelClicked()\"\n            [innerText]=\"label\">\n    </button>\n  </div>\n\n  <div class=\"dp-nav-btns-container\">\n    <div class=\"dp-calendar-nav-container-left\">\n      <button type=\"button\"\n              class=\"dp-calendar-secondary-nav-left\"\n              *ngIf=\"showLeftSecondaryNav\"\n              [disabled]=\"leftSecondaryNavDisabled\"\n              (click)=\"leftSecondaryNavClicked()\">\n      </button>\n      <button type=\"button\"\n              class=\"dp-calendar-nav-left\"\n              [hidden]=\"!showLeftNav\"\n              [attr.data-hidden]=\"!showLeftNav\"\n              [disabled]=\"leftNavDisabled\"\n              (click)=\"leftNavClicked()\">\n      </button>\n    </div>\n    <button type=\"button\"\n            class=\"dp-current-location-btn\"\n            *ngIf=\"showGoToCurrent\"\n            (click)=\"onGoToCurrent.emit()\">\n    </button>\n    <div class=\"dp-calendar-nav-container-right\">\n      <button type=\"button\"\n              class=\"dp-calendar-nav-right\"\n              [hidden]=\"!showRightNav\"\n              [attr.data-hidden]=\"!showRightNav\"\n              [disabled]=\"rightNavDisabled\"\n              (click)=\"rightNavClicked()\">\n      </button>\n      <button type=\"button\"\n              class=\"dp-calendar-secondary-nav-right\"\n              *ngIf=\"showRightSecondaryNav\"\n              [disabled]=\"rightSecondaryNavDisabled\"\n              (click)=\"rightSecondaryNavClicked()\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["dp-calendar-nav .dp-calendar-nav-container{position:relative;box-sizing:border-box;height:25px;border:1px solid #000;border-bottom:none}dp-calendar-nav .dp-nav-date-btn{box-sizing:border-box;height:25px;border:1px solid #000;border-bottom:none}dp-calendar-nav .dp-nav-btns-container{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:5px;display:inline-block}dp-calendar-nav .dp-calendar-nav-container-left,dp-calendar-nav .dp-calendar-nav-container-right{display:inline-block}dp-calendar-nav .dp-calendar-nav-left,dp-calendar-nav .dp-calendar-nav-right,dp-calendar-nav .dp-calendar-secondary-nav-left,dp-calendar-nav .dp-calendar-secondary-nav-right{position:relative;width:16px;cursor:pointer}dp-calendar-nav .dp-calendar-nav-left,dp-calendar-nav .dp-calendar-nav-right{line-height:0}dp-calendar-nav .dp-calendar-nav-left::before,dp-calendar-nav .dp-calendar-nav-right::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}dp-calendar-nav .dp-calendar-secondary-nav-left,dp-calendar-nav .dp-calendar-secondary-nav-right{padding:0}dp-calendar-nav .dp-calendar-secondary-nav-left::after,dp-calendar-nav .dp-calendar-secondary-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-right::after,dp-calendar-nav .dp-calendar-secondary-nav-right::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}dp-calendar-nav .dp-calendar-secondary-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-right::before{right:-10px}dp-calendar-nav .dp-calendar-secondary-nav-right{left:initial;right:5px}dp-calendar-nav .dp-calendar-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-left::after,dp-calendar-nav .dp-calendar-secondary-nav-left::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}dp-calendar-nav .dp-calendar-secondary-nav-left::before{right:-10px}dp-calendar-nav .dp-nav-header{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:5px;display:inline-block;font-size:13px}dp-calendar-nav .dp-nav-header-btn{cursor:pointer}dp-calendar-nav .dp-current-location-btn{position:relative;top:-1px;height:16px;width:16px;vertical-align:middle;background:rgba(0,0,0,.6);border:1px solid rgba(0,0,0,.6);outline:0;border-radius:50%;box-shadow:inset 0 0 0 3px #fff;cursor:pointer}dp-calendar-nav .dp-current-location-btn:hover{background:#000}dp-calendar-nav.dp-material .dp-calendar-nav-container{height:30px;border:1px solid #e0e0e0}dp-calendar-nav.dp-material .dp-calendar-nav-left,dp-calendar-nav.dp-material .dp-calendar-nav-right,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right{border:none;background:#fff;outline:0;font-size:16px;padding:0}dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right{width:20px}dp-calendar-nav.dp-material .dp-nav-header-btn{height:20px;width:80px;border:none;background:#fff;outline:0}dp-calendar-nav.dp-material .dp-nav-header-btn:hover{background:rgba(0,0,0,.05)}dp-calendar-nav.dp-material .dp-nav-header-btn:active{background:rgba(0,0,0,.1)}"]
                    }] }
        ];
        CalendarNavComponent.propDecorators = {
            label: [{ type: core.Input }],
            isLabelClickable: [{ type: core.Input }],
            showLeftNav: [{ type: core.Input }],
            showLeftSecondaryNav: [{ type: core.Input }],
            showRightNav: [{ type: core.Input }],
            showRightSecondaryNav: [{ type: core.Input }],
            leftNavDisabled: [{ type: core.Input }],
            leftSecondaryNavDisabled: [{ type: core.Input }],
            rightNavDisabled: [{ type: core.Input }],
            rightSecondaryNavDisabled: [{ type: core.Input }],
            showGoToCurrent: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            onLeftNav: [{ type: core.Output }],
            onLeftSecondaryNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }],
            onRightSecondaryNav: [{ type: core.Output }],
            onLabelClick: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }]
        };
        return CalendarNavComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DayTimeCalendarComponent = /** @class */ (function () {
        function DayTimeCalendarComponent(dayTimeCalendarService, utilsService, cd) {
            this.dayTimeCalendarService = dayTimeCalendarService;
            this.utilsService = utilsService;
            this.cd = cd;
            this.onChange = new core.EventEmitter();
            this.onGoToCurrent = new core.EventEmitter();
            this.onLeftNav = new core.EventEmitter();
            this.onRightNav = new core.EventEmitter();
            this.isInited = false;
            this.api = {
                moveCalendarTo: this.moveCalendarTo.bind(this)
            };
        }
        Object.defineProperty(DayTimeCalendarComponent.prototype, "selected", {
            get: /**
             * @return {?}
             */ function () {
                return this._selected;
            },
            set: /**
             * @param {?} selected
             * @return {?}
             */ function (selected) {
                this._selected = selected;
                this.onChangeCallback(this.processOnChangeCallback(selected));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.isInited = true;
                this.init();
                this.initValidators();
            };
        /**
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.init = /**
         * @return {?}
         */
            function () {
                this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
                this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (this.isInited) {
                    var minDate = changes.minDate, maxDate = changes.maxDate;
                    this.init();
                    if (minDate || maxDate) {
                        this.initValidators();
                    }
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.inputValue = value;
                if (value) {
                    this.selected = this.utilsService
                        .convertToMomentArray(value, this.componentConfig.format, false)[0];
                    this.inputValueType = this.utilsService
                        .getInputType(this.inputValue, false);
                }
                else {
                    this.selected = null;
                }
                this.cd.markForCheck();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        /**
         * @param {?} _
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.onChangeCallback = /**
         * @param {?} _
         * @return {?}
         */
            function (_) {
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
            };
        /**
         * @param {?} formControl
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.validate = /**
         * @param {?} formControl
         * @return {?}
         */
            function (formControl) {
                if (this.minDate || this.maxDate) {
                    return this.validateFn(formControl.value);
                }
                else {
                    return ( /**
                     * @return {?}
                     */function () { return null; });
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.processOnChangeCallback = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.utilsService.convertFromMomentArray(this.componentConfig.format, [value], this.componentConfig.returnedValueType || this.inputValueType);
            };
        /**
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.initValidators = /**
         * @return {?}
         */
            function () {
                this.validateFn = this.utilsService.createValidator({
                    minDate: this.minDate,
                    maxDate: this.maxDate
                }, undefined, 'daytime');
                this.onChangeCallback(this.processOnChangeCallback(this.selected));
            };
        /**
         * @param {?} day
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.dateSelected = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date, this.config);
                this.emitChange();
            };
        /**
         * @param {?} time
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.timeChange = /**
         * @param {?} time
         * @return {?}
         */
            function (time) {
                this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
                this.emitChange();
            };
        /**
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.emitChange = /**
         * @return {?}
         */
            function () {
                this.onChange.emit({ date: this.selected, selected: false });
            };
        /**
         * @param {?} to
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.moveCalendarTo = /**
         * @param {?} to
         * @return {?}
         */
            function (to) {
                if (to) {
                    this.dayCalendarRef.moveCalendarTo(to);
                }
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.onLeftNavClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onLeftNav.emit(change);
            };
        /**
         * @param {?} change
         * @return {?}
         */
        DayTimeCalendarComponent.prototype.onRightNavClick = /**
         * @param {?} change
         * @return {?}
         */
            function (change) {
                this.onRightNav.emit(change);
            };
        DayTimeCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dp-day-time-calendar',
                        template: "<dp-day-calendar #dayCalendar\n                 [config]=\"componentConfig\"\n                 [ngModel]=\"_selected\"\n                 [theme]=\"theme\"\n                 [displayDate]=\"displayDate\"\n                 (onSelect)=\"dateSelected($event)\"\n                 (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                 (onLeftNav)=\"onLeftNavClick($event)\"\n                 (onRightNav)=\"onRightNavClick($event)\">\n</dp-day-calendar>\n<dp-time-select #timeSelect\n                [config]=\"componentConfig\"\n                [ngModel]=\"_selected\"\n                (onChange)=\"timeChange($event)\"\n                [theme]=\"theme\">\n</dp-time-select>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [
                            DayTimeCalendarService,
                            DayCalendarService,
                            TimeSelectService,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return DayTimeCalendarComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: core.forwardRef(( /**
                                 * @return {?}
                                 */function () { return DayTimeCalendarComponent; })),
                                multi: true
                            }
                        ],
                        styles: ["dp-day-time-calendar{display:inline-block}dp-day-time-calendar dp-time-select{display:block;border:1px solid #000;border-top:0}dp-day-time-calendar.dp-material dp-time-select{border:1px solid #e0e0e0;border-top:0}"]
                    }] }
        ];
        /** @nocollapse */
        DayTimeCalendarComponent.ctorParameters = function () {
            return [
                { type: DayTimeCalendarService },
                { type: UtilsService },
                { type: core.ChangeDetectorRef }
            ];
        };
        DayTimeCalendarComponent.propDecorators = {
            config: [{ type: core.Input }],
            displayDate: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            theme: [{ type: core.HostBinding, args: ['class',] }, { type: core.Input }],
            onChange: [{ type: core.Output }],
            onGoToCurrent: [{ type: core.Output }],
            onLeftNav: [{ type: core.Output }],
            onRightNav: [{ type: core.Output }],
            dayCalendarRef: [{ type: core.ViewChild, args: ['dayCalendar',] }]
        };
        return DayTimeCalendarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DpDatePickerModule = /** @class */ (function () {
        function DpDatePickerModule() {
        }
        DpDatePickerModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            DomHelper,
                            UtilsService
                        ],
                        declarations: [
                            DatePickerComponent,
                            DatePickerDirective,
                            DayCalendarComponent,
                            MonthCalendarComponent,
                            CalendarNavComponent,
                            TimeSelectComponent,
                            DayTimeCalendarComponent,
                            YearCalendarComponent
                        ],
                        entryComponents: [
                            DatePickerComponent
                        ],
                        imports: [
                            common.CommonModule,
                            forms.FormsModule
                        ],
                        exports: [
                            DatePickerComponent,
                            DatePickerDirective,
                            MonthCalendarComponent,
                            DayCalendarComponent,
                            TimeSelectComponent,
                            DayTimeCalendarComponent,
                            YearCalendarComponent
                        ]
                    },] }
        ];
        return DpDatePickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ECalendarMode = ECalendarMode;
    exports.ECalendarValue = ECalendarValue;
    exports.SelectEvent = SelectEvent;
    exports.DatePickerComponent = DatePickerComponent;
    exports.DatePickerDirective = DatePickerDirective;
    exports.DayCalendarComponent = DayCalendarComponent;
    exports.DayTimeCalendarComponent = DayTimeCalendarComponent;
    exports.TimeSelectComponent = TimeSelectComponent;
    exports.MonthCalendarComponent = MonthCalendarComponent;
    exports.YearCalendarComponent = YearCalendarComponent;
    exports.DpDatePickerModule = DpDatePickerModule;
    exports.ɵi = CalendarNavComponent;
    exports.ɵa = DomHelper;
    exports.ɵb = UtilsService;
    exports.ɵg = DatePickerDirectiveService;
    exports.ɵc = DatePickerService;
    exports.ɵf = DayCalendarService;
    exports.ɵe = DayTimeCalendarService;
    exports.ɵh = MonthCalendarService;
    exports.ɵd = TimeSelectService;
    exports.ɵj = YearCalendarService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng2-date-picker.umd.js.map