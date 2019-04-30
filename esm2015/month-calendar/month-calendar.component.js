/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { MonthCalendarService } from './month-calendar.service';
import * as momentNs from 'moment';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
const moment = momentNs;
export class MonthCalendarComponent {
    /**
     * @param {?} monthCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(monthCalendarService, utilsService, cd) {
        this.monthCalendarService = monthCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new EventEmitter();
        this.onNavHeaderBtnClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onLeftSecondaryNav = new EventEmitter();
        this.onRightSecondaryNav = new EventEmitter();
        this.isInited = false;
        this._shouldShowCurrent = true;
        this.api = {
            toggleCalendar: this.toggleCalendarMode.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
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
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this._currentDateView, this.selected);
        this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
        this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
        this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
        this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
        this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
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
     * @return {?}
     */
    init() {
        this.componentConfig = this.monthCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this._shouldShowCurrent = this.shouldShowCurrent();
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
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this.currentDateView, this.selected);
            this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        else {
            this.selected = [];
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this.currentDateView, this.selected);
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
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} month
     * @return {?}
     */
    monthClicked(month) {
        if (month.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(month);
    }
    /**
     * @return {?}
     */
    onLeftNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onLeftSecondaryNavClick() {
        /** @type {?} */
        let navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        const isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onLeftSecondaryNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(1, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    onRightSecondaryNavClick() {
        /** @type {?} */
        let navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        const isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.onRightSecondaryNav.emit({ from, to });
    }
    /**
     * @return {?}
     */
    toggleCalendarMode() {
        this.onNavHeaderBtnClick.emit();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthBtnCssClass(month) {
        /** @type {?} */
        const cssClass = {
            'dp-selected': month.selected,
            'dp-current-month': month.currentMonth
        };
        /** @type {?} */
        const customCssClass = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    }
    /**
     * @return {?}
     */
    shouldShowCurrent() {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'month', this.componentConfig.min, this.componentConfig.max);
    }
    /**
     * @return {?}
     */
    goToCurrent() {
        this.currentDateView = moment();
        this.onGoToCurrent.emit();
    }
    /**
     * @param {?} to
     * @return {?}
     */
    moveCalendarTo(to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
            this.cd.markForCheck();
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    handleConfigChange(config) {
        if (config) {
            /** @type {?} */
            const prevConf = this.monthCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            const currentConf = this.monthCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    }
}
MonthCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-month-calendar',
                template: "<div class=\"dp-month-calendar-container\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [showRightSecondaryNav]=\"showSecondaryRightNav\"\n      [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n      [showGoToCurrent]=\"shouldShowCurrent()\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode()\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\">\n    <div class=\"dp-months-row\" *ngFor=\"let monthRow of yearMonths\">\n      <button type=\"button\"\n              class=\"dp-calendar-month\"\n              *ngFor=\"let month of monthRow\"\n              [attr.data-date]=\"month.date.format(componentConfig.format)\"\n              [disabled]=\"month.disabled\"\n              [ngClass]=\"getMonthBtnCssClass(month)\"\n              (click)=\"monthClicked(month)\"\n              [innerText]=\"month.text\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    MonthCalendarService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MonthCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MonthCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-month-calendar{display:inline-block}dp-month-calendar .dp-month-calendar-container{background:#fff}dp-month-calendar .dp-calendar-wrapper{border:1px solid #000}dp-month-calendar .dp-calendar-month{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-month-calendar .dp-calendar-month.dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-month-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-month-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-month-calendar.dp-material .dp-current-month{border:1px solid #106cc8}"]
            }] }
];
/** @nocollapse */
MonthCalendarComponent.ctorParameters = () => [
    { type: MonthCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
MonthCalendarComponent.propDecorators = {
    config: [{ type: Input }],
    displayDate: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onSelect: [{ type: Output }],
    onNavHeaderBtnClick: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onLeftSecondaryNav: [{ type: Output }],
    onRightSecondaryNav: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MonthCalendarComponent.prototype.config;
    /** @type {?} */
    MonthCalendarComponent.prototype.displayDate;
    /** @type {?} */
    MonthCalendarComponent.prototype.minDate;
    /** @type {?} */
    MonthCalendarComponent.prototype.maxDate;
    /** @type {?} */
    MonthCalendarComponent.prototype.theme;
    /** @type {?} */
    MonthCalendarComponent.prototype.onSelect;
    /** @type {?} */
    MonthCalendarComponent.prototype.onNavHeaderBtnClick;
    /** @type {?} */
    MonthCalendarComponent.prototype.onGoToCurrent;
    /** @type {?} */
    MonthCalendarComponent.prototype.onLeftNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.onRightNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.onLeftSecondaryNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.onRightSecondaryNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.isInited;
    /** @type {?} */
    MonthCalendarComponent.prototype.componentConfig;
    /** @type {?} */
    MonthCalendarComponent.prototype._selected;
    /** @type {?} */
    MonthCalendarComponent.prototype.yearMonths;
    /** @type {?} */
    MonthCalendarComponent.prototype._currentDateView;
    /** @type {?} */
    MonthCalendarComponent.prototype.inputValue;
    /** @type {?} */
    MonthCalendarComponent.prototype.inputValueType;
    /** @type {?} */
    MonthCalendarComponent.prototype.validateFn;
    /** @type {?} */
    MonthCalendarComponent.prototype._shouldShowCurrent;
    /** @type {?} */
    MonthCalendarComponent.prototype.navLabel;
    /** @type {?} */
    MonthCalendarComponent.prototype.showLeftNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.showRightNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.showSecondaryLeftNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.showSecondaryRightNav;
    /** @type {?} */
    MonthCalendarComponent.prototype.api;
    /** @type {?} */
    MonthCalendarComponent.prototype.monthCalendarService;
    /** @type {?} */
    MonthCalendarComponent.prototype.utilsService;
    /** @type {?} */
    MonthCalendarComponent.prototype.cd;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibW9udGgtY2FsZW5kYXIvbW9udGgtY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7O01BSTlELE1BQU0sR0FBRyxRQUFRO0FBc0J2QixNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7SUEyRGpDLFlBQTRCLG9CQUEwQyxFQUMxQyxZQUEwQixFQUMxQixFQUFxQjtRQUZyQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBdER2QyxhQUFRLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsd0JBQW1CLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0Qsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxjQUFTLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsZUFBVSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELHVCQUFrQixHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pFLHdCQUFt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cUNBR0U7O0lBMEJVLHNEQUEwRDs7SUFDMUQsOENBQTBDOztJQUMxQyxvQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUtZW51bSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lNb250aH0gZnJvbSAnLi9tb250aC5tb2RlbCc7XG5pbXBvcnQge01vbnRoQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL21vbnRoLWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50TnMgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7TW9tZW50fSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtJTW9udGhDYWxlbmRhckNvbmZpZywgSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci1jb25maWcnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIEZvcm1Db250cm9sLFxuICBOR19WQUxJREFUT1JTLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0RhdGVWYWxpZGF0b3J9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92YWxpZGF0b3IudHlwZSc7XG5pbXBvcnQge1NpbmdsZUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zaW5nbGUtY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtJTmF2RXZlbnR9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvbmF2aWdhdGlvbi1ldmVudC5tb2RlbCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZHAtbW9udGgtY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJ21vbnRoLWNhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ21vbnRoLWNhbGVuZGFyLmNvbXBvbmVudC5sZXNzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICBNb250aENhbGVuZGFyU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1vbnRoQ2FsZW5kYXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNb250aENhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1vbnRoQ2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG4gIEBJbnB1dCgpIGNvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWc7XG4gIEBJbnB1dCgpIGRpc3BsYXlEYXRlOiBNb21lbnQ7XG4gIEBJbnB1dCgpIG1pbkRhdGU6IE1vbWVudDtcbiAgQElucHV0KCkgbWF4RGF0ZTogTW9tZW50O1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgQElucHV0KCkgdGhlbWU6IHN0cmluZztcblxuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxJTW9udGg+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25OYXZIZWFkZXJCdG5DbGljazogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Hb1RvQ3VycmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25MZWZ0TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUmlnaHROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25MZWZ0U2Vjb25kYXJ5TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUmlnaHRTZWNvbmRhcnlOYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlzSW5pdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbXBvbmVudENvbmZpZzogSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbDtcbiAgX3NlbGVjdGVkOiBNb21lbnRbXTtcbiAgeWVhck1vbnRoczogSU1vbnRoW11bXTtcbiAgX2N1cnJlbnREYXRlVmlldzogTW9tZW50O1xuICBpbnB1dFZhbHVlOiBDYWxlbmRhclZhbHVlO1xuICBpbnB1dFZhbHVlVHlwZTogRUNhbGVuZGFyVmFsdWU7XG4gIHZhbGlkYXRlRm46IERhdGVWYWxpZGF0b3I7XG4gIF9zaG91bGRTaG93Q3VycmVudDogYm9vbGVhbiA9IHRydWU7XG4gIG5hdkxhYmVsOiBzdHJpbmc7XG4gIHNob3dMZWZ0TmF2OiBib29sZWFuO1xuICBzaG93UmlnaHROYXY6IGJvb2xlYW47XG4gIHNob3dTZWNvbmRhcnlMZWZ0TmF2OiBib29sZWFuO1xuICBzaG93U2Vjb25kYXJ5UmlnaHROYXY6IGJvb2xlYW47XG5cbiAgYXBpID0ge1xuICAgIHRvZ2dsZUNhbGVuZGFyOiB0aGlzLnRvZ2dsZUNhbGVuZGFyTW9kZS5iaW5kKHRoaXMpLFxuICAgIG1vdmVDYWxlbmRhclRvOiB0aGlzLm1vdmVDYWxlbmRhclRvLmJpbmQodGhpcylcbiAgfTtcblxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IE1vbWVudFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZCkpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkKCk6IE1vbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXQgY3VycmVudERhdGVWaWV3KGN1cnJlbnQ6IE1vbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnREYXRlVmlldyA9IGN1cnJlbnQuY2xvbmUoKTtcbiAgICB0aGlzLnllYXJNb250aHMgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlXG4gICAgICAuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMubmF2TGFiZWwgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlLmdldEhlYWRlckxhYmVsKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldyk7XG4gICAgdGhpcy5zaG93TGVmdE5hdiA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2Uuc2hvdWxkU2hvd0xlZnQodGhpcy5jb21wb25lbnRDb25maWcubWluLCB0aGlzLl9jdXJyZW50RGF0ZVZpZXcpO1xuICAgIHRoaXMuc2hvd1JpZ2h0TmF2ID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZS5zaG91bGRTaG93UmlnaHQodGhpcy5jb21wb25lbnRDb25maWcubWF4LCB0aGlzLmN1cnJlbnREYXRlVmlldyk7XG4gICAgdGhpcy5zaG93U2Vjb25kYXJ5TGVmdE5hdiA9IHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbiAmJiB0aGlzLnNob3dMZWZ0TmF2O1xuICAgIHRoaXMuc2hvd1NlY29uZGFyeVJpZ2h0TmF2ID0gdGhpcy5jb21wb25lbnRDb25maWcuc2hvd011bHRpcGxlWWVhcnNOYXZpZ2F0aW9uICYmIHRoaXMuc2hvd1JpZ2h0TmF2O1xuICB9XG5cbiAgZ2V0IGN1cnJlbnREYXRlVmlldygpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGF0ZVZpZXc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbW9udGhDYWxlbmRhclNlcnZpY2U6IE1vbnRoQ2FsZW5kYXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXNJbml0ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5pc0luaXRlZCkge1xuICAgICAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIGNvbmZpZ30gPSBjaGFuZ2VzO1xuXG4gICAgICB0aGlzLmhhbmRsZUNvbmZpZ0NoYW5nZShjb25maWcpO1xuICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgIGlmIChtaW5EYXRlIHx8IG1heERhdGUpIHtcbiAgICAgICAgdGhpcy5pbml0VmFsaWRhdG9ycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb21wb25lbnRDb25maWcgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQgfHwgW107XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmRpc3BsYXlEYXRlXG4gICAgICA/IHRoaXMuZGlzcGxheURhdGVcbiAgICAgIDogdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgLmdldERlZmF1bHREaXNwbGF5RGF0ZShcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlVmlldyxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QsXG4gICAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWluXG4gICAgICAgICk7XG4gICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgIHRoaXMuX3Nob3VsZFNob3dDdXJyZW50ID0gdGhpcy5zaG91bGRTaG93Q3VycmVudCgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogQ2FsZW5kYXJWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgLmNvbnZlcnRUb01vbWVudEFycmF5KHZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgICAgdGhpcy55ZWFyTW9udGhzID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZVxuICAgICAgICAuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgICB0aGlzLmlucHV0VmFsdWVUeXBlID0gdGhpcy51dGlsc1NlcnZpY2UuZ2V0SW5wdXRUeXBlKHRoaXMuaW5wdXRWYWx1ZSwgdGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgIHRoaXMueWVhck1vbnRocyA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2VcbiAgICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlQ2FsbGJhY2soXzogYW55KSB7XG4gIH07XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICB9XG5cbiAgdmFsaWRhdGUoZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IGFueSB7XG4gICAgaWYgKHRoaXMubWluRGF0ZSB8fCB0aGlzLm1heERhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRm4oZm9ybUNvbnRyb2wudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh2YWx1ZTogTW9tZW50W10pOiBDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydEZyb21Nb21lbnRBcnJheShcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCxcbiAgICAgIHZhbHVlLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUgfHwgdGhpcy5pbnB1dFZhbHVlVHlwZVxuICAgICk7XG4gIH1cblxuICBpbml0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVWYWxpZGF0b3IoXG4gICAgICB7bWluRGF0ZTogdGhpcy5taW5EYXRlLCBtYXhEYXRlOiB0aGlzLm1heERhdGV9LFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgJ21vbnRoJ1xuICAgICk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkKSk7XG4gIH1cblxuICBtb250aENsaWNrZWQobW9udGg6IElNb250aCkge1xuICAgIGlmIChtb250aC5zZWxlY3RlZCAmJiAhdGhpcy5jb21wb25lbnRDb25maWcudW5TZWxlY3RPbkNsaWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAudXBkYXRlU2VsZWN0ZWQodGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCwgdGhpcy5zZWxlY3RlZCwgbW9udGgsICdtb250aCcpO1xuICAgIHRoaXMueWVhck1vbnRocyA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2VcbiAgICAgIC5nZW5lcmF0ZVllYXIodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQobW9udGgpO1xuICB9XG5cbiAgb25MZWZ0TmF2Q2xpY2soKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLnN1YnRyYWN0KDEsICd5ZWFyJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMueWVhck1vbnRocyA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2UuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5vbkxlZnROYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uTGVmdFNlY29uZGFyeU5hdkNsaWNrKCkge1xuICAgIGxldCBuYXZpZ2F0ZUJ5ID0gdGhpcy5jb21wb25lbnRDb25maWcubXVsdGlwbGVZZWFyc05hdmlnYXRlQnk7XG4gICAgY29uc3QgaXNPdXRzaWRlUmFuZ2UgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5taW4gJiZcbiAgICAgIHRoaXMuY3VycmVudERhdGVWaWV3LnllYXIoKSAtIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbi55ZWFyKCkgPCBuYXZpZ2F0ZUJ5O1xuXG4gICAgaWYgKGlzT3V0c2lkZVJhbmdlKSB7XG4gICAgICBuYXZpZ2F0ZUJ5ID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcueWVhcigpIC0gdGhpcy5jb21wb25lbnRDb25maWcubWluLnllYXIoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCkuc3VidHJhY3QobmF2aWdhdGVCeSwgJ3llYXInKTtcbiAgICBjb25zdCB0byA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5vbkxlZnRTZWNvbmRhcnlOYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uUmlnaHROYXZDbGljaygpIHtcbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCkuYWRkKDEsICd5ZWFyJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMub25SaWdodE5hdi5lbWl0KHtmcm9tLCB0b30pO1xuICB9XG5cbiAgb25SaWdodFNlY29uZGFyeU5hdkNsaWNrKCkge1xuICAgIGxldCBuYXZpZ2F0ZUJ5ID0gdGhpcy5jb21wb25lbnRDb25maWcubXVsdGlwbGVZZWFyc05hdmlnYXRlQnk7XG4gICAgY29uc3QgaXNPdXRzaWRlUmFuZ2UgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5tYXggJiZcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1heC55ZWFyKCkgLSB0aGlzLmN1cnJlbnREYXRlVmlldy55ZWFyKCkgPCBuYXZpZ2F0ZUJ5O1xuXG4gICAgaWYgKGlzT3V0c2lkZVJhbmdlKSB7XG4gICAgICBuYXZpZ2F0ZUJ5ID0gdGhpcy5jb21wb25lbnRDb25maWcubWF4LnllYXIoKSAtIHRoaXMuY3VycmVudERhdGVWaWV3LnllYXIoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCkuYWRkKG5hdmlnYXRlQnksICd5ZWFyJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMub25SaWdodFNlY29uZGFyeU5hdi5lbWl0KHtmcm9tLCB0b30pO1xuICB9XG5cbiAgdG9nZ2xlQ2FsZW5kYXJNb2RlKCkge1xuICAgIHRoaXMub25OYXZIZWFkZXJCdG5DbGljay5lbWl0KCk7XG4gIH1cblxuICBnZXRNb250aEJ0bkNzc0NsYXNzKG1vbnRoOiBJTW9udGgpOiB7W2tsYXNzOiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgY29uc3QgY3NzQ2xhc3M6IHtba2xhc3M6IHN0cmluZ106IGJvb2xlYW59ID0ge1xuICAgICAgJ2RwLXNlbGVjdGVkJzogbW9udGguc2VsZWN0ZWQsXG4gICAgICAnZHAtY3VycmVudC1tb250aCc6IG1vbnRoLmN1cnJlbnRNb250aFxuICAgIH07XG4gICAgY29uc3QgY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZyA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2UuZ2V0TW9udGhCdG5Dc3NDbGFzcyh0aGlzLmNvbXBvbmVudENvbmZpZywgbW9udGguZGF0ZSk7XG5cbiAgICBpZiAoY3VzdG9tQ3NzQ2xhc3MpIHtcbiAgICAgIGNzc0NsYXNzW2N1c3RvbUNzc0NsYXNzXSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc0NsYXNzO1xuICB9XG5cbiAgc2hvdWxkU2hvd0N1cnJlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLnNob3VsZFNob3dDdXJyZW50KFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuc2hvd0dvVG9DdXJyZW50LFxuICAgICAgJ21vbnRoJyxcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbixcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1heFxuICAgICk7XG4gIH1cblxuICBnb1RvQ3VycmVudCgpIHtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IG1vbWVudCgpO1xuICAgIHRoaXMub25Hb1RvQ3VycmVudC5lbWl0KCk7XG4gIH1cblxuICBtb3ZlQ2FsZW5kYXJUbyh0bzogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIGlmICh0bykge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9Nb21lbnQodG8sIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbmZpZ0NoYW5nZShjb25maWc6IFNpbXBsZUNoYW5nZSkge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIGNvbnN0IHByZXZDb25mOiBJTW9udGhDYWxlbmRhckNvbmZpZ0ludGVybmFsID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZS5nZXRDb25maWcoY29uZmlnLnByZXZpb3VzVmFsdWUpO1xuICAgICAgY29uc3QgY3VycmVudENvbmY6IElNb250aENhbGVuZGFyQ29uZmlnSW50ZXJuYWwgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyhjb25maWcuY3VycmVudFZhbHVlKTtcblxuICAgICAgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLnNob3VsZFJlc2V0Q3VycmVudFZpZXcocHJldkNvbmYsIGN1cnJlbnRDb25mKSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50RGF0ZVZpZXcgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19