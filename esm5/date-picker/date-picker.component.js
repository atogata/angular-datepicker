/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DomHelper } from '../common/services/dom-appender/dom-appender.service';
import { UtilsService } from '../common/services/utils/utils.service';
import { ECalendarMode } from '../common/types/calendar-mode-enum';
import { ECalendarValue } from '../common/types/calendar-value-enum';
import { DayCalendarComponent } from '../day-calendar/day-calendar.component';
import { DayCalendarService } from '../day-calendar/day-calendar.service';
import { DayTimeCalendarService } from '../day-time-calendar/day-time-calendar.service';
import { TimeSelectComponent } from '../time-select/time-select.component';
import { TimeSelectService } from '../time-select/time-select.service';
import { DatePickerService } from './date-picker.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonthCalendarComponent } from '../month-calendar/month-calendar.component';
import { YearCalendarComponent } from '../year-calendar/year-calendar.component';
import { DayTimeCalendarComponent } from '../day-time-calendar/day-time-calendar.component';
import { SelectEvent } from '../common/types/selection-evet.enum.';
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent(dayPickerService, domHelper, elemRef, renderer, utilsService, cd) {
        this.dayPickerService = dayPickerService;
        this.domHelper = domHelper;
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.utilsService = utilsService;
        this.cd = cd;
        this.isInitialized = false;
        this.mode = 'day';
        this.placeholder = '';
        this.disabled = false;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onSelect = new EventEmitter();
        this._areCalendarsShown = false;
        this.hideStateHelper = false;
        this._selected = [];
        this.isFocusedTrigger = false;
        this.handleInnerElementClickUnlisteners = [];
        this.globalListenersUnlisteners = [];
        this.api = {
            open: this.showCalendars.bind(this),
            close: this.hideCalendar.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
        this.selectEvent = SelectEvent;
    }
    Object.defineProperty(DatePickerComponent.prototype, "selected", {
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
            this.inputElementValue = ((/** @type {?} */ (this.utilsService
                .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr))))
                .join(' | ');
            /** @type {?} */
            var val = this.processOnChangeCallback(selected);
            this.onChangeCallback(val, false);
            this.onChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "areCalendarsShown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._areCalendarsShown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.startGlobalListeners();
                this.domHelper.appendElementToPosition({
                    container: this.appendToElement,
                    element: this.calendarWrapper,
                    anchor: this.inputElementContainer,
                    dimElem: this.popupElem,
                    drops: this.componentConfig.drops,
                    opens: this.componentConfig.opens
                });
            }
            else {
                this.stopGlobalListeners();
                this.dayPickerService.pickerClosed();
            }
            this._areCalendarsShown = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "openOnFocus", {
        get: /**
         * @return {?}
         */
        function () {
            return this.componentConfig.openOnFocus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "openOnClick", {
        get: /**
         * @return {?}
         */
        function () {
            return this.componentConfig.openOnClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "currentDateView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentDateView;
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._currentDateView = date;
            if (this.dayCalendarRef) {
                this.dayCalendarRef.moveCalendarTo(date);
            }
            if (this.monthCalendarRef) {
                this.monthCalendarRef.moveCalendarTo(date);
            }
            if (this.dayTimeCalendarRef) {
                this.dayTimeCalendarRef.moveCalendarTo(date);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onClick = /**
     * @return {?}
     */
    function () {
        if (!this.openOnClick) {
            return;
        }
        if (!this.isFocusedTrigger && !this.disabled) {
            this.hideStateHelper = true;
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onBodyClick = /**
     * @return {?}
     */
    function () {
        if (this.componentConfig.hideOnOutsideClick) {
            if (!this.hideStateHelper && this.areCalendarsShown) {
                this.hideCalendar();
            }
            this.hideStateHelper = false;
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onScroll = /**
     * @return {?}
     */
    function () {
        if (this.areCalendarsShown) {
            this.domHelper.setElementPosition({
                container: this.appendToElement,
                element: this.calendarWrapper,
                anchor: this.inputElementContainer,
                dimElem: this.popupElem,
                drops: this.componentConfig.drops,
                opens: this.componentConfig.opens
            });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputValue = value;
        if (value || value === '') {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.init();
        }
        else {
            this.selected = [];
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @param {?} changedByInput
     * @return {?}
     */
    DatePickerComponent.prototype.onChangeCallback = /**
     * @param {?} _
     * @param {?} changedByInput
     * @return {?}
     */
    function (_, changedByInput) {
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onTouchedCallback = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DatePickerComponent.prototype.validate = /**
     * @param {?} formControl
     * @return {?}
     */
    function (formControl) {
        return this.validateFn(formControl.value);
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    DatePickerComponent.prototype.processOnChangeCallback = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (typeof selected === 'string') {
            return selected;
        }
        else {
            return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.componentConfig.returnedValueType || this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect));
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.initValidators = /**
     * @return {?}
     */
    function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, this.componentConfig.format, this.mode);
        this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.isInitialized = true;
        this.init();
        this.initValidators();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.isInitialized) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.setElementPositionInDom();
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DatePickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.setElementPositionInDom = /**
     * @return {?}
     */
    function () {
        this.calendarWrapper = (/** @type {?} */ (this.calendarContainer.nativeElement));
        this.setInputElementContainer();
        this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
        this.handleInnerElementClick(this.popupElem);
        var appendTo = this.componentConfig.appendTo;
        if (appendTo) {
            if (typeof appendTo === 'string') {
                this.appendToElement = (/** @type {?} */ (document.querySelector((/** @type {?} */ (appendTo)))));
            }
            else {
                this.appendToElement = (/** @type {?} */ (appendTo));
            }
        }
        else {
            this.appendToElement = this.elemRef.nativeElement;
        }
        this.appendToElement.appendChild(this.calendarWrapper);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.setInputElementContainer = /**
     * @return {?}
     */
    function () {
        this.inputElementContainer = this.utilsService.getNativeElement(this.componentConfig.inputElementContainer)
            || this.elemRef.nativeElement.querySelector('.dp-input-container')
            || document.body;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DatePickerComponent.prototype.handleInnerElementClick = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', (/**
         * @return {?}
         */
        function () {
            _this.hideStateHelper = true;
        })));
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
        this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
        this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.inputFocused = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.openOnFocus) {
            return;
        }
        this.isFocusedTrigger = true;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (!_this.areCalendarsShown) {
                _this.showCalendars();
            }
            _this.hideStateHelper = false;
            _this.isFocusedTrigger = false;
            _this.cd.markForCheck();
        }), this.componentConfig.onOpenDelay);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.inputBlurred = /**
     * @return {?}
     */
    function () {
        this.onTouchedCallback();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showCalendars = /**
     * @return {?}
     */
    function () {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
        if (this.timeSelectRef) {
            this.timeSelectRef.api.triggerChange();
        }
        this.open.emit();
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.hideCalendar = /**
     * @return {?}
     */
    function () {
        this.areCalendarsShown = false;
        if (this.dayCalendarRef) {
            this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
        }
        this.close.emit();
        this.cd.markForCheck();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerComponent.prototype.onViewDateChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var strVal = value ? this.utilsService.convertToString(value, this.componentConfig.format) : '';
        if (this.dayPickerService.isValidInputDateValue(strVal, this.componentConfig)) {
            this.selected = this.dayPickerService.convertInputValueToMomentArray(strVal, this.componentConfig);
            this.currentDateView = this.selected.length
                ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min)
                : this.currentDateView;
            this.onSelect.emit({
                date: strVal,
                type: SelectEvent.INPUT,
                granularity: null
            });
        }
        else {
            this._selected = this.utilsService
                .getValidMomentArray(strVal, this.componentConfig.format);
            this.onChangeCallback(this.processOnChangeCallback(strVal), true);
        }
    };
    /**
     * @param {?} date
     * @param {?} granularity
     * @param {?} type
     * @param {?=} ignoreClose
     * @return {?}
     */
    DatePickerComponent.prototype.dateSelected = /**
     * @param {?} date
     * @param {?} granularity
     * @param {?} type
     * @param {?=} ignoreClose
     * @return {?}
     */
    function (date, granularity, type, ignoreClose) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
        if (!ignoreClose) {
            this.onDateClick();
        }
        this.onSelect.emit({
            date: date.date,
            granularity: granularity,
            type: type
        });
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onDateClick = /**
     * @return {?}
     */
    function () {
        if (this.componentConfig.closeOnSelect) {
            setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatePickerComponent.prototype.onKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case (9):
            case (27):
                this.hideCalendar();
                break;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.moveCalendarTo = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format);
        this.currentDateView = momentDate;
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DatePickerComponent.prototype.onLeftNavClick = /**
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
    DatePickerComponent.prototype.onRightNavClick = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.startGlobalListeners = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.globalListenersUnlisteners.push(this.renderer.listen(document, 'keydown', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.onKeyPress(e);
        })), this.renderer.listen(document, 'scroll', (/**
         * @return {?}
         */
        function () {
            _this.onScroll();
        })), this.renderer.listen(document, 'click', (/**
         * @return {?}
         */
        function () {
            _this.onBodyClick();
        })));
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.stopGlobalListeners = /**
     * @return {?}
     */
    function () {
        this.globalListenersUnlisteners.forEach((/**
         * @param {?} ul
         * @return {?}
         */
        function (ul) { return ul(); }));
        this.globalListenersUnlisteners = [];
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.handleInnerElementClickUnlisteners.forEach((/**
         * @param {?} ul
         * @return {?}
         */
        function (ul) { return ul(); }));
        if (this.appendToElement) {
            this.appendToElement.removeChild(this.calendarWrapper);
        }
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dp-date-picker',
                    template: "<div [ngClass]=\"{'dp-open': areCalendarsShown}\">\n  <div class=\"dp-input-container\"\n       [hidden]=\"componentConfig.hideInputContainer\"\n       [attr.data-hidden]=\"componentConfig.hideInputContainer\">\n    <input type=\"text\"\n           class=\"dp-picker-input\"\n           [placeholder]=\"placeholder\"\n           [ngModel]=\"inputElementValue\"\n           (ngModelChange)=\"onViewDateChange($event)\"\n           (focus)=\"inputFocused()\"\n           (blur)=\"inputBlurred()\"\n           [readonly]=\"componentConfig.disableKeypress\"\n           [disabled]=\"disabled\"/>\n  </div>\n  <div #container>\n    <div class=\"dp-popup {{theme}}\"\n         [ngSwitch]=\"mode\"\n         [hidden]=\"!_areCalendarsShown\"\n         [attr.data-hidden]=\"!_areCalendarsShown\">\n      <dp-day-calendar #dayCalendar\n                       *ngSwitchCase=\"'day'\"\n                       [config]=\"dayCalendarConfig\"\n                       [ngModel]=\"_selected\"\n                       [displayDate]=\"displayDate\"\n                       [theme]=\"theme\"\n                       (onSelect)=\"dateSelected($event, 'day', selectEvent.SELECTION, false)\"\n                       (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                       (onLeftNav)=\"onLeftNavClick($event)\"\n                       (onRightNav)=\"onRightNavClick($event)\">\n      </dp-day-calendar>\n\n      <dp-month-calendar #monthCalendar\n                         *ngSwitchCase=\"'month'\"\n                         [config]=\"dayCalendarConfig\"\n                         [ngModel]=\"_selected\"\n                         [displayDate]=\"displayDate\"\n                         [theme]=\"theme\"\n                         (onSelect)=\"dateSelected($event, 'month', selectEvent.SELECTION, false)\"\n                         (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                         (onLeftNav)=\"onLeftNavClick($event)\"\n                         (onRightNav)=\"onRightNavClick($event)\">\n      </dp-month-calendar>\n\n      <dp-year-calendar #yearCalendar\n                         *ngSwitchCase=\"'year'\"\n                         [config]=\"dayCalendarConfig\"\n                         [ngModel]=\"_selected\"\n                         [displayDate]=\"displayDate\"\n                         [theme]=\"theme\"\n                         (onSelect)=\"dateSelected($event, 'year', selectEvent.SELECTION, false)\"\n                         (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                         (onLeftNav)=\"onLeftNavClick($event)\"\n                         (onRightNav)=\"onRightNavClick($event)\">\n      </dp-year-calendar>\n\n      <dp-time-select #timeSelect\n                      *ngSwitchCase=\"'time'\"\n                      [config]=\"timeSelectConfig\"\n                      [ngModel]=\"_selected && _selected[0]\"\n                      (onChange)=\"dateSelected($event, 'second', selectEvent.SELECTION, true)\"\n                      [theme]=\"theme\">\n      </dp-time-select>\n\n      <dp-day-time-calendar #daytimeCalendar\n                            *ngSwitchCase=\"'daytime'\"\n                            [config]=\"dayTimeCalendarConfig\"\n                            [displayDate]=\"displayDate\"\n                            [ngModel]=\"_selected && _selected[0]\"\n                            [theme]=\"theme\"\n                            (onChange)=\"dateSelected($event, 'second', selectEvent.SELECTION, true)\"\n                            (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                            (onLeftNav)=\"onLeftNavClick($event)\"\n                            (onRightNav)=\"onRightNavClick($event)\">\n      </dp-day-time-calendar>\n    </div>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        DatePickerService,
                        DayTimeCalendarService,
                        DayCalendarService,
                        TimeSelectService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatePickerComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatePickerComponent; })),
                            multi: true
                        }
                    ],
                    styles: ["dp-date-picker{display:inline-block}dp-date-picker.dp-material .dp-picker-input{box-sizing:border-box;height:30px;width:213px;font-size:13px;outline:0}dp-date-picker .dp-input-container{position:relative}dp-date-picker .dp-selected{background:#106cc8;color:#fff}.dp-popup{position:relative;background:#fff;box-shadow:1px 1px 5px 0 rgba(0,0,0,.1);border-left:1px solid rgba(0,0,0,.1);border-right:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1);z-index:9999;white-space:nowrap}"]
                }] }
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: DatePickerService },
        { type: DomHelper },
        { type: ElementRef },
        { type: Renderer },
        { type: UtilsService },
        { type: ChangeDetectorRef }
    ]; };
    DatePickerComponent.propDecorators = {
        config: [{ type: Input }],
        mode: [{ type: Input }],
        placeholder: [{ type: Input }],
        disabled: [{ type: Input }],
        displayDate: [{ type: Input }],
        theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        onChange: [{ type: Output }],
        onGoToCurrent: [{ type: Output }],
        onLeftNav: [{ type: Output }],
        onRightNav: [{ type: Output }],
        onSelect: [{ type: Output }],
        calendarContainer: [{ type: ViewChild, args: ['container',] }],
        dayCalendarRef: [{ type: ViewChild, args: ['dayCalendar',] }],
        monthCalendarRef: [{ type: ViewChild, args: ['monthCalendar',] }],
        yearCalendarRef: [{ type: ViewChild, args: ['yearCalendar',] }],
        dayTimeCalendarRef: [{ type: ViewChild, args: ['daytimeCalendar',] }],
        timeSelectRef: [{ type: ViewChild, args: ['timeSelect',] }],
        onClick: [{ type: HostListener, args: ['click',] }],
        onScroll: [{ type: HostListener, args: ['window:resize',] }]
    };
    return DatePickerComponent;
}());
export { DatePickerComponent };
if (false) {
    /** @type {?} */
    DatePickerComponent.prototype.isInitialized;
    /** @type {?} */
    DatePickerComponent.prototype.config;
    /** @type {?} */
    DatePickerComponent.prototype.mode;
    /** @type {?} */
    DatePickerComponent.prototype.placeholder;
    /** @type {?} */
    DatePickerComponent.prototype.disabled;
    /** @type {?} */
    DatePickerComponent.prototype.displayDate;
    /** @type {?} */
    DatePickerComponent.prototype.theme;
    /** @type {?} */
    DatePickerComponent.prototype.minDate;
    /** @type {?} */
    DatePickerComponent.prototype.maxDate;
    /** @type {?} */
    DatePickerComponent.prototype.minTime;
    /** @type {?} */
    DatePickerComponent.prototype.maxTime;
    /** @type {?} */
    DatePickerComponent.prototype.open;
    /** @type {?} */
    DatePickerComponent.prototype.close;
    /** @type {?} */
    DatePickerComponent.prototype.onChange;
    /** @type {?} */
    DatePickerComponent.prototype.onGoToCurrent;
    /** @type {?} */
    DatePickerComponent.prototype.onLeftNav;
    /** @type {?} */
    DatePickerComponent.prototype.onRightNav;
    /** @type {?} */
    DatePickerComponent.prototype.onSelect;
    /** @type {?} */
    DatePickerComponent.prototype.calendarContainer;
    /** @type {?} */
    DatePickerComponent.prototype.dayCalendarRef;
    /** @type {?} */
    DatePickerComponent.prototype.monthCalendarRef;
    /** @type {?} */
    DatePickerComponent.prototype.yearCalendarRef;
    /** @type {?} */
    DatePickerComponent.prototype.dayTimeCalendarRef;
    /** @type {?} */
    DatePickerComponent.prototype.timeSelectRef;
    /** @type {?} */
    DatePickerComponent.prototype.componentConfig;
    /** @type {?} */
    DatePickerComponent.prototype.dayCalendarConfig;
    /** @type {?} */
    DatePickerComponent.prototype.dayTimeCalendarConfig;
    /** @type {?} */
    DatePickerComponent.prototype.timeSelectConfig;
    /** @type {?} */
    DatePickerComponent.prototype._areCalendarsShown;
    /** @type {?} */
    DatePickerComponent.prototype.hideStateHelper;
    /** @type {?} */
    DatePickerComponent.prototype._selected;
    /** @type {?} */
    DatePickerComponent.prototype.inputValue;
    /** @type {?} */
    DatePickerComponent.prototype.isFocusedTrigger;
    /** @type {?} */
    DatePickerComponent.prototype._currentDateView;
    /** @type {?} */
    DatePickerComponent.prototype.inputElementValue;
    /** @type {?} */
    DatePickerComponent.prototype.calendarWrapper;
    /** @type {?} */
    DatePickerComponent.prototype.appendToElement;
    /** @type {?} */
    DatePickerComponent.prototype.inputElementContainer;
    /** @type {?} */
    DatePickerComponent.prototype.popupElem;
    /** @type {?} */
    DatePickerComponent.prototype.handleInnerElementClickUnlisteners;
    /** @type {?} */
    DatePickerComponent.prototype.globalListenersUnlisteners;
    /** @type {?} */
    DatePickerComponent.prototype.validateFn;
    /** @type {?} */
    DatePickerComponent.prototype.api;
    /** @type {?} */
    DatePickerComponent.prototype.selectEvent;
    /**
     * @type {?}
     * @private
     */
    DatePickerComponent.prototype.dayPickerService;
    /**
     * @type {?}
     * @private
     */
    DatePickerComponent.prototype.domHelper;
    /**
     * @type {?}
     * @private
     */
    DatePickerComponent.prototype.elemRef;
    /**
     * @type {?}
     * @private
     */
    DatePickerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DatePickerComponent.prototype.utilsService;
    /** @type {?} */
    DatePickerComponent.prototype.cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRXBFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUVqRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFHbkUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFFdEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFHckUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFDTixRQUFRLEVBRVIsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0wsYUFBYSxFQUNiLGlCQUFpQixFQUdsQixNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxxQkFBcUIsRUFB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QUM1Qyx5Q0FBMEI7O0lBQzFCLGtDQUlFOztJQUNGLDBDQUEwQjs7Ozs7SUFtRWQsK0NBQW9EOzs7OztJQUNwRCx3Q0FBcUM7Ozs7O0lBQ3JDLHNDQUFvQzs7Ozs7SUFDcEMsdUNBQW1DOzs7OztJQUNuQywyQ0FBMkM7O0lBQzNDLGlDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SURhdGV9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZGF0ZS5tb2RlbCc7XG5pbXBvcnQge0RvbUhlbHBlcn0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL2RvbS1hcHBlbmRlci9kb20tYXBwZW5kZXIuc2VydmljZSc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtDYWxlbmRhck1vZGV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci1tb2RlJztcbmltcG9ydCB7RUNhbGVuZGFyTW9kZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLW1vZGUtZW51bSc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge0VDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUtZW51bSc7XG5pbXBvcnQge1NpbmdsZUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zaW5nbGUtY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtJRGF5Q2FsZW5kYXJDb25maWd9IGZyb20gJy4uL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7RGF5Q2FsZW5kYXJDb21wb25lbnR9IGZyb20gJy4uL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7RGF5Q2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuLi9kYXktY2FsZW5kYXIvZGF5LWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF5VGltZUNhbGVuZGFyQ29uZmlnfSBmcm9tICcuLi9kYXktdGltZS1jYWxlbmRhci9kYXktdGltZS1jYWxlbmRhci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtEYXlUaW1lQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuLi9kYXktdGltZS1jYWxlbmRhci9kYXktdGltZS1jYWxlbmRhci5zZXJ2aWNlJztcbmltcG9ydCB7SVRpbWVTZWxlY3RDb25maWd9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge1RpbWVTZWxlY3RDb21wb25lbnR9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1RpbWVTZWxlY3RTZXJ2aWNlfSBmcm9tICcuLi90aW1lLXNlbGVjdC90aW1lLXNlbGVjdC5zZXJ2aWNlJztcbmltcG9ydCB7SURhdGVQaWNrZXJDb25maWcsIElEYXRlUGlja2VyQ29uZmlnSW50ZXJuYWx9IGZyb20gJy4vZGF0ZS1waWNrZXItY29uZmlnLm1vZGVsJztcbmltcG9ydCB7SURwRGF5UGlja2VyQXBpfSBmcm9tICcuL2RhdGUtcGlja2VyLmFwaSc7XG5pbXBvcnQge0RhdGVQaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0aW9uRXJyb3JzLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNb21lbnQsIHVuaXRPZlRpbWV9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge0RhdGVWYWxpZGF0b3J9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92YWxpZGF0b3IudHlwZSc7XG5pbXBvcnQge01vbnRoQ2FsZW5kYXJDb21wb25lbnR9IGZyb20gJy4uL21vbnRoLWNhbGVuZGFyL21vbnRoLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQge1llYXJDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi4veWVhci1jYWxlbmRhci95ZWFyLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQge0RheVRpbWVDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi4vZGF5LXRpbWUtY2FsZW5kYXIvZGF5LXRpbWUtY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7SU5hdkV2ZW50fSBmcm9tICcuLi9jb21tb24vbW9kZWxzL25hdmlnYXRpb24tZXZlbnQubW9kZWwnO1xuaW1wb3J0IHtTZWxlY3RFdmVudH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NlbGVjdGlvbi1ldmV0LmVudW0uJztcbmltcG9ydCB7SVNlbGVjdGlvbkV2ZW50fSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2VsZWN0aW9uLWV2ZXQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkcC1kYXRlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZS1waWNrZXIuY29tcG9uZW50Lmxlc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIERhdGVQaWNrZXJTZXJ2aWNlLFxuICAgIERheVRpbWVDYWxlbmRhclNlcnZpY2UsXG4gICAgRGF5Q2FsZW5kYXJTZXJ2aWNlLFxuICAgIFRpbWVTZWxlY3RTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT25Jbml0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZnRlclZpZXdJbml0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbkRlc3Ryb3kge1xuICBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNvbmZpZzogSURhdGVQaWNrZXJDb25maWc7XG4gIEBJbnB1dCgpIG1vZGU6IENhbGVuZGFyTW9kZSA9ICdkYXknO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc3BsYXlEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgbWluRGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWF4RGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWluVGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgQElucHV0KCkgbWF4VGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcblxuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyVmFsdWU+KCk7XG4gIEBPdXRwdXQoKSBvbkdvVG9DdXJyZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxlZnROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25SaWdodE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPElTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY2FsZW5kYXJDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2RheUNhbGVuZGFyJykgZGF5Q2FsZW5kYXJSZWY6IERheUNhbGVuZGFyQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdtb250aENhbGVuZGFyJykgbW9udGhDYWxlbmRhclJlZjogTW9udGhDYWxlbmRhckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgneWVhckNhbGVuZGFyJykgeWVhckNhbGVuZGFyUmVmOiBZZWFyQ2FsZW5kYXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2RheXRpbWVDYWxlbmRhcicpIGRheVRpbWVDYWxlbmRhclJlZjogRGF5VGltZUNhbGVuZGFyQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCd0aW1lU2VsZWN0JykgdGltZVNlbGVjdFJlZjogVGltZVNlbGVjdENvbXBvbmVudDtcblxuICBjb21wb25lbnRDb25maWc6IElEYXRlUGlja2VyQ29uZmlnSW50ZXJuYWw7XG4gIGRheUNhbGVuZGFyQ29uZmlnOiBJRGF5Q2FsZW5kYXJDb25maWc7XG4gIGRheVRpbWVDYWxlbmRhckNvbmZpZzogSURheVRpbWVDYWxlbmRhckNvbmZpZztcbiAgdGltZVNlbGVjdENvbmZpZzogSVRpbWVTZWxlY3RDb25maWc7XG4gIF9hcmVDYWxlbmRhcnNTaG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICBoaWRlU3RhdGVIZWxwZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX3NlbGVjdGVkOiBNb21lbnRbXSA9IFtdO1xuICBpbnB1dFZhbHVlOiBDYWxlbmRhclZhbHVlO1xuICBpc0ZvY3VzZWRUcmlnZ2VyOiBib29sZWFuID0gZmFsc2U7XG4gIF9jdXJyZW50RGF0ZVZpZXc6IE1vbWVudDtcbiAgaW5wdXRFbGVtZW50VmFsdWU6IHN0cmluZztcbiAgY2FsZW5kYXJXcmFwcGVyOiBIVE1MRWxlbWVudDtcbiAgYXBwZW5kVG9FbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgaW5wdXRFbGVtZW50Q29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgcG9wdXBFbGVtOiBIVE1MRWxlbWVudDtcbiAgaGFuZGxlSW5uZXJFbGVtZW50Q2xpY2tVbmxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICBnbG9iYWxMaXN0ZW5lcnNVbmxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuICB2YWxpZGF0ZUZuOiBEYXRlVmFsaWRhdG9yO1xuICBhcGk6IElEcERheVBpY2tlckFwaSA9IHtcbiAgICBvcGVuOiB0aGlzLnNob3dDYWxlbmRhcnMuYmluZCh0aGlzKSxcbiAgICBjbG9zZTogdGhpcy5oaWRlQ2FsZW5kYXIuYmluZCh0aGlzKSxcbiAgICBtb3ZlQ2FsZW5kYXJUbzogdGhpcy5tb3ZlQ2FsZW5kYXJUby5iaW5kKHRoaXMpXG4gIH07XG4gIHNlbGVjdEV2ZW50ID0gU2VsZWN0RXZlbnQ7XG5cbiAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkOiBNb21lbnRbXSkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnRWYWx1ZSA9ICg8c3RyaW5nW10+dGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnZlcnRGcm9tTW9tZW50QXJyYXkodGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LCBzZWxlY3RlZCwgRUNhbGVuZGFyVmFsdWUuU3RyaW5nQXJyKSlcbiAgICAgIC5qb2luKCcgfCAnKTtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHNlbGVjdGVkKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodmFsLCBmYWxzZSk7XG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHZhbCk7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWQoKTogTW9tZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIGdldCBhcmVDYWxlbmRhcnNTaG93bigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXJlQ2FsZW5kYXJzU2hvd247XG4gIH1cblxuICBnZXQgb3Blbk9uRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Q29uZmlnLm9wZW5PbkZvY3VzO1xuICB9XG5cbiAgZ2V0IG9wZW5PbkNsaWNrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudENvbmZpZy5vcGVuT25DbGljaztcbiAgfVxuXG4gIHNldCBhcmVDYWxlbmRhcnNTaG93bih2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zdGFydEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgdGhpcy5kb21IZWxwZXIuYXBwZW5kRWxlbWVudFRvUG9zaXRpb24oe1xuICAgICAgICBjb250YWluZXI6IHRoaXMuYXBwZW5kVG9FbGVtZW50LFxuICAgICAgICBlbGVtZW50OiB0aGlzLmNhbGVuZGFyV3JhcHBlcixcbiAgICAgICAgYW5jaG9yOiB0aGlzLmlucHV0RWxlbWVudENvbnRhaW5lcixcbiAgICAgICAgZGltRWxlbTogdGhpcy5wb3B1cEVsZW0sXG4gICAgICAgIGRyb3BzOiB0aGlzLmNvbXBvbmVudENvbmZpZy5kcm9wcyxcbiAgICAgICAgb3BlbnM6IHRoaXMuY29tcG9uZW50Q29uZmlnLm9wZW5zXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLmRheVBpY2tlclNlcnZpY2UucGlja2VyQ2xvc2VkKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXJlQ2FsZW5kYXJzU2hvd24gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50RGF0ZVZpZXcoKTogTW9tZW50IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudERhdGVWaWV3O1xuICB9XG5cbiAgc2V0IGN1cnJlbnREYXRlVmlldyhkYXRlOiBNb21lbnQpIHtcbiAgICB0aGlzLl9jdXJyZW50RGF0ZVZpZXcgPSBkYXRlO1xuXG4gICAgaWYgKHRoaXMuZGF5Q2FsZW5kYXJSZWYpIHtcbiAgICAgIHRoaXMuZGF5Q2FsZW5kYXJSZWYubW92ZUNhbGVuZGFyVG8oZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9udGhDYWxlbmRhclJlZikge1xuICAgICAgdGhpcy5tb250aENhbGVuZGFyUmVmLm1vdmVDYWxlbmRhclRvKGRhdGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRheVRpbWVDYWxlbmRhclJlZikge1xuICAgICAgdGhpcy5kYXlUaW1lQ2FsZW5kYXJSZWYubW92ZUNhbGVuZGFyVG8oZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkYXlQaWNrZXJTZXJ2aWNlOiBEYXRlUGlja2VyU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkb21IZWxwZXI6IERvbUhlbHBlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBlbGVtUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyOiBSZW5kZXJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmICghdGhpcy5vcGVuT25DbGljaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0ZvY3VzZWRUcmlnZ2VyICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmhpZGVTdGF0ZUhlbHBlciA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuYXJlQ2FsZW5kYXJzU2hvd24pIHtcbiAgICAgICAgdGhpcy5zaG93Q2FsZW5kYXJzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Cb2R5Q2xpY2soKSB7XG4gICAgaWYgKHRoaXMuY29tcG9uZW50Q29uZmlnLmhpZGVPbk91dHNpZGVDbGljaykge1xuICAgICAgaWYgKCF0aGlzLmhpZGVTdGF0ZUhlbHBlciAmJiB0aGlzLmFyZUNhbGVuZGFyc1Nob3duKSB7XG4gICAgICAgIHRoaXMuaGlkZUNhbGVuZGFyKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZVN0YXRlSGVscGVyID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLmFyZUNhbGVuZGFyc1Nob3duKSB7XG4gICAgICB0aGlzLmRvbUhlbHBlci5zZXRFbGVtZW50UG9zaXRpb24oe1xuICAgICAgICBjb250YWluZXI6IHRoaXMuYXBwZW5kVG9FbGVtZW50LFxuICAgICAgICBlbGVtZW50OiB0aGlzLmNhbGVuZGFyV3JhcHBlcixcbiAgICAgICAgYW5jaG9yOiB0aGlzLmlucHV0RWxlbWVudENvbnRhaW5lcixcbiAgICAgICAgZGltRWxlbTogdGhpcy5wb3B1cEVsZW0sXG4gICAgICAgIGRyb3BzOiB0aGlzLmNvbXBvbmVudENvbmZpZy5kcm9wcyxcbiAgICAgICAgb3BlbnM6IHRoaXMuY29tcG9uZW50Q29uZmlnLm9wZW5zXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBDYWxlbmRhclZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnZlcnRUb01vbWVudEFycmF5KHZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsIHRoaXMuY29tcG9uZW50Q29uZmlnLmFsbG93TXVsdGlTZWxlY3QpO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICBvbkNoYW5nZUNhbGxiYWNrKF86IGFueSwgY2hhbmdlZEJ5SW5wdXQ6IGJvb2xlYW4pIHtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblRvdWNoZWRDYWxsYmFjaygpIHtcblxuICB9XG5cbiAgdmFsaWRhdGUoZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGVGbihmb3JtQ29udHJvbC52YWx1ZSk7XG4gIH1cblxuICBwcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzZWxlY3RlZDogTW9tZW50W10gfCBzdHJpbmcpOiBDYWxlbmRhclZhbHVlIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdGVkID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydEZyb21Nb21lbnRBcnJheShcbiAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LFxuICAgICAgICBzZWxlY3RlZCxcbiAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcucmV0dXJuZWRWYWx1ZVR5cGUgfHwgdGhpcy51dGlsc1NlcnZpY2UuZ2V0SW5wdXRUeXBlKHRoaXMuaW5wdXRWYWx1ZSwgdGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFZhbGlkYXRvcnMoKTogdm9pZCB7XG4gICAgdGhpcy52YWxpZGF0ZUZuID0gdGhpcy51dGlsc1NlcnZpY2UuY3JlYXRlVmFsaWRhdG9yKFxuICAgICAge1xuICAgICAgICBtaW5EYXRlOiB0aGlzLm1pbkRhdGUsXG4gICAgICAgIG1heERhdGU6IHRoaXMubWF4RGF0ZSxcbiAgICAgICAgbWluVGltZTogdGhpcy5taW5UaW1lLFxuICAgICAgICBtYXhUaW1lOiB0aGlzLm1heFRpbWVcbiAgICAgIH0sIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCwgdGhpcy5tb2RlKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayh0aGlzLnNlbGVjdGVkKSwgZmFsc2UpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmluaXRWYWxpZGF0b3JzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xuICAgICAgY29uc3Qge21pbkRhdGUsIG1heERhdGUsIG1pblRpbWUsIG1heFRpbWV9ID0gY2hhbmdlcztcblxuICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgIGlmIChtaW5EYXRlIHx8IG1heERhdGUgfHwgbWluVGltZSB8fCBtYXhUaW1lKSB7XG4gICAgICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRFbGVtZW50UG9zaXRpb25JbkRvbSgpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBzZXRFbGVtZW50UG9zaXRpb25JbkRvbSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGVuZGFyV3JhcHBlciA9IDxIVE1MRWxlbWVudD4gdGhpcy5jYWxlbmRhckNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0SW5wdXRFbGVtZW50Q29udGFpbmVyKCk7XG4gICAgdGhpcy5wb3B1cEVsZW0gPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHAtcG9wdXAnKTtcbiAgICB0aGlzLmhhbmRsZUlubmVyRWxlbWVudENsaWNrKHRoaXMucG9wdXBFbGVtKTtcblxuICAgIGNvbnN0IHthcHBlbmRUb30gPSB0aGlzLmNvbXBvbmVudENvbmZpZztcbiAgICBpZiAoYXBwZW5kVG8pIHtcbiAgICAgIGlmICh0eXBlb2YgYXBwZW5kVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kVG9FbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoPHN0cmluZz5hcHBlbmRUbyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGVuZFRvRWxlbWVudCA9IDxIVE1MRWxlbWVudD5hcHBlbmRUbztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHBlbmRUb0VsZW1lbnQgPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZFRvRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbGVuZGFyV3JhcHBlcik7XG4gIH1cblxuICBzZXRJbnB1dEVsZW1lbnRDb250YWluZXIoKSB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnRDb250YWluZXIgPSB0aGlzLnV0aWxzU2VydmljZS5nZXROYXRpdmVFbGVtZW50KHRoaXMuY29tcG9uZW50Q29uZmlnLmlucHV0RWxlbWVudENvbnRhaW5lcilcbiAgICAgIHx8IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcC1pbnB1dC1jb250YWluZXInKVxuICAgICAgfHwgZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIGhhbmRsZUlubmVyRWxlbWVudENsaWNrKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5oYW5kbGVJbm5lckVsZW1lbnRDbGlja1VubGlzdGVuZXJzLnB1c2goXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbGVtZW50LCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGlkZVN0YXRlSGVscGVyID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb21wb25lbnRDb25maWcgPSB0aGlzLmRheVBpY2tlclNlcnZpY2UuZ2V0Q29uZmlnKHRoaXMuY29uZmlnLCB0aGlzLm1vZGUpO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gdGhpcy5kaXNwbGF5RGF0ZVxuICAgICAgPyB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9Nb21lbnQodGhpcy5kaXNwbGF5RGF0ZSwgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0KS5jbG9uZSgpXG4gICAgICA6IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0RGVmYXVsdERpc3BsYXlEYXRlKFxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlVmlldyxcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCxcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcubWluXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuZGF5Q2FsZW5kYXJDb25maWcgPSB0aGlzLmRheVBpY2tlclNlcnZpY2UuZ2V0RGF5Q29uZmlnU2VydmljZSh0aGlzLmNvbXBvbmVudENvbmZpZyk7XG4gICAgdGhpcy5kYXlUaW1lQ2FsZW5kYXJDb25maWcgPSB0aGlzLmRheVBpY2tlclNlcnZpY2UuZ2V0RGF5VGltZUNvbmZpZ1NlcnZpY2UodGhpcy5jb21wb25lbnRDb25maWcpO1xuICAgIHRoaXMudGltZVNlbGVjdENvbmZpZyA9IHRoaXMuZGF5UGlja2VyU2VydmljZS5nZXRUaW1lQ29uZmlnU2VydmljZSh0aGlzLmNvbXBvbmVudENvbmZpZyk7XG4gIH1cblxuICBpbnB1dEZvY3VzZWQoKSB7XG4gICAgaWYgKCF0aGlzLm9wZW5PbkZvY3VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc0ZvY3VzZWRUcmlnZ2VyID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5hcmVDYWxlbmRhcnNTaG93bikge1xuICAgICAgICB0aGlzLnNob3dDYWxlbmRhcnMoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oaWRlU3RhdGVIZWxwZXIgPSBmYWxzZTtcblxuICAgICAgdGhpcy5pc0ZvY3VzZWRUcmlnZ2VyID0gZmFsc2U7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIHRoaXMuY29tcG9uZW50Q29uZmlnLm9uT3BlbkRlbGF5KTtcbiAgfVxuXG4gIGlucHV0Qmx1cnJlZCgpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICBzaG93Q2FsZW5kYXJzKCkge1xuICAgIHRoaXMuaGlkZVN0YXRlSGVscGVyID0gdHJ1ZTtcbiAgICB0aGlzLmFyZUNhbGVuZGFyc1Nob3duID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLnRpbWVTZWxlY3RSZWYpIHtcbiAgICAgIHRoaXMudGltZVNlbGVjdFJlZi5hcGkudHJpZ2dlckNoYW5nZSgpO1xuICAgIH1cblxuICAgIHRoaXMub3Blbi5lbWl0KCk7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhpZGVDYWxlbmRhcigpIHtcbiAgICB0aGlzLmFyZUNhbGVuZGFyc1Nob3duID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5kYXlDYWxlbmRhclJlZikge1xuICAgICAgdGhpcy5kYXlDYWxlbmRhclJlZi5hcGkudG9nZ2xlQ2FsZW5kYXJNb2RlKEVDYWxlbmRhck1vZGUuRGF5KTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlLmVtaXQoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25WaWV3RGF0ZUNoYW5nZSh2YWx1ZTogQ2FsZW5kYXJWYWx1ZSkge1xuICAgIGNvbnN0IHN0clZhbCA9IHZhbHVlID8gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFRvU3RyaW5nKHZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpIDogJyc7XG4gICAgaWYgKHRoaXMuZGF5UGlja2VyU2VydmljZS5pc1ZhbGlkSW5wdXREYXRlVmFsdWUoc3RyVmFsLCB0aGlzLmNvbXBvbmVudENvbmZpZykpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRheVBpY2tlclNlcnZpY2UuY29udmVydElucHV0VmFsdWVUb01vbWVudEFycmF5KHN0clZhbCwgdGhpcy5jb21wb25lbnRDb25maWcpO1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLnNlbGVjdGVkLmxlbmd0aFxuICAgICAgICA/IHRoaXMudXRpbHNTZXJ2aWNlLmdldERlZmF1bHREaXNwbGF5RGF0ZShcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWQsXG4gICAgICAgICAgdGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCxcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5taW5cbiAgICAgICAgKVxuICAgICAgICA6IHRoaXMuY3VycmVudERhdGVWaWV3O1xuXG4gICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoe1xuICAgICAgICBkYXRlOiBzdHJWYWwsXG4gICAgICAgIHR5cGU6IFNlbGVjdEV2ZW50LklOUFVULFxuICAgICAgICBncmFudWxhcml0eTogbnVsbFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldFZhbGlkTW9tZW50QXJyYXkoc3RyVmFsLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpO1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2soc3RyVmFsKSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZGF0ZVNlbGVjdGVkKGRhdGU6IElEYXRlLCBncmFudWxhcml0eTogdW5pdE9mVGltZS5CYXNlLCB0eXBlOiBTZWxlY3RFdmVudCwgaWdub3JlQ2xvc2U/OiBib29sZWFuKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAudXBkYXRlU2VsZWN0ZWQodGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCwgdGhpcy5zZWxlY3RlZCwgZGF0ZSwgZ3JhbnVsYXJpdHkpO1xuICAgIGlmICghaWdub3JlQ2xvc2UpIHtcbiAgICAgIHRoaXMub25EYXRlQ2xpY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoe1xuICAgICAgZGF0ZTogZGF0ZS5kYXRlLFxuICAgICAgZ3JhbnVsYXJpdHksXG4gICAgICB0eXBlXG4gICAgfSk7XG4gIH1cblxuICBvbkRhdGVDbGljaygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRDb25maWcuY2xvc2VPblNlbGVjdCkge1xuICAgICAgc2V0VGltZW91dCh0aGlzLmhpZGVDYWxlbmRhci5iaW5kKHRoaXMpLCB0aGlzLmNvbXBvbmVudENvbmZpZy5jbG9zZU9uU2VsZWN0RGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIG9uS2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgKDkpOlxuICAgICAgY2FzZSAoMjcpOlxuICAgICAgICB0aGlzLmhpZGVDYWxlbmRhcigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBtb3ZlQ2FsZW5kYXJUbyhkYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlKSB7XG4gICAgY29uc3QgbW9tZW50RGF0ZSA9IHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRUb01vbWVudChkYXRlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpO1xuICAgIHRoaXMuY3VycmVudERhdGVWaWV3ID0gbW9tZW50RGF0ZTtcbiAgfVxuXG4gIG9uTGVmdE5hdkNsaWNrKGNoYW5nZTogSU5hdkV2ZW50KSB7XG4gICAgdGhpcy5vbkxlZnROYXYuZW1pdChjaGFuZ2UpO1xuICB9XG5cbiAgb25SaWdodE5hdkNsaWNrKGNoYW5nZTogSU5hdkV2ZW50KSB7XG4gICAgdGhpcy5vblJpZ2h0TmF2LmVtaXQoY2hhbmdlKTtcbiAgfVxuXG4gIHN0YXJ0R2xvYmFsTGlzdGVuZXJzKCkge1xuICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzVW5saXN0ZW5lcnMucHVzaChcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50LCAna2V5ZG93bicsIChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25LZXlQcmVzcyhlKTtcbiAgICAgIH0pLFxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMub25TY3JvbGwoKTtcbiAgICAgIH0pLFxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5vbkJvZHlDbGljaygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgc3RvcEdsb2JhbExpc3RlbmVycygpIHtcbiAgICB0aGlzLmdsb2JhbExpc3RlbmVyc1VubGlzdGVuZXJzLmZvckVhY2goKHVsKSA9PiB1bCgpKTtcbiAgICB0aGlzLmdsb2JhbExpc3RlbmVyc1VubGlzdGVuZXJzID0gW107XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhhbmRsZUlubmVyRWxlbWVudENsaWNrVW5saXN0ZW5lcnMuZm9yRWFjaCh1bCA9PiB1bCgpKTtcblxuICAgIGlmICh0aGlzLmFwcGVuZFRvRWxlbWVudCkge1xuICAgICAgdGhpcy5hcHBlbmRUb0VsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYWxlbmRhcldyYXBwZXIpO1xuICAgIH1cbiAgfVxufVxuIl19