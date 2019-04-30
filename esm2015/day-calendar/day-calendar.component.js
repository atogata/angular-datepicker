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
const moment = momentNs;
export class DayCalendarComponent {
    /**
     * @param {?} dayCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(dayCalendarService, utilsService, cd) {
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
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.onChangeCallback(this.processOnChangeCallback(selected));
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    set currentDateView(current) {
        this._currentDateView = current.clone();
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
        this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
        this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
        this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
    }
    /**
     * @return {?}
     */
    get currentDateView() {
        return this._currentDateView;
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInited) {
            const { minDate, maxDate, config } = changes;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
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
        if (this.minDate || this.maxDate) {
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
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    }
    /**
     * @return {?}
     */
    initValidators() {
        this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} day
     * @return {?}
     */
    dayClicked(day) {
        if (day.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(day);
    }
    /**
     * @param {?} day
     * @return {?}
     */
    getDayBtnText(day) {
        return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
    }
    /**
     * @param {?} day
     * @return {?}
     */
    getDayBtnCssClass(day) {
        /** @type {?} */
        const cssClasses = {
            'dp-selected': day.selected,
            'dp-current-month': day.currentMonth,
            'dp-prev-month': day.prevMonth,
            'dp-next-month': day.nextMonth,
            'dp-current-day': day.currentDay
        };
        /** @type {?} */
        const customCssClass = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
        if (customCssClass) {
            cssClasses[customCssClass] = true;
        }
        return cssClasses;
    }
    /**
     * @return {?}
     */
    onLeftNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, -1, 'month');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onLeftNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, 1, 'month');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightNav.emit({ from, to });
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarLeftClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarRightClick(change) {
        this.onRightNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarSecondaryLeftClick(change) {
        this.onRightNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onMonthCalendarSecondaryRightClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayName(weekday) {
        if (this.componentConfig.weekDayFormatter) {
            return this.componentConfig.weekDayFormatter(weekday.day());
        }
        return weekday.format(this.componentConfig.weekDayFormat);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    toggleCalendarMode(mode) {
        if (this.currentCalendarMode !== mode) {
            this.currentCalendarMode = mode;
            this.onNavHeaderBtnClick.emit(mode);
        }
        this.cd.markForCheck();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    monthSelected(month) {
        this.currentDateView = month.date.clone();
        this.currentCalendarMode = ECalendarMode.Day;
        this.onMonthSelect.emit(month);
    }
    /**
     * @param {?} current
     * @param {?} amount
     * @param {?=} granularity
     * @return {?}
     */
    moveCalendarsBy(current, amount, granularity = 'month') {
        this.currentDateView = current.clone().add(amount, granularity);
        this.cd.markForCheck();
    }
    /**
     * @param {?} to
     * @return {?}
     */
    moveCalendarTo(to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
        }
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    shouldShowCurrent() {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'day', this.componentConfig.min, this.componentConfig.max);
    }
    /**
     * @return {?}
     */
    goToCurrent() {
        this.currentDateView = moment();
        this.onGoToCurrent.emit();
    }
    /**
     * @param {?} config
     * @return {?}
     */
    handleConfigChange(config) {
        if (config) {
            /** @type {?} */
            const prevConf = this.dayCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            const currentConf = this.dayCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    }
}
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
                        () => DayCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DayCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-day-calendar{display:inline-block}dp-day-calendar .dp-day-calendar-container{background:#fff}dp-day-calendar .dp-calendar-wrapper{box-sizing:border-box;border:1px solid #000}dp-day-calendar .dp-calendar-wrapper .dp-calendar-weekday:first-child{border-left:none}dp-day-calendar .dp-weekdays{font-size:15px;margin-bottom:5px}dp-day-calendar .dp-calendar-weekday{box-sizing:border-box;display:inline-block;width:30px;text-align:center;border-left:1px solid #000;border-bottom:1px solid #000}dp-day-calendar .dp-calendar-day{box-sizing:border-box;width:30px;height:30px;cursor:pointer}dp-day-calendar .dp-selected{background:#106cc8;color:#fff}dp-day-calendar .dp-next-month,dp-day-calendar .dp-prev-month{opacity:.5}dp-day-calendar .dp-hide-near-month .dp-next-month,dp-day-calendar .dp-hide-near-month .dp-prev-month{visibility:hidden}dp-day-calendar .dp-week-number{position:absolute;font-size:9px}dp-day-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;color:#7a7a7a;border:none}dp-day-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-day-calendar.dp-material .dp-calendar-day,dp-day-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-day-calendar.dp-material .dp-calendar-day:hover,dp-day-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-day-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-day-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-day-calendar.dp-material .dp-current-day{border:1px solid #106cc8}"]
            }] }
];
/** @nocollapse */
DayCalendarComponent.ctorParameters = () => [
    { type: DayCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5LWNhbGVuZGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFHTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBSW5DLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBR2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDOztNQUs5RCxNQUFNLEdBQUcsUUFBUTtBQXNCdkIsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBNEQvQixZQUE0QixrQkFBc0MsRUFDdEMsWUFBMEIsRUFDMUIsRUFBcUI7UUFGckIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXREdkMsYUFBUSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGtCQUFhLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsd0JBQW1CLEdBQWdDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEUsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxjQUFTLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsZUFBVSxH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Qzs7SUFDMUMsa0RBQW1DOztJQUNuQyx3Q0FBaUI7O0lBQ2pCLDJDQUFxQjs7SUFDckIsNENBQXNCOztJQUV0QixtQ0FJRTs7SUF3QlUsa0RBQXNEOztJQUN0RCw0Q0FBMEM7O0lBQzFDLGtDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZS1lbnVtJztcbmltcG9ydCB7U2luZ2xlQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NpbmdsZS1jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge0VDYWxlbmRhck1vZGV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci1tb2RlLWVudW0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXlDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vZGF5LWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50TnMgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7TW9tZW50LCB1bml0T2ZUaW1lfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtJRGF5Q2FsZW5kYXJDb25maWcsIElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsfSBmcm9tICcuL2RheS1jYWxlbmRhci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtJRGF5fSBmcm9tICcuL2RheS5tb2RlbCc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7SU1vbnRoQ2FsZW5kYXJDb25maWd9IGZyb20gJy4uL21vbnRoLWNhbGVuZGFyL21vbnRoLWNhbGVuZGFyLWNvbmZpZyc7XG5pbXBvcnQge0lNb250aH0gZnJvbSAnLi4vbW9udGgtY2FsZW5kYXIvbW9udGgubW9kZWwnO1xuaW1wb3J0IHtEYXRlVmFsaWRhdG9yfSBmcm9tICcuLi9jb21tb24vdHlwZXMvdmFsaWRhdG9yLnR5cGUnO1xuaW1wb3J0IHtJTmF2RXZlbnR9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvbmF2aWdhdGlvbi1ldmVudC5tb2RlbCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZHAtZGF5LWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICdkYXktY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF5LWNhbGVuZGFyLmNvbXBvbmVudC5sZXNzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICBEYXlDYWxlbmRhclNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXlDYWxlbmRhckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERheUNhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIERheUNhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gIEBJbnB1dCgpIGNvbmZpZzogSURheUNhbGVuZGFyQ29uZmlnO1xuICBASW5wdXQoKSBkaXNwbGF5RGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWluRGF0ZTogTW9tZW50O1xuICBASW5wdXQoKSBtYXhEYXRlOiBNb21lbnQ7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPElEYXk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Nb250aFNlbGVjdDogRXZlbnRFbWl0dGVyPElNb250aD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbk5hdkhlYWRlckJ0bkNsaWNrOiBFdmVudEVtaXR0ZXI8RUNhbGVuZGFyTW9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkdvVG9DdXJyZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxlZnROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25SaWdodE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQ2FsZW5kYXJNb2RlID0gRUNhbGVuZGFyTW9kZTtcbiAgaXNJbml0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29tcG9uZW50Q29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWdJbnRlcm5hbDtcbiAgX3NlbGVjdGVkOiBNb21lbnRbXTtcbiAgd2Vla3M6IElEYXlbXVtdO1xuICB3ZWVrZGF5czogTW9tZW50W107XG4gIF9jdXJyZW50RGF0ZVZpZXc6IE1vbWVudDtcbiAgaW5wdXRWYWx1ZTogQ2FsZW5kYXJWYWx1ZTtcbiAgaW5wdXRWYWx1ZVR5cGU6IEVDYWxlbmRhclZhbHVlO1xuICB2YWxpZGF0ZUZuOiBEYXRlVmFsaWRhdG9yO1xuICBjdXJyZW50Q2FsZW5kYXJNb2RlOiBFQ2FsZW5kYXJNb2RlID0gRUNhbGVuZGFyTW9kZS5EYXk7XG4gIG1vbnRoQ2FsZW5kYXJDb25maWc6IElNb250aENhbGVuZGFyQ29uZmlnO1xuICBfc2hvdWxkU2hvd0N1cnJlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBuYXZMYWJlbDogc3RyaW5nO1xuICBzaG93TGVmdE5hdjogYm9vbGVhbjtcbiAgc2hvd1JpZ2h0TmF2OiBib29sZWFuO1xuXG4gIGFwaSA9IHtcbiAgICBtb3ZlQ2FsZW5kYXJzQnk6IHRoaXMubW92ZUNhbGVuZGFyc0J5LmJpbmQodGhpcyksXG4gICAgbW92ZUNhbGVuZGFyVG86IHRoaXMubW92ZUNhbGVuZGFyVG8uYmluZCh0aGlzKSxcbiAgICB0b2dnbGVDYWxlbmRhck1vZGU6IHRoaXMudG9nZ2xlQ2FsZW5kYXJNb2RlLmJpbmQodGhpcylcbiAgfTtcblxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IE1vbWVudFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZCkpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkKCk6IE1vbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXQgY3VycmVudERhdGVWaWV3KGN1cnJlbnQ6IE1vbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnREYXRlVmlldyA9IGN1cnJlbnQuY2xvbmUoKTtcbiAgICB0aGlzLndlZWtzID0gdGhpcy5kYXlDYWxlbmRhclNlcnZpY2VcbiAgICAgIC5nZW5lcmF0ZU1vbnRoQXJyYXkodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuX2N1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5uYXZMYWJlbCA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldEhlYWRlckxhYmVsKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9jdXJyZW50RGF0ZVZpZXcpO1xuICAgIHRoaXMuc2hvd0xlZnROYXYgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZS5zaG91bGRTaG93TGVmdCh0aGlzLmNvbXBvbmVudENvbmZpZy5taW4sIHRoaXMuY3VycmVudERhdGVWaWV3KTtcbiAgICB0aGlzLnNob3dSaWdodE5hdiA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLnNob3VsZFNob3dSaWdodCh0aGlzLmNvbXBvbmVudENvbmZpZy5tYXgsIHRoaXMuY3VycmVudERhdGVWaWV3KTtcbiAgfVxuXG4gIGdldCBjdXJyZW50RGF0ZVZpZXcoKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudERhdGVWaWV3O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGRheUNhbGVuZGFyU2VydmljZTogRGF5Q2FsZW5kYXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXNJbml0ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb21wb25lbnRDb25maWcgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZS5nZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkIHx8IFtdO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5kaXNwbGF5RGF0ZVxuICAgICAgPyB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9Nb21lbnQodGhpcy5kaXNwbGF5RGF0ZSwgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0KS5jbG9uZSgpXG4gICAgICA6IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5nZXREZWZhdWx0RGlzcGxheURhdGUoXG4gICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pblxuICAgICAgICApO1xuICAgIHRoaXMud2Vla2RheXMgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlV2Vla2RheXModGhpcy5jb21wb25lbnRDb25maWcuZmlyc3REYXlPZldlZWspO1xuICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICB0aGlzLm1vbnRoQ2FsZW5kYXJDb25maWcgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZS5nZXRNb250aENhbGVuZGFyQ29uZmlnKHRoaXMuY29tcG9uZW50Q29uZmlnKTtcbiAgICB0aGlzLl9zaG91bGRTaG93Q3VycmVudCA9IHRoaXMuc2hvdWxkU2hvd0N1cnJlbnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5pc0luaXRlZCkge1xuICAgICAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIGNvbmZpZ30gPSBjaGFuZ2VzO1xuXG4gICAgICB0aGlzLmhhbmRsZUNvbmZpZ0NoYW5nZShjb25maWcpO1xuICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgIGlmIChtaW5EYXRlIHx8IG1heERhdGUpIHtcbiAgICAgICAgdGhpcy5pbml0VmFsaWRhdG9ycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IENhbGVuZGFyVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5jb252ZXJ0VG9Nb21lbnRBcnJheSh2YWx1ZSwgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAuZ2V0SW5wdXRUeXBlKHRoaXMuaW5wdXRWYWx1ZSwgdGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLndlZWtzID0gdGhpcy5kYXlDYWxlbmRhclNlcnZpY2VcbiAgICAgIC5nZW5lcmF0ZU1vbnRoQXJyYXkodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlQ2FsbGJhY2soXzogYW55KSB7XG4gIH07XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICB9XG5cbiAgdmFsaWRhdGUoZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IGFueSB7XG4gICAgaWYgKHRoaXMubWluRGF0ZSB8fCB0aGlzLm1heERhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRm4oZm9ybUNvbnRyb2wudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh2YWx1ZTogTW9tZW50W10pOiBDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydEZyb21Nb21lbnRBcnJheShcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCxcbiAgICAgIHZhbHVlLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUgfHwgdGhpcy5pbnB1dFZhbHVlVHlwZVxuICAgICk7XG4gIH1cblxuICBpbml0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVWYWxpZGF0b3IoXG4gICAgICB7bWluRGF0ZTogdGhpcy5taW5EYXRlLCBtYXhEYXRlOiB0aGlzLm1heERhdGV9LFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgJ2RheSdcbiAgICApO1xuXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZCkpO1xuICB9XG5cbiAgZGF5Q2xpY2tlZChkYXk6IElEYXkpIHtcbiAgICBpZiAoZGF5LnNlbGVjdGVkICYmICF0aGlzLmNvbXBvbmVudENvbmZpZy51blNlbGVjdE9uQ2xpY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgIC51cGRhdGVTZWxlY3RlZCh0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LCB0aGlzLnNlbGVjdGVkLCBkYXkpO1xuICAgIHRoaXMud2Vla3MgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlTW9udGhBcnJheSh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdChkYXkpO1xuICB9XG5cbiAgZ2V0RGF5QnRuVGV4dChkYXk6IElEYXkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRheUNhbGVuZGFyU2VydmljZS5nZXREYXlCdG5UZXh0KHRoaXMuY29tcG9uZW50Q29uZmlnLCBkYXkuZGF0ZSk7XG4gIH1cblxuICBnZXREYXlCdG5Dc3NDbGFzcyhkYXk6IElEYXkpOiB7W2tsYXNzOiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgY29uc3QgY3NzQ2xhc3Nlczoge1trbGFzczogc3RyaW5nXTogYm9vbGVhbn0gPSB7XG4gICAgICAnZHAtc2VsZWN0ZWQnOiBkYXkuc2VsZWN0ZWQsXG4gICAgICAnZHAtY3VycmVudC1tb250aCc6IGRheS5jdXJyZW50TW9udGgsXG4gICAgICAnZHAtcHJldi1tb250aCc6IGRheS5wcmV2TW9udGgsXG4gICAgICAnZHAtbmV4dC1tb250aCc6IGRheS5uZXh0TW9udGgsXG4gICAgICAnZHAtY3VycmVudC1kYXknOiBkYXkuY3VycmVudERheVxuICAgIH07XG4gICAgY29uc3QgY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZyA9IHRoaXMuZGF5Q2FsZW5kYXJTZXJ2aWNlLmdldERheUJ0bkNzc0NsYXNzKHRoaXMuY29tcG9uZW50Q29uZmlnLCBkYXkuZGF0ZSk7XG4gICAgaWYgKGN1c3RvbUNzc0NsYXNzKSB7XG4gICAgICBjc3NDbGFzc2VzW2N1c3RvbUNzc0NsYXNzXSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBvbkxlZnROYXZDbGljaygpIHtcbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm1vdmVDYWxlbmRhcnNCeSh0aGlzLmN1cnJlbnREYXRlVmlldywgLTEsICdtb250aCcpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm9uTGVmdE5hdi5lbWl0KHtmcm9tLCB0b30pO1xuICB9XG5cbiAgb25SaWdodE5hdkNsaWNrKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMubW92ZUNhbGVuZGFyc0J5KHRoaXMuY3VycmVudERhdGVWaWV3LCAxLCAnbW9udGgnKTtcbiAgICBjb25zdCB0byA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5vblJpZ2h0TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvbk1vbnRoQ2FsZW5kYXJMZWZ0Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uTGVmdE5hdi5lbWl0KGNoYW5nZSk7XG4gIH1cblxuICBvbk1vbnRoQ2FsZW5kYXJSaWdodENsaWNrKGNoYW5nZTogSU5hdkV2ZW50KSB7XG4gICAgdGhpcy5vblJpZ2h0TmF2LmVtaXQoY2hhbmdlKTtcbiAgfVxuXG4gIG9uTW9udGhDYWxlbmRhclNlY29uZGFyeUxlZnRDbGljayhjaGFuZ2U6IElOYXZFdmVudCkge1xuICAgIHRoaXMub25SaWdodE5hdi5lbWl0KGNoYW5nZSk7XG4gIH1cblxuICBvbk1vbnRoQ2FsZW5kYXJTZWNvbmRhcnlSaWdodENsaWNrKGNoYW5nZTogSU5hdkV2ZW50KSB7XG4gICAgdGhpcy5vbkxlZnROYXYuZW1pdChjaGFuZ2UpO1xuICB9XG5cbiAgZ2V0V2Vla2RheU5hbWUod2Vla2RheTogTW9tZW50KTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRDb25maWcud2Vla0RheUZvcm1hdHRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Q29uZmlnLndlZWtEYXlGb3JtYXR0ZXIod2Vla2RheS5kYXkoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlZWtkYXkuZm9ybWF0KHRoaXMuY29tcG9uZW50Q29uZmlnLndlZWtEYXlGb3JtYXQpO1xuICB9XG5cbiAgdG9nZ2xlQ2FsZW5kYXJNb2RlKG1vZGU6IEVDYWxlbmRhck1vZGUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50Q2FsZW5kYXJNb2RlICE9PSBtb2RlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRDYWxlbmRhck1vZGUgPSBtb2RlO1xuICAgICAgdGhpcy5vbk5hdkhlYWRlckJ0bkNsaWNrLmVtaXQobW9kZSk7XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG1vbnRoU2VsZWN0ZWQobW9udGg6IElNb250aCkge1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gbW9udGguZGF0ZS5jbG9uZSgpO1xuICAgIHRoaXMuY3VycmVudENhbGVuZGFyTW9kZSA9IEVDYWxlbmRhck1vZGUuRGF5O1xuICAgIHRoaXMub25Nb250aFNlbGVjdC5lbWl0KG1vbnRoKTtcbiAgfVxuXG4gIG1vdmVDYWxlbmRhcnNCeShjdXJyZW50OiBNb21lbnQsIGFtb3VudDogbnVtYmVyLCBncmFudWxhcml0eTogdW5pdE9mVGltZS5CYXNlID0gJ21vbnRoJykge1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gY3VycmVudC5jbG9uZSgpLmFkZChhbW91bnQsIGdyYW51bGFyaXR5KTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbW92ZUNhbGVuZGFyVG8odG86IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICBpZiAodG8pIHtcbiAgICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFRvTW9tZW50KHRvLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzaG91bGRTaG93Q3VycmVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2Uuc2hvdWxkU2hvd0N1cnJlbnQoXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5zaG93R29Ub0N1cnJlbnQsXG4gICAgICAnZGF5JyxcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbixcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1heFxuICAgICk7XG4gIH1cblxuICBnb1RvQ3VycmVudCgpIHtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IG1vbWVudCgpO1xuICAgIHRoaXMub25Hb1RvQ3VycmVudC5lbWl0KCk7XG4gIH1cblxuICBoYW5kbGVDb25maWdDaGFuZ2UoY29uZmlnOiBTaW1wbGVDaGFuZ2UpIHtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBjb25zdCBwcmV2Q29uZjogSURheUNhbGVuZGFyQ29uZmlnSW50ZXJuYWwgPSB0aGlzLmRheUNhbGVuZGFyU2VydmljZS5nZXRDb25maWcoY29uZmlnLnByZXZpb3VzVmFsdWUpO1xuICAgICAgY29uc3QgY3VycmVudENvbmY6IElEYXlDYWxlbmRhckNvbmZpZ0ludGVybmFsID0gdGhpcy5kYXlDYWxlbmRhclNlcnZpY2UuZ2V0Q29uZmlnKGNvbmZpZy5jdXJyZW50VmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy51dGlsc1NlcnZpY2Uuc2hvdWxkUmVzZXRDdXJyZW50VmlldyhwcmV2Q29uZiwgY3VycmVudENvbmYpKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnREYXRlVmlldyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=