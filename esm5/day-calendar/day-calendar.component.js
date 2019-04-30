/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ECalendarMode } from '../common/types/calendar-mode-enum';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { DayCalendarService } from './day-calendar.service';
import * as momentNs from 'moment';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
var moment = momentNs;
var DayCalendarComponent = /** @class */ (function () {
    function DayCalendarComponent(dayCalendarService, utilsService, cd) {
        this.dayCalendarService = dayCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new EventEmitter();
        this.onMonthSelect = new EventEmitter();
        this.onNavHeaderBtnClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.CalendarMode = ECalendarMode;
        this.isInited = false;
        this.currentCalendarMode = ECalendarMode.Day;
        this._shouldShowCurrent = true;
        this.api = {
            moveCalendarsBy: this.moveCalendarsBy.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this),
            toggleCalendarMode: this.toggleCalendarMode.bind(this)
        };
    }
    Object.defineProperty(DayCalendarComponent.prototype, "selected", {
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
    Object.defineProperty(DayCalendarComponent.prototype, "currentDateView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentDateView;
        },
        set: /**
         * @param {?} current
         * @return {?}
         */
        function (current) {
            this._currentDateView = current.clone();
            this.weeks = this.dayCalendarService
                .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
            this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
            this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.ngOnInit = /**
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
    DayCalendarComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.componentConfig = this.dayCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.weekdays = this.dayCalendarService
            .generateWeekdays(this.componentConfig.firstDayOfWeek);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
        this._shouldShowCurrent = this.shouldShowCurrent();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DayCalendarComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
            this.handleConfigChange(config);
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
    DayCalendarComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        else {
            this.selected = [];
        }
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DayCalendarComponent.prototype.registerOnChange = /**
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
    DayCalendarComponent.prototype.onChangeCallback = /**
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
    DayCalendarComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DayCalendarComponent.prototype.validate = /**
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
    DayCalendarComponent.prototype.processOnChangeCallback = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.initValidators = /**
     * @return {?}
     */
    function () {
        this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.dayClicked = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        if (day.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(day);
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.getDayBtnText = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.getDayBtnCssClass = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        /** @type {?} */
        var cssClasses = {
            'dp-selected': day.selected,
            'dp-current-month': day.currentMonth,
            'dp-prev-month': day.prevMonth,
            'dp-next-month': day.nextMonth,
            'dp-current-day': day.currentDay
        };
        /** @type {?} */
        var customCssClass = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
        if (customCssClass) {
            cssClasses[customCssClass] = true;
        }
        return cssClasses;
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.onLeftNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, -1, 'month');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.onRightNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, 1, 'month');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarLeftClick = /**
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
    DayCalendarComponent.prototype.onMonthCalendarRightClick = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarSecondaryLeftClick = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarSecondaryRightClick = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} weekday
     * @return {?}
     */
    DayCalendarComponent.prototype.getWeekdayName = /**
     * @param {?} weekday
     * @return {?}
     */
    function (weekday) {
        if (this.componentConfig.weekDayFormatter) {
            return this.componentConfig.weekDayFormatter(weekday.day());
        }
        return weekday.format(this.componentConfig.weekDayFormat);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    DayCalendarComponent.prototype.toggleCalendarMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        if (this.currentCalendarMode !== mode) {
            this.currentCalendarMode = mode;
            this.onNavHeaderBtnClick.emit(mode);
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DayCalendarComponent.prototype.monthSelected = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.currentDateView = month.date.clone();
        this.currentCalendarMode = ECalendarMode.Day;
        this.onMonthSelect.emit(month);
    };
    /**
     * @param {?} current
     * @param {?} amount
     * @param {?=} granularity
     * @return {?}
     */
    DayCalendarComponent.prototype.moveCalendarsBy = /**
     * @param {?} current
     * @param {?} amount
     * @param {?=} granularity
     * @return {?}
     */
    function (current, amount, granularity) {
        if (granularity === void 0) { granularity = 'month'; }
        this.currentDateView = current.clone().add(amount, granularity);
        this.cd.markForCheck();
    };
    /**
     * @param {?} to
     * @return {?}
     */
    DayCalendarComponent.prototype.moveCalendarTo = /**
     * @param {?} to
     * @return {?}
     */
    function (to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
        }
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.shouldShowCurrent = /**
     * @return {?}
     */
    function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'day', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.goToCurrent = /**
     * @return {?}
     */
    function () {
        this.currentDateView = moment();
        this.onGoToCurrent.emit();
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DayCalendarComponent.prototype.handleConfigChange = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (config) {
            /** @type {?} */
            var prevConf = this.dayCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            var currentConf = this.dayCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
    DayCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dp-day-calendar',
                    template: "<div class=\"dp-day-calendar-container\" *ngIf=\"currentCalendarMode ===  CalendarMode.Day\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [isLabelClickable]=\"componentConfig.enableMonthSelector\"\n      [showGoToCurrent]=\"_shouldShowCurrent\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode(CalendarMode.Month)\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\"\n       [ngClass]=\"{'dp-hide-near-month': !componentConfig.showNearMonthDays}\">\n    <div class=\"dp-weekdays\">\n      <span class=\"dp-calendar-weekday\"\n            *ngFor=\"let weekday of weekdays\"\n            [innerText]=\"getWeekdayName(weekday)\">\n      </span>\n    </div>\n    <div class=\"dp-calendar-week\" *ngFor=\"let week of weeks\">\n      <span class=\"dp-week-number\"\n            *ngIf=\"componentConfig.showWeekNumbers\"\n            [innerText]=\"week[0].date.isoWeek()\">\n      </span>\n      <button type=\"button\"\n              class=\"dp-calendar-day\"\n              *ngFor=\"let day of week\"\n              [attr.data-date]=\"day.date.format(componentConfig.format)\"\n              (click)=\"dayClicked(day)\"\n              [disabled]=\"day.disabled\"\n              [ngClass]=\"getDayBtnCssClass(day)\"\n              [innerText]=\"getDayBtnText(day)\">\n      </button>\n    </div>\n  </div>\n</div>\n\n<dp-month-calendar\n    *ngIf=\"currentCalendarMode ===  CalendarMode.Month\"\n    [config]=\"monthCalendarConfig\"\n    [displayDate]=\"_currentDateView\"\n    [theme]=\"theme\"\n    (onSelect)=\"monthSelected($event)\"\n    (onNavHeaderBtnClick)=\"toggleCalendarMode(CalendarMode.Day)\"\n    (onLeftNav)=\"onMonthCalendarLeftClick($event)\"\n    (onRightNav)=\"onMonthCalendarRightClick($event)\"\n    (onLeftSecondaryNav)=\"onMonthCalendarSecondaryLeftClick($event)\"\n    (onRightSecondaryNav)=\"onMonthCalendarSecondaryRightClick($event)\">\n</dp-month-calendar>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        DayCalendarService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DayCalendarComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DayCalendarComponent; })),
                            multi: true
                        }
                    ],
                    styles: ["dp-day-calendar{display:inline-block}dp-day-calendar .dp-day-calendar-container{background:#fff}dp-day-calendar .dp-calendar-wrapper{box-sizing:border-box;border:1px solid #000}dp-day-calendar .dp-calendar-wrapper .dp-calendar-weekday:first-child{border-left:none}dp-day-calendar .dp-weekdays{font-size:15px;margin-bottom:5px}dp-day-calendar .dp-calendar-weekday{box-sizing:border-box;display:inline-block;width:30px;text-align:center;border-left:1px solid #000;border-bottom:1px solid #000}dp-day-calendar .dp-calendar-day{box-sizing:border-box;width:30px;height:30px;cursor:pointer}dp-day-calendar .dp-selected{background:#106cc8;color:#fff}dp-day-calendar .dp-next-month,dp-day-calendar .dp-prev-month{opacity:.5}dp-day-calendar .dp-hide-near-month .dp-next-month,dp-day-calendar .dp-hide-near-month .dp-prev-month{visibility:hidden}dp-day-calendar .dp-week-number{position:absolute;font-size:9px}dp-day-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;color:#7a7a7a;border:none}dp-day-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-day-calendar.dp-material .dp-calendar-day,dp-day-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-day-calendar.dp-material .dp-calendar-day:hover,dp-day-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-day-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-day-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-day-calendar.dp-material .dp-current-day{border:1px solid #106cc8}"]
                }] }
    ];
    /** @nocollapse */
    DayCalendarComponent.ctorParameters = function () { return [
        { type: DayCalendarService },
        { type: UtilsService },
        { type: ChangeDetectorRef }
    ]; };
    DayCalendarComponent.propDecorators = {
        config: [{ type: Input }],
        displayDate: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
        onSelect: [{ type: Output }],
        onMonthSelect: [{ type: Output }],
        onNavHeaderBtnClick: [{ type: Output }],
        onGoToCurrent: [{ type: Output }],
        onLeftNav: [{ type: Output }],
        onRightNav: [{ type: Output }]
    };
    return DayCalendarComponent;
}());
export { DayCalendarComponent };
if (false) {
    /** @type {?} */
    DayCalendarComponent.prototype.config;
    /** @type {?} */
    DayCalendarComponent.prototype.displayDate;
    /** @type {?} */
    DayCalendarComponent.prototype.minDate;
    /** @type {?} */
    DayCalendarComponent.prototype.maxDate;
    /** @type {?} */
    DayCalendarComponent.prototype.theme;
    /** @type {?} */
    DayCalendarComponent.prototype.onSelect;
    /** @type {?} */
    DayCalendarComponent.prototype.onMonthSelect;
    /** @type {?} */
    DayCalendarComponent.prototype.onNavHeaderBtnClick;
    /** @type {?} */
    DayCalendarComponent.prototype.onGoToCurrent;
    /** @type {?} */
    DayCalendarComponent.prototype.onLeftNav;
    /** @type {?} */
    DayCalendarComponent.prototype.onRightNav;
    /** @type {?} */
    DayCalendarComponent.prototype.CalendarMode;
    /** @type {?} */
    DayCalendarComponent.prototype.isInited;
    /** @type {?} */
    DayCalendarComponent.prototype.componentConfig;
    /** @type {?} */
    DayCalendarComponent.prototype._selected;
    /** @type {?} */
    DayCalendarComponent.prototype.weeks;
    /** @type {?} */
    DayCalendarComponent.prototype.weekdays;
    /** @type {?} */
    DayCalendarComponent.prototype._currentDateView;
    /** @type {?} */
    DayCalendarComponent.prototype.inputValue;
    /** @type {?} */
    DayCalendarComponent.prototype.inputValueType;
    /** @type {?} */
    DayCalendarComponent.prototype.validateFn;
    /** @type {?} */
    DayCalendarComponent.prototype.currentCalendarMode;
    /** @type {?} */
    DayCalendarComponent.prototype.monthCalendarConfig;
    /** @type {?} */
    DayCalendarComponent.prototype._shouldShowCurrent;
    /** @type {?} */
    DayCalendarComponent.prototype.navLabel;
    /** @type {?} */
    DayCalendarComponent.prototype.showLeftNav;
    /** @type {?} */
    DayCalendarComponent.prototype.showRightNav;
    /** @type {?} */
    DayCalendarComponent.prototype.api;
    /** @type {?} */
    DayCalendarComponent.prototype.dayCalendarService;
    /** @type {?} */
    DayCalendarComponent.prototype.utilsService;
    /** @type {?} */
    DayCalendarComponent.prototype.cd;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBSW5DLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBR2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDOztJQUs5RCxNQUFNLEdBQUcsUUFBUTtBQUV2QjtJQWdGRSw4QkFBNEIsa0JBQXNDLEVBQ3RDLFlBQTBCLEVBQzFCLEVBQXFCO1FBRnJCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF0RHZDLGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsRCxrQkFBYSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELHdCQUFtQixHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RFLGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsY0FBUyxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELGVBQVUsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FB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LG9CQUFvQjs7O0lBRS9CLHNDQUFvQzs7SUFDcEMsMkNBQTBDOztJQUMxQyx1Q0FBeUI7O0lBQ3pCLHVDQUF5Qjs7SUFDekIscUNBQTZDOztJQUU3Qyx3Q0FBNEQ7O0lBQzVELDZDQUFtRTs7SUFDbkUsbURBQWdGOztJQUNoRiw2Q0FBaUU7O0lBQ2pFLHlDQUFrRTs7SUFDbEUsMENBQW1FOztJQUVuRSw0Q0FBNkI7O0lBQzdCLHdDQUEwQjs7SUFDMUIsK0NBQTRDOztJQUM1Qyx5Q0FBb0I7O0lBQ3BCLHFDQUFnQjs7SUFDaEIsd0NBQW1COztJQUNuQixnREFBeUI7O0lBQ3pCLDBDQUEwQjs7SUFDMUIsOENBQStCOztJQUMvQiwwQ0FBMEI7O0lBQzFCLG1EQUF1RDs7SUFDdkQsbURBQTBDOztJQUMxQyxrREFBbUM7O0lBQ25DLHdDQUFpQjs7SUFDakIsMkNBQXFCOztJQUNyQiw0Q0FBc0I7O0lBRXRCLG1DQUlFOztJQXdCVSxrREFBc0Q7O0lBQ3RELDRDQUEwQzs7SUFDMUMsa0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlLWVudW0nO1xuaW1wb3J0IHtTaW5nbGVDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2luZ2xlLWNhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7RUNhbGVuZGFyTW9kZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLW1vZGUtZW51bSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RheUNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9kYXktY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnQsIHVuaXRPZlRpbWV9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0lEYXlDYWxlbmRhckNvbmZpZywgSURheUNhbGVuZGFyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4vZGF5LWNhbGVuZGFyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge0lEYXl9IGZyb20gJy4vZGF5Lm1vZGVsJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtJTW9udGhDYWxlbmRhckNvbmZpZ30gZnJvbSAnLi4vbW9udGgtY2FsZW5kYXIvbW9udGgtY2FsZW5kYXItY29uZmlnJztcbmltcG9ydCB7SU1vbnRofSBmcm9tICcuLi9tb250aC1jYWxlbmRhci9tb250aC5tb2RlbCc7XG5pbXBvcnQge0RhdGVWYWxpZGF0b3J9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92YWxpZGF0b3IudHlwZSc7XG5pbXBvcnQge0lOYXZFdmVudH0gZnJvbSAnLi4vY29tbW9uL21vZGVscy9uYXZpZ2F0aW9uLWV2ZW50Lm1vZGVsJztcbmNvbnN0IG1vbWVudCA9IG1vbWVudE5zO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcC1kYXktY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJ2RheS1jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXktY2FsZW5kYXIuY29tcG9uZW50Lmxlc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIERheUNhbGVuZGFyU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERheUNhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF5Q2FsZW5kYXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF5Q2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG5cbiAgQElucHV0KCkgY29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWc7XG4gIEBJbnB1dCgpIGRpc3BsYXlEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASW5wdXQoKSBtaW5EYXRlOiBNb21lbnQ7XG4gIEBJbnB1dCgpIG1heERhdGU6IE1vbWVudDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8SURheT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbk1vbnRoU2VsZWN0OiBFdmVudEVtaXR0ZXI8SU1vbnRoPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTmF2SGVhZGVyQnRuQ2xpY2s6IEV2ZW50RW1pdHRlcjxFQ2FsZW5kYXJNb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uR29Ub0N1cnJlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTGVmdE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBDYWxlbmRhck1vZGUgPSBFQ2FsZW5kYXJNb2RlO1xuICBpc0luaXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb21wb25lbnRDb25maWc6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsO1xuICBfc2VsZWN0ZWQ6IE1vbWVudFtdO1xuICB3ZWVrczogSURheVtdW107XG4gIHdlZWtkYXlzOiBNb21lbnRbXTtcbiAgX2N1cnJlbnREYXRlVmlldzogTW9tZW50O1xuICBpbnB1dFZhbHVlOiBDYWxlbmRhclZhbHVlO1xuICBpbnB1dFZhbHVlVHlwZTogRUNhbGVuZGFyVmFsdWU7XG4gIHZhbGlkYXRlRm46IERhdGVWYWxpZGF0b3I7XG4gIGN1cnJlbnRDYWxlbmRhck1vZGU6IEVDYWxlbmRhck1vZGUgPSBFQ2FsZW5kYXJNb2RlLkRheTtcbiAgbW9udGhDYWxlbmRhckNvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWc7XG4gIF9zaG91bGRTaG93Q3VycmVudDogYm9vbGVhbiA9IHRydWU7XG4gIG5hdkxhYmVsOiBzdHJpbmc7XG4gIHNob3dMZWZ0TmF2OiBib29sZWFuO1xuICBzaG93UmlnaHROYXY6IGJvb2xlYW47XG5cbiAgYXBpID0ge1xuICAgIG1vdmVDYWxlbmRhcnNCeTogdGhpcy5tb3ZlQ2FsZW5kYXJzQnkuYmluZCh0aGlzKSxcbiAgICBtb3ZlQ2FsZW5kYXJUbzogdGhpcy5tb3ZlQ2FsZW5kYXJUby5iaW5kKHRoaXMpLFxuICAgIHRvZ2dsZUNhbGVuZGFyTW9kZTogdGhpcy50b2dnbGVDYWxlbmRhck1vZGUuYmluZCh0aGlzKVxuICB9O1xuXG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogTW9tZW50W10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHNlbGVjdGVkKSk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogTW9tZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBjdXJyZW50RGF0ZVZpZXcoY3VycmVudDogTW9tZW50KSB7XG4gICAgdGhpcy5fY3VycmVudERhdGVWaWV3ID0gY3VycmVudC5jbG9uZSgpO1xuICAgIHRoaXMud2Vla3MgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlTW9udGhBcnJheSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLm5hdkxhYmVsID0gdGhpcy5kYXlDYWxlbmRhclNlcnZpY2UuZ2V0SGVhZGVyTGFiZWwodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuX2N1cnJlbnREYXRlVmlldyk7XG4gICAgdGhpcy5zaG93TGVmdE5hdiA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLnNob3VsZFNob3dMZWZ0KHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbiwgdGhpcy5jdXJyZW50RGF0ZVZpZXcpO1xuICAgIHRoaXMuc2hvd1JpZ2h0TmF2ID0gdGhpcy5kYXlDYWxlbmRhclNlcnZpY2Uuc2hvdWxkU2hvd1JpZ2h0KHRoaXMuY29tcG9uZW50Q29uZmlnLm1heCwgdGhpcy5jdXJyZW50RGF0ZVZpZXcpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnREYXRlVmlldygpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGF0ZVZpZXc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZGF5Q2FsZW5kYXJTZXJ2aWNlOiBEYXlDYWxlbmRhclNlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0luaXRlZCA9IHRydWU7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0VmFsaWRhdG9ycygpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudENvbmZpZyA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQgfHwgW107XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmRpc3BsYXlEYXRlXG4gICAgICA/IHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRUb01vbWVudCh0aGlzLmRpc3BsYXlEYXRlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpLmNsb25lKClcbiAgICAgIDogdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgLmdldERlZmF1bHREaXNwbGF5RGF0ZShcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlVmlldyxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QsXG4gICAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWluXG4gICAgICAgICk7XG4gICAgdGhpcy53ZWVrZGF5cyA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlXG4gICAgICAuZ2VuZXJhdGVXZWVrZGF5cyh0aGlzLmNvbXBvbmVudENvbmZpZy5maXJzdERheU9mV2Vlayk7XG4gICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgIHRoaXMubW9udGhDYWxlbmRhckNvbmZpZyA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldE1vbnRoQ2FsZW5kYXJDb25maWcodGhpcy5jb21wb25lbnRDb25maWcpO1xuICAgIHRoaXMuX3Nob3VsZFNob3dDdXJyZW50ID0gdGhpcy5zaG91bGRTaG93Q3VycmVudCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmlzSW5pdGVkKSB7XG4gICAgICBjb25zdCB7bWluRGF0ZSwgbWF4RGF0ZSwgY29uZmlnfSA9IGNoYW5nZXM7XG5cbiAgICAgIHRoaXMuaGFuZGxlQ29uZmlnQ2hhbmdlKGNvbmZpZyk7XG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgaWYgKG1pbkRhdGUgfHwgbWF4RGF0ZSkge1xuICAgICAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogQ2FsZW5kYXJWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgLmNvbnZlcnRUb01vbWVudEFycmF5KHZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMud2Vla3MgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlTW9udGhBcnJheSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25DaGFuZ2VDYWxsYmFjayhfOiBhbnkpIHtcbiAgfTtcblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gIH1cblxuICB2YWxpZGF0ZShmb3JtQ29udHJvbDogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgYW55IHtcbiAgICBpZiAodGhpcy5taW5EYXRlIHx8IHRoaXMubWF4RGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVGbihmb3JtQ29udHJvbC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoKSA9PiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHZhbHVlOiBNb21lbnRbXSk6IENhbGVuZGFyVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0RnJvbU1vbWVudEFycmF5KFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgdmFsdWUsXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5yZXR1cm5lZFZhbHVlVHlwZSB8fCB0aGlzLmlucHV0VmFsdWVUeXBlXG4gICAgKTtcbiAgfVxuXG4gIGluaXRWYWxpZGF0b3JzKCkge1xuICAgIHRoaXMudmFsaWRhdGVGbiA9IHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZVZhbGlkYXRvcihcbiAgICAgIHttaW5EYXRlOiB0aGlzLm1pbkRhdGUsIG1heERhdGU6IHRoaXMubWF4RGF0ZX0sXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsXG4gICAgICAnZGF5J1xuICAgICk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkKSk7XG4gIH1cblxuICBkYXlDbGlja2VkKGRheTogSURheSkge1xuICAgIGlmIChkYXkuc2VsZWN0ZWQgJiYgIXRoaXMuY29tcG9uZW50Q29uZmlnLnVuU2VsZWN0T25DbGljaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgLnVwZGF0ZVNlbGVjdGVkKHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QsIHRoaXMuc2VsZWN0ZWQsIGRheSk7XG4gICAgdGhpcy53ZWVrcyA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlXG4gICAgICAuZ2VuZXJhdGVNb250aEFycmF5KHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KGRheSk7XG4gIH1cblxuICBnZXREYXlCdG5UZXh0KGRheTogSURheSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldERheUJ0blRleHQodGhpcy5jb21wb25lbnRDb25maWcsIGRheS5kYXRlKTtcbiAgfVxuXG4gIGdldERheUJ0bkNzc0NsYXNzKGRheTogSURheSk6IHtba2xhc3M6IHN0cmluZ106IGJvb2xlYW59IHtcbiAgICBjb25zdCBjc3NDbGFzc2VzOiB7W2tsYXNzOiBzdHJpbmddOiBib29sZWFufSA9IHtcbiAgICAgICdkcC1zZWxlY3RlZCc6IGRheS5zZWxlY3RlZCxcbiAgICAgICdkcC1jdXJyZW50LW1vbnRoJzogZGF5LmN1cnJlbnRNb250aCxcbiAgICAgICdkcC1wcmV2LW1vbnRoJzogZGF5LnByZXZNb250aCxcbiAgICAgICdkcC1uZXh0LW1vbnRoJzogZGF5Lm5leHRNb250aCxcbiAgICAgICdkcC1jdXJyZW50LWRheSc6IGRheS5jdXJyZW50RGF5XG4gICAgfTtcbiAgICBjb25zdCBjdXN0b21Dc3NDbGFzczogc3RyaW5nID0gdGhpcy5kYXlDYWxlbmRhclNlcnZpY2UuZ2V0RGF5QnRuQ3NzQ2xhc3ModGhpcy5jb21wb25lbnRDb25maWcsIGRheS5kYXRlKTtcbiAgICBpZiAoY3VzdG9tQ3NzQ2xhc3MpIHtcbiAgICAgIGNzc0NsYXNzZXNbY3VzdG9tQ3NzQ2xhc3NdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIG9uTGVmdE5hdkNsaWNrKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMubW92ZUNhbGVuZGFyc0J5KHRoaXMuY3VycmVudERhdGVWaWV3LCAtMSwgJ21vbnRoJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMub25MZWZ0TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvblJpZ2h0TmF2Q2xpY2soKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5tb3ZlQ2FsZW5kYXJzQnkodGhpcy5jdXJyZW50RGF0ZVZpZXcsIDEsICdtb250aCcpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm9uUmlnaHROYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uTW9udGhDYWxlbmRhckxlZnRDbGljayhjaGFuZ2U6IElOYXZFdmVudCkge1xuICAgIHRoaXMub25MZWZ0TmF2LmVtaXQoY2hhbmdlKTtcbiAgfVxuXG4gIG9uTW9udGhDYWxlbmRhclJpZ2h0Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uUmlnaHROYXYuZW1pdChjaGFuZ2UpO1xuICB9XG5cbiAgb25Nb250aENhbGVuZGFyU2Vjb25kYXJ5TGVmdENsaWNrKGNoYW5nZTogSU5hdkV2ZW50KSB7XG4gICAgdGhpcy5vblJpZ2h0TmF2LmVtaXQoY2hhbmdlKTtcbiAgfVxuXG4gIG9uTW9udGhDYWxlbmRhclNlY29uZGFyeVJpZ2h0Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uTGVmdE5hdi5lbWl0KGNoYW5nZSk7XG4gIH1cblxuICBnZXRXZWVrZGF5TmFtZSh3ZWVrZGF5OiBNb21lbnQpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudENvbmZpZy53ZWVrRGF5Rm9ybWF0dGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRDb25maWcud2Vla0RheUZvcm1hdHRlcih3ZWVrZGF5LmRheSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2Vla2RheS5mb3JtYXQodGhpcy5jb21wb25lbnRDb25maWcud2Vla0RheUZvcm1hdCk7XG4gIH1cblxuICB0b2dnbGVDYWxlbmRhck1vZGUobW9kZTogRUNhbGVuZGFyTW9kZSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRDYWxlbmRhck1vZGUgIT09IG1vZGUpIHtcbiAgICAgIHRoaXMuY3VycmVudENhbGVuZGFyTW9kZSA9IG1vZGU7XG4gICAgICB0aGlzLm9uTmF2SGVhZGVyQnRuQ2xpY2suZW1pdChtb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbW9udGhTZWxlY3RlZChtb250aDogSU1vbnRoKSB7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSBtb250aC5kYXRlLmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50Q2FsZW5kYXJNb2RlID0gRUNhbGVuZGFyTW9kZS5EYXk7XG4gICAgdGhpcy5vbk1vbnRoU2VsZWN0LmVtaXQobW9udGgpO1xuICB9XG5cbiAgbW92ZUNhbGVuZGFyc0J5KGN1cnJlbnQ6IE1vbWVudCwgYW1vdW50OiBudW1iZXIsIGdyYW51bGFyaXR5OiB1bml0T2ZUaW1lLkJhc2UgPSAnbW9udGgnKSB7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSBjdXJyZW50LmNsb25lKCkuYWRkKGFtb3VudCwgZ3JhbnVsYXJpdHkpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBtb3ZlQ2FsZW5kYXJUbyh0bzogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIGlmICh0bykge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9Nb21lbnQodG8sIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCk7XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNob3VsZFNob3dDdXJyZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5zaG91bGRTaG93Q3VycmVudChcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dHb1RvQ3VycmVudCxcbiAgICAgICdkYXknLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWluLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWF4XG4gICAgKTtcbiAgfVxuXG4gIGdvVG9DdXJyZW50KCkge1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gbW9tZW50KCk7XG4gICAgdGhpcy5vbkdvVG9DdXJyZW50LmVtaXQoKTtcbiAgfVxuXG4gIGhhbmRsZUNvbmZpZ0NoYW5nZShjb25maWc6IFNpbXBsZUNoYW5nZSkge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIGNvbnN0IHByZXZDb25mOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbCA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyhjb25maWcucHJldmlvdXNWYWx1ZSk7XG4gICAgICBjb25zdCBjdXJyZW50Q29uZjogSURheUNhbGVuZGFyQ29uZmlnSW50ZXJuYWwgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZS5nZXRDb25maWcoY29uZmlnLmN1cnJlbnRWYWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLnV0aWxzU2VydmljZS5zaG91bGRSZXNldEN1cnJlbnRWaWV3KHByZXZDb25mLCBjdXJyZW50Q29uZikpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudERhdGVWaWV3ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==