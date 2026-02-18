class freeobj {
  constructor(n) {
    this.head = null;
    n = n || 0;
    for (let i = 0; i < n; i++) {
      let obj = new obstacle();
      obj.next = this.head;
      this.head = obj;
    }
  }

  getObj() {
    if (this.head == null) {
      this.head = new obstacle();
      this.head.next = null;
    }
    let obj = this.head;
    this.head = this.head.next;
    obj.next = null;
    return obj;
  }

  deleteObj(obj) {
    if (obj == null) return;
    obj.next = this.head;
    this.head = obj;
  }
}
