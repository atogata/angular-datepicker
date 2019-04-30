import {inject, TestBed} from '@angular/core/testing';
import * as momentNs from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {YearCalendarService} from './year-calendar.service';
import {IYear} from './year.model';
const moment = momentNs;

describe('Service: YearCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearCalendarService, UtilsService]
    });
  });

  it('should check the generateYear method', inject([YearCalendarService], (service: YearCalendarService) => {
    const year = moment('14-01-1987', 'DD-MM-YYYY');
    const selected = moment('14-01-1987', 'DD-MM-YYYY');
    const genYear = service.generateYear({}, year, [selected]);

    const current = year.clone().startOf('year');
    genYear.forEach((row) => {
      row.forEach((year) => {
        expect(year.date.isSame(current, 'year')).toBe(true);
        if (year.date.format('MMM') === 'Jan') {
          expect(year.selected).toBe(true);
        } else {
          expect(year.selected).toBe(false);
        }
        expect(year.currentYear).toBe(false);

        current.add(1, 'year');
      });
    });
  }));

  it('should check the isDateDisabled method', inject([YearCalendarService], (service: YearCalendarService) => {
    const year: IYear = {
      date: moment('09-04-2017', 'DD-MM-YYYY'),
      selected: false,
      currentYear: false,
      disabled: false,
      text: moment('09-04-2017', 'DD-MM-YYYY').format('MMM')
    };
    const config1: any = {
      min: year.date.clone().subtract(1, 'year'),
      max: year.date.clone().add(1, 'year')
    };

    expect(service.isYearDisabled(year.date, config1)).toBe(false);
    year.date.subtract(1, 'year');
    expect(service.isYearDisabled(year.date, config1)).toBe(false);
    year.date.subtract(1, 'year');
    expect(service.isYearDisabled(year.date, config1)).toBe(true);
    year.date.add(3, 'year');
    expect(service.isYearDisabled(year.date, config1)).toBe(false);
    year.date.add(1, 'year');
    expect(service.isYearDisabled(year.date, config1)).toBe(true);
  }));

  it('should check getDayBtnText method',
    inject([YearCalendarService],
      (service: YearCalendarService) => {
        const date = moment('05-04-2017', 'DD-MM-YYYY');
        expect(service.getYearBtnText({yearBtnFormat: 'M'}, date)).toEqual('4');
        expect(service.getYearBtnText({yearBtnFormat: 'MM'}, date)).toEqual('04');
        expect(service.getYearBtnText({yearBtnFormatter: (m => 'bla')}, date)).toEqual('bla');
        expect(service.getYearBtnText({yearBtnFormat: 'MM', yearBtnFormatter: (m => m.format('M'))}, date))
          .toEqual('4');
      }));

  it('should check getYearBtnCssClass method',
    inject([YearCalendarService],
      (service: YearCalendarService) => {
        const date = moment('05-04-2017', 'DD-MM-YYYY');
        expect(service.getYearBtnCssClass({}, date)).toEqual('');
        expect(service.getYearBtnCssClass({yearBtnCssClassCallback: (m => 'class1 class2')}, date))
          .toEqual('class1 class2');
      }));
});
