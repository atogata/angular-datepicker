/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import * as momentNs from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { TimeSelectService } from '../time-select/time-select.service';
import { DayTimeCalendarService } from '../day-time-calendar/day-time-calendar.service';
/** @type {?} */
const moment = momentNs;
export class DatePickerService {
    /**
     * @param {?} utilsService
     * @param {?} timeSelectService
     * @param {?} daytimeCalendarService
     */
    constructor(utilsService, timeSelectService, daytimeCalendarService) {
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
    /**
     * @param {?} config
     * @param {?=} mode
     * @return {?}
     */
    getConfig(config, mode = 'daytime') {
        /** @type {?} */
        const _config = (/** @type {?} */ (Object.assign({}, this.defaultConfig, { format: this.getDefaultFormatByMode(mode) }, this.utilsService.clearUndefined(config))));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        moment.locale(_config.locale);
        return _config;
    }
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    getDayConfigService(pickerConfig) {
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
    }
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    getDayTimeConfigService(pickerConfig) {
        return this.daytimeCalendarService.getConfig(pickerConfig);
    }
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    getTimeConfigService(pickerConfig) {
        return this.timeSelectService.getConfig(pickerConfig);
    }
    /**
     * @return {?}
     */
    pickerClosed() {
        this.onPickerClosed.emit();
    }
    // todo:: add unit tests
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    isValidInputDateValue(value, config) {
        value = value ? value : '';
        /** @type {?} */
        const datesStrArr = this.utilsService.datesStringToStringArray(value);
        return datesStrArr.every((/**
         * @param {?} date
         * @return {?}
         */
        date => this.utilsService.isDateValid(date, config.format)));
    }
    // todo:: add unit tests
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    convertInputValueToMomentArray(value, config) {
        value = value ? value : '';
        /** @type {?} */
        const datesStrArr = this.utilsService.datesStringToStringArray(value);
        return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect);
    }
    /**
     * @private
     * @param {?} mode
     * @return {?}
     */
    getDefaultFormatByMode(mode) {
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
    }
}
DatePickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatePickerService.ctorParameters = () => [
    { type: UtilsService },
    { type: TimeSelectService },
    { type: DayTimeCalendarService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyL2RhdGUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRW5DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUVwRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQzs7TUFJaEYsTUFBTSxHQUFHLFFBQVE7QUFHdkIsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBa0I1QixZQUFvQixZQUEwQixFQUMxQixpQkFBb0MsRUFDcEMsc0JBQThDO1FBRjlDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQW5CekQsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCxrQkFBYSxHQUE4QjtZQUNqRCxhQUFhLEVBQUUsSUFBSTtZQUNuQixrQkFBa0IsRUFBRSxHQUFHO1lBQ3ZCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsZUFBZSxFQUFFLEtBQUs7WUFDdEIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixlQUFlLEVBQUUsS0FBSztZQUN0QixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQztJQUtGLENBQUM7Ozs7Ozs7SUFHRCxTQUFTLENBQUMsTUFBeUIsRUFBRSxPQUFxQixTQUFTOztjQUMzRCxPQUFPLEdBQUcscUNBQ1gsSUFBSSxDQUFDLGFBQWEsSUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQzVDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWhGLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUMzRSxPQUFPLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsWUFBK0I7UUFDakQsT0FBTztZQUNMLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRztZQUNyQixHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUc7WUFDckIscUJBQXFCLEVBQUUsWUFBWSxDQUFDLHFCQUFxQjtZQUN6RCxhQUFhLEVBQUUsWUFBWSxDQUFDLGFBQWE7WUFDekMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGlCQUFpQjtZQUNqRCxlQUFlLEVBQUUsWUFBWSxDQUFDLGVBQWU7WUFDN0MsY0FBYyxFQUFFLFlBQVksQ0FBQyxjQUFjO1lBQzNDLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtZQUMzQixnQkFBZ0IsRUFBRSxZQUFZLENBQUMsZ0JBQWdCO1lBQy9DLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVztZQUNyQyxjQUFjLEVBQUUsWUFBWSxDQUFDLGNBQWM7WUFDM0MsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLG1CQUFtQjtZQUNyRCxVQUFVLEVBQUUsWUFBWSxDQUFDLFVBQVU7WUFDbkMsYUFBYSxFQUFFLFlBQVksQ0FBQyxhQUFhO1lBQ3pDLFlBQVksRUFBRSxZQUFZLENBQUMsWUFBWTtZQUN2QyxlQUFlLEVBQUUsWUFBWSxDQUFDLGVBQWU7WUFDN0Msc0JBQXNCLEVBQUUsWUFBWSxDQUFDLHNCQUFzQjtZQUMzRCxjQUFjLEVBQUUsWUFBWSxDQUFDLGNBQWM7WUFDM0MsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGlCQUFpQjtZQUNqRCx3QkFBd0IsRUFBRSxZQUFZLENBQUMsd0JBQXdCO1lBQy9ELHVCQUF1QixFQUFFLFlBQVksQ0FBQyx1QkFBdUI7WUFDN0QsMkJBQTJCLEVBQUUsWUFBWSxDQUFDLDJCQUEyQjtZQUNyRSxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07WUFDM0IsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGlCQUFpQjtZQUNqRCxlQUFlLEVBQUUsWUFBWSxDQUFDLGVBQWU7WUFDN0MsZUFBZSxFQUFFLFlBQVksQ0FBQyxlQUFlO1NBQzlDLENBQUM7SUFDSixDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLFlBQStCO1FBQ3JELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLFlBQStCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQUdELHFCQUFxQixDQUFDLEtBQWEsRUFBRSxNQUF5QjtRQUM1RCxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7Y0FDckIsV0FBVyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDO1FBRS9FLE9BQU8sV0FBVyxDQUFDLEtBQUs7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztJQUN2RixDQUFDOzs7Ozs7O0lBR0QsOEJBQThCLENBQUMsS0FBYSxFQUFFLE1BQXlCO1FBQ3JFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztjQUNyQixXQUFXLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUM7UUFFL0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7Ozs7OztJQUVPLHNCQUFzQixDQUFDLElBQWtCO1FBQy9DLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxLQUFLO2dCQUNSLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLEtBQUssU0FBUztnQkFDWixPQUFPLHFCQUFxQixDQUFDO1lBQy9CLEtBQUssTUFBTTtnQkFDVCxPQUFPLFVBQVUsQ0FBQztZQUNwQixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxXQUFXLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7WUFqSEYsVUFBVTs7OztZQVRILFlBQVk7WUFFWixpQkFBaUI7WUFDakIsc0JBQXNCOzs7O0lBUTVCLDJDQUFpRTs7Ozs7SUFDakUsMENBY0U7Ozs7O0lBRVUseUNBQWtDOzs7OztJQUNsQyw4Q0FBNEM7Ozs7O0lBQzVDLG1EQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SURhdGVQaWNrZXJDb25maWcsIElEYXRlUGlja2VyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4vZGF0ZS1waWNrZXItY29uZmlnLm1vZGVsJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0lEYXlDYWxlbmRhckNvbmZpZ30gZnJvbSAnLi4vZGF5LWNhbGVuZGFyL2RheS1jYWxlbmRhci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtUaW1lU2VsZWN0U2VydmljZX0gZnJvbSAnLi4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3Quc2VydmljZSc7XG5pbXBvcnQge0RheVRpbWVDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4uL2RheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtJVGltZVNlbGVjdENvbmZpZ30gZnJvbSAnLi4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3QtY29uZmlnLm1vZGVsJztcbmltcG9ydCB7Q2FsZW5kYXJNb2RlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItbW9kZSc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgb25QaWNrZXJDbG9zZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZ0ludGVybmFsID0ge1xuICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgY2xvc2VPblNlbGVjdERlbGF5OiAxMDAsXG4gICAgZm9ybWF0OiAnREQtTU0tWVlZWScsXG4gICAgb3Blbk9uRm9jdXM6IHRydWUsXG4gICAgb3Blbk9uQ2xpY2s6IHRydWUsXG4gICAgb25PcGVuRGVsYXk6IDAsXG4gICAgZGlzYWJsZUtleXByZXNzOiBmYWxzZSxcbiAgICBzaG93TmVhck1vbnRoRGF5czogdHJ1ZSxcbiAgICBzaG93V2Vla051bWJlcnM6IGZhbHNlLFxuICAgIGVuYWJsZU1vbnRoU2VsZWN0b3I6IHRydWUsXG4gICAgc2hvd0dvVG9DdXJyZW50OiB0cnVlLFxuICAgIGxvY2FsZTogbW9tZW50LmxvY2FsZSgpLFxuICAgIGhpZGVPbk91dHNpZGVDbGljazogdHJ1ZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGltZVNlbGVjdFNlcnZpY2U6IFRpbWVTZWxlY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGRheXRpbWVDYWxlbmRhclNlcnZpY2U6IERheVRpbWVDYWxlbmRhclNlcnZpY2UpIHtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0c1xuICBnZXRDb25maWcoY29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZywgbW9kZTogQ2FsZW5kYXJNb2RlID0gJ2RheXRpbWUnKTogSURhdGVQaWNrZXJDb25maWdJbnRlcm5hbCB7XG4gICAgY29uc3QgX2NvbmZpZyA9IDxJRGF0ZVBpY2tlckNvbmZpZ0ludGVybmFsPntcbiAgICAgIC4uLnRoaXMuZGVmYXVsdENvbmZpZyxcbiAgICAgIGZvcm1hdDogdGhpcy5nZXREZWZhdWx0Rm9ybWF0QnlNb2RlKG1vZGUpLFxuICAgICAgLi4udGhpcy51dGlsc1NlcnZpY2UuY2xlYXJVbmRlZmluZWQoY29uZmlnKVxuICAgIH07XG5cbiAgICB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0UHJvcHNUb01vbWVudChfY29uZmlnLCBfY29uZmlnLmZvcm1hdCwgWydtaW4nLCAnbWF4J10pO1xuXG4gICAgaWYgKGNvbmZpZyAmJiBjb25maWcuYWxsb3dNdWx0aVNlbGVjdCAmJiBjb25maWcuY2xvc2VPblNlbGVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBfY29uZmlnLmNsb3NlT25TZWxlY3QgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBtb21lbnQubG9jYWxlKF9jb25maWcubG9jYWxlKTtcblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG5cbiAgZ2V0RGF5Q29uZmlnU2VydmljZShwaWNrZXJDb25maWc6IElEYXRlUGlja2VyQ29uZmlnKTogSURheUNhbGVuZGFyQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWluOiBwaWNrZXJDb25maWcubWluLFxuICAgICAgbWF4OiBwaWNrZXJDb25maWcubWF4LFxuICAgICAgaXNEYXlEaXNhYmxlZENhbGxiYWNrOiBwaWNrZXJDb25maWcuaXNEYXlEaXNhYmxlZENhbGxiYWNrLFxuICAgICAgd2Vla0RheUZvcm1hdDogcGlja2VyQ29uZmlnLndlZWtEYXlGb3JtYXQsXG4gICAgICBzaG93TmVhck1vbnRoRGF5czogcGlja2VyQ29uZmlnLnNob3dOZWFyTW9udGhEYXlzLFxuICAgICAgc2hvd1dlZWtOdW1iZXJzOiBwaWNrZXJDb25maWcuc2hvd1dlZWtOdW1iZXJzLFxuICAgICAgZmlyc3REYXlPZldlZWs6IHBpY2tlckNvbmZpZy5maXJzdERheU9mV2VlayxcbiAgICAgIGZvcm1hdDogcGlja2VyQ29uZmlnLmZvcm1hdCxcbiAgICAgIGFsbG93TXVsdGlTZWxlY3Q6IHBpY2tlckNvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgbW9udGhGb3JtYXQ6IHBpY2tlckNvbmZpZy5tb250aEZvcm1hdCxcbiAgICAgIG1vbnRoRm9ybWF0dGVyOiBwaWNrZXJDb25maWcubW9udGhGb3JtYXR0ZXIsXG4gICAgICBlbmFibGVNb250aFNlbGVjdG9yOiBwaWNrZXJDb25maWcuZW5hYmxlTW9udGhTZWxlY3RvcixcbiAgICAgIHllYXJGb3JtYXQ6IHBpY2tlckNvbmZpZy55ZWFyRm9ybWF0LFxuICAgICAgeWVhckZvcm1hdHRlcjogcGlja2VyQ29uZmlnLnllYXJGb3JtYXR0ZXIsXG4gICAgICBkYXlCdG5Gb3JtYXQ6IHBpY2tlckNvbmZpZy5kYXlCdG5Gb3JtYXQsXG4gICAgICBkYXlCdG5Gb3JtYXR0ZXI6IHBpY2tlckNvbmZpZy5kYXlCdG5Gb3JtYXR0ZXIsXG4gICAgICBkYXlCdG5Dc3NDbGFzc0NhbGxiYWNrOiBwaWNrZXJDb25maWcuZGF5QnRuQ3NzQ2xhc3NDYWxsYmFjayxcbiAgICAgIG1vbnRoQnRuRm9ybWF0OiBwaWNrZXJDb25maWcubW9udGhCdG5Gb3JtYXQsXG4gICAgICBtb250aEJ0bkZvcm1hdHRlcjogcGlja2VyQ29uZmlnLm1vbnRoQnRuRm9ybWF0dGVyLFxuICAgICAgbW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrOiBwaWNrZXJDb25maWcubW9udGhCdG5Dc3NDbGFzc0NhbGxiYWNrLFxuICAgICAgbXVsdGlwbGVZZWFyc05hdmlnYXRlQnk6IHBpY2tlckNvbmZpZy5tdWx0aXBsZVllYXJzTmF2aWdhdGVCeSxcbiAgICAgIHNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbjogcGlja2VyQ29uZmlnLnNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbixcbiAgICAgIGxvY2FsZTogcGlja2VyQ29uZmlnLmxvY2FsZSxcbiAgICAgIHJldHVybmVkVmFsdWVUeXBlOiBwaWNrZXJDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUsXG4gICAgICBzaG93R29Ub0N1cnJlbnQ6IHBpY2tlckNvbmZpZy5zaG93R29Ub0N1cnJlbnQsXG4gICAgICB1blNlbGVjdE9uQ2xpY2s6IHBpY2tlckNvbmZpZy51blNlbGVjdE9uQ2xpY2tcbiAgICB9O1xuICB9XG5cbiAgZ2V0RGF5VGltZUNvbmZpZ1NlcnZpY2UocGlja2VyQ29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZyk6IElUaW1lU2VsZWN0Q29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5kYXl0aW1lQ2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyhwaWNrZXJDb25maWcpO1xuICB9XG5cbiAgZ2V0VGltZUNvbmZpZ1NlcnZpY2UocGlja2VyQ29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZyk6IElUaW1lU2VsZWN0Q29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRDb25maWcocGlja2VyQ29uZmlnKTtcbiAgfVxuXG4gIHBpY2tlckNsb3NlZCgpIHtcbiAgICB0aGlzLm9uUGlja2VyQ2xvc2VkLmVtaXQoKTtcbiAgfVxuXG4gIC8vIHRvZG86OiBhZGQgdW5pdCB0ZXN0c1xuICBpc1ZhbGlkSW5wdXREYXRlVmFsdWUodmFsdWU6IHN0cmluZywgY29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHZhbHVlID0gdmFsdWUgPyB2YWx1ZSA6ICcnO1xuICAgIGNvbnN0IGRhdGVzU3RyQXJyOiBzdHJpbmdbXSA9IHRoaXMudXRpbHNTZXJ2aWNlLmRhdGVzU3RyaW5nVG9TdHJpbmdBcnJheSh2YWx1ZSk7XG5cbiAgICByZXR1cm4gZGF0ZXNTdHJBcnIuZXZlcnkoZGF0ZSA9PiB0aGlzLnV0aWxzU2VydmljZS5pc0RhdGVWYWxpZChkYXRlLCBjb25maWcuZm9ybWF0KSk7XG4gIH1cblxuICAvLyB0b2RvOjogYWRkIHVuaXQgdGVzdHNcbiAgY29udmVydElucHV0VmFsdWVUb01vbWVudEFycmF5KHZhbHVlOiBzdHJpbmcsIGNvbmZpZzogSURhdGVQaWNrZXJDb25maWcpOiBNb21lbnRbXSB7XG4gICAgdmFsdWUgPSB2YWx1ZSA/IHZhbHVlIDogJyc7XG4gICAgY29uc3QgZGF0ZXNTdHJBcnI6IHN0cmluZ1tdID0gdGhpcy51dGlsc1NlcnZpY2UuZGF0ZXNTdHJpbmdUb1N0cmluZ0FycmF5KHZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9Nb21lbnRBcnJheShkYXRlc1N0ckFyciwgY29uZmlnLmZvcm1hdCwgY29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0Rm9ybWF0QnlNb2RlKG1vZGU6IENhbGVuZGFyTW9kZSk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdkYXknOlxuICAgICAgICByZXR1cm4gJ0RELU1NLVlZWVknO1xuICAgICAgY2FzZSAnZGF5dGltZSc6XG4gICAgICAgIHJldHVybiAnREQtTU0tWVlZWSBISDptbTpzcyc7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuICdISDptbTpzcyc7XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIHJldHVybiAnTU1NLCBZWVlZJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==