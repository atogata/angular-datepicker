/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
const moment = momentNs;
export class YearCalendarService {
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
                const year = {
                    date,
                    selected: !!selected.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => index.isSame(s, 'year'))),
                    currentYear: index.isSame(moment(), 'year'),
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
if (false) {
    /** @type {?} */
    YearCalendarService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    YearCalendarService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1jYWxlbmRhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsieWVhci1jYWxlbmRhci95ZWFyLWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFbkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDOztNQUc5RCxNQUFNLEdBQUcsUUFBUTtBQUd2QixNQUFNLE9BQU8sbUJBQW1COzs7O0lBYTlCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWnJDLG1CQUFjLEdBQWdDO1lBQ3JELGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsVUFBVSxFQUFFLE1BQU07WUFDbEIsTUFBTSxFQUFFLE1BQU07WUFDZCx1QkFBdUIsRUFBRSxLQUFLO1lBQzlCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLHVCQUF1QixFQUFFLEVBQUU7WUFDM0IsMkJBQTJCLEVBQUUsS0FBSztZQUNsQyxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO0lBR0YsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBMkI7O2NBQzdCLE9BQU8sR0FBRyxxQ0FDWCxJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FDNUM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFaEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQUVELFlBQVksQ0FBQyxNQUEyQixFQUFFLElBQVksRUFBRSxXQUFxQixJQUFJOztjQUN6RSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHOzs7WUFBQyxHQUFHLEVBQUU7O3NCQUN6QyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRTs7c0JBQ3BCLElBQUksR0FBRztvQkFDWCxJQUFJO29CQUNKLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBQztvQkFDdkQsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDO29CQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO29CQUMzQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO2lCQUN4QztnQkFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFckIsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQVksRUFBRSxNQUEyQjtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25ELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLEdBQVcsRUFBRSxlQUF1QjtRQUNqRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RCxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsR0FBVyxFQUFFLGVBQXVCO1FBQ2xELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxNQUEyQixFQUFFLElBQVk7UUFDdEQsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQ3hCLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLE1BQTJCLEVBQUUsSUFBWTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsTUFBMkIsRUFBRSxJQUFZO1FBQzFELElBQUksTUFBTSxDQUFDLHVCQUF1QixFQUFFO1lBQ2xDLE9BQU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7WUF6RkYsVUFBVTs7OztZQUxILFlBQVk7Ozs7SUFPbEIsNkNBVUU7Ozs7O0lBRVUsMkNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0lZZWFyfSBmcm9tICcuL3llYXIubW9kZWwnO1xuaW1wb3J0IHtJWWVhckNhbGVuZGFyQ29uZmlnLCBJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4veWVhci1jYWxlbmRhci1jb25maWcnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBZZWFyQ2FsZW5kYXJTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgREVGQVVMVF9DT05GSUc6IElZZWFyQ2FsZW5kYXJDb25maWdJbnRlcm5hbCA9IHtcbiAgICBhbGxvd011bHRpU2VsZWN0OiBmYWxzZSxcbiAgICB5ZWFyRm9ybWF0OiAnWVlZWScsXG4gICAgZm9ybWF0OiAnWVlZWScsXG4gICAgaXNOYXZIZWFkZXJCdG5DbGlja2FibGU6IGZhbHNlLFxuICAgIHllYXJCdG5Gb3JtYXQ6ICdZWVlZJyxcbiAgICBsb2NhbGU6IG1vbWVudC5sb2NhbGUoKSxcbiAgICBtdWx0aXBsZVllYXJzTmF2aWdhdGVCeTogMTAsXG4gICAgc2hvd011bHRpcGxlWWVhcnNOYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICB1blNlbGVjdE9uQ2xpY2s6IHRydWVcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XG4gIH1cblxuICBnZXRDb25maWcoY29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnKTogSVllYXJDYWxlbmRhckNvbmZpZ0ludGVybmFsIHtcbiAgICBjb25zdCBfY29uZmlnID0gPElZZWFyQ2FsZW5kYXJDb25maWdJbnRlcm5hbD57XG4gICAgICAuLi50aGlzLkRFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy51dGlsc1NlcnZpY2UuY2xlYXJVbmRlZmluZWQoY29uZmlnKVxuICAgIH07XG5cbiAgICB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0UHJvcHNUb01vbWVudChfY29uZmlnLCBfY29uZmlnLmZvcm1hdCwgWydtaW4nLCAnbWF4J10pO1xuXG4gICAgbW9tZW50LmxvY2FsZShfY29uZmlnLmxvY2FsZSk7XG5cbiAgICByZXR1cm4gX2NvbmZpZztcbiAgfVxuXG4gIGdlbmVyYXRlWWVhcihjb25maWc6IElZZWFyQ2FsZW5kYXJDb25maWcsIHllYXI6IE1vbWVudCwgc2VsZWN0ZWQ6IE1vbWVudFtdID0gbnVsbCk6IElZZWFyW11bXSB7XG4gICAgY29uc3QgaW5kZXggPSB5ZWFyLmNsb25lKCkuc3RhcnRPZigneWVhcicpO1xuXG4gICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZUFycmF5KDMpLm1hcCgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY3JlYXRlQXJyYXkoNCkubWFwKCgpID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGluZGV4LmNsb25lKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSB7XG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZDogISFzZWxlY3RlZC5maW5kKHMgPT4gaW5kZXguaXNTYW1lKHMsICd5ZWFyJykpLFxuICAgICAgICAgIGN1cnJlbnRZZWFyOiBpbmRleC5pc1NhbWUobW9tZW50KCksICd5ZWFyJyksXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuaXNZZWFyRGlzYWJsZWQoZGF0ZSwgY29uZmlnKSxcbiAgICAgICAgICB0ZXh0OiB0aGlzLmdldFllYXJCdG5UZXh0KGNvbmZpZywgZGF0ZSlcbiAgICAgICAgfTtcblxuICAgICAgICBpbmRleC5hZGQoMSwgJ3llYXInKTtcblxuICAgICAgICByZXR1cm4geWVhcjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaXNZZWFyRGlzYWJsZWQoZGF0ZTogTW9tZW50LCBjb25maWc6IElZZWFyQ2FsZW5kYXJDb25maWcpIHtcbiAgICBpZiAoY29uZmlnLm1pbiAmJiBkYXRlLmlzQmVmb3JlKGNvbmZpZy5taW4sICd5ZWFyJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShjb25maWcubWF4ICYmIGRhdGUuaXNBZnRlcihjb25maWcubWF4LCAneWVhcicpKTtcbiAgfVxuXG4gIHNob3VsZFNob3dMZWZ0KG1pbjogTW9tZW50LCBjdXJyZW50WWVhclZpZXc6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtaW4gPyBtaW4uaXNCZWZvcmUoY3VycmVudFllYXJWaWV3LCAneWVhcicpIDogdHJ1ZTtcbiAgfVxuXG4gIHNob3VsZFNob3dSaWdodChtYXg6IE1vbWVudCwgY3VycmVudFllYXJWaWV3OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWF4ID8gbWF4LmlzQWZ0ZXIoY3VycmVudFllYXJWaWV3LCAneWVhcicpIDogdHJ1ZTtcbiAgfVxuXG4gIGdldEhlYWRlckxhYmVsKGNvbmZpZzogSVllYXJDYWxlbmRhckNvbmZpZywgeWVhcjogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAoY29uZmlnLnllYXJGb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcueWVhckZvcm1hdHRlcih5ZWFyKTtcbiAgICB9XG5cbiAgICByZXR1cm4geWVhci5mb3JtYXQoY29uZmlnLnllYXJGb3JtYXQpO1xuICB9XG5cbiAgZ2V0WWVhckJ0blRleHQoY29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnLCB5ZWFyOiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmIChjb25maWcueWVhckJ0bkZvcm1hdHRlcikge1xuICAgICAgcmV0dXJuIGNvbmZpZy55ZWFyQnRuRm9ybWF0dGVyKHllYXIpO1xuICAgIH1cblxuICAgIHJldHVybiB5ZWFyLmZvcm1hdChjb25maWcueWVhckJ0bkZvcm1hdCk7XG4gIH1cblxuICBnZXRZZWFyQnRuQ3NzQ2xhc3MoY29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnLCB5ZWFyOiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmIChjb25maWcueWVhckJ0bkNzc0NsYXNzQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjb25maWcueWVhckJ0bkNzc0NsYXNzQ2FsbGJhY2soeWVhcik7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=