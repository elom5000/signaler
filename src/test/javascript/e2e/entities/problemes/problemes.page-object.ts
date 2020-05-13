import { element, by, ElementFinder } from 'protractor';

export class ProblemesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-problemes div table .btn-danger'));
  title = element.all(by.css('jhi-problemes div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProblemesUpdatePage {
  pageTitle = element(by.id('jhi-problemes-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  libelleInput = element(by.id('field_libelle'));
  numeroIpInput = element(by.id('field_numeroIp'));

  userSelect = element(by.id('field_user'));
  agenceSelect = element(by.id('field_agence'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async setNumeroIpInput(numeroIp: string): Promise<void> {
    await this.numeroIpInput.sendKeys(numeroIp);
  }

  async getNumeroIpInput(): Promise<string> {
    return await this.numeroIpInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async agenceSelectLastOption(): Promise<void> {
    await this.agenceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async agenceSelectOption(option: string): Promise<void> {
    await this.agenceSelect.sendKeys(option);
  }

  getAgenceSelect(): ElementFinder {
    return this.agenceSelect;
  }

  async getAgenceSelectedOption(): Promise<string> {
    return await this.agenceSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProblemesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-problemes-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-problemes'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
