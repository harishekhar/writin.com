import identifier from "./indentifier";
// export * from './indentifier';

class IdentifierService extends identifier {
  constructor(appId) {
    if (IdentifierService.instance instanceof IdentifierService) {
      return IdentifierService.instance;
    }
    this.appId = appId;
    IdentifierService.instance = this;
    return new IdentifierService(appId);
  }
}
