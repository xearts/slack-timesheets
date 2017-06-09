import sinon from 'sinon';
import moment from 'moment';

import Slack from '../src/slack';
import CommandMonthTotal from '../src/command/command-month-total';
import Timesheets from '../src/gs-timesheets';
import TimesheetRow from '../src/timesheet-row';


describe('CommandMonthTotalSpec', ()=> {
  it('should call slack send method with --didnt work that month-- messsage', () => {
    const username = "tester";
    const actualMonth = 6;
    const expectMessage = username+'さんが2017年'+actualMonth+'月は出勤しませんでした';
    const body = "集計 :"+username+" 2017/"+actualMonth;
    const date = moment({year: 2017, month: actualMonth-1, day: 1});

    const row = new TimesheetRow(username, date, ["","","","","","","",""]);
    const slack = new Slack();
    const timesheets = new Timesheets();
    let mockTimesheets = sinon.mock(timesheets).expects('get').atLeast(28).atMost(31)
      .onCall(0).returns(row)
      .onCall(1).returns(row)
      .onCall(2).returns(row)
      .onCall(3).returns(row)
      .onCall(4).returns(row)
      .onCall(5).returns(row)
      .onCall(6).returns(row)
      .onCall(7).returns(row)
      .onCall(8).returns(row)
      .onCall(9).returns(row)
      .onCall(10).returns(row)
      .onCall(11).returns(row)
      .onCall(12).returns(row)
      .onCall(13).returns(row)
      .onCall(14).returns(row)
      .onCall(15).returns(row)
      .onCall(16).returns(row)
      .onCall(17).returns(row)
      .onCall(18).returns(row)
      .onCall(19).returns(row)
      .onCall(20).returns(row)
      .onCall(21).returns(row)
      .onCall(22).returns(row)
      .onCall(23).returns(row)
      .onCall(24).returns(row)
      .onCall(25).returns(row)
      .onCall(26).returns(row)
      .onCall(27).returns(row)
      .onCall(28).returns(row)
      .onCall(29).returns(row);

    const command = new CommandMonthTotal(slack, null, timesheets);
    const mockSlack = sinon.mock(slack).expects('send').once().withArgs(expectMessage);

    command.execute(username, date, null, body);

    mockSlack.verify();
    mockTimesheets.verify();
  });


  it('should call slack send method with --havent signed out yet-- messsage', () => {
    const username = "tester";
    const actualMonth = 6;
    const body = "集計 :"+username+" 2017/"+actualMonth;
    const date = moment({year: 2017, month: actualMonth-1, day: 1});
    const expectMessage = date.format('YYYY/MM/DD')+"は退勤してないです";

    const row = new TimesheetRow(username, date, ["2017/0"+actualMonth+"/01 00:00:00","2017/0"+actualMonth+"/01 10:00:00","","","1","","",""]);
    const slack = new Slack();
    const timesheets = new Timesheets();
    let mockTimesheets = sinon.mock(timesheets).expects('get').atMost(1)
      .onCall(0).returns(row);

    const command = new CommandMonthTotal(slack, null, timesheets);
    const mockSlack = sinon.mock(slack).expects('send').once().withArgs(expectMessage);

    command.execute(username, date, null, body);

    mockSlack.verify();
    mockTimesheets.verify();
  });


  it('should call slack send method with expectMessage', () => {
    const username = "tester";
    const actualMonth = 6;
    const expectMessage = username+'さんが2017年'+actualMonth+'月は就業:8時間、時間外労働:4時間、深夜労働:1時間働きました';
    const body = "集計 :"+username+" 2017/"+actualMonth;
    const date = moment({year: 2017, month: actualMonth-1, day: 1});

    const row = new TimesheetRow(username, date, ["2017/0"+actualMonth+"/01 00:00:00","2017/0"+actualMonth+"/01 10:00:00","2017/0"+actualMonth+"/01 23:00:00","","1","8","4","1"]);
    const emptyRow = new TimesheetRow(username, date, ["","","","","","",""]);
    const slack = new Slack();
    const timesheets = new Timesheets();
    let mockTimesheets = sinon.mock(timesheets).expects('get').atLeast(28).atMost(31)
        .onCall(0).returns(row)
        .onCall(1).returns(emptyRow)
        .onCall(2).returns(emptyRow)
        .onCall(3).returns(emptyRow)
        .onCall(4).returns(emptyRow)
        .onCall(5).returns(emptyRow)
        .onCall(6).returns(emptyRow)
        .onCall(7).returns(emptyRow)
        .onCall(8).returns(emptyRow)
        .onCall(9).returns(emptyRow)
        .onCall(10).returns(emptyRow)
        .onCall(11).returns(emptyRow)
        .onCall(12).returns(emptyRow)
        .onCall(13).returns(emptyRow)
        .onCall(14).returns(emptyRow)
        .onCall(15).returns(emptyRow)
        .onCall(16).returns(emptyRow)
        .onCall(17).returns(emptyRow)
        .onCall(18).returns(emptyRow)
        .onCall(19).returns(emptyRow)
        .onCall(20).returns(emptyRow)
        .onCall(21).returns(emptyRow)
        .onCall(22).returns(emptyRow)
        .onCall(23).returns(emptyRow)
        .onCall(24).returns(emptyRow)
        .onCall(25).returns(emptyRow)
        .onCall(26).returns(emptyRow)
        .onCall(27).returns(emptyRow)
        .onCall(28).returns(emptyRow)
        .onCall(29).returns(emptyRow);

    const command = new CommandMonthTotal(slack, null, timesheets);
    const mockSlack = sinon.mock(slack).expects('send').once().withArgs(expectMessage);

    command.execute(username, date, null, body);

    mockSlack.verify();
    mockTimesheets.verify();
  });
});