/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { UtilsService } from '../common/services/utils/utils.service';
import { Injectable } from '@angular/core';
var DatePickerDirectiveService = /** @class */ (function () {
    function DatePickerDirectiveService(utilsService) {
        this.utilsService = utilsService;
    }
    /**
     * @param {?} attachTo
     * @param {?} baseElement
     * @return {?}
     */
    DatePickerDirectiveService.prototype.convertToHTMLElement = /**
     * @param {?} attachTo
     * @param {?} baseElement
     * @return {?}
     */
    function (attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    };
    /**
     * @param {?=} config
     * @param {?=} baseElement
     * @param {?=} attachTo
     * @return {?}
     */
    DatePickerDirectiveService.prototype.getConfig = /**
     * @param {?=} config
     * @param {?=} baseElement
     * @param {?=} attachTo
     * @return {?}
     */
    function (config, baseElement, attachTo) {
        if (config === void 0) { config = {}; }
        /** @type {?} */
        var _config = tslib_1.__assign({}, config);
        _config.hideInputContainer = true;
        /** @type {?} */
        var native;
        if (config.inputElementContainer) {
            native = this.utilsService.getNativeElement(config.inputElementContainer);
        }
        else {
            native = baseElement ? baseElement.nativeElement : null;
        }
        if (native) {
            _config.inputElementContainer = attachTo
                ? this.convertToHTMLElement(attachTo, native)
                : native;
        }
        return _config;
    };
    DatePickerDirectiveService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DatePickerDirectiveService.ctorParameters = function () { return [
        { type: UtilsService }
    ]; };
    return DatePickerDirectiveService;
}());
export { DatePickerDirectiveService };
if (false) {
    /** @type {?} */
    DatePickerDirectiveService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXItZGlyZWN0aXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci9kYXRlLXBpY2tlci1kaXJlY3RpdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUVwRSxPQUFPLEVBQWEsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXJEO0lBRUUsb0NBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzdDLENBQUM7Ozs7OztJQUVELHlEQUFvQjs7Ozs7SUFBcEIsVUFBcUIsUUFBNkIsRUFBRSxXQUF3QjtRQUMxRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksUUFBUSxFQUFFO1lBQ25CLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUMvQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Ozs7Ozs7SUFFRCw4Q0FBUzs7Ozs7O0lBQVQsVUFBVSxNQUF1QyxFQUN2QyxXQUF3QixFQUN4QixRQUE4QjtRQUY5Qix1QkFBQSxFQUFBLFdBQXVDOztZQUd6QyxPQUFPLHdCQUFtQyxNQUFNLENBQUM7UUFDdkQsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzs7WUFFOUIsTUFBTTtRQUVWLElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQ2hDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzNFO2FBQU07WUFDTCxNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDekQ7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxRQUFRO2dCQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDWjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXBDRixVQUFVOzs7O2dCQUpILFlBQVk7O0lBeUNwQixpQ0FBQztDQUFBLEFBckNELElBcUNDO1NBcENZLDBCQUEwQjs7O0lBQ3pCLGtEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0lEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnfSBmcm9tICcuL2RhdGUtcGlja2VyLWRpcmVjdGl2ZS1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtFbGVtZW50UmVmLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJEaXJlY3RpdmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XG4gIH1cblxuICBjb252ZXJ0VG9IVE1MRWxlbWVudChhdHRhY2hUbzogRWxlbWVudFJlZiB8IHN0cmluZywgYmFzZUVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGlmICh0eXBlb2YgYXR0YWNoVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY2xvc2VzdFBhcmVudChiYXNlRWxlbWVudCwgYXR0YWNoVG8pO1xuICAgIH0gZWxzZSBpZiAoYXR0YWNoVG8pIHtcbiAgICAgIHJldHVybiBhdHRhY2hUby5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXRDb25maWcoY29uZmlnOiBJRGF0ZVBpY2tlckRpcmVjdGl2ZUNvbmZpZyA9IHt9LFxuICAgICAgICAgICAgYmFzZUVsZW1lbnQ/OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgYXR0YWNoVG8/OiBFbGVtZW50UmVmIHwgc3RyaW5nKTogSURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWcge1xuICAgIGNvbnN0IF9jb25maWc6IElEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnID0gey4uLmNvbmZpZ307XG4gICAgX2NvbmZpZy5oaWRlSW5wdXRDb250YWluZXIgPSB0cnVlO1xuXG4gICAgbGV0IG5hdGl2ZTtcblxuICAgIGlmIChjb25maWcuaW5wdXRFbGVtZW50Q29udGFpbmVyKSB7XG4gICAgICBuYXRpdmUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXROYXRpdmVFbGVtZW50KGNvbmZpZy5pbnB1dEVsZW1lbnRDb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYXRpdmUgPSBiYXNlRWxlbWVudCA/IGJhc2VFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChuYXRpdmUpIHtcbiAgICAgIF9jb25maWcuaW5wdXRFbGVtZW50Q29udGFpbmVyID0gYXR0YWNoVG9cbiAgICAgICAgPyB0aGlzLmNvbnZlcnRUb0hUTUxFbGVtZW50KGF0dGFjaFRvLCBuYXRpdmUpXG4gICAgICAgIDogbmF0aXZlO1xuICAgIH1cblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG59XG4iXX0=