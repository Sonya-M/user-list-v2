import * as utils from "../utilities/helperFns";

class User {
  #id;
  #firstName;
  #lastName;
  #email;
  #dob;
  #img;
  #gender;
  #location;
  #cell;

  constructor(id, firstName, lastName, email, dob, img, gender, location, cell) {
    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#dob = dob;
    this.#img = img;
    this.#gender = gender;
    this.#location = location;
    this.#cell = cell;
  }

  get id() { return this.#id; }
  get firstName() { return this.#firstName; }
  get lastName() { return this.#lastName; }
  get img() { return this.#img; }
  get gender() { return this.#gender; }
  get fullName() {
    return this.#firstName + " " + this.#lastName;
  }
  get dob() {
    return utils.formatDate(this.#dob);
  }
  get email() {
    return utils.maskEmail(this.#email);
  }
  get fullEmail() {
    return this.#email;
  }
  get location() {
    return this.#location;
  }
  get cell() {
    return this.#cell;
  }
}

export default User;