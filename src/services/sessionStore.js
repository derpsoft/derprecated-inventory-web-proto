export default class SessionStore {
  constructor() {
    if (SessionStore.prototype.singleton) {
      return SessionStore.prototype.singleton;
    }
    SessionStore.prototype.singleton = this;
    return this;
  }

  set(session = {}) {
    if (!session) {
      throw new Error('Empty session');
    }
    this.session = session;

    // Save to local storage as well
    if (localStorage) {
      localStorage.setItem('user', JSON.stringify(this.user));
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
