/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var DomHelper = /** @class */ (function () {
    function DomHelper() {
    }
    /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} drops
     * @return {?}
     */
    DomHelper.setYAxisPosition = /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} drops
     * @return {?}
     */
    function (element, container, anchor, drops) {
        /** @type {?} */
        var anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        var containerRect = container.getBoundingClientRect();
        /** @type {?} */
        var bottom = anchorRect.bottom - containerRect.top;
        /** @type {?} */
        var top = anchorRect.top - containerRect.top;
        if (drops === 'down') {
            element.style.top = (bottom + 1 + 'px');
        }
        else {
            element.style.top = (top - 1 - element.scrollHeight) + 'px';
        }
    };
    /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} dimElem
     * @param {?} opens
     * @return {?}
     */
    DomHelper.setXAxisPosition = /**
     * @private
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} dimElem
     * @param {?} opens
     * @return {?}
     */
    function (element, container, anchor, dimElem, opens) {
        /** @type {?} */
        var anchorRect = anchor.getBoundingClientRect();
        /** @type {?} */
        var containerRect = container.getBoundingClientRect();
        /** @type {?} */
        var left = anchorRect.left - containerRect.left;
        if (opens === 'right') {
            element.style.left = left + 'px';
        }
        else {
            element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
        }
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DomHelper.isTopInView = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var top = el.getBoundingClientRect().top;
        return (top >= 0);
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DomHelper.isBottomInView = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var bottom = el.getBoundingClientRect().bottom;
        return (bottom <= window.innerHeight);
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DomHelper.isLeftInView = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var left = el.getBoundingClientRect().left;
        return (left >= 0);
    };
    /**
     * @private
     * @param {?} el
     * @return {?}
     */
    DomHelper.isRightInView = /**
     * @private
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var right = el.getBoundingClientRect().right;
        return (right <= window.innerWidth);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DomHelper.prototype.appendElementToPosition = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        var container = config.container, element = config.element;
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
        function () {
            _this.setElementPosition(config);
            element.style.visibility = 'visible';
        }));
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DomHelper.prototype.setElementPosition = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var element = _a.element, container = _a.container, anchor = _a.anchor, dimElem = _a.dimElem, drops = _a.drops, opens = _a.opens;
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
    };
    DomHelper.decorators = [
        { type: Injectable }
    ];
    return DomHelper;
}());
export { DomHelper };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLWFwcGVuZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJjb21tb24vc2VydmljZXMvZG9tLWFwcGVuZGVyL2RvbS1hcHBlbmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDO0lBQUE7SUE0RkEsQ0FBQzs7Ozs7Ozs7O0lBekZnQiwwQkFBZ0I7Ozs7Ozs7O0lBQS9CLFVBQWdDLE9BQW9CLEVBQUUsU0FBc0IsRUFBRSxNQUFtQixFQUFFLEtBQWE7O1lBQ3hHLFVBQVUsR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUU7O1lBQzNDLGFBQWEsR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUU7O1lBQ2pELE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHOztZQUM5QyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRztRQUU5QyxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7WUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztTQUM3RDtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFFYywwQkFBZ0I7Ozs7Ozs7OztJQUEvQixVQUFnQyxPQUFvQixFQUFFLFNBQXNCLEVBQUUsTUFBbUIsRUFBRSxPQUFvQixFQUFFLEtBQWE7O1lBQzlILFVBQVUsR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUU7O1lBQzNDLGFBQWEsR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUU7O1lB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QU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDekMsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNwQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzFFO2lCQUFNLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6RTtTQUNGO2FBQU07WUFDTCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7Z0JBM0ZGLFVBQVU7O0lBNEZYLGdCQUFDO0NBQUEsQUE1RkQsSUE0RkM7U0EzRlksU0FBUzs7OztBQTZGdEIsbUNBT0M7OztJQU5DLGtDQUF1Qjs7SUFDdkIsZ0NBQXFCOztJQUNyQiwrQkFBb0I7O0lBQ3BCLGdDQUFxQjs7SUFDckIsOEJBQWM7O0lBQ2QsOEJBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtURHJvcHMsIFRPcGVuc30gZnJvbSAnLi4vLi4vdHlwZXMvcG9pc3Rpb25zLnR5cGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tSGVscGVyIHtcblxuICBwcml2YXRlIHN0YXRpYyBzZXRZQXhpc1Bvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb250YWluZXI6IEhUTUxFbGVtZW50LCBhbmNob3I6IEhUTUxFbGVtZW50LCBkcm9wczogVERyb3BzKSB7XG4gICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGJvdHRvbSA9IGFuY2hvclJlY3QuYm90dG9tIC0gY29udGFpbmVyUmVjdC50b3A7XG4gICAgY29uc3QgdG9wID0gYW5jaG9yUmVjdC50b3AgLSBjb250YWluZXJSZWN0LnRvcDtcblxuICAgIGlmIChkcm9wcyA9PT0gJ2Rvd24nKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IChib3R0b20gKyAxICsgJ3B4Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gKHRvcCAtIDEgLSBlbGVtZW50LnNjcm9sbEhlaWdodCkgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHNldFhBeGlzUG9zaXRpb24oZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIGFuY2hvcjogSFRNTEVsZW1lbnQsIGRpbUVsZW06IEhUTUxFbGVtZW50LCBvcGVuczogVE9wZW5zKSB7XG4gICAgY29uc3QgYW5jaG9yUmVjdCA9IGFuY2hvci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGxlZnQgPSBhbmNob3JSZWN0LmxlZnQgLSBjb250YWluZXJSZWN0LmxlZnQ7XG5cbiAgICBpZiAob3BlbnMgPT09ICdyaWdodCcpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0IC0gZGltRWxlbS5vZmZzZXRXaWR0aCArIGFuY2hvci5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNUb3BJblZpZXcoZWw6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3Qge3RvcH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKHRvcCA+PSAwKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzQm90dG9tSW5WaWV3KGVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHtib3R0b219ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIChib3R0b20gPD0gd2luZG93LmlubmVySGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGlzTGVmdEluVmlldyhlbDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICBjb25zdCB7bGVmdH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKGxlZnQgPj0gMCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc1JpZ2h0SW5WaWV3KGVsOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHtyaWdodH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKHJpZ2h0IDw9IHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgfVxuXG4gIGFwcGVuZEVsZW1lbnRUb1Bvc2l0aW9uKGNvbmZpZzogSUFwcGVuZFRvQXJncyk6IHZvaWQge1xuICAgIGNvbnN0IHtjb250YWluZXIsIGVsZW1lbnR9ID0gY29uZmlnO1xuXG4gICAgaWYgKCFjb250YWluZXIuc3R5bGUucG9zaXRpb24gfHwgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5zdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJykge1xuICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0RWxlbWVudFBvc2l0aW9uKGNvbmZpZyk7XG5cbiAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9KTtcbiAgfVxuXG4gIHNldEVsZW1lbnRQb3NpdGlvbih7ZWxlbWVudCwgY29udGFpbmVyLCBhbmNob3IsIGRpbUVsZW0sIGRyb3BzLCBvcGVuc306IElBcHBlbmRUb0FyZ3MpIHtcbiAgICBEb21IZWxwZXIuc2V0WUF4aXNQb3NpdGlvbihlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgJ2Rvd24nKTtcbiAgICBEb21IZWxwZXIuc2V0WEF4aXNQb3NpdGlvbihlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgZGltRWxlbSwgJ3JpZ2h0Jyk7XG5cbiAgICBpZiAoZHJvcHMgIT09ICdkb3duJyAmJiBkcm9wcyAhPT0gJ3VwJykge1xuICAgICAgaWYgKERvbUhlbHBlci5pc0JvdHRvbUluVmlldyhkaW1FbGVtKSkge1xuICAgICAgICBEb21IZWxwZXIuc2V0WUF4aXNQb3NpdGlvbihlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgJ2Rvd24nKTtcbiAgICAgIH0gZWxzZSBpZiAoRG9tSGVscGVyLmlzVG9wSW5WaWV3KGRpbUVsZW0pKSB7XG4gICAgICAgIERvbUhlbHBlci5zZXRZQXhpc1Bvc2l0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgYW5jaG9yLCAndXAnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRG9tSGVscGVyLnNldFlBeGlzUG9zaXRpb24oZWxlbWVudCwgY29udGFpbmVyLCBhbmNob3IsIGRyb3BzKTtcbiAgICB9XG5cbiAgICBpZiAob3BlbnMgIT09ICdsZWZ0JyAmJiBvcGVucyAhPT0gJ3JpZ2h0Jykge1xuICAgICAgaWYgKERvbUhlbHBlci5pc1JpZ2h0SW5WaWV3KGRpbUVsZW0pKSB7XG4gICAgICAgIERvbUhlbHBlci5zZXRYQXhpc1Bvc2l0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgYW5jaG9yLCBkaW1FbGVtLCAncmlnaHQnKTtcbiAgICAgIH0gZWxzZSBpZiAoRG9tSGVscGVyLmlzTGVmdEluVmlldyhkaW1FbGVtKSkge1xuICAgICAgICBEb21IZWxwZXIuc2V0WEF4aXNQb3NpdGlvbihlbGVtZW50LCBjb250YWluZXIsIGFuY2hvciwgZGltRWxlbSwgJ2xlZnQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRG9tSGVscGVyLnNldFhBeGlzUG9zaXRpb24oZWxlbWVudCwgY29udGFpbmVyLCBhbmNob3IsIGRpbUVsZW0sIG9wZW5zKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQXBwZW5kVG9BcmdzIHtcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGFuY2hvcjogSFRNTEVsZW1lbnQ7XG4gIGRpbUVsZW06IEhUTUxFbGVtZW50O1xuICBkcm9wczogVERyb3BzO1xuICBvcGVuczogVE9wZW5zO1xufVxuIl19