import { IDate } from '../common/models/date.model';
import { DomHelper } from '../common/services/dom-appender/dom-appender.service';
import { UtilsService } from '../common/services/utils/utils.service';
import { CalendarMode } from '../common/types/calendar-mode';
import { CalendarValue } from '../common/types/calendar-value';
import { SingleCalendarValue } from '../common/types/single-calendar-value';
import { IDayCalendarConfig } from '../day-calendar/day-calendar-config.model';
import { DayCalendarComponent } from '../day-calendar/day-calendar.component';
import { IDayTimeCalendarConfig } from '../day-time-calendar/day-time-calendar-config.model';
import { ITimeSelectConfig } from '../time-select/time-select-config.model';
import { TimeSelectComponent } from '../time-select/time-select.component';
import { IDatePickerConfig, IDatePickerConfigInternal } from './date-picker-config.model';
import { IDpDayPickerApi } from './date-picker.api';
import { DatePickerService } from './date-picker.service';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, ValidationErrors, Validator } from '@angular/forms';
import { Moment, unitOfTime } from 'moment';
import { DateValidator } from '../common/types/validator.type';
import { MonthCalendarComponent } from '../month-calendar/month-calendar.component';
import { YearCalendarComponent } from '../year-calendar/year-calendar.component';
import { DayTimeCalendarComponent } from '../day-time-calendar/day-time-calendar.component';
import { INavEvent } from '../common/models/navigation-event.model';
import { SelectEvent } from '../common/types/selection-evet.enum.';
import { ISelectionEvent } from '../common/types/selection-evet.model';
export declare class DatePickerComponent implements OnChanges, OnInit, AfterViewInit, ControlValueAccessor, Validator, OnDestroy {
    private readonly dayPickerService;
    private readonly domHelper;
    private readonly elemRef;
    private readonly renderer;
    private readonly utilsService;
    readonly cd: ChangeDetectorRef;
    isInitialized: boolean;
    config: IDatePickerConfig;
    mode: CalendarMode;
    placeholder: string;
    disabled: boolean;
    displayDate: SingleCalendarValue;
    theme: string;
    minDate: SingleCalendarValue;
    maxDate: SingleCalendarValue;
    minTime: SingleCalendarValue;
    maxTime: SingleCalendarValue;
    open: EventEmitter<void>;
    close: EventEmitter<void>;
    onChange: EventEmitter<CalendarValue>;
    onGoToCurrent: EventEmitter<void>;
    onLeftNav: EventEmitter<INavEvent>;
    onRightNav: EventEmitter<INavEvent>;
    onSelect: EventEmitter<ISelectionEvent>;
    calendarContainer: ElementRef;
    dayCalendarRef: DayCalendarComponent;
    monthCalendarRef: MonthCalendarComponent;
    yearCalendarRef: YearCalendarComponent;
    dayTimeCalendarRef: DayTimeCalendarComponent;
    timeSelectRef: TimeSelectComponent;
    componentConfig: IDatePickerConfigInternal;
    dayCalendarConfig: IDayCalendarConfig;
    dayTimeCalendarConfig: IDayTimeCalendarConfig;
    timeSelectConfig: ITimeSelectConfig;
    _areCalendarsShown: boolean;
    hideStateHelper: boolean;
    _selected: Moment[];
    inputValue: CalendarValue;
    isFocusedTrigger: boolean;
    _currentDateView: Moment;
    inputElementValue: string;
    calendarWrapper: HTMLElement;
    appendToElement: HTMLElement;
    inputElementContainer: HTMLElement;
    popupElem: HTMLElement;
    handleInnerElementClickUnlisteners: Function[];
    globalListenersUnlisteners: Function[];
    validateFn: DateValidator;
    api: IDpDayPickerApi;
    selectEvent: typeof SelectEvent;
    selected: Moment[];
    areCalendarsShown: boolean;
    readonly openOnFocus: boolean;
    readonly openOnClick: boolean;
    currentDateView: Moment;
    constructor(dayPickerService: DatePickerService, domHelper: DomHelper, elemRef: ElementRef, renderer: Renderer, utilsService: UtilsService, cd: ChangeDetectorRef);
    onClick(): void;
    onBodyClick(): void;
    onScroll(): void;
    writeValue(value: CalendarValue): void;
    registerOnChange(fn: any): void;
    onChangeCallback(_: any, changedByInput: boolean): void;
    registerOnTouched(fn: any): void;
    onTouchedCallback(): void;
    validate(formControl: FormControl): ValidationErrors;
    processOnChangeCallback(selected: Moment[] | string): CalendarValue;
    initValidators(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    setDisabledState(isDisabled: boolean): void;
    setElementPositionInDom(): void;
    setInputElementContainer(): void;
    handleInnerElementClick(element: HTMLElement): void;
    init(): void;
    inputFocused(): void;
    inputBlurred(): void;
    showCalendars(): void;
    hideCalendar(): void;
    onViewDateChange(value: CalendarValue): void;
    dateSelected(date: IDate, granularity: unitOfTime.Base, type: SelectEvent, ignoreClose?: boolean): void;
    onDateClick(): void;
    onKeyPress(event: KeyboardEvent): void;
    moveCalendarTo(date: SingleCalendarValue): void;
    onLeftNavClick(change: INavEvent): void;
    onRightNavClick(change: INavEvent): void;
    startGlobalListeners(): void;
    stopGlobalListeners(): void;
    ngOnDestroy(): void;
}
