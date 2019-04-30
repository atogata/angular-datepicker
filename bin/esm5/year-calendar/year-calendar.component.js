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
var moment = momentNs;
var YearCalendarComponent = /** @class */ (function () {
    function YearCalendarComponent(yearCalendarService, utilsService, cd) {
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
    Object.defineProperty(YearCalendarComponent.prototype, "selected", {
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
    Object.defineProperty(YearCalendarComponent.prototype, "currentDateView", {
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
            this.yearYears = this.yearCalendarService
                .generateYear(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.yearCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
            this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
            this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
            this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
            this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    YearCalendarComponent.prototype.ngOnChanges = /**
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
     * @return {?}
     */
    YearCalendarComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.componentConfig = this.yearCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this._shouldShowCurrent = this.shouldShowCurrent();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    YearCalendarComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    YearCalendarComponent.prototype.registerOnChange = /**
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
    YearCalendarComponent.prototype.onChangeCallback = /**
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
    YearCalendarComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    YearCalendarComponent.prototype.validate = /**
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
    YearCalendarComponent.prototype.processOnChangeCallback = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.initValidators = /**
     * @return {?}
     */
    function () {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'year');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} year
     * @return {?}
     */
    YearCalendarComponent.prototype.yearClicked = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        if (year.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, year, 'year');
        this.yearYears = this.yearCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(year);
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.onLeftNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(12, 'year');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.yearYears = this.yearCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.onLeftSecondaryNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        var isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.onLeftSecondaryNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.onRightNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(12, 'year');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.onRightSecondaryNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var navigateBy = this.componentConfig.multipleYearsNavigateBy;
        /** @type {?} */
        var isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.onRightSecondaryNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.toggleCalendarMode = /**
     * @return {?}
     */
    function () {
        this.onNavHeaderBtnClick.emit();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    YearCalendarComponent.prototype.getYearBtnCssClass = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var cssClass = {
            'dp-selected': year.selected,
            'dp-current-year': year.currentYear
        };
        /** @type {?} */
        var customCssClass = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.shouldShowCurrent = /**
     * @return {?}
     */
    function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'year', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    YearCalendarComponent.prototype.goToCurrent = /**
     * @return {?}
     */
    function () {
        this.currentDateView = moment();
        this.onGoToCurrent.emit();
    };
    /**
     * @param {?} to
     * @return {?}
     */
    YearCalendarComponent.prototype.moveCalendarTo = /**
     * @param {?} to
     * @return {?}
     */
    function (to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
            this.cd.markForCheck();
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    YearCalendarComponent.prototype.handleConfigChange = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (config) {
            /** @type {?} */
            var prevConf = this.yearCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            var currentConf = this.yearCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
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
                            function () { return YearCalendarComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return YearCalendarComponent; })),
                            multi: true
                        }
                    ],
                    styles: ["dp-year-calendar{display:inline-block}dp-year-calendar .dp-year-calendar-container{background:#fff}dp-year-calendar .dp-calendar-wrapper{border:1px solid #000}dp-year-calendar .dp-calendar-year{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-year-calendar .dp-calendar-year.dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-year-calendar.dp-material .dp-calendar-year{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-year-calendar.dp-material .dp-calendar-year:hover{background:#e0e0e0}dp-year-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-year-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-year-calendar.dp-material .dp-current-year{border:1px solid #106cc8}"]
                }] }
    ];
    /** @nocollapse */
    YearCalendarComponent.ctorParameters = function () { return [
        { type: YearCalendarService },
        { type: UtilsService },
        { type: ChangeDetectorRef }
    ]; };
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
    return YearCalendarComponent;
}());
export { YearCalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1jYWxlbmRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJ5ZWFyLWNhbGVuZGFyL3llYXItY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7O0lBSTlELE1BQU0sR0FBRyxRQUFRO0FBRXZCO0lBK0VFLCtCQUE0QixtQkFBd0MsRUFDeEMsWUFBMEIsRUFDMUIsRUFBcUI7UUFGckIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXREdkMsYUFBUSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELHdCQUFtQixHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsY0FBUyxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELGVBQVUsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCx1QkFBa0IsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRSx3QkFBbUIsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FB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O0lBQ2pFLDBDQUFrRTs7SUFDbEUsMkNBQW1FOztJQUNuRSxtREFBMkU7O0lBQzNFLG9EQUE0RTs7SUFFNUUseUNBQTBCOztJQUMxQixnREFBNkM7O0lBQzdDLDBDQUFvQjs7SUFDcEIsMENBQXFCOztJQUNyQixpREFBeUI7O0lBQ3pCLDJDQUEwQjs7SUFDMUIsK0NBQStCOztJQUMvQiwyQ0FBMEI7O0lBQzFCLG1EQUFtQzs7SUFDbkMseUNBQWlCOztJQUNqQiw0Q0FBcUI7O0lBQ3JCLDZDQUFzQjs7SUFDdEIscURBQThCOztJQUM5QixzREFBK0I7O0lBRS9CLG9DQUdFOztJQTBCVSxvREFBd0Q7O0lBQ3hELDZDQUEwQzs7SUFDMUMsbUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlLWVudW0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJWWVhcn0gZnJvbSAnLi95ZWFyLm1vZGVsJztcbmltcG9ydCB7WWVhckNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi95ZWFyLWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50TnMgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7TW9tZW50fSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtJWWVhckNhbGVuZGFyQ29uZmlnLCBJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4veWVhci1jYWxlbmRhci1jb25maWcnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIEZvcm1Db250cm9sLFxuICBOR19WQUxJREFUT1JTLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0RhdGVWYWxpZGF0b3J9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92YWxpZGF0b3IudHlwZSc7XG5pbXBvcnQge1NpbmdsZUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zaW5nbGUtY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtJTmF2RXZlbnR9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvbmF2aWdhdGlvbi1ldmVudC5tb2RlbCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZHAteWVhci1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAneWVhci1jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd5ZWFyLWNhbGVuZGFyLmNvbXBvbmVudC5sZXNzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICBZZWFyQ2FsZW5kYXJTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gWWVhckNhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gWWVhckNhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFllYXJDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgQElucHV0KCkgY29uZmlnOiBJWWVhckNhbGVuZGFyQ29uZmlnO1xuICBASW5wdXQoKSBkaXNwbGF5RGF0ZTogTW9tZW50O1xuICBASW5wdXQoKSBtaW5EYXRlOiBNb21lbnQ7XG4gIEBJbnB1dCgpIG1heERhdGU6IE1vbWVudDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8SVllYXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25OYXZIZWFkZXJCdG5DbGljazogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25Hb1RvQ3VycmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25MZWZ0TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUmlnaHROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25MZWZ0U2Vjb25kYXJ5TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUmlnaHRTZWNvbmRhcnlOYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlzSW5pdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbXBvbmVudENvbmZpZzogSVllYXJDYWxlbmRhckNvbmZpZ0ludGVybmFsO1xuICBfc2VsZWN0ZWQ6IE1vbWVudFtdO1xuICB5ZWFyWWVhcnM6IElZZWFyW11bXTtcbiAgX2N1cnJlbnREYXRlVmlldzogTW9tZW50O1xuICBpbnB1dFZhbHVlOiBDYWxlbmRhclZhbHVlO1xuICBpbnB1dFZhbHVlVHlwZTogRUNhbGVuZGFyVmFsdWU7XG4gIHZhbGlkYXRlRm46IERhdGVWYWxpZGF0b3I7XG4gIF9zaG91bGRTaG93Q3VycmVudDogYm9vbGVhbiA9IHRydWU7XG4gIG5hdkxhYmVsOiBzdHJpbmc7XG4gIHNob3dMZWZ0TmF2OiBib29sZWFuO1xuICBzaG93UmlnaHROYXY6IGJvb2xlYW47XG4gIHNob3dTZWNvbmRhcnlMZWZ0TmF2OiBib29sZWFuO1xuICBzaG93U2Vjb25kYXJ5UmlnaHROYXY6IGJvb2xlYW47XG5cbiAgYXBpID0ge1xuICAgIHRvZ2dsZUNhbGVuZGFyOiB0aGlzLnRvZ2dsZUNhbGVuZGFyTW9kZS5iaW5kKHRoaXMpLFxuICAgIG1vdmVDYWxlbmRhclRvOiB0aGlzLm1vdmVDYWxlbmRhclRvLmJpbmQodGhpcylcbiAgfTtcblxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IE1vbWVudFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZCkpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkKCk6IE1vbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXQgY3VycmVudERhdGVWaWV3KGN1cnJlbnQ6IE1vbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnREYXRlVmlldyA9IGN1cnJlbnQuY2xvbmUoKTtcbiAgICB0aGlzLnllYXJZZWFycyA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLm5hdkxhYmVsID0gdGhpcy55ZWFyQ2FsZW5kYXJTZXJ2aWNlLmdldEhlYWRlckxhYmVsKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldyk7XG4gICAgdGhpcy5zaG93TGVmdE5hdiA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZS5zaG91bGRTaG93TGVmdCh0aGlzLmNvbXBvbmVudENvbmZpZy5taW4sIHRoaXMuX2N1cnJlbnREYXRlVmlldyk7XG4gICAgdGhpcy5zaG93UmlnaHROYXYgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2Uuc2hvdWxkU2hvd1JpZ2h0KHRoaXMuY29tcG9uZW50Q29uZmlnLm1heCwgdGhpcy5jdXJyZW50RGF0ZVZpZXcpO1xuICAgIHRoaXMuc2hvd1NlY29uZGFyeUxlZnROYXYgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5zaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb24gJiYgdGhpcy5zaG93TGVmdE5hdjtcbiAgICB0aGlzLnNob3dTZWNvbmRhcnlSaWdodE5hdiA9IHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbiAmJiB0aGlzLnNob3dSaWdodE5hdjtcbiAgfVxuXG4gIGdldCBjdXJyZW50RGF0ZVZpZXcoKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudERhdGVWaWV3O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHllYXJDYWxlbmRhclNlcnZpY2U6IFllYXJDYWxlbmRhclNlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0luaXRlZCA9IHRydWU7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0VmFsaWRhdG9ycygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmlzSW5pdGVkKSB7XG4gICAgICBjb25zdCB7bWluRGF0ZSwgbWF4RGF0ZSwgY29uZmlnfSA9IGNoYW5nZXM7XG5cbiAgICAgIHRoaXMuaGFuZGxlQ29uZmlnQ2hhbmdlKGNvbmZpZyk7XG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgaWYgKG1pbkRhdGUgfHwgbWF4RGF0ZSkge1xuICAgICAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudENvbmZpZyA9IHRoaXMueWVhckNhbGVuZGFyU2VydmljZS5nZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkIHx8IFtdO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5kaXNwbGF5RGF0ZVxuICAgICAgPyB0aGlzLmRpc3BsYXlEYXRlXG4gICAgICA6IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5nZXREZWZhdWx0RGlzcGxheURhdGUoXG4gICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pblxuICAgICAgICApO1xuICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICB0aGlzLl9zaG91bGRTaG93Q3VycmVudCA9IHRoaXMuc2hvdWxkU2hvd0N1cnJlbnQoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IENhbGVuZGFyVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5jb252ZXJ0VG9Nb21lbnRBcnJheSh2YWx1ZSwgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICAgIHRoaXMueWVhclllYXJzID0gdGhpcy55ZWFyQ2FsZW5kYXJTZXJ2aWNlXG4gICAgICAgIC5nZW5lcmF0ZVllYXIodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy55ZWFyWWVhcnMgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2VcbiAgICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlQ2FsbGJhY2soXzogYW55KSB7XG4gIH07XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICB9XG5cbiAgdmFsaWRhdGUoZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IGFueSB7XG4gICAgaWYgKHRoaXMubWluRGF0ZSB8fCB0aGlzLm1heERhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlRm4oZm9ybUNvbnRyb2wudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh2YWx1ZTogTW9tZW50W10pOiBDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydEZyb21Nb21lbnRBcnJheShcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCxcbiAgICAgIHZhbHVlLFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUgfHwgdGhpcy5pbnB1dFZhbHVlVHlwZVxuICAgICk7XG4gIH1cblxuICBpbml0VmFsaWRhdG9ycygpIHtcbiAgICB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVWYWxpZGF0b3IoXG4gICAgICB7bWluRGF0ZTogdGhpcy5taW5EYXRlLCBtYXhEYXRlOiB0aGlzLm1heERhdGV9LFxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgJ3llYXInXG4gICAgKTtcblxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWQpKTtcbiAgfVxuXG4gIHllYXJDbGlja2VkKHllYXI6IElZZWFyKSB7XG4gICAgaWYgKHllYXIuc2VsZWN0ZWQgJiYgIXRoaXMuY29tcG9uZW50Q29uZmlnLnVuU2VsZWN0T25DbGljaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgLnVwZGF0ZVNlbGVjdGVkKHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QsIHRoaXMuc2VsZWN0ZWQsIHllYXIsICd5ZWFyJyk7XG4gICAgdGhpcy55ZWFyWWVhcnMgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2VcbiAgICAgIC5nZW5lcmF0ZVllYXIodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeWVhcik7XG4gIH1cblxuICBvbkxlZnROYXZDbGljaygpIHtcbiAgICBjb25zdCBmcm9tID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCkuc3VidHJhY3QoMTIsICd5ZWFyJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMueWVhclllYXJzID0gdGhpcy55ZWFyQ2FsZW5kYXJTZXJ2aWNlLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMub25MZWZ0TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvbkxlZnRTZWNvbmRhcnlOYXZDbGljaygpIHtcbiAgICBsZXQgbmF2aWdhdGVCeSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5O1xuICAgIGNvbnN0IGlzT3V0c2lkZVJhbmdlID0gdGhpcy5jb21wb25lbnRDb25maWcubWluICYmXG4gICAgICB0aGlzLmN1cnJlbnREYXRlVmlldy55ZWFyKCkgLSB0aGlzLmNvbXBvbmVudENvbmZpZy5taW4ueWVhcigpIDwgbmF2aWdhdGVCeTtcblxuICAgIGlmIChpc091dHNpZGVSYW5nZSkge1xuICAgICAgbmF2aWdhdGVCeSA9IHRoaXMuY3VycmVudERhdGVWaWV3LnllYXIoKSAtIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbi55ZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLnN1YnRyYWN0KG5hdmlnYXRlQnksICd5ZWFyJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMub25MZWZ0U2Vjb25kYXJ5TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvblJpZ2h0TmF2Q2xpY2soKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLmFkZCgxMiwgJ3llYXInKTtcbiAgICBjb25zdCB0byA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5vblJpZ2h0TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvblJpZ2h0U2Vjb25kYXJ5TmF2Q2xpY2soKSB7XG4gICAgbGV0IG5hdmlnYXRlQnkgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5tdWx0aXBsZVllYXJzTmF2aWdhdGVCeTtcbiAgICBjb25zdCBpc091dHNpZGVSYW5nZSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm1heCAmJlxuICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWF4LnllYXIoKSAtIHRoaXMuY3VycmVudERhdGVWaWV3LnllYXIoKSA8IG5hdmlnYXRlQnk7XG5cbiAgICBpZiAoaXNPdXRzaWRlUmFuZ2UpIHtcbiAgICAgIG5hdmlnYXRlQnkgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5tYXgueWVhcigpIC0gdGhpcy5jdXJyZW50RGF0ZVZpZXcueWVhcigpO1xuICAgIH1cblxuICAgIGNvbnN0IGZyb20gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKS5hZGQobmF2aWdhdGVCeSwgJ3llYXInKTtcbiAgICBjb25zdCB0byA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5vblJpZ2h0U2Vjb25kYXJ5TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICB0b2dnbGVDYWxlbmRhck1vZGUoKSB7XG4gICAgdGhpcy5vbk5hdkhlYWRlckJ0bkNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIGdldFllYXJCdG5Dc3NDbGFzcyh5ZWFyOiBJWWVhcik6IHtba2xhc3M6IHN0cmluZ106IGJvb2xlYW59IHtcbiAgICBjb25zdCBjc3NDbGFzczoge1trbGFzczogc3RyaW5nXTogYm9vbGVhbn0gPSB7XG4gICAgICAnZHAtc2VsZWN0ZWQnOiB5ZWFyLnNlbGVjdGVkLFxuICAgICAgJ2RwLWN1cnJlbnQteWVhcic6IHllYXIuY3VycmVudFllYXJcbiAgICB9O1xuICAgIGNvbnN0IGN1c3RvbUNzc0NsYXNzOiBzdHJpbmcgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2UuZ2V0WWVhckJ0bkNzc0NsYXNzKHRoaXMuY29tcG9uZW50Q29uZmlnLCB5ZWFyLmRhdGUpO1xuXG4gICAgaWYgKGN1c3RvbUNzc0NsYXNzKSB7XG4gICAgICBjc3NDbGFzc1tjdXN0b21Dc3NDbGFzc10gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBjc3NDbGFzcztcbiAgfVxuXG4gIHNob3VsZFNob3dDdXJyZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5zaG91bGRTaG93Q3VycmVudChcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dHb1RvQ3VycmVudCxcbiAgICAgICd5ZWFyJyxcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbixcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1heFxuICAgICk7XG4gIH1cblxuICBnb1RvQ3VycmVudCgpIHtcbiAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IG1vbWVudCgpO1xuICAgIHRoaXMub25Hb1RvQ3VycmVudC5lbWl0KCk7XG4gIH1cblxuICBtb3ZlQ2FsZW5kYXJUbyh0bzogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIGlmICh0bykge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9Nb21lbnQodG8sIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbmZpZ0NoYW5nZShjb25maWc6IFNpbXBsZUNoYW5nZSkge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIGNvbnN0IHByZXZDb25mOiBJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWwgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2UuZ2V0Q29uZmlnKGNvbmZpZy5wcmV2aW91c1ZhbHVlKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb25mOiBJWWVhckNhbGVuZGFyQ29uZmlnSW50ZXJuYWwgPSB0aGlzLnllYXJDYWxlbmRhclNlcnZpY2UuZ2V0Q29uZmlnKGNvbmZpZy5jdXJyZW50VmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy51dGlsc1NlcnZpY2Uuc2hvdWxkUmVzZXRDdXJyZW50VmlldyhwcmV2Q29uZiwgY3VycmVudENvbmYpKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnREYXRlVmlldyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=