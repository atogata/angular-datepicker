/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHelper } from './common/services/dom-appender/dom-appender.service';
import { UtilsService } from './common/services/utils/utils.service';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerDirective } from './date-picker/date-picker.directive';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { YearCalendarComponent } from './year-calendar/year-calendar.component';
import { TimeSelectComponent } from './time-select/time-select.component';
import { CalendarNavComponent } from './calendar-nav/calendar-nav.component';
import { DayTimeCalendarComponent } from './day-time-calendar/day-time-calendar.component';
export { DatePickerComponent } from './date-picker/date-picker.component';
export { DatePickerDirective } from './date-picker/date-picker.directive';
export { DayCalendarComponent } from './day-calendar/day-calendar.component';
export { DayTimeCalendarComponent } from './day-time-calendar/day-time-calendar.component';
export { TimeSelectComponent } from './time-select/time-select.component';
export { MonthCalendarComponent } from './month-calendar/month-calendar.component';
export { YearCalendarComponent } from './year-calendar/year-calendar.component';
var DpDatePickerModule = /** @class */ (function () {
    function DpDatePickerModule() {
    }
    DpDatePickerModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        DomHelper,
                        UtilsService
                    ],
                    declarations: [
                        DatePickerComponent,
                        DatePickerDirective,
                        DayCalendarComponent,
                        MonthCalendarComponent,
                        CalendarNavComponent,
                        TimeSelectComponent,
                        DayTimeCalendarComponent,
                        YearCalendarComponent
                    ],
                    entryComponents: [
                        DatePickerComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    exports: [
                        DatePickerComponent,
                        DatePickerDirective,
                        MonthCalendarComponent,
                        DayCalendarComponent,
                        TimeSelectComponent,
                        DayTimeCalendarComponent,
                        YearCalendarComponent
                    ]
                },] }
    ];
    return DpDatePickerModule;
}());
export { DpDatePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLWRhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUU5RTtJQUFBO0lBaUNBLENBQUM7O2dCQWpDQSxRQUFRLFNBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULFNBQVM7d0JBQ1QsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixxQkFBcUI7cUJBQ3RCO29CQUNELGVBQWUsRUFBRTt3QkFDZixtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7cUJBQ1o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEI7aUJBQ0Y7O0lBRUQseUJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQURZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhlbHBlcn0gZnJvbSAnLi9jb21tb24vc2VydmljZXMvZG9tLWFwcGVuZGVyL2RvbS1hcHBlbmRlci5zZXJ2aWNlJztcbmltcG9ydCB7VXRpbHNTZXJ2aWNlfSBmcm9tICcuL2NvbW1vbi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZVBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHtEYXRlUGlja2VyRGlyZWN0aXZlfSBmcm9tICcuL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0RheUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7TW9udGhDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci9tb250aC1jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHtZZWFyQ2FsZW5kYXJDb21wb25lbnR9IGZyb20gJy4veWVhci1jYWxlbmRhci95ZWFyLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQge1RpbWVTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7Q2FsZW5kYXJOYXZDb21wb25lbnR9IGZyb20gJy4vY2FsZW5kYXItbmF2L2NhbGVuZGFyLW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHtEYXlUaW1lQ2FsZW5kYXJDb21wb25lbnR9IGZyb20gJy4vZGF5LXRpbWUtY2FsZW5kYXIvZGF5LXRpbWUtY2FsZW5kYXIuY29tcG9uZW50JztcbmV4cG9ydCB7RGF0ZVBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuZXhwb3J0IHtEYXRlUGlja2VyRGlyZWN0aXZlfSBmcm9tICcuL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmRpcmVjdGl2ZSc7XG5leHBvcnQge0RheUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS1jYWxlbmRhci9kYXktY2FsZW5kYXIuY29tcG9uZW50JztcbmV4cG9ydCB7RGF5VGltZUNhbGVuZGFyQ29tcG9uZW50fSBmcm9tICcuL2RheS10aW1lLWNhbGVuZGFyL2RheS10aW1lLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5leHBvcnQge1RpbWVTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vdGltZS1zZWxlY3QvdGltZS1zZWxlY3QuY29tcG9uZW50JztcbmV4cG9ydCB7TW9udGhDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi9tb250aC1jYWxlbmRhci9tb250aC1jYWxlbmRhci5jb21wb25lbnQnO1xuZXhwb3J0IHtZZWFyQ2FsZW5kYXJDb21wb25lbnR9IGZyb20gJy4veWVhci1jYWxlbmRhci95ZWFyLWNhbGVuZGFyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIERvbUhlbHBlcixcbiAgICBVdGlsc1NlcnZpY2VcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGF0ZVBpY2tlckNvbXBvbmVudCxcbiAgICBEYXRlUGlja2VyRGlyZWN0aXZlLFxuICAgIERheUNhbGVuZGFyQ29tcG9uZW50LFxuICAgIE1vbnRoQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJOYXZDb21wb25lbnQsXG4gICAgVGltZVNlbGVjdENvbXBvbmVudCxcbiAgICBEYXlUaW1lQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgWWVhckNhbGVuZGFyQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIERhdGVQaWNrZXJDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRGF0ZVBpY2tlckNvbXBvbmVudCxcbiAgICBEYXRlUGlja2VyRGlyZWN0aXZlLFxuICAgIE1vbnRoQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgRGF5Q2FsZW5kYXJDb21wb25lbnQsXG4gICAgVGltZVNlbGVjdENvbXBvbmVudCxcbiAgICBEYXlUaW1lQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgWWVhckNhbGVuZGFyQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRHBEYXRlUGlja2VyTW9kdWxlIHtcbn1cbiJdfQ==