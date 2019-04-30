/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DatePickerDirectiveService } from './date-picker-directive.service';
import { DatePickerComponent } from './date-picker.component';
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Input, Optional, Output, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UtilsService } from '../common/services/utils/utils.service';
var DatePickerDirective = /** @class */ (function () {
    function DatePickerDirective(viewContainerRef, elemRef, componentFactoryResolver, service, formControl, utilsService) {
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
    Object.defineProperty(DatePickerDirective.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "attachTo", {
        get: /**
         * @return {?}
         */
        function () {
            return this._attachTo;
        },
        set: /**
         * @param {?} attachTo
         * @return {?}
         */
        function (attachTo) {
            this._attachTo = attachTo;
            this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "theme", {
        get: /**
         * @return {?}
         */
        function () {
            return this._theme;
        },
        set: /**
         * @param {?} theme
         * @return {?}
         */
        function (theme) {
            this._theme = theme;
            if (this.datePicker) {
                this.datePicker.theme = theme;
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this._mode = mode;
            if (this.datePicker) {
                this.datePicker.mode = mode;
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} minDate
         * @return {?}
         */
        function (minDate) {
            this._minDate = minDate;
            if (this.datePicker) {
                this.datePicker.minDate = minDate;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} maxDate
         * @return {?}
         */
        function (maxDate) {
            this._maxDate = maxDate;
            if (this.datePicker) {
                this.datePicker.maxDate = maxDate;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minTime;
        },
        set: /**
         * @param {?} minTime
         * @return {?}
         */
        function (minTime) {
            this._minTime = minTime;
            if (this.datePicker) {
                this.datePicker.minTime = minTime;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxTime;
        },
        set: /**
         * @param {?} maxTime
         * @return {?}
         */
        function (maxTime) {
            this._maxTime = maxTime;
            if (this.datePicker) {
                this.datePicker.maxTime = maxTime;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "displayDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._displayDate;
        },
        set: /**
         * @param {?} displayDate
         * @return {?}
         */
        function (displayDate) {
            this._displayDate = displayDate;
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.datePicker = this.createDatePicker();
        this.api = this.datePicker.api;
        this.updateDatepickerConfig();
        this.attachModelToDatePicker();
        this.datePicker.theme = this.theme;
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.createDatePicker = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
        return this.viewContainerRef.createComponent(factory).instance;
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.attachModelToDatePicker = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.formControl) {
            return;
        }
        this.datePicker.onViewDateChange(this.formControl.value);
        this.formControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== _this.datePicker.inputElementValue) {
                /** @type {?} */
                var strVal = _this.utilsService.convertToString(value, _this.datePicker.componentConfig.format);
                _this.datePicker.onViewDateChange(strVal);
            }
        }));
        /** @type {?} */
        var setup = true;
        this.datePicker.registerOnChange((/**
         * @param {?} value
         * @param {?} changedByInput
         * @return {?}
         */
        function (value, changedByInput) {
            if (value) {
                /** @type {?} */
                var isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                if (!isMultiselectEmpty && !changedByInput) {
                    _this.formControl.control.setValue(_this.datePicker.inputElementValue);
                }
            }
            /** @type {?} */
            var errors = _this.datePicker.validateFn(value);
            if (!setup) {
                _this.formControl.control.markAsDirty({
                    onlySelf: true
                });
            }
            else {
                setup = false;
            }
            if (errors) {
                if (errors.hasOwnProperty('format')) {
                    var given = errors['format'].given;
                    _this.datePicker.inputElementValue = given;
                    if (!changedByInput) {
                        _this.formControl.control.setValue(given);
                    }
                }
                _this.formControl.control.setErrors(errors);
            }
        }));
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.datePicker.onClick();
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.datePicker.inputFocused();
    };
    /**
     * @private
     * @return {?}
     */
    DatePickerDirective.prototype.updateDatepickerConfig = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        if (this.datePicker) {
            this.datePicker.cd.markForCheck();
        }
    };
    DatePickerDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'dpDayPicker',
                    providers: [DatePickerDirectiveService],
                    selector: '[dpDayPicker]'
                },] }
    ];
    /** @nocollapse */
    DatePickerDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: DatePickerDirectiveService },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: UtilsService }
    ]; };
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
    return DatePickerDirective;
}());
export { DatePickerDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUUzRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSXpDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQTtBQUduRTtJQTZJRSw2QkFBbUIsZ0JBQWtDLEVBQ2xDLE9BQW1CLEVBQ25CLHdCQUFrRCxFQUNsRCxPQUFtQyxFQUN2QixXQUFzQixFQUNsQyxZQUEwQjtRQUwxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxZQUFPLEdBQVAsT0FBTyxDQUE0QjtRQUN2QixnQkFBVyxHQUFYLFdBQVcsQ0FBVztRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXpJckMsVUFBSyxHQUFpQixLQUFLLENBQUM7UUF5SDFCLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2hDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2pDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUM3QyxrQkFBYSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FB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QUN2QixvQ0FBb0M7Ozs7O0lBQ3BDLHVDQUFzQzs7Ozs7SUFDdEMsdUNBQXNDOzs7OztJQUN0Qyx1Q0FBc0M7Ozs7O0lBQ3RDLHVDQUFzQzs7Ozs7SUFDdEMsMkNBQTBDOztJQW9IMUMsbUNBQTBDOztJQUMxQyxvQ0FBMkM7O0lBQzNDLHVDQUF1RDs7SUFDdkQsNENBQWlFOztJQUNqRSx3Q0FBa0U7O0lBQ2xFLHlDQUFtRTs7SUFDbkUsdUNBQXVFOztJQUV2RSx5Q0FBdUM7O0lBQ3ZDLGtDQUE0Qjs7SUFFaEIsK0NBQXlDOztJQUN6QyxzQ0FBMEI7O0lBQzFCLHVEQUF5RDs7SUFDekQsc0NBQTBDOztJQUMxQywwQ0FBeUM7O0lBQ3pDLDJDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2FsZW5kYXJNb2RlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItbW9kZSc7XG5pbXBvcnQge0lEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnfSBmcm9tICcuL2RhdGUtcGlja2VyLWRpcmVjdGl2ZS1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtEYXRlUGlja2VyRGlyZWN0aXZlU2VydmljZX0gZnJvbSAnLi9kYXRlLXBpY2tlci1kaXJlY3RpdmUuc2VydmljZSc7XG5pbXBvcnQge0lEcERheVBpY2tlckFwaX0gZnJvbSAnLi9kYXRlLXBpY2tlci5hcGknO1xuaW1wb3J0IHtEYXRlUGlja2VyQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvY2FsZW5kYXItdmFsdWUnO1xuaW1wb3J0IHtTaW5nbGVDYWxlbmRhclZhbHVlfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2luZ2xlLWNhbGVuZGFyLXZhbHVlJztcbmltcG9ydCB7SU5hdkV2ZW50fSBmcm9tICcuLi9jb21tb24vbW9kZWxzL25hdmlnYXRpb24tZXZlbnQubW9kZWwnO1xuaW1wb3J0IHtVdGlsc1NlcnZpY2V9IGZyb20gJy4uL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJ1xuaW1wb3J0IHtJU2VsZWN0aW9uRXZlbnR9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zZWxlY3Rpb24tZXZldC5tb2RlbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBleHBvcnRBczogJ2RwRGF5UGlja2VyJyxcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpY2tlckRpcmVjdGl2ZVNlcnZpY2VdLFxuICBzZWxlY3RvcjogJ1tkcERheVBpY2tlcl0nXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIF9jb25maWc6IElEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnO1xuICBwcml2YXRlIF9hdHRhY2hUbzogRWxlbWVudFJlZiB8IHN0cmluZztcbiAgcHJpdmF0ZSBfdGhlbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfbW9kZTogQ2FsZW5kYXJNb2RlID0gJ2RheSc7XG4gIHByaXZhdGUgX21pbkRhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIHByaXZhdGUgX21heERhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIHByaXZhdGUgX21pblRpbWU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIHByaXZhdGUgX21heFRpbWU6IFNpbmdsZUNhbGVuZGFyVmFsdWU7XG4gIHByaXZhdGUgX2Rpc3BsYXlEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlO1xuXG4gIGdldCBjb25maWcoKTogSURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICBASW5wdXQoJ2RwRGF5UGlja2VyJykgc2V0IGNvbmZpZyhjb25maWc6IElEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5zZXJ2aWNlLmdldENvbmZpZyhjb25maWcsIHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50LCB0aGlzLmF0dGFjaFRvKTtcbiAgICB0aGlzLnVwZGF0ZURhdGVwaWNrZXJDb25maWcoKTtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGF0dGFjaFRvKCk6IEVsZW1lbnRSZWYgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2hUbztcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBhdHRhY2hUbyhhdHRhY2hUbzogRWxlbWVudFJlZiB8IHN0cmluZykge1xuICAgIHRoaXMuX2F0dGFjaFRvID0gYXR0YWNoVG87XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5zZXJ2aWNlLmdldENvbmZpZyh0aGlzLmNvbmZpZywgdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQsIHRoaXMuYXR0YWNoVG8pO1xuICAgIHRoaXMudXBkYXRlRGF0ZXBpY2tlckNvbmZpZygpO1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdGhlbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGhlbWU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdGhlbWUodGhlbWU6IHN0cmluZykge1xuICAgIHRoaXMuX3RoZW1lID0gdGhlbWU7XG4gICAgaWYgKHRoaXMuZGF0ZVBpY2tlcikge1xuICAgICAgdGhpcy5kYXRlUGlja2VyLnRoZW1lID0gdGhlbWU7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBtb2RlKCk6IENhbGVuZGFyTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbW9kZShtb2RlOiBDYWxlbmRhck1vZGUpIHtcbiAgICB0aGlzLl9tb2RlID0gbW9kZTtcbiAgICBpZiAodGhpcy5kYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubW9kZSA9IG1vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtaW5EYXRlKG1pbkRhdGU6IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICB0aGlzLl9taW5EYXRlID0gbWluRGF0ZTtcbiAgICBpZiAodGhpcy5kYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubWluRGF0ZSA9IG1pbkRhdGU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IG1pbkRhdGUoKTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgbWF4RGF0ZShtYXhEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IG1heERhdGU7XG4gICAgaWYgKHRoaXMuZGF0ZVBpY2tlcikge1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm1heERhdGUgPSBtYXhEYXRlO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm5nT25Jbml0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBtYXhEYXRlKCk6IFNpbmdsZUNhbGVuZGFyVmFsdWUge1xuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IG1pblRpbWUobWluVGltZTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSkge1xuICAgIHRoaXMuX21pblRpbWUgPSBtaW5UaW1lO1xuICAgIGlmICh0aGlzLmRhdGVQaWNrZXIpIHtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5taW5UaW1lID0gbWluVGltZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5uZ09uSW5pdCgpO1xuICAgIH1cblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgbWluVGltZSgpOiBTaW5nbGVDYWxlbmRhclZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5fbWluVGltZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCBtYXhUaW1lKG1heFRpbWU6IFNpbmdsZUNhbGVuZGFyVmFsdWUpIHtcbiAgICB0aGlzLl9tYXhUaW1lID0gbWF4VGltZTtcbiAgICBpZiAodGhpcy5kYXRlUGlja2VyKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubWF4VGltZSA9IG1heFRpbWU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubmdPbkluaXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IG1heFRpbWUoKTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX21heFRpbWU7XG4gIH1cblxuICBnZXQgZGlzcGxheURhdGUoKTogU2luZ2xlQ2FsZW5kYXJWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlEYXRlO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IGRpc3BsYXlEYXRlKGRpc3BsYXlEYXRlOiBTaW5nbGVDYWxlbmRhclZhbHVlKSB7XG4gICAgdGhpcy5fZGlzcGxheURhdGUgPSBkaXNwbGF5RGF0ZTtcbiAgICB0aGlzLnVwZGF0ZURhdGVwaWNrZXJDb25maWcoKTtcblxuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyVmFsdWU+KCk7XG4gIEBPdXRwdXQoKSBvbkdvVG9DdXJyZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxlZnROYXY6IEV2ZW50RW1pdHRlcjxJTmF2RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25SaWdodE5hdjogRXZlbnRFbWl0dGVyPElOYXZFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPElTZWxlY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGRhdGVQaWNrZXI6IERhdGVQaWNrZXJDb21wb25lbnQ7XG4gIHB1YmxpYyBhcGk6IElEcERheVBpY2tlckFwaTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHVibGljIGVsZW1SZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHB1YmxpYyBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHVibGljIHNlcnZpY2U6IERhdGVQaWNrZXJEaXJlY3RpdmVTZXJ2aWNlLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwdWJsaWMgZm9ybUNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgICAgICAgcHVibGljIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIgPSB0aGlzLmNyZWF0ZURhdGVQaWNrZXIoKTtcbiAgICB0aGlzLmFwaSA9IHRoaXMuZGF0ZVBpY2tlci5hcGk7XG4gICAgdGhpcy51cGRhdGVEYXRlcGlja2VyQ29uZmlnKCk7XG4gICAgdGhpcy5hdHRhY2hNb2RlbFRvRGF0ZVBpY2tlcigpO1xuICAgIHRoaXMuZGF0ZVBpY2tlci50aGVtZSA9IHRoaXMudGhlbWU7XG4gIH1cblxuICBjcmVhdGVEYXRlUGlja2VyKCk6IERhdGVQaWNrZXJDb21wb25lbnQge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEYXRlUGlja2VyQ29tcG9uZW50KTtcbiAgICByZXR1cm4gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KS5pbnN0YW5jZTtcbiAgfVxuXG4gIGF0dGFjaE1vZGVsVG9EYXRlUGlja2VyKCkge1xuICAgIGlmICghdGhpcy5mb3JtQ29udHJvbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGF0ZVBpY2tlci5vblZpZXdEYXRlQ2hhbmdlKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUpO1xuXG4gICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmRhdGVQaWNrZXIuaW5wdXRFbGVtZW50VmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc3RyVmFsID0gdGhpcy51dGlsc1NlcnZpY2UuY29udmVydFRvU3RyaW5nKHZhbHVlLCB0aGlzLmRhdGVQaWNrZXIuY29tcG9uZW50Q29uZmlnLmZvcm1hdCk7XG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlci5vblZpZXdEYXRlQ2hhbmdlKHN0clZhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgc2V0dXAgPSB0cnVlO1xuXG4gICAgdGhpcy5kYXRlUGlja2VyLnJlZ2lzdGVyT25DaGFuZ2UoKHZhbHVlLCBjaGFuZ2VkQnlJbnB1dCkgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGlzTXVsdGlzZWxlY3RFbXB0eSA9IHNldHVwICYmIEFycmF5LmlzQXJyYXkodmFsdWUpICYmICF2YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFpc011bHRpc2VsZWN0RW1wdHkgJiYgIWNoYW5nZWRCeUlucHV0KSB7XG4gICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHRoaXMuZGF0ZVBpY2tlci5pbnB1dEVsZW1lbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZXJyb3JzID0gdGhpcy5kYXRlUGlja2VyLnZhbGlkYXRlRm4odmFsdWUpO1xuXG4gICAgICBpZiAoIXNldHVwKSB7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuY29udHJvbC5tYXJrQXNEaXJ0eSh7XG4gICAgICAgICAgb25seVNlbGY6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXR1cCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgIGlmIChlcnJvcnMuaGFzT3duUHJvcGVydHkoJ2Zvcm1hdCcpKSB7XG4gICAgICAgICAgY29uc3Qge2dpdmVufSA9IGVycm9yc1snZm9ybWF0J107XG4gICAgICAgICAgdGhpcy5kYXRlUGlja2VyLmlucHV0RWxlbWVudFZhbHVlID0gZ2l2ZW47XG4gICAgICAgICAgaWYgKCFjaGFuZ2VkQnlJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5jb250cm9sLnNldFZhbHVlKGdpdmVuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLmNvbnRyb2wuc2V0RXJyb3JzKGVycm9ycyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5kYXRlUGlja2VyLm9uQ2xpY2soKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgb25Gb2N1cygpIHtcbiAgICB0aGlzLmRhdGVQaWNrZXIuaW5wdXRGb2N1c2VkKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURhdGVwaWNrZXJDb25maWcoKSB7XG4gICAgaWYgKHRoaXMuZGF0ZVBpY2tlcikge1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm1pbkRhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubWF4RGF0ZSA9IHRoaXMubWF4RGF0ZTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5taW5UaW1lID0gdGhpcy5taW5UaW1lO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm1heFRpbWUgPSB0aGlzLm1heFRpbWU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIubW9kZSA9IHRoaXMubW9kZSB8fCAnZGF5JztcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5kaXNwbGF5RGF0ZSA9IHRoaXMuZGlzcGxheURhdGU7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIub3BlbiA9IHRoaXMub3BlbjtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5jbG9zZSA9IHRoaXMuY2xvc2U7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlO1xuICAgICAgdGhpcy5kYXRlUGlja2VyLm9uR29Ub0N1cnJlbnQgPSB0aGlzLm9uR29Ub0N1cnJlbnQ7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIub25MZWZ0TmF2ID0gdGhpcy5vbkxlZnROYXY7XG4gICAgICB0aGlzLmRhdGVQaWNrZXIub25SaWdodE5hdiA9IHRoaXMub25SaWdodE5hdjtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5vblNlbGVjdCA9IHRoaXMub25TZWxlY3Q7XG5cbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5pbml0KCk7XG5cbiAgICAgIGlmICh0aGlzLmRhdGVQaWNrZXIuY29tcG9uZW50Q29uZmlnLmRpc2FibGVLZXlwcmVzcykge1xuICAgICAgICB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWFya0ZvckNoZWNrKCkge1xuICAgIGlmICh0aGlzLmRhdGVQaWNrZXIpIHtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlci5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==