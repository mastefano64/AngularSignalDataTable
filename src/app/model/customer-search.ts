
export class CustomerSearch {
  fulltext: string;
  name: string;
  surname: string;
  address: string;
  cap: string;
  city: string;
  province: string;

  constructor() {
    this.fulltext = '';
    this.name = '';
    this.surname = '';
    this.address = '';
    this.cap = '';
    this.city = '';
    this.province = '';
  }

  setFastSearch(value: string) {
    this.clear();
    if (value === undefined) {
      value = '';
    }
    this.fulltext = value.trim();
  }

  isEmpty(): boolean {
    if (this.name.trim() === '' && this.surname.trim() === '' && this.address.trim() === '' &&
         this.cap.trim() === '' && this.city.trim() === '' && this.province.trim() === '') {
       return true;
     } else {
      return false;
    }
  }

  trimAll() {
    this.fulltext = this.fulltext.trim();
    this.name = this.name.trim();
    this.surname = this.surname.trim();
    this.address = this.address.trim();
    this.cap = this.cap.trim();
    this.city = this.city.trim();
    this.province = this.province.trim();
  }

  set(param: any) {
    this.fulltext = param.fulltext.trim();
    this.name = param.name.trim();
    this.surname = param.surname.trim();
    this.address = param.address.trim();
    this.cap = param.cap.trim();
    this.city = param.city.trim();
    this.province = param.province.trim();
  }

  clear() {
    this.fulltext = '';
    this.name = '';
    this.surname = '';
    this.address = '';
    this.cap = '';
    this.city = '';
    this.province = '';
  }
}
