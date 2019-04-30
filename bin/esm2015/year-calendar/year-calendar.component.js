/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { YearCalendarService } from './year-calendar.service';
import * as momentNs from 'moment';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
/** @type {?} */
const moment = momentNs;
export class YearCalendarComponent {
    /**
     * @param {?} yearCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(yearCalendarService, utilsService, cd) {
        this.yearCalendarService = yearCalendarService;
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
        this.yearYears = this.yearCalendarService
            .generateYear(this.componentConfig, this._currentDateView, this.selected);
        this.navLabel = this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
        this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
        this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
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
        this.componentConfig = this.yearCalendarService.getConfig(this.config);
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
            this.yearYears = this.yearCalendarService
                .generateYear(this.componentConfig, this.currentDateView, this.selected);
            this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        else {
            this.selected = [];
            this.yearYears = this.yearCalendarService
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
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'year');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    }
    /**
     * @param {?} year
     * @return {?}
     */
    yearClicked(year) {
        if (year.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
        this.yearYears = this.yearCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(year);
    }
    /**
     * @return {?}
     */
    onLeftNavClick() {
        /** @type {?} */
        const from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(12, 'year');
        /** @type {?} */
        const to = this.currentDateView.clone();
        this.yearYears = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
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
        this.currentDateView = this.currentDateView.clone().add(12, 'year');
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
     * @param {?} year
     * @return {?}
     */
    getYearBtnCssClass(year) {
        /** @type {?} */
        const cssClass = {
            'dp-selected': year.selected,
            'dp-current-year': year.currentYear
        };
        /** @type {?} */
        const customCssClass = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    }
    /**
     * @return {?}
     */
    shouldShowCurrent() {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'year', this.componentConfig.min, this.componentConfig.max);
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
            const prevConf = this.yearCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            const currentConf = this.yearCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    }
}
YearCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-year-calendar',
                template: "<div class=\"dp-year-calendar-container\">\n  <dp-calendar-nav\n      [label]=\"navLabel\"\n      [showLeftNav]=\"showLeftNav\"\n      [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n      [showRightNav]=\"showRightNav\"\n      [showRightSecondaryNav]=\"showSecondaryRightNav\"\n      [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n      [showGoToCurrent]=\"shouldShowCurrent()\"\n      [theme]=\"theme\"\n      (onLeftNav)=\"onLeftNavClick()\"\n      (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n      (onRightNav)=\"onRightNavClick()\"\n      (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n      (onLabelClick)=\"toggleCalendarMode()\"\n      (onGoToCurrent)=\"goToCurrent()\">\n  </dp-calendar-nav>\n\n  <div class=\"dp-calendar-wrapper\">\n    <div class=\"dp-years-row\" *ngFor=\"let yearRow of yearYears\">\n      <button type=\"button\"\n              class=\"dp-calendar-year\"\n              *ngFor=\"let year of yearRow\"\n              [attr.data-date]=\"year.date.format(componentConfig.format)\"\n              [disabled]=\"year.disabled\"\n              [ngClass]=\"getYearBtnCssClass(year)\"\n              (click)=\"yearClicked(year)\"\n              [innerText]=\"year.text\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    YearCalendarService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => YearCalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => YearCalendarComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-year-calendar{display:inline-block}dp-year-calendar .dp-year-calendar-container{background:#fff}dp-year-calendar .dp-calendar-wrapper{border:1px solid #000}dp-year-calendar .dp-calendar-year{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-year-calendar .dp-calendar-year.dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-year{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-year-calendar.dp-material .dp-calendar-year:hover{background:#e0e0e0}dp-year-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-year-calendar.dp-material .dp-current-year{border:1px solid #106cc8}"]
            }] }
];
/** @nocollapse */
YearCalendarComponent.ctorParameters = () => [
    { type: YearCalendarService },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
YearCalendarComponent.propDecorators = {
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
    YearCalendarComponent.prototype.config;
    /** @type {?} */
    YearCalendarComponent.prototype.displayDate;
    /** @type {?} */
    YearCalendarComponent.prototype.minDate;
    /** @type {?} */
    YearCalendarComponent.prototype.maxDate;
    /** @type {?} */
    YearCalendarComponent.prototype.theme;
    /** @type {?} */
    YearCalendarComponent.prototype.onSelect;
    /** @type {?} */
    YearCalendarComponent.prototype.onNavHeaderBtnClick;
    /** @type {?} */
    YearCalendarComponent.prototype.onGoToCurrent;
    /** @type {?} */
    YearCalendarComponent.prototype.onLeftNav;
    /** @type {?} */
    YearCalendarComponent.prototype.onRightNav;
    /** @type {?} */
    YearCalendarComponent.prototype.onLeftSecondaryNav;
    /** @type {?} */
    YearCalendarComponent.prototype.onRightSecondaryNav;
    /** @type {?} */
    YearCalendarComponent.prototype.isInited;
    /** @type {?} */
    YearCalendarComponent.prototype.componentConfig;
    /** @type {?} */
    YearCalendarComponent.prototype._selected;
    /** @type {?} */
    YearCalendarComponent.prototype.yearYears;
    /** @type {?} */
    YearCalendarComponent.prototype._currentDateView;
    /** @type {?} */
    YearCalendarComponent.prototype.inputValue;
    /** @type {?} */
    YearCalendarComponent.prototype.inputValueType;
    /** @type {?} */
    YearCalendarComponent.prototype.validateFn;
    /** @type {?} */
    YearCalendarComponent.prototype._shouldShowCurrent;
    /** @type {?} */
    YearCalendarComponent.prototype.navLabel;
    /** @type {?} */
    YearCalendarComponent.prototype.showLeftNav;
    /** @type {?} */
    YearCalendarComponent.prototype.showRightNav;
    /** @type {?} */
    YearCalendarComponent.prototype.showSecondaryLeftNav;
    /** @type {?} */
    YearCalendarComponent.prototype.showSecondaryRightNav;
    /** @type {?} */
    YearCalendarComponent.prototype.api;
    /** @type {?} */
    YearCalendarComponent.prototype.yearCalendarService;
    /** @type {?} */
    YearCalendarComponent.prototype.utilsService;
    /** @type {?} */
    YearCalendarComponent.prototype.cd;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1jYWxlbmRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJ5ZWFyLWNhbGVuZGFyL3llYXItY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7O01BSTlELE1BQU0sR0FBRyxRQUFRO0FBc0J2QixNQUFNLE9BQU8scUJBQXFCOzs7Ozs7SUEyRGhDLFlBQTRCLG1CQUF3QyxFQUN4QyxZQUEwQixFQUMxQixFQUFxQjtRQUZyQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBdER2QyxhQUFRLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsd0JBQW1CLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0Qsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxjQUFTLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsZUFBVSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELHVCQUFrQixHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pFLHdCQUFtQixH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R0U7O0lBMEJVLG9EQUF3RDs7SUFDeEQsNkNBQTBDOztJQUMxQyxtQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUtZW51bSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0lZZWFyfSBmcm9tICcuL3llYXIubW9kZWwnO1xuaW1wb3J0IHtZZWFyQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL3llYXItY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBtb21lbnROcyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtNb21lbnR9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0lZZWFyQ2FsZW5kYXJDb25maWcsIElZZWFyQ2FsZW5kYXJDb25maWdJbnRlcm5hbH0gZnJvbSAnLi95ZWFyLWNhbGVuZGFyLWNvbmZpZyc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZVZhbGlkYXRvcn0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZhbGlkYXRvci50eXBlJztcbmltcG9ydCB7U2luZ2xlQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NpbmdsZS1jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge0lOYXZFdmVudH0gZnJvbSAnLi4vY29tbW9uL21vZGVscy9uYXZpZ2F0aW9uLWV2ZW50Lm1vZGVsJztcbmNvbnN0IG1vbWVudCA9IG1vbWVudE5zO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcC15ZWFyLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICd5ZWFyLWNhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3llYXItY2FsZW5kYXIuY29tcG9uZW50Lmxlc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIFllYXJDYWxlbmRhclNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBZZWFyQ2FsZW5kYXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBZZWFyQ2FsZW5kYXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgWWVhckNhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuICBASW5wdXQoKSBjb25maWc6IElZZWFyQ2FsZW5kYXJDb25maWc7XG4gIEBJbnB1dCgpIGRpc3BsYXlEYXRlOiBNb21lbnQ7XG4gIEBJbnB1dCgpIG1pbkRhdGU6IE1vbWVudDtcbiAgQElucHV0KCkgbWF4RGF0ZTogTW9tZW50O1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgQElucHV0KCkgdGhlbWU6IHN0cmluZztcblxuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxJWWVhcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbk5hdkhlYWRlckJ0bkNsaWNrOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkdvVG9DdXJyZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxlZnROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25SaWdodE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxlZnRTZWNvbmRhcnlOYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25SaWdodFNlY29uZGFyeU5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgaXNJbml0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29tcG9uZW50Q29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWw7XG4gIF9zZWxlY3RlZDogTW9tZW50W107XG4gIHllYXJZZWFyczogSVllYXJbXVtdO1xuICBfY3VycmVudERhdGVWaWV3OiBNb21lbnQ7XG4gIGlucHV0VmFsdWU6IENhbGVuZGFyVmFsdWU7XG4gIGlucHV0VmFsdWVUeXBlOiBFQ2FsZW5kYXJWYWx1ZTtcbiAgdmFsaWRhdGVGbjogRGF0ZVZhbGlkYXRvcjtcbiAgX3Nob3VsZFNob3dDdXJyZW50OiBib29sZWFuID0gdHJ1ZTtcbiAgbmF2TGFiZWw6IHN0cmluZztcbiAgc2hvd0xlZnROYXY6IGJvb2xlYW47XG4gIHNob3dSaWdodE5hdjogYm9vbGVhbjtcbiAgc2hvd1NlY29uZGFyeUxlZnROYXY6IGJvb2xlYW47XG4gIHNob3dTZWNvbmRhcnlSaWdodE5hdjogYm9vbGVhbjtcblxuICBhcGkgPSB7XG4gICAgdG9nZ2xlQ2FsZW5kYXI6IHRoaXMudG9nZ2xlQ2FsZW5kYXJNb2RlLmJpbmQodGhpcyksXG4gICAgbW92ZUNhbGVuZGFyVG86IHRoaXMubW92ZUNhbGVuZGFyVG8uYmluZCh0aGlzKVxuICB9O1xuXG4gIHNldCBzZWxlY3RlZChzZWxlY3RlZDogTW9tZW50W10pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHNlbGVjdGVkKSk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogTW9tZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBjdXJyZW50RGF0ZVZpZXcoY3VycmVudDogTW9tZW50KSB7XG4gICAgdGhpcy5fY3VycmVudERhdGVWaWV3ID0gY3VycmVudC5jbG9uZSgpO1xuICAgIHRoaXMueWVhclllYXJzID0gdGhpcy55ZWFyQ2FsZW5kYXJTZXJ2aWNlXG4gICAgICAuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLl9jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMubmF2TGFiZWwgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2UuZ2V0SGVhZGVyTGFiZWwodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuY3VycmVudERhdGVWaWV3KTtcbiAgICB0aGlzLnNob3dMZWZ0TmF2ID0gdGhpcy55ZWFyQ2FsZW5kYXJTZXJ2aWNlLnNob3VsZFNob3dMZWZ0KHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbiwgdGhpcy5fY3VycmVudERhdGVWaWV3KTtcbiAgICB0aGlzLnNob3dSaWdodE5hdiA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZS5zaG91bGRTaG93UmlnaHQodGhpcy5jb21wb25lbnRDb25maWcubWF4LCB0aGlzLmN1cnJlbnREYXRlVmlldyk7XG4gICAgdGhpcy5zaG93U2Vjb25kYXJ5TGVmdE5hdiA9IHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbiAmJiB0aGlzLnNob3dMZWZ0TmF2O1xuICAgIHRoaXMuc2hvd1NlY29uZGFyeVJpZ2h0TmF2ID0gdGhpcy5jb21wb25lbnRDb25maWcuc2hvd011bHRpcGxlWWVhcnNOYXZpZ2F0aW9uICYmIHRoaXMuc2hvd1JpZ2h0TmF2O1xuICB9XG5cbiAgZ2V0IGN1cnJlbnREYXRlVmlldygpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGF0ZVZpZXc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgeWVhckNhbGVuZGFyU2VydmljZTogWWVhckNhbGVuZGFyU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzSW5pdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuaXNJbml0ZWQpIHtcbiAgICAgIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBjb25maWd9ID0gY2hhbmdlcztcblxuICAgICAgdGhpcy5oYW5kbGVDb25maWdDaGFuZ2UoY29uZmlnKTtcbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICBpZiAobWluRGF0ZSB8fCBtYXhEYXRlKSB7XG4gICAgICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29tcG9uZW50Q29uZmlnID0gdGhpcy55ZWFyQ2FsZW5kYXJTZXJ2aWNlLmdldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQgfHwgW107XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmRpc3BsYXlEYXRlXG4gICAgICA/IHRoaXMuZGlzcGxheURhdGVcbiAgICAgIDogdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgLmdldERlZmF1bHREaXNwbGF5RGF0ZShcbiAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlVmlldyxcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkLFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QsXG4gICAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWluXG4gICAgICAgICk7XG4gICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgIHRoaXMuX3Nob3VsZFNob3dDdXJyZW50ID0gdGhpcy5zaG91bGRTaG93Q3VycmVudCgpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogQ2FsZW5kYXJWYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgLmNvbnZlcnRUb01vbWVudEFycmF5KHZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgICAgdGhpcy55ZWFyWWVhcnMgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2VcbiAgICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICB0aGlzLnllYXJZZWFycyA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZVxuICAgICAgICAuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25DaGFuZ2VDYWxsYmFjayhfOiBhbnkpIHtcbiAgfTtcblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gIH1cblxuICB2YWxpZGF0ZShmb3JtQ29udHJvbDogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgYW55IHtcbiAgICBpZiAodGhpcy5taW5EYXRlIHx8IHRoaXMubWF4RGF0ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVGbihmb3JtQ29udHJvbC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoKSA9PiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHZhbHVlOiBNb21lbnRbXSk6IENhbGVuZGFyVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0RnJvbU1vbWVudEFycmF5KFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgdmFsdWUsXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5yZXR1cm5lZFZhbHVlVHlwZSB8fCB0aGlzLmlucHV0VmFsdWVUeXBlXG4gICAgKTtcbiAgfVxuXG4gIGluaXRWYWxpZGF0b3JzKCkge1xuICAgIHRoaXMudmFsaWRhdGVGbiA9IHRoaXMudmFsaWRhdGVGbiA9IHRoaXMudXRpbHNTZXJ2aWNlLmNyZWF0ZVZhbGlkYXRvcihcbiAgICAgIHttaW5EYXRlOiB0aGlzLm1pbkRhdGUsIG1heERhdGU6IHRoaXMubWF4RGF0ZX0sXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsXG4gICAgICAneWVhcidcbiAgICApO1xuXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZCkpO1xuICB9XG5cbiAgeWVhckNsaWNrZWQoeWVhcjogSVllYXIpIHtcbiAgICBpZiAoeWVhci5zZWxlY3RlZCAmJiAhdGhpcy5jb21wb25lbnRDb25maWcudW5TZWxlY3RPbkNsaWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAudXBkYXRlU2VsZWN0ZWQodGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCwgdGhpcy5zZWxlY3RlZCwgeWVhciwgJ3llYXInKTtcbiAgICB0aGlzLnllYXJZZWFycyA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh5ZWFyKTtcbiAgfVxuXG4gIG9uTGVmdE5hdkNsaWNrKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKS5zdWJ0cmFjdCgxMiwgJ3llYXInKTtcbiAgICBjb25zdCB0byA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy55ZWFyWWVhcnMgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2UuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5vbkxlZnROYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uTGVmdFNlY29uZGFyeU5hdkNsaWNrKCkge1xuICAgIGxldCBuYXZpZ2F0ZUJ5ID0gdGhpcy5jb21wb25lbnRDb25maWcubXVsdGlwbGVZZWFyc05hdmlnYXRlQnk7XG4gICAgY29uc3QgaXNPdXRzaWRlUmFuZ2UgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5taW4gJiZcbiAgICAgIHRoaXMuY3VycmVudERhdGVWaWV3LnllYXIoKSAtIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbi55ZWFyKCkgPCBuYXZpZ2F0ZUJ5O1xuXG4gICAgaWYgKGlzT3V0c2lkZVJhbmdlKSB7XG4gICAgICBuYXZpZ2F0ZUJ5ID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcueWVhcigpIC0gdGhpcy5jb21wb25lbnRDb25maWcubWluLnllYXIoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCkuc3VidHJhY3QobmF2aWdhdGVCeSwgJ3llYXInKTtcbiAgICBjb25zdCB0byA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5vbkxlZnRTZWNvbmRhcnlOYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uUmlnaHROYXZDbGljaygpIHtcbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCkuYWRkKDEyLCAneWVhcicpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm9uUmlnaHROYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uUmlnaHRTZWNvbmRhcnlOYXZDbGljaygpIHtcbiAgICBsZXQgbmF2aWdhdGVCeSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5O1xuICAgIGNvbnN0IGlzT3V0c2lkZVJhbmdlID0gdGhpcy5jb21wb25lbnRDb25maWcubWF4ICYmXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5tYXgueWVhcigpIC0gdGhpcy5jdXJyZW50RGF0ZVZpZXcueWVhcigpIDwgbmF2aWdhdGVCeTtcblxuICAgIGlmIChpc091dHNpZGVSYW5nZSkge1xuICAgICAgbmF2aWdhdGVCeSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm1heC55ZWFyKCkgLSB0aGlzLmN1cnJlbnREYXRlVmlldy55ZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLmFkZChuYXZpZ2F0ZUJ5LCAneWVhcicpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm9uUmlnaHRTZWNvbmRhcnlOYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIHRvZ2dsZUNhbGVuZGFyTW9kZSgpIHtcbiAgICB0aGlzLm9uTmF2SGVhZGVyQnRuQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgZ2V0WWVhckJ0bkNzc0NsYXNzKHllYXI6IElZZWFyKToge1trbGFzczogc3RyaW5nXTogYm9vbGVhbn0ge1xuICAgIGNvbnN0IGNzc0NsYXNzOiB7W2tsYXNzOiBzdHJpbmddOiBib29sZWFufSA9IHtcbiAgICAgICdkcC1zZWxlY3RlZCc6IHllYXIuc2VsZWN0ZWQsXG4gICAgICAnZHAtY3VycmVudC15ZWFyJzogeWVhci5jdXJyZW50WWVhclxuICAgIH07XG4gICAgY29uc3QgY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZyA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZS5nZXRZZWFyQnRuQ3NzQ2xhc3ModGhpcy5jb21wb25lbnRDb25maWcsIHllYXIuZGF0ZSk7XG5cbiAgICBpZiAoY3VzdG9tQ3NzQ2xhc3MpIHtcbiAgICAgIGNzc0NsYXNzW2N1c3RvbUNzc0NsYXNzXSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc0NsYXNzO1xuICB9XG5cbiAgc2hvdWxkU2hvd0N1cnJlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLnNob3VsZFNob3dDdXJyZW50KFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuc2hvd0dvVG9DdXJyZW50LFxuICAgICAgJ3llYXInLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWluLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWF4XG4gICAgKTtcbiAgfVxuXG4gIGdvVG9DdXJyZW50KCkge1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gbW9tZW50KCk7XG4gICAgdGhpcy5vbkdvVG9DdXJyZW50LmVtaXQoKTtcbiAgfVxuXG4gIG1vdmVDYWxlbmRhclRvKHRvOiBTaW5nbGVDYWxlbmRhclZhbHVlKSB7XG4gICAgaWYgKHRvKSB7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRUb01vbWVudCh0bywgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0KTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ29uZmlnQ2hhbmdlKGNvbmZpZzogU2ltcGxlQ2hhbmdlKSB7XG4gICAgaWYgKGNvbmZpZykge1xuICAgICAgY29uc3QgcHJldkNvbmY6IElZZWFyQ2FsZW5kYXJDb25maWdJbnRlcm5hbCA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZS5nZXRDb25maWcoY29uZmlnLnByZXZpb3VzVmFsdWUpO1xuICAgICAgY29uc3QgY3VycmVudENvbmY6IElZZWFyQ2FsZW5kYXJDb25maWdJbnRlcm5hbCA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZS5nZXRDb25maWcoY29uZmlnLmN1cnJlbnRWYWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLnV0aWxzU2VydmljZS5zaG91bGRSZXNldEN1cnJlbnRWaWV3KHByZXZDb25mLCBjdXJyZW50Q29uZikpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudERhdGVWaWV3ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==