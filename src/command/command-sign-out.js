import CommandAbstract from './command-abstract';
import CommandTotal from './command-total';

import moment from 'moment';

export default class CommandSignOut extends CommandAbstract{
  static match(body) {
    return body.match(/(バ[ー〜ァ]*イ|ば[ー〜ぁ]*い|おやすみ|お[つっ]ー|おつ|さらば|お先|お疲|帰|乙|退勤|ごきげんよ|グ[ッ]?バイ)/);
  }

  /**
   *
   * @param slack {Slack}
   * @param template {GSTemplate}
   * @param timesheets {GSTimesheets}
   */
  constructor(slack, template, timesheets) {
    super(slack, template, timesheets);

    this.commandTotal = new CommandTotal(slack, template, timesheets);
  }

  execute(username, date, time) {


    const now = moment();
    const row = this.timesheets.get(username, date? date: now);


    if (!row.getSignOut() || row.getSignOut() === '-') {


      if (time) {
        row.setSignOut(time.format('HH:mm'));
      } else {
        row.setSignOut(now.format('HH:mm'));
      }

      this.timesheets.set(row);
      this.slack.send(this.template.render(
        "退勤", username, date? date.format('YYYY/MM/DD'): now.format('YYYY/MM/DD')
      ));
      this.commandTotal.execute(username, date, time);
    } else {

      // 更新の場合は時間を明示する必要がある
      if (!time) {
        this.slack.send('今日はもう退勤してますよ');
        return;
      }
      row.setSignOut(time.format('HH:mm'));

      this.timesheets.set(row);
      this.slack.send(this.template.render(
        "退勤更新", username, date? date.format('YYYY/MM/DD'): now.format('YYYY/MM/DD')
      ));
      this.commandTotal.execute(username, date, time);
    }



  }
}