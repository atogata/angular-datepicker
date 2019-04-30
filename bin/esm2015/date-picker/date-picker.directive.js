/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DatePickerDirectiveService } from './date-picker-directive.service';
import { DatePickerComponent } from './date-picker.component';
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Input, Optional, Output, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
export class DatePickerDirective {
    /**
     * @param {?} viewContainerRef
     * @param {?} elemRef
     * @param {?} componentFactoryResolver
     * @param {?} service
     * @param {?} formControl
     * @param {?} utilsService
     */
    constructor(viewContainerRef, elemRef, componentFactoryResolver, service, formControl, utilsService) {
        this.viewContainerRef = viewContainerRef;
        this.elemRef = elemRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.service = service;
        this.formControl = formControl;
        this.utilsService = utilsService;
        this._mode = 'day';
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
        this.onLeftNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set config(config) {
        this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
        this.updateDatepickerConfig();
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get attachTo() {
        return this._attachTo;
    }
    /**
     * @param {?} attachTo
     * @return {?}
     */
    set attachTo(attachTo) {
        this._attachTo = attachTo;
        this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
        this.updateDatepickerConfig();
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get theme() {
        return this._theme;
    }
    /**
     * @param {?} theme
     * @return {?}
     */
    set theme(theme) {
        this._theme = theme;
        if (this.datePicker) {
            this.datePicker.theme = theme;
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get mode() {
        return this._mode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set mode(mode) {
        this._mode = mode;
        if (this.datePicker) {
            this.datePicker.mode = mode;
        }
        this.markForCheck();
    }
    /**
     * @param {?} minDate
     * @return {?}
     */
    set minDate(minDate) {
        this._minDate = minDate;
        if (this.datePicker) {
            this.datePicker.minDate = minDate;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} maxDate
     * @return {?}
     */
    set maxDate(maxDate) {
        this._maxDate = maxDate;
        if (this.datePicker) {
            this.datePicker.maxDate = maxDate;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} minTime
     * @return {?}
     */
    set minTime(minTime) {
        this._minTime = minTime;
        if (this.datePicker) {
            this.datePicker.minTime = minTime;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get minTime() {
        return this._minTime;
    }
    /**
     * @param {?} maxTime
     * @return {?}
     */
    set maxTime(maxTime) {
        this._maxTime = maxTime;
        if (this.datePicker) {
            this.datePicker.maxTime = maxTime;
            this.datePicker.ngOnInit();
        }
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    get maxTime() {
        return this._maxTime;
    }
    /**
     * @return {?}
     */
    get displayDate() {
        return this._displayDate;
    }
    /**
     * @param {?} displayDate
     * @return {?}
     */
    set displayDate(displayDate) {
        this._displayDate = displayDate;
        this.updateDatepickerConfig();
        this.markForCheck();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.datePicker = this.createDatePicker();
        this.api = this.datePicker.api;
        this.updateDatepickerConfig();
        this.attachModelToDatePicker();
        this.datePicker.theme = this.theme;
    }
    /**
     * @return {?}
     */
    createDatePicker() {
        /** @type {?} */
        const factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
        return this.viewContainerRef.createComponent(factory).instance;
    }
    /**
     * @return {?}
     */
    attachModelToDatePicker() {
        if (!this.formControl) {
            return;
        }
        this.datePicker.onViewDateChange(this.formControl.value);
        this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (value !== this.datePicker.inputElementValue) {
                /** @type {?} */
                const strVal = this.utilsService.convertToString(value, this.datePicker.componentConfig.format);
                this.datePicker.onViewDateChange(strVal);
            }
        }));
        /** @type {?} */
        let setup = true;
        this.datePicker.registerOnChange((/**
         * @param {?} value
         * @param {?} changedByInput
         * @return {?}
         */
        (value, changedByInput) => {
            if (value) {
                /** @type {?} */
                const isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                if (!isMultiselectEmpty && !changedByInput) {
                    this.formControl.control.setValue(this.datePicker.inputElementValue);
                }
            }
            /** @type {?} */
            const errors = this.datePicker.validateFn(value);
            if (!setup) {
                this.formControl.control.markAsDirty({
                    onlySelf: true
                });
            }
            else {
                setup = false;
            }
            if (errors) {
                if (errors.hasOwnProperty('format')) {
                    const { given } = errors['format'];
                    this.datePicker.inputElementValue = given;
                    if (!changedByInput) {
                        this.formControl.control.setValue(given);
                    }
                }
                this.formControl.control.setErrors(errors);
            }
        }));
    }
    /**
     * @return {?}
     */
    onClick() {
        this.datePicker.onClick();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.datePicker.inputFocused();
    }
    /**
     * @private
     * @return {?}
     */
    updateDatepickerConfig() {
        if (this.datePicker) {
            this.datePicker.minDate = this.minDate;
            this.datePicker.maxDate = this.maxDate;
            this.datePicker.minTime = this.minTime;
            this.datePicker.maxTime = this.maxTime;
            this.datePicker.mode = this.mode || 'day';
            this.datePicker.displayDate = this.displayDate;
            this.datePicker.config = this.config;
            this.datePicker.open = this.open;
            this.datePicker.close = this.close;
            this.datePicker.onChange = this.onChange;
            this.datePicker.onGoToCurrent = this.onGoToCurrent;
            this.datePicker.onLeftNav = this.onLeftNav;
            this.datePicker.onRightNav = this.onRightNav;
            this.datePicker.onSelect = this.onSelect;
            this.datePicker.init();
            if (this.datePicker.componentConfig.disableKeypress) {
                this.elemRef.nativeElement.setAttribute('readonly', true);
            }
            else {
                this.elemRef.nativeElement.removeAttribute('readonly');
            }
        }
    }
    /**
     * @return {?}
     */
    markForCheck() {
        if (this.datePicker) {
            this.datePicker.cd.markForCheck();
        }
    }
}
DatePickerDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'dpDayPicker',
                providers: [DatePickerDirectiveService],
                selector: '[dpDayPicker]'
            },] }
];
/** @nocollapse */
DatePickerDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: DatePickerDirectiveService },
    { type: NgControl, decorators: [{ type: Optional }] },
    { type: UtilsService }
];
DatePickerDirective.propDecorators = {
    config: [{ type: Input, args: ['dpDayPicker',] }],
    attachTo: [{ type: Input }],
    theme: [{ type: Input }],
    mode: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    displayDate: [{ type: Input }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onChange: [{ type: Output }],
    onGoToCurrent: [{ type: Output }],
    onLeftNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onSelect: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }],
    onFocus: [{ type: HostListener, args: ['focus',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._config;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._attachTo;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._theme;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._mode;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._minTime;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._maxTime;
    /**
     * @type {?}
     * @private
     */
    DatePickerDirective.prototype._displayDate;
    /** @type {?} */
    DatePickerDirective.prototype.open;
    /** @type {?} */
    DatePickerDirective.prototype.close;
    /** @type {?} */
    DatePickerDirective.prototype.onChange;
    /** @type {?} */
    DatePickerDirective.prototype.onGoToCurrent;
    /** @type {?} */
    DatePickerDirective.prototype.onLeftNav;
    /** @type {?} */
    DatePickerDirective.prototype.onRightNav;
    /** @type {?} */
    DatePickerDirective.prototype.onSelect;
    /** @type {?} */
    DatePickerDirective.prototype.datePicker;
    /** @type {?} */
    DatePickerDirective.prototype.api;
    /** @type {?} */
    DatePickerDirective.prototype.viewContainerRef;
    /** @type {?} */
    DatePickerDirective.prototype.elemRef;
    /** @type {?} */
    DatePickerDirective.prototype.componentFactoryResolver;
    /** @type {?} */
    DatePickerDirective.prototype.service;
    /** @type {?} */
    DatePickerDirective.prototype.formControl;
    /** @type {?} */
    DatePickerDirective.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUUzRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSXpDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQTtBQVFuRSxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7Ozs7SUF3STlCLFlBQW1CLGdCQUFrQyxFQUNsQyxPQUFtQixFQUNuQix3QkFBa0QsRUFDbEQsT0FBbUMsRUFDdkIsV0FBc0IsRUFDbEMsWUFBMEI7UUFMMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsWUFBTyxHQUFQLE9BQU8sQ0FBNEI7UUFDdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVc7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUF6SXJDLFVBQUssR0FBaUIsS0FBSyxDQUFDO1FBeUgxQixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNoQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNqQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFDN0Msa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxjQUFTLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsZUFBVSxHQUE0QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELGFBQVEsR0FBa0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVd2RSxDQUFDOzs7O0lBbklELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELElBQTBCLE1BQU0sQ0FBQyxNQUFrQztRQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQWEsUUFBUSxDQUFDLFFBQTZCO1FBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQWEsS0FBSyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRUQsSUFBYSxJQUFJLENBQUMsSUFBa0I7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELElBQWEsT0FBTyxDQUFDLE9BQTRCO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsSUFBYSxPQUFPLENBQUMsT0FBNEI7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxJQUFhLE9BQU8sQ0FBQyxPQUE0QjtRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELElBQWEsT0FBTyxDQUFDLE9BQTRCO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxJQUFhLFdBQVcsQ0FBQyxXQUFnQztRQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQXFCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELGdCQUFnQjs7Y0FDUixPQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDO1FBQzFGLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELHVCQUF1QjtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEQsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTs7c0JBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUMvRixJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7O1lBRUMsS0FBSyxHQUFHLElBQUk7UUFFaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7Ozs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQUU7WUFDekQsSUFBSSxLQUFLLEVBQUU7O3NCQUNILGtCQUFrQixHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBRXpFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDdEU7YUFDRjs7a0JBRUssTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUVoRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFDbkMsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNmO1lBRUQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFOzBCQUM3QixFQUFDLEtBQUssRUFBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO29CQUMxQyxJQUFJLENBQUMsY0FBYyxFQUFFO3dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzFDO2lCQUNGO2dCQUVELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUdELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFHRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVPLHNCQUFzQjtRQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4RDtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbkM7SUFDSCxDQUFDOzs7WUE1UEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztnQkFDdkMsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUFiQyxnQkFBZ0I7WUFQaEIsVUFBVTtZQUZWLHdCQUF3QjtZQUpsQiwwQkFBMEI7WUFlMUIsU0FBUyx1QkF3SkYsUUFBUTtZQXBKZixZQUFZOzs7cUJBdUJqQixLQUFLLFNBQUMsYUFBYTt1QkFVbkIsS0FBSztvQkFXTCxLQUFLO21CQWFMLEtBQUs7c0JBU0wsS0FBSztzQkFjTCxLQUFLO3NCQWNMLEtBQUs7c0JBY0wsS0FBSzswQkFrQkwsS0FBSzttQkFPTCxNQUFNO29CQUNOLE1BQU07dUJBQ04sTUFBTTs0QkFDTixNQUFNO3dCQUNOLE1BQU07eUJBQ04sTUFBTTt1QkFDTixNQUFNO3NCQTJFTixZQUFZLFNBQUMsT0FBTztzQkFLcEIsWUFBWSxTQUFDLE9BQU87Ozs7Ozs7SUFsTnJCLHNDQUE0Qzs7Ozs7SUFDNUMsd0NBQXVDOzs7OztJQUN2QyxxQ0FBdUI7Ozs7O0lBQ3ZCLG9DQUFvQzs7Ozs7SUFDcEMsdUNBQXNDOzs7OztJQUN0Qyx1Q0FBc0M7Ozs7O0lBQ3RDLHVDQUFzQzs7Ozs7SUFDdEMsdUNBQXNDOzs7OztJQUN0QywyQ0FBMEM7O0lBb0gxQyxtQ0FBMEM7O0lBQzFDLG9DQUEyQzs7SUFDM0MsdUNBQXVEOztJQUN2RCw0Q0FBaUU7O0lBQ2pFLHdDQUFrRTs7SUFDbEUseUNBQW1FOztJQUNuRSx1Q0FBdUU7O0lBRXZFLHlDQUF1Qzs7SUFDdkMsa0NBQTRCOztJQUVoQiwrQ0FBeUM7O0lBQ3pDLHNDQUEwQjs7SUFDMUIsdURBQXlEOztJQUN6RCxzQ0FBMEM7O0lBQzFDLDBDQUF5Qzs7SUFDekMsMkNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWxlbmRhck1vZGV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci1tb2RlJztcbmltcG9ydCB7SURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWd9IGZyb20gJy4vZGF0ZS1waWNrZXItZGlyZWN0aXZlLWNvbmZpZy5tb2RlbCc7XG5pbXBvcnQge0RhdGVQaWNrZXJEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tICcuL2RhdGUtcGlja2VyLWRpcmVjdGl2ZS5zZXJ2aWNlJztcbmltcG9ydCB7SURwRGF5UGlja2VyQXBpfSBmcm9tICcuL2RhdGUtcGlja2VyLmFwaSc7XG5pbXBvcnQge0RhdGVQaWNrZXJDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9jYWxlbmRhci12YWx1ZSc7XG5pbXBvcnQge1NpbmdsZUNhbGVuZGFyVmFsdWV9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zaW5nbGUtY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtJTmF2RXZlbnR9IGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvbmF2aWdhdGlvbi1ldmVudC5tb2RlbCc7XG5pbXBvcnQge1V0aWxzU2VydmljZX0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnXG5pbXBvcnQge0lTZWxlY3Rpb25FdmVudH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NlbGVjdGlvbi1ldmV0Lm1vZGVsJztcblxuQERpcmVjdGl2ZSh7XG4gIGV4cG9ydEFzOiAnZHBEYXlQaWNrZXInLFxuICBwcm92aWRlcnM6IFtEYXRlUGlja2VyRGlyZWN0aXZlU2VydmljZV0sXG4gIHNlbGVjdG9yOiAnW2RwRGF5UGlja2VyXSdcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgX2NvbmZpZzogSURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWc7XG4gIHByaXZhdGUgX2F0dGFjaFRvOiBFbGVtZW50UmVmIHwgc3RyaW5nO1xuICBwcml2YXRlIF90aGVtZTogc3RyaW5nO1xuICBwcml2YXRlIF9tb2RlOiBDYWxlbmRhck1vZGUgPSAnZGF5JztcbiAgcHJpdmF0ZSBfbWluRGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgcHJpdmF0ZSBfbWluVGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgcHJpdmF0ZSBfbWF4VGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZTtcbiAgcHJpdmF0ZSBfZGlzcGxheURhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG5cbiAgZ2V0IGNvbmZpZygpOiBJRGF0ZVBpY2tlckRpcmVjdGl2ZUNvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIEBJbnB1dCgnZHBEYXlQaWNrZXInKSBzZXQgY29uZmlnKGNvbmZpZzogSURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLnNlcnZpY2UuZ2V0Q29uZmlnKGNvbmZpZywgdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQsIHRoaXMuYXR0YWNoVG8pO1xuICAgIHRoaXMudXBkYXRlRGF0ZXBpY2tlckNvbmZpZygpO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgYXR0YWNoVG8oKTogRWxlbWVudFJlZiB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaFRvO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGF0dGFjaFRvKGF0dGFjaFRvOiBFbGVtZW50UmVmIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fYXR0YWNoVG8gPSBhdHRhY2hUbztcbiAgICB0aGlzLl9jb25maWcgPSB0aGlzLnNlcnZpY2UuZ2V0Q29uZmlnKHRoaXMuY29uZmlnLCB0aGlzLnZpZXdDb250YWluZXJSZWYuZWxlbWVudCwgdGhpcy5hdHRhY2hUbyk7XG4gICAgdGhpcy51cGRhdGVEYXRlcGlja2VyQ29uZmlnKCk7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCB0aGVtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90aGVtZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB0aGVtZSh0aGVtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcbiAgICBpZiAodGhpcy5kYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIudGhlbWUgPSB0aGVtZTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IG1vZGUoKTogQ2FsZW5kYXJNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtb2RlKG1vZGU6IENhbGVuZGFyTW9kZSkge1xuICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuICAgIGlmICh0aGlzLmRhdGVQaWNrZXIpIHtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5tb2RlID0gbW9kZTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1pbkRhdGUobWluRGF0ZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlO1xuICAgIGlmICh0aGlzLmRhdGVQaWNrZXIpIHtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5taW5EYXRlID0gbWluRGF0ZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgbWluRGF0ZSgpOiBTaW5nbGVDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtYXhEYXRlKG1heERhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICB0aGlzLl9tYXhEYXRlID0gbWF4RGF0ZTtcbiAgICBpZiAodGhpcy5kYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubWF4RGF0ZSA9IG1heERhdGU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IG1heERhdGUoKTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbWluVGltZShtaW5UaW1lOiBTaW5nbGVDYWxlbmRhclZhbHVlKSB7XG4gICAgdGhpcy5fbWluVGltZSA9IG1pblRpbWU7XG4gICAgaWYgKHRoaXMuZGF0ZVBpY2tlcikge1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm1pblRpbWUgPSBtaW5UaW1lO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBtaW5UaW1lKCk6IFNpbmdsZUNhbGVuZGFyVmFsdWUge1xuICAgIHJldHVybiB0aGlzLl9taW5UaW1lO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1heFRpbWUobWF4VGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIHRoaXMuX21heFRpbWUgPSBtYXhUaW1lO1xuICAgIGlmICh0aGlzLmRhdGVQaWNrZXIpIHtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5tYXhUaW1lID0gbWF4VGltZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgbWF4VGltZSgpOiBTaW5nbGVDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4VGltZTtcbiAgfVxuXG4gIGdldCBkaXNwbGF5RGF0ZSgpOiBTaW5nbGVDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGxheURhdGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgZGlzcGxheURhdGUoZGlzcGxheURhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICB0aGlzLl9kaXNwbGF5RGF0ZSA9IGRpc3BsYXlEYXRlO1xuICAgIHRoaXMudXBkYXRlRGF0ZXBpY2tlckNvbmZpZygpO1xuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJWYWx1ZT4oKTtcbiAgQE91dHB1dCgpIG9uR29Ub0N1cnJlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uTGVmdE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0TmF2OiBFdmVudEVtaXR0ZXI8SU5hdkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8SVNlbGVjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgZGF0ZVBpY2tlcjogRGF0ZVBpY2tlckNvbXBvbmVudDtcbiAgcHVibGljIGFwaTogSURwRGF5UGlja2VyQXBpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBwdWJsaWMgZWxlbVJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHVibGljIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgc2VydmljZTogRGF0ZVBpY2tlckRpcmVjdGl2ZVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBmb3JtQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICAgICAgICBwdWJsaWMgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZVBpY2tlciA9IHRoaXMuY3JlYXRlRGF0ZVBpY2tlcigpO1xuICAgIHRoaXMuYXBpID0gdGhpcy5kYXRlUGlja2VyLmFwaTtcbiAgICB0aGlzLnVwZGF0ZURhdGVwaWNrZXJDb25maWcoKTtcbiAgICB0aGlzLmF0dGFjaE1vZGVsVG9EYXRlUGlja2VyKCk7XG4gICAgdGhpcy5kYXRlUGlja2VyLnRoZW1lID0gdGhpcy50aGVtZTtcbiAgfVxuXG4gIGNyZWF0ZURhdGVQaWNrZXIoKTogRGF0ZVBpY2tlckNvbXBvbmVudCB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KERhdGVQaWNrZXJDb21wb25lbnQpO1xuICAgIHJldHVybiB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpLmluc3RhbmNlO1xuICB9XG5cbiAgYXR0YWNoTW9kZWxUb0RhdGVQaWNrZXIoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm1Db250cm9sKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kYXRlUGlja2VyLm9uVmlld0RhdGVDaGFuZ2UodGhpcy5mb3JtQ29udHJvbC52YWx1ZSk7XG5cbiAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodmFsdWUgIT09IHRoaXMuZGF0ZVBpY2tlci5pbnB1dEVsZW1lbnRWYWx1ZSkge1xuICAgICAgICBjb25zdCBzdHJWYWwgPSB0aGlzLnV0aWxzU2VydmljZS5jb252ZXJ0VG9TdHJpbmcodmFsdWUsIHRoaXMuZGF0ZVBpY2tlci5jb21wb25lbnRDb25maWcuZm9ybWF0KTtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyLm9uVmlld0RhdGVDaGFuZ2Uoc3RyVmFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBzZXR1cCA9IHRydWU7XG5cbiAgICB0aGlzLmRhdGVQaWNrZXIucmVnaXN0ZXJPbkNoYW5nZSgodmFsdWUsIGNoYW5nZWRCeUlucHV0KSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgY29uc3QgaXNNdWx0aXNlbGVjdEVtcHR5ID0gc2V0dXAgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgIXZhbHVlLmxlbmd0aDtcblxuICAgICAgICBpZiAoIWlzTXVsdGlzZWxlY3RFbXB0eSAmJiAhY2hhbmdlZEJ5SW5wdXQpIHtcbiAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodGhpcy5kYXRlUGlja2VyLmlucHV0RWxlbWVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlcnJvcnMgPSB0aGlzLmRhdGVQaWNrZXIudmFsaWRhdGVGbih2YWx1ZSk7XG5cbiAgICAgIGlmICghc2V0dXApIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5jb250cm9sLm1hcmtBc0RpcnR5KHtcbiAgICAgICAgICBvbmx5U2VsZjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldHVwID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgaWYgKGVycm9ycy5oYXNPd25Qcm9wZXJ0eSgnZm9ybWF0JykpIHtcbiAgICAgICAgICBjb25zdCB7Z2l2ZW59ID0gZXJyb3JzWydmb3JtYXQnXTtcbiAgICAgICAgICB0aGlzLmRhdGVQaWNrZXIuaW5wdXRFbGVtZW50VmFsdWUgPSBnaXZlbjtcbiAgICAgICAgICBpZiAoIWNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUoZ2l2ZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuY29udHJvbC5zZXRFcnJvcnMoZXJyb3JzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIub25DbGljaygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBvbkZvY3VzKCkge1xuICAgIHRoaXMuZGF0ZVBpY2tlci5pbnB1dEZvY3VzZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGF0ZXBpY2tlckNvbmZpZygpIHtcbiAgICBpZiAodGhpcy5kYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubWluRGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5tYXhEYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm1pblRpbWUgPSB0aGlzLm1pblRpbWU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubWF4VGltZSA9IHRoaXMubWF4VGltZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5tb2RlID0gdGhpcy5tb2RlIHx8ICdkYXknO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLmRpc3BsYXlEYXRlID0gdGhpcy5kaXNwbGF5RGF0ZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5vcGVuID0gdGhpcy5vcGVuO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLmNsb3NlID0gdGhpcy5jbG9zZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2U7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIub25Hb1RvQ3VycmVudCA9IHRoaXMub25Hb1RvQ3VycmVudDtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5vbkxlZnROYXYgPSB0aGlzLm9uTGVmdE5hdjtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5vblJpZ2h0TmF2ID0gdGhpcy5vblJpZ2h0TmF2O1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm9uU2VsZWN0ID0gdGhpcy5vblNlbGVjdDtcblxuICAgICAgdGhpcy5kYXRlUGlja2VyLmluaXQoKTtcblxuICAgICAgaWYgKHRoaXMuZGF0ZVBpY2tlci5jb21wb25lbnRDb25maWcuZGlzYWJsZUtleXByZXNzKSB7XG4gICAgICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuZGF0ZVBpY2tlcikge1xuICAgICAgdGhpcy5kYXRlUGlja2VyLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxufVxuIl19