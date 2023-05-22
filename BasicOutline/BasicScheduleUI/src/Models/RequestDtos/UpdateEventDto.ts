export class UpdateEventDto implements IUpdateEventDto {
  title?: string | undefined;
  description?: string | undefined;
  priority?: number;
  start?: Date;
  end?: Date;

  constructor(data?: IUpdateEventDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.title = _data["title"];
      this.description = _data["description"];
      this.priority = _data["priority"];
      this.start = _data["start"] ? new Date(_data["start"].toString()) : <any>undefined;
      this.end = _data["end"] ? new Date(_data["end"].toString()) : <any>undefined;
    }
  }

  static fromJS(data: any): UpdateEventDto {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateEventDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["title"] = this.title;
    data["description"] = this.description;
    data["priority"] = this.priority;
    data["start"] = this.start ? this.start.toISOString() : <any>undefined;
    data["end"] = this.end ? this.end.toISOString() : <any>undefined;
    return data;
  }
}

export interface IUpdateEventDto {
  title?: string | undefined;
  description?: string | undefined;
  priority?: number;
  start?: Date;
  end?: Date;
}