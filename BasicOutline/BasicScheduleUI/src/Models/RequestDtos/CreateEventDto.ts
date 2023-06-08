export class CreateEventDto implements ICreateEventDto {
  title?: string | undefined;
  description?: string | undefined;
  priotity?: number;
  start?: Date;
  end?: Date;

  constructor(data?: ICreateEventDto) {
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
      this.priotity = _data["priority"];
      this.start = _data["start"] ? new Date(_data["start"].toString()) : <any>undefined;
      this.end = _data["end"] ? new Date(_data["end"].toString()) : <any>undefined;
    }
  }

  static fromJS(data: any): CreateEventDto {
    data = typeof data === 'object' ? data : {};
    let result = new CreateEventDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["title"] = this.title;
    data["description"] = this.description;
    data["priority"] = this.priotity;
    data["start"] = this.start ? this.start.toISOString() : <any>undefined;
    data["end"] = this.end ? this.end.toISOString() : <any>undefined;
    return data;
  }
}

export interface ICreateEventDto {
  title?: string | undefined;
  description?: string | undefined;
  priotity?: number;
  start?: Date;
  end?: Date;
}

