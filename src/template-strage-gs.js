import _ from 'lodash';
import TemplateStrage from './template-strage';
import * as locales from './locales';

const keyRangeFirst = 2;
const templateObj = locales.en.template;
const templateObjLabels = _.keys(templateObj);
const templateObjLength = templateObjLabels.length;
const keyRangeLast = templateObjLength + 1;

const localesSize = _.keys(locales).length;

export default class TemplateStrageGs extends TemplateStrage {

  constructor(spreadsheet, locale) {
    super();
    // メッセージテンプレート設定
    this.sheet = spreadsheet.getSheetByName('_メッセージ');
    if (!this.sheet) {
      this.sheet = TemplateStrageGs.createMessageSheet(spreadsheet);
    }
    this.locale = locale;
  }

  static createMessageSheet(spreadsheet) {
    const sheet = spreadsheet.insertSheet('_メッセージ');
    if (!sheet) {
      throw "エラー: メッセージシートを作れませんでした";
    }

    // create template labels (signIn, signOut,...)
    for (let i = keyRangeFirst; i <= keyRangeLast; i++) {
      sheet.getRange("A" + i).setValue(
        templateObjLabels[i - 2]
      );
    }

    // create columns for languages

    let columnNumber = 'B'.charCodeAt(0); // char into number (B -> 66)

    for (let i = columnNumber; i < columnNumber + localesSize; i++) {
      const setLang = _.keys(locales)[i - columnNumber];
      const templateWithLocale = locales[setLang]["template"];
      const column = String.fromCharCode(i);
      sheet.getRange(column + '1').setValue(setLang);
      for (let j = keyRangeFirst; j <= keyRangeLast; j++) {
        const label = sheet.getRange('A' + j).getValue();
        sheet.getRange(String.fromCharCode(i) + j).setValue(
          templateWithLocale[label]
        );
      }
    }
    return sheet;
  }

  getLabels() {
    return this.sheet.getRange("A" + keyRangeFirst + ":A" + keyRangeLast).getValues();
  }

  getColNumber(label) {
    const labels = this.sheet.getRange("A" + keyRangeFirst + ":A" + keyRangeLast).getValues();

    for (let i = 0; i < labels.length; ++i) {
      if (labels[i][0] === label) {
        return i + 2;
      }
    }
    return null;
  }

  getColLetter() {
    const lastLocaleColumn = String.fromCharCode(65 + localesSize);
    for (let i = 66; i <= 65 + localesSize; i++) {
      if (this.sheet.getRange(String.fromCharCode(i) + "1").getValue() === this.locale) {
        return String.fromCharCode(i);
      }
    }
    return null;
  }

  // テンプレートからメッセージを生成
  get(label) {
    return this.sheet.getRange(this.getColLetter() + this.getColNumber(label)).getValues();
  }

}
