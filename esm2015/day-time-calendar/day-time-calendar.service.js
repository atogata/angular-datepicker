/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { DayCalendarService } from '../day-calendar/day-calendar.service';
import { TimeSelectService } from '../time-select/time-select.service';
/** @type {?} */
const moment = momentNs;
/** @type {?} */
const DAY_FORMAT = 'YYYYMMDD';
/** @type {?} */
const TIME_FORMAT = 'HH:mm:ss';
/** @type {?} */
const COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
export class DayTimeCalendarService {
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
            locale: moment.locale()
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getConfig(config) {
        /** @type {?} */
        const _config = Object.assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
        moment.locale(config.locale);
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
        const time = current ? current : moment();
        /** @type {?} */
        let updated = moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
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
        const day = current ? current : moment();
        return moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXRpbWUtY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDOztNQUUvRCxNQUFNLEdBQUcsUUFBUTs7TUFFakIsVUFBVSxHQUFHLFVBQVU7O01BQ3ZCLFdBQVcsR0FBRyxVQUFVOztNQUN4QixlQUFlLEdBQUcsVUFBVSxHQUFHLFdBQVc7QUFHaEQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7O0lBS2pDLFlBQW9CLFlBQTBCLEVBQzFCLGtCQUFzQyxFQUN0QyxpQkFBb0M7UUFGcEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTi9DLG1CQUFjLEdBQTJCO1lBQ2hELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1NBQ3hCLENBQUM7SUFLRixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxNQUE4Qjs7Y0FDaEMsT0FBTyxxQkFDUixJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUM3QztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBZSxFQUFFLEdBQVcsRUFBRSxNQUE4Qjs7Y0FDOUQsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7O1lBQ3JDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLGVBQWUsQ0FBQztRQUV4RixJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7O2tCQUNSLEdBQUcsR0FBRyxtQkFBUSxNQUFNLENBQUMsR0FBRyxFQUFBO1lBQzlCLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUNoRDtRQUVELElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTs7a0JBQ1IsR0FBRyxHQUFHLG1CQUFRLE1BQU0sQ0FBQyxHQUFHLEVBQUE7WUFDOUIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQWUsRUFBRSxJQUFZOztjQUNoQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUV4QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDcEYsQ0FBQzs7O1lBNUNGLFVBQVU7Ozs7WUFWSCxZQUFZO1lBQ1osa0JBQWtCO1lBQ2xCLGlCQUFpQjs7OztJQVV2QixnREFFRTs7Ozs7SUFFVSw4Q0FBa0M7Ozs7O0lBQ2xDLG9EQUE4Qzs7Ozs7SUFDOUMsbURBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7RGF5Q2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuLi9kYXktY2FsZW5kYXIvZGF5LWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtUaW1lU2VsZWN0U2VydmljZX0gZnJvbSAnLi4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3Quc2VydmljZSc7XG5pbXBvcnQge0lEYXlUaW1lQ2FsZW5kYXJDb25maWd9IGZyb20gJy4vZGF5LXRpbWUtY2FsZW5kYXItY29uZmlnLm1vZGVsJztcbmNvbnN0IG1vbWVudCA9IG1vbWVudE5zO1xuXG5jb25zdCBEQVlfRk9STUFUID0gJ1lZWVlNTUREJztcbmNvbnN0IFRJTUVfRk9STUFUID0gJ0hIOm1tOnNzJztcbmNvbnN0IENPTUJJTkVEX0ZPUk1BVCA9IERBWV9GT1JNQVQgKyBUSU1FX0ZPUk1BVDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERheVRpbWVDYWxlbmRhclNlcnZpY2Uge1xuICByZWFkb25seSBERUZBVUxUX0NPTkZJRzogSURheVRpbWVDYWxlbmRhckNvbmZpZyA9IHtcbiAgICBsb2NhbGU6IG1vbWVudC5sb2NhbGUoKVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZGF5Q2FsZW5kYXJTZXJ2aWNlOiBEYXlDYWxlbmRhclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGltZVNlbGVjdFNlcnZpY2U6IFRpbWVTZWxlY3RTZXJ2aWNlKSB7XG4gIH1cblxuICBnZXRDb25maWcoY29uZmlnOiBJRGF5VGltZUNhbGVuZGFyQ29uZmlnKTogSURheVRpbWVDYWxlbmRhckNvbmZpZyB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgIC4uLnRoaXMuREVGQVVMVF9DT05GSUcsXG4gICAgICAuLi50aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldENvbmZpZyhjb25maWcpLFxuICAgICAgLi4udGhpcy5kYXlDYWxlbmRhclNlcnZpY2UuZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB9O1xuXG4gICAgbW9tZW50LmxvY2FsZShjb25maWcubG9jYWxlKTtcblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG5cbiAgdXBkYXRlRGF5KGN1cnJlbnQ6IE1vbWVudCwgZGF5OiBNb21lbnQsIGNvbmZpZzogSURheVRpbWVDYWxlbmRhckNvbmZpZyk6IE1vbWVudCB7XG4gICAgY29uc3QgdGltZSA9IGN1cnJlbnQgPyBjdXJyZW50IDogbW9tZW50KCk7XG4gICAgbGV0IHVwZGF0ZWQgPSBtb21lbnQoZGF5LmZvcm1hdChEQVlfRk9STUFUKSArIHRpbWUuZm9ybWF0KFRJTUVfRk9STUFUKSwgQ09NQklORURfRk9STUFUKVxuXG4gICAgaWYgKGNvbmZpZy5taW4pIHtcbiAgICAgIGNvbnN0IG1pbiA9IDxNb21lbnQ+Y29uZmlnLm1pbjtcbiAgICAgIHVwZGF0ZWQgPSBtaW4uaXNBZnRlcih1cGRhdGVkKSA/IG1pbiA6IHVwZGF0ZWQ7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5tYXgpIHtcbiAgICAgIGNvbnN0IG1heCA9IDxNb21lbnQ+Y29uZmlnLm1heDtcbiAgICAgIHVwZGF0ZWQgPSBtYXguaXNCZWZvcmUodXBkYXRlZCkgPyBtYXggOiB1cGRhdGVkO1xuICAgIH1cblxuICAgIHJldHVybiB1cGRhdGVkO1xuICB9XG5cbiAgdXBkYXRlVGltZShjdXJyZW50OiBNb21lbnQsIHRpbWU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgY29uc3QgZGF5ID0gY3VycmVudCA/IGN1cnJlbnQgOiBtb21lbnQoKTtcblxuICAgIHJldHVybiBtb21lbnQoZGF5LmZvcm1hdChEQVlfRk9STUFUKSArIHRpbWUuZm9ybWF0KFRJTUVfRk9STUFUKSwgQ09NQklORURfRk9STUFUKTtcbiAgfVxufVxuIl19