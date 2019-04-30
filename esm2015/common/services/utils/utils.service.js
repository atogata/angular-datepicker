/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ECalendarValue } from '../../types/calendar-value-enum';
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
/** @type {?} */
const moment = momentNs;
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
export class UtilsService {
    /**
     * @param {?} func
     * @param {?} wait
     * @return {?}
     */
    static debounce(func, wait) {
        /** @type {?} */
        let timeout;
        return (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const context = this;
            /** @type {?} */
            const args = arguments;
            timeout = clearTimeout(timeout);
            setTimeout((/**
             * @return {?}
             */
            () => {
                func.apply(context, args);
            }), wait);
        });
    }
    ;
    /**
     * @param {?} size
     * @return {?}
     */
    createArray(size) {
        return new Array(size).fill(1);
    }
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    convertToMoment(date, format) {
        if (!date) {
            return null;
        }
        else if (typeof date === 'string') {
            return moment(date, format);
        }
        else {
            return date.clone();
        }
    }
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    isDateValid(date, format) {
        if (date === '') {
            return true;
        }
        return moment(date, format, true).isValid();
    }
    // todo:: add unit test
    /**
     * @param {?} current
     * @param {?} selected
     * @param {?} allowMultiSelect
     * @param {?} minDate
     * @return {?}
     */
    getDefaultDisplayDate(current, selected, allowMultiSelect, minDate) {
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
    }
    // todo:: add unit test
    /**
     * @param {?} value
     * @param {?} allowMultiSelect
     * @return {?}
     */
    getInputType(value, allowMultiSelect) {
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
    }
    // todo:: add unit test
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} allowMultiSelect
     * @return {?}
     */
    convertToMomentArray(value, format, allowMultiSelect) {
        switch (this.getInputType(value, allowMultiSelect)) {
            case (ECalendarValue.String):
                return value ? [moment((/** @type {?} */ (value)), format, true)] : [];
            case (ECalendarValue.StringArr):
                return ((/** @type {?} */ (value))).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => v ? moment(v, format, true) : null)).filter(Boolean);
            case (ECalendarValue.Moment):
                return value ? [((/** @type {?} */ (value))).clone()] : [];
            case (ECalendarValue.MomentArr):
                return ((/** @type {?} */ (value)) || []).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => v.clone()));
            default:
                return [];
        }
    }
    // todo:: add unit test
    /**
     * @param {?} format
     * @param {?} value
     * @param {?} convertTo
     * @return {?}
     */
    convertFromMomentArray(format, value, convertTo) {
        switch (convertTo) {
            case (ECalendarValue.String):
                return value[0] && value[0].format(format);
            case (ECalendarValue.StringArr):
                return value.filter(Boolean).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => v.format(format)));
            case (ECalendarValue.Moment):
                return value[0] ? value[0].clone() : value[0];
            case (ECalendarValue.MomentArr):
                return value ? value.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => v.clone())) : value;
            default:
                return value;
        }
    }
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    convertToString(value, format) {
        /** @type {?} */
        let tmpVal;
        if (typeof value === 'string') {
            tmpVal = [value];
        }
        else if (Array.isArray(value)) {
            if (value.length) {
                tmpVal = ((/** @type {?} */ (value))).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                (v) => {
                    return this.convertToMoment(v, format).format(format);
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
    }
    // todo:: add unit test
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    clearUndefined(obj) {
        if (!obj) {
            return obj;
        }
        Object.keys(obj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => (obj[key] === undefined) && delete obj[key]));
        return obj;
    }
    /**
     * @param {?} isMultiple
     * @param {?} currentlySelected
     * @param {?} date
     * @param {?=} granularity
     * @return {?}
     */
    updateSelected(isMultiple, currentlySelected, date, granularity = 'day') {
        if (isMultiple) {
            return !date.selected
                ? currentlySelected.concat([date.date])
                : currentlySelected.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => !d.isSame(date.date, granularity)));
        }
        else {
            return !date.selected ? [date.date] : [];
        }
    }
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    closestParent(element, selector) {
        if (!element) {
            return undefined;
        }
        /** @type {?} */
        const match = (/** @type {?} */ (element.querySelector(selector)));
        return match || this.closestParent(element.parentElement, selector);
    }
    /**
     * @param {?} m
     * @return {?}
     */
    onlyTime(m) {
        return m && moment.isMoment(m) && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
    }
    /**
     * @param {?} calendarType
     * @return {?}
     */
    granularityFromType(calendarType) {
        switch (calendarType) {
            case 'time':
                return 'second';
            case 'daytime':
                return 'second';
            default:
                return calendarType;
        }
    }
    /**
     * @param {?} __0
     * @param {?} format
     * @param {?} calendarType
     * @return {?}
     */
    createValidator({ minDate, maxDate, minTime, maxTime }, format, calendarType) {
        /** @type {?} */
        let isValid;
        /** @type {?} */
        let value;
        /** @type {?} */
        const validators = [];
        /** @type {?} */
        const granularity = this.granularityFromType(calendarType);
        if (minDate) {
            /** @type {?} */
            const md = this.convertToMoment(minDate, format);
            validators.push({
                key: 'minDate',
                isValid: (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    val => val.isSameOrAfter(md, granularity)));
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                })
            });
        }
        if (maxDate) {
            /** @type {?} */
            const md = this.convertToMoment(maxDate, format);
            validators.push({
                key: 'maxDate',
                isValid: (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    val => val.isSameOrBefore(md, granularity)));
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                })
            });
        }
        if (minTime) {
            /** @type {?} */
            const md = this.onlyTime(this.convertToMoment(minTime, format));
            validators.push({
                key: 'minTime',
                isValid: (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    val => this.onlyTime(val).isSameOrAfter(md)));
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                })
            });
        }
        if (maxTime) {
            /** @type {?} */
            const md = this.onlyTime(this.convertToMoment(maxTime, format));
            validators.push({
                key: 'maxTime',
                isValid: (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const _isValid = value.every((/**
                     * @param {?} val
                     * @return {?}
                     */
                    val => this.onlyTime(val).isSameOrBefore(md)));
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                })
            });
        }
        return (/**
         * @param {?} inputVal
         * @return {?}
         */
        (inputVal) => {
            isValid = true;
            value = this.convertToMomentArray(inputVal, format, true).filter(Boolean);
            if (!value.every((/**
             * @param {?} val
             * @return {?}
             */
            val => val.isValid()))) {
                return {
                    format: {
                        given: inputVal
                    }
                };
            }
            /** @type {?} */
            const errors = validators.reduce((/**
             * @param {?} map
             * @param {?} err
             * @return {?}
             */
            (map, err) => {
                if (!err.isValid()) {
                    map[err.key] = {
                        given: value
                    };
                }
                return map;
            }), {});
            return !isValid ? errors : null;
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    datesStringToStringArray(value) {
        return (value || '').split('|').map((/**
         * @param {?} m
         * @return {?}
         */
        m => m.trim())).filter(Boolean);
    }
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    getValidMomentArray(value, format) {
        return this.datesStringToStringArray(value)
            .filter((/**
         * @param {?} d
         * @return {?}
         */
        d => this.isDateValid(d, format)))
            .map((/**
         * @param {?} d
         * @return {?}
         */
        d => moment(d, format)));
    }
    /**
     * @param {?} showGoToCurrent
     * @param {?} mode
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    shouldShowCurrent(showGoToCurrent, mode, min, max) {
        return showGoToCurrent &&
            mode !== 'time' &&
            this.isDateInRange(moment(), min, max);
    }
    /**
     * @param {?} date
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    isDateInRange(date, from, to) {
        return date.isBetween(from, to, 'day', '[]');
    }
    /**
     * @param {?} obj
     * @param {?} format
     * @param {?} props
     * @return {?}
     */
    convertPropsToMoment(obj, format, props) {
        props.forEach((/**
         * @param {?} prop
         * @return {?}
         */
        (prop) => {
            if (obj.hasOwnProperty(prop)) {
                obj[prop] = this.convertToMoment(obj[prop], format);
            }
        }));
    }
    /**
     * @template T
     * @param {?} prevConf
     * @param {?} currentConf
     * @return {?}
     */
    shouldResetCurrentView(prevConf, currentConf) {
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
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    getNativeElement(elem) {
        if (!elem) {
            return null;
        }
        else if (typeof elem === 'string') {
            return (/** @type {?} */ (document.querySelector(elem)));
        }
        else {
            return elem;
        }
    }
}
UtilsService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImNvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFL0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEtBQUssUUFBUSxNQUFNLFFBQVEsQ0FBQzs7TUFRN0IsTUFBTSxHQUFHLFFBQVE7Ozs7QUFFdkIsZ0NBS0M7OztJQUpDLDZCQUE4Qjs7SUFDOUIsNkJBQThCOztJQUM5Qiw2QkFBOEI7O0lBQzlCLDZCQUE4Qjs7QUFJaEMsTUFBTSxPQUFPLFlBQVk7Ozs7OztJQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQWMsRUFBRSxJQUFZOztZQUN0QyxPQUFPO1FBQ1g7OztRQUFPOztrQkFDQyxPQUFPLEdBQUcsSUFBSTs7a0JBQUUsSUFBSSxHQUFHLFNBQVM7WUFDdEMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7Ozs7O0lBRUYsV0FBVyxDQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7O0lBRUQsZUFBZSxDQUFDLElBQXlCLEVBQUUsTUFBYztRQUN2RCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksT0FBTyxJQUFJLEtB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SUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ25DLE9BQU8sbUJBQWEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQSxDQUFDO1NBQ2xEO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7O1lBOVRGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VDYWxlbmRhclZhbHVlfSBmcm9tICcuLi8uLi90eXBlcy9jYWxlbmRhci12YWx1ZS1lbnVtJztcbmltcG9ydCB7U2luZ2xlQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vLi4vdHlwZXMvc2luZ2xlLWNhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnQsIHVuaXRPZlRpbWV9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uLy4uL3R5cGVzL2NhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7SURhdGV9IGZyb20gJy4uLy4uL21vZGVscy9kYXRlLm1vZGVsJztcbmltcG9ydCB7Q2FsZW5kYXJNb2RlfSBmcm9tICcuLi8uLi90eXBlcy9jYWxlbmRhci1tb2RlJztcbmltcG9ydCB7RGF0ZVZhbGlkYXRvcn0gZnJvbSAnLi4vLi4vdHlwZXMvdmFsaWRhdG9yLnR5cGUnO1xuaW1wb3J0IHtJQ2FsZW5kYXJJbnRlcm5hbH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NhbGVuZGFyLm1vZGVsJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZUxpbWl0cyB7XG4gIG1pbkRhdGU/OiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBtYXhEYXRlPzogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgbWluVGltZT86IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIG1heFRpbWU/OiBTaW5nbGVDYWxlbmRhclZhbHVlO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIHtcbiAgc3RhdGljIGRlYm91bmNlKGZ1bmM6IEZ1bmN0aW9uLCB3YWl0OiBudW1iZXIpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lb3V0ID0gY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9LCB3YWl0KTtcbiAgICB9O1xuICB9O1xuXG4gIGNyZWF0ZUFycmF5KHNpemU6IG51bWJlcik6IG51bWJlcltdIHtcbiAgICByZXR1cm4gbmV3IEFycmF5KHNpemUpLmZpbGwoMSk7XG4gIH1cblxuICBjb252ZXJ0VG9Nb21lbnQoZGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSwgZm9ybWF0OiBzdHJpbmcpOiBNb21lbnQge1xuICAgIGlmICghZGF0ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtb21lbnQoZGF0ZSwgZm9ybWF0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGUuY2xvbmUoKTtcbiAgICB9XG4gIH1cblxuICBpc0RhdGVWYWxpZChkYXRlOiBzdHJpbmcsIGZvcm1hdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKGRhdGUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9tZW50KGRhdGUsIGZvcm1hdCwgdHJ1ZSkuaXNWYWxpZCgpO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RcbiAgZ2V0RGVmYXVsdERpc3BsYXlEYXRlKGN1cnJlbnQ6IE1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBNb21lbnRbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93TXVsdGlTZWxlY3Q6IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBNb21lbnQpOiBNb21lbnQge1xuICAgIGlmIChjdXJyZW50KSB7XG4gICAgICByZXR1cm4gY3VycmVudC5jbG9uZSgpO1xuICAgIH0gZWxzZSBpZiAobWluRGF0ZSAmJiBtaW5EYXRlLmlzQWZ0ZXIobW9tZW50KCkpKSB7XG4gICAgICByZXR1cm4gbWluRGF0ZS5jbG9uZSgpO1xuICAgIH0gZWxzZSBpZiAoYWxsb3dNdWx0aVNlbGVjdCkge1xuICAgICAgaWYgKHNlbGVjdGVkICYmIHNlbGVjdGVkW3NlbGVjdGVkLmxlbmd0aF0pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkW3NlbGVjdGVkLmxlbmd0aF0uY2xvbmUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkICYmIHNlbGVjdGVkWzBdKSB7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRbMF0uY2xvbmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9tZW50KCk7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdFxuICBnZXRJbnB1dFR5cGUodmFsdWU6IENhbGVuZGFyVmFsdWUsIGFsbG93TXVsdGlTZWxlY3Q6IGJvb2xlYW4pOiBFQ2FsZW5kYXJWYWx1ZSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAoIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gRUNhbGVuZGFyVmFsdWUuTW9tZW50QXJyO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWVbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBFQ2FsZW5kYXJWYWx1ZS5TdHJpbmdBcnI7XG4gICAgICB9IGVsc2UgaWYgKG1vbWVudC5pc01vbWVudCh2YWx1ZVswXSkpIHtcbiAgICAgICAgcmV0dXJuIEVDYWxlbmRhclZhbHVlLk1vbWVudEFycjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIEVDYWxlbmRhclZhbHVlLlN0cmluZztcbiAgICAgIH0gZWxzZSBpZiAobW9tZW50LmlzTW9tZW50KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gRUNhbGVuZGFyVmFsdWUuTW9tZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbGxvd011bHRpU2VsZWN0ID8gRUNhbGVuZGFyVmFsdWUuTW9tZW50QXJyIDogRUNhbGVuZGFyVmFsdWUuTW9tZW50O1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RcbiAgY29udmVydFRvTW9tZW50QXJyYXkodmFsdWU6IENhbGVuZGFyVmFsdWUsIGZvcm1hdDogc3RyaW5nLCBhbGxvd011bHRpU2VsZWN0OiBib29sZWFuKTogTW9tZW50W10ge1xuICAgIHN3aXRjaCAodGhpcy5nZXRJbnB1dFR5cGUodmFsdWUsIGFsbG93TXVsdGlTZWxlY3QpKSB7XG4gICAgICBjYXNlIChFQ2FsZW5kYXJWYWx1ZS5TdHJpbmcpOlxuICAgICAgICByZXR1cm4gdmFsdWUgPyBbbW9tZW50KDxzdHJpbmc+dmFsdWUsIGZvcm1hdCwgdHJ1ZSldIDogW107XG4gICAgICBjYXNlIChFQ2FsZW5kYXJWYWx1ZS5TdHJpbmdBcnIpOlxuICAgICAgICByZXR1cm4gKDxzdHJpbmdbXT52YWx1ZSkubWFwKHYgPT4gdiA/IG1vbWVudCh2LCBmb3JtYXQsIHRydWUpIDogbnVsbCkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuTW9tZW50KTpcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gWyg8TW9tZW50PnZhbHVlKS5jbG9uZSgpXSA6IFtdO1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuTW9tZW50QXJyKTpcbiAgICAgICAgcmV0dXJuICg8TW9tZW50W10+dmFsdWUgfHwgW10pLm1hcCh2ID0+IHYuY2xvbmUoKSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RcbiAgY29udmVydEZyb21Nb21lbnRBcnJheShmb3JtYXQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogTW9tZW50W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29udmVydFRvOiBFQ2FsZW5kYXJWYWx1ZSk6IENhbGVuZGFyVmFsdWUge1xuICAgIHN3aXRjaCAoY29udmVydFRvKSB7XG4gICAgICBjYXNlIChFQ2FsZW5kYXJWYWx1ZS5TdHJpbmcpOlxuICAgICAgICByZXR1cm4gdmFsdWVbMF0gJiYgdmFsdWVbMF0uZm9ybWF0KGZvcm1hdCk7XG4gICAgICBjYXNlIChFQ2FsZW5kYXJWYWx1ZS5TdHJpbmdBcnIpOlxuICAgICAgICByZXR1cm4gdmFsdWUuZmlsdGVyKEJvb2xlYW4pLm1hcCh2ID0+IHYuZm9ybWF0KGZvcm1hdCkpO1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuTW9tZW50KTpcbiAgICAgICAgcmV0dXJuIHZhbHVlWzBdID8gdmFsdWVbMF0uY2xvbmUoKSA6IHZhbHVlWzBdO1xuICAgICAgY2FzZSAoRUNhbGVuZGFyVmFsdWUuTW9tZW50QXJyKTpcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWUubWFwKHYgPT4gdi5jbG9uZSgpKSA6IHZhbHVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRUb1N0cmluZyh2YWx1ZTogQ2FsZW5kYXJWYWx1ZSwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCB0bXBWYWw6IHN0cmluZ1tdO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRtcFZhbCA9IFt2YWx1ZV07XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0bXBWYWwgPSAoPFNpbmdsZUNhbGVuZGFyVmFsdWVbXT52YWx1ZSkubWFwKCh2KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvTW9tZW50KHYsIGZvcm1hdCkuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG1wVmFsID0gPHN0cmluZ1tdPnZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9tZW50LmlzTW9tZW50KHZhbHVlKSkge1xuICAgICAgdG1wVmFsID0gW3ZhbHVlLmZvcm1hdChmb3JtYXQpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiB0bXBWYWwuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyB8ICcpO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RcbiAgY2xlYXJVbmRlZmluZWQ8VD4ob2JqOiBUKTogVCB7XG4gICAgaWYgKCFvYmopIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSAmJiBkZWxldGUgb2JqW2tleV0pO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB1cGRhdGVTZWxlY3RlZChpc011bHRpcGxlOiBib29sZWFuLFxuICAgICAgICAgICAgICAgICBjdXJyZW50bHlTZWxlY3RlZDogTW9tZW50W10sXG4gICAgICAgICAgICAgICAgIGRhdGU6IElEYXRlLFxuICAgICAgICAgICAgICAgICBncmFudWxhcml0eTogdW5pdE9mVGltZS5CYXNlID0gJ2RheScpOiBNb21lbnRbXSB7XG4gICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgIHJldHVybiAhZGF0ZS5zZWxlY3RlZFxuICAgICAgICA/IGN1cnJlbnRseVNlbGVjdGVkLmNvbmNhdChbZGF0ZS5kYXRlXSlcbiAgICAgICAgOiBjdXJyZW50bHlTZWxlY3RlZC5maWx0ZXIoZCA9PiAhZC5pc1NhbWUoZGF0ZS5kYXRlLCBncmFudWxhcml0eSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIWRhdGUuc2VsZWN0ZWQgPyBbZGF0ZS5kYXRlXSA6IFtdO1xuICAgIH1cbiAgfVxuXG4gIGNsb3Nlc3RQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaCA9IDxIVE1MRWxlbWVudD5lbGVtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIHJldHVybiBtYXRjaCB8fCB0aGlzLmNsb3Nlc3RQYXJlbnQoZWxlbWVudC5wYXJlbnRFbGVtZW50LCBzZWxlY3Rvcik7XG4gIH1cblxuICBvbmx5VGltZShtOiBNb21lbnQpOiBNb21lbnQge1xuICAgIHJldHVybiBtICYmIG1vbWVudC5pc01vbWVudChtKSAmJiBtb21lbnQobS5mb3JtYXQoJ0hIOm1tOnNzJyksICdISDptbTpzcycpO1xuICB9XG5cbiAgZ3JhbnVsYXJpdHlGcm9tVHlwZShjYWxlbmRhclR5cGU6IENhbGVuZGFyTW9kZSk6IHVuaXRPZlRpbWUuQmFzZSB7XG4gICAgc3dpdGNoIChjYWxlbmRhclR5cGUpIHtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICByZXR1cm4gJ3NlY29uZCc7XG4gICAgICBjYXNlICdkYXl0aW1lJzpcbiAgICAgICAgcmV0dXJuICdzZWNvbmQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyVHlwZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVWYWxpZGF0b3Ioe21pbkRhdGUsIG1heERhdGUsIG1pblRpbWUsIG1heFRpbWV9OiBEYXRlTGltaXRzLFxuICAgICAgICAgICAgICAgICAgZm9ybWF0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICBjYWxlbmRhclR5cGU6IENhbGVuZGFyTW9kZSk6IERhdGVWYWxpZGF0b3Ige1xuICAgIGxldCBpc1ZhbGlkOiBib29sZWFuO1xuICAgIGxldCB2YWx1ZTogTW9tZW50W107XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IFtdO1xuICAgIGNvbnN0IGdyYW51bGFyaXR5ID0gdGhpcy5ncmFudWxhcml0eUZyb21UeXBlKGNhbGVuZGFyVHlwZSk7XG5cbiAgICBpZiAobWluRGF0ZSkge1xuICAgICAgY29uc3QgbWQgPSB0aGlzLmNvbnZlcnRUb01vbWVudChtaW5EYXRlLCBmb3JtYXQpO1xuICAgICAgdmFsaWRhdG9ycy5wdXNoKHtcbiAgICAgICAga2V5OiAnbWluRGF0ZScsXG4gICAgICAgIGlzVmFsaWQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBfaXNWYWxpZCA9IHZhbHVlLmV2ZXJ5KHZhbCA9PiB2YWwuaXNTYW1lT3JBZnRlcihtZCwgZ3JhbnVsYXJpdHkpKTtcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCA/IF9pc1ZhbGlkIDogZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIF9pc1ZhbGlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobWF4RGF0ZSkge1xuICAgICAgY29uc3QgbWQgPSB0aGlzLmNvbnZlcnRUb01vbWVudChtYXhEYXRlLCBmb3JtYXQpO1xuICAgICAgdmFsaWRhdG9ycy5wdXNoKHtcbiAgICAgICAga2V5OiAnbWF4RGF0ZScsXG4gICAgICAgIGlzVmFsaWQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBfaXNWYWxpZCA9IHZhbHVlLmV2ZXJ5KHZhbCA9PiB2YWwuaXNTYW1lT3JCZWZvcmUobWQsIGdyYW51bGFyaXR5KSk7XG4gICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgPyBfaXNWYWxpZCA6IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBfaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1pblRpbWUpIHtcbiAgICAgIGNvbnN0IG1kID0gdGhpcy5vbmx5VGltZSh0aGlzLmNvbnZlcnRUb01vbWVudChtaW5UaW1lLCBmb3JtYXQpKTtcbiAgICAgIHZhbGlkYXRvcnMucHVzaCh7XG4gICAgICAgIGtleTogJ21pblRpbWUnLFxuICAgICAgICBpc1ZhbGlkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgX2lzVmFsaWQgPSB2YWx1ZS5ldmVyeSh2YWwgPT4gdGhpcy5vbmx5VGltZSh2YWwpLmlzU2FtZU9yQWZ0ZXIobWQpKTtcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCA/IF9pc1ZhbGlkIDogZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIF9pc1ZhbGlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobWF4VGltZSkge1xuICAgICAgY29uc3QgbWQgPSB0aGlzLm9ubHlUaW1lKHRoaXMuY29udmVydFRvTW9tZW50KG1heFRpbWUsIGZvcm1hdCkpO1xuICAgICAgdmFsaWRhdG9ycy5wdXNoKHtcbiAgICAgICAga2V5OiAnbWF4VGltZScsXG4gICAgICAgIGlzVmFsaWQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBfaXNWYWxpZCA9IHZhbHVlLmV2ZXJ5KHZhbCA9PiB0aGlzLm9ubHlUaW1lKHZhbCkuaXNTYW1lT3JCZWZvcmUobWQpKTtcbiAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCA/IF9pc1ZhbGlkIDogZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIF9pc1ZhbGlkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGlucHV0VmFsOiBDYWxlbmRhclZhbHVlKSA9PiB7XG4gICAgICBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgICAgdmFsdWUgPSB0aGlzLmNvbnZlcnRUb01vbWVudEFycmF5KGlucHV0VmFsLCBmb3JtYXQsIHRydWUpLmZpbHRlcihCb29sZWFuKTtcblxuICAgICAgaWYgKCF2YWx1ZS5ldmVyeSh2YWwgPT4gdmFsLmlzVmFsaWQoKSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgIGdpdmVuOiBpbnB1dFZhbFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXJyb3JzID0gdmFsaWRhdG9ycy5yZWR1Y2UoKG1hcCwgZXJyKSA9PiB7XG4gICAgICAgIGlmICghZXJyLmlzVmFsaWQoKSkge1xuICAgICAgICAgIG1hcFtlcnIua2V5XSA9IHtcbiAgICAgICAgICAgIGdpdmVuOiB2YWx1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfSwge30pO1xuXG4gICAgICByZXR1cm4gIWlzVmFsaWQgPyBlcnJvcnMgOiBudWxsO1xuICAgIH07XG4gIH1cblxuICBkYXRlc1N0cmluZ1RvU3RyaW5nQXJyYXkodmFsdWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gKHZhbHVlIHx8ICcnKS5zcGxpdCgnfCcpLm1hcChtID0+IG0udHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG4gIH1cblxuICBnZXRWYWxpZE1vbWVudEFycmF5KHZhbHVlOiBzdHJpbmcsIGZvcm1hdDogc3RyaW5nKTogTW9tZW50W10ge1xuICAgIHJldHVybiB0aGlzLmRhdGVzU3RyaW5nVG9TdHJpbmdBcnJheSh2YWx1ZSlcbiAgICAgIC5maWx0ZXIoZCA9PiB0aGlzLmlzRGF0ZVZhbGlkKGQsIGZvcm1hdCkpXG4gICAgICAubWFwKGQgPT4gbW9tZW50KGQsIGZvcm1hdCkpO1xuICB9XG5cbiAgc2hvdWxkU2hvd0N1cnJlbnQoc2hvd0dvVG9DdXJyZW50OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBDYWxlbmRhck1vZGUsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICBtYXg6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzaG93R29Ub0N1cnJlbnQgJiZcbiAgICAgIG1vZGUgIT09ICd0aW1lJyAmJlxuICAgICAgdGhpcy5pc0RhdGVJblJhbmdlKG1vbWVudCgpLCBtaW4sIG1heCk7XG4gIH1cblxuICBpc0RhdGVJblJhbmdlKGRhdGU6IE1vbWVudCwgZnJvbTogTW9tZW50LCB0bzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRhdGUuaXNCZXR3ZWVuKGZyb20sIHRvLCAnZGF5JywgJ1tdJyk7XG4gIH1cblxuICBjb252ZXJ0UHJvcHNUb01vbWVudChvYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBmb3JtYXQ6IHN0cmluZywgcHJvcHM6IHN0cmluZ1tdKSB7XG4gICAgcHJvcHMuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICBvYmpbcHJvcF0gPSB0aGlzLmNvbnZlcnRUb01vbWVudChvYmpbcHJvcF0sIGZvcm1hdCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaG91bGRSZXNldEN1cnJlbnRWaWV3PFQgZXh0ZW5kcyBJQ2FsZW5kYXJJbnRlcm5hbD4ocHJldkNvbmY6IFQsIGN1cnJlbnRDb25mOiBUKTogYm9vbGVhbiB7XG4gICAgaWYgKHByZXZDb25mICYmIGN1cnJlbnRDb25mKSB7XG4gICAgICBpZiAoIXByZXZDb25mLm1pbiAmJiBjdXJyZW50Q29uZi5taW4pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHByZXZDb25mLm1pbiAmJiBjdXJyZW50Q29uZi5taW4gJiYgIXByZXZDb25mLm1pbi5pc1NhbWUoY3VycmVudENvbmYubWluLCAnZCcpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICghcHJldkNvbmYubWF4ICYmIGN1cnJlbnRDb25mLm1heCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocHJldkNvbmYubWF4ICYmIGN1cnJlbnRDb25mLm1heCAmJiAhcHJldkNvbmYubWF4LmlzU2FtZShjdXJyZW50Q29uZi5tYXgsICdkJykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXROYXRpdmVFbGVtZW50KGVsZW06IEhUTUxFbGVtZW50IHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghZWxlbSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICB9XG59XG4iXX0=