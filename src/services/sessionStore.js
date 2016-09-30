
export default class SessionStore {
  constructor() {
    if (SessionStore.prototype.singleton) {
      return SessionStore.prototype.singleton;
    }
    SessionStore.prototype.singleton = this;
    return this;
  }

  clear() {
    this.session = {};

    if (localStorage) {
      localStorage.setItem('session', JSON.stringify(this.session));
    }
  }

  set(session = {}) {
    if (!session) {
      throw new Error('Empty session');
    }
    this.session = session;

    if (localStorage) {
      localStorage.setItem('session', JSON.stringify(this.session));
    }
  }

  get() {
    const session = this.session;
    return JSON.parse(session);
  }

  getSessionId() {
    return this.get().sessionId;
  }
}
