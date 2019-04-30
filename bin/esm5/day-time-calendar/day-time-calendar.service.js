/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { DayCalendarService } from '../day-calendar/day-calendar.service';
import { TimeSelectService } from '../time-select/time-select.service';
/** @type {?} */
var moment = momentNs;
/** @type {?} */
var DAY_FORMAT = 'YYYYMMDD';
/** @type {?} */
var TIME_FORMAT = 'HH:mm:ss';
/** @type {?} */
var COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
var DayTimeCalendarService = /** @class */ (function () {
    function DayTimeCalendarService(utilsService, dayCalendarService, timeSelectService) {
        this.utilsService = utilsService;
        this.dayCalendarService = dayCalendarService;
        this.timeSelectService = timeSelectService;
        this.DEFAULT_CONFIG = {
            locale: moment.locale()
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DayTimeCalendarService.prototype.getConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var _config = tslib_1.__assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
        moment.locale(config.locale);
        return _config;
    };
    /**
     * @param {?} current
     * @param {?} day
     * @param {?} config
     * @return {?}
     */
    DayTimeCalendarService.prototype.updateDay = /**
     * @param {?} current
     * @param {?} day
     * @param {?} config
     * @return {?}
     */
    function (current, day, config) {
        /** @type {?} */
        var time = current ? current : moment();
        /** @type {?} */
        var updated = moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
        if (config.min) {
            /** @type {?} */
            var min = (/** @type {?} */ (config.min));
            updated = min.isAfter(updated) ? min : updated;
        }
        if (config.max) {
            /** @type {?} */
            var max = (/** @type {?} */ (config.max));
            updated = max.isBefore(updated) ? max : updated;
        }
        return updated;
    };
    /**
     * @param {?} current
     * @param {?} time
     * @return {?}
     */
    DayTimeCalendarService.prototype.updateTime = /**
     * @param {?} current
     * @param {?} time
     * @return {?}
     */
    function (current, time) {
        /** @type {?} */
        var day = current ? current : moment();
        return moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
    };
    DayTimeCalendarService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DayTimeCalendarService.ctorParameters = function () { return [
        { type: UtilsService },
        { type: DayCalendarService },
        { type: TimeSelectService }
    ]; };
    return DayTimeCalendarService;
}());
export { DayTimeCalendarService };
if (false) {
    /** @type {?} */
    DayTimeCalendarService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    DayTimeCalendarService.prototype.utilsService;
    /**
     * @type {?}
     * @private
     */
    DayTimeCalendarService.prototype.dayCalendarService;
    /**
     * @type {?}
     * @private
     */
    DayTimeCalendarService.prototype.timeSelectService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXRpbWUtY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBR25DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQzs7SUFFL0QsTUFBTSxHQUFHLFFBQVE7O0lBRWpCLFVBQVUsR0FBRyxVQUFVOztJQUN2QixXQUFXLEdBQUcsVUFBVTs7SUFDeEIsZUFBZSxHQUFHLFVBQVUsR0FBRyxXQUFXO0FBRWhEO0lBTUUsZ0NBQW9CLFlBQTBCLEVBQzFCLGtCQUFzQyxFQUN0QyxpQkFBb0M7UUFGcEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTi9DLG1CQUFjLEdBQTJCO1lBQ2hELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1NBQ3hCLENBQUM7SUFLRixDQUFDOzs7OztJQUVELDBDQUFTOzs7O0lBQVQsVUFBVSxNQUE4Qjs7WUFDaEMsT0FBTyx3QkFDUixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUM3QztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFFRCwwQ0FBUzs7Ozs7O0lBQVQsVUFBVSxPQUFlLEVBQUUsR0FBVyxFQUFFLE1BQThCOztZQUM5RCxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTs7WUFDckMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsZUFBZSxDQUFDO1FBRXhGLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTs7Z0JBQ1IsR0FBRyxHQUFHLG1CQUFRLE1BQU0sQ0FBQyxHQUFHLEVBQUE7WUFDOUIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFOztnQkFDUixHQUFHLEdBQUcsbUJBQVEsTUFBTSxDQUFDLEdBQUcsRUFBQTtZQUM5QixPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDakQ7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCwyQ0FBVTs7Ozs7SUFBVixVQUFXLE9BQWUsRUFBRSxJQUFZOztZQUNoQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUV4QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDcEYsQ0FBQzs7Z0JBNUNGLFVBQVU7Ozs7Z0JBVkgsWUFBWTtnQkFDWixrQkFBa0I7Z0JBQ2xCLGlCQUFpQjs7SUFxRHpCLDZCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0E1Q1ksc0JBQXNCOzs7SUFDakMsZ0RBRUU7Ozs7O0lBRVUsOENBQWtDOzs7OztJQUNsQyxvREFBOEM7Ozs7O0lBQzlDLG1EQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0RheUNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi4vZGF5LWNhbGVuZGFyL2RheS1jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7VGltZVNlbGVjdFNlcnZpY2V9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF5VGltZUNhbGVuZGFyQ29uZmlnfSBmcm9tICcuL2RheS10aW1lLWNhbGVuZGFyLWNvbmZpZy5tb2RlbCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuY29uc3QgREFZX0ZPUk1BVCA9ICdZWVlZTU1ERCc7XG5jb25zdCBUSU1FX0ZPUk1BVCA9ICdISDptbTpzcyc7XG5jb25zdCBDT01CSU5FRF9GT1JNQVQgPSBEQVlfRk9STUFUICsgVElNRV9GT1JNQVQ7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgREVGQVVMVF9DT05GSUc6IElEYXlUaW1lQ2FsZW5kYXJDb25maWcgPSB7XG4gICAgbG9jYWxlOiBtb21lbnQubG9jYWxlKClcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGRheUNhbGVuZGFyU2VydmljZTogRGF5Q2FsZW5kYXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHRpbWVTZWxlY3RTZXJ2aWNlOiBUaW1lU2VsZWN0U2VydmljZSkge1xuICB9XG5cbiAgZ2V0Q29uZmlnKGNvbmZpZzogSURheVRpbWVDYWxlbmRhckNvbmZpZyk6IElEYXlUaW1lQ2FsZW5kYXJDb25maWcge1xuICAgIGNvbnN0IF9jb25maWcgPSB7XG4gICAgICAuLi50aGlzLkRFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRDb25maWcoY29uZmlnKSxcbiAgICAgIC4uLnRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyhjb25maWcpXG4gICAgfTtcblxuICAgIG1vbWVudC5sb2NhbGUoY29uZmlnLmxvY2FsZSk7XG5cbiAgICByZXR1cm4gX2NvbmZpZztcbiAgfVxuXG4gIHVwZGF0ZURheShjdXJyZW50OiBNb21lbnQsIGRheTogTW9tZW50LCBjb25maWc6IElEYXlUaW1lQ2FsZW5kYXJDb25maWcpOiBNb21lbnQge1xuICAgIGNvbnN0IHRpbWUgPSBjdXJyZW50ID8gY3VycmVudCA6IG1vbWVudCgpO1xuICAgIGxldCB1cGRhdGVkID0gbW9tZW50KGRheS5mb3JtYXQoREFZX0ZPUk1BVCkgKyB0aW1lLmZvcm1hdChUSU1FX0ZPUk1BVCksIENPTUJJTkVEX0ZPUk1BVClcblxuICAgIGlmIChjb25maWcubWluKSB7XG4gICAgICBjb25zdCBtaW4gPSA8TW9tZW50PmNvbmZpZy5taW47XG4gICAgICB1cGRhdGVkID0gbWluLmlzQWZ0ZXIodXBkYXRlZCkgPyBtaW4gOiB1cGRhdGVkO1xuICAgIH1cblxuICAgIGlmIChjb25maWcubWF4KSB7XG4gICAgICBjb25zdCBtYXggPSA8TW9tZW50PmNvbmZpZy5tYXg7XG4gICAgICB1cGRhdGVkID0gbWF4LmlzQmVmb3JlKHVwZGF0ZWQpID8gbWF4IDogdXBkYXRlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXBkYXRlZDtcbiAgfVxuXG4gIHVwZGF0ZVRpbWUoY3VycmVudDogTW9tZW50LCB0aW1lOiBNb21lbnQpOiBNb21lbnQge1xuICAgIGNvbnN0IGRheSA9IGN1cnJlbnQgPyBjdXJyZW50IDogbW9tZW50KCk7XG5cbiAgICByZXR1cm4gbW9tZW50KGRheS5mb3JtYXQoREFZX0ZPUk1BVCkgKyB0aW1lLmZvcm1hdChUSU1FX0ZPUk1BVCksIENPTUJJTkVEX0ZPUk1BVCk7XG4gIH1cbn1cbiJdfQ==