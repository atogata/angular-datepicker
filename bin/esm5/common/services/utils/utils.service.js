/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ECalendarValue } from '../../types/calendar-value-enum';
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
/** @type {?} */
var moment = momentNs;
/**
 * @record
 */
export function DateLimits() { }
if (false) {
    /** @type {?|undefined} */
    DateLimits.prototype.minDate;
    /** @type {?|undefined} */
    DateLimits.prototype.maxDate;
    /** @type {?|undefined} */
    DateLimits.prototype.minTime;
    /** @type {?|undefined} */
    DateLimits.prototype.maxTime;
}
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
        return (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var context = this;
            /** @type {?} */
            var args = arguments;
            timeout = clearTimeout(timeout);
            setTimeout((/**
             * @return {?}
             */
            function () {
                func.apply(context, args);
            }), wait);
        });
    };
    ;
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
                return value ? [moment((/** @type {?} */ (value)), format, true)] : [];
            case (ECalendarValue.StringArr):
                return ((/** @type {?} */ (value))).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v ? moment(v, format, true) : null; })).filter(Boolean);
            case (ECalendarValue.Moment):
                return value ? [((/** @type {?} */ (value))).clone()] : [];
            case (ECalendarValue.MomentArr):
                return ((/** @type {?} */ (value)) || []).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.clone(); }));
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
                return value.filter(Boolean).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.format(format); }));
            case (ECalendarValue.Moment):
                return value[0] ? value[0].clone() : value[0];
            case (ECalendarValue.MomentArr):
                return value ? value.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.clone(); })) : value;
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
                tmpVal = ((/** @type {?} */ (value))).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    return _this.convertToMoment(v, format).format(format);
                }));
            }
            else {
                tmpVal = (/** @type {?} */ (value));
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
        Object.keys(obj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return (obj[key] === undefined) && delete obj[key]; }));
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
        if (granularity === void 0) { granularity = 'day'; }
        if (isMultiple) {
            return !date.selected
                ? currentlySelected.concat([date.date])
                : currentlySelected.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return !d.isSame(date.date, granularity); }));
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
        var match = (/** @type {?} */ (element.querySelector(selector)));
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
                isValid: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    function (val) { return val.isSameOrAfter(md_1, granularity); }));
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
                isValid: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    function (val) { return val.isSameOrBefore(md_2, granularity); }));
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
                isValid: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    function (val) { return _this.onlyTime(val).isSameOrAfter(md_3); }));
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
                isValid: (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    function (val) { return _this.onlyTime(val).isSameOrBefore(md_4); }));
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                })
            });
        }
        return (/**
         * @param {?} inputVal
         * @return {?}
         */
        function (inputVal) {
            isValid = true;
            value = _this.convertToMomentArray(inputVal, format, true).filter(Boolean);
            if (!value.every((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val.isValid(); }))) {
                return {
                    format: {
                        given: inputVal
                    }
                };
            }
            /** @type {?} */
            var errors = validators.reduce((/**
             * @param {?} map
             * @param {?} err
             * @return {?}
             */
            function (map, err) {
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
        return (value || '').split('|').map((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m.trim(); })).filter(Boolean);
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
            .filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return _this.isDateValid(d, format); }))
            .map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return moment(d, format); }));
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
        props.forEach((/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
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
            return (/** @type {?} */ (document.querySelector(elem)));
        }
        else {
            return elem;
        }
    };
    UtilsService.decorators = [
        { type: Injectable }
    ];
    return UtilsService;
}());
export { UtilsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImNvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFL0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEtBQUssUUFBUSxNQUFNLFFBQVEsQ0FBQzs7SUFRN0IsTUFBTSxHQUFHLFFBQVE7Ozs7QUFFdkIsZ0NBS0M7OztJQUpDLDZCQUE4Qjs7SUFDOUIsNkJBQThCOztJQUM5Qiw2QkFBOEI7O0lBQzlCLDZCQUE4Qjs7QUFHaEM7SUFBQTtJQStUQSxDQUFDOzs7Ozs7SUE3VFEscUJBQVE7Ozs7O0lBQWYsVUFBZ0IsSUFBYyxFQUFFLElBQVk7O1lBQ3RDLE9BQU87UUFDWDs7O1FBQU87O2dCQUNDLE9BQU8sR0FBRyxJQUFJOztnQkFBRSxJQUFJLEdBQUcsU0FBUztZQUN0QyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLFVBQVU7OztZQUFDO2dCQUNULElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztRQUNYLENBQUMsRUFBQztJQUNKLENBQUM7SUFBQSxDQUFDOzs7OztJQUVGLGtDQUFXOzs7O0lBQVgsVUFBWSxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQUVELHNDQUFlOzs7OztJQUFmLFVBQWdCLElBQXlCLEVBQUUsTUFBYztRQUN2RCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUks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R0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEYsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEYsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRUQsdUNBQWdCOzs7O0lBQWhCLFVBQWlCLElBQTBCO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDbkMsT0FBTyxtQkFBYSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFBLENBQUM7U0FDbEQ7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOztnQkE5VEYsVUFBVTs7SUErVFgsbUJBQUM7Q0FBQSxBQS9URCxJQStUQztTQTlUWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vLi4vdHlwZXMvY2FsZW5kYXItdmFsdWUtZW51bSc7XG5pbXBvcnQge1NpbmdsZUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uLy4uL3R5cGVzL3NpbmdsZS1jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgbW9tZW50TnMgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7TW9tZW50LCB1bml0T2ZUaW1lfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtDYWxlbmRhclZhbHVlfSBmcm9tICcuLi8uLi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge0lEYXRlfSBmcm9tICcuLi8uLi9tb2RlbHMvZGF0ZS5tb2RlbCc7XG5pbXBvcnQge0NhbGVuZGFyTW9kZX0gZnJvbSAnLi4vLi4vdHlwZXMvY2FsZW5kYXItbW9kZSc7XG5pbXBvcnQge0RhdGVWYWxpZGF0b3J9IGZyb20gJy4uLy4uL3R5cGVzL3ZhbGlkYXRvci50eXBlJztcbmltcG9ydCB7SUNhbGVuZGFySW50ZXJuYWx9IGZyb20gJy4uLy4uL21vZGVscy9jYWxlbmRhci5tb2RlbCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudE5zO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVMaW1pdHMge1xuICBtaW5EYXRlPzogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgbWF4RGF0ZT86IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIG1pblRpbWU/OiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBtYXhUaW1lPzogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSB7XG4gIHN0YXRpYyBkZWJvdW5jZShmdW5jOiBGdW5jdGlvbiwgd2FpdDogbnVtYmVyKSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdGltZW91dCA9IGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfSwgd2FpdCk7XG4gICAgfTtcbiAgfTtcblxuICBjcmVhdGVBcnJheShzaXplOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheShzaXplKS5maWxsKDEpO1xuICB9XG5cbiAgY29udmVydFRvTW9tZW50KGRhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWUsIGZvcm1hdDogc3RyaW5nKTogTW9tZW50IHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbW9tZW50KGRhdGUsIGZvcm1hdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRlLmNsb25lKCk7XG4gICAgfVxuICB9XG5cbiAgaXNEYXRlVmFsaWQoZGF0ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChkYXRlID09PSAnJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbWVudChkYXRlLCBmb3JtYXQsIHRydWUpLmlzVmFsaWQoKTtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0XG4gIGdldERlZmF1bHREaXNwbGF5RGF0ZShjdXJyZW50OiBNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogTW9tZW50W10sXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd011bHRpU2VsZWN0OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICBpZiAoY3VycmVudCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQuY2xvbmUoKTtcbiAgICB9IGVsc2UgaWYgKG1pbkRhdGUgJiYgbWluRGF0ZS5pc0FmdGVyKG1vbWVudCgpKSkge1xuICAgICAgcmV0dXJuIG1pbkRhdGUuY2xvbmUoKTtcbiAgICB9IGVsc2UgaWYgKGFsbG93TXVsdGlTZWxlY3QpIHtcbiAgICAgIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZFtzZWxlY3RlZC5sZW5ndGhdKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFtzZWxlY3RlZC5sZW5ndGhdLmNsb25lKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZFswXSkge1xuICAgICAgcmV0dXJuIHNlbGVjdGVkWzBdLmNsb25lKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbWVudCgpO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RcbiAgZ2V0SW5wdXRUeXBlKHZhbHVlOiBDYWxlbmRhclZhbHVlLCBhbGxvd011bHRpU2VsZWN0OiBib29sZWFuKTogRUNhbGVuZGFyVmFsdWUge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIEVDYWxlbmRhclZhbHVlLk1vbWVudEFycjtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gRUNhbGVuZGFyVmFsdWUuU3RyaW5nQXJyO1xuICAgICAgfSBlbHNlIGlmIChtb21lbnQuaXNNb21lbnQodmFsdWVbMF0pKSB7XG4gICAgICAgIHJldHVybiBFQ2FsZW5kYXJWYWx1ZS5Nb21lbnRBcnI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBFQ2FsZW5kYXJWYWx1ZS5TdHJpbmc7XG4gICAgICB9IGVsc2UgaWYgKG1vbWVudC5pc01vbWVudCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIEVDYWxlbmRhclZhbHVlLk1vbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWxsb3dNdWx0aVNlbGVjdCA/IEVDYWxlbmRhclZhbHVlLk1vbWVudEFyciA6IEVDYWxlbmRhclZhbHVlLk1vbWVudDtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0XG4gIGNvbnZlcnRUb01vbWVudEFycmF5KHZhbHVlOiBDYWxlbmRhclZhbHVlLCBmb3JtYXQ6IHN0cmluZywgYWxsb3dNdWx0aVNlbGVjdDogYm9vbGVhbik6IE1vbWVudFtdIHtcbiAgICBzd2l0Y2ggKHRoaXMuZ2V0SW5wdXRUeXBlKHZhbHVlLCBhbGxvd011bHRpU2VsZWN0KSkge1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuU3RyaW5nKTpcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gW21vbWVudCg8c3RyaW5nPnZhbHVlLCBmb3JtYXQsIHRydWUpXSA6IFtdO1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuU3RyaW5nQXJyKTpcbiAgICAgICAgcmV0dXJuICg8c3RyaW5nW10+dmFsdWUpLm1hcCh2ID0+IHYgPyBtb21lbnQodiwgZm9ybWF0LCB0cnVlKSA6IG51bGwpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIGNhc2UgKEVDYWxlbmRhclZhbHVlLk1vbWVudCk6XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IFsoPE1vbWVudD52YWx1ZSkuY2xvbmUoKV0gOiBbXTtcbiAgICAgIGNhc2UgKEVDYWxlbmRhclZhbHVlLk1vbWVudEFycik6XG4gICAgICAgIHJldHVybiAoPE1vbWVudFtdPnZhbHVlIHx8IFtdKS5tYXAodiA9PiB2LmNsb25lKCkpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0XG4gIGNvbnZlcnRGcm9tTW9tZW50QXJyYXkoZm9ybWF0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IE1vbWVudFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnZlcnRUbzogRUNhbGVuZGFyVmFsdWUpOiBDYWxlbmRhclZhbHVlIHtcbiAgICBzd2l0Y2ggKGNvbnZlcnRUbykge1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuU3RyaW5nKTpcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdICYmIHZhbHVlWzBdLmZvcm1hdChmb3JtYXQpO1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuU3RyaW5nQXJyKTpcbiAgICAgICAgcmV0dXJuIHZhbHVlLmZpbHRlcihCb29sZWFuKS5tYXAodiA9PiB2LmZvcm1hdChmb3JtYXQpKTtcbiAgICAgIGNhc2UgKEVDYWxlbmRhclZhbHVlLk1vbWVudCk6XG4gICAgICAgIHJldHVybiB2YWx1ZVswXSA/IHZhbHVlWzBdLmNsb25lKCkgOiB2YWx1ZVswXTtcbiAgICAgIGNhc2UgKEVDYWxlbmRhclZhbHVlLk1vbWVudEFycik6XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLm1hcCh2ID0+IHYuY2xvbmUoKSkgOiB2YWx1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0VG9TdHJpbmcodmFsdWU6IENhbGVuZGFyVmFsdWUsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgdG1wVmFsOiBzdHJpbmdbXTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0bXBWYWwgPSBbdmFsdWVdO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdG1wVmFsID0gKDxTaW5nbGVDYWxlbmRhclZhbHVlW10+dmFsdWUpLm1hcCgodikgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb01vbWVudCh2LCBmb3JtYXQpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRtcFZhbCA9IDxzdHJpbmdbXT52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vbWVudC5pc01vbWVudCh2YWx1ZSkpIHtcbiAgICAgIHRtcFZhbCA9IFt2YWx1ZS5mb3JtYXQoZm9ybWF0KV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gdG1wVmFsLmZpbHRlcihCb29sZWFuKS5qb2luKCcgfCAnKTtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0XG4gIGNsZWFyVW5kZWZpbmVkPFQ+KG9iajogVCk6IFQge1xuICAgIGlmICghb2JqKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaCgoa2V5KSA9PiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkgJiYgZGVsZXRlIG9ialtrZXldKTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdXBkYXRlU2VsZWN0ZWQoaXNNdWx0aXBsZTogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgY3VycmVudGx5U2VsZWN0ZWQ6IE1vbWVudFtdLFxuICAgICAgICAgICAgICAgICBkYXRlOiBJRGF0ZSxcbiAgICAgICAgICAgICAgICAgZ3JhbnVsYXJpdHk6IHVuaXRPZlRpbWUuQmFzZSA9ICdkYXknKTogTW9tZW50W10ge1xuICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICByZXR1cm4gIWRhdGUuc2VsZWN0ZWRcbiAgICAgICAgPyBjdXJyZW50bHlTZWxlY3RlZC5jb25jYXQoW2RhdGUuZGF0ZV0pXG4gICAgICAgIDogY3VycmVudGx5U2VsZWN0ZWQuZmlsdGVyKGQgPT4gIWQuaXNTYW1lKGRhdGUuZGF0ZSwgZ3JhbnVsYXJpdHkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICFkYXRlLnNlbGVjdGVkID8gW2RhdGUuZGF0ZV0gOiBbXTtcbiAgICB9XG4gIH1cblxuICBjbG9zZXN0UGFyZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2ggPSA8SFRNTEVsZW1lbnQ+ZWxlbWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gbWF0Y2ggfHwgdGhpcy5jbG9zZXN0UGFyZW50KGVsZW1lbnQucGFyZW50RWxlbWVudCwgc2VsZWN0b3IpO1xuICB9XG5cbiAgb25seVRpbWUobTogTW9tZW50KTogTW9tZW50IHtcbiAgICByZXR1cm4gbSAmJiBtb21lbnQuaXNNb21lbnQobSkgJiYgbW9tZW50KG0uZm9ybWF0KCdISDptbTpzcycpLCAnSEg6bW06c3MnKTtcbiAgfVxuXG4gIGdyYW51bGFyaXR5RnJvbVR5cGUoY2FsZW5kYXJUeXBlOiBDYWxlbmRhck1vZGUpOiB1bml0T2ZUaW1lLkJhc2Uge1xuICAgIHN3aXRjaCAoY2FsZW5kYXJUeXBlKSB7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuICdzZWNvbmQnO1xuICAgICAgY2FzZSAnZGF5dGltZSc6XG4gICAgICAgIHJldHVybiAnc2Vjb25kJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjYWxlbmRhclR5cGU7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlVmFsaWRhdG9yKHttaW5EYXRlLCBtYXhEYXRlLCBtaW5UaW1lLCBtYXhUaW1lfTogRGF0ZUxpbWl0cyxcbiAgICAgICAgICAgICAgICAgIGZvcm1hdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXJUeXBlOiBDYWxlbmRhck1vZGUpOiBEYXRlVmFsaWRhdG9yIHtcbiAgICBsZXQgaXNWYWxpZDogYm9vbGVhbjtcbiAgICBsZXQgdmFsdWU6IE1vbWVudFtdO1xuICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBbXTtcbiAgICBjb25zdCBncmFudWxhcml0eSA9IHRoaXMuZ3JhbnVsYXJpdHlGcm9tVHlwZShjYWxlbmRhclR5cGUpO1xuXG4gICAgaWYgKG1pbkRhdGUpIHtcbiAgICAgIGNvbnN0IG1kID0gdGhpcy5jb252ZXJ0VG9Nb21lbnQobWluRGF0ZSwgZm9ybWF0KTtcbiAgICAgIHZhbGlkYXRvcnMucHVzaCh7XG4gICAgICAgIGtleTogJ21pbkRhdGUnLFxuICAgICAgICBpc1ZhbGlkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgX2lzVmFsaWQgPSB2YWx1ZS5ldmVyeSh2YWwgPT4gdmFsLmlzU2FtZU9yQWZ0ZXIobWQsIGdyYW51bGFyaXR5KSk7XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgPyBfaXNWYWxpZCA6IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBfaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1heERhdGUpIHtcbiAgICAgIGNvbnN0IG1kID0gdGhpcy5jb252ZXJ0VG9Nb21lbnQobWF4RGF0ZSwgZm9ybWF0KTtcbiAgICAgIHZhbGlkYXRvcnMucHVzaCh7XG4gICAgICAgIGtleTogJ21heERhdGUnLFxuICAgICAgICBpc1ZhbGlkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgX2lzVmFsaWQgPSB2YWx1ZS5ldmVyeSh2YWwgPT4gdmFsLmlzU2FtZU9yQmVmb3JlKG1kLCBncmFudWxhcml0eSkpO1xuICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkID8gX2lzVmFsaWQgOiBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gX2lzVmFsaWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChtaW5UaW1lKSB7XG4gICAgICBjb25zdCBtZCA9IHRoaXMub25seVRpbWUodGhpcy5jb252ZXJ0VG9Nb21lbnQobWluVGltZSwgZm9ybWF0KSk7XG4gICAgICB2YWxpZGF0b3JzLnB1c2goe1xuICAgICAgICBrZXk6ICdtaW5UaW1lJyxcbiAgICAgICAgaXNWYWxpZDogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IF9pc1ZhbGlkID0gdmFsdWUuZXZlcnkodmFsID0+IHRoaXMub25seVRpbWUodmFsKS5pc1NhbWVPckFmdGVyKG1kKSk7XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgPyBfaXNWYWxpZCA6IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBfaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1heFRpbWUpIHtcbiAgICAgIGNvbnN0IG1kID0gdGhpcy5vbmx5VGltZSh0aGlzLmNvbnZlcnRUb01vbWVudChtYXhUaW1lLCBmb3JtYXQpKTtcbiAgICAgIHZhbGlkYXRvcnMucHVzaCh7XG4gICAgICAgIGtleTogJ21heFRpbWUnLFxuICAgICAgICBpc1ZhbGlkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgX2lzVmFsaWQgPSB2YWx1ZS5ldmVyeSh2YWwgPT4gdGhpcy5vbmx5VGltZSh2YWwpLmlzU2FtZU9yQmVmb3JlKG1kKSk7XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgPyBfaXNWYWxpZCA6IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBfaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChpbnB1dFZhbDogQ2FsZW5kYXJWYWx1ZSkgPT4ge1xuICAgICAgaXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIHZhbHVlID0gdGhpcy5jb252ZXJ0VG9Nb21lbnRBcnJheShpbnB1dFZhbCwgZm9ybWF0LCB0cnVlKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICAgIGlmICghdmFsdWUuZXZlcnkodmFsID0+IHZhbC5pc1ZhbGlkKCkpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICBnaXZlbjogaW5wdXRWYWxcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVycm9ycyA9IHZhbGlkYXRvcnMucmVkdWNlKChtYXAsIGVycikgPT4ge1xuICAgICAgICBpZiAoIWVyci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICBtYXBbZXJyLmtleV0gPSB7XG4gICAgICAgICAgICBnaXZlbjogdmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgcmV0dXJuICFpc1ZhbGlkID8gZXJyb3JzIDogbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZGF0ZXNTdHJpbmdUb1N0cmluZ0FycmF5KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuICh2YWx1ZSB8fCAnJykuc3BsaXQoJ3wnKS5tYXAobSA9PiBtLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xuICB9XG5cbiAgZ2V0VmFsaWRNb21lbnRBcnJheSh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IE1vbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlc1N0cmluZ1RvU3RyaW5nQXJyYXkodmFsdWUpXG4gICAgICAuZmlsdGVyKGQgPT4gdGhpcy5pc0RhdGVWYWxpZChkLCBmb3JtYXQpKVxuICAgICAgLm1hcChkID0+IG1vbWVudChkLCBmb3JtYXQpKTtcbiAgfVxuXG4gIHNob3VsZFNob3dDdXJyZW50KHNob3dHb1RvQ3VycmVudDogYm9vbGVhbixcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogQ2FsZW5kYXJNb2RlLFxuICAgICAgICAgICAgICAgICAgICBtaW46IE1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2hvd0dvVG9DdXJyZW50ICYmXG4gICAgICBtb2RlICE9PSAndGltZScgJiZcbiAgICAgIHRoaXMuaXNEYXRlSW5SYW5nZShtb21lbnQoKSwgbWluLCBtYXgpO1xuICB9XG5cbiAgaXNEYXRlSW5SYW5nZShkYXRlOiBNb21lbnQsIGZyb206IE1vbWVudCwgdG86IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXRlLmlzQmV0d2Vlbihmcm9tLCB0bywgJ2RheScsICdbXScpO1xuICB9XG5cbiAgY29udmVydFByb3BzVG9Nb21lbnQob2JqOiB7W2tleTogc3RyaW5nXTogYW55fSwgZm9ybWF0OiBzdHJpbmcsIHByb3BzOiBzdHJpbmdbXSkge1xuICAgIHByb3BzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgb2JqW3Byb3BdID0gdGhpcy5jb252ZXJ0VG9Nb21lbnQob2JqW3Byb3BdLCBmb3JtYXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvdWxkUmVzZXRDdXJyZW50VmlldzxUIGV4dGVuZHMgSUNhbGVuZGFySW50ZXJuYWw+KHByZXZDb25mOiBULCBjdXJyZW50Q29uZjogVCk6IGJvb2xlYW4ge1xuICAgIGlmIChwcmV2Q29uZiAmJiBjdXJyZW50Q29uZikge1xuICAgICAgaWYgKCFwcmV2Q29uZi5taW4gJiYgY3VycmVudENvbmYubWluKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChwcmV2Q29uZi5taW4gJiYgY3VycmVudENvbmYubWluICYmICFwcmV2Q29uZi5taW4uaXNTYW1lKGN1cnJlbnRDb25mLm1pbiwgJ2QnKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIXByZXZDb25mLm1heCAmJiBjdXJyZW50Q29uZi5tYXgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHByZXZDb25mLm1heCAmJiBjdXJyZW50Q29uZi5tYXggJiYgIXByZXZDb25mLm1heC5pc1NhbWUoY3VycmVudENvbmYubWF4LCAnZCcpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TmF0aXZlRWxlbWVudChlbGVtOiBIVE1MRWxlbWVudCB8IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIWVsZW0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cbiAgfVxufVxuIl19