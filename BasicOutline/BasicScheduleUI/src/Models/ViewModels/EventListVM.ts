import { EventListDTO } from "./EventListDtoVM";


export class EventListVM implements IEventListVM {
  listDTOs?: EventListDTO[] | undefined;

  constructor(data?: IEventListVM) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          if (Array.isArray(_data["listDTOs"])) {
              this.listDTOs = [] as any;
              for (let item of _data["listDTOs"])
                  this.listDTOs!.push(EventListDTO.fromJS(item));
          }
      }
  }

  static fromJS(data: any): EventListVM {
      data = typeof data === 'object' ? data : {};
      let result = new EventListVM();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.listDTOs)) {
          data["listDTOs"] = [];
          for (let item of this.listDTOs)
              data["listDTOs"].push(item.toJSON());
      }
      return data;
  }
}

export interface IEventListVM {
  listDTOs?: EventListDTO[] | undefined;
}
