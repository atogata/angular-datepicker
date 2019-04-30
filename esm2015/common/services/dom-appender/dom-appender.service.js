/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class DomHelper {
    /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} drops
     * @return {?}
     */
    static setYAxisPosition(element, container, anchor, drops) {
        /** @type {?} */
        const anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        const containerRect = container.getBoundingClientRect();
        /** @type {?} */
        const bottom = anchorRect.bottom - containerRect.top;
        /** @type {?} */
        const top = anchorRect.top - containerRect.top;
        if (drops === 'down') {
            element.style.top = (bottom + 1 + 'px');
        }
        else {
            element.style.top = (top - 1 - element.scrollHeight) + 'px';
        }
    }
    /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} dimElem
     * @param {?} opens
     * @return {?}
     */
    static setXAxisPosition(element, container, anchor, dimElem, opens) {
        /** @type {?} */
        const anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        const containerRect = container.getBoundingClientRect();
        /** @type {?} */
        const left = anchorRect.left - containerRect.left;
        if (opens === 'right') {
            element.style.left = left + 'px';
        }
        else {
            element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
        }
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isTopInView(el) {
        const { top } = el.getBoundingClientRect();
        return (top >= 0);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isBottomInView(el) {
        const { bottom } = el.getBoundingClientRect();
        return (bottom <= window.innerHeight);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isLeftInView(el) {
        const { left } = el.getBoundingClientRect();
        return (left >= 0);
    }
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    static isRightInView(el) {
        const { right } = el.getBoundingClientRect();
        return (right <= window.innerWidth);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    appendElementToPosition(config) {
        const { container, element } = config;
        if (!container.style.position || container.style.position === 'static') {
            container.style.position = 'relative';
        }
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
        }
        element.style.visibility = 'hidden';
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.setElementPosition(config);
            element.style.visibility = 'visible';
        }));
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    setElementPosition({ element, container, anchor, dimElem, drops, opens }) {
        DomHelper.setYAxisPosition(element, container, anchor, 'down');
        DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
        if (drops !== 'down' && drops !== 'up') {
            if (DomHelper.isBottomInView(dimElem)) {
                DomHelper.setYAxisPosition(element, container, anchor, 'down');
            }
            else if (DomHelper.isTopInView(dimElem)) {
                DomHelper.setYAxisPosition(element, container, anchor, 'up');
            }
        }
        else {
            DomHelper.setYAxisPosition(element, container, anchor, drops);
        }
        if (opens !== 'left' && opens !== 'right') {
            if (DomHelper.isRightInView(dimElem)) {
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
            }
            else if (DomHelper.isLeftInView(dimElem)) {
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'left');
            }
        }
        else {
            DomHelper.setXAxisPosition(element, container, anchor, dimElem, opens);
        }
    }
}
DomHelper.decorators = [
    { type: Injectable }
];
/**
 * @record
 */
export function IAppendToArgs() { }
if (false) {
    /** @type {?} */
    IAppendToArgs.prototype.container;
    /** @type {?} */
    IAppendToArgs.prototype.element;
    /** @type {?} */
    IAppendToArgs.prototype.anchor;
    /** @type {?} */
    IAppendToArgs.prototype.dimElem;
    /** @type {?} */
    IAppendToArgs.prototype.drops;
    /** @type {?} */
    IAppendToArgs.prototype.opens;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWFwcGVuZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJjb21tb24vc2VydmljZXMvZG9tLWFwcGVuZGVyL2RvbS1hcHBlbmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXpDLE1BQU0sT0FBTyxTQUFTOzs7Ozs7Ozs7SUFFWixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBb0IsRUFBRSxTQUFzQixFQUFFLE1BQW1CLEVBQUUsS0FBYTs7Y0FDeEcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTs7Y0FDM0MsYUFBYSxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRTs7Y0FDakQsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUc7O2NBQzlDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHO1FBRTlDLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzdEO0lBQ0gsQ0FBQzs7Ozs7Ozs7OztJQUVPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLFNBQXNCLEVBQUUsTUFBbUIsRUFBRSxPQUFvQixFQUFFLEtBQWE7O2NBQzlILFVBQVUsR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUU7O2NBQzNDLGFBQWEsR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUU7O2NBQ2pELElBQUksR0FB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LE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlEO1NBQ0Y7YUFBTTtZQUNMLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksS0FBSyxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQ3pDLElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDcEMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUMxRTtpQkFBTSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDekU7U0FDRjthQUFNO1lBQ0wsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7OztZQTNGRixVQUFVOzs7OztBQThGWCxtQ0FPQzs7O0lBTkMsa0NBQXVCOztJQUN2QixnQ0FBcUI7O0lBQ3JCLCtCQUFvQjs7SUFDcEIsZ0NBQXFCOztJQUNyQiw4QkFBYzs7SUFDZCw4QkFBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1REcm9wcywgVE9wZW5zfSBmcm9tICcuLi8uLi90eXBlcy9wb2lzdGlvbnMudHlwZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21IZWxwZXIge1xuXG4gIHByaXZhdGUgc3RhdGljIHNldFlBeGlzUG9zaXRpb24oZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGFuY2hvcjogSFRNTEVsZW1lbnQsIGRyb3BzOiBURHJvcHMpIHtcbiAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgYm90dG9tID0gYW5jaG9yUmVjdC5ib3R0b20gLSBjb250YWluZXJSZWN0LnRvcDtcbiAgICBjb25zdCB0b3AgPSBhbmNob3JSZWN0LnRvcCAtIGNvbnRhaW5lclJlY3QudG9wO1xuXG4gICAgaWYgKGRyb3BzID09PSAnZG93bicpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gKGJvdHRvbSArIDEgKyAncHgnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAodG9wIC0gMSAtIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSArICdweCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0WEF4aXNQb3NpdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29udGFpbmVyOiBIVE1MRWxlbWVudCwgYW5jaG9yOiBIVE1MRWxlbWVudCwgZGltRWxlbTogSFRNTEVsZW1lbnQsIG9wZW5zOiBUT3BlbnMpIHtcbiAgICBjb25zdCBhbmNob3JSZWN0ID0gYW5jaG9yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgbGVmdCA9IGFuY2hvclJlY3QubGVmdCAtIGNvbnRhaW5lclJlY3QubGVmdDtcblxuICAgIGlmIChvcGVucyA9PT0gJ3JpZ2h0Jykge1xuICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgLSBkaW1FbGVtLm9mZnNldFdpZHRoICsgYW5jaG9yLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc1RvcEluVmlldyhlbDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICBjb25zdCB7dG9wfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAodG9wID49IDApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNCb3R0b21JblZpZXcoZWw6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qge2JvdHRvbX0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKGJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNMZWZ0SW5WaWV3KGVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHtsZWZ0fSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAobGVmdCA+PSAwKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzUmlnaHRJblZpZXcoZWw6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qge3JpZ2h0fSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAocmlnaHQgPD0gd2luZG93LmlubmVyV2lkdGgpO1xuICB9XG5cbiAgYXBwZW5kRWxlbWVudFRvUG9zaXRpb24oY29uZmlnOiBJQXBwZW5kVG9BcmdzKTogdm9pZCB7XG4gICAgY29uc3Qge2NvbnRhaW5lciwgZWxlbWVudH0gPSBjb25maWc7XG5cbiAgICBpZiAoIWNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiB8fCBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50LnN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRFbGVtZW50UG9zaXRpb24oY29uZmlnKTtcblxuICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RWxlbWVudFBvc2l0aW9uKHtlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgZGltRWxlbSwgZHJvcHMsIG9wZW5zfTogSUFwcGVuZFRvQXJncykge1xuICAgIERvbUhlbHBlci5zZXRZQXhpc1Bvc2l0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgYW5jaG9yLCAnZG93bicpO1xuICAgIERvbUhlbHBlci5zZXRYQXhpc1Bvc2l0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgYW5jaG9yLCBkaW1FbGVtLCAncmlnaHQnKTtcblxuICAgIGlmIChkcm9wcyAhPT0gJ2Rvd24nICYmIGRyb3BzICE9PSAndXAnKSB7XG4gICAgICBpZiAoRG9tSGVscGVyLmlzQm90dG9tSW5WaWV3KGRpbUVsZW0pKSB7XG4gICAgICAgIERvbUhlbHBlci5zZXRZQXhpc1Bvc2l0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgYW5jaG9yLCAnZG93bicpO1xuICAgICAgfSBlbHNlIGlmIChEb21IZWxwZXIuaXNUb3BJblZpZXcoZGltRWxlbSkpIHtcbiAgICAgICAgRG9tSGVscGVyLnNldFlBeGlzUG9zaXRpb24oZWxlbWVudCwgY29udGFpbmVyLCBhbmNob3IsICd1cCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBEb21IZWxwZXIuc2V0WUF4aXNQb3NpdGlvbihlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgZHJvcHMpO1xuICAgIH1cblxuICAgIGlmIChvcGVucyAhPT0gJ2xlZnQnICYmIG9wZW5zICE9PSAncmlnaHQnKSB7XG4gICAgICBpZiAoRG9tSGVscGVyLmlzUmlnaHRJblZpZXcoZGltRWxlbSkpIHtcbiAgICAgICAgRG9tSGVscGVyLnNldFhBeGlzUG9zaXRpb24oZWxlbWVudCwgY29udGFpbmVyLCBhbmNob3IsIGRpbUVsZW0sICdyaWdodCcpO1xuICAgICAgfSBlbHNlIGlmIChEb21IZWxwZXIuaXNMZWZ0SW5WaWV3KGRpbUVsZW0pKSB7XG4gICAgICAgIERvbUhlbHBlci5zZXRYQXhpc1Bvc2l0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgYW5jaG9yLCBkaW1FbGVtLCAnbGVmdCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBEb21IZWxwZXIuc2V0WEF4aXNQb3NpdGlvbihlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgZGltRWxlbSwgb3BlbnMpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBcHBlbmRUb0FyZ3Mge1xuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgYW5jaG9yOiBIVE1MRWxlbWVudDtcbiAgZGltRWxlbTogSFRNTEVsZW1lbnQ7XG4gIGRyb3BzOiBURHJvcHM7XG4gIG9wZW5zOiBUT3BlbnM7XG59XG4iXX0=