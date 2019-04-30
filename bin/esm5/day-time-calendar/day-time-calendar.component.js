/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
import { DayCalendarService } from '../day-calendar/day-calendar.service';
import { TimeSelectService } from '../time-select/time-select.service';
import { DayTimeCalendarService } from './day-time-calendar.service';
import { DayCalendarComponent } from '../day-calendar/day-calendar.component';
var DayTimeCalendarComponent = /** @class */ (function () {
    function DayTimeCalendarComponent(dayTimeCalendarService, utilsService, cd) {
        this.dayTimeCalendarService = dayTimeCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.isInited = false;
        this.api = {
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(DayTimeCalendarComponent.prototype, "selected", {
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
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.ngOnInit = /**
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
    DayTimeCalendarComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, false)[0];
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, false);
        }
        else {
            this.selected = null;
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.registerOnChange = /**
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
    DayTimeCalendarComponent.prototype.onChangeCallback = /**
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
    DayTimeCalendarComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.validate = /**
     * @param {?} formControl
     * @return {?}
     */
    function (formControl) {
        if (this.minDate || this.maxDate) {
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
    DayTimeCalendarComponent.prototype.processOnChangeCallback = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, [value], this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.initValidators = /**
     * @return {?}
     */
    function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate
        }, undefined, 'daytime');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.dateSelected = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date, this.config);
        this.emitChange();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.timeChange = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.emitChange = /**
     * @return {?}
     */
    function () {
        this.onChange.emit({ date: this.selected, selected: false });
    };
    /**
     * @param {?} to
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.moveCalendarTo = /**
     * @param {?} to
     * @return {?}
     */
    function (to) {
        if (to) {
            this.dayCalendarRef.moveCalendarTo(to);
        }
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onLeftNavClick = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onRightNavClick = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        this.onRightNav.emit(change);
    };
    DayTimeCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dp-day-time-calendar',
                    template: "<dp-day-calendar #dayCalendar\n                 [config]=\"componentConfig\"\n                 [ngModel]=\"_selected\"\n                 [theme]=\"theme\"\n                 [displayDate]=\"displayDate\"\n                 (onSelect)=\"dateSelected($event)\"\n                 (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                 (onLeftNav)=\"onLeftNavClick($event)\"\n                 (onRightNav)=\"onRightNavClick($event)\">\n</dp-day-calendar>\n<dp-time-select #timeSelect\n                [config]=\"componentConfig\"\n                [ngModel]=\"_selected\"\n                (onChange)=\"timeChange($event)\"\n                [theme]=\"theme\">\n</dp-time-select>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        DayTimeCalendarService,
                        DayCalendarService,
                        TimeSelectService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DayTimeCalendarComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DayTimeCalendarComponent; })),
                            multi: true
                        }
                    ],
                    styles: ["dp-day-time-calendar{display:inline-block}dp-day-time-calendar dp-time-select{display:block;border:1px solid #000;border-top:0}dp-day-time-calendar.dp-material dp-time-select{border:1px solid #e0e0e0;border-top:0}"]
                }] }
    ];
    /** @nocollapse */
    DayTimeCalendarComponent.ctorParameters = function () { return [
        { type: DayTimeCalendarService },
        { type: UtilsService },
        { type: ChangeDetectorRef }
    ]; };
    DayTimeCalendarComponent.propDecorators = {
        config: [{ type: Input }],
        displayDate: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
        onChange: [{ type: Output }],
        onGoToCurrent: [{ type: Output }],
        onLeftNav: [{ type: Output }],
        onRightNav: [{ type: Output }],
        dayCalendarRef: [{ type: ViewChild, args: ['dayCalendar',] }]
    };
    return DayTimeCalendarComponent;
}());
export { DayTimeCalendarComponent };
if (false) {
    /** @type {?} */
    DayTimeCalendarComponent.prototype.config;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.displayDate;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.minDate;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.maxDate;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.theme;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.onChange;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.onGoToCurrent;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.onLeftNav;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.onRightNav;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.dayCalendarRef;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.isInited;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.componentConfig;
    /** @type {?} */
    DayTimeCalendarComponent.prototype._selected;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.inputValue;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.inputValueType;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.validateFn;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.api;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.dayTimeCalendarService;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.utilsService;
    /** @type {?} */
    DayTimeCalendarComponent.prototype.cd;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LXRpbWUtY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF5LXRpbWUtY2FsZW5kYXIvZGF5LXRpbWUtY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBR2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRXBFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRXJFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRzVFO0lBeURFLGtDQUFtQixzQkFBOEMsRUFDOUMsWUFBMEIsRUFDMUIsRUFBcUI7UUFGckIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTdCOUIsYUFBUSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsY0FBUyxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELGVBQVUsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUluRSxhQUFRLEdBQVks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bEtELElBa0tDO1NBNUlZLHdCQUF3Qjs7O0lBRW5DLDBDQUF3Qzs7SUFDeEMsK0NBQTBDOztJQUMxQywyQ0FBc0M7O0lBQ3RDLDJDQUFzQzs7SUFDdEMseUNBQTZDOztJQUU3Qyw0Q0FBNkQ7O0lBQzdELGlEQUFpRTs7SUFDakUsNkNBQWtFOztJQUNsRSw4Q0FBbUU7O0lBRW5FLGtEQUErRDs7SUFFL0QsNENBQTBCOztJQUMxQixtREFBd0M7O0lBQ3hDLDZDQUFrQjs7SUFDbEIsOENBQTBCOztJQUMxQixrREFBK0I7O0lBQy9CLDhDQUEwQjs7SUFXMUIsdUNBRUU7O0lBRVUsMERBQXFEOztJQUNyRCxnREFBaUM7O0lBQ2pDLHNDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZS1lbnVtJztcbmltcG9ydCB7U2luZ2xlQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NpbmdsZS1jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF0ZX0gZnJvbSAnLi4vY29tbW9uL21vZGVscy9kYXRlLm1vZGVsJztcbmltcG9ydCB7RGF5Q2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuLi9kYXktY2FsZW5kYXIvZGF5LWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtUaW1lU2VsZWN0U2VydmljZX0gZnJvbSAnLi4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3Quc2VydmljZSc7XG5pbXBvcnQge0lEYXlUaW1lQ2FsZW5kYXJDb25maWd9IGZyb20gJy4vZGF5LXRpbWUtY2FsZW5kYXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7RGF5VGltZUNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9kYXktdGltZS1jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZVZhbGlkYXRvcn0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZhbGlkYXRvci50eXBlJztcbmltcG9ydCB7RGF5Q2FsZW5kYXJDb21wb25lbnR9IGZyb20gJy4uL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7SU5hdkV2ZW50fSBmcm9tICcuLi9jb21tb24vbW9kZWxzL25hdmlnYXRpb24tZXZlbnQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcC1kYXktdGltZS1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAnZGF5LXRpbWUtY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF5LXRpbWUtY2FsZW5kYXIuY29tcG9uZW50Lmxlc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIERheVRpbWVDYWxlbmRhclNlcnZpY2UsXG4gICAgRGF5Q2FsZW5kYXJTZXJ2aWNlLFxuICAgIFRpbWVTZWxlY3RTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF5VGltZUNhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF5VGltZUNhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERheVRpbWVDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICBASW5wdXQoKSBjb25maWc6IElEYXlUaW1lQ2FsZW5kYXJDb25maWc7XG4gIEBJbnB1dCgpIGRpc3BsYXlEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASW5wdXQoKSBtaW5EYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASW5wdXQoKSBtYXhEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgQElucHV0KCkgdGhlbWU6IHN0cmluZztcblxuICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxJRGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkdvVG9DdXJyZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxlZnROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25SaWdodE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnZGF5Q2FsZW5kYXInKSBkYXlDYWxlbmRhclJlZjogRGF5Q2FsZW5kYXJDb21wb25lbnQ7XG5cbiAgaXNJbml0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29tcG9uZW50Q29uZmlnOiBJRGF5VGltZUNhbGVuZGFyQ29uZmlnO1xuICBfc2VsZWN0ZWQ6IE1vbWVudDtcbiAgaW5wdXRWYWx1ZTogQ2FsZW5kYXJWYWx1ZTtcbiAgaW5wdXRWYWx1ZVR5cGU6IEVDYWxlbmRhclZhbHVlO1xuICB2YWxpZGF0ZUZuOiBEYXRlVmFsaWRhdG9yO1xuXG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogTW9tZW50KSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZCkpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkKCk6IE1vbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgYXBpID0ge1xuICAgIG1vdmVDYWxlbmRhclRvOiB0aGlzLm1vdmVDYWxlbmRhclRvLmJpbmQodGhpcylcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF5VGltZUNhbGVuZGFyU2VydmljZTogRGF5VGltZUNhbGVuZGFyU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzSW5pdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29tcG9uZW50Q29uZmlnID0gdGhpcy5kYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIGZhbHNlKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5pc0luaXRlZCkge1xuICAgICAgY29uc3Qge21pbkRhdGUsIG1heERhdGV9ID0gY2hhbmdlcztcbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICBpZiAobWluRGF0ZSB8fCBtYXhEYXRlKSB7XG4gICAgICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBDYWxlbmRhclZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAuY29udmVydFRvTW9tZW50QXJyYXkodmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCwgZmFsc2UpWzBdO1xuICAgICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlQ2FsbGJhY2soXzogYW55KSB7XG4gIH07XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICB9XG5cbiAgdmFsaWRhdGUoZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IGFueSB7XG4gICAgaWYgKHRoaXMubWluRGF0ZSB8fCB0aGlzLm1heERhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRm4oZm9ybUNvbnRyb2wudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh2YWx1ZTogTW9tZW50KTogQ2FsZW5kYXJWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRGcm9tTW9tZW50QXJyYXkoXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsXG4gICAgICBbdmFsdWVdLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUgfHwgdGhpcy5pbnB1dFZhbHVlVHlwZVxuICAgICk7XG4gIH1cblxuICBpbml0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVWYWxpZGF0b3IoXG4gICAgICB7XG4gICAgICAgIG1pbkRhdGU6IHRoaXMubWluRGF0ZSxcbiAgICAgICAgbWF4RGF0ZTogdGhpcy5tYXhEYXRlXG4gICAgICB9LCB1bmRlZmluZWQsICdkYXl0aW1lJyk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkKSk7XG4gIH1cblxuICBkYXRlU2VsZWN0ZWQoZGF5OiBJRGF0ZSkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRheVRpbWVDYWxlbmRhclNlcnZpY2UudXBkYXRlRGF5KHRoaXMuc2VsZWN0ZWQsIGRheS5kYXRlLCB0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICB0aW1lQ2hhbmdlKHRpbWU6IElEYXRlKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF5VGltZUNhbGVuZGFyU2VydmljZS51cGRhdGVUaW1lKHRoaXMuc2VsZWN0ZWQsIHRpbWUuZGF0ZSk7XG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XG4gIH1cblxuICBlbWl0Q2hhbmdlKCkge1xuICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7ZGF0ZTogdGhpcy5zZWxlY3RlZCwgc2VsZWN0ZWQ6IGZhbHNlfSk7XG4gIH1cblxuICBtb3ZlQ2FsZW5kYXJUbyh0bzogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIGlmICh0bykge1xuICAgICAgdGhpcy5kYXlDYWxlbmRhclJlZi5tb3ZlQ2FsZW5kYXJUbyh0byk7XG4gICAgfVxuICB9XG5cbiAgb25MZWZ0TmF2Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uTGVmdE5hdi5lbWl0KGNoYW5nZSk7XG4gIH1cblxuICBvblJpZ2h0TmF2Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uUmlnaHROYXYuZW1pdChjaGFuZ2UpO1xuICB9XG59XG4iXX0=