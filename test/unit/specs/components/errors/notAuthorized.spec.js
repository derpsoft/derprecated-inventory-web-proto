import NotAuthorized from 'components/errors/notAuthorized';

describe('Not Authorized - Components', () => {
  it('should have a name', () => {
    expect(NotAuthorized.name).to.equal('notAuthorized');
  });
});
