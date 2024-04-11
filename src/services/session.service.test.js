import { SessionService } from './session.service.js';

describe('SessionService', () => {
  let sessionService;

  beforeEach(() => {
    sessionService = new SessionService();
  });

  it('should create a session', () => {
    const sessionId = 'abc123';
    const result = sessionService.createSession(sessionId);
    expect(result).toBe(true);
  });

  it('should not create a duplicate session', () => {
    const sessionId = 'abc123';
    sessionService.createSession(sessionId);
    const result = sessionService.createSession(sessionId);
    expect(result).toBe(false);
  });

  it('should delete a session', () => {
    const sessionId = 'abc123';
    sessionService.createSession(sessionId);
    sessionService.deleteSession(sessionId);
    const session = sessionService.getSession(sessionId);
    expect(session).toBeUndefined();
  });

  it('should update a session', () => {
    const sessionId = 'abc123';
    sessionService.createSession(sessionId);
    const fieldsToUpdate = { STAGES: 'REQUEST_COUNT' };
    sessionService.updateSession(sessionId, fieldsToUpdate);
    const session = sessionService.getSession(sessionId);
    expect(session.STAGES).toBe('REQUEST_COUNT');
  });

  it('should get a session by ID', () => {
    const sessionId = 'abc123';
    sessionService.createSession(sessionId);
    const session = sessionService.getSession(sessionId);
    expect(session.id).toBe(sessionId);
  });
});
