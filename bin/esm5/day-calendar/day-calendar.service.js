/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
var moment = momentNs;
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
            locale: moment.locale(),
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
        if (monthArray[monthArray.length - 1].find((/**
         * @param {?} day
         * @return {?}
         */
        function (day) { return day.date.isSame(currentMonth, 'month'); }))) {
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
        var _config = (/** @type {?} */ (tslib_1.__assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        moment.locale(_config.locale);
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
        return daysArr.reduce((/**
         * @param {?} map
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        function (map, day, index) {
            map[day] = index;
            return map;
        }), (/** @type {?} */ ({})));
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
        var today = moment();
        /** @type {?} */
        var daysOfCalendar = this.utilsService.createArray(42)
            .reduce((/**
         * @param {?} array
         * @return {?}
         */
        function (array) {
            array.push({
                date: current.clone(),
                selected: !!selected.find((/**
                 * @param {?} selectedDay
                 * @return {?}
                 */
                function (selectedDay) { return current.isSame(selectedDay, 'day'); })),
                currentMonth: current.isSame(month, 'month'),
                prevMonth: current.isSame(prevMonth, 'month'),
                nextMonth: current.isSame(nextMonth, 'month'),
                currentDay: current.isSame(today, 'day'),
                disabled: _this.isDateDisabled(current, config)
            });
            current.add(1, 'day');
            return array;
        }), []);
        daysOfCalendar.forEach((/**
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        function (day, index) {
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
            su: moment().day(0),
            mo: moment().day(1),
            tu: moment().day(2),
            we: moment().day(3),
            th: moment().day(4),
            fr: moment().day(5),
            sa: moment().day(6)
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
        return daysArr.reduce((/**
         * @param {?} map
         * @param {?} day
         * @param {?} index
         * @return {?}
         */
        function (map, day, index) {
            map[index] = day;
            return map;
        }), (/** @type {?} */ ({})));
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
        { type: Injectable }
    ];
    /** @nocollapse */
    DayCalendarService.ctorParameters = function () { return [
        { type: UtilsService }
    ]; };
    return DayCalendarService;
}());
export { DayCalendarService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DayCalendarService.prototype.DAYS;
    /** @type {?} */
    DayCalendarService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    DayCalendarService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LWNhbGVuZGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJkYXktY2FsZW5kYXIvZGF5LWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBR25DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQzs7SUFLOUQsTUFBTSxHQUFHLFFBQVE7QUFFdkI7SUFpQkUsNEJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBZjdCLFNBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFELG1CQUFjLEdBQXVCO1lBQzVDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsTUFBTSxFQUFFLFlBQVk7WUFDcEIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixXQUFXLEVBQUUsV0FBVztZQUN4QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUM7SUFHRixDQUFDOzs7Ozs7O0lBRU8saURBQW9COzs7Ozs7SUFBNUIsVUFBNkIsWUFBb0IsRUFBRSxVQUFvQjtRQUNyRSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLENB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QVBILFlBQVk7O0lBeU1wQix5QkFBQztDQUFBLEFBbE1ELElBa01DO1NBak1ZLGtCQUFrQjs7Ozs7O0lBQzdCLGtDQUFtRTs7SUFDbkUsNENBWUU7Ozs7O0lBRVUsMENBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7V2Vla0RheXN9IGZyb20gJy4uL2NvbW1vbi90eXBlcy93ZWVrLWRheXMudHlwZSc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF5fSBmcm9tICcuL2RheS5tb2RlbCc7XG5pbXBvcnQge0lEYXlDYWxlbmRhckNvbmZpZywgSURheUNhbGVuZGFyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4vZGF5LWNhbGVuZGFyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge0lNb250aENhbGVuZGFyQ29uZmlnfSBmcm9tICcuLi9tb250aC1jYWxlbmRhci9tb250aC1jYWxlbmRhci1jb25maWcnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERheUNhbGVuZGFyU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgREFZUyA9IFsnc3UnLCAnbW8nLCAndHUnLCAnd2UnLCAndGgnLCAnZnInLCAnc2EnXTtcbiAgcmVhZG9ubHkgREVGQVVMVF9DT05GSUc6IElEYXlDYWxlbmRhckNvbmZpZyA9IHtcbiAgICBzaG93TmVhck1vbnRoRGF5czogdHJ1ZSxcbiAgICBzaG93V2Vla051bWJlcnM6IGZhbHNlLFxuICAgIGZpcnN0RGF5T2ZXZWVrOiAnc3UnLFxuICAgIHdlZWtEYXlGb3JtYXQ6ICdkZGQnLFxuICAgIGZvcm1hdDogJ0RELU1NLVlZWVknLFxuICAgIGFsbG93TXVsdGlTZWxlY3Q6IGZhbHNlLFxuICAgIG1vbnRoRm9ybWF0OiAnTU1NLCBZWVlZJyxcbiAgICBlbmFibGVNb250aFNlbGVjdG9yOiB0cnVlLFxuICAgIGxvY2FsZTogbW9tZW50LmxvY2FsZSgpLFxuICAgIGRheUJ0bkZvcm1hdDogJ0REJyxcbiAgICB1blNlbGVjdE9uQ2xpY2s6IHRydWVcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU5lYXJNb250aFdlZWtzKGN1cnJlbnRNb250aDogTW9tZW50LCBtb250aEFycmF5OiBJRGF5W11bXSk6IElEYXlbXVtdIHtcbiAgICBpZiAobW9udGhBcnJheVttb250aEFycmF5Lmxlbmd0aCAtIDFdLmZpbmQoKGRheSkgPT4gZGF5LmRhdGUuaXNTYW1lKGN1cnJlbnRNb250aCwgJ21vbnRoJykpKSB7XG4gICAgICByZXR1cm4gbW9udGhBcnJheTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1vbnRoQXJyYXkuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIGdldENvbmZpZyhjb25maWc6IElEYXlDYWxlbmRhckNvbmZpZyk6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsIHtcbiAgICBjb25zdCBfY29uZmlnID0gPElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsPntcbiAgICAgIC4uLnRoaXMuREVGQVVMVF9DT05GSUcsXG4gICAgICAuLi50aGlzLnV0aWxzU2VydmljZS5jbGVhclVuZGVmaW5lZChjb25maWcpXG4gICAgfTtcblxuICAgIHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRQcm9wc1RvTW9tZW50KF9jb25maWcsIF9jb25maWcuZm9ybWF0LCBbJ21pbicsICdtYXgnXSk7XG5cbiAgICBtb21lbnQubG9jYWxlKF9jb25maWcubG9jYWxlKTtcblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG5cbiAgZ2VuZXJhdGVEYXlzTWFwKGZpcnN0RGF5T2ZXZWVrOiBXZWVrRGF5cykge1xuICAgIGNvbnN0IGZpcnN0RGF5SW5kZXggPSB0aGlzLkRBWVMuaW5kZXhPZihmaXJzdERheU9mV2Vlayk7XG4gICAgY29uc3QgZGF5c0FyciA9IHRoaXMuREFZUy5zbGljZShmaXJzdERheUluZGV4LCA3KS5jb25jYXQodGhpcy5EQVlTLnNsaWNlKDAsIGZpcnN0RGF5SW5kZXgpKTtcbiAgICByZXR1cm4gZGF5c0Fyci5yZWR1Y2UoKG1hcCwgZGF5LCBpbmRleCkgPT4ge1xuICAgICAgbWFwW2RheV0gPSBpbmRleDtcblxuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9LCA8e1trZXk6IHN0cmluZ106IG51bWJlcn0+e30pO1xuICB9XG5cbiAgZ2VuZXJhdGVNb250aEFycmF5KGNvbmZpZzogSURheUNhbGVuZGFyQ29uZmlnSW50ZXJuYWwsIG1vbnRoOiBNb21lbnQsIHNlbGVjdGVkOiBNb21lbnRbXSk6IElEYXlbXVtdIHtcbiAgICBsZXQgbW9udGhBcnJheTogSURheVtdW10gPSBbXTtcbiAgICBjb25zdCBmaXJzdERheU9mV2Vla0luZGV4ID0gdGhpcy5EQVlTLmluZGV4T2YoY29uZmlnLmZpcnN0RGF5T2ZXZWVrKTtcbiAgICBjb25zdCBmaXJzdERheU9mQm9hcmQgPSBtb250aC5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJyk7XG5cbiAgICB3aGlsZSAoZmlyc3REYXlPZkJvYXJkLmRheSgpICE9PSBmaXJzdERheU9mV2Vla0luZGV4KSB7XG4gICAgICBmaXJzdERheU9mQm9hcmQuc3VidHJhY3QoMSwgJ2RheScpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnQgPSBmaXJzdERheU9mQm9hcmQuY2xvbmUoKTtcbiAgICBjb25zdCBwcmV2TW9udGggPSBtb250aC5jbG9uZSgpLnN1YnRyYWN0KDEsICdtb250aCcpO1xuICAgIGNvbnN0IG5leHRNb250aCA9IG1vbnRoLmNsb25lKCkuYWRkKDEsICdtb250aCcpO1xuICAgIGNvbnN0IHRvZGF5ID0gbW9tZW50KCk7XG5cbiAgICBjb25zdCBkYXlzT2ZDYWxlbmRhcjogSURheVtdID0gdGhpcy51dGlsc1NlcnZpY2UuY3JlYXRlQXJyYXkoNDIpXG4gICAgICAucmVkdWNlKChhcnJheTogSURheVtdKSA9PiB7XG4gICAgICAgIGFycmF5LnB1c2goe1xuICAgICAgICAgIGRhdGU6IGN1cnJlbnQuY2xvbmUoKSxcbiAgICAgICAgICBzZWxlY3RlZDogISFzZWxlY3RlZC5maW5kKHNlbGVjdGVkRGF5ID0+IGN1cnJlbnQuaXNTYW1lKHNlbGVjdGVkRGF5LCAnZGF5JykpLFxuICAgICAgICAgIGN1cnJlbnRNb250aDogY3VycmVudC5pc1NhbWUobW9udGgsICdtb250aCcpLFxuICAgICAgICAgIHByZXZNb250aDogY3VycmVudC5pc1NhbWUocHJldk1vbnRoLCAnbW9udGgnKSxcbiAgICAgICAgICBuZXh0TW9udGg6IGN1cnJlbnQuaXNTYW1lKG5leHRNb250aCwgJ21vbnRoJyksXG4gICAgICAgICAgY3VycmVudERheTogY3VycmVudC5pc1NhbWUodG9kYXksICdkYXknKSxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc0RhdGVEaXNhYmxlZChjdXJyZW50LCBjb25maWcpXG4gICAgICAgIH0pO1xuICAgICAgICBjdXJyZW50LmFkZCgxLCAnZGF5Jyk7XG5cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgfSwgW10pO1xuXG4gICAgZGF5c09mQ2FsZW5kYXIuZm9yRWFjaCgoZGF5LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgd2Vla0luZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIDcpO1xuXG4gICAgICBpZiAoIW1vbnRoQXJyYXlbd2Vla0luZGV4XSkge1xuICAgICAgICBtb250aEFycmF5LnB1c2goW10pO1xuICAgICAgfVxuXG4gICAgICBtb250aEFycmF5W3dlZWtJbmRleF0ucHVzaChkYXkpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFjb25maWcuc2hvd05lYXJNb250aERheXMpIHtcbiAgICAgIG1vbnRoQXJyYXkgPSB0aGlzLnJlbW92ZU5lYXJNb250aFdlZWtzKG1vbnRoLCBtb250aEFycmF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9udGhBcnJheTtcbiAgfVxuXG4gIGdlbmVyYXRlV2Vla2RheXMoZmlyc3REYXlPZldlZWs6IFdlZWtEYXlzKTogTW9tZW50W10ge1xuICAgIGNvbnN0IHdlZWtkYXlOYW1lczoge1trZXk6IHN0cmluZ106IE1vbWVudH0gPSB7XG4gICAgICBzdTogbW9tZW50KCkuZGF5KDApLFxuICAgICAgbW86IG1vbWVudCgpLmRheSgxKSxcbiAgICAgIHR1OiBtb21lbnQoKS5kYXkoMiksXG4gICAgICB3ZTogbW9tZW50KCkuZGF5KDMpLFxuICAgICAgdGg6IG1vbWVudCgpLmRheSg0KSxcbiAgICAgIGZyOiBtb21lbnQoKS5kYXkoNSksXG4gICAgICBzYTogbW9tZW50KCkuZGF5KDYpXG4gICAgfTtcbiAgICBjb25zdCB3ZWVrZGF5czogTW9tZW50W10gPSBbXTtcbiAgICBjb25zdCBkYXlzTWFwID0gdGhpcy5nZW5lcmF0ZURheXNNYXAoZmlyc3REYXlPZldlZWspO1xuXG4gICAgZm9yIChjb25zdCBkYXlLZXkgaW4gZGF5c01hcCkge1xuICAgICAgaWYgKGRheXNNYXAuaGFzT3duUHJvcGVydHkoZGF5S2V5KSkge1xuICAgICAgICB3ZWVrZGF5c1tkYXlzTWFwW2RheUtleV1dID0gd2Vla2RheU5hbWVzW2RheUtleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtkYXlzO1xuICB9XG5cbiAgaXNEYXRlRGlzYWJsZWQoZGF0ZTogTW9tZW50LCBjb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbmZpZy5pc0RheURpc2FibGVkQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjb25maWcuaXNEYXlEaXNhYmxlZENhbGxiYWNrKGRhdGUpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcubWluICYmIGRhdGUuaXNCZWZvcmUoY29uZmlnLm1pbiwgJ2RheScpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEoY29uZmlnLm1heCAmJiBkYXRlLmlzQWZ0ZXIoY29uZmlnLm1heCwgJ2RheScpKTtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0c1xuICBnZXRIZWFkZXJMYWJlbChjb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsLCBtb250aDogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAoY29uZmlnLm1vbnRoRm9ybWF0dGVyKSB7XG4gICAgICByZXR1cm4gY29uZmlnLm1vbnRoRm9ybWF0dGVyKG1vbnRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9udGguZm9ybWF0KGNvbmZpZy5tb250aEZvcm1hdCk7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdHNcbiAgc2hvdWxkU2hvd0xlZnQobWluOiBNb21lbnQsIGN1cnJlbnRNb250aFZpZXc6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtaW4gPyBtaW4uaXNCZWZvcmUoY3VycmVudE1vbnRoVmlldywgJ21vbnRoJykgOiB0cnVlO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RzXG4gIHNob3VsZFNob3dSaWdodChtYXg6IE1vbWVudCwgY3VycmVudE1vbnRoVmlldzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1heCA/IG1heC5pc0FmdGVyKGN1cnJlbnRNb250aFZpZXcsICdtb250aCcpIDogdHJ1ZTtcbiAgfVxuXG4gIGdlbmVyYXRlRGF5c0luZGV4TWFwKGZpcnN0RGF5T2ZXZWVrOiBXZWVrRGF5cykge1xuICAgIGNvbnN0IGZpcnN0RGF5SW5kZXggPSB0aGlzLkRBWVMuaW5kZXhPZihmaXJzdERheU9mV2Vlayk7XG4gICAgY29uc3QgZGF5c0FyciA9IHRoaXMuREFZUy5zbGljZShmaXJzdERheUluZGV4LCA3KS5jb25jYXQodGhpcy5EQVlTLnNsaWNlKDAsIGZpcnN0RGF5SW5kZXgpKTtcbiAgICByZXR1cm4gZGF5c0Fyci5yZWR1Y2UoKG1hcCwgZGF5LCBpbmRleCkgPT4ge1xuICAgICAgbWFwW2luZGV4XSA9IGRheTtcblxuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9LCA8e1trZXk6IG51bWJlcl06IHN0cmluZ30+e30pO1xuICB9XG5cbiAgZ2V0TW9udGhDYWxlbmRhckNvbmZpZyhjb21wb25lbnRDb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsKTogSU1vbnRoQ2FsZW5kYXJDb25maWcge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jbGVhclVuZGVmaW5lZCh7XG4gICAgICBtaW46IGNvbXBvbmVudENvbmZpZy5taW4sXG4gICAgICBtYXg6IGNvbXBvbmVudENvbmZpZy5tYXgsXG4gICAgICBmb3JtYXQ6IGNvbXBvbmVudENvbmZpZy5mb3JtYXQsXG4gICAgICBpc05hdkhlYWRlckJ0bkNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgIGFsbG93TXVsdGlTZWxlY3Q6IGZhbHNlLFxuICAgICAgeWVhckZvcm1hdDogY29tcG9uZW50Q29uZmlnLnllYXJGb3JtYXQsXG4gICAgICB5ZWFyRm9ybWF0dGVyOiBjb21wb25lbnRDb25maWcueWVhckZvcm1hdHRlcixcbiAgICAgIG1vbnRoQnRuRm9ybWF0OiBjb21wb25lbnRDb25maWcubW9udGhCdG5Gb3JtYXQsXG4gICAgICBtb250aEJ0bkZvcm1hdHRlcjogY29tcG9uZW50Q29uZmlnLm1vbnRoQnRuRm9ybWF0dGVyLFxuICAgICAgbW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrOiBjb21wb25lbnRDb25maWcubW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrLFxuICAgICAgbXVsdGlwbGVZZWFyc05hdmlnYXRlQnk6IGNvbXBvbmVudENvbmZpZy5tdWx0aXBsZVllYXJzTmF2aWdhdGVCeSxcbiAgICAgIHNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbjogY29tcG9uZW50Q29uZmlnLnNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbixcbiAgICAgIHNob3dHb1RvQ3VycmVudDogY29tcG9uZW50Q29uZmlnLnNob3dHb1RvQ3VycmVudFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGF5QnRuVGV4dChjb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsLCBkYXk6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgaWYgKGNvbmZpZy5kYXlCdG5Gb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcuZGF5QnRuRm9ybWF0dGVyKGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheS5mb3JtYXQoY29uZmlnLmRheUJ0bkZvcm1hdCk7XG4gIH1cblxuICBnZXREYXlCdG5Dc3NDbGFzcyhjb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsLCBkYXk6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgaWYgKGNvbmZpZy5kYXlCdG5Dc3NDbGFzc0NhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gY29uZmlnLmRheUJ0bkNzc0NsYXNzQ2FsbGJhY2soZGF5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbiJdfQ==