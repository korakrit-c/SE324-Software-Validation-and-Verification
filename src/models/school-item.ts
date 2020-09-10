export class SchoolItem {

  constructor(private fields: any) {
    for(let f in fields) {
      this[f] = fields[f];
    }
  }
}