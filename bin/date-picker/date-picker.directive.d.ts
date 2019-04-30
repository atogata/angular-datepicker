import { CalendarMode } from '../common/types/calendar-mode';
import { IDatePickerDirectiveConfig } from './date-picker-directive-config.model';
import { DatePickerDirectiveService } from './date-picker-directive.service';
import { IDpDayPickerApi } from './date-picker.api';
import { DatePickerComponent } from './date-picker.component';
import { ComponentFactoryResolver, ElementRef, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CalendarValue } from '../common/types/calendar-value';
import { SingleCalendarValue } from '../common/types/single-calendar-value';
import { INavEvent } from '../common/models/navigation-event.model';
import { UtilsService } from '../common/services/utils/utils.service';
import { ISelectionEvent } from '../common/types/selection-evet.model';
export declare class DatePickerDirective implements OnInit {
    viewContainerRef: ViewContainerRef;
    elemRef: ElementRef;
    componentFactoryResolver: ComponentFactoryResolver;
    service: DatePickerDirectiveService;
    formControl: NgControl;
    utilsService: UtilsService;
    private _config;
    private _attachTo;
    private _theme;
    private _mode;
    private _minDate;
    private _maxDate;
    private _minTime;
    private _maxTime;
    private _displayDate;
    config: IDatePickerDirectiveConfig;
    attachTo: ElementRef | string;
    theme: string;
    mode: CalendarMode;
    minDate: SingleCalendarValue;
    maxDate: SingleCalendarValue;
    minTime: SingleCalendarValue;
    maxTime: SingleCalendarValue;
    displayDate: SingleCalendarValue;
    open: EventEmitter<void>;
    close: EventEmitter<void>;
    onChange: EventEmitter<CalendarValue>;
    onGoToCurrent: EventEmitter<void>;
    onLeftNav: EventEmitter<INavEvent>;
    onRightNav: EventEmitter<INavEvent>;
    onSelect: EventEmitter<ISelectionEvent>;
    datePicker: DatePickerComponent;
    api: IDpDayPickerApi;
    constructor(viewContainerRef: ViewContainerRef, elemRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, service: DatePickerDirectiveService, formControl: NgControl, utilsService: UtilsService);
    ngOnInit(): void;
    createDatePicker(): DatePickerComponent;
    attachModelToDatePicker(): void;
    onClick(): void;
    onFocus(): void;
    private updateDatepickerConfig;
    markForCheck(): void;
}
