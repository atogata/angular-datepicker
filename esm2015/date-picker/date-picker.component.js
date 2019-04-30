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
export class DatePickerComponent {
    /**
     * @param {?} dayPickerService
     * @param {?} domHelper
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} utilsService
     * @param {?} cd
     */
    constructor(dayPickerService, domHelper, elemRef, renderer, utilsService, cd) {
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
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.inputElementValue = ((/** @type {?} */ (this.utilsService
            .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr))))
            .join(' | ');
        /** @type {?} */
        const val = this.processOnChangeCallback(selected);
        this.onChangeCallback(val, false);
        this.onChange.emit(val);
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
    get areCalendarsShown() {
        return this._areCalendarsShown;
    }
    /**
     * @return {?}
     */
    get openOnFocus() {
        return this.componentConfig.openOnFocus;
    }
    /**
     * @return {?}
     */
    get openOnClick() {
        return this.componentConfig.openOnClick;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set areCalendarsShown(value) {
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
    }
    /**
     * @return {?}
     */
    get currentDateView() {
        return this._currentDateView;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set currentDateView(date) {
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
    }
    /**
     * @return {?}
     */
    onClick() {
        if (!this.openOnClick) {
            return;
        }
        if (!this.isFocusedTrigger && !this.disabled) {
            this.hideStateHelper = true;
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
        }
    }
    /**
     * @return {?}
     */
    onBodyClick() {
        if (this.componentConfig.hideOnOutsideClick) {
            if (!this.hideStateHelper && this.areCalendarsShown) {
                this.hideCalendar();
            }
            this.hideStateHelper = false;
        }
    }
    /**
     * @return {?}
     */
    onScroll() {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
     * @param {?} changedByInput
     * @return {?}
     */
    onChangeCallback(_, changedByInput) {
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onTouchedCallback() {
    }
    /**
     * @param {?} formControl
     * @return {?}
     */
    validate(formControl) {
        return this.validateFn(formControl.value);
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    processOnChangeCallback(selected) {
        if (typeof selected === 'string') {
            return selected;
        }
        else {
            return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.componentConfig.returnedValueType || this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect));
        }
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
        }, this.componentConfig.format, this.mode);
        this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.isInitialized = true;
        this.init();
        this.initValidators();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isInitialized) {
            const { minDate, maxDate, minTime, maxTime } = changes;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setElementPositionInDom();
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    setElementPositionInDom() {
        this.calendarWrapper = (/** @type {?} */ (this.calendarContainer.nativeElement));
        this.setInputElementContainer();
        this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
        this.handleInnerElementClick(this.popupElem);
        const { appendTo } = this.componentConfig;
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
    }
    /**
     * @return {?}
     */
    setInputElementContainer() {
        this.inputElementContainer = this.utilsService.getNativeElement(this.componentConfig.inputElementContainer)
            || this.elemRef.nativeElement.querySelector('.dp-input-container')
            || document.body;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    handleInnerElementClick(element) {
        this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', (/**
         * @return {?}
         */
        () => {
            this.hideStateHelper = true;
        })));
    }
    /**
     * @return {?}
     */
    init() {
        this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
        this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
        this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    }
    /**
     * @return {?}
     */
    inputFocused() {
        if (!this.openOnFocus) {
            return;
        }
        this.isFocusedTrigger = true;
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
            this.hideStateHelper = false;
            this.isFocusedTrigger = false;
            this.cd.markForCheck();
        }), this.componentConfig.onOpenDelay);
    }
    /**
     * @return {?}
     */
    inputBlurred() {
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    showCalendars() {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
        if (this.timeSelectRef) {
            this.timeSelectRef.api.triggerChange();
        }
        this.open.emit();
        this.cd.markForCheck();
    }
    /**
     * @return {?}
     */
    hideCalendar() {
        this.areCalendarsShown = false;
        if (this.dayCalendarRef) {
            this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
        }
        this.close.emit();
        this.cd.markForCheck();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onViewDateChange(value) {
        /** @type {?} */
        const strVal = value ? this.utilsService.convertToString(value, this.componentConfig.format) : '';
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
    }
    /**
     * @param {?} date
     * @param {?} granularity
     * @param {?} type
     * @param {?=} ignoreClose
     * @return {?}
     */
    dateSelected(date, granularity, type, ignoreClose) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
        if (!ignoreClose) {
            this.onDateClick();
        }
        this.onSelect.emit({
            date: date.date,
            granularity,
            type
        });
    }
    /**
     * @return {?}
     */
    onDateClick() {
        if (this.componentConfig.closeOnSelect) {
            setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyPress(event) {
        switch (event.keyCode) {
            case (9):
            case (27):
                this.hideCalendar();
                break;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    moveCalendarTo(date) {
        /** @type {?} */
        const momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format);
        this.currentDateView = momentDate;
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onLeftNavClick(change) {
        this.onLeftNav.emit(change);
    }
    /**
     * @param {?} change
     * @return {?}
     */
    onRightNavClick(change) {
        this.onRightNav.emit(change);
    }
    /**
     * @return {?}
     */
    startGlobalListeners() {
        this.globalListenersUnlisteners.push(this.renderer.listen(document, 'keydown', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            this.onKeyPress(e);
        })), this.renderer.listen(document, 'scroll', (/**
         * @return {?}
         */
        () => {
            this.onScroll();
        })), this.renderer.listen(document, 'click', (/**
         * @return {?}
         */
        () => {
            this.onBodyClick();
        })));
    }
    /**
     * @return {?}
     */
    stopGlobalListeners() {
        this.globalListenersUnlisteners.forEach((/**
         * @param {?} ul
         * @return {?}
         */
        (ul) => ul()));
        this.globalListenersUnlisteners = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.handleInnerElementClickUnlisteners.forEach((/**
         * @param {?} ul
         * @return {?}
         */
        ul => ul()));
        if (this.appendToElement) {
            this.appendToElement.removeChild(this.calendarWrapper);
        }
    }
}
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
                        () => DatePickerComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatePickerComponent)),
                        multi: true
                    }
                ],
                styles: ["dp-date-picker{display:inline-block}dp-date-picker.dp-material .dp-picker-input{box-sizing:border-box;height:30px;width:213px;font-size:13px;outline:0}dp-date-picker .dp-input-container{position:relative}dp-date-picker .dp-selected{background:#106cc8;color:#fff}.dp-popup{position:relative;background:#fff;box-shadow:1px 1px 5px 0 rgba(0,0,0,.1);border-left:1px solid rgba(0,0,0,.1);border-right:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1);z-index:9999;white-space:nowrap}"]
            }] }
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: DatePickerService },
    { type: DomHelper },
    { type: ElementRef },
    { type: Renderer },
    { type: UtilsService },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRXBFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUVqRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFHbkUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFFdEYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFHckUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFDTixRQUFRLEVBRVIsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0wsYUFBYSxFQUNiLGlCQUFpQixFQUdsQixNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxxQkFBcUIsRUFB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bUM7O0lBQ25DLG1DQUFvQzs7SUFDcEMsMENBQWtDOztJQUNsQyx1Q0FBbUM7O0lBQ25DLDBDQUEwQzs7SUFDMUMsb0NBQTZDOztJQUM3QyxzQ0FBc0M7O0lBQ3RDLHNDQUFzQzs7SUFDdEMsc0NBQXNDOztJQUN0QyxzQ0FBc0M7O0lBRXRDLG1DQUEwQzs7SUFDMUMsb0NBQTJDOztJQUMzQyx1Q0FBdUQ7O0lBQ3ZELDRDQUFpRTs7SUFDakUsd0NBQWtFOztJQUNsRSx5Q0FBbUU7O0lBQ25FLHVDQUF1RTs7SUFFdkUsZ0RBQXNEOztJQUN0RCw2Q0FBK0Q7O0lBQy9ELCtDQUFxRTs7SUFDckUsOENBQWtFOztJQUNsRSxpREFBMkU7O0lBQzNFLDRDQUE0RDs7SUFFNUQsOENBQTJDOztJQUMzQyxnREFBc0M7O0lBQ3RDLG9EQUE4Qzs7SUFDOUMsK0NBQW9DOztJQUNwQyxpREFBb0M7O0lBQ3BDLDhDQUFpQzs7SUFDakMsd0NBQXlCOztJQUN6Qix5Q0FBMEI7O0lBQzFCLCtDQUFrQzs7SUFDbEMsK0NBQXlCOztJQUN6QixnREFBMEI7O0lBQzFCLDhDQUE2Qjs7SUFDN0IsOENBQTZCOztJQUM3QixvREFBbUM7O0lBQ25DLHdDQUF1Qjs7SUFDdkIsaUVBQW9EOztJQUNwRCx5REFBNEM7O0lBQzVDLHlDQUEwQjs7SUFDMUIsa0NBSUU7O0lBQ0YsMENBQTBCOzs7OztJQW1FZCwrQ0FBb0Q7Ozs7O0lBQ3BELHdDQUFxQzs7Ozs7SUFDckMsc0NBQW9DOzs7OztJQUNwQyx1Q0FBbUM7Ozs7O0lBQ25DLDJDQUEyQzs7SUFDM0MsaUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJRGF0ZX0gZnJvbSAnLi4vY29tbW9uL21vZGVscy9kYXRlLm1vZGVsJztcbmltcG9ydCB7RG9tSGVscGVyfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvZG9tLWFwcGVuZGVyL2RvbS1hcHBlbmRlci5zZXJ2aWNlJztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0NhbGVuZGFyTW9kZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLW1vZGUnO1xuaW1wb3J0IHtFQ2FsZW5kYXJNb2RlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItbW9kZS1lbnVtJztcbmltcG9ydCB7Q2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2NhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7RUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZS1lbnVtJztcbmltcG9ydCB7U2luZ2xlQ2FsZW5kYXJWYWx1ZX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NpbmdsZS1jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge0lEYXlDYWxlbmRhckNvbmZpZ30gZnJvbSAnLi4vZGF5LWNhbGVuZGFyL2RheS1jYWxlbmRhci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtEYXlDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi4vZGF5LWNhbGVuZGFyL2RheS1jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHtEYXlDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4uL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQge0lEYXlUaW1lQ2FsZW5kYXJDb25maWd9IGZyb20gJy4uL2RheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge0RheVRpbWVDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4uL2RheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtJVGltZVNlbGVjdENvbmZpZ30gZnJvbSAnLi4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3QtY29uZmlnLm1vZGVsJztcbmltcG9ydCB7VGltZVNlbGVjdENvbXBvbmVudH0gZnJvbSAnLi4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7VGltZVNlbGVjdFNlcnZpY2V9IGZyb20gJy4uL3RpbWUtc2VsZWN0L3RpbWUtc2VsZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHtJRGF0ZVBpY2tlckNvbmZpZywgSURhdGVQaWNrZXJDb25maWdJbnRlcm5hbH0gZnJvbSAnLi9kYXRlLXBpY2tlci1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtJRHBEYXlQaWNrZXJBcGl9IGZyb20gJy4vZGF0ZS1waWNrZXIuYXBpJztcbmltcG9ydCB7RGF0ZVBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZS1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRpb25FcnJvcnMsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01vbWVudCwgdW5pdE9mVGltZX0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7RGF0ZVZhbGlkYXRvcn0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3ZhbGlkYXRvci50eXBlJztcbmltcG9ydCB7TW9udGhDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi4vbW9udGgtY2FsZW5kYXIvbW9udGgtY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7WWVhckNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuLi95ZWFyLWNhbGVuZGFyL3llYXItY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7RGF5VGltZUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuLi9kYXktdGltZS1jYWxlbmRhci9kYXktdGltZS1jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHtJTmF2RXZlbnR9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvbmF2aWdhdGlvbi1ldmVudC5tb2RlbCc7XG5pbXBvcnQge1NlbGVjdEV2ZW50fSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2VsZWN0aW9uLWV2ZXQuZW51bS4nO1xuaW1wb3J0IHtJU2VsZWN0aW9uRXZlbnR9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zZWxlY3Rpb24tZXZldC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RwLWRhdGUtcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICdkYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXRlLXBpY2tlci5jb21wb25lbnQubGVzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRGF0ZVBpY2tlclNlcnZpY2UsXG4gICAgRGF5VGltZUNhbGVuZGFyU2VydmljZSxcbiAgICBEYXlDYWxlbmRhclNlcnZpY2UsXG4gICAgVGltZVNlbGVjdFNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRlUGlja2VyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbkluaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFmdGVyVmlld0luaXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9uRGVzdHJveSB7XG4gIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY29uZmlnOiBJRGF0ZVBpY2tlckNvbmZpZztcbiAgQElucHV0KCkgbW9kZTogQ2FsZW5kYXJNb2RlID0gJ2RheSc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzcGxheURhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSBtaW5EYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASW5wdXQoKSBtYXhEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASW5wdXQoKSBtaW5UaW1lOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuICBASW5wdXQoKSBtYXhUaW1lOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuXG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJWYWx1ZT4oKTtcbiAgQE91dHB1dCgpIG9uR29Ub0N1cnJlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTGVmdE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8SVNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjYWxlbmRhckNvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnZGF5Q2FsZW5kYXInKSBkYXlDYWxlbmRhclJlZjogRGF5Q2FsZW5kYXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ21vbnRoQ2FsZW5kYXInKSBtb250aENhbGVuZGFyUmVmOiBNb250aENhbGVuZGFyQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCd5ZWFyQ2FsZW5kYXInKSB5ZWFyQ2FsZW5kYXJSZWY6IFllYXJDYWxlbmRhckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnZGF5dGltZUNhbGVuZGFyJykgZGF5VGltZUNhbGVuZGFyUmVmOiBEYXlUaW1lQ2FsZW5kYXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ3RpbWVTZWxlY3QnKSB0aW1lU2VsZWN0UmVmOiBUaW1lU2VsZWN0Q29tcG9uZW50O1xuXG4gIGNvbXBvbmVudENvbmZpZzogSURhdGVQaWNrZXJDb25maWdJbnRlcm5hbDtcbiAgZGF5Q2FsZW5kYXJDb25maWc6IElEYXlDYWxlbmRhckNvbmZpZztcbiAgZGF5VGltZUNhbGVuZGFyQ29uZmlnOiBJRGF5VGltZUNhbGVuZGFyQ29uZmlnO1xuICB0aW1lU2VsZWN0Q29uZmlnOiBJVGltZVNlbGVjdENvbmZpZztcbiAgX2FyZUNhbGVuZGFyc1Nob3duOiBib29sZWFuID0gZmFsc2U7XG4gIGhpZGVTdGF0ZUhlbHBlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBfc2VsZWN0ZWQ6IE1vbWVudFtdID0gW107XG4gIGlucHV0VmFsdWU6IENhbGVuZGFyVmFsdWU7XG4gIGlzRm9jdXNlZFRyaWdnZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2N1cnJlbnREYXRlVmlldzogTW9tZW50O1xuICBpbnB1dEVsZW1lbnRWYWx1ZTogc3RyaW5nO1xuICBjYWxlbmRhcldyYXBwZXI6IEhUTUxFbGVtZW50O1xuICBhcHBlbmRUb0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBpbnB1dEVsZW1lbnRDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBwb3B1cEVsZW06IEhUTUxFbGVtZW50O1xuICBoYW5kbGVJbm5lckVsZW1lbnRDbGlja1VubGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG4gIGdsb2JhbExpc3RlbmVyc1VubGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG4gIHZhbGlkYXRlRm46IERhdGVWYWxpZGF0b3I7XG4gIGFwaTogSURwRGF5UGlja2VyQXBpID0ge1xuICAgIG9wZW46IHRoaXMuc2hvd0NhbGVuZGFycy5iaW5kKHRoaXMpLFxuICAgIGNsb3NlOiB0aGlzLmhpZGVDYWxlbmRhci5iaW5kKHRoaXMpLFxuICAgIG1vdmVDYWxlbmRhclRvOiB0aGlzLm1vdmVDYWxlbmRhclRvLmJpbmQodGhpcylcbiAgfTtcbiAgc2VsZWN0RXZlbnQgPSBTZWxlY3RFdmVudDtcblxuICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQ6IE1vbWVudFtdKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICB0aGlzLmlucHV0RWxlbWVudFZhbHVlID0gKDxzdHJpbmdbXT50aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29udmVydEZyb21Nb21lbnRBcnJheSh0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsIHNlbGVjdGVkLCBFQ2FsZW5kYXJWYWx1ZS5TdHJpbmdBcnIpKVxuICAgICAgLmpvaW4oJyB8ICcpO1xuICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvY2Vzc09uQ2hhbmdlQ2FsbGJhY2soc2VsZWN0ZWQpO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWwsIGZhbHNlKTtcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodmFsKTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZCgpOiBNb21lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgZ2V0IGFyZUNhbGVuZGFyc1Nob3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hcmVDYWxlbmRhcnNTaG93bjtcbiAgfVxuXG4gIGdldCBvcGVuT25Gb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRDb25maWcub3Blbk9uRm9jdXM7XG4gIH1cblxuICBnZXQgb3Blbk9uQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Q29uZmlnLm9wZW5PbkNsaWNrO1xuICB9XG5cbiAgc2V0IGFyZUNhbGVuZGFyc1Nob3duKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnN0YXJ0R2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLmRvbUhlbHBlci5hcHBlbmRFbGVtZW50VG9Qb3NpdGlvbih7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5hcHBlbmRUb0VsZW1lbnQsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuY2FsZW5kYXJXcmFwcGVyLFxuICAgICAgICBhbmNob3I6IHRoaXMuaW5wdXRFbGVtZW50Q29udGFpbmVyLFxuICAgICAgICBkaW1FbGVtOiB0aGlzLnBvcHVwRWxlbSxcbiAgICAgICAgZHJvcHM6IHRoaXMuY29tcG9uZW50Q29uZmlnLmRyb3BzLFxuICAgICAgICBvcGVuczogdGhpcy5jb21wb25lbnRDb25maWcub3BlbnNcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuZGF5UGlja2VyU2VydmljZS5waWNrZXJDbG9zZWQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hcmVDYWxlbmRhcnNTaG93biA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnREYXRlVmlldygpOiBNb21lbnQge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RGF0ZVZpZXc7XG4gIH1cblxuICBzZXQgY3VycmVudERhdGVWaWV3KGRhdGU6IE1vbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnREYXRlVmlldyA9IGRhdGU7XG5cbiAgICBpZiAodGhpcy5kYXlDYWxlbmRhclJlZikge1xuICAgICAgdGhpcy5kYXlDYWxlbmRhclJlZi5tb3ZlQ2FsZW5kYXJUbyhkYXRlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb250aENhbGVuZGFyUmVmKSB7XG4gICAgICB0aGlzLm1vbnRoQ2FsZW5kYXJSZWYubW92ZUNhbGVuZGFyVG8oZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGF5VGltZUNhbGVuZGFyUmVmKSB7XG4gICAgICB0aGlzLmRheVRpbWVDYWxlbmRhclJlZi5tb3ZlQ2FsZW5kYXJUbyhkYXRlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRheVBpY2tlclNlcnZpY2U6IERhdGVQaWNrZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRvbUhlbHBlcjogRG9tSGVscGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVsZW1SZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYgKCF0aGlzLm9wZW5PbkNsaWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzRm9jdXNlZFRyaWdnZXIgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuaGlkZVN0YXRlSGVscGVyID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5hcmVDYWxlbmRhcnNTaG93bikge1xuICAgICAgICB0aGlzLnNob3dDYWxlbmRhcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkJvZHlDbGljaygpIHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRDb25maWcuaGlkZU9uT3V0c2lkZUNsaWNrKSB7XG4gICAgICBpZiAoIXRoaXMuaGlkZVN0YXRlSGVscGVyICYmIHRoaXMuYXJlQ2FsZW5kYXJzU2hvd24pIHtcbiAgICAgICAgdGhpcy5oaWRlQ2FsZW5kYXIoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oaWRlU3RhdGVIZWxwZXIgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgb25TY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuYXJlQ2FsZW5kYXJzU2hvd24pIHtcbiAgICAgIHRoaXMuZG9tSGVscGVyLnNldEVsZW1lbnRQb3NpdGlvbih7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5hcHBlbmRUb0VsZW1lbnQsXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuY2FsZW5kYXJXcmFwcGVyLFxuICAgICAgICBhbmNob3I6IHRoaXMuaW5wdXRFbGVtZW50Q29udGFpbmVyLFxuICAgICAgICBkaW1FbGVtOiB0aGlzLnBvcHVwRWxlbSxcbiAgICAgICAgZHJvcHM6IHRoaXMuY29tcG9uZW50Q29uZmlnLmRyb3BzLFxuICAgICAgICBvcGVuczogdGhpcy5jb21wb25lbnRDb25maWcub3BlbnNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IENhbGVuZGFyVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnV0aWxzU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuY29udmVydFRvTW9tZW50QXJyYXkodmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCwgdGhpcy5jb21wb25lbnRDb25maWcuYWxsb3dNdWx0aVNlbGVjdCk7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uQ2hhbmdlQ2FsbGJhY2soXzogYW55LCBjaGFuZ2VkQnlJbnB1dDogYm9vbGVhbikge1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG9uVG91Y2hlZENhbGxiYWNrKCkge1xuXG4gIH1cblxuICB2YWxpZGF0ZShmb3JtQ29udHJvbDogRm9ybUNvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUZuKGZvcm1Db250cm9sLnZhbHVlKTtcbiAgfVxuXG4gIHByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHNlbGVjdGVkOiBNb21lbnRbXSB8IHN0cmluZyk6IENhbGVuZGFyVmFsdWUge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0RnJvbU1vbWVudEFycmF5KFxuICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQsXG4gICAgICAgIHNlbGVjdGVkLFxuICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5yZXR1cm5lZFZhbHVlVHlwZSB8fCB0aGlzLnV0aWxzU2VydmljZS5nZXRJbnB1dFR5cGUodGhpcy5pbnB1dFZhbHVlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBpbml0VmFsaWRhdG9ycygpOiB2b2lkIHtcbiAgICB0aGlzLnZhbGlkYXRlRm4gPSB0aGlzLnV0aWxzU2VydmljZS5jcmVhdGVWYWxpZGF0b3IoXG4gICAgICB7XG4gICAgICAgIG1pbkRhdGU6IHRoaXMubWluRGF0ZSxcbiAgICAgICAgbWF4RGF0ZTogdGhpcy5tYXhEYXRlLFxuICAgICAgICBtaW5UaW1lOiB0aGlzLm1pblRpbWUsXG4gICAgICAgIG1heFRpbWU6IHRoaXMubWF4VGltZVxuICAgICAgfSwgdGhpcy5jb21wb25lbnRDb25maWcuZm9ybWF0LCB0aGlzLm1vZGUpO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnByb2Nlc3NPbkNoYW5nZUNhbGxiYWNrKHRoaXMuc2VsZWN0ZWQpLCBmYWxzZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRvcnMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkKSB7XG4gICAgICBjb25zdCB7bWluRGF0ZSwgbWF4RGF0ZSwgbWluVGltZSwgbWF4VGltZX0gPSBjaGFuZ2VzO1xuXG4gICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgaWYgKG1pbkRhdGUgfHwgbWF4RGF0ZSB8fCBtaW5UaW1lIHx8IG1heFRpbWUpIHtcbiAgICAgICAgdGhpcy5pbml0VmFsaWRhdG9ycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldEVsZW1lbnRQb3NpdGlvbkluRG9tKCk7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHNldEVsZW1lbnRQb3NpdGlvbkluRG9tKCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJXcmFwcGVyID0gPEhUTUxFbGVtZW50PiB0aGlzLmNhbGVuZGFyQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5zZXRJbnB1dEVsZW1lbnRDb250YWluZXIoKTtcbiAgICB0aGlzLnBvcHVwRWxlbSA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcC1wb3B1cCcpO1xuICAgIHRoaXMuaGFuZGxlSW5uZXJFbGVtZW50Q2xpY2sodGhpcy5wb3B1cEVsZW0pO1xuXG4gICAgY29uc3Qge2FwcGVuZFRvfSA9IHRoaXMuY29tcG9uZW50Q29uZmlnO1xuICAgIGlmIChhcHBlbmRUbykge1xuICAgICAgaWYgKHR5cGVvZiBhcHBlbmRUbyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRUb0VsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcig8c3RyaW5nPmFwcGVuZFRvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwZW5kVG9FbGVtZW50ID0gPEhUTUxFbGVtZW50PmFwcGVuZFRvO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZFRvRWxlbWVudCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kVG9FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2FsZW5kYXJXcmFwcGVyKTtcbiAgfVxuXG4gIHNldElucHV0RWxlbWVudENvbnRhaW5lcigpIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudENvbnRhaW5lciA9IHRoaXMudXRpbHNTZXJ2aWNlLmdldE5hdGl2ZUVsZW1lbnQodGhpcy5jb21wb25lbnRDb25maWcuaW5wdXRFbGVtZW50Q29udGFpbmVyKVxuICAgICAgfHwgdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmRwLWlucHV0LWNvbnRhaW5lcicpXG4gICAgICB8fCBkb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaGFuZGxlSW5uZXJFbGVtZW50Q2xpY2soZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLmhhbmRsZUlubmVyRWxlbWVudENsaWNrVW5saXN0ZW5lcnMucHVzaChcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlU3RhdGVIZWxwZXIgPSB0cnVlO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNvbXBvbmVudENvbmZpZyA9IHRoaXMuZGF5UGlja2VyU2VydmljZS5nZXRDb25maWcodGhpcy5jb25maWcsIHRoaXMubW9kZSk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSB0aGlzLmRpc3BsYXlEYXRlXG4gICAgICA/IHRoaXMudXRpbHNTZXJ2aWNlLmNvbnZlcnRUb01vbWVudCh0aGlzLmRpc3BsYXlEYXRlLCB0aGlzLmNvbXBvbmVudENvbmZpZy5mb3JtYXQpLmNsb25lKClcbiAgICAgIDogdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgICAgIC5nZXREZWZhdWx0RGlzcGxheURhdGUoXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVWaWV3LFxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5taW5cbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5kYXlDYWxlbmRhckNvbmZpZyA9IHRoaXMuZGF5UGlja2VyU2VydmljZS5nZXREYXlDb25maWdTZXJ2aWNlKHRoaXMuY29tcG9uZW50Q29uZmlnKTtcbiAgICB0aGlzLmRheVRpbWVDYWxlbmRhckNvbmZpZyA9IHRoaXMuZGF5UGlja2VyU2VydmljZS5nZXREYXlUaW1lQ29uZmlnU2VydmljZSh0aGlzLmNvbXBvbmVudENvbmZpZyk7XG4gICAgdGhpcy50aW1lU2VsZWN0Q29uZmlnID0gdGhpcy5kYXlQaWNrZXJTZXJ2aWNlLmdldFRpbWVDb25maWdTZXJ2aWNlKHRoaXMuY29tcG9uZW50Q29uZmlnKTtcbiAgfVxuXG4gIGlucHV0Rm9jdXNlZCgpIHtcbiAgICBpZiAoIXRoaXMub3Blbk9uRm9jdXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmlzRm9jdXNlZFRyaWdnZXIgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmFyZUNhbGVuZGFyc1Nob3duKSB7XG4gICAgICAgIHRoaXMuc2hvd0NhbGVuZGFycygpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVTdGF0ZUhlbHBlciA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmlzRm9jdXNlZFRyaWdnZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfSwgdGhpcy5jb21wb25lbnRDb25maWcub25PcGVuRGVsYXkpO1xuICB9XG5cbiAgaW5wdXRCbHVycmVkKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHNob3dDYWxlbmRhcnMoKSB7XG4gICAgdGhpcy5oaWRlU3RhdGVIZWxwZXIgPSB0cnVlO1xuICAgIHRoaXMuYXJlQ2FsZW5kYXJzU2hvd24gPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMudGltZVNlbGVjdFJlZikge1xuICAgICAgdGhpcy50aW1lU2VsZWN0UmVmLmFwaS50cmlnZ2VyQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vcGVuLmVtaXQoKTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgaGlkZUNhbGVuZGFyKCkge1xuICAgIHRoaXMuYXJlQ2FsZW5kYXJzU2hvd24gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmRheUNhbGVuZGFyUmVmKSB7XG4gICAgICB0aGlzLmRheUNhbGVuZGFyUmVmLmFwaS50b2dnbGVDYWxlbmRhck1vZGUoRUNhbGVuZGFyTW9kZS5EYXkpO1xuICAgIH1cblxuICAgIHRoaXMuY2xvc2UuZW1pdCgpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvblZpZXdEYXRlQ2hhbmdlKHZhbHVlOiBDYWxlbmRhclZhbHVlKSB7XG4gICAgY29uc3Qgc3RyVmFsID0gdmFsdWUgPyB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9TdHJpbmcodmFsdWUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCkgOiAnJztcbiAgICBpZiAodGhpcy5kYXlQaWNrZXJTZXJ2aWNlLmlzVmFsaWRJbnB1dERhdGVWYWx1ZShzdHJWYWwsIHRoaXMuY29tcG9uZW50Q29uZmlnKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF5UGlja2VyU2VydmljZS5jb252ZXJ0SW5wdXRWYWx1ZVRvTW9tZW50QXJyYXkoc3RyVmFsLCB0aGlzLmNvbXBvbmVudENvbmZpZyk7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlVmlldyA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoXG4gICAgICAgID8gdGhpcy51dGlsc1NlcnZpY2UuZ2V0RGVmYXVsdERpc3BsYXlEYXRlKFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LFxuICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29uZmlnLm1pblxuICAgICAgICApXG4gICAgICAgIDogdGhpcy5jdXJyZW50RGF0ZVZpZXc7XG5cbiAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7XG4gICAgICAgIGRhdGU6IHN0clZhbCxcbiAgICAgICAgdHlwZTogU2VsZWN0RXZlbnQuSU5QVVQsXG4gICAgICAgIGdyYW51bGFyaXR5OiBudWxsXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMudXRpbHNTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VmFsaWRNb21lbnRBcnJheShzdHJWYWwsIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCk7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5wcm9jZXNzT25DaGFuZ2VDYWxsYmFjayhzdHJWYWwpLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBkYXRlU2VsZWN0ZWQoZGF0ZTogSURhdGUsIGdyYW51bGFyaXR5OiB1bml0T2ZUaW1lLkJhc2UsIHR5cGU6IFNlbGVjdEV2ZW50LCBpZ25vcmVDbG9zZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy51dGlsc1NlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC51cGRhdGVTZWxlY3RlZCh0aGlzLmNvbXBvbmVudENvbmZpZy5hbGxvd011bHRpU2VsZWN0LCB0aGlzLnNlbGVjdGVkLCBkYXRlLCBncmFudWxhcml0eSk7XG4gICAgaWYgKCFpZ25vcmVDbG9zZSkge1xuICAgICAgdGhpcy5vbkRhdGVDbGljaygpO1xuICAgIH1cblxuICAgIHRoaXMub25TZWxlY3QuZW1pdCh7XG4gICAgICBkYXRlOiBkYXRlLmRhdGUsXG4gICAgICBncmFudWxhcml0eSxcbiAgICAgIHR5cGVcbiAgICB9KTtcbiAgfVxuXG4gIG9uRGF0ZUNsaWNrKCkge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudENvbmZpZy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICBzZXRUaW1lb3V0KHRoaXMuaGlkZUNhbGVuZGFyLmJpbmQodGhpcyksIHRoaXMuY29tcG9uZW50Q29uZmlnLmNsb3NlT25TZWxlY3REZWxheSk7XG4gICAgfVxuICB9XG5cbiAgb25LZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSAoOSk6XG4gICAgICBjYXNlICgyNyk6XG4gICAgICAgIHRoaXMuaGlkZUNhbGVuZGFyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVDYWxlbmRhclRvKGRhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICBjb25zdCBtb21lbnREYXRlID0gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFRvTW9tZW50KGRhdGUsIHRoaXMuY29tcG9uZW50Q29uZmlnLmZvcm1hdCk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZVZpZXcgPSBtb21lbnREYXRlO1xuICB9XG5cbiAgb25MZWZ0TmF2Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uTGVmdE5hdi5lbWl0KGNoYW5nZSk7XG4gIH1cblxuICBvblJpZ2h0TmF2Q2xpY2soY2hhbmdlOiBJTmF2RXZlbnQpIHtcbiAgICB0aGlzLm9uUmlnaHROYXYuZW1pdChjaGFuZ2UpO1xuICB9XG5cbiAgc3RhcnRHbG9iYWxMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5nbG9iYWxMaXN0ZW5lcnNVbmxpc3RlbmVycy5wdXNoKFxuICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnQsICdrZXlkb3duJywgKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbktleVByZXNzKGUpO1xuICAgICAgfSksXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5vblNjcm9sbCgpO1xuICAgICAgfSksXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLm9uQm9keUNsaWNrKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBzdG9wR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzVW5saXN0ZW5lcnMuZm9yRWFjaCgodWwpID0+IHVsKCkpO1xuICAgIHRoaXMuZ2xvYmFsTGlzdGVuZXJzVW5saXN0ZW5lcnMgPSBbXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaGFuZGxlSW5uZXJFbGVtZW50Q2xpY2tVbmxpc3RlbmVycy5mb3JFYWNoKHVsID0+IHVsKCkpO1xuXG4gICAgaWYgKHRoaXMuYXBwZW5kVG9FbGVtZW50KSB7XG4gICAgICB0aGlzLmFwcGVuZFRvRWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNhbGVuZGFyV3JhcHBlcik7XG4gICAgfVxuICB9XG59XG4iXX0=