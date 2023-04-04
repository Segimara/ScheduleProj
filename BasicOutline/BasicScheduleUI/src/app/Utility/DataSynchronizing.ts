import {Md5} from 'ts-md5';

export class DataSynchronizing 
{
  public async syncData(from: Date, to: Date) {
    const data = /* retrieve data from local storage */;
    const controlSum = /* retrieve control sum from local storage */;
  
    const response = await this.http.get(/* Web API URL */).toPromise();
    const newControlSum = DataSynchronizing.calculateControlSum(response);
    
    if (newControlSum === controlSum) {
      /* data is up-to-date, use it */
    } else {
      /* data has been modified, retrieve updated data from Web API */
    }
  }
  public static calculateControlSum(data: any): string {
    const json = JSON.stringify(data);
    const md5 = new Md5();
    md5.appendStr(json);
    if (md5) {
      md5.appendStr(json);
      const hash = md5.end(true);
      if (hash) {
        return hash.toString();
      }
    }
    return '';
  }
}