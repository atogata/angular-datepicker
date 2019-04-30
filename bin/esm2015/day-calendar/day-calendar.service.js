/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
const moment = momentNs;
export class DayCalendarService {
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
        moment.locale(_config.locale);
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
        const today = moment();
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
            su: moment().day(0),
            mo: moment().day(1),
            tu: moment().day(2),
            we: moment().day(3),
            th: moment().day(4),
            fr: moment().day(5),
            sa: moment().day(6)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LWNhbGVuZGFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJkYXktY2FsZW5kYXIvZGF5LWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDOztNQUs5RCxNQUFNLEdBQUcsUUFBUTtBQUd2QixNQUFNLE9BQU8sa0JBQWtCOzs7O0lBZ0I3QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWY3QixTQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxtQkFBYyxHQUF1QjtZQUM1QyxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2QixZQUFZLEVBQUUsSUFBSTtZQUNsQixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO0lBR0YsQ0FBQzs7Ozs7OztJQUVPLG9CQUFvQixDQUFDLFlBQW9CLEVBQUUsVUFBb0I7UUFDckUsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcs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RyxFQUFFLGVBQWUsQ0FBQyxHQUFHO1lBQ3hCLE1BQU0sRUFBRSxlQUFlLENBQUMsTUFBTTtZQUM5Qix1QkFBdUIsRUFBRSxJQUFJO1lBQzdCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLGVBQWUsQ0FBQyxVQUFVO1lBQ3RDLGFBQWEsRUFBRSxlQUFlLENBQUMsYUFBYTtZQUM1QyxjQUFjLEVBQUUsZUFBZSxDQUFDLGNBQWM7WUFDOUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLGlCQUFpQjtZQUNwRCx3QkFBd0IsRUFBRSxlQUFlLENBQUMsd0JBQXdCO1lBQ2xFLHVCQUF1QixFQUFFLGVBQWUsQ0FBQyx1QkFBdUI7WUFDaEUsMkJBQTJCLEVBQUUsZUFBZSxDQUFDLDJCQUEyQjtZQUN4RSxlQUFlLEVBQUUsZUFBZSxDQUFDLGVBQWU7U0FDakQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUFDLE1BQWtDLEVBQUUsR0FBVztRQUMzRCxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDMUIsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFrQyxFQUFFLEdBQVc7UUFDL0QsSUFBSSxNQUFNLENBQUMsc0JBQXNCLEVBQUU7WUFDakMsT0FBTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0M7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7OztZQWpNRixVQUFVOzs7O1lBUEgsWUFBWTs7Ozs7OztJQVNsQixrQ0FBbUU7O0lBQ25FLDRDQVlFOzs7OztJQUVVLDBDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1dlZWtEYXlzfSBmcm9tICcuLi9jb21tb24vdHlwZXMvd2Vlay1kYXlzLnR5cGUnO1xuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7SURheX0gZnJvbSAnLi9kYXkubW9kZWwnO1xuaW1wb3J0IHtJRGF5Q2FsZW5kYXJDb25maWcsIElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsfSBmcm9tICcuL2RheS1jYWxlbmRhci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtJTW9udGhDYWxlbmRhckNvbmZpZ30gZnJvbSAnLi4vbW9udGgtY2FsZW5kYXIvbW9udGgtY2FsZW5kYXItY29uZmlnJztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXlDYWxlbmRhclNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IERBWVMgPSBbJ3N1JywgJ21vJywgJ3R1JywgJ3dlJywgJ3RoJywgJ2ZyJywgJ3NhJ107XG4gIHJlYWRvbmx5IERFRkFVTFRfQ09ORklHOiBJRGF5Q2FsZW5kYXJDb25maWcgPSB7XG4gICAgc2hvd05lYXJNb250aERheXM6IHRydWUsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBmYWxzZSxcbiAgICBmaXJzdERheU9mV2VlazogJ3N1JyxcbiAgICB3ZWVrRGF5Rm9ybWF0OiAnZGRkJyxcbiAgICBmb3JtYXQ6ICdERC1NTS1ZWVlZJyxcbiAgICBhbGxvd011bHRpU2VsZWN0OiBmYWxzZSxcbiAgICBtb250aEZvcm1hdDogJ01NTSwgWVlZWScsXG4gICAgZW5hYmxlTW9udGhTZWxlY3RvcjogdHJ1ZSxcbiAgICBsb2NhbGU6IG1vbWVudC5sb2NhbGUoKSxcbiAgICBkYXlCdG5Gb3JtYXQ6ICdERCcsXG4gICAgdW5TZWxlY3RPbkNsaWNrOiB0cnVlXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSkge1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVOZWFyTW9udGhXZWVrcyhjdXJyZW50TW9udGg6IE1vbWVudCwgbW9udGhBcnJheTogSURheVtdW10pOiBJRGF5W11bXSB7XG4gICAgaWYgKG1vbnRoQXJyYXlbbW9udGhBcnJheS5sZW5ndGggLSAxXS5maW5kKChkYXkpID0+IGRheS5kYXRlLmlzU2FtZShjdXJyZW50TW9udGgsICdtb250aCcpKSkge1xuICAgICAgcmV0dXJuIG1vbnRoQXJyYXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb250aEFycmF5LnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gIH1cblxuICBnZXRDb25maWcoY29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWcpOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCB7XG4gICAgY29uc3QgX2NvbmZpZyA9IDxJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbD57XG4gICAgICAuLi50aGlzLkRFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy51dGlsc1NlcnZpY2UuY2xlYXJVbmRlZmluZWQoY29uZmlnKVxuICAgIH07XG5cbiAgICB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0UHJvcHNUb01vbWVudChfY29uZmlnLCBfY29uZmlnLmZvcm1hdCwgWydtaW4nLCAnbWF4J10pO1xuXG4gICAgbW9tZW50LmxvY2FsZShfY29uZmlnLmxvY2FsZSk7XG5cbiAgICByZXR1cm4gX2NvbmZpZztcbiAgfVxuXG4gIGdlbmVyYXRlRGF5c01hcChmaXJzdERheU9mV2VlazogV2Vla0RheXMpIHtcbiAgICBjb25zdCBmaXJzdERheUluZGV4ID0gdGhpcy5EQVlTLmluZGV4T2YoZmlyc3REYXlPZldlZWspO1xuICAgIGNvbnN0IGRheXNBcnIgPSB0aGlzLkRBWVMuc2xpY2UoZmlyc3REYXlJbmRleCwgNykuY29uY2F0KHRoaXMuREFZUy5zbGljZSgwLCBmaXJzdERheUluZGV4KSk7XG4gICAgcmV0dXJuIGRheXNBcnIucmVkdWNlKChtYXAsIGRheSwgaW5kZXgpID0+IHtcbiAgICAgIG1hcFtkYXldID0gaW5kZXg7XG5cbiAgICAgIHJldHVybiBtYXA7XG4gICAgfSwgPHtba2V5OiBzdHJpbmddOiBudW1iZXJ9Pnt9KTtcbiAgfVxuXG4gIGdlbmVyYXRlTW9udGhBcnJheShjb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsLCBtb250aDogTW9tZW50LCBzZWxlY3RlZDogTW9tZW50W10pOiBJRGF5W11bXSB7XG4gICAgbGV0IG1vbnRoQXJyYXk6IElEYXlbXVtdID0gW107XG4gICAgY29uc3QgZmlyc3REYXlPZldlZWtJbmRleCA9IHRoaXMuREFZUy5pbmRleE9mKGNvbmZpZy5maXJzdERheU9mV2Vlayk7XG4gICAgY29uc3QgZmlyc3REYXlPZkJvYXJkID0gbW9udGguY2xvbmUoKS5zdGFydE9mKCdtb250aCcpO1xuXG4gICAgd2hpbGUgKGZpcnN0RGF5T2ZCb2FyZC5kYXkoKSAhPT0gZmlyc3REYXlPZldlZWtJbmRleCkge1xuICAgICAgZmlyc3REYXlPZkJvYXJkLnN1YnRyYWN0KDEsICdkYXknKTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50ID0gZmlyc3REYXlPZkJvYXJkLmNsb25lKCk7XG4gICAgY29uc3QgcHJldk1vbnRoID0gbW9udGguY2xvbmUoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKTtcbiAgICBjb25zdCBuZXh0TW9udGggPSBtb250aC5jbG9uZSgpLmFkZCgxLCAnbW9udGgnKTtcbiAgICBjb25zdCB0b2RheSA9IG1vbWVudCgpO1xuXG4gICAgY29uc3QgZGF5c09mQ2FsZW5kYXI6IElEYXlbXSA9IHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZUFycmF5KDQyKVxuICAgICAgLnJlZHVjZSgoYXJyYXk6IElEYXlbXSkgPT4ge1xuICAgICAgICBhcnJheS5wdXNoKHtcbiAgICAgICAgICBkYXRlOiBjdXJyZW50LmNsb25lKCksXG4gICAgICAgICAgc2VsZWN0ZWQ6ICEhc2VsZWN0ZWQuZmluZChzZWxlY3RlZERheSA9PiBjdXJyZW50LmlzU2FtZShzZWxlY3RlZERheSwgJ2RheScpKSxcbiAgICAgICAgICBjdXJyZW50TW9udGg6IGN1cnJlbnQuaXNTYW1lKG1vbnRoLCAnbW9udGgnKSxcbiAgICAgICAgICBwcmV2TW9udGg6IGN1cnJlbnQuaXNTYW1lKHByZXZNb250aCwgJ21vbnRoJyksXG4gICAgICAgICAgbmV4dE1vbnRoOiBjdXJyZW50LmlzU2FtZShuZXh0TW9udGgsICdtb250aCcpLFxuICAgICAgICAgIGN1cnJlbnREYXk6IGN1cnJlbnQuaXNTYW1lKHRvZGF5LCAnZGF5JyksXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNEYXRlRGlzYWJsZWQoY3VycmVudCwgY29uZmlnKVxuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudC5hZGQoMSwgJ2RheScpO1xuXG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgIH0sIFtdKTtcblxuICAgIGRheXNPZkNhbGVuZGFyLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHdlZWtJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyA3KTtcblxuICAgICAgaWYgKCFtb250aEFycmF5W3dlZWtJbmRleF0pIHtcbiAgICAgICAgbW9udGhBcnJheS5wdXNoKFtdKTtcbiAgICAgIH1cblxuICAgICAgbW9udGhBcnJheVt3ZWVrSW5kZXhdLnB1c2goZGF5KTtcbiAgICB9KTtcblxuICAgIGlmICghY29uZmlnLnNob3dOZWFyTW9udGhEYXlzKSB7XG4gICAgICBtb250aEFycmF5ID0gdGhpcy5yZW1vdmVOZWFyTW9udGhXZWVrcyhtb250aCwgbW9udGhBcnJheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbnRoQXJyYXk7XG4gIH1cblxuICBnZW5lcmF0ZVdlZWtkYXlzKGZpcnN0RGF5T2ZXZWVrOiBXZWVrRGF5cyk6IE1vbWVudFtdIHtcbiAgICBjb25zdCB3ZWVrZGF5TmFtZXM6IHtba2V5OiBzdHJpbmddOiBNb21lbnR9ID0ge1xuICAgICAgc3U6IG1vbWVudCgpLmRheSgwKSxcbiAgICAgIG1vOiBtb21lbnQoKS5kYXkoMSksXG4gICAgICB0dTogbW9tZW50KCkuZGF5KDIpLFxuICAgICAgd2U6IG1vbWVudCgpLmRheSgzKSxcbiAgICAgIHRoOiBtb21lbnQoKS5kYXkoNCksXG4gICAgICBmcjogbW9tZW50KCkuZGF5KDUpLFxuICAgICAgc2E6IG1vbWVudCgpLmRheSg2KVxuICAgIH07XG4gICAgY29uc3Qgd2Vla2RheXM6IE1vbWVudFtdID0gW107XG4gICAgY29uc3QgZGF5c01hcCA9IHRoaXMuZ2VuZXJhdGVEYXlzTWFwKGZpcnN0RGF5T2ZXZWVrKTtcblxuICAgIGZvciAoY29uc3QgZGF5S2V5IGluIGRheXNNYXApIHtcbiAgICAgIGlmIChkYXlzTWFwLmhhc093blByb3BlcnR5KGRheUtleSkpIHtcbiAgICAgICAgd2Vla2RheXNbZGF5c01hcFtkYXlLZXldXSA9IHdlZWtkYXlOYW1lc1tkYXlLZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3ZWVrZGF5cztcbiAgfVxuXG4gIGlzRGF0ZURpc2FibGVkKGRhdGU6IE1vbWVudCwgY29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCk6IGJvb2xlYW4ge1xuICAgIGlmIChjb25maWcuaXNEYXlEaXNhYmxlZENhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gY29uZmlnLmlzRGF5RGlzYWJsZWRDYWxsYmFjayhkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLm1pbiAmJiBkYXRlLmlzQmVmb3JlKGNvbmZpZy5taW4sICdkYXknKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKGNvbmZpZy5tYXggJiYgZGF0ZS5pc0FmdGVyKGNvbmZpZy5tYXgsICdkYXknKSk7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdHNcbiAgZ2V0SGVhZGVyTGFiZWwoY29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCwgbW9udGg6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgaWYgKGNvbmZpZy5tb250aEZvcm1hdHRlcikge1xuICAgICAgcmV0dXJuIGNvbmZpZy5tb250aEZvcm1hdHRlcihtb250aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbnRoLmZvcm1hdChjb25maWcubW9udGhGb3JtYXQpO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RzXG4gIHNob3VsZFNob3dMZWZ0KG1pbjogTW9tZW50LCBjdXJyZW50TW9udGhWaWV3OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWluID8gbWluLmlzQmVmb3JlKGN1cnJlbnRNb250aFZpZXcsICdtb250aCcpIDogdHJ1ZTtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0c1xuICBzaG91bGRTaG93UmlnaHQobWF4OiBNb21lbnQsIGN1cnJlbnRNb250aFZpZXc6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYXggPyBtYXguaXNBZnRlcihjdXJyZW50TW9udGhWaWV3LCAnbW9udGgnKSA6IHRydWU7XG4gIH1cblxuICBnZW5lcmF0ZURheXNJbmRleE1hcChmaXJzdERheU9mV2VlazogV2Vla0RheXMpIHtcbiAgICBjb25zdCBmaXJzdERheUluZGV4ID0gdGhpcy5EQVlTLmluZGV4T2YoZmlyc3REYXlPZldlZWspO1xuICAgIGNvbnN0IGRheXNBcnIgPSB0aGlzLkRBWVMuc2xpY2UoZmlyc3REYXlJbmRleCwgNykuY29uY2F0KHRoaXMuREFZUy5zbGljZSgwLCBmaXJzdERheUluZGV4KSk7XG4gICAgcmV0dXJuIGRheXNBcnIucmVkdWNlKChtYXAsIGRheSwgaW5kZXgpID0+IHtcbiAgICAgIG1hcFtpbmRleF0gPSBkYXk7XG5cbiAgICAgIHJldHVybiBtYXA7XG4gICAgfSwgPHtba2V5OiBudW1iZXJdOiBzdHJpbmd9Pnt9KTtcbiAgfVxuXG4gIGdldE1vbnRoQ2FsZW5kYXJDb25maWcoY29tcG9uZW50Q29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCk6IElNb250aENhbGVuZGFyQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY2xlYXJVbmRlZmluZWQoe1xuICAgICAgbWluOiBjb21wb25lbnRDb25maWcubWluLFxuICAgICAgbWF4OiBjb21wb25lbnRDb25maWcubWF4LFxuICAgICAgZm9ybWF0OiBjb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgaXNOYXZIZWFkZXJCdG5DbGlja2FibGU6IHRydWUsXG4gICAgICBhbGxvd011bHRpU2VsZWN0OiBmYWxzZSxcbiAgICAgIHllYXJGb3JtYXQ6IGNvbXBvbmVudENvbmZpZy55ZWFyRm9ybWF0LFxuICAgICAgeWVhckZvcm1hdHRlcjogY29tcG9uZW50Q29uZmlnLnllYXJGb3JtYXR0ZXIsXG4gICAgICBtb250aEJ0bkZvcm1hdDogY29tcG9uZW50Q29uZmlnLm1vbnRoQnRuRm9ybWF0LFxuICAgICAgbW9udGhCdG5Gb3JtYXR0ZXI6IGNvbXBvbmVudENvbmZpZy5tb250aEJ0bkZvcm1hdHRlcixcbiAgICAgIG1vbnRoQnRuQ3NzQ2xhc3NDYWxsYmFjazogY29tcG9uZW50Q29uZmlnLm1vbnRoQnRuQ3NzQ2xhc3NDYWxsYmFjayxcbiAgICAgIG11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5OiBjb21wb25lbnRDb25maWcubXVsdGlwbGVZZWFyc05hdmlnYXRlQnksXG4gICAgICBzaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb246IGNvbXBvbmVudENvbmZpZy5zaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb24sXG4gICAgICBzaG93R29Ub0N1cnJlbnQ6IGNvbXBvbmVudENvbmZpZy5zaG93R29Ub0N1cnJlbnRcbiAgICB9KTtcbiAgfVxuXG4gIGdldERheUJ0blRleHQoY29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCwgZGF5OiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmIChjb25maWcuZGF5QnRuRm9ybWF0dGVyKSB7XG4gICAgICByZXR1cm4gY29uZmlnLmRheUJ0bkZvcm1hdHRlcihkYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXkuZm9ybWF0KGNvbmZpZy5kYXlCdG5Gb3JtYXQpO1xuICB9XG5cbiAgZ2V0RGF5QnRuQ3NzQ2xhc3MoY29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCwgZGF5OiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmIChjb25maWcuZGF5QnRuQ3NzQ2xhc3NDYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNvbmZpZy5kYXlCdG5Dc3NDbGFzc0NhbGxiYWNrKGRheSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=