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
var YearCalendarService = /** @class */ (function () {
    function YearCalendarService(utilsService) {
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
    YearCalendarService.prototype.getConfig = /**
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
    YearCalendarService.prototype.generateYear = /**
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
                var year = {
                    date: date,
                    selected: !!selected.find((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return index.isSame(s, 'year'); })),
                    currentYear: index.isSame(moment(), 'year'),
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
        { type: Injectable }
    ];
    /** @nocollapse */
    YearCalendarService.ctorParameters = function () { return [
        { type: UtilsService }
    ]; };
    return YearCalendarService;
}());
export { YearCalendarService };
if (false) {
    /** @type {?} */
    YearCalendarService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    YearCalendarService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1jYWxlbmRhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsieWVhci1jYWxlbmRhci95ZWFyLWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRW5DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQzs7SUFHOUQsTUFBTSxHQUFHLFFBQVE7QUFFdkI7SUFjRSw2QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFackMsbUJBQWMsR0FBZ0M7WUFDckQsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixVQUFVLEVBQUUsTUFBTTtZQUNsQixNQUFNLEVBQUUsTUFBTTtZQUNkLHVCQUF1QixFQUFFLEtBQUs7WUFDOUIsYUFBYSxFQUFFLE1BQU07WUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsdUJBQXVCLEVBQUUsRUFBRTtZQUMzQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUM7SUFHRixDQUFDOzs7OztJQUVELHVDQUFTOzs7O0lBQVQsVUFBVSxNQUEyQjs7WUFDN0IsT0FBTyxHQUFHLHdDQUNYLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUM1QztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVoRixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7O0lBRUQsMENBQVk7Ozs7OztJQUFaLFVBQWEsTUFBMkIsRUFBRSxJQUFZLEVBQUUsUUFBeUI7UUFBakYsaUJBbUJDO1FBbkJ1RCx5QkFBQSxFQUFBLGVBQXlCOztZQUN6RSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHOzs7UUFBQztZQUMxQyxPQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7OztZQUFDOztvQkFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7O29CQUNwQixJQUFJLEdBQUc7b0JBQ1gsSUFBSSxNQUFBO29CQUNKLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUk7Ozs7b0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBdkIsQ0FBdUIsRUFBQztvQkFDdkQsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDO29CQUMzQyxRQUFRLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO29CQUMzQyxJQUFJLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO2lCQUN4QztnQkFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFckIsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsNENBQWM7Ozs7O0lBQWQsVUFBZSxJQUFZLEVBQUUsTUFBMkI7UUFDdEQsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7OztJQUVELDRDQUFjOzs7OztJQUFkLFVBQWUsR0FBVyxFQUFFLGVBQXVCO1FBQ2pELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVELENBQUM7Ozs7OztJQUVELDZDQUFlOzs7OztJQUFmLFVBQWdCLEdBQVcsRUFBRSxlQUF1QjtRQUNsRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFRCw0Q0FBYzs7Ozs7SUFBZCxVQUFlLE1BQTJCLEVBQUUsSUFBWTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDeEIsT0FBTyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFFRCw0Q0FBYzs7Ozs7SUFBZCxVQUFlLE1BQTJCLEVBQUUsSUFBWTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRUQsZ0RBQWtCOzs7OztJQUFsQixVQUFtQixNQUEyQixFQUFFLElBQVk7UUFDMUQsSUFBSSxNQUFNLENBQUMsdUJBQXVCLEVBQUU7WUFDbEMsT0FBTyxNQUFNLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7O2dCQXpGRixVQUFVOzs7O2dCQUxILFlBQVk7O0lBK0ZwQiwwQkFBQztDQUFBLEFBMUZELElBMEZDO1NBekZZLG1CQUFtQjs7O0lBQzlCLDZDQVVFOzs7OztJQUVVLDJDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJWWVhcn0gZnJvbSAnLi95ZWFyLm1vZGVsJztcbmltcG9ydCB7SVllYXJDYWxlbmRhckNvbmZpZywgSVllYXJDYWxlbmRhckNvbmZpZ0ludGVybmFsfSBmcm9tICcuL3llYXItY2FsZW5kYXItY29uZmlnJztcbmNvbnN0IG1vbWVudCA9IG1vbWVudE5zO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgWWVhckNhbGVuZGFyU2VydmljZSB7XG4gIHJlYWRvbmx5IERFRkFVTFRfQ09ORklHOiBJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWwgPSB7XG4gICAgYWxsb3dNdWx0aVNlbGVjdDogZmFsc2UsXG4gICAgeWVhckZvcm1hdDogJ1lZWVknLFxuICAgIGZvcm1hdDogJ1lZWVknLFxuICAgIGlzTmF2SGVhZGVyQnRuQ2xpY2thYmxlOiBmYWxzZSxcbiAgICB5ZWFyQnRuRm9ybWF0OiAnWVlZWScsXG4gICAgbG9jYWxlOiBtb21lbnQubG9jYWxlKCksXG4gICAgbXVsdGlwbGVZZWFyc05hdmlnYXRlQnk6IDEwLFxuICAgIHNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbjogZmFsc2UsXG4gICAgdW5TZWxlY3RPbkNsaWNrOiB0cnVlXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSkge1xuICB9XG5cbiAgZ2V0Q29uZmlnKGNvbmZpZzogSVllYXJDYWxlbmRhckNvbmZpZyk6IElZZWFyQ2FsZW5kYXJDb25maWdJbnRlcm5hbCB7XG4gICAgY29uc3QgX2NvbmZpZyA9IDxJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWw+e1xuICAgICAgLi4udGhpcy5ERUZBVUxUX0NPTkZJRyxcbiAgICAgIC4uLnRoaXMudXRpbHNTZXJ2aWNlLmNsZWFyVW5kZWZpbmVkKGNvbmZpZylcbiAgICB9O1xuXG4gICAgdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFByb3BzVG9Nb21lbnQoX2NvbmZpZywgX2NvbmZpZy5mb3JtYXQsIFsnbWluJywgJ21heCddKTtcblxuICAgIG1vbWVudC5sb2NhbGUoX2NvbmZpZy5sb2NhbGUpO1xuXG4gICAgcmV0dXJuIF9jb25maWc7XG4gIH1cblxuICBnZW5lcmF0ZVllYXIoY29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnLCB5ZWFyOiBNb21lbnQsIHNlbGVjdGVkOiBNb21lbnRbXSA9IG51bGwpOiBJWWVhcltdW10ge1xuICAgIGNvbnN0IGluZGV4ID0geWVhci5jbG9uZSgpLnN0YXJ0T2YoJ3llYXInKTtcblxuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVBcnJheSgzKS5tYXAoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZUFycmF5KDQpLm1hcCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBpbmRleC5jbG9uZSgpO1xuICAgICAgICBjb25zdCB5ZWFyID0ge1xuICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgc2VsZWN0ZWQ6ICEhc2VsZWN0ZWQuZmluZChzID0+IGluZGV4LmlzU2FtZShzLCAneWVhcicpKSxcbiAgICAgICAgICBjdXJyZW50WWVhcjogaW5kZXguaXNTYW1lKG1vbWVudCgpLCAneWVhcicpLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmlzWWVhckRpc2FibGVkKGRhdGUsIGNvbmZpZyksXG4gICAgICAgICAgdGV4dDogdGhpcy5nZXRZZWFyQnRuVGV4dChjb25maWcsIGRhdGUpXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5kZXguYWRkKDEsICd5ZWFyJyk7XG5cbiAgICAgICAgcmV0dXJuIHllYXI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzWWVhckRpc2FibGVkKGRhdGU6IE1vbWVudCwgY29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZy5taW4gJiYgZGF0ZS5pc0JlZm9yZShjb25maWcubWluLCAneWVhcicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEoY29uZmlnLm1heCAmJiBkYXRlLmlzQWZ0ZXIoY29uZmlnLm1heCwgJ3llYXInKSk7XG4gIH1cblxuICBzaG91bGRTaG93TGVmdChtaW46IE1vbWVudCwgY3VycmVudFllYXJWaWV3OiBNb21lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWluID8gbWluLmlzQmVmb3JlKGN1cnJlbnRZZWFyVmlldywgJ3llYXInKSA6IHRydWU7XG4gIH1cblxuICBzaG91bGRTaG93UmlnaHQobWF4OiBNb21lbnQsIGN1cnJlbnRZZWFyVmlldzogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1heCA/IG1heC5pc0FmdGVyKGN1cnJlbnRZZWFyVmlldywgJ3llYXInKSA6IHRydWU7XG4gIH1cblxuICBnZXRIZWFkZXJMYWJlbChjb25maWc6IElZZWFyQ2FsZW5kYXJDb25maWcsIHllYXI6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgaWYgKGNvbmZpZy55ZWFyRm9ybWF0dGVyKSB7XG4gICAgICByZXR1cm4gY29uZmlnLnllYXJGb3JtYXR0ZXIoeWVhcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHllYXIuZm9ybWF0KGNvbmZpZy55ZWFyRm9ybWF0KTtcbiAgfVxuXG4gIGdldFllYXJCdG5UZXh0KGNvbmZpZzogSVllYXJDYWxlbmRhckNvbmZpZywgeWVhcjogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAoY29uZmlnLnllYXJCdG5Gb3JtYXR0ZXIpIHtcbiAgICAgIHJldHVybiBjb25maWcueWVhckJ0bkZvcm1hdHRlcih5ZWFyKTtcbiAgICB9XG5cbiAgICByZXR1cm4geWVhci5mb3JtYXQoY29uZmlnLnllYXJCdG5Gb3JtYXQpO1xuICB9XG5cbiAgZ2V0WWVhckJ0bkNzc0NsYXNzKGNvbmZpZzogSVllYXJDYWxlbmRhckNvbmZpZywgeWVhcjogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAoY29uZmlnLnllYXJCdG5Dc3NDbGFzc0NhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gY29uZmlnLnllYXJCdG5Dc3NDbGFzc0NhbGxiYWNrKHllYXIpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxufVxuIl19