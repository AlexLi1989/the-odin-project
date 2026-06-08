class Book {
  constructor(title, author, pages, isRead) {
    if (!new.target) {
      throw new Error("Book constructor must be called with new keyword");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  info() {
    return `${this.title} by ${this.author}, (${this.pages} pages, ${this.isRead ? "read already" : "not read yet"})`;
  }
}
