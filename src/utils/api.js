class Api {
  constructor(url, developer) {
    this._url = url;
    this._developer = developer;
  }

  getTasks = (sortFieldValue, sortDirectionValue, pageValue) => {
    return fetch(
      `${this._url}/${this._developer}&sort_field=${sortFieldValue}&sort_direction=${sortDirectionValue}&page=${pageValue}`,
      {}
    ).then(this.checkResult);
  };

  createTask = (formElem) => {
    return fetch(`${this._url}/create${this._developer}`, {
      method: "POST",
      body: new FormData(formElem),
    }).then(this.checkResult);
  };

  login = (formElem) => {
    return fetch(`${this._url}/login${this._developer}`, {
      method: "POST",
      body: new FormData(formElem),
    }).then(this.checkResult);
  };

  editTask = (taskId, formElem) => {
    return fetch(`${this._url}/edit/${taskId}${this._developer}`, {
      method: "POST",
      body: formElem,
    }).then(this.checkResult);
  };

  checkResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };
}

export const api = new Api(
  "https://uxcandy.com/~shapoval/test-task-backend/v2",
  "?developer=SadrtdinovArtur"
);
