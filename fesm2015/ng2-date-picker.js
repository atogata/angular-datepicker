import { CommonModule } from '@angular/common';
import * as momentNs from 'moment';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, FormsModule } from '@angular/forms';
import { Injectable, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewEncapsulation, ViewChild, ElementRef, HostListener, Renderer, ComponentFactoryResolver, Directive, Optional, ViewContainerRef, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const ECalendarMode = {
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
const ECalendarValue = {
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
const SelectEvent = {
    INPUT: 'input',
    SELECTION: 'selection',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DomHelper {
    /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} drops
     * @return {?}
     */
    static setYAxisPosition(element, container, anchor, drops) {
        /** @type {?} */
        const anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        const containerRect = container.getBoundingClientRect();
        /** @type {?} */
        const bottom = anchorRect.bottom - containerRect.top;
        /** @type {?} */
        const top = anchorRect.top - containerRect.top;
        if (drops === 'down') {
            element.style.top = (bottom + 1 + 'px');
        }
        else {
            element.style.top = (top - 1 - element.scrollHeight) + 'px';
        }
    }
    /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} dimElem
     * @param {?} opens
     * @return {?}
     */
    static setXAxisPosition(element, container, anchor, dimElem, opens) {
        /** @type {?} */
        const anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        const containerRect = container.getBoundingClientRect();
        /** @type {?} */
        const left = anchorRect.left - containerRect.left;
        if (opens === 'right') {
            element.style.left = left + 'px';
        }
        else {
            element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
        }
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isTopInView(el) {
        const { top } = el.getBoundingClientRect();
        return (top >= 0);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isBottomInView(el) {
        const { bottom } = el.getBoundingClientRect();
        return (bottom <= window.innerHeight);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isLeftInView(el) {
        const { left } = el.getBoundingClientRect();
        return (left >= 0);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isRightInView(el) {
        const { right } = el.getBoundingClientRect();
        return (right <= window.innerWidth);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    appendElementToPosition(config) {
        const { container, element } = config;
        if (!container.style.position || container.style.position === 'static') {
            container.style.position = 'relative';
        }
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
        }
        element.style.visibility = 'hidden';
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.setElementPosition(config);
            element.style.visibility = 'visible';
        }));
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    setElementPosition({ element, container, anchor, dimElem, drops, opens }) {
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
    }
}
DomHelper.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = momentNs;
class UtilsService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$1 = momentNs;
class DayCalendarService {
    /**
     * @param {?} utilsService
     */
    constructor(utilsService) {
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
    removeNearMonthWeeks(currentMonth, monthArray) {
        if (monthArray[monthArray.length - 1].find((/**
         * @param {?} day
         * @return {?}
         */
        (day) => day.date.isSame(currentMonth, 'month')))) {
            return monthArray;
        }
        else {
            return monthArray.slice(0, -1);
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getConfig(config) {
        /** @type {?} */
        const _config = (/** @type {?} */ (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        moment$1.locale(_config.locale);
        return _config;
    }
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    generateDaysMap(firstDayOfWeek) {
        /** @type {?} */
        const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        /** @type {?} */
        const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce((/**
         * @param {?} map
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        (map, day, index) => {
            map[day] = index;
            return map;
        }), (/** @type {?} */ ({})));
    }
    /**
     * @param {?} config
     * @param {?} month
     * @param {?} selected
     * @return {?}
     */
    generateMonthArray(config, month, selected) {
        /** @type {?} */
        let monthArray = [];
        /** @type {?} */
        const firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
        /** @type {?} */
        const firstDayOfBoard = month.clone().startOf('month');
        while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
            firstDayOfBoard.subtract(1, 'day');
        }
        /** @type {?} */
        const current = firstDayOfBoard.clone();
        /** @type {?} */
        const prevMonth = month.clone().subtract(1, 'month');
        /** @type {?} */
        const nextMonth = month.clone().add(1, 'month');
        /** @type {?} */
        const today = moment$1();
        /** @type {?} */
        const daysOfCalendar = this.utilsService.createArray(42)
            .reduce((/**
         * @param {?} array
         * @return {?}
         */
        (array) => {
            array.push({
                date: current.clone(),
                selected: !!selected.find((/**
                 * @param {?} selectedDay
                 * @return {?}
                 */
                selectedDay => current.isSame(selectedDay, 'day'))),
                currentMonth: current.isSame(month, 'month'),
                prevMonth: current.isSame(prevMonth, 'month'),
                nextMonth: current.isSame(nextMonth, 'month'),
                currentDay: current.isSame(today, 'day'),
                disabled: this.isDateDisabled(current, config)
            });
            current.add(1, 'day');
            return array;
        }), []);
        daysOfCalendar.forEach((/**
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        (day, index) => {
            /** @type {?} */
            const weekIndex = Math.floor(index / 7);
            if (!monthArray[weekIndex]) {
                monthArray.push([]);
            }
            monthArray[weekIndex].push(day);
        }));
        if (!config.showNearMonthDays) {
            monthArray = this.removeNearMonthWeeks(month, monthArray);
        }
        return monthArray;
    }
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    generateWeekdays(firstDayOfWeek) {
        /** @type {?} */
        const weekdayNames = {
            su: moment$1().day(0),
            mo: moment$1().day(1),
            tu: moment$1().day(2),
            we: moment$1().day(3),
            th: moment$1().day(4),
            fr: moment$1().day(5),
            sa: moment$1().day(6)
        };
        /** @type {?} */
        const weekdays = [];
        /** @type {?} */
        const daysMap = this.generateDaysMap(firstDayOfWeek);
        for (const dayKey in daysMap) {
            if (daysMap.hasOwnProperty(dayKey)) {
                weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
            }
        }
        return weekdays;
    }
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    isDateDisabled(date, config) {
        if (config.isDayDisabledCallback) {
            return config.isDayDisabledCallback(date);
        }
        if (config.min && date.isBefore(config.min, 'day')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'day'));
    }
    // todo:: add unit tests
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    getHeaderLabel(config, month) {
        if (config.monthFormatter) {
            return config.monthFormatter(month);
        }
        return month.format(config.monthFormat);
    }
    // todo:: add unit tests
    /**
     * @param {?} min
     * @param {?} currentMonthView
     * @return {?}
     */
    shouldShowLeft(min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, 'month') : true;
    }
    // todo:: add unit tests
    /**
     * @param {?} max
     * @param {?} currentMonthView
     * @return {?}
     */
    shouldShowRight(max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, 'month') : true;
    }
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    generateDaysIndexMap(firstDayOfWeek) {
        /** @type {?} */
        const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        /** @type {?} */
        const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce((/**
         * @param {?} map
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        (map, day, index) => {
            map[index] = day;
            return map;
        }), (/** @type {?} */ ({})));
    }
    /**
     * @param {?} componentConfig
     * @return {?}
     */
    getMonthCalendarConfig(componentConfig) {
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
    }
    /**
     * @param {?} config
     * @param {?} day
     * @return {?}
     */
    getDayBtnText(config, day) {
        if (config.dayBtnFormatter) {
            return config.dayBtnFormatter(day);
        }
        return day.format(config.dayBtnFormat);
    }
    /**
     * @param {?} config
     * @param {?} day
     * @return {?}
     */
    getDayBtnCssClass(config, day) {
        if (config.dayBtnCssClassCallback) {
            return config.dayBtnCssClassCallback(day);
        }
        return '';
    }
}
DayCalendarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DayCalendarService.ctorParameters = () => [
    { type: UtilsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$2 = momentNs;
class DayCalendarComponent {
    /**
     * @param {?} dayCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(dayCalendarService, utilsService, cd) {
        this.dayCalendarService = dayCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new EventEmitter();
        this.onMonthSelect = new EventEmitter();
        this.onNavHeaderBtnClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
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
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.onChangeCallback(this.processOnChangeCallback(selected));
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    set currentDateView(current) {
        this._currentDateView = current.clone();
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
        this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
        this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
        this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    }
    /**
     * @return {?}
     */
    get currentDateView() {
        return this._currentDateView;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInited = true;
        this.init();
        this.initValidators();
    }
    /**
     * @return {?}
     */
    init() {
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate, config } = changes;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChangeCallback(_) {
    }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            () => null);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    processOnChangeCallback(value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} day
     * @return {?}
     */
    dayClicked(day) {
        if (day.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(day);
    }
    /**
     * @param {?} day
     * @return {?}
     */
    getDayBtnText(day) {
        return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
    }
    /**
     * @param {?} day
     * @return {?}
     */
    getDayBtnCssClass(day) {
        /** @type {?} */
        const cssClasses = {
            'dp-selected': day.selected,
            'dp-current-month': day.currentMonth,
            'dp-prev-month': day.prevMonth,
            'dp-next-month': day.nextMonth,
            'dp-current-day': day.currentDay
        };
        /** @type {?} */
        const customCssClass = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
        if (customCssClass) {
            cssClasses[customCssClass] = true;
        }
        return cssClasses;
    }
    /**
     * @return {?}
     */
    onLeftNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, -1, 'month');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onLeftNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, 1, 'month');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightNav.emit({ from, to });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarLeftClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarRightClick(change) {
        this.onRightNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarSecondaryLeftClick(change) {
        this.onRightNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarSecondaryRightClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayName(weekday) {
        if (this.componentConfig.weekDayFormatter) {
            return this.componentConfig.weekDayFormatter(weekday.day());
        }
        return weekday.format(this.componentConfig.weekDayFormat);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    toggleCalendarMode(mode) {
        if (this.currentCalendarMode !== mode) {
            this.currentCalendarMode = mode;
            this.onNavHeaderBtnClick.emit(mode);
        }
        this.cd.markForCheck();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    monthSelected(month) {
        this.currentDateView = month.date.clone();
        this.currentCalendarMode = ECalendarMode.Day;
        this.onMonthSelect.emit(month);
    }
    /**
     * @param {?} current
     * @param {?} amount
     * @param {?=} granularity
     * @return {?}
     */
    moveCalendarsBy(current, amount, granularity = 'month') {
        this.currentDateView = current.clone().add(amount, granularity);
        this.cd.markForCheck();
    }
    /**
     * @param {?} to
     * @return {?}
     */
    moveCalendarTo(to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
        }
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    shouldShowCurrent() {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'day', this.componentConfig.min, this.componentConfig.max);
    }
    /**
     * @return {?}
     */
    goToCurrent() {
        this.currentDateView = moment$2();
        this.onGoToCurrent.emit();
    }
    /**
     * @param {?} config
     * @return {?}
     */
    handleConfigChange(config) {
        if (config) {
            /** @type {?} */
            const prevConf = this.dayCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            const currentConf = this.dayCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    }
}
DayCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-day-calendar',
                template: "<div class=\"dp-day-calendar-container\" *ngIf=\"currentCalendarMode ===  CalendarMode.Day\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [isLabelClickable]=\"componentConfig.enableMonthSelector\"\n      [showGoToCurrent]=\"_shouldShowCurrent\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode(CalendarMode.Month)\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\"\n       [ngClass]=\"{'dp-hide-near-month': !componentConfig.showNearMonthDays}\">\n    <div class=\"dp-weekdays\">\n      <span class=\"dp-calendar-weekday\"\n            *ngFor=\"let weekday of weekdays\"\n            [innerText]=\"getWeekdayName(weekday)\">\n      </span>\n    </div>\n    <div class=\"dp-calendar-week\" *ngFor=\"let week of weeks\">\n      <span class=\"dp-week-number\"\n            *ngIf=\"componentConfig.showWeekNumbers\"\n            [innerText]=\"week[0].date.isoWeek()\">\n      </span>\n      <button type=\"button\"\n              class=\"dp-calendar-day\"\n              *ngFor=\"let day of week\"\n              [attr.data-date]=\"day.date.format(componentConfig.format)\"\n              (click)=\"dayClicked(day)\"\n              [disabled]=\"day.disabled\"\n              [ngClass]=\"getDayBtnCssClass(day)\"\n              [innerText]=\"getDayBtnText(day)\">\n      </button>\n    </div>\n  </div>\n</div>\n\n<dp-month-calendar\n    *ngIf=\"currentCalendarMode ===  CalendarMode.Month\"\n    [config]=\"monthCalendarConfig\"\n    [displayDate]=\"_currentDateView\"\n    [theme]=\"theme\"\n    (onSelect)=\"monthSelected($event)\"\n    (onNavHeaderBtnClick)=\"toggleCalendarMode(CalendarMode.Day)\"\n    (onLeftNav)=\"onMonthCalendarLeftClick($event)\"\n    (onRightNav)=\"onMonthCalendarRightClick($event)\"\n    (onLeftSecondaryNav)=\"onMonthCalendarSecondaryLeftClick($event)\"\n    (onRightSecondaryNav)=\"onMonthCalendarSecondaryRightClick($event)\">\n</dp-month-calendar>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    DayCalendarService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DayCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DayCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-day-calendar{display:inline-block}dp-day-calendar .dp-day-calendar-container{background:#fff}dp-day-calendar .dp-calendar-wrapper{box-sizing:border-box;border:1px solid #000}dp-day-calendar .dp-calendar-wrapper .dp-calendar-weekday:first-child{border-left:none}dp-day-calendar .dp-weekdays{font-size:15px;margin-bottom:5px}dp-day-calendar .dp-calendar-weekday{box-sizing:border-box;display:inline-block;width:30px;text-align:center;border-left:1px solid #000;border-bottom:1px solid #000}dp-day-calendar .dp-calendar-day{box-sizing:border-box;width:30px;height:30px;cursor:pointer}dp-day-calendar .dp-selected{background:#106cc8;color:#fff}dp-day-calendar .dp-next-month,dp-day-calendar .dp-prev-month{opacity:.5}dp-day-calendar .dp-hide-near-month .dp-next-month,dp-day-calendar .dp-hide-near-month .dp-prev-month{visibility:hidden}dp-day-calendar .dp-week-number{position:absolute;font-size:9px}dp-day-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;color:#7a7a7a;border:none}dp-day-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-day-calendar.dp-material .dp-calendar-day,dp-day-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-day-calendar.dp-material .dp-calendar-day:hover,dp-day-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-day-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-day-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-day-calendar.dp-material .dp-current-day{border:1px solid #106cc8}"]
            }] }
];
/** @nocollapse */
DayCalendarComponent.ctorParameters = () => [
    { type: DayCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
DayCalendarComponent.propDecorators = {
    config: [{ type: Input }],
    displayDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onSelect: [{ type: Output }],
    onMonthSelect: [{ type: Output }],
    onNavHeaderBtnClick: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$3 = momentNs;
/** @type {?} */
const FIRST_PM_HOUR = 12;
class TimeSelectService {
    /**
     * @param {?} utilsService
     */
    constructor(utilsService) {
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
            locale: moment$3.locale()
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getConfig(config) {
        /** @type {?} */
        const timeConfigs = {
            maxTime: this.utilsService.onlyTime(config && config.maxTime),
            minTime: this.utilsService.onlyTime(config && config.minTime)
        };
        /** @type {?} */
        const _config = (/** @type {?} */ (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config), timeConfigs)));
        moment$3.locale(_config.locale);
        return _config;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getTimeFormat(config) {
        return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
            + config.timeSeparator + config.minutesFormat
            + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
            + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
    }
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    getHours(config, t) {
        /** @type {?} */
        const time = t || moment$3();
        return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
    }
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    getMinutes(config, t) {
        /** @type {?} */
        const time = t || moment$3();
        return time && time.format(config.minutesFormat);
    }
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    getSeconds(config, t) {
        /** @type {?} */
        const time = t || moment$3();
        return time && time.format(config.secondsFormat);
    }
    /**
     * @param {?} config
     * @param {?} time
     * @return {?}
     */
    getMeridiem(config, time) {
        return time && time.format(config.meridiemFormat);
    }
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    decrease(config, time, unit) {
        /** @type {?} */
        let amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().subtract(amount, unit);
    }
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    increase(config, time, unit) {
        /** @type {?} */
        let amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().add(amount, unit);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    toggleMeridiem(time) {
        if (time.hours() < FIRST_PM_HOUR) {
            return time.clone().add(12, 'hour');
        }
        else {
            return time.clone().subtract(12, 'hour');
        }
    }
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    shouldShowDecrease(config, time, unit) {
        if (!config.min && !config.minTime) {
            return true;
        }
        /** @type {?} */
        const newTime = this.decrease(config, time, unit);
        return (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    }
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    shouldShowIncrease(config, time, unit) {
        if (!config.max && !config.maxTime) {
            return true;
        }
        /** @type {?} */
        const newTime = this.increase(config, time, unit);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)));
    }
    /**
     * @param {?} config
     * @param {?} time
     * @return {?}
     */
    shouldShowToggleMeridiem(config, time) {
        if (!config.min && !config.max && !config.minTime && !config.maxTime) {
            return true;
        }
        /** @type {?} */
        const newTime = this.toggleMeridiem(time);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    }
}
TimeSelectService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TimeSelectService.ctorParameters = () => [
    { type: UtilsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$4 = momentNs;
/** @type {?} */
const DAY_FORMAT = 'YYYYMMDD';
/** @type {?} */
const TIME_FORMAT = 'HH:mm:ss';
/** @type {?} */
const COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
class DayTimeCalendarService {
    /**
     * @param {?} utilsService
     * @param {?} dayCalendarService
     * @param {?} timeSelectService
     */
    constructor(utilsService, dayCalendarService, timeSelectService) {
        this.utilsService = utilsService;
        this.dayCalendarService = dayCalendarService;
        this.timeSelectService = timeSelectService;
        this.DEFAULT_CONFIG = {
            locale: moment$4.locale()
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getConfig(config) {
        /** @type {?} */
        const _config = Object.assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
        moment$4.locale(config.locale);
        return _config;
    }
    /**
     * @param {?} current
     * @param {?} day
     * @param {?} config
     * @return {?}
     */
    updateDay(current, day, config) {
        /** @type {?} */
        const time = current ? current : moment$4();
        /** @type {?} */
        let updated = moment$4(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
        if (config.min) {
            /** @type {?} */
            const min = (/** @type {?} */ (config.min));
            updated = min.isAfter(updated) ? min : updated;
        }
        if (config.max) {
            /** @type {?} */
            const max = (/** @type {?} */ (config.max));
            updated = max.isBefore(updated) ? max : updated;
        }
        return updated;
    }
    /**
     * @param {?} current
     * @param {?} time
     * @return {?}
     */
    updateTime(current, time) {
        /** @type {?} */
        const day = current ? current : moment$4();
        return moment$4(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
    }
}
DayTimeCalendarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DayTimeCalendarService.ctorParameters = () => [
    { type: UtilsService },
    { type: DayCalendarService },
    { type: TimeSelectService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$5 = momentNs;
class TimeSelectComponent {
    /**
     * @param {?} timeSelectService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(timeSelectService, utilsService, cd) {
        this.timeSelectService = timeSelectService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.isInited = false;
        this.api = {
            triggerChange: this.emitChange.bind(this)
        };
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
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
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInited = true;
        this.init();
        this.initValidators();
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.timeSelectService.getConfig(this.config);
        this.selected = this.selected || moment$5();
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate, minTime, maxTime } = changes;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputValue = value;
        if (value) {
            /** @type {?} */
            const momentValue = this.utilsService
                .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
            if (momentValue.isValid()) {
                this.selected = momentValue;
                this.inputValueType = this.utilsService
                    .getInputType(this.inputValue, false);
            }
        }
        this.cd.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChangeCallback(_) {
    }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            () => null);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    processOnChangeCallback(value) {
        return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, undefined, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    decrease(unit) {
        this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
        this.emitChange();
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    increase(unit) {
        this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
        this.emitChange();
    }
    /**
     * @return {?}
     */
    toggleMeridiem() {
        this.selected = this.timeSelectService.toggleMeridiem(this.selected);
        this.emitChange();
    }
    /**
     * @return {?}
     */
    emitChange() {
        this.onChange.emit({ date: this.selected, selected: false });
        this.cd.markForCheck();
    }
    /**
     * @param {?} time
     * @return {?}
     */
    calculateTimeParts(time) {
        this.hours = this.timeSelectService.getHours(this.componentConfig, time);
        this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
        this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
        this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
    }
}
TimeSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-time-select',
                template: "<ul class=\"dp-time-select-controls\">\n  <li class=\"dp-time-select-control dp-time-select-control-hours\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showIncHour\"\n            (click)=\"increase('hour')\">\n    </button>\n    <span class=\"dp-time-select-display-hours\"\n          [innerText]=\"hours\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-time-select-control-down\"\n            [disabled]=\"!showDecHour\"\n            (click)=\"decrease('hour')\"></button>\n  </li>\n  <li class=\"dp-time-select-control dp-time-select-separator\"\n      [innerText]=\"componentConfig.timeSeparator\">\n  </li>\n  <li class=\"dp-time-select-control dp-time-select-control-minutes\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showIncMinute\"\n            (click)=\"increase('minute')\"></button>\n    <span class=\"dp-time-select-display-minutes\"\n          [innerText]=\"minutes\">\n    </span>\n    <button type=\"button\"\n            [disabled]=\"!showDecMinute\" class=\"dp-time-select-control-down\"\n            (click)=\"decrease('minute')\"></button>\n  </li>\n  <ng-container *ngIf=\"componentConfig.showSeconds\">\n    <li class=\"dp-time-select-control dp-time-select-separator\"\n        [innerText]=\"componentConfig.timeSeparator\">\n    </li>\n    <li class=\"dp-time-select-control dp-time-select-control-seconds\">\n      <button type=\"button\"\n              class=\"dp-time-select-control-up\"\n              [disabled]=\"!showIncSecond\"\n              (click)=\"increase('second')\"></button>\n      <span class=\"dp-time-select-display-seconds\"\n            [innerText]=\"seconds\">\n      </span>\n      <button type=\"button\"\n              class=\"dp-time-select-control-down\"\n              [disabled]=\"!showDecSecond\"\n              (click)=\"decrease('second')\"></button>\n    </li>\n  </ng-container>\n  <li class=\"dp-time-select-control dp-time-select-control-meridiem\" *ngIf=\"!componentConfig.showTwentyFourHours\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showToggleMeridiem\"\n            (click)=\"toggleMeridiem()\"></button>\n    <span class=\"dp-time-select-display-meridiem\"\n          [innerText]=\"meridiem\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-time-select-control-down\"\n            [disabled]=\"!showToggleMeridiem\"\n            (click)=\"toggleMeridiem()\"></button>\n  </li>\n</ul>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    TimeSelectService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => TimeSelectComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => TimeSelectComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-time-select{display:inline-block}dp-time-select .dp-time-select-controls{margin:0;padding:0;text-align:center;line-height:normal;background:#fff}dp-time-select .dp-time-select-control{display:inline-block;width:35px;margin:0 auto;vertical-align:middle;font-size:inherit;letter-spacing:1px}dp-time-select .dp-time-select-control-down,dp-time-select .dp-time-select-control-up{position:relative;display:block;width:24px;height:24px;margin:3px auto;cursor:pointer}dp-time-select .dp-time-select-control-down::before,dp-time-select .dp-time-select-control-up::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0}dp-time-select .dp-time-select-control-up::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:4px}dp-time-select .dp-time-select-control-down::before{-webkit-transform:rotate(135deg);transform:rotate(135deg)}dp-time-select .dp-time-select-separator{width:5px}dp-time-select.dp-material .dp-time-select-control-down,dp-time-select.dp-material .dp-time-select-control-up{box-sizing:border-box;background:0 0;border:none;outline:0;border-radius:50%}dp-time-select.dp-material .dp-time-select-control-down::before,dp-time-select.dp-material .dp-time-select-control-up::before{left:0}dp-time-select.dp-material .dp-time-select-control-down:hover,dp-time-select.dp-material .dp-time-select-control-up:hover{background:#e0e0e0}"]
            }] }
];
/** @nocollapse */
TimeSelectComponent.ctorParameters = () => [
    { type: TimeSelectService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
TimeSelectComponent.propDecorators = {
    config: [{ type: Input }],
    displayDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$6 = momentNs;
class DatePickerService {
    /**
     * @param {?} utilsService
     * @param {?} timeSelectService
     * @param {?} daytimeCalendarService
     */
    constructor(utilsService, timeSelectService, daytimeCalendarService) {
        this.utilsService = utilsService;
        this.timeSelectService = timeSelectService;
        this.daytimeCalendarService = daytimeCalendarService;
        this.onPickerClosed = new EventEmitter();
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
            locale: moment$6.locale(),
            hideOnOutsideClick: true
        };
    }
    // todo:: add unit tests
    /**
     * @param {?} config
     * @param {?=} mode
     * @return {?}
     */
    getConfig(config, mode = 'daytime') {
        /** @type {?} */
        const _config = (/** @type {?} */ (Object.assign({}, this.defaultConfig, { format: this.getDefaultFormatByMode(mode) }, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        moment$6.locale(_config.locale);
        return _config;
    }
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    getDayConfigService(pickerConfig) {
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
    }
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    getDayTimeConfigService(pickerConfig) {
        return this.daytimeCalendarService.getConfig(pickerConfig);
    }
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    getTimeConfigService(pickerConfig) {
        return this.timeSelectService.getConfig(pickerConfig);
    }
    /**
     * @return {?}
     */
    pickerClosed() {
        this.onPickerClosed.emit();
    }
    // todo:: add unit tests
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    isValidInputDateValue(value, config) {
        value = value ? value : '';
        /** @type {?} */
        const datesStrArr = this.utilsService.datesStringToStringArray(value);
        return datesStrArr.every((/**
         * @param {?} date
         * @return {?}
         */
        date => this.utilsService.isDateValid(date, config.format)));
    }
    // todo:: add unit tests
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    convertInputValueToMomentArray(value, config) {
        value = value ? value : '';
        /** @type {?} */
        const datesStrArr = this.utilsService.datesStringToStringArray(value);
        return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect);
    }
    /**
     * @private
     * @param {?} mode
     * @return {?}
     */
    getDefaultFormatByMode(mode) {
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
    }
}
DatePickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatePickerService.ctorParameters = () => [
    { type: UtilsService },
    { type: TimeSelectService },
    { type: DayTimeCalendarService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$7 = momentNs;
class MonthCalendarService {
    /**
     * @param {?} utilsService
     */
    constructor(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = {
            allowMultiSelect: false,
            yearFormat: 'YYYY',
            format: 'MM-YYYY',
            isNavHeaderBtnClickable: false,
            monthBtnFormat: 'MMM',
            locale: moment$7.locale(),
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            unSelectOnClick: true
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getConfig(config) {
        /** @type {?} */
        const _config = (/** @type {?} */ (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        moment$7.locale(_config.locale);
        return _config;
    }
    /**
     * @param {?} config
     * @param {?} year
     * @param {?=} selected
     * @return {?}
     */
    generateYear(config, year, selected = null) {
        /** @type {?} */
        const index = year.clone().startOf('year');
        return this.utilsService.createArray(3).map((/**
         * @return {?}
         */
        () => {
            return this.utilsService.createArray(4).map((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const date = index.clone();
                /** @type {?} */
                const month = {
                    date,
                    selected: !!selected.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => index.isSame(s, 'month'))),
                    currentMonth: index.isSame(moment$7(), 'month'),
                    disabled: this.isMonthDisabled(date, config),
                    text: this.getMonthBtnText(config, date)
                };
                index.add(1, 'month');
                return month;
            }));
        }));
    }
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    isMonthDisabled(date, config) {
        if (config.min && date.isBefore(config.min, 'month')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'month'));
    }
    /**
     * @param {?} min
     * @param {?} currentMonthView
     * @return {?}
     */
    shouldShowLeft(min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, 'year') : true;
    }
    /**
     * @param {?} max
     * @param {?} currentMonthView
     * @return {?}
     */
    shouldShowRight(max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, 'year') : true;
    }
    /**
     * @param {?} config
     * @param {?} year
     * @return {?}
     */
    getHeaderLabel(config, year) {
        if (config.yearFormatter) {
            return config.yearFormatter(year);
        }
        return year.format(config.yearFormat);
    }
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    getMonthBtnText(config, month) {
        if (config.monthBtnFormatter) {
            return config.monthBtnFormatter(month);
        }
        return month.format(config.monthBtnFormat);
    }
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    getMonthBtnCssClass(config, month) {
        if (config.monthBtnCssClassCallback) {
            return config.monthBtnCssClassCallback(month);
        }
        return '';
    }
}
MonthCalendarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MonthCalendarService.ctorParameters = () => [
    { type: UtilsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$8 = momentNs;
class MonthCalendarComponent {
    /**
     * @param {?} monthCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(monthCalendarService, utilsService, cd) {
        this.monthCalendarService = monthCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new EventEmitter();
        this.onNavHeaderBtnClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onLeftSecondaryNav = new EventEmitter();
        this.onRightSecondaryNav = new EventEmitter();
        this.isInited = false;
        this._shouldShowCurrent = true;
        this.api = {
            toggleCalendar: this.toggleCalendarMode.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.onChangeCallback(this.processOnChangeCallback(selected));
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    set currentDateView(current) {
        this._currentDateView = current.clone();
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this._currentDateView, this.selected);
        this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
        this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
        this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
        this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
        this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
    }
    /**
     * @return {?}
     */
    get currentDateView() {
        return this._currentDateView;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInited = true;
        this.init();
        this.initValidators();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate, config } = changes;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.monthCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this._shouldShowCurrent = this.shouldShowCurrent();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChangeCallback(_) {
    }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            () => null);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    processOnChangeCallback(value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} month
     * @return {?}
     */
    monthClicked(month) {
        if (month.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(month);
    }
    /**
     * @return {?}
     */
    onLeftNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onLeftSecondaryNavClick() {
        /** @type {?} */
        let navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        const isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onLeftSecondaryNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(1, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightSecondaryNavClick() {
        /** @type {?} */
        let navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        const isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightSecondaryNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    toggleCalendarMode() {
        this.onNavHeaderBtnClick.emit();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthBtnCssClass(month) {
        /** @type {?} */
        const cssClass = {
            'dp-selected': month.selected,
            'dp-current-month': month.currentMonth
        };
        /** @type {?} */
        const customCssClass = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    }
    /**
     * @return {?}
     */
    shouldShowCurrent() {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'month', this.componentConfig.min, this.componentConfig.max);
    }
    /**
     * @return {?}
     */
    goToCurrent() {
        this.currentDateView = moment$8();
        this.onGoToCurrent.emit();
    }
    /**
     * @param {?} to
     * @return {?}
     */
    moveCalendarTo(to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
            this.cd.markForCheck();
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    handleConfigChange(config) {
        if (config) {
            /** @type {?} */
            const prevConf = this.monthCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            const currentConf = this.monthCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    }
}
MonthCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-month-calendar',
                template: "<div class=\"dp-month-calendar-container\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [showRightSecondaryNav]=\"showSecondaryRightNav\"\n      [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n      [showGoToCurrent]=\"shouldShowCurrent()\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode()\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\">\n    <div class=\"dp-months-row\" *ngFor=\"let monthRow of yearMonths\">\n      <button type=\"button\"\n              class=\"dp-calendar-month\"\n              *ngFor=\"let month of monthRow\"\n              [attr.data-date]=\"month.date.format(componentConfig.format)\"\n              [disabled]=\"month.disabled\"\n              [ngClass]=\"getMonthBtnCssClass(month)\"\n              (click)=\"monthClicked(month)\"\n              [innerText]=\"month.text\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    MonthCalendarService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MonthCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MonthCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-month-calendar{display:inline-block}dp-month-calendar .dp-month-calendar-container{background:#fff}dp-month-calendar .dp-calendar-wrapper{border:1px solid #000}dp-month-calendar .dp-calendar-month{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-month-calendar .dp-calendar-month.dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-month-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-month-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-month-calendar.dp-material .dp-current-month{border:1px solid #106cc8}"]
            }] }
];
/** @nocollapse */
MonthCalendarComponent.ctorParameters = () => [
    { type: MonthCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
MonthCalendarComponent.propDecorators = {
    config: [{ type: Input }],
    displayDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onSelect: [{ type: Output }],
    onNavHeaderBtnClick: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onLeftSecondaryNav: [{ type: Output }],
    onRightSecondaryNav: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$9 = momentNs;
class YearCalendarService {
    /**
     * @param {?} utilsService
     */
    constructor(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = {
            allowMultiSelect: false,
            yearFormat: 'YYYY',
            format: 'YYYY',
            isNavHeaderBtnClickable: false,
            yearBtnFormat: 'YYYY',
            locale: moment$9.locale(),
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            unSelectOnClick: true
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getConfig(config) {
        /** @type {?} */
        const _config = (/** @type {?} */ (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        moment$9.locale(_config.locale);
        return _config;
    }
    /**
     * @param {?} config
     * @param {?} year
     * @param {?=} selected
     * @return {?}
     */
    generateYear(config, year, selected = null) {
        /** @type {?} */
        const index = year.clone().startOf('year');
        return this.utilsService.createArray(3).map((/**
         * @return {?}
         */
        () => {
            return this.utilsService.createArray(4).map((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const date = index.clone();
                /** @type {?} */
                const year = {
                    date,
                    selected: !!selected.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => index.isSame(s, 'year'))),
                    currentYear: index.isSame(moment$9(), 'year'),
                    disabled: this.isYearDisabled(date, config),
                    text: this.getYearBtnText(config, date)
                };
                index.add(1, 'year');
                return year;
            }));
        }));
    }
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    isYearDisabled(date, config) {
        if (config.min && date.isBefore(config.min, 'year')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'year'));
    }
    /**
     * @param {?} min
     * @param {?} currentYearView
     * @return {?}
     */
    shouldShowLeft(min, currentYearView) {
        return min ? min.isBefore(currentYearView, 'year') : true;
    }
    /**
     * @param {?} max
     * @param {?} currentYearView
     * @return {?}
     */
    shouldShowRight(max, currentYearView) {
        return max ? max.isAfter(currentYearView, 'year') : true;
    }
    /**
     * @param {?} config
     * @param {?} year
     * @return {?}
     */
    getHeaderLabel(config, year) {
        if (config.yearFormatter) {
            return config.yearFormatter(year);
        }
        return year.format(config.yearFormat);
    }
    /**
     * @param {?} config
     * @param {?} year
     * @return {?}
     */
    getYearBtnText(config, year) {
        if (config.yearBtnFormatter) {
            return config.yearBtnFormatter(year);
        }
        return year.format(config.yearBtnFormat);
    }
    /**
     * @param {?} config
     * @param {?} year
     * @return {?}
     */
    getYearBtnCssClass(config, year) {
        if (config.yearBtnCssClassCallback) {
            return config.yearBtnCssClassCallback(year);
        }
        return '';
    }
}
YearCalendarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
YearCalendarService.ctorParameters = () => [
    { type: UtilsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$a = momentNs;
class YearCalendarComponent {
    /**
     * @param {?} yearCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(yearCalendarService, utilsService, cd) {
        this.yearCalendarService = yearCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new EventEmitter();
        this.onNavHeaderBtnClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onLeftSecondaryNav = new EventEmitter();
        this.onRightSecondaryNav = new EventEmitter();
        this.isInited = false;
        this._shouldShowCurrent = true;
        this.api = {
            toggleCalendar: this.toggleCalendarMode.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.onChangeCallback(this.processOnChangeCallback(selected));
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    set currentDateView(current) {
        this._currentDateView = current.clone();
        this.yearYears = this.yearCalendarService
            .generateYear(this.componentConfig, this._currentDateView, this.selected);
        this.navLabel = this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
        this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
        this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
        this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
        this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
    }
    /**
     * @return {?}
     */
    get currentDateView() {
        return this._currentDateView;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInited = true;
        this.init();
        this.initValidators();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate, config } = changes;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.yearCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this._shouldShowCurrent = this.shouldShowCurrent();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChangeCallback(_) {
    }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            () => null);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    processOnChangeCallback(value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'year');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} year
     * @return {?}
     */
    yearClicked(year) {
        if (year.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
        this.yearYears = this.yearCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(year);
    }
    /**
     * @return {?}
     */
    onLeftNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(12, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.yearYears = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onLeftSecondaryNavClick() {
        /** @type {?} */
        let navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        const isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onLeftSecondaryNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(12, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightSecondaryNavClick() {
        /** @type {?} */
        let navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        const isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightSecondaryNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    toggleCalendarMode() {
        this.onNavHeaderBtnClick.emit();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    getYearBtnCssClass(year) {
        /** @type {?} */
        const cssClass = {
            'dp-selected': year.selected,
            'dp-current-year': year.currentYear
        };
        /** @type {?} */
        const customCssClass = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    }
    /**
     * @return {?}
     */
    shouldShowCurrent() {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'year', this.componentConfig.min, this.componentConfig.max);
    }
    /**
     * @return {?}
     */
    goToCurrent() {
        this.currentDateView = moment$a();
        this.onGoToCurrent.emit();
    }
    /**
     * @param {?} to
     * @return {?}
     */
    moveCalendarTo(to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
            this.cd.markForCheck();
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    handleConfigChange(config) {
        if (config) {
            /** @type {?} */
            const prevConf = this.yearCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            const currentConf = this.yearCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    }
}
YearCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-year-calendar',
                template: "<div class=\"dp-year-calendar-container\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [showRightSecondaryNav]=\"showSecondaryRightNav\"\n      [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n      [showGoToCurrent]=\"shouldShowCurrent()\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode()\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\">\n    <div class=\"dp-years-row\" *ngFor=\"let yearRow of yearYears\">\n      <button type=\"button\"\n              class=\"dp-calendar-year\"\n              *ngFor=\"let year of yearRow\"\n              [attr.data-date]=\"year.date.format(componentConfig.format)\"\n              [disabled]=\"year.disabled\"\n              [ngClass]=\"getYearBtnCssClass(year)\"\n              (click)=\"yearClicked(year)\"\n              [innerText]=\"year.text\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    YearCalendarService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => YearCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => YearCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-year-calendar{display:inline-block}dp-year-calendar .dp-year-calendar-container{background:#fff}dp-year-calendar .dp-calendar-wrapper{border:1px solid #000}dp-year-calendar .dp-calendar-year{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-year-calendar .dp-calendar-year.dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-year{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-year-calendar.dp-material .dp-calendar-year:hover{background:#e0e0e0}dp-year-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-year-calendar.dp-material .dp-current-year{border:1px solid #106cc8}"]
            }] }
];
/** @nocollapse */
YearCalendarComponent.ctorParameters = () => [
    { type: YearCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
YearCalendarComponent.propDecorators = {
    config: [{ type: Input }],
    displayDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onSelect: [{ type: Output }],
    onNavHeaderBtnClick: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onLeftSecondaryNav: [{ type: Output }],
    onRightSecondaryNav: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DayTimeCalendarComponent {
    /**
     * @param {?} dayTimeCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(dayTimeCalendarService, utilsService, cd) {
        this.dayTimeCalendarService = dayTimeCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.isInited = false;
        this.api = {
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.onChangeCallback(this.processOnChangeCallback(selected));
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInited = true;
        this.init();
        this.initValidators();
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate } = changes;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChangeCallback(_) {
    }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            () => null);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    processOnChangeCallback(value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, [value], this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate
        }, undefined, 'daytime');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} day
     * @return {?}
     */
    dateSelected(day) {
        this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date, this.config);
        this.emitChange();
    }
    /**
     * @param {?} time
     * @return {?}
     */
    timeChange(time) {
        this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
        this.emitChange();
    }
    /**
     * @return {?}
     */
    emitChange() {
        this.onChange.emit({ date: this.selected, selected: false });
    }
    /**
     * @param {?} to
     * @return {?}
     */
    moveCalendarTo(to) {
        if (to) {
            this.dayCalendarRef.moveCalendarTo(to);
        }
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onLeftNavClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onRightNavClick(change) {
        this.onRightNav.emit(change);
    }
}
DayTimeCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-day-time-calendar',
                template: "<dp-day-calendar #dayCalendar\n                 [config]=\"componentConfig\"\n                 [ngModel]=\"_selected\"\n                 [theme]=\"theme\"\n                 [displayDate]=\"displayDate\"\n                 (onSelect)=\"dateSelected($event)\"\n                 (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                 (onLeftNav)=\"onLeftNavClick($event)\"\n                 (onRightNav)=\"onRightNavClick($event)\">\n</dp-day-calendar>\n<dp-time-select #timeSelect\n                [config]=\"componentConfig\"\n                [ngModel]=\"_selected\"\n                (onChange)=\"timeChange($event)\"\n                [theme]=\"theme\">\n</dp-time-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                providers: [
                    DayTimeCalendarService,
                    DayCalendarService,
                    TimeSelectService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DayTimeCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DayTimeCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-day-time-calendar{display:inline-block}dp-day-time-calendar dp-time-select{display:block;border:1px solid #000;border-top:0}dp-day-time-calendar.dp-material dp-time-select{border:1px solid #e0e0e0;border-top:0}"]
            }] }
];
/** @nocollapse */
DayTimeCalendarComponent.ctorParameters = () => [
    { type: DayTimeCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
DayTimeCalendarComponent.propDecorators = {
    config: [{ type: Input }],
    displayDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onChange: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    dayCalendarRef: [{ type: ViewChild, args: ['dayCalendar',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatePickerComponent {
    /**
     * @param {?} dayPickerService
     * @param {?} domHelper
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(dayPickerService, domHelper, elemRef, renderer, utilsService, cd) {
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
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onSelect = new EventEmitter();
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
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.inputElementValue = ((/** @type {?} */ (this.utilsService
            .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr))))
            .join(' | ');
        /** @type {?} */
        const val = this.processOnChangeCallback(selected);
        this.onChangeCallback(val, false);
        this.onChange.emit(val);
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    get areCalendarsShown() {
        return this._areCalendarsShown;
    }
    /**
     * @return {?}
     */
    get openOnFocus() {
        return this.componentConfig.openOnFocus;
    }
    /**
     * @return {?}
     */
    get openOnClick() {
        return this.componentConfig.openOnClick;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set areCalendarsShown(value) {
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
    }
    /**
     * @return {?}
     */
    get currentDateView() {
        return this._currentDateView;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set currentDateView(date) {
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
    }
    /**
     * @return {?}
     */
    onClick() {
        if (!this.openOnClick) {
            return;
        }
        if (!this.isFocusedTrigger && !this.disabled) {
            this.hideStateHelper = true;
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
        }
    }
    /**
     * @return {?}
     */
    onBodyClick() {
        if (this.componentConfig.hideOnOutsideClick) {
            if (!this.hideStateHelper && this.areCalendarsShown) {
                this.hideCalendar();
            }
            this.hideStateHelper = false;
        }
    }
    /**
     * @return {?}
     */
    onScroll() {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @param {?} changedByInput
     * @return {?}
     */
    onChangeCallback(_, changedByInput) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onTouchedCallback() {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        return this.validateFn(formControl.value);
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    processOnChangeCallback(selected) {
        if (typeof selected === 'string') {
            return selected;
        }
        else {
            return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.componentConfig.returnedValueType || this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect));
        }
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, this.componentConfig.format, this.mode);
        this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInitialized = true;
        this.init();
        this.initValidators();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInitialized) {
            const { minDate, maxDate, minTime, maxTime } = changes;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setElementPositionInDom();
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    setElementPositionInDom() {
        this.calendarWrapper = (/** @type {?} */ (this.calendarContainer.nativeElement));
        this.setInputElementContainer();
        this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
        this.handleInnerElementClick(this.popupElem);
        const { appendTo } = this.componentConfig;
        if (appendTo) {
            if (typeof appendTo === 'string') {
                this.appendToElement = (/** @type {?} */ (document.querySelector((/** @type {?} */ (appendTo)))));
            }
            else {
                this.appendToElement = (/** @type {?} */ (appendTo));
            }
        }
        else {
            this.appendToElement = this.elemRef.nativeElement;
        }
        this.appendToElement.appendChild(this.calendarWrapper);
    }
    /**
     * @return {?}
     */
    setInputElementContainer() {
        this.inputElementContainer = this.utilsService.getNativeElement(this.componentConfig.inputElementContainer)
            || this.elemRef.nativeElement.querySelector('.dp-input-container')
            || document.body;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    handleInnerElementClick(element) {
        this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', (/**
         * @return {?}
         */
        () => {
            this.hideStateHelper = true;
        })));
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
        this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
        this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    }
    /**
     * @return {?}
     */
    inputFocused() {
        if (!this.openOnFocus) {
            return;
        }
        this.isFocusedTrigger = true;
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
            this.hideStateHelper = false;
            this.isFocusedTrigger = false;
            this.cd.markForCheck();
        }), this.componentConfig.onOpenDelay);
    }
    /**
     * @return {?}
     */
    inputBlurred() {
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    showCalendars() {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
        if (this.timeSelectRef) {
            this.timeSelectRef.api.triggerChange();
        }
        this.open.emit();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    hideCalendar() {
        this.areCalendarsShown = false;
        if (this.dayCalendarRef) {
            this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
        }
        this.close.emit();
        this.cd.markForCheck();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onViewDateChange(value) {
        /** @type {?} */
        const strVal = value ? this.utilsService.convertToString(value, this.componentConfig.format) : '';
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
    }
    /**
     * @param {?} date
     * @param {?} granularity
     * @param {?} type
     * @param {?=} ignoreClose
     * @return {?}
     */
    dateSelected(date, granularity, type, ignoreClose) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
        if (!ignoreClose) {
            this.onDateClick();
        }
        this.onSelect.emit({
            date: date.date,
            granularity,
            type
        });
    }
    /**
     * @return {?}
     */
    onDateClick() {
        if (this.componentConfig.closeOnSelect) {
            setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyPress(event) {
        switch (event.keyCode) {
            case (9):
            case (27):
                this.hideCalendar();
                break;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    moveCalendarTo(date) {
        /** @type {?} */
        const momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format);
        this.currentDateView = momentDate;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onLeftNavClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onRightNavClick(change) {
        this.onRightNav.emit(change);
    }
    /**
     * @return {?}
     */
    startGlobalListeners() {
        this.globalListenersUnlisteners.push(this.renderer.listen(document, 'keydown', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onKeyPress(e);
        })), this.renderer.listen(document, 'scroll', (/**
         * @return {?}
         */
        () => {
            this.onScroll();
        })), this.renderer.listen(document, 'click', (/**
         * @return {?}
         */
        () => {
            this.onBodyClick();
        })));
    }
    /**
     * @return {?}
     */
    stopGlobalListeners() {
        this.globalListenersUnlisteners.forEach((/**
         * @param {?} ul
         * @return {?}
         */
        (ul) => ul()));
        this.globalListenersUnlisteners = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.handleInnerElementClickUnlisteners.forEach((/**
         * @param {?} ul
         * @return {?}
         */
        ul => ul()));
        if (this.appendToElement) {
            this.appendToElement.removeChild(this.calendarWrapper);
        }
    }
}
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-date-picker',
                template: "<div [ngClass]=\"{'dp-open': areCalendarsShown}\">\n  <div class=\"dp-input-container\"\n       [hidden]=\"componentConfig.hideInputContainer\"\n       [attr.data-hidden]=\"componentConfig.hideInputContainer\">\n    <input type=\"text\"\n           class=\"dp-picker-input\"\n           [placeholder]=\"placeholder\"\n           [ngModel]=\"inputElementValue\"\n           (ngModelChange)=\"onViewDateChange($event)\"\n           (focus)=\"inputFocused()\"\n           (blur)=\"inputBlurred()\"\n           [readonly]=\"componentConfig.disableKeypress\"\n           [disabled]=\"disabled\"/>\n  </div>\n  <div #container>\n    <div class=\"dp-popup {{theme}}\"\n         [ngSwitch]=\"mode\"\n         [hidden]=\"!_areCalendarsShown\"\n         [attr.data-hidden]=\"!_areCalendarsShown\">\n      <dp-day-calendar #dayCalendar\n                       *ngSwitchCase=\"'day'\"\n                       [config]=\"dayCalendarConfig\"\n                       [ngModel]=\"_selected\"\n                       [displayDate]=\"displayDate\"\n                       [theme]=\"theme\"\n                       (onSelect)=\"dateSelected($event, 'day', selectEvent.SELECTION, false)\"\n                       (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                       (onLeftNav)=\"onLeftNavClick($event)\"\n                       (onRightNav)=\"onRightNavClick($event)\">\n      </dp-day-calendar>\n\n      <dp-month-calendar #monthCalendar\n                         *ngSwitchCase=\"'month'\"\n                         [config]=\"dayCalendarConfig\"\n                         [ngModel]=\"_selected\"\n                         [displayDate]=\"displayDate\"\n                         [theme]=\"theme\"\n                         (onSelect)=\"dateSelected($event, 'month', selectEvent.SELECTION, false)\"\n                         (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                         (onLeftNav)=\"onLeftNavClick($event)\"\n                         (onRightNav)=\"onRightNavClick($event)\">\n      </dp-month-calendar>\n\n      <dp-year-calendar #yearCalendar\n                         *ngSwitchCase=\"'year'\"\n                         [config]=\"dayCalendarConfig\"\n                         [ngModel]=\"_selected\"\n                         [displayDate]=\"displayDate\"\n                         [theme]=\"theme\"\n                         (onSelect)=\"dateSelected($event, 'year', selectEvent.SELECTION, false)\"\n                         (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                         (onLeftNav)=\"onLeftNavClick($event)\"\n                         (onRightNav)=\"onRightNavClick($event)\">\n      </dp-year-calendar>\n\n      <dp-time-select #timeSelect\n                      *ngSwitchCase=\"'time'\"\n                      [config]=\"timeSelectConfig\"\n                      [ngModel]=\"_selected && _selected[0]\"\n                      (onChange)=\"dateSelected($event, 'second', selectEvent.SELECTION, true)\"\n                      [theme]=\"theme\">\n      </dp-time-select>\n\n      <dp-day-time-calendar #daytimeCalendar\n                            *ngSwitchCase=\"'daytime'\"\n                            [config]=\"dayTimeCalendarConfig\"\n                            [displayDate]=\"displayDate\"\n                            [ngModel]=\"_selected && _selected[0]\"\n                            [theme]=\"theme\"\n                            (onChange)=\"dateSelected($event, 'second', selectEvent.SELECTION, true)\"\n                            (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                            (onLeftNav)=\"onLeftNavClick($event)\"\n                            (onRightNav)=\"onRightNavClick($event)\">\n      </dp-day-time-calendar>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    DatePickerService,
                    DayTimeCalendarService,
                    DayCalendarService,
                    TimeSelectService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatePickerComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatePickerComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-date-picker{display:inline-block}dp-date-picker.dp-material .dp-picker-input{box-sizing:border-box;height:30px;width:213px;font-size:13px;outline:0}dp-date-picker .dp-input-container{position:relative}dp-date-picker .dp-selected{background:#106cc8;color:#fff}.dp-popup{position:relative;background:#fff;box-shadow:1px 1px 5px 0 rgba(0,0,0,.1);border-left:1px solid rgba(0,0,0,.1);border-right:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1);z-index:9999;white-space:nowrap}"]
            }] }
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: DatePickerService },
    { type: DomHelper },
    { type: ElementRef },
    { type: Renderer },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
DatePickerComponent.propDecorators = {
    config: [{ type: Input }],
    mode: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    displayDate: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onChange: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onSelect: [{ type: Output }],
    calendarContainer: [{ type: ViewChild, args: ['container',] }],
    dayCalendarRef: [{ type: ViewChild, args: ['dayCalendar',] }],
    monthCalendarRef: [{ type: ViewChild, args: ['monthCalendar',] }],
    yearCalendarRef: [{ type: ViewChild, args: ['yearCalendar',] }],
    dayTimeCalendarRef: [{ type: ViewChild, args: ['daytimeCalendar',] }],
    timeSelectRef: [{ type: ViewChild, args: ['timeSelect',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onScroll: [{ type: HostListener, args: ['window:resize',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatePickerDirectiveService {
    /**
     * @param {?} utilsService
     */
    constructor(utilsService) {
        this.utilsService = utilsService;
    }
    /**
     * @param {?} attachTo
     * @param {?} baseElement
     * @return {?}
     */
    convertToHTMLElement(attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    }
    /**
     * @param {?=} config
     * @param {?=} baseElement
     * @param {?=} attachTo
     * @return {?}
     */
    getConfig(config = {}, baseElement, attachTo) {
        /** @type {?} */
        const _config = Object.assign({}, config);
        _config.hideInputContainer = true;
        /** @type {?} */
        let native;
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
    }
}
DatePickerDirectiveService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatePickerDirectiveService.ctorParameters = () => [
    { type: UtilsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatePickerDirective {
    /**
     * @param {?} viewContainerRef
     * @param {?} elemRef
     * @param {?} componentFactoryResolver
     * @param {?} service
     * @param {?} formControl
     * @param {?} utilsService
     */
    constructor(viewContainerRef, elemRef, componentFactoryResolver, service, formControl, utilsService) {
        this.viewContainerRef = viewContainerRef;
        this.elemRef = elemRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.service = service;
        this.formControl = formControl;
        this.utilsService = utilsService;
        this._mode = 'day';
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set config(config) {
        this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
        this.updateDatepickerConfig();
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get attachTo() {
        return this._attachTo;
    }
    /**
     * @param {?} attachTo
     * @return {?}
     */
    set attachTo(attachTo) {
        this._attachTo = attachTo;
        this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
        this.updateDatepickerConfig();
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get theme() {
        return this._theme;
    }
    /**
     * @param {?} theme
     * @return {?}
     */
    set theme(theme) {
        this._theme = theme;
        if (this.datePicker) {
            this.datePicker.theme = theme;
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get mode() {
        return this._mode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set mode(mode) {
        this._mode = mode;
        if (this.datePicker) {
            this.datePicker.mode = mode;
        }
        this.markForCheck();
    }
    /**
     * @param {?} minDate
     * @return {?}
     */
    set minDate(minDate) {
        this._minDate = minDate;
        if (this.datePicker) {
            this.datePicker.minDate = minDate;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} maxDate
     * @return {?}
     */
    set maxDate(maxDate) {
        this._maxDate = maxDate;
        if (this.datePicker) {
            this.datePicker.maxDate = maxDate;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} minTime
     * @return {?}
     */
    set minTime(minTime) {
        this._minTime = minTime;
        if (this.datePicker) {
            this.datePicker.minTime = minTime;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get minTime() {
        return this._minTime;
    }
    /**
     * @param {?} maxTime
     * @return {?}
     */
    set maxTime(maxTime) {
        this._maxTime = maxTime;
        if (this.datePicker) {
            this.datePicker.maxTime = maxTime;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get maxTime() {
        return this._maxTime;
    }
    /**
     * @return {?}
     */
    get displayDate() {
        return this._displayDate;
    }
    /**
     * @param {?} displayDate
     * @return {?}
     */
    set displayDate(displayDate) {
        this._displayDate = displayDate;
        this.updateDatepickerConfig();
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.datePicker = this.createDatePicker();
        this.api = this.datePicker.api;
        this.updateDatepickerConfig();
        this.attachModelToDatePicker();
        this.datePicker.theme = this.theme;
    }
    /**
     * @return {?}
     */
    createDatePicker() {
        /** @type {?} */
        const factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
        return this.viewContainerRef.createComponent(factory).instance;
    }
    /**
     * @return {?}
     */
    attachModelToDatePicker() {
        if (!this.formControl) {
            return;
        }
        this.datePicker.onViewDateChange(this.formControl.value);
        this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (value !== this.datePicker.inputElementValue) {
                /** @type {?} */
                const strVal = this.utilsService.convertToString(value, this.datePicker.componentConfig.format);
                this.datePicker.onViewDateChange(strVal);
            }
        }));
        /** @type {?} */
        let setup = true;
        this.datePicker.registerOnChange((/**
         * @param {?} value
         * @param {?} changedByInput
         * @return {?}
         */
        (value, changedByInput) => {
            if (value) {
                /** @type {?} */
                const isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                if (!isMultiselectEmpty && !changedByInput) {
                    this.formControl.control.setValue(this.datePicker.inputElementValue);
                }
            }
            /** @type {?} */
            const errors = this.datePicker.validateFn(value);
            if (!setup) {
                this.formControl.control.markAsDirty({
                    onlySelf: true
                });
            }
            else {
                setup = false;
            }
            if (errors) {
                if (errors.hasOwnProperty('format')) {
                    const { given } = errors['format'];
                    this.datePicker.inputElementValue = given;
                    if (!changedByInput) {
                        this.formControl.control.setValue(given);
                    }
                }
                this.formControl.control.setErrors(errors);
            }
        }));
    }
    /**
     * @return {?}
     */
    onClick() {
        this.datePicker.onClick();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.datePicker.inputFocused();
    }
    /**
     * @private
     * @return {?}
     */
    updateDatepickerConfig() {
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
    }
    /**
     * @return {?}
     */
    markForCheck() {
        if (this.datePicker) {
            this.datePicker.cd.markForCheck();
        }
    }
}
DatePickerDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'dpDayPicker',
                providers: [DatePickerDirectiveService],
                selector: '[dpDayPicker]'
            },] }
];
/** @nocollapse */
DatePickerDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: DatePickerDirectiveService },
    { type: NgControl, decorators: [{ type: Optional }] },
    { type: UtilsService }
];
DatePickerDirective.propDecorators = {
    config: [{ type: Input, args: ['dpDayPicker',] }],
    attachTo: [{ type: Input }],
    theme: [{ type: Input }],
    mode: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    displayDate: [{ type: Input }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onChange: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onSelect: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onFocus: [{ type: HostListener, args: ['focus',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarNavComponent {
    constructor() {
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
        this.onLeftNav = new EventEmitter();
        this.onLeftSecondaryNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onRightSecondaryNav = new EventEmitter();
        this.onLabelClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    leftNavClicked() {
        this.onLeftNav.emit();
    }
    /**
     * @return {?}
     */
    leftSecondaryNavClicked() {
        this.onLeftSecondaryNav.emit();
    }
    /**
     * @return {?}
     */
    rightNavClicked() {
        this.onRightNav.emit();
    }
    /**
     * @return {?}
     */
    rightSecondaryNavClicked() {
        this.onRightSecondaryNav.emit();
    }
    /**
     * @return {?}
     */
    labelClicked() {
        this.onLabelClick.emit();
    }
}
CalendarNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-calendar-nav',
                template: "<div class=\"dp-calendar-nav-container\">\n  <div class=\"dp-nav-header\">\n    <span [hidden]=\"isLabelClickable\"\n          [attr.data-hidden]=\"isLabelClickable\"\n          [innerText]=\"label\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-nav-header-btn\"\n            [hidden]=\"!isLabelClickable\"\n            [attr.data-hidden]=\"!isLabelClickable\"\n            (click)=\"labelClicked()\"\n            [innerText]=\"label\">\n    </button>\n  </div>\n\n  <div class=\"dp-nav-btns-container\">\n    <div class=\"dp-calendar-nav-container-left\">\n      <button type=\"button\"\n              class=\"dp-calendar-secondary-nav-left\"\n              *ngIf=\"showLeftSecondaryNav\"\n              [disabled]=\"leftSecondaryNavDisabled\"\n              (click)=\"leftSecondaryNavClicked()\">\n      </button>\n      <button type=\"button\"\n              class=\"dp-calendar-nav-left\"\n              [hidden]=\"!showLeftNav\"\n              [attr.data-hidden]=\"!showLeftNav\"\n              [disabled]=\"leftNavDisabled\"\n              (click)=\"leftNavClicked()\">\n      </button>\n    </div>\n    <button type=\"button\"\n            class=\"dp-current-location-btn\"\n            *ngIf=\"showGoToCurrent\"\n            (click)=\"onGoToCurrent.emit()\">\n    </button>\n    <div class=\"dp-calendar-nav-container-right\">\n      <button type=\"button\"\n              class=\"dp-calendar-nav-right\"\n              [hidden]=\"!showRightNav\"\n              [attr.data-hidden]=\"!showRightNav\"\n              [disabled]=\"rightNavDisabled\"\n              (click)=\"rightNavClicked()\">\n      </button>\n      <button type=\"button\"\n              class=\"dp-calendar-secondary-nav-right\"\n              *ngIf=\"showRightSecondaryNav\"\n              [disabled]=\"rightSecondaryNavDisabled\"\n              (click)=\"rightSecondaryNavClicked()\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["dp-calendar-nav .dp-calendar-nav-container{position:relative;box-sizing:border-box;height:25px;border:1px solid #000;border-bottom:none}dp-calendar-nav .dp-nav-date-btn{box-sizing:border-box;height:25px;border:1px solid #000;border-bottom:none}dp-calendar-nav .dp-nav-btns-container{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:5px;display:inline-block}dp-calendar-nav .dp-calendar-nav-container-left,dp-calendar-nav .dp-calendar-nav-container-right{display:inline-block}dp-calendar-nav .dp-calendar-nav-left,dp-calendar-nav .dp-calendar-nav-right,dp-calendar-nav .dp-calendar-secondary-nav-left,dp-calendar-nav .dp-calendar-secondary-nav-right{position:relative;width:16px;cursor:pointer}dp-calendar-nav .dp-calendar-nav-left,dp-calendar-nav .dp-calendar-nav-right{line-height:0}dp-calendar-nav .dp-calendar-nav-left::before,dp-calendar-nav .dp-calendar-nav-right::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}dp-calendar-nav .dp-calendar-secondary-nav-left,dp-calendar-nav .dp-calendar-secondary-nav-right{padding:0}dp-calendar-nav .dp-calendar-secondary-nav-left::after,dp-calendar-nav .dp-calendar-secondary-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-right::after,dp-calendar-nav .dp-calendar-secondary-nav-right::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}dp-calendar-nav .dp-calendar-secondary-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-right::before{right:-10px}dp-calendar-nav .dp-calendar-secondary-nav-right{left:initial;right:5px}dp-calendar-nav .dp-calendar-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-left::after,dp-calendar-nav .dp-calendar-secondary-nav-left::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}dp-calendar-nav .dp-calendar-secondary-nav-left::before{right:-10px}dp-calendar-nav .dp-nav-header{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:5px;display:inline-block;font-size:13px}dp-calendar-nav .dp-nav-header-btn{cursor:pointer}dp-calendar-nav .dp-current-location-btn{position:relative;top:-1px;height:16px;width:16px;vertical-align:middle;background:rgba(0,0,0,.6);border:1px solid rgba(0,0,0,.6);outline:0;border-radius:50%;box-shadow:inset 0 0 0 3px #fff;cursor:pointer}dp-calendar-nav .dp-current-location-btn:hover{background:#000}dp-calendar-nav.dp-material .dp-calendar-nav-container{height:30px;border:1px solid #e0e0e0}dp-calendar-nav.dp-material .dp-calendar-nav-left,dp-calendar-nav.dp-material .dp-calendar-nav-right,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right{border:none;background:#fff;outline:0;font-size:16px;padding:0}dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right{width:20px}dp-calendar-nav.dp-material .dp-nav-header-btn{height:20px;width:80px;border:none;background:#fff;outline:0}dp-calendar-nav.dp-material .dp-nav-header-btn:hover{background:rgba(0,0,0,.05)}dp-calendar-nav.dp-material .dp-nav-header-btn:active{background:rgba(0,0,0,.1)}"]
            }] }
];
CalendarNavComponent.propDecorators = {
    label: [{ type: Input }],
    isLabelClickable: [{ type: Input }],
    showLeftNav: [{ type: Input }],
    showLeftSecondaryNav: [{ type: Input }],
    showRightNav: [{ type: Input }],
    showRightSecondaryNav: [{ type: Input }],
    leftNavDisabled: [{ type: Input }],
    leftSecondaryNavDisabled: [{ type: Input }],
    rightNavDisabled: [{ type: Input }],
    rightSecondaryNavDisabled: [{ type: Input }],
    showGoToCurrent: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onLeftNav: [{ type: Output }],
    onLeftSecondaryNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onRightSecondaryNav: [{ type: Output }],
    onLabelClick: [{ type: Output }],
    onGoToCurrent: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DpDatePickerModule {
}
DpDatePickerModule.decorators = [
    { type: NgModule, args: [{
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
                    CommonModule,
                    FormsModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ECalendarMode, ECalendarValue, SelectEvent, DatePickerComponent, DatePickerDirective, DayCalendarComponent, DayTimeCalendarComponent, TimeSelectComponent, MonthCalendarComponent, YearCalendarComponent, DpDatePickerModule, CalendarNavComponent as ɵi, DomHelper as ɵa, UtilsService as ɵb, DatePickerDirectiveService as ɵg, DatePickerService as ɵc, DayCalendarService as ɵf, DayTimeCalendarService as ɵe, MonthCalendarService as ɵh, TimeSelectService as ɵd, YearCalendarService as ɵj };

//# sourceMappingURL=ng2-date-picker.js.map