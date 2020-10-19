import { observable, action, makeObservable } from "mobx";

class DocumentStore {
  poems = [];
  setDocuments(poems) {
    this.poems = poems;
  }
}

DocumentStore = makeObservable(DocumentStore, {
  poems: observable,
  setDocuments: action
});

export { DocumentStore };