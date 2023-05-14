export class EventDetailsVM implements IEventDetailsVM {
    id?: string;
    userId?: string;
    title?: string | undefined;
    description?: string | undefined;
    priotity?: number;
    start?: Date;
    end?: Date;

    constructor(data?: IEventDetailsVM) {
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
            this.priotity = _data["priotity"];
            this.start = _data["start"] ? new Date(_data["start"].toString()) : <any>undefined;
            this.end = _data["end"] ? new Date(_data["end"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): EventDetailsVM {
        data = typeof data === 'object' ? data : {};
        let result = new EventDetailsVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        data["title"] = this.title;
        data["description"] = this.description;
        data["priotity"] = this.priotity;
        data["start"] = this.start ? this.start.toISOString() : <any>undefined;
        data["end"] = this.end ? this.end.toISOString() : <any>undefined;
        return data;
    }
}

export interface IEventDetailsVM {
    id?: string;
    userId?: string;
    title?: string | undefined;
    description?: string | undefined;
    priotity?: number;
    start?: Date;
    end?: Date;
}
