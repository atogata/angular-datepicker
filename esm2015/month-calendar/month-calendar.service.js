/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
const moment = momentNs;
export class MonthCalendarService {
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
            locale: moment.locale(),
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
        moment.locale(_config.locale);
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
                    currentMonth: index.isSame(moment(), 'month'),
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
if (false) {
    /** @type {?} */
    MonthCalendarService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    MonthCalendarService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbIm1vbnRoLWNhbGVuZGFyL21vbnRoLWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFbkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDOztNQUc5RCxNQUFNLEdBQUcsUUFBUTtBQUd2QixNQUFNLE9BQU8sb0JBQW9COzs7O0lBYS9CLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWnJDLG1CQUFjLEdBQWlDO1lBQ3RELGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLE1BQU07WUFDbEIsTUFBTSxFQUFFLFNBQVM7WUFDakIsdUJBQXVCLEVBQUUsS0FBSztZQUM5QixjQUFjLEVBQUUsS0FBSztZQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2Qix1QkFBdUIsRUFBRSxFQUFFO1lBQzNCLDJCQUEyQixFQUFFLEtBQUs7WUFDbEMsZUFBZSxFQUFFLElBQUk7U0FDdEIsQ0FBQztJQUdGLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQTRCOztjQUM5QixPQUFPLEdBQUcscUNBQ1gsSUFBSSxDQUFDLGNBQWMsRUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQzVDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWhGLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FB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LE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7O1lBekZGLFVBQVU7Ozs7WUFMSCxZQUFZOzs7O0lBT2xCLDhDQVVFOzs7OztJQUVVLDRDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJTW9udGh9IGZyb20gJy4vbW9udGgubW9kZWwnO1xuaW1wb3J0IHtJTW9udGhDYWxlbmRhckNvbmZpZywgSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci1jb25maWcnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb250aENhbGVuZGFyU2VydmljZSB7XG4gIHJlYWRvbmx5IERFRkFVTFRfQ09ORklHOiBJTW9udGhDYWxlbmRhckNvbmZpZ0ludGVybmFsID0ge1xuICAgIGFsbG93TXVsdGlTZWxlY3Q6IGZhbHNlLFxuICAgIHllYXJGb3JtYXQ6ICdZWVlZJyxcbiAgICBmb3JtYXQ6ICdNTS1ZWVlZJyxcbiAgICBpc05hdkhlYWRlckJ0bkNsaWNrYWJsZTogZmFsc2UsXG4gICAgbW9udGhCdG5Gb3JtYXQ6ICdNTU0nLFxuICAgIGxvY2FsZTogbW9tZW50LmxvY2FsZSgpLFxuICAgIG11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5OiAxMCxcbiAgICBzaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb246IGZhbHNlLFxuICAgIHVuU2VsZWN0T25DbGljazogdHJ1ZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UpIHtcbiAgfVxuXG4gIGdldENvbmZpZyhjb25maWc6IElNb250aENhbGVuZGFyQ29uZmlnKTogSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbCB7XG4gICAgY29uc3QgX2NvbmZpZyA9IDxJTW9udGhDYWxlbmRhckNvbmZpZ0ludGVybmFsPntcbiAgICAgIC4uLnRoaXMuREVGQVVMVF9DT05GSUcsXG4gICAgICAuLi50aGlzLnV0aWxzU2VydmljZS5jbGVhclVuZGVmaW5lZChjb25maWcpXG4gICAgfTtcblxuICAgIHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRQcm9wc1RvTW9tZW50KF9jb25maWcsIF9jb25maWcuZm9ybWF0LCBbJ21pbicsICdtYXgnXSk7XG5cbiAgICBtb21lbnQubG9jYWxlKF9jb25maWcubG9jYWxlKTtcblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG5cbiAgZ2VuZXJhdGVZZWFyKGNvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWcsIHllYXI6IE1vbWVudCwgc2VsZWN0ZWQ6IE1vbWVudFtdID0gbnVsbCk6IElNb250aFtdW10ge1xuICAgIGNvbnN0IGluZGV4ID0geWVhci5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKTtcblxuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVBcnJheSgzKS5tYXAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZUFycmF5KDQpLm1hcCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBpbmRleC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBtb250aCA9IHtcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHNlbGVjdGVkOiAhIXNlbGVjdGVkLmZpbmQocyA9PiBpbmRleC5pc1NhbWUocywgJ21vbnRoJykpLFxuICAgICAgICAgIGN1cnJlbnRNb250aDogaW5kZXguaXNTYW1lKG1vbWVudCgpLCAnbW9udGgnKSxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc01vbnRoRGlzYWJsZWQoZGF0ZSwgY29uZmlnKSxcbiAgICAgICAgICB0ZXh0OiB0aGlzLmdldE1vbnRoQnRuVGV4dChjb25maWcsIGRhdGUpXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5kZXguYWRkKDEsICdtb250aCcpO1xuXG4gICAgICAgIHJldHVybiBtb250aDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaXNNb250aERpc2FibGVkKGRhdGU6IE1vbWVudCwgY29uZmlnOiBJTW9udGhDYWxlbmRhckNvbmZpZykge1xuICAgIGlmIChjb25maWcubWluICYmIGRhdGUuaXNCZWZvcmUoY29uZmlnLm1pbiwgJ21vbnRoJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShjb25maWcubWF4ICYmIGRhdGUuaXNBZnRlcihjb25maWcubWF4LCAnbW9udGgnKSk7XG4gIH1cblxuICBzaG91bGRTaG93TGVmdChtaW46IE1vbWVudCwgY3VycmVudE1vbnRoVmlldzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1pbiA/IG1pbi5pc0JlZm9yZShjdXJyZW50TW9udGhWaWV3LCAneWVhcicpIDogdHJ1ZTtcbiAgfVxuXG4gIHNob3VsZFNob3dSaWdodChtYXg6IE1vbWVudCwgY3VycmVudE1vbnRoVmlldzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1heCA/IG1heC5pc0FmdGVyKGN1cnJlbnRNb250aFZpZXcsICd5ZWFyJykgOiB0cnVlO1xuICB9XG5cbiAgZ2V0SGVhZGVyTGFiZWwoY29uZmlnOiBJTW9udGhDYWxlbmRhckNvbmZpZywgeWVhcjogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAoY29uZmlnLnllYXJGb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcueWVhckZvcm1hdHRlcih5ZWFyKTtcbiAgICB9XG5cbiAgICByZXR1cm4geWVhci5mb3JtYXQoY29uZmlnLnllYXJGb3JtYXQpO1xuICB9XG5cbiAgZ2V0TW9udGhCdG5UZXh0KGNvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWcsIG1vbnRoOiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmIChjb25maWcubW9udGhCdG5Gb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcubW9udGhCdG5Gb3JtYXR0ZXIobW9udGgpO1xuICAgIH1cblxuICAgIHJldHVybiBtb250aC5mb3JtYXQoY29uZmlnLm1vbnRoQnRuRm9ybWF0KTtcbiAgfVxuXG4gIGdldE1vbnRoQnRuQ3NzQ2xhc3MoY29uZmlnOiBJTW9udGhDYWxlbmRhckNvbmZpZywgbW9udGg6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgaWYgKGNvbmZpZy5tb250aEJ0bkNzc0NsYXNzQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjb25maWcubW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrKG1vbnRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbiJdfQ==