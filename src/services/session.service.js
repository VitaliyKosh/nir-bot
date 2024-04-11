export class SessionService {
  STAGES = {
    SYSTEM: 'SYSTEM',
    SYSTEM_NUMBER: 'SYSTEM_NUMBER',
    REQUEST_COUNT: 'REQUEST_COUNT',
  }

  constructor () {
    this.sessions = []
  }

  /**
   * @param {string} sessionId
   */
  createSession (sessionId) {
    if (this.sessions.some(s => s.id === sessionId)) {
      return false
    }

    this.sessions.push({
      id: sessionId
    });

    return true
  }

  /**
   * @param {string} sessionId
   */
  deleteSession (sessionId) {
    this.sessions = this.sessions.filter(s => s.id !== sessionId)
  }

  /**
   * @param {string} sessionId
   */
  updateSession (sessionId, fields) {
    const session = this.getSession(sessionId)
    Object.assign(session, fields)
  }

  /**
   * @param {string} sessionId
   */
  getSession (sessionId) {
    return this.sessions.find(s => s.id === sessionId)
  }
}