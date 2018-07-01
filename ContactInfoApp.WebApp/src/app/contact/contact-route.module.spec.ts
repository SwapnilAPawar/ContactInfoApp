import { ContactRouteModule } from './contact-route.module';

describe('ContactRouteModule', () => {
  let contactRouteModule: ContactRouteModule;

  beforeEach(() => {
    contactRouteModule = new ContactRouteModule();
  });

  it('should create an instance', () => {
    expect(contactRouteModule).toBeTruthy();
  });
});
