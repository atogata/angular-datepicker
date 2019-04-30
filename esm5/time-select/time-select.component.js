/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { TimeSelectService } from './time-select.service';
import * as momentNs from 'moment';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
var moment = momentNs;
var TimeSelectComponent = /** @class */ (function () {
    function TimeSelectComponent(timeSelectService, utilsService, cd) {
        this.timeSelectService = timeSelectService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.isInited = false;
        this.api = {
            triggerChange: this.emitChange.bind(this)
        };
    }
    Object.defineProperty(TimeSelectComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            this._selected = selected;
            this.calculateTimeParts(this.selected);
            this.showDecHour = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'hour');
            this.showDecMinute = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'minute');
            this.showDecSecond = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'second');
            this.showIncHour = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'hour');
            this.showIncMinute = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'minute');
            this.showIncSecond = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'second');
            this.showToggleMeridiem = this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this._selected);
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.componentConfig = this.timeSelectService.getConfig(this.config);
        this.selected = this.selected || moment();
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TimeSelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSelectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputValue = value;
        if (value) {
            /** @type {?} */
            var momentValue = this.utilsService
                .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
            if (momentValue.isValid()) {
                this.selected = momentValue;
                this.inputValueType = this.utilsService
                    .getInputType(this.inputValue, false);
            }
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    TimeSelectComponent.prototype.onChangeCallback = /**
     * @param {?} _
     * @return {?}
     */
    function (_) {
    };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSelectComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    TimeSelectComponent.prototype.validate = /**
     * @param {?} formControl
     * @return {?}
     */
    function (formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            function () { return null; });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSelectComponent.prototype.processOnChangeCallback = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.initValidators = /**
     * @return {?}
     */
    function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, undefined, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    TimeSelectComponent.prototype.decrease = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    TimeSelectComponent.prototype.increase = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.toggleMeridiem = /**
     * @return {?}
     */
    function () {
        this.selected = this.timeSelectService.toggleMeridiem(this.selected);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.emitChange = /**
     * @return {?}
     */
    function () {
        this.onChange.emit({ date: this.selected, selected: false });
        this.cd.markForCheck();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimeSelectComponent.prototype.calculateTimeParts = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.hours = this.timeSelectService.getHours(this.componentConfig, time);
        this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
        this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
        this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
    };
    TimeSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dp-time-select',
                    template: "<ul class=\"dp-time-select-controls\">\n  <li class=\"dp-time-select-control dp-time-select-control-hours\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showIncHour\"\n            (click)=\"increase('hour')\">\n    </button>\n    <span class=\"dp-time-select-display-hours\"\n          [innerText]=\"hours\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-time-select-control-down\"\n            [disabled]=\"!showDecHour\"\n            (click)=\"decrease('hour')\"></button>\n  </li>\n  <li class=\"dp-time-select-control dp-time-select-separator\"\n      [innerText]=\"componentConfig.timeSeparator\">\n  </li>\n  <li class=\"dp-time-select-control dp-time-select-control-minutes\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showIncMinute\"\n            (click)=\"increase('minute')\"></button>\n    <span class=\"dp-time-select-display-minutes\"\n          [innerText]=\"minutes\">\n    </span>\n    <button type=\"button\"\n            [disabled]=\"!showDecMinute\" class=\"dp-time-select-control-down\"\n            (click)=\"decrease('minute')\"></button>\n  </li>\n  <ng-container *ngIf=\"componentConfig.showSeconds\">\n    <li class=\"dp-time-select-control dp-time-select-separator\"\n        [innerText]=\"componentConfig.timeSeparator\">\n    </li>\n    <li class=\"dp-time-select-control dp-time-select-control-seconds\">\n      <button type=\"button\"\n              class=\"dp-time-select-control-up\"\n              [disabled]=\"!showIncSecond\"\n              (click)=\"increase('second')\"></button>\n      <span class=\"dp-time-select-display-seconds\"\n            [innerText]=\"seconds\">\n      </span>\n      <button type=\"button\"\n              class=\"dp-time-select-control-down\"\n              [disabled]=\"!showDecSecond\"\n              (click)=\"decrease('second')\"></button>\n    </li>\n  </ng-container>\n  <li class=\"dp-time-select-control dp-time-select-control-meridiem\" *ngIf=\"!componentConfig.showTwentyFourHours\">\n    <button type=\"button\"\n            class=\"dp-time-select-control-up\"\n            [disabled]=\"!showToggleMeridiem\"\n            (click)=\"toggleMeridiem()\"></button>\n    <span class=\"dp-time-select-display-meridiem\"\n          [innerText]=\"meridiem\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-time-select-control-down\"\n            [disabled]=\"!showToggleMeridiem\"\n            (click)=\"toggleMeridiem()\"></button>\n  </li>\n</ul>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        TimeSelectService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return TimeSelectComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return TimeSelectComponent; })),
                            multi: true
                        }
                    ],
                    styles: ["dp-time-select{display:inline-block}dp-time-select .dp-time-select-controls{margin:0;padding:0;text-align:center;line-height:normal;background:#fff}dp-time-select .dp-time-select-control{display:inline-block;width:35px;margin:0 auto;vertical-align:middle;font-size:inherit;letter-spacing:1px}dp-time-select .dp-time-select-control-down,dp-time-select .dp-time-select-control-up{position:relative;display:block;width:24px;height:24px;margin:3px auto;cursor:pointer}dp-time-select .dp-time-select-control-down::before,dp-time-select .dp-time-select-control-up::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0}dp-time-select .dp-time-select-control-up::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:4px}dp-time-select .dp-time-select-control-down::before{-webkit-transform:rotate(135deg);transform:rotate(135deg)}dp-time-select .dp-time-select-separator{width:5px}dp-time-select.dp-material .dp-time-select-control-down,dp-time-select.dp-material .dp-time-select-control-up{box-sizing:border-box;background:0 0;border:none;outline:0;border-radius:50%}dp-time-select.dp-material .dp-time-select-control-down::before,dp-time-select.dp-material .dp-time-select-control-up::before{left:0}dp-time-select.dp-material .dp-time-select-control-down:hover,dp-time-select.dp-material .dp-time-select-control-up:hover{background:#e0e0e0}"]
                }] }
    ];
    /** @nocollapse */
    TimeSelectComponent.ctorParameters = function () { return [
        { type: TimeSelectService },
        { type: UtilsService },
        { type: ChangeDetectorRef }
    ]; };
    TimeSelectComponent.propDecorators = {
        config: [{ type: Input }],
        displayDate: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
        onChange: [{ type: Output }]
    };
    return TimeSelectComponent;
}());
export { TimeSelectComponent };
if (false) {
    /** @type {?} */
    TimeSelectComponent.prototype.config;
    /** @type {?} */
    TimeSelectComponent.prototype.displayDate;
    /** @type {?} */
    TimeSelectComponent.prototype.minDate;
    /** @type {?} */
    TimeSelectComponent.prototype.maxDate;
    /** @type {?} */
    TimeSelectComponent.prototype.minTime;
    /** @type {?} */
    TimeSelectComponent.prototype.maxTime;
    /** @type {?} */
    TimeSelectComponent.prototype.theme;
    /** @type {?} */
    TimeSelectComponent.prototype.onChange;
    /** @type {?} */
    TimeSelectComponent.prototype.isInited;
    /** @type {?} */
    TimeSelectComponent.prototype.componentConfig;
    /** @type {?} */
    TimeSelectComponent.prototype._selected;
    /** @type {?} */
    TimeSelectComponent.prototype.inputValue;
    /** @type {?} */
    TimeSelectComponent.prototype.inputValueType;
    /** @type {?} */
    TimeSelectComponent.prototype.validateFn;
    /** @type {?} */
    TimeSelectComponent.prototype.hours;
    /** @type {?} */
    TimeSelectComponent.prototype.minutes;
    /** @type {?} */
    TimeSelectComponent.prototype.seconds;
    /** @type {?} */
    TimeSelectComponent.prototype.meridiem;
    /** @type {?} */
    TimeSelectComponent.prototype.showDecHour;
    /** @type {?} */
    TimeSelectComponent.prototype.showDecMinute;
    /** @type {?} */
    TimeSelectComponent.prototype.showDecSecond;
    /** @type {?} */
    TimeSelectComponent.prototype.showIncHour;
    /** @type {?} */
    TimeSelectComponent.prototype.showIncMinute;
    /** @type {?} */
    TimeSelectComponent.prototype.showIncSecond;
    /** @type {?} */
    TimeSelectComponent.prototype.showToggleMeridiem;
    /** @type {?} */
    TimeSelectComponent.prototype.api;
    /** @type {?} */
    TimeSelectComponent.prototype.timeSelectService;
    /** @type {?} */
    TimeSelectComponent.prototype.utilsService;
    /** @type {?} */
    TimeSelectComponent.prototype.cd;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsidGltZS1zZWxlY3QvdGltZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7O0lBRzlELE1BQU0sR0FBRyxRQUFRO0FBRXZCO0lBNkVFLDZCQUFtQixpQkFBb0MsRUFDcEMsWUFBMEIsRUFDMUIsRUFBcUI7UUFGckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWpEOUIsYUFBUSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELGFBQVEsR0FBWSxLQUFLLENBQUM7UUF5QzFCLFFBQUcsR0FBRztZQUNKLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDMUMsQ0FBQztJQUtGLENBQUM7SUE1QkQsc0JBQUkseUNBQVE7Ozs7UUFpQlo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFuQkQsVUFBYSxRQUFnQjtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFH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QSxtQkFBbUIsRUFBbkIsQ0FBbUIsRUFBQzs0QkFDbEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7O2lCQUNGOzs7O2dCQXJDTyxpQkFBaUI7Z0JBYWpCLFlBQVk7Z0JBekJsQixpQkFBaUI7Ozt5QkFvRGhCLEtBQUs7OEJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLFdBQVcsU0FBQyxPQUFPLGNBQUcsS0FBSzsyQkFFM0IsTUFBTTs7SUEySlQsMEJBQUM7Q0FBQSxBQXpMRCxJQXlMQztTQXJLWSxtQkFBbUI7OztJQUU5QixxQ0FBbUM7O0lBQ25DLDBDQUEwQzs7SUFDMUMsc0NBQXNDOztJQUN0QyxzQ0FBc0M7O0lBQ3RDLHNDQUFzQzs7SUFDdEMsc0NBQXNDOztJQUN0QyxvQ0FBNkM7O0lBRTdDLHVDQUE2RDs7SUFFN0QsdUNBQTBCOztJQUMxQiw4Q0FBMkM7O0lBQzNDLHdDQUFrQjs7SUFDbEIseUNBQTBCOztJQUMxQiw2Q0FBK0I7O0lBQy9CLHlDQUEwQjs7SUFFMUIsb0NBQWM7O0lBQ2Qsc0NBQWdCOztJQUNoQixzQ0FBZ0I7O0lBQ2hCLHVDQUFpQjs7SUFFakIsMENBQXFCOztJQUNyQiw0Q0FBdUI7O0lBQ3ZCLDRDQUF1Qjs7SUFDdkIsMENBQXFCOztJQUNyQiw0Q0FBdUI7O0lBQ3ZCLDRDQUF1Qjs7SUFDdkIsaURBQTRCOztJQXVCNUIsa0NBRUU7O0lBRVUsZ0RBQTJDOztJQUMzQywyQ0FBaUM7O0lBQ2pDLGlDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZS1lbnVtJztcbmltcG9ydCB7U2luZ2xlQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NpbmdsZS1jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaW1lU2VsZWN0U2VydmljZSwgVGltZVVuaXR9IGZyb20gJy4vdGltZS1zZWxlY3Quc2VydmljZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0lUaW1lU2VsZWN0Q29uZmlnLCBJVGltZVNlbGVjdENvbmZpZ0ludGVybmFsfSBmcm9tICcuL3RpbWUtc2VsZWN0LWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7SURhdGV9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZGF0ZS5tb2RlbCc7XG5pbXBvcnQge0RhdGVWYWxpZGF0b3J9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92YWxpZGF0b3IudHlwZSc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZHAtdGltZS1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJ3RpbWUtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RpbWUtc2VsZWN0LmNvbXBvbmVudC5sZXNzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICBUaW1lU2VsZWN0U2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgQElucHV0KCkgY29uZmlnOiBJVGltZVNlbGVjdENvbmZpZztcbiAgQElucHV0KCkgZGlzcGxheURhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIEBJbnB1dCgpIG1pbkRhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIEBJbnB1dCgpIG1heERhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIEBJbnB1dCgpIG1pblRpbWU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIEBJbnB1dCgpIG1heFRpbWU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPElEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpc0luaXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb21wb25lbnRDb25maWc6IElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWw7XG4gIF9zZWxlY3RlZDogTW9tZW50O1xuICBpbnB1dFZhbHVlOiBDYWxlbmRhclZhbHVlO1xuICBpbnB1dFZhbHVlVHlwZTogRUNhbGVuZGFyVmFsdWU7XG4gIHZhbGlkYXRlRm46IERhdGVWYWxpZGF0b3I7XG5cbiAgaG91cnM6IHN0cmluZztcbiAgbWludXRlczogc3RyaW5nO1xuICBzZWNvbmRzOiBzdHJpbmc7XG4gIG1lcmlkaWVtOiBzdHJpbmc7XG5cbiAgc2hvd0RlY0hvdXI6IGJvb2xlYW47XG4gIHNob3dEZWNNaW51dGU6IGJvb2xlYW47XG4gIHNob3dEZWNTZWNvbmQ6IGJvb2xlYW47XG4gIHNob3dJbmNIb3VyOiBib29sZWFuO1xuICBzaG93SW5jTWludXRlOiBib29sZWFuO1xuICBzaG93SW5jU2Vjb25kOiBib29sZWFuO1xuICBzaG93VG9nZ2xlTWVyaWRpZW06IGJvb2xlYW47XG5cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBNb21lbnQpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMuY2FsY3VsYXRlVGltZVBhcnRzKHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy5zaG93RGVjSG91ciA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2Uuc2hvdWxkU2hvd0RlY3JlYXNlKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9zZWxlY3RlZCwgJ2hvdXInKTtcbiAgICB0aGlzLnNob3dEZWNNaW51dGUgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLnNob3VsZFNob3dEZWNyZWFzZSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fc2VsZWN0ZWQsICdtaW51dGUnKTtcbiAgICB0aGlzLnNob3dEZWNTZWNvbmQgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLnNob3VsZFNob3dEZWNyZWFzZSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fc2VsZWN0ZWQsICdzZWNvbmQnKTtcblxuICAgIHRoaXMuc2hvd0luY0hvdXIgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLnNob3VsZFNob3dJbmNyZWFzZSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fc2VsZWN0ZWQsICdob3VyJyk7XG4gICAgdGhpcy5zaG93SW5jTWludXRlID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5zaG91bGRTaG93SW5jcmVhc2UodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuX3NlbGVjdGVkLCAnbWludXRlJyk7XG4gICAgdGhpcy5zaG93SW5jU2Vjb25kID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5zaG91bGRTaG93SW5jcmVhc2UodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuX3NlbGVjdGVkLCAnc2Vjb25kJyk7XG5cbiAgICB0aGlzLnNob3dUb2dnbGVNZXJpZGllbSA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2Uuc2hvdWxkU2hvd1RvZ2dsZU1lcmlkaWVtKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9zZWxlY3RlZCk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZCkpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkKCk6IE1vbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgYXBpID0ge1xuICAgIHRyaWdnZXJDaGFuZ2U6IHRoaXMuZW1pdENoYW5nZS5iaW5kKHRoaXMpXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRpbWVTZWxlY3RTZXJ2aWNlOiBUaW1lU2VsZWN0U2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzSW5pdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29tcG9uZW50Q29uZmlnID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkIHx8IG1vbWVudCgpO1xuICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCBmYWxzZSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuaXNJbml0ZWQpIHtcbiAgICAgIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBtaW5UaW1lLCBtYXhUaW1lfSA9IGNoYW5nZXM7XG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgaWYgKG1pbkRhdGUgfHwgbWF4RGF0ZSB8fCBtaW5UaW1lIHx8IG1heFRpbWUpIHtcbiAgICAgICAgdGhpcy5pbml0VmFsaWRhdG9ycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IENhbGVuZGFyVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgbW9tZW50VmFsdWUgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAuY29udmVydFRvTW9tZW50QXJyYXkodmFsdWUsIHRoaXMudGltZVNlbGVjdFNlcnZpY2UuZ2V0VGltZUZvcm1hdCh0aGlzLmNvbXBvbmVudENvbmZpZyksIGZhbHNlKVswXTtcbiAgICAgIGlmIChtb21lbnRWYWx1ZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG1vbWVudFZhbHVlO1xuICAgICAgICB0aGlzLmlucHV0VmFsdWVUeXBlID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgICAuZ2V0SW5wdXRUeXBlKHRoaXMuaW5wdXRWYWx1ZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlQ2FsbGJhY2soXzogYW55KSB7XG4gIH07XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICB9XG5cbiAgdmFsaWRhdGUoZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IGFueSB7XG4gICAgaWYgKHRoaXMubWluRGF0ZSB8fCB0aGlzLm1heERhdGUgfHwgdGhpcy5taW5UaW1lIHx8IHRoaXMubWF4VGltZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVGbihmb3JtQ29udHJvbC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoKSA9PiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHZhbHVlOiBNb21lbnQpOiBDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydEZyb21Nb21lbnRBcnJheShcbiAgICAgIHRoaXMudGltZVNlbGVjdFNlcnZpY2UuZ2V0VGltZUZvcm1hdCh0aGlzLmNvbXBvbmVudENvbmZpZyksXG4gICAgICBbdmFsdWVdLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUgfHwgdGhpcy5pbnB1dFZhbHVlVHlwZVxuICAgICk7XG4gIH1cblxuICBpbml0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVWYWxpZGF0b3IoXG4gICAgICB7XG4gICAgICAgIG1pbkRhdGU6IHRoaXMubWluRGF0ZSxcbiAgICAgICAgbWF4RGF0ZTogdGhpcy5tYXhEYXRlLFxuICAgICAgICBtaW5UaW1lOiB0aGlzLm1pblRpbWUsXG4gICAgICAgIG1heFRpbWU6IHRoaXMubWF4VGltZVxuICAgICAgfSwgdW5kZWZpbmVkLCAnZGF5Jyk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkKSk7XG4gIH1cblxuICBkZWNyZWFzZSh1bml0OiBUaW1lVW5pdCkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmRlY3JlYXNlKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLnNlbGVjdGVkLCB1bml0KTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxuXG4gIGluY3JlYXNlKHVuaXQ6IFRpbWVVbml0KSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2UuaW5jcmVhc2UodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuc2VsZWN0ZWQsIHVuaXQpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgdG9nZ2xlTWVyaWRpZW0oKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2UudG9nZ2xlTWVyaWRpZW0odGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICBlbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7ZGF0ZTogdGhpcy5zZWxlY3RlZCwgc2VsZWN0ZWQ6IGZhbHNlfSk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRpbWVQYXJ0cyh0aW1lOiBNb21lbnQpIHtcbiAgICB0aGlzLmhvdXJzID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRIb3Vycyh0aGlzLmNvbXBvbmVudENvbmZpZywgdGltZSk7XG4gICAgdGhpcy5taW51dGVzID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRNaW51dGVzKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aW1lKTtcbiAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldFNlY29uZHModGhpcy5jb21wb25lbnRDb25maWcsIHRpbWUpO1xuICAgIHRoaXMubWVyaWRpZW0gPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldE1lcmlkaWVtKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aW1lKTtcbiAgfVxufVxuIl19