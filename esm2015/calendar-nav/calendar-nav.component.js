/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
export class CalendarNavComponent {
    constructor() {
        this.isLabelClickable = false;
        this.showLeftNav = true;
        this.showLeftSecondaryNav = false;
        this.showRightNav = true;
        this.showRightSecondaryNav = false;
        this.leftNavDisabled = false;
        this.leftSecondaryNavDisabled = false;
        this.rightNavDisabled = false;
        this.rightSecondaryNavDisabled = false;
        this.showGoToCurrent = true;
        this.onLeftNav = new EventEmitter();
        this.onLeftSecondaryNav = new EventEmitter();
        this.onRightNav = new EventEmitter();
        this.onRightSecondaryNav = new EventEmitter();
        this.onLabelClick = new EventEmitter();
        this.onGoToCurrent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    leftNavClicked() {
        this.onLeftNav.emit();
    }
    /**
     * @return {?}
     */
    leftSecondaryNavClicked() {
        this.onLeftSecondaryNav.emit();
    }
    /**
     * @return {?}
     */
    rightNavClicked() {
        this.onRightNav.emit();
    }
    /**
     * @return {?}
     */
    rightSecondaryNavClicked() {
        this.onRightSecondaryNav.emit();
    }
    /**
     * @return {?}
     */
    labelClicked() {
        this.onLabelClick.emit();
    }
}
CalendarNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'dp-calendar-nav',
                template: "<div class=\"dp-calendar-nav-container\">\n  <div class=\"dp-nav-header\">\n    <span [hidden]=\"isLabelClickable\"\n          [attr.data-hidden]=\"isLabelClickable\"\n          [innerText]=\"label\">\n    </span>\n    <button type=\"button\"\n            class=\"dp-nav-header-btn\"\n            [hidden]=\"!isLabelClickable\"\n            [attr.data-hidden]=\"!isLabelClickable\"\n            (click)=\"labelClicked()\"\n            [innerText]=\"label\">\n    </button>\n  </div>\n\n  <div class=\"dp-nav-btns-container\">\n    <div class=\"dp-calendar-nav-container-left\">\n      <button type=\"button\"\n              class=\"dp-calendar-secondary-nav-left\"\n              *ngIf=\"showLeftSecondaryNav\"\n              [disabled]=\"leftSecondaryNavDisabled\"\n              (click)=\"leftSecondaryNavClicked()\">\n      </button>\n      <button type=\"button\"\n              class=\"dp-calendar-nav-left\"\n              [hidden]=\"!showLeftNav\"\n              [attr.data-hidden]=\"!showLeftNav\"\n              [disabled]=\"leftNavDisabled\"\n              (click)=\"leftNavClicked()\">\n      </button>\n    </div>\n    <button type=\"button\"\n            class=\"dp-current-location-btn\"\n            *ngIf=\"showGoToCurrent\"\n            (click)=\"onGoToCurrent.emit()\">\n    </button>\n    <div class=\"dp-calendar-nav-container-right\">\n      <button type=\"button\"\n              class=\"dp-calendar-nav-right\"\n              [hidden]=\"!showRightNav\"\n              [attr.data-hidden]=\"!showRightNav\"\n              [disabled]=\"rightNavDisabled\"\n              (click)=\"rightNavClicked()\">\n      </button>\n      <button type=\"button\"\n              class=\"dp-calendar-secondary-nav-right\"\n              *ngIf=\"showRightSecondaryNav\"\n              [disabled]=\"rightSecondaryNavDisabled\"\n              (click)=\"rightSecondaryNavClicked()\">\n      </button>\n    </div>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["dp-calendar-nav .dp-calendar-nav-container{position:relative;box-sizing:border-box;height:25px;border:1px solid #000;border-bottom:none}dp-calendar-nav .dp-nav-date-btn{box-sizing:border-box;height:25px;border:1px solid #000;border-bottom:none}dp-calendar-nav .dp-nav-btns-container{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:5px;display:inline-block}dp-calendar-nav .dp-calendar-nav-container-left,dp-calendar-nav .dp-calendar-nav-container-right{display:inline-block}dp-calendar-nav .dp-calendar-nav-left,dp-calendar-nav .dp-calendar-nav-right,dp-calendar-nav .dp-calendar-secondary-nav-left,dp-calendar-nav .dp-calendar-secondary-nav-right{position:relative;width:16px;cursor:pointer}dp-calendar-nav .dp-calendar-nav-left,dp-calendar-nav .dp-calendar-nav-right{line-height:0}dp-calendar-nav .dp-calendar-nav-left::before,dp-calendar-nav .dp-calendar-nav-right::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}dp-calendar-nav .dp-calendar-secondary-nav-left,dp-calendar-nav .dp-calendar-secondary-nav-right{padding:0}dp-calendar-nav .dp-calendar-secondary-nav-left::after,dp-calendar-nav .dp-calendar-secondary-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-right::after,dp-calendar-nav .dp-calendar-secondary-nav-right::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(45deg);transform:rotate(45deg)}dp-calendar-nav .dp-calendar-secondary-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-right::before{right:-10px}dp-calendar-nav .dp-calendar-secondary-nav-right{left:initial;right:5px}dp-calendar-nav .dp-calendar-nav-left::before,dp-calendar-nav .dp-calendar-secondary-nav-left::after,dp-calendar-nav .dp-calendar-secondary-nav-left::before{position:relative;content:'';display:inline-block;height:8px;width:8px;vertical-align:baseline;border-style:solid;border-width:2px 2px 0 0;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}dp-calendar-nav .dp-calendar-secondary-nav-left::before{right:-10px}dp-calendar-nav .dp-nav-header{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:5px;display:inline-block;font-size:13px}dp-calendar-nav .dp-nav-header-btn{cursor:pointer}dp-calendar-nav .dp-current-location-btn{position:relative;top:-1px;height:16px;width:16px;vertical-align:middle;background:rgba(0,0,0,.6);border:1px solid rgba(0,0,0,.6);outline:0;border-radius:50%;box-shadow:inset 0 0 0 3px #fff;cursor:pointer}dp-calendar-nav .dp-current-location-btn:hover{background:#000}dp-calendar-nav.dp-material .dp-calendar-nav-container{height:30px;border:1px solid #e0e0e0}dp-calendar-nav.dp-material .dp-calendar-nav-left,dp-calendar-nav.dp-material .dp-calendar-nav-right,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right{border:none;background:#fff;outline:0;font-size:16px;padding:0}dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right{width:20px}dp-calendar-nav.dp-material .dp-nav-header-btn{height:20px;width:80px;border:none;background:#fff;outline:0}dp-calendar-nav.dp-material .dp-nav-header-btn:hover{background:rgba(0,0,0,.05)}dp-calendar-nav.dp-material .dp-nav-header-btn:active{background:rgba(0,0,0,.1)}"]
            }] }
];
CalendarNavComponent.propDecorators = {
    label: [{ type: Input }],
    isLabelClickable: [{ type: Input }],
    showLeftNav: [{ type: Input }],
    showLeftSecondaryNav: [{ type: Input }],
    showRightNav: [{ type: Input }],
    showRightSecondaryNav: [{ type: Input }],
    leftNavDisabled: [{ type: Input }],
    leftSecondaryNavDisabled: [{ type: Input }],
    rightNavDisabled: [{ type: Input }],
    rightSecondaryNavDisabled: [{ type: Input }],
    showGoToCurrent: [{ type: Input }],
    theme: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    onLeftNav: [{ type: Output }],
    onLeftSecondaryNav: [{ type: Output }],
    onRightNav: [{ type: Output }],
    onRightSecondaryNav: [{ type: Output }],
    onLabelClick: [{ type: Output }],
    onGoToCurrent: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CalendarNavComponent.prototype.label;
    /** @type {?} */
    CalendarNavComponent.prototype.isLabelClickable;
    /** @type {?} */
    CalendarNavComponent.prototype.showLeftNav;
    /** @type {?} */
    CalendarNavComponent.prototype.showLeftSecondaryNav;
    /** @type {?} */
    CalendarNavComponent.prototype.showRightNav;
    /** @type {?} */
    CalendarNavComponent.prototype.showRightSecondaryNav;
    /** @type {?} */
    CalendarNavComponent.prototype.leftNavDisabled;
    /** @type {?} */
    CalendarNavComponent.prototype.leftSecondaryNavDisabled;
    /** @type {?} */
    CalendarNavComponent.prototype.rightNavDisabled;
    /** @type {?} */
    CalendarNavComponent.prototype.rightSecondaryNavDisabled;
    /** @type {?} */
    CalendarNavComponent.prototype.showGoToCurrent;
    /** @type {?} */
    CalendarNavComponent.prototype.theme;
    /** @type {?} */
    CalendarNavComponent.prototype.onLeftNav;
    /** @type {?} */
    CalendarNavComponent.prototype.onLeftSecondaryNav;
    /** @type {?} */
    CalendarNavComponent.prototype.onRightNav;
    /** @type {?} */
    CalendarNavComponent.prototype.onRightSecondaryNav;
    /** @type {?} */
    CalendarNavComponent.prototype.onLabelClick;
    /** @type {?} */
    CalendarNavComponent.prototype.onGoToCurrent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLW5hdi9jYWxlbmRhci1uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE1BQU0sT0FBTyxvQkFBb0I7SUFQakM7UUFTVyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUN2QyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUMzQyxvQkFBZSxHQUFZLElBQUksQ0FBQztRQUcvQixjQUFTLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsdUJBQWtCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUQsZUFBVSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BELHdCQUFtQixHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdELGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEQsa0JBQWEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXFCbkUsQ0FBQzs7OztJQW5CQyxjQUFjO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELHdCQUF3QjtRQUN0QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTlDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsdzVEQUE0QztnQkFFNUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O29CQUVFLEtBQUs7K0JBQ0wsS0FBSzswQkFDTCxLQUFLO21DQUNMLEtBQUs7MkJBQ0wsS0FBSztvQ0FDTCxLQUFLOzhCQUNMLEtBQUs7dUNBQ0wsS0FBSzsrQkFDTCxLQUFLO3dDQUNMLEtBQUs7OEJBQ0wsS0FBSztvQkFDTCxXQUFXLFNBQUMsT0FBTyxjQUFHLEtBQUs7d0JBRTNCLE1BQU07aUNBQ04sTUFBTTt5QkFDTixNQUFNO2tDQUNOLE1BQU07MkJBQ04sTUFBTTs0QkFDTixNQUFNOzs7O0lBbEJQLHFDQUF1Qjs7SUFDdkIsZ0RBQTJDOztJQUMzQywyQ0FBcUM7O0lBQ3JDLG9EQUErQzs7SUFDL0MsNENBQXNDOztJQUN0QyxxREFBZ0Q7O0lBQ2hELCtDQUEwQzs7SUFDMUMsd0RBQW1EOztJQUNuRCxnREFBMkM7O0lBQzNDLHlEQUFvRDs7SUFDcEQsK0NBQXlDOztJQUN6QyxxQ0FBNkM7O0lBRTdDLHlDQUE2RDs7SUFDN0Qsa0RBQXNFOztJQUN0RSwwQ0FBOEQ7O0lBQzlELG1EQUF1RTs7SUFDdkUsNENBQWdFOztJQUNoRSw2Q0FBaUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZHAtY2FsZW5kYXItbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLW5hdi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLW5hdi5jb21wb25lbnQubGVzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck5hdkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzTGFiZWxDbGlja2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd0xlZnROYXY6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TGVmdFNlY29uZGFyeU5hdjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93UmlnaHROYXY6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93UmlnaHRTZWNvbmRhcnlOYXY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbGVmdE5hdkRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxlZnRTZWNvbmRhcnlOYXZEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSByaWdodE5hdkRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJpZ2h0U2Vjb25kYXJ5TmF2RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd0dvVG9DdXJyZW50OiBib29sZWFuID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uTGVmdE5hdjogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25MZWZ0U2Vjb25kYXJ5TmF2OiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0TmF2OiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblJpZ2h0U2Vjb25kYXJ5TmF2OiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkxhYmVsQ2xpY2s6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uR29Ub0N1cnJlbnQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBsZWZ0TmF2Q2xpY2tlZCgpIHtcbiAgICB0aGlzLm9uTGVmdE5hdi5lbWl0KCk7XG4gIH1cblxuICBsZWZ0U2Vjb25kYXJ5TmF2Q2xpY2tlZCgpIHtcbiAgICB0aGlzLm9uTGVmdFNlY29uZGFyeU5hdi5lbWl0KCk7XG4gIH1cblxuICByaWdodE5hdkNsaWNrZWQoKSB7XG4gICAgdGhpcy5vblJpZ2h0TmF2LmVtaXQoKTtcbiAgfVxuXG4gIHJpZ2h0U2Vjb25kYXJ5TmF2Q2xpY2tlZCgpIHtcbiAgICB0aGlzLm9uUmlnaHRTZWNvbmRhcnlOYXYuZW1pdCgpO1xuICB9XG5cbiAgbGFiZWxDbGlja2VkKCkge1xuICAgIHRoaXMub25MYWJlbENsaWNrLmVtaXQoKTtcbiAgfVxufVxuIl19