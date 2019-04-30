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
const moment = momentNs;
export class TimeSelectComponent {
    /**
     * @param {?} timeSelectService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(timeSelectService, utilsService, cd) {
        this.timeSelectService = timeSelectService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.isInited = false;
        this.api = {
            triggerChange: this.emitChange.bind(this)
        };
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
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
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInited = true;
        this.init();
        this.initValidators();
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.timeSelectService.getConfig(this.config);
        this.selected = this.selected || moment();
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate, minTime, maxTime } = changes;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputValue = value;
        if (value) {
            /** @type {?} */
            const momentValue = this.utilsService
                .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
            if (momentValue.isValid()) {
                this.selected = momentValue;
                this.inputValueType = this.utilsService
                    .getInputType(this.inputValue, false);
            }
        }
        this.cd.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    onChangeCallback(_) {
    }
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return (/**
             * @return {?}
             */
            () => null);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    processOnChangeCallback(value) {
        return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, undefined, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    decrease(unit) {
        this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
        this.emitChange();
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    increase(unit) {
        this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
        this.emitChange();
    }
    /**
     * @return {?}
     */
    toggleMeridiem() {
        this.selected = this.timeSelectService.toggleMeridiem(this.selected);
        this.emitChange();
    }
    /**
     * @return {?}
     */
    emitChange() {
        this.onChange.emit({ date: this.selected, selected: false });
        this.cd.markForCheck();
    }
    /**
     * @param {?} time
     * @return {?}
     */
    calculateTimeParts(time) {
        this.hours = this.timeSelectService.getHours(this.componentConfig, time);
        this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
        this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
        this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
    }
}
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
                        () => TimeSelectComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => TimeSelectComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-time-select{display:inline-block}dp-time-select .dp-time-select-controls{margin:0;padding:0;text-align:center;line-height:normal;background:#fff}dp-time-select .dp-time-select-control{display:inline-block;width:35px;margin:0 auto;vertical-align:middle;font-size:inherit;letter-spacing:1px}dp-time-select .dp-time-select-control-down,dp-time-select .dp-time-select-control-up{position:relative;display:block;width:24px;height:24px;margin:3px auto;cursor:pointer}dp-time-select .dp-time-select-control-down::before,dp-time-select .dp-time-select-control-up::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0}dp-time-select .dp-time-select-control-up::before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);top:4px}dp-time-select .dp-time-select-control-down::before{-webkit-transform:rotate(135deg);transform:rotate(135deg)}dp-time-select .dp-time-select-separator{width:5px}dp-time-select.dp-material .dp-time-select-control-down,dp-time-select.dp-material .dp-time-select-control-up{box-sizing:border-box;background:0 0;border:none;outline:0;border-radius:50%}dp-time-select.dp-material .dp-time-select-control-down::before,dp-time-select.dp-material .dp-time-select-control-up::before{left:0}dp-time-select.dp-material .dp-time-select-control-down:hover,dp-time-select.dp-material .dp-time-select-control-up:hover{background:#e0e0e0}"]
            }] }
];
/** @nocollapse */
TimeSelectComponent.ctorParameters = () => [
    { type: TimeSelectService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsidGltZS1zZWxlY3QvdGltZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7O01BRzlELE1BQU0sR0FBRyxRQUFRO0FBc0J2QixNQUFNLE9BQU8sbUJBQW1COzs7Ozs7SUF5RDlCLFlBQW1CLGlCQUFvQyxFQUNwQyxZQUEwQixFQUMxQixFQUFxQjtRQUZyQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBakQ5QixhQUFRLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0QsYUFBUSxHQUFZLEtBQUssQ0FBQztRQXlDMUIsUUFBRyxHQUFHO1lBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMxQyxDQUFDO0lBS0YsQ0FBQzs7Ozs7SUE1QkQsSUFBSSxRQUFRLENBQUMsUUFBZ0I7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixD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Q0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO29CQUNMLFdBQVcsU0FBQyxPQUFPLGNBQUcsS0FBSzt1QkFFM0IsTUFBTTs7OztJQVJQLHFDQUFtQzs7SUFDbkMsMENBQTBDOztJQUMxQyxzQ0FBc0M7O0lBQ3RDLHNDQUFzQzs7SUFDdEMsc0NBQXNDOztJQUN0QyxzQ0FBc0M7O0lBQ3RDLG9DQUE2Qzs7SUFFN0MsdUNBQTZEOztJQUU3RCx1Q0FBMEI7O0lBQzFCLDhDQUEyQzs7SUFDM0Msd0NBQWtCOztJQUNsQix5Q0FBMEI7O0lBQzFCLDZDQUErQjs7SUFDL0IseUNBQTBCOztJQUUxQixvQ0FBYzs7SUFDZCxzQ0FBZ0I7O0lBQ2hCLHNDQUFnQjs7SUFDaEIsdUNBQWlCOztJQUVqQiwwQ0FBcUI7O0lBQ3JCLDRDQUF1Qjs7SUFDdkIsNENBQXVCOztJQUN2QiwwQ0FBcUI7O0lBQ3JCLDRDQUF1Qjs7SUFDdkIsNENBQXVCOztJQUN2QixpREFBNEI7O0lBdUI1QixrQ0FFRTs7SUFFVSxnREFBMkM7O0lBQzNDLDJDQUFpQzs7SUFDakMsaUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlLWVudW0nO1xuaW1wb3J0IHtTaW5nbGVDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2luZ2xlLWNhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RpbWVTZWxlY3RTZXJ2aWNlLCBUaW1lVW5pdH0gZnJvbSAnLi90aW1lLXNlbGVjdC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7SVRpbWVTZWxlY3RDb25maWcsIElUaW1lU2VsZWN0Q29uZmlnSW50ZXJuYWx9IGZyb20gJy4vdGltZS1zZWxlY3QtY29uZmlnLm1vZGVsJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF0ZX0gZnJvbSAnLi4vY29tbW9uL21vZGVscy9kYXRlLm1vZGVsJztcbmltcG9ydCB7RGF0ZVZhbGlkYXRvcn0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZhbGlkYXRvci50eXBlJztcbmNvbnN0IG1vbWVudCA9IG1vbWVudE5zO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcC10aW1lLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAndGltZS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGltZS1zZWxlY3QuY29tcG9uZW50Lmxlc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIFRpbWVTZWxlY3RTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVNlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGltZVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICBASW5wdXQoKSBjb25maWc6IElUaW1lU2VsZWN0Q29uZmlnO1xuICBASW5wdXQoKSBkaXNwbGF5RGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWluRGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWF4RGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWluVGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWF4VGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SURhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlzSW5pdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbXBvbmVudENvbmZpZzogSVRpbWVTZWxlY3RDb25maWdJbnRlcm5hbDtcbiAgX3NlbGVjdGVkOiBNb21lbnQ7XG4gIGlucHV0VmFsdWU6IENhbGVuZGFyVmFsdWU7XG4gIGlucHV0VmFsdWVUeXBlOiBFQ2FsZW5kYXJWYWx1ZTtcbiAgdmFsaWRhdGVGbjogRGF0ZVZhbGlkYXRvcjtcblxuICBob3Vyczogc3RyaW5nO1xuICBtaW51dGVzOiBzdHJpbmc7XG4gIHNlY29uZHM6IHN0cmluZztcbiAgbWVyaWRpZW06IHN0cmluZztcblxuICBzaG93RGVjSG91cjogYm9vbGVhbjtcbiAgc2hvd0RlY01pbnV0ZTogYm9vbGVhbjtcbiAgc2hvd0RlY1NlY29uZDogYm9vbGVhbjtcbiAgc2hvd0luY0hvdXI6IGJvb2xlYW47XG4gIHNob3dJbmNNaW51dGU6IGJvb2xlYW47XG4gIHNob3dJbmNTZWNvbmQ6IGJvb2xlYW47XG4gIHNob3dUb2dnbGVNZXJpZGllbTogYm9vbGVhbjtcblxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IE1vbWVudCkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5jYWxjdWxhdGVUaW1lUGFydHModGhpcy5zZWxlY3RlZCk7XG5cbiAgICB0aGlzLnNob3dEZWNIb3VyID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5zaG91bGRTaG93RGVjcmVhc2UodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuX3NlbGVjdGVkLCAnaG91cicpO1xuICAgIHRoaXMuc2hvd0RlY01pbnV0ZSA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2Uuc2hvdWxkU2hvd0RlY3JlYXNlKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9zZWxlY3RlZCwgJ21pbnV0ZScpO1xuICAgIHRoaXMuc2hvd0RlY1NlY29uZCA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2Uuc2hvdWxkU2hvd0RlY3JlYXNlKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9zZWxlY3RlZCwgJ3NlY29uZCcpO1xuXG4gICAgdGhpcy5zaG93SW5jSG91ciA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2Uuc2hvdWxkU2hvd0luY3JlYXNlKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9zZWxlY3RlZCwgJ2hvdXInKTtcbiAgICB0aGlzLnNob3dJbmNNaW51dGUgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLnNob3VsZFNob3dJbmNyZWFzZSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fc2VsZWN0ZWQsICdtaW51dGUnKTtcbiAgICB0aGlzLnNob3dJbmNTZWNvbmQgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLnNob3VsZFNob3dJbmNyZWFzZSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fc2VsZWN0ZWQsICdzZWNvbmQnKTtcblxuICAgIHRoaXMuc2hvd1RvZ2dsZU1lcmlkaWVtID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5zaG91bGRTaG93VG9nZ2xlTWVyaWRpZW0odGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuX3NlbGVjdGVkKTtcblxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHNlbGVjdGVkKSk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBhcGkgPSB7XG4gICAgdHJpZ2dlckNoYW5nZTogdGhpcy5lbWl0Q2hhbmdlLmJpbmQodGhpcylcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGltZVNlbGVjdFNlcnZpY2U6IFRpbWVTZWxlY3RTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXNJbml0ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb21wb25lbnRDb25maWcgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQgfHwgbW9tZW50KCk7XG4gICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIGZhbHNlKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5pc0luaXRlZCkge1xuICAgICAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIG1pblRpbWUsIG1heFRpbWV9ID0gY2hhbmdlcztcbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICBpZiAobWluRGF0ZSB8fCBtYXhEYXRlIHx8IG1pblRpbWUgfHwgbWF4VGltZSkge1xuICAgICAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogQ2FsZW5kYXJWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBtb21lbnRWYWx1ZSA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5jb252ZXJ0VG9Nb21lbnRBcnJheSh2YWx1ZSwgdGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRUaW1lRm9ybWF0KHRoaXMuY29tcG9uZW50Q29uZmlnKSwgZmFsc2UpWzBdO1xuICAgICAgaWYgKG1vbWVudFZhbHVlLmlzVmFsaWQoKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbW9tZW50VmFsdWU7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAgIC5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25DaGFuZ2VDYWxsYmFjayhfOiBhbnkpIHtcbiAgfTtcblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gIH1cblxuICB2YWxpZGF0ZShmb3JtQ29udHJvbDogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgYW55IHtcbiAgICBpZiAodGhpcy5taW5EYXRlIHx8IHRoaXMubWF4RGF0ZSB8fCB0aGlzLm1pblRpbWUgfHwgdGhpcy5tYXhUaW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUZuKGZvcm1Db250cm9sLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICgpID0+IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2sodmFsdWU6IE1vbWVudCk6IENhbGVuZGFyVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0RnJvbU1vbWVudEFycmF5KFxuICAgICAgdGhpcy50aW1lU2VsZWN0U2VydmljZS5nZXRUaW1lRm9ybWF0KHRoaXMuY29tcG9uZW50Q29uZmlnKSxcbiAgICAgIFt2YWx1ZV0sXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5yZXR1cm5lZFZhbHVlVHlwZSB8fCB0aGlzLmlucHV0VmFsdWVUeXBlXG4gICAgKTtcbiAgfVxuXG4gIGluaXRWYWxpZGF0b3JzKCkge1xuICAgIHRoaXMudmFsaWRhdGVGbiA9IHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZVZhbGlkYXRvcihcbiAgICAgIHtcbiAgICAgICAgbWluRGF0ZTogdGhpcy5taW5EYXRlLFxuICAgICAgICBtYXhEYXRlOiB0aGlzLm1heERhdGUsXG4gICAgICAgIG1pblRpbWU6IHRoaXMubWluVGltZSxcbiAgICAgICAgbWF4VGltZTogdGhpcy5tYXhUaW1lXG4gICAgICB9LCB1bmRlZmluZWQsICdkYXknKTtcblxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWQpKTtcbiAgfVxuXG4gIGRlY3JlYXNlKHVuaXQ6IFRpbWVVbml0KSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2UuZGVjcmVhc2UodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuc2VsZWN0ZWQsIHVuaXQpO1xuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xuICB9XG5cbiAgaW5jcmVhc2UodW5pdDogVGltZVVuaXQpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS5pbmNyZWFzZSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5zZWxlY3RlZCwgdW5pdCk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICB0b2dnbGVNZXJpZGllbSgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy50aW1lU2VsZWN0U2VydmljZS50b2dnbGVNZXJpZGllbSh0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcbiAgfVxuXG4gIGVtaXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtkYXRlOiB0aGlzLnNlbGVjdGVkLCBzZWxlY3RlZDogZmFsc2V9KTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgY2FsY3VsYXRlVGltZVBhcnRzKHRpbWU6IE1vbWVudCkge1xuICAgIHRoaXMuaG91cnMgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldEhvdXJzKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aW1lKTtcbiAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnRpbWVTZWxlY3RTZXJ2aWNlLmdldE1pbnV0ZXModGhpcy5jb21wb25lbnRDb25maWcsIHRpbWUpO1xuICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2UuZ2V0U2Vjb25kcyh0aGlzLmNvbXBvbmVudENvbmZpZywgdGltZSk7XG4gICAgdGhpcy5tZXJpZGllbSA9IHRoaXMudGltZVNlbGVjdFNlcnZpY2UuZ2V0TWVyaWRpZW0odGhpcy5jb21wb25lbnRDb25maWcsIHRpbWUpO1xuICB9XG59XG4iXX0=