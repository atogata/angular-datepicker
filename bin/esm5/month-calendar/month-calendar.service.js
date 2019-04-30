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
var MonthCalendarService = /** @class */ (function () {
    function MonthCalendarService(utilsService) {
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
    MonthCalendarService.prototype.getConfig = /**
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
        if (selected === void 0) { selected = null; }
        /** @type {?} */
        var index = year.clone().startOf('year');
        return this.utilsService.createArray(3).map((/**
         * @return {?}
         */
        function () {
            return _this.utilsService.createArray(4).map((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var date = index.clone();
                /** @type {?} */
                var month = {
                    date: date,
                    selected: !!selected.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return index.isSame(s, 'month'); })),
                    currentMonth: index.isSame(moment(), 'month'),
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
        { type: Injectable }
    ];
    /** @nocollapse */
    MonthCalendarService.ctorParameters = function () { return [
        { type: UtilsService }
    ]; };
    return MonthCalendarService;
}());
export { MonthCalendarService };
if (false) {
    /** @type {?} */
    MonthCalendarService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    MonthCalendarService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbIm1vbnRoLWNhbGVuZGFyL21vbnRoLWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRW5DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQzs7SUFHOUQsTUFBTSxHQUFHLFFBQVE7QUFFdkI7SUFjRSw4QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFackMsbUJBQWMsR0FBaUM7WUFDdEQsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsTUFBTTtZQUNsQixNQUFNLEVBQUUsU0FBUztZQUNqQix1QkFBdUIsRUFBRSxLQUFLO1lBQzlCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLHVCQUF1QixFQUFFLEVBQUU7WUFDM0IsMkJBQTJCLEVBQUUsS0FBSztZQUNsQyxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO0lBR0YsQ0FBQzs7Ozs7SUFFRCx3Q0FBUzs7OztJQUFULFVBQVUsTUFBNEI7O1lBQzlCLE9BQU8sR0FBRyx3Q0FDWCxJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FDNUM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFaEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUIsT0FBTyxP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Qzs7Ozs7O0lBRUQsa0RBQW1COzs7OztJQUFuQixVQUFvQixNQUE0QixFQUFFLEtBQWE7UUFDN0QsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUU7WUFDbkMsT0FBTyxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0M7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O2dCQXpGRixVQUFVOzs7O2dCQUxILFlBQVk7O0lBK0ZwQiwyQkFBQztDQUFBLEFBMUZELElBMEZDO1NBekZZLG9CQUFvQjs7O0lBQy9CLDhDQVVFOzs7OztJQUVVLDRDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJTW9udGh9IGZyb20gJy4vbW9udGgubW9kZWwnO1xuaW1wb3J0IHtJTW9udGhDYWxlbmRhckNvbmZpZywgSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci1jb25maWcnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb250aENhbGVuZGFyU2VydmljZSB7XG4gIHJlYWRvbmx5IERFRkFVTFRfQ09ORklHOiBJTW9udGhDYWxlbmRhckNvbmZpZ0ludGVybmFsID0ge1xuICAgIGFsbG93TXVsdGlTZWxlY3Q6IGZhbHNlLFxuICAgIHllYXJGb3JtYXQ6ICdZWVlZJyxcbiAgICBmb3JtYXQ6ICdNTS1ZWVlZJyxcbiAgICBpc05hdkhlYWRlckJ0bkNsaWNrYWJsZTogZmFsc2UsXG4gICAgbW9udGhCdG5Gb3JtYXQ6ICdNTU0nLFxuICAgIGxvY2FsZTogbW9tZW50LmxvY2FsZSgpLFxuICAgIG11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5OiAxMCxcbiAgICBzaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb246IGZhbHNlLFxuICAgIHVuU2VsZWN0T25DbGljazogdHJ1ZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UpIHtcbiAgfVxuXG4gIGdldENvbmZpZyhjb25maWc6IElNb250aENhbGVuZGFyQ29uZmlnKTogSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbCB7XG4gICAgY29uc3QgX2NvbmZpZyA9IDxJTW9udGhDYWxlbmRhckNvbmZpZ0ludGVybmFsPntcbiAgICAgIC4uLnRoaXMuREVGQVVMVF9DT05GSUcsXG4gICAgICAuLi50aGlzLnV0aWxzU2VydmljZS5jbGVhclVuZGVmaW5lZChjb25maWcpXG4gICAgfTtcblxuICAgIHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRQcm9wc1RvTW9tZW50KF9jb25maWcsIF9jb25maWcuZm9ybWF0LCBbJ21pbicsICdtYXgnXSk7XG5cbiAgICBtb21lbnQubG9jYWxlKF9jb25maWcubG9jYWxlKTtcblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG5cbiAgZ2VuZXJhdGVZZWFyKGNvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWcsIHllYXI6IE1vbWVudCwgc2VsZWN0ZWQ6IE1vbWVudFtdID0gbnVsbCk6IElNb250aFtdW10ge1xuICAgIGNvbnN0IGluZGV4ID0geWVhci5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKTtcblxuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVBcnJheSgzKS5tYXAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZUFycmF5KDQpLm1hcCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBpbmRleC5jbG9uZSgpO1xuICAgICAgICBjb25zdCBtb250aCA9IHtcbiAgICAgICAgICBkYXRlLFxuICAgICAgICAgIHNlbGVjdGVkOiAhIXNlbGVjdGVkLmZpbmQocyA9PiBpbmRleC5pc1NhbWUocywgJ21vbnRoJykpLFxuICAgICAgICAgIGN1cnJlbnRNb250aDogaW5kZXguaXNTYW1lKG1vbWVudCgpLCAnbW9udGgnKSxcbiAgICAgICAgICBkaXNhYmxlZDogdGhpcy5pc01vbnRoRGlzYWJsZWQoZGF0ZSwgY29uZmlnKSxcbiAgICAgICAgICB0ZXh0OiB0aGlzLmdldE1vbnRoQnRuVGV4dChjb25maWcsIGRhdGUpXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5kZXguYWRkKDEsICdtb250aCcpO1xuXG4gICAgICAgIHJldHVybiBtb250aDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaXNNb250aERpc2FibGVkKGRhdGU6IE1vbWVudCwgY29uZmlnOiBJTW9udGhDYWxlbmRhckNvbmZpZykge1xuICAgIGlmIChjb25maWcubWluICYmIGRhdGUuaXNCZWZvcmUoY29uZmlnLm1pbiwgJ21vbnRoJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShjb25maWcubWF4ICYmIGRhdGUuaXNBZnRlcihjb25maWcubWF4LCAnbW9udGgnKSk7XG4gIH1cblxuICBzaG91bGRTaG93TGVmdChtaW46IE1vbWVudCwgY3VycmVudE1vbnRoVmlldzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1pbiA/IG1pbi5pc0JlZm9yZShjdXJyZW50TW9udGhWaWV3LCAneWVhcicpIDogdHJ1ZTtcbiAgfVxuXG4gIHNob3VsZFNob3dSaWdodChtYXg6IE1vbWVudCwgY3VycmVudE1vbnRoVmlldzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1heCA/IG1heC5pc0FmdGVyKGN1cnJlbnRNb250aFZpZXcsICd5ZWFyJykgOiB0cnVlO1xuICB9XG5cbiAgZ2V0SGVhZGVyTGFiZWwoY29uZmlnOiBJTW9udGhDYWxlbmRhckNvbmZpZywgeWVhcjogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAoY29uZmlnLnllYXJGb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcueWVhckZvcm1hdHRlcih5ZWFyKTtcbiAgICB9XG5cbiAgICByZXR1cm4geWVhci5mb3JtYXQoY29uZmlnLnllYXJGb3JtYXQpO1xuICB9XG5cbiAgZ2V0TW9udGhCdG5UZXh0KGNvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWcsIG1vbnRoOiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmIChjb25maWcubW9udGhCdG5Gb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcubW9udGhCdG5Gb3JtYXR0ZXIobW9udGgpO1xuICAgIH1cblxuICAgIHJldHVybiBtb250aC5mb3JtYXQoY29uZmlnLm1vbnRoQnRuRm9ybWF0KTtcbiAgfVxuXG4gIGdldE1vbnRoQnRuQ3NzQ2xhc3MoY29uZmlnOiBJTW9udGhDYWxlbmRhckNvbmZpZywgbW9udGg6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgaWYgKGNvbmZpZy5tb250aEJ0bkNzc0NsYXNzQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjb25maWcubW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrKG1vbnRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbiJdfQ==