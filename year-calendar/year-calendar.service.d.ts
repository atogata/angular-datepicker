import { Moment } from 'moment';
import { UtilsService } from '../common/services/utils/utils.service';
import { IYear } from './year.model';
import { IYearCalendarConfig, IYearCalendarConfigInternal } from './year-calendar-config';
export declare class YearCalendarService {
    private utilsService;
    readonly DEFAULT_CONFIG: IYearCalendarConfigInternal;
    constructor(utilsService: UtilsService);
    getConfig(config: IYearCalendarConfig): IYearCalendarConfigInternal;
    generateYear(config: IYearCalendarConfig, year: Moment, selected?: Moment[]): IYear[][];
    isYearDisabled(date: Moment, config: IYearCalendarConfig): boolean;
    shouldShowLeft(min: Moment, currentYearView: Moment): boolean;
    shouldShowRight(max: Moment, currentYearView: Moment): boolean;
    getHeaderLabel(config: IYearCalendarConfig, year: Moment): string;
    getYearBtnText(config: IYearCalendarConfig, year: Moment): string;
    getYearBtnCssClass(config: IYearCalendarConfig, year: Moment): string;
}
