/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { TimeSelectService } from '../time-select/time-select.service';
import { DayTimeCalendarService } from '../day-time-calendar/day-time-calendar.service';
/** @type {?} */
var moment = momentNs;
var DatePickerService = /** @class */ (function () {
    function DatePickerService(utilsService, timeSelectService, daytimeCalendarService) {
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
            locale: moment.locale(),
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
        if (mode === void 0) { mode = 'daytime'; }
        /** @type {?} */
        var _config = (/** @type {?} */ (tslib_1.__assign({}, this.defaultConfig, { format: this.getDefaultFormatByMode(mode) }, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        moment.locale(_config.locale);
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
        return datesStrArr.every((/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return _this.utilsService.isDateValid(date, config.format); }));
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
        { type: Injectable }
    ];
    /** @nocollapse */
    DatePickerService.ctorParameters = function () { return [
        { type: UtilsService },
        { type: TimeSelectService },
        { type: DayTimeCalendarService }
    ]; };
    return DatePickerService;
}());
export { DatePickerService };
if (false) {
    /** @type {?} */
    DatePickerService.prototype.onPickerClosed;
    /**
     * @type {?}
     * @private
     */
    DatePickerService.prototype.defaultConfig;
    /**
     * @type {?}
     * @private
     */
    DatePickerService.prototype.utilsService;
    /**
     * @type {?}
     * @private
     */
    DatePickerService.prototype.timeSelectService;
    /**
     * @type {?}
     * @private
     */
    DatePickerService.prototype.daytimeCalendarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyL2RhdGUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEtBQUssUUFBUSxNQUFNLFFBQVEsQ0FBQztBQUVuQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFFcEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7O0lBSWhGLE1BQU0sR0FBRyxRQUFRO0FBRXZCO0lBbUJFLDJCQUFvQixZQUEwQixFQUMxQixpQkFBb0MsRUFDcEMsc0JBQThDO1FBRjlDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQW5CekQsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCxrQkFBYSxHQUE4QjtZQUNqRCxhQUFhLEVBQUUsSUFBSTtZQUNuQixrQkFBa0IsRUFBRSxHQUFHO1lBQ3ZCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsZUFBZSxFQUFFLEtBQUs7WUFDdEIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixlQUFlLEVBQUUsS0FBSztZQUN0QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLGtCQUFrQixFQUFFLElBQUk7U0FDekIs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WSxpQkFBaUI7OztJQUM1QiwyQ0FBaUU7Ozs7O0lBQ2pFLDBDQWNFOzs7OztJQUVVLHlDQUFrQzs7Ozs7SUFDbEMsOENBQTRDOzs7OztJQUM1QyxtREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lEYXRlUGlja2VyQ29uZmlnLCBJRGF0ZVBpY2tlckNvbmZpZ0ludGVybmFsfSBmcm9tICcuL2RhdGUtcGlja2VyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF5Q2FsZW5kYXJDb25maWd9IGZyb20gJy4uL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7VGltZVNlbGVjdFNlcnZpY2V9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHtEYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuLi9kYXktdGltZS1jYWxlbmRhci9kYXktdGltZS1jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7SVRpbWVTZWxlY3RDb25maWd9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge0NhbGVuZGFyTW9kZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLW1vZGUnO1xuaW1wb3J0IHtDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyU2VydmljZSB7XG4gIHJlYWRvbmx5IG9uUGlja2VyQ2xvc2VkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogSURhdGVQaWNrZXJDb25maWdJbnRlcm5hbCA9IHtcbiAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIGNsb3NlT25TZWxlY3REZWxheTogMTAwLFxuICAgIGZvcm1hdDogJ0RELU1NLVlZWVknLFxuICAgIG9wZW5PbkZvY3VzOiB0cnVlLFxuICAgIG9wZW5PbkNsaWNrOiB0cnVlLFxuICAgIG9uT3BlbkRlbGF5OiAwLFxuICAgIGRpc2FibGVLZXlwcmVzczogZmFsc2UsXG4gICAgc2hvd05lYXJNb250aERheXM6IHRydWUsXG4gICAgc2hvd1dlZWtOdW1iZXJzOiBmYWxzZSxcbiAgICBlbmFibGVNb250aFNlbGVjdG9yOiB0cnVlLFxuICAgIHNob3dHb1RvQ3VycmVudDogdHJ1ZSxcbiAgICBsb2NhbGU6IG1vbWVudC5sb2NhbGUoKSxcbiAgICBoaWRlT25PdXRzaWRlQ2xpY2s6IHRydWVcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRpbWVTZWxlY3RTZXJ2aWNlOiBUaW1lU2VsZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkYXl0aW1lQ2FsZW5kYXJTZXJ2aWNlOiBEYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlKSB7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdHNcbiAgZ2V0Q29uZmlnKGNvbmZpZzogSURhdGVQaWNrZXJDb25maWcsIG1vZGU6IENhbGVuZGFyTW9kZSA9ICdkYXl0aW1lJyk6IElEYXRlUGlja2VyQ29uZmlnSW50ZXJuYWwge1xuICAgIGNvbnN0IF9jb25maWcgPSA8SURhdGVQaWNrZXJDb25maWdJbnRlcm5hbD57XG4gICAgICAuLi50aGlzLmRlZmF1bHRDb25maWcsXG4gICAgICBmb3JtYXQ6IHRoaXMuZ2V0RGVmYXVsdEZvcm1hdEJ5TW9kZShtb2RlKSxcbiAgICAgIC4uLnRoaXMudXRpbHNTZXJ2aWNlLmNsZWFyVW5kZWZpbmVkKGNvbmZpZylcbiAgICB9O1xuXG4gICAgdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFByb3BzVG9Nb21lbnQoX2NvbmZpZywgX2NvbmZpZy5mb3JtYXQsIFsnbWluJywgJ21heCddKTtcblxuICAgIGlmIChjb25maWcgJiYgY29uZmlnLmFsbG93TXVsdGlTZWxlY3QgJiYgY29uZmlnLmNsb3NlT25TZWxlY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgX2NvbmZpZy5jbG9zZU9uU2VsZWN0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbW9tZW50LmxvY2FsZShfY29uZmlnLmxvY2FsZSk7XG5cbiAgICByZXR1cm4gX2NvbmZpZztcbiAgfVxuXG4gIGdldERheUNvbmZpZ1NlcnZpY2UocGlja2VyQ29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZyk6IElEYXlDYWxlbmRhckNvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1pbjogcGlja2VyQ29uZmlnLm1pbixcbiAgICAgIG1heDogcGlja2VyQ29uZmlnLm1heCxcbiAgICAgIGlzRGF5RGlzYWJsZWRDYWxsYmFjazogcGlja2VyQ29uZmlnLmlzRGF5RGlzYWJsZWRDYWxsYmFjayxcbiAgICAgIHdlZWtEYXlGb3JtYXQ6IHBpY2tlckNvbmZpZy53ZWVrRGF5Rm9ybWF0LFxuICAgICAgc2hvd05lYXJNb250aERheXM6IHBpY2tlckNvbmZpZy5zaG93TmVhck1vbnRoRGF5cyxcbiAgICAgIHNob3dXZWVrTnVtYmVyczogcGlja2VyQ29uZmlnLnNob3dXZWVrTnVtYmVycyxcbiAgICAgIGZpcnN0RGF5T2ZXZWVrOiBwaWNrZXJDb25maWcuZmlyc3REYXlPZldlZWssXG4gICAgICBmb3JtYXQ6IHBpY2tlckNvbmZpZy5mb3JtYXQsXG4gICAgICBhbGxvd011bHRpU2VsZWN0OiBwaWNrZXJDb25maWcuYWxsb3dNdWx0aVNlbGVjdCxcbiAgICAgIG1vbnRoRm9ybWF0OiBwaWNrZXJDb25maWcubW9udGhGb3JtYXQsXG4gICAgICBtb250aEZvcm1hdHRlcjogcGlja2VyQ29uZmlnLm1vbnRoRm9ybWF0dGVyLFxuICAgICAgZW5hYmxlTW9udGhTZWxlY3RvcjogcGlja2VyQ29uZmlnLmVuYWJsZU1vbnRoU2VsZWN0b3IsXG4gICAgICB5ZWFyRm9ybWF0OiBwaWNrZXJDb25maWcueWVhckZvcm1hdCxcbiAgICAgIHllYXJGb3JtYXR0ZXI6IHBpY2tlckNvbmZpZy55ZWFyRm9ybWF0dGVyLFxuICAgICAgZGF5QnRuRm9ybWF0OiBwaWNrZXJDb25maWcuZGF5QnRuRm9ybWF0LFxuICAgICAgZGF5QnRuRm9ybWF0dGVyOiBwaWNrZXJDb25maWcuZGF5QnRuRm9ybWF0dGVyLFxuICAgICAgZGF5QnRuQ3NzQ2xhc3NDYWxsYmFjazogcGlja2VyQ29uZmlnLmRheUJ0bkNzc0NsYXNzQ2FsbGJhY2ssXG4gICAgICBtb250aEJ0bkZvcm1hdDogcGlja2VyQ29uZmlnLm1vbnRoQnRuRm9ybWF0LFxuICAgICAgbW9udGhCdG5Gb3JtYXR0ZXI6IHBpY2tlckNvbmZpZy5tb250aEJ0bkZvcm1hdHRlcixcbiAgICAgIG1vbnRoQnRuQ3NzQ2xhc3NDYWxsYmFjazogcGlja2VyQ29uZmlnLm1vbnRoQnRuQ3NzQ2xhc3NDYWxsYmFjayxcbiAgICAgIG11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5OiBwaWNrZXJDb25maWcubXVsdGlwbGVZZWFyc05hdmlnYXRlQnksXG4gICAgICBzaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb246IHBpY2tlckNvbmZpZy5zaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb24sXG4gICAgICBsb2NhbGU6IHBpY2tlckNvbmZpZy5sb2NhbGUsXG4gICAgICByZXR1cm5lZFZhbHVlVHlwZTogcGlja2VyQ29uZmlnLnJldHVybmVkVmFsdWVUeXBlLFxuICAgICAgc2hvd0dvVG9DdXJyZW50OiBwaWNrZXJDb25maWcuc2hvd0dvVG9DdXJyZW50LFxuICAgICAgdW5TZWxlY3RPbkNsaWNrOiBwaWNrZXJDb25maWcudW5TZWxlY3RPbkNsaWNrXG4gICAgfTtcbiAgfVxuXG4gIGdldERheVRpbWVDb25maWdTZXJ2aWNlKHBpY2tlckNvbmZpZzogSURhdGVQaWNrZXJDb25maWcpOiBJVGltZVNlbGVjdENvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF5dGltZUNhbGVuZGFyU2VydmljZS5nZXRDb25maWcocGlja2VyQ29uZmlnKTtcbiAgfVxuXG4gIGdldFRpbWVDb25maWdTZXJ2aWNlKHBpY2tlckNvbmZpZzogSURhdGVQaWNrZXJDb25maWcpOiBJVGltZVNlbGVjdENvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMudGltZVNlbGVjdFNlcnZpY2UuZ2V0Q29uZmlnKHBpY2tlckNvbmZpZyk7XG4gIH1cblxuICBwaWNrZXJDbG9zZWQoKSB7XG4gICAgdGhpcy5vblBpY2tlckNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdHNcbiAgaXNWYWxpZElucHV0RGF0ZVZhbHVlKHZhbHVlOiBzdHJpbmcsIGNvbmZpZzogSURhdGVQaWNrZXJDb25maWcpOiBib29sZWFuIHtcbiAgICB2YWx1ZSA9IHZhbHVlID8gdmFsdWUgOiAnJztcbiAgICBjb25zdCBkYXRlc1N0ckFycjogc3RyaW5nW10gPSB0aGlzLnV0aWxzU2VydmljZS5kYXRlc1N0cmluZ1RvU3RyaW5nQXJyYXkodmFsdWUpO1xuXG4gICAgcmV0dXJuIGRhdGVzU3RyQXJyLmV2ZXJ5KGRhdGUgPT4gdGhpcy51dGlsc1NlcnZpY2UuaXNEYXRlVmFsaWQoZGF0ZSwgY29uZmlnLmZvcm1hdCkpO1xuICB9XG5cbiAgLy8gdG9kbzo6IGFkZCB1bml0IHRlc3RzXG4gIGNvbnZlcnRJbnB1dFZhbHVlVG9Nb21lbnRBcnJheSh2YWx1ZTogc3RyaW5nLCBjb25maWc6IElEYXRlUGlja2VyQ29uZmlnKTogTW9tZW50W10ge1xuICAgIHZhbHVlID0gdmFsdWUgPyB2YWx1ZSA6ICcnO1xuICAgIGNvbnN0IGRhdGVzU3RyQXJyOiBzdHJpbmdbXSA9IHRoaXMudXRpbHNTZXJ2aWNlLmRhdGVzU3RyaW5nVG9TdHJpbmdBcnJheSh2YWx1ZSk7XG5cbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFRvTW9tZW50QXJyYXkoZGF0ZXNTdHJBcnIsIGNvbmZpZy5mb3JtYXQsIGNvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdEZvcm1hdEJ5TW9kZShtb2RlOiBDYWxlbmRhck1vZGUpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgcmV0dXJuICdERC1NTS1ZWVlZJztcbiAgICAgIGNhc2UgJ2RheXRpbWUnOlxuICAgICAgICByZXR1cm4gJ0RELU1NLVlZWVkgSEg6bW06c3MnO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHJldHVybiAnSEg6bW06c3MnO1xuICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICByZXR1cm4gJ01NTSwgWVlZWSc7XG4gICAgfVxuICB9XG59XG4iXX0=