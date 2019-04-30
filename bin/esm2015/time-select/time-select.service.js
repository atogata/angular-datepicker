/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
const moment = momentNs;
/** @type {?} */
export const FIRST_PM_HOUR = 12;
export class TimeSelectService {
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
            locale: moment.locale()
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
        moment.locale(_config.locale);
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
        const time = t || moment();
        return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
    }
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    getMinutes(config, t) {
        /** @type {?} */
        const time = t || moment();
        return time && time.format(config.minutesFormat);
    }
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    getSeconds(config, t) {
        /** @type {?} */
        const time = t || moment();
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
        ;
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
        ;
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
if (false) {
    /** @type {?} */
    TimeSelectService.prototype.DEFAULT_CONFIG;
    /**
     * @type {?}
     * @private
     */
    TimeSelectService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zZWxlY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbInRpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFbkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDOztNQUU5RCxNQUFNLEdBQUcsUUFBUTs7QUFHdkIsTUFBTSxPQUFPLGFBQWEsR0FBRyxFQUFFO0FBRy9CLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFlNUIsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFkckMsbUJBQWMsR0FBOEI7WUFDbkQsYUFBYSxFQUFFLElBQUk7WUFDbkIsYUFBYSxFQUFFLElBQUk7WUFDbkIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsYUFBYSxFQUFFLElBQUk7WUFDbkIsZUFBZSxFQUFFLENBQUM7WUFDbEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsZUFBZSxFQUFFLENBQUM7WUFDbEIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsbUJBQW1CLEVBQUUsS0FBSztZQUMxQixhQUFhLEVBQUUsR0FBRztZQUNsQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtTQUN4QixDQUFDO0lBR0YsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBeUI7O2NBQzNCLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDN0QsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQzlEOztjQUVLLE9BQU8s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b3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0lUaW1lU2VsZWN0Q29uZmlnLCBJVGltZVNlbGVjdENvbmZpZ0ludGVybmFsfSBmcm9tICcuL3RpbWUtc2VsZWN0LWNvbmZpZy5tb2RlbCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuZXhwb3J0IHR5cGUgVGltZVVuaXQgPSAnaG91cicgfCAnbWludXRlJyB8ICdzZWNvbmQnO1xuZXhwb3J0IGNvbnN0IEZJUlNUX1BNX0hPVVIgPSAxMjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWVTZWxlY3RTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgREVGQVVMVF9DT05GSUc6IElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWwgPSB7XG4gICAgaG91cnMxMkZvcm1hdDogJ2hoJyxcbiAgICBob3VyczI0Rm9ybWF0OiAnSEgnLFxuICAgIG1lcmlkaWVtRm9ybWF0OiAnQScsXG4gICAgbWludXRlc0Zvcm1hdDogJ21tJyxcbiAgICBtaW51dGVzSW50ZXJ2YWw6IDEsXG4gICAgc2Vjb25kc0Zvcm1hdDogJ3NzJyxcbiAgICBzZWNvbmRzSW50ZXJ2YWw6IDEsXG4gICAgc2hvd1NlY29uZHM6IGZhbHNlLFxuICAgIHNob3dUd2VudHlGb3VySG91cnM6IGZhbHNlLFxuICAgIHRpbWVTZXBhcmF0b3I6ICc6JyxcbiAgICBsb2NhbGU6IG1vbWVudC5sb2NhbGUoKVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UpIHtcbiAgfVxuXG4gIGdldENvbmZpZyhjb25maWc6IElUaW1lU2VsZWN0Q29uZmlnKTogSVRpbWVTZWxlY3RDb25maWdJbnRlcm5hbCB7XG4gICAgY29uc3QgdGltZUNvbmZpZ3MgPSB7XG4gICAgICBtYXhUaW1lOiB0aGlzLnV0aWxzU2VydmljZS5vbmx5VGltZShjb25maWcgJiYgY29uZmlnLm1heFRpbWUpLFxuICAgICAgbWluVGltZTogdGhpcy51dGlsc1NlcnZpY2Uub25seVRpbWUoY29uZmlnICYmIGNvbmZpZy5taW5UaW1lKVxuICAgIH07XG5cbiAgICBjb25zdCBfY29uZmlnID0gPElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWw+e1xuICAgICAgLi4udGhpcy5ERUZBVUxUX0NPTkZJRyxcbiAgICAgIC4uLnRoaXMudXRpbHNTZXJ2aWNlLmNsZWFyVW5kZWZpbmVkKGNvbmZpZyksXG4gICAgICAuLi50aW1lQ29uZmlnc1xuICAgIH07XG5cbiAgICBtb21lbnQubG9jYWxlKF9jb25maWcubG9jYWxlKTtcblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG5cbiAgZ2V0VGltZUZvcm1hdChjb25maWc6IElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWwpOiBzdHJpbmcge1xuICAgIHJldHVybiAoY29uZmlnLnNob3dUd2VudHlGb3VySG91cnMgPyBjb25maWcuaG91cnMyNEZvcm1hdCA6IGNvbmZpZy5ob3VyczEyRm9ybWF0KVxuICAgICAgKyBjb25maWcudGltZVNlcGFyYXRvciArIGNvbmZpZy5taW51dGVzRm9ybWF0XG4gICAgICArIChjb25maWcuc2hvd1NlY29uZHMgPyAoY29uZmlnLnRpbWVTZXBhcmF0b3IgKyBjb25maWcuc2Vjb25kc0Zvcm1hdCkgOiAnJylcbiAgICAgICsgKGNvbmZpZy5zaG93VHdlbnR5Rm91ckhvdXJzID8gJycgOiAnICcgKyBjb25maWcubWVyaWRpZW1Gb3JtYXQpO1xuICB9XG5cbiAgZ2V0SG91cnMoY29uZmlnOiBJVGltZVNlbGVjdENvbmZpZ0ludGVybmFsLCB0OiBNb21lbnQgfCBudWxsKTogc3RyaW5nIHtcbiAgICBjb25zdCB0aW1lID0gdCB8fCBtb21lbnQoKTtcbiAgICByZXR1cm4gdGltZSAmJiB0aW1lLmZvcm1hdChjb25maWcuc2hvd1R3ZW50eUZvdXJIb3VycyA/IGNvbmZpZy5ob3VyczI0Rm9ybWF0IDogY29uZmlnLmhvdXJzMTJGb3JtYXQpO1xuICB9XG5cbiAgZ2V0TWludXRlcyhjb25maWc6IElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWwsIHQ6IE1vbWVudCB8IG51bGwpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRpbWUgPSB0IHx8IG1vbWVudCgpO1xuICAgIHJldHVybiB0aW1lICYmIHRpbWUuZm9ybWF0KGNvbmZpZy5taW51dGVzRm9ybWF0KTtcbiAgfVxuXG4gIGdldFNlY29uZHMoY29uZmlnOiBJVGltZVNlbGVjdENvbmZpZ0ludGVybmFsLCB0OiBNb21lbnQgfCBudWxsKTogc3RyaW5nIHtcbiAgICBjb25zdCB0aW1lID0gdCB8fCBtb21lbnQoKTtcbiAgICByZXR1cm4gdGltZSAmJiB0aW1lLmZvcm1hdChjb25maWcuc2Vjb25kc0Zvcm1hdCk7XG4gIH1cblxuICBnZXRNZXJpZGllbShjb25maWc6IElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWwsIHRpbWU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRpbWUgJiYgdGltZS5mb3JtYXQoY29uZmlnLm1lcmlkaWVtRm9ybWF0KTtcbiAgfVxuXG4gIGRlY3JlYXNlKGNvbmZpZzogSVRpbWVTZWxlY3RDb25maWdJbnRlcm5hbCwgdGltZTogTW9tZW50LCB1bml0OiBUaW1lVW5pdCk6IE1vbWVudCB7XG4gICAgbGV0IGFtb3VudDogbnVtYmVyID0gMTtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGFtb3VudCA9IGNvbmZpZy5taW51dGVzSW50ZXJ2YWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgYW1vdW50ID0gY29uZmlnLnNlY29uZHNJbnRlcnZhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aW1lLmNsb25lKCkuc3VidHJhY3QoYW1vdW50LCB1bml0KTtcbiAgfVxuXG4gIGluY3JlYXNlKGNvbmZpZzogSVRpbWVTZWxlY3RDb25maWdJbnRlcm5hbCwgdGltZTogTW9tZW50LCB1bml0OiBUaW1lVW5pdCk6IE1vbWVudCB7XG4gICAgbGV0IGFtb3VudDogbnVtYmVyID0gMTtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgIGFtb3VudCA9IGNvbmZpZy5taW51dGVzSW50ZXJ2YWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgYW1vdW50ID0gY29uZmlnLnNlY29uZHNJbnRlcnZhbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiB0aW1lLmNsb25lKCkuYWRkKGFtb3VudCwgdW5pdCk7XG4gIH1cblxuICB0b2dnbGVNZXJpZGllbSh0aW1lOiBNb21lbnQpOiBNb21lbnQge1xuICAgIGlmICh0aW1lLmhvdXJzKCkgPCBGSVJTVF9QTV9IT1VSKSB7XG4gICAgICByZXR1cm4gdGltZS5jbG9uZSgpLmFkZCgxMiwgJ2hvdXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRpbWUuY2xvbmUoKS5zdWJ0cmFjdCgxMiwgJ2hvdXInKTtcbiAgICB9XG4gIH1cblxuICBzaG91bGRTaG93RGVjcmVhc2UoY29uZmlnOiBJVGltZVNlbGVjdENvbmZpZ0ludGVybmFsLCB0aW1lOiBNb21lbnQsIHVuaXQ6IFRpbWVVbml0KTogYm9vbGVhbiB7XG4gICAgaWYgKCFjb25maWcubWluICYmICFjb25maWcubWluVGltZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIDtcbiAgICBjb25zdCBuZXdUaW1lID0gdGhpcy5kZWNyZWFzZShjb25maWcsIHRpbWUsIHVuaXQpO1xuXG4gICAgcmV0dXJuICghY29uZmlnLm1pbiB8fCBjb25maWcubWluLmlzU2FtZU9yQmVmb3JlKG5ld1RpbWUpKVxuICAgICAgJiYgKCFjb25maWcubWluVGltZSB8fCBjb25maWcubWluVGltZS5pc1NhbWVPckJlZm9yZSh0aGlzLnV0aWxzU2VydmljZS5vbmx5VGltZShuZXdUaW1lKSkpO1xuICB9XG5cbiAgc2hvdWxkU2hvd0luY3JlYXNlKGNvbmZpZzogSVRpbWVTZWxlY3RDb25maWdJbnRlcm5hbCwgdGltZTogTW9tZW50LCB1bml0OiBUaW1lVW5pdCk6IGJvb2xlYW4ge1xuICAgIGlmICghY29uZmlnLm1heCAmJiAhY29uZmlnLm1heFRpbWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICA7XG4gICAgY29uc3QgbmV3VGltZSA9IHRoaXMuaW5jcmVhc2UoY29uZmlnLCB0aW1lLCB1bml0KTtcblxuICAgIHJldHVybiAoIWNvbmZpZy5tYXggfHwgY29uZmlnLm1heC5pc1NhbWVPckFmdGVyKG5ld1RpbWUpKVxuICAgICAgJiYgKCFjb25maWcubWF4VGltZSB8fCBjb25maWcubWF4VGltZS5pc1NhbWVPckFmdGVyKHRoaXMudXRpbHNTZXJ2aWNlLm9ubHlUaW1lKG5ld1RpbWUpKSk7XG4gIH1cblxuICBzaG91bGRTaG93VG9nZ2xlTWVyaWRpZW0oY29uZmlnOiBJVGltZVNlbGVjdENvbmZpZ0ludGVybmFsLCB0aW1lOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoIWNvbmZpZy5taW4gJiYgIWNvbmZpZy5tYXggJiYgIWNvbmZpZy5taW5UaW1lICYmICFjb25maWcubWF4VGltZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5ld1RpbWUgPSB0aGlzLnRvZ2dsZU1lcmlkaWVtKHRpbWUpO1xuICAgIHJldHVybiAoIWNvbmZpZy5tYXggfHwgY29uZmlnLm1heC5pc1NhbWVPckFmdGVyKG5ld1RpbWUpKVxuICAgICAgJiYgKCFjb25maWcubWluIHx8IGNvbmZpZy5taW4uaXNTYW1lT3JCZWZvcmUobmV3VGltZSkpXG4gICAgICAmJiAoIWNvbmZpZy5tYXhUaW1lIHx8IGNvbmZpZy5tYXhUaW1lLmlzU2FtZU9yQWZ0ZXIodGhpcy51dGlsc1NlcnZpY2Uub25seVRpbWUobmV3VGltZSkpKVxuICAgICAgJiYgKCFjb25maWcubWluVGltZSB8fCBjb25maWcubWluVGltZS5pc1NhbWVPckJlZm9yZSh0aGlzLnV0aWxzU2VydmljZS5vbmx5VGltZShuZXdUaW1lKSkpO1xuICB9XG59XG4iXX0=