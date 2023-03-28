enum Status {
  Active,
  Inactive,
}

enum State {
  Deleted,
  Modified,
  Added,
}

interface ImageModel {
  Id: string;
  Bytes: Uint8Array;
  Description: string;
  FileExtension: string;
  Size: number;
  EventId: string;
  Event: EventModel;
}

interface EventModel {
  Id: string;
  UserId: string;
  Title: string;
  Description: string;
  Priotity: number;
  Timestamp: Date;
  State: State;
  DateTimeStart: Date;
  DateTimeEnd: Date;
  Images: ImageModel[];
}