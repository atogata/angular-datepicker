/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { UtilsService } from '../common/services/utils/utils.service';
import { Injectable } from '@angular/core';
export class DatePickerDirectiveService {
    /**
     * @param {?} utilsService
     */
    constructor(utilsService) {
        this.utilsService = utilsService;
    }
    /**
     * @param {?} attachTo
     * @param {?} baseElement
     * @return {?}
     */
    convertToHTMLElement(attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    }
    /**
     * @param {?=} config
     * @param {?=} baseElement
     * @param {?=} attachTo
     * @return {?}
     */
    getConfig(config = {}, baseElement, attachTo) {
        /** @type {?} */
        const _config = Object.assign({}, config);
        _config.hideInputContainer = true;
        /** @type {?} */
        let native;
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
    }
}
DatePickerDirectiveService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatePickerDirectiveService.ctorParameters = () => [
    { type: UtilsService }
];
if (false) {
    /** @type {?} */
    DatePickerDirectiveService.prototype.utilsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXItZGlyZWN0aXZlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci9kYXRlLXBpY2tlci1kaXJlY3RpdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBRXBFLE9BQU8sRUFBYSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHckQsTUFBTSxPQUFPLDBCQUEwQjs7OztJQUNyQyxZQUFtQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUM3QyxDQUFDOzs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxRQUE2QixFQUFFLFdBQXdCO1FBQzFFLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDO1NBQy9CO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7OztJQUVELFNBQVMsQ0FBQyxTQUFxQyxFQUFFLEVBQ3ZDLFdBQXdCLEVBQ3hCLFFBQThCOztjQUNoQyxPQUFPLHFCQUFtQyxNQUFNLENBQUM7UUFDdkQsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzs7WUFFOUIsTUFBTTtRQUVWLElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO1lBQ2hDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQzNFO2FBQU07WUFDTCxNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDekQ7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxRQUFRO2dCQUN0QyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDWjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7OztZQXBDRixVQUFVOzs7O1lBSkgsWUFBWTs7OztJQU1OLGtEQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvdXRpbHMvdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge0lEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnfSBmcm9tICcuL2RhdGUtcGlja2VyLWRpcmVjdGl2ZS1jb25maWcubW9kZWwnO1xuaW1wb3J0IHtFbGVtZW50UmVmLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJEaXJlY3RpdmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlKSB7XG4gIH1cblxuICBjb252ZXJ0VG9IVE1MRWxlbWVudChhdHRhY2hUbzogRWxlbWVudFJlZiB8IHN0cmluZywgYmFzZUVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGlmICh0eXBlb2YgYXR0YWNoVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy51dGlsc1NlcnZpY2UuY2xvc2VzdFBhcmVudChiYXNlRWxlbWVudCwgYXR0YWNoVG8pO1xuICAgIH0gZWxzZSBpZiAoYXR0YWNoVG8pIHtcbiAgICAgIHJldHVybiBhdHRhY2hUby5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXRDb25maWcoY29uZmlnOiBJRGF0ZVBpY2tlckRpcmVjdGl2ZUNvbmZpZyA9IHt9LFxuICAgICAgICAgICAgYmFzZUVsZW1lbnQ/OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgYXR0YWNoVG8/OiBFbGVtZW50UmVmIHwgc3RyaW5nKTogSURhdGVQaWNrZXJEaXJlY3RpdmVDb25maWcge1xuICAgIGNvbnN0IF9jb25maWc6IElEYXRlUGlja2VyRGlyZWN0aXZlQ29uZmlnID0gey4uLmNvbmZpZ307XG4gICAgX2NvbmZpZy5oaWRlSW5wdXRDb250YWluZXIgPSB0cnVlO1xuXG4gICAgbGV0IG5hdGl2ZTtcblxuICAgIGlmIChjb25maWcuaW5wdXRFbGVtZW50Q29udGFpbmVyKSB7XG4gICAgICBuYXRpdmUgPSB0aGlzLnV0aWxzU2VydmljZS5nZXROYXRpdmVFbGVtZW50KGNvbmZpZy5pbnB1dEVsZW1lbnRDb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYXRpdmUgPSBiYXNlRWxlbWVudCA/IGJhc2VFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChuYXRpdmUpIHtcbiAgICAgIF9jb25maWcuaW5wdXRFbGVtZW50Q29udGFpbmVyID0gYXR0YWNoVG9cbiAgICAgICAgPyB0aGlzLmNvbnZlcnRUb0hUTUxFbGVtZW50KGF0dGFjaFRvLCBuYXRpdmUpXG4gICAgICAgIDogbmF0aXZlO1xuICAgIH1cblxuICAgIHJldHVybiBfY29uZmlnO1xuICB9XG59XG4iXX0=