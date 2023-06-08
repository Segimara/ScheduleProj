export class EventModel implements IEventModel {
  id?: string;
  userId?: string;
  title?: string | undefined;
  description?: string | undefined;
  priority?: number;
  timestamp?: Date;
  state?: State;
  start?: Date;
  end?: Date;

  constructor(data?: IEventModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.userId = _data["userId"];
      this.title = _data["title"];
      this.description = _data["description"];
      this.priority = _data["priority"];
      this.timestamp = _data["timestamp"] ? new Date(_data["timestamp"].toString()) : <any>undefined;
      this.state = _data["state"];
      this.start = _data["start"] ? new Date(_data["start"].toString()) : <any>undefined;
      this.end = _data["end"] ? new Date(_data["end"].toString()) : <any>undefined;
    }
  }

  static fromJS(data: any): EventModel {
    data = typeof data === 'object' ? data : {};
    let result = new EventModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["userId"] = this.userId;
    data["title"] = this.title;
    data["description"] = this.description;
    data["priority"] = this.priority;
    data["timestamp"] = this.timestamp ? this.timestamp.toISOString() : <any>undefined;
    data["state"] = this.state;
    data["start"] = this.start ? this.start.toISOString() : <any>undefined;
    data["end"] = this.end ? this.end.toISOString() : <any>undefined;
    return data;
  }
}

export interface IEventModel {
  id?: string;
  userId?: string;
  title?: string | undefined;
  description?: string | undefined;
  priority?: number;
  timestamp?: Date;
  state?: State;
  start?: Date;
  end?: Date;
}

export enum State {
  _0 = 0,
  _1 = 1,
  _2 = 2,
}
