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
var moment = momentNs;
var MonthCalendarComponent = /** @class */ (function () {
    function MonthCalendarComponent(monthCalendarService, utilsService, cd) {
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
    Object.defineProperty(MonthCalendarComponent.prototype, "selected", {
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
    Object.defineProperty(MonthCalendarComponent.prototype, "currentDateView", {
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
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
            this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
            this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
            this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
            this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.ngOnInit = /**
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
    MonthCalendarComponent.prototype.ngOnChanges = /**
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
    MonthCalendarComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.componentConfig = this.monthCalendarService.getConfig(this.config);
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
    MonthCalendarComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MonthCalendarComponent.prototype.registerOnChange = /**
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
    MonthCalendarComponent.prototype.onChangeCallback = /**
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
    MonthCalendarComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    MonthCalendarComponent.prototype.validate = /**
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
    MonthCalendarComponent.prototype.processOnChangeCallback = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.initValidators = /**
     * @return {?}
     */
    function () {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} month
     * @return {?}
     */
    MonthCalendarComponent.prototype.monthClicked = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (month.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(month);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onLeftNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onLeftSecondaryNavClick = /**
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
    MonthCalendarComponent.prototype.onRightNavClick = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(1, 'year');
        /** @type {?} */
        var to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onRightSecondaryNavClick = /**
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
    MonthCalendarComponent.prototype.toggleCalendarMode = /**
     * @return {?}
     */
    function () {
        this.onNavHeaderBtnClick.emit();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    MonthCalendarComponent.prototype.getMonthBtnCssClass = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var cssClass = {
            'dp-selected': month.selected,
            'dp-current-month': month.currentMonth
        };
        /** @type {?} */
        var customCssClass = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.shouldShowCurrent = /**
     * @return {?}
     */
    function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'month', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.goToCurrent = /**
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
    MonthCalendarComponent.prototype.moveCalendarTo = /**
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
    MonthCalendarComponent.prototype.handleConfigChange = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (config) {
            /** @type {?} */
            var prevConf = this.monthCalendarService.getConfig(config.previousValue);
            /** @type {?} */
            var currentConf = this.monthCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
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
                            function () { return MonthCalendarComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MonthCalendarComponent; })),
                            multi: true
                        }
                    ],
                    styles: ["dp-month-calendar{display:inline-block}dp-month-calendar .dp-month-calendar-container{background:#fff}dp-month-calendar .dp-calendar-wrapper{border:1px solid #000}dp-month-calendar .dp-calendar-month{box-sizing:border-box;width:52.5px;height:52.5px;cursor:pointer}dp-month-calendar .dp-calendar-month.dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-calendar-weekday{height:25px;width:30px;line-height:25px;background:#e0e0e0;border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-wrapper{border:1px solid #e0e0e0}dp-month-calendar.dp-material .dp-calendar-month{box-sizing:border-box;background:#fff;border-radius:50%;border:none;outline:0}dp-month-calendar.dp-material .dp-calendar-month:hover{background:#e0e0e0}dp-month-calendar.dp-material .dp-selected{background:#106cc8;color:#fff}dp-month-calendar.dp-material .dp-selected:hover{background:#106cc8}dp-month-calendar.dp-material .dp-current-month{border:1px solid #106cc8}"]
                }] }
    ];
    /** @nocollapse */
    MonthCalendarComponent.ctorParameters = function () { return [
        { type: MonthCalendarService },
        { type: UtilsService },
        { type: ChangeDetectorRef }
    ]; };
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
    return MonthCalendarComponent;
}());
export { MonthCalendarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibW9udGgtY2FsZW5kYXIvbW9udGgtY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUdMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFHbkMsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFHbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7O0lBSTlELE1BQU0sR0FBRyxRQUFRO0FBRXZCO0lBK0VFLGdDQUE0QixvQkFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsRUFBcUI7UUFGckIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXREdkMsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELHdCQUFtQixHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsY0FBUyxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELGVBQVUsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6RCx1QkFBa0IsR0FBNEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqRSx3QkFBbUIsR0FBNEIsSUFBSSxZQUFZLEVBQUUs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aUU7O0lBQ2pFLDJDQUFrRTs7SUFDbEUsNENBQW1FOztJQUNuRSxvREFBMkU7O0lBQzNFLHFEQUE0RTs7SUFFNUUsMENBQTBCOztJQUMxQixpREFBOEM7O0lBQzlDLDJDQUFvQjs7SUFDcEIsNENBQXVCOztJQUN2QixrREFBeUI7O0lBQ3pCLDRDQUEwQjs7SUFDMUIsZ0RBQStCOztJQUMvQiw0Q0FBMEI7O0lBQzFCLG9EQUFtQzs7SUFDbkMsMENBQWlCOztJQUNqQiw2Q0FBcUI7O0lBQ3JCLDhDQUFzQjs7SUFDdEIsc0RBQThCOztJQUM5Qix1REFBK0I7O0lBRS9CLHFDQUdFOztJQTBCVSxzREFBMEQ7O0lBQzFELDhDQUEwQzs7SUFDMUMsb0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlLWVudW0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJTW9udGh9IGZyb20gJy4vbW9udGgubW9kZWwnO1xuaW1wb3J0IHtNb250aENhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9tb250aC1jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIG1vbWVudE5zIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7SU1vbnRoQ2FsZW5kYXJDb25maWcsIElNb250aENhbGVuZGFyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4vbW9udGgtY2FsZW5kYXItY29uZmlnJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRlVmFsaWRhdG9yfSBmcm9tICcuLi9jb21tb24vdHlwZXMvdmFsaWRhdG9yLnR5cGUnO1xuaW1wb3J0IHtTaW5nbGVDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2luZ2xlLWNhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7SU5hdkV2ZW50fSBmcm9tICcuLi9jb21tb24vbW9kZWxzL25hdmlnYXRpb24tZXZlbnQubW9kZWwnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50TnM7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RwLW1vbnRoLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICdtb250aC1jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydtb250aC1jYWxlbmRhci5jb21wb25lbnQubGVzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTW9udGhDYWxlbmRhclNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNb250aENhbGVuZGFyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTW9udGhDYWxlbmRhckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNb250aENhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuICBASW5wdXQoKSBjb25maWc6IElNb250aENhbGVuZGFyQ29uZmlnO1xuICBASW5wdXQoKSBkaXNwbGF5RGF0ZTogTW9tZW50O1xuICBASW5wdXQoKSBtaW5EYXRlOiBNb21lbnQ7XG4gIEBJbnB1dCgpIG1heERhdGU6IE1vbWVudDtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8SU1vbnRoPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTmF2SGVhZGVyQnRuQ2xpY2s6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uR29Ub0N1cnJlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTGVmdE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTGVmdFNlY29uZGFyeU5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0U2Vjb25kYXJ5TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpc0luaXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBjb21wb25lbnRDb25maWc6IElNb250aENhbGVuZGFyQ29uZmlnSW50ZXJuYWw7XG4gIF9zZWxlY3RlZDogTW9tZW50W107XG4gIHllYXJNb250aHM6IElNb250aFtdW107XG4gIF9jdXJyZW50RGF0ZVZpZXc6IE1vbWVudDtcbiAgaW5wdXRWYWx1ZTogQ2FsZW5kYXJWYWx1ZTtcbiAgaW5wdXRWYWx1ZVR5cGU6IEVDYWxlbmRhclZhbHVlO1xuICB2YWxpZGF0ZUZuOiBEYXRlVmFsaWRhdG9yO1xuICBfc2hvdWxkU2hvd0N1cnJlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBuYXZMYWJlbDogc3RyaW5nO1xuICBzaG93TGVmdE5hdjogYm9vbGVhbjtcbiAgc2hvd1JpZ2h0TmF2OiBib29sZWFuO1xuICBzaG93U2Vjb25kYXJ5TGVmdE5hdjogYm9vbGVhbjtcbiAgc2hvd1NlY29uZGFyeVJpZ2h0TmF2OiBib29sZWFuO1xuXG4gIGFwaSA9IHtcbiAgICB0b2dnbGVDYWxlbmRhcjogdGhpcy50b2dnbGVDYWxlbmRhck1vZGUuYmluZCh0aGlzKSxcbiAgICBtb3ZlQ2FsZW5kYXJUbzogdGhpcy5tb3ZlQ2FsZW5kYXJUby5iaW5kKHRoaXMpXG4gIH07XG5cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBNb21lbnRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2soc2VsZWN0ZWQpKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpOiBNb21lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgc2V0IGN1cnJlbnREYXRlVmlldyhjdXJyZW50OiBNb21lbnQpIHtcbiAgICB0aGlzLl9jdXJyZW50RGF0ZVZpZXcgPSBjdXJyZW50LmNsb25lKCk7XG4gICAgdGhpcy55ZWFyTW9udGhzID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZVxuICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5fY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLm5hdkxhYmVsID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZS5nZXRIZWFkZXJMYWJlbCh0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcpO1xuICAgIHRoaXMuc2hvd0xlZnROYXYgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlLnNob3VsZFNob3dMZWZ0KHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbiwgdGhpcy5fY3VycmVudERhdGVWaWV3KTtcbiAgICB0aGlzLnNob3dSaWdodE5hdiA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2Uuc2hvdWxkU2hvd1JpZ2h0KHRoaXMuY29tcG9uZW50Q29uZmlnLm1heCwgdGhpcy5jdXJyZW50RGF0ZVZpZXcpO1xuICAgIHRoaXMuc2hvd1NlY29uZGFyeUxlZnROYXYgPSB0aGlzLmNvbXBvbmVudENvbmZpZy5zaG93TXVsdGlwbGVZZWFyc05hdmlnYXRpb24gJiYgdGhpcy5zaG93TGVmdE5hdjtcbiAgICB0aGlzLnNob3dTZWNvbmRhcnlSaWdodE5hdiA9IHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dNdWx0aXBsZVllYXJzTmF2aWdhdGlvbiAmJiB0aGlzLnNob3dSaWdodE5hdjtcbiAgfVxuXG4gIGdldCBjdXJyZW50RGF0ZVZpZXcoKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudERhdGVWaWV3O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG1vbnRoQ2FsZW5kYXJTZXJ2aWNlOiBNb250aENhbGVuZGFyU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzSW5pdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuaXNJbml0ZWQpIHtcbiAgICAgIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBjb25maWd9ID0gY2hhbmdlcztcblxuICAgICAgdGhpcy5oYW5kbGVDb25maWdDaGFuZ2UoY29uZmlnKTtcbiAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICBpZiAobWluRGF0ZSB8fCBtYXhEYXRlKSB7XG4gICAgICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29tcG9uZW50Q29uZmlnID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZS5nZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkIHx8IFtdO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5kaXNwbGF5RGF0ZVxuICAgICAgPyB0aGlzLmRpc3BsYXlEYXRlXG4gICAgICA6IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5nZXREZWZhdWx0RGlzcGxheURhdGUoXG4gICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pblxuICAgICAgICApO1xuICAgIHRoaXMuaW5wdXRWYWx1ZVR5cGUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICB0aGlzLl9zaG91bGRTaG93Q3VycmVudCA9IHRoaXMuc2hvdWxkU2hvd0N1cnJlbnQoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IENhbGVuZGFyVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgIC5jb252ZXJ0VG9Nb21lbnRBcnJheSh2YWx1ZSwgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KTtcbiAgICAgIHRoaXMueWVhck1vbnRocyA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2VcbiAgICAgICAgLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgdGhpcy5pbnB1dFZhbHVlVHlwZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldElucHV0VHlwZSh0aGlzLmlucHV0VmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICB0aGlzLnllYXJNb250aHMgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlXG4gICAgICAgIC5nZW5lcmF0ZVllYXIodGhpcy5jb21wb25lbnRDb25maWcsIHRoaXMuY3VycmVudERhdGVWaWV3LCB0aGlzLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICBvbkNoYW5nZUNhbGxiYWNrKF86IGFueSkge1xuICB9O1xuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgfVxuXG4gIHZhbGlkYXRlKGZvcm1Db250cm9sOiBGb3JtQ29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBhbnkge1xuICAgIGlmICh0aGlzLm1pbkRhdGUgfHwgdGhpcy5tYXhEYXRlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUZuKGZvcm1Db250cm9sLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICgpID0+IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2sodmFsdWU6IE1vbWVudFtdKTogQ2FsZW5kYXJWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRGcm9tTW9tZW50QXJyYXkoXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsXG4gICAgICB2YWx1ZSxcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLnJldHVybmVkVmFsdWVUeXBlIHx8IHRoaXMuaW5wdXRWYWx1ZVR5cGVcbiAgICApO1xuICB9XG5cbiAgaW5pdFZhbGlkYXRvcnMoKSB7XG4gICAgdGhpcy52YWxpZGF0ZUZuID0gdGhpcy52YWxpZGF0ZUZuID0gdGhpcy51dGlsc1NlcnZpY2UuY3JlYXRlVmFsaWRhdG9yKFxuICAgICAge21pbkRhdGU6IHRoaXMubWluRGF0ZSwgbWF4RGF0ZTogdGhpcy5tYXhEYXRlfSxcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCxcbiAgICAgICdtb250aCdcbiAgICApO1xuXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2sodGhpcy5zZWxlY3RlZCkpO1xuICB9XG5cbiAgbW9udGhDbGlja2VkKG1vbnRoOiBJTW9udGgpIHtcbiAgICBpZiAobW9udGguc2VsZWN0ZWQgJiYgIXRoaXMuY29tcG9uZW50Q29uZmlnLnVuU2VsZWN0T25DbGljaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgLnVwZGF0ZVNlbGVjdGVkKHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QsIHRoaXMuc2VsZWN0ZWQsIG1vbnRoLCAnbW9udGgnKTtcbiAgICB0aGlzLnllYXJNb250aHMgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlXG4gICAgICAuZ2VuZXJhdGVZZWFyKHRoaXMuY29tcG9uZW50Q29uZmlnLCB0aGlzLmN1cnJlbnREYXRlVmlldywgdGhpcy5zZWxlY3RlZCk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KG1vbnRoKTtcbiAgfVxuXG4gIG9uTGVmdE5hdkNsaWNrKCkge1xuICAgIGNvbnN0IGZyb20gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKS5zdWJ0cmFjdCgxLCAneWVhcicpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLnllYXJNb250aHMgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlLmdlbmVyYXRlWWVhcih0aGlzLmNvbXBvbmVudENvbmZpZywgdGhpcy5jdXJyZW50RGF0ZVZpZXcsIHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMub25MZWZ0TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvbkxlZnRTZWNvbmRhcnlOYXZDbGljaygpIHtcbiAgICBsZXQgbmF2aWdhdGVCeSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5O1xuICAgIGNvbnN0IGlzT3V0c2lkZVJhbmdlID0gdGhpcy5jb21wb25lbnRDb25maWcubWluICYmXG4gICAgICB0aGlzLmN1cnJlbnREYXRlVmlldy55ZWFyKCkgLSB0aGlzLmNvbXBvbmVudENvbmZpZy5taW4ueWVhcigpIDwgbmF2aWdhdGVCeTtcblxuICAgIGlmIChpc091dHNpZGVSYW5nZSkge1xuICAgICAgbmF2aWdhdGVCeSA9IHRoaXMuY3VycmVudERhdGVWaWV3LnllYXIoKSAtIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pbi55ZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLnN1YnRyYWN0KG5hdmlnYXRlQnksICd5ZWFyJyk7XG4gICAgY29uc3QgdG8gPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpO1xuICAgIHRoaXMub25MZWZ0U2Vjb25kYXJ5TmF2LmVtaXQoe2Zyb20sIHRvfSk7XG4gIH1cblxuICBvblJpZ2h0TmF2Q2xpY2soKSB7XG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLmFkZCgxLCAneWVhcicpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm9uUmlnaHROYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIG9uUmlnaHRTZWNvbmRhcnlOYXZDbGljaygpIHtcbiAgICBsZXQgbmF2aWdhdGVCeSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm11bHRpcGxlWWVhcnNOYXZpZ2F0ZUJ5O1xuICAgIGNvbnN0IGlzT3V0c2lkZVJhbmdlID0gdGhpcy5jb21wb25lbnRDb25maWcubWF4ICYmXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5tYXgueWVhcigpIC0gdGhpcy5jdXJyZW50RGF0ZVZpZXcueWVhcigpIDwgbmF2aWdhdGVCeTtcblxuICAgIGlmIChpc091dHNpZGVSYW5nZSkge1xuICAgICAgbmF2aWdhdGVCeSA9IHRoaXMuY29tcG9uZW50Q29uZmlnLm1heC55ZWFyKCkgLSB0aGlzLmN1cnJlbnREYXRlVmlldy55ZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbSA9IHRoaXMuY3VycmVudERhdGVWaWV3LmNsb25lKCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmN1cnJlbnREYXRlVmlldy5jbG9uZSgpLmFkZChuYXZpZ2F0ZUJ5LCAneWVhcicpO1xuICAgIGNvbnN0IHRvID0gdGhpcy5jdXJyZW50RGF0ZVZpZXcuY2xvbmUoKTtcbiAgICB0aGlzLm9uUmlnaHRTZWNvbmRhcnlOYXYuZW1pdCh7ZnJvbSwgdG99KTtcbiAgfVxuXG4gIHRvZ2dsZUNhbGVuZGFyTW9kZSgpIHtcbiAgICB0aGlzLm9uTmF2SGVhZGVyQnRuQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgZ2V0TW9udGhCdG5Dc3NDbGFzcyhtb250aDogSU1vbnRoKToge1trbGFzczogc3RyaW5nXTogYm9vbGVhbn0ge1xuICAgIGNvbnN0IGNzc0NsYXNzOiB7W2tsYXNzOiBzdHJpbmddOiBib29sZWFufSA9IHtcbiAgICAgICdkcC1zZWxlY3RlZCc6IG1vbnRoLnNlbGVjdGVkLFxuICAgICAgJ2RwLWN1cnJlbnQtbW9udGgnOiBtb250aC5jdXJyZW50TW9udGhcbiAgICB9O1xuICAgIGNvbnN0IGN1c3RvbUNzc0NsYXNzOiBzdHJpbmcgPSB0aGlzLm1vbnRoQ2FsZW5kYXJTZXJ2aWNlLmdldE1vbnRoQnRuQ3NzQ2xhc3ModGhpcy5jb21wb25lbnRDb25maWcsIG1vbnRoLmRhdGUpO1xuXG4gICAgaWYgKGN1c3RvbUNzc0NsYXNzKSB7XG4gICAgICBjc3NDbGFzc1tjdXN0b21Dc3NDbGFzc10gPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBjc3NDbGFzcztcbiAgfVxuXG4gIHNob3VsZFNob3dDdXJyZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5zaG91bGRTaG93Q3VycmVudChcbiAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLnNob3dHb1RvQ3VycmVudCxcbiAgICAgICdtb250aCcsXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5taW4sXG4gICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5tYXhcbiAgICApO1xuICB9XG5cbiAgZ29Ub0N1cnJlbnQoKSB7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSBtb21lbnQoKTtcbiAgICB0aGlzLm9uR29Ub0N1cnJlbnQuZW1pdCgpO1xuICB9XG5cbiAgbW92ZUNhbGVuZGFyVG8odG86IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICBpZiAodG8pIHtcbiAgICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFRvTW9tZW50KHRvLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDb25maWdDaGFuZ2UoY29uZmlnOiBTaW1wbGVDaGFuZ2UpIHtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBjb25zdCBwcmV2Q29uZjogSU1vbnRoQ2FsZW5kYXJDb25maWdJbnRlcm5hbCA9IHRoaXMubW9udGhDYWxlbmRhclNlcnZpY2UuZ2V0Q29uZmlnKGNvbmZpZy5wcmV2aW91c1ZhbHVlKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb25mOiBJTW9udGhDYWxlbmRhckNvbmZpZ0ludGVybmFsID0gdGhpcy5tb250aENhbGVuZGFyU2VydmljZS5nZXRDb25maWcoY29uZmlnLmN1cnJlbnRWYWx1ZSk7XG5cbiAgICAgIGlmICh0aGlzLnV0aWxzU2VydmljZS5zaG91bGRSZXNldEN1cnJlbnRWaWV3KHByZXZDb25mLCBjdXJyZW50Q29uZikpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudERhdGVWaWV3ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==