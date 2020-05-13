import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgenceComponentsPage, AgenceDeleteDialog, AgenceUpdatePage } from './agence.page-object';

const expect = chai.expect;

describe('Agence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agenceComponentsPage: AgenceComponentsPage;
  let agenceUpdatePage: AgenceUpdatePage;
  let agenceDeleteDialog: AgenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Agences', async () => {
    await navBarPage.goToEntity('agence');
    agenceComponentsPage = new AgenceComponentsPage();
    await browser.wait(ec.visibilityOf(agenceComponentsPage.title), 5000);
    expect(await agenceComponentsPage.getTitle()).to.eq('signalerApp.agence.home.title');
    await browser.wait(ec.or(ec.visibilityOf(agenceComponentsPage.entities), ec.visibilityOf(agenceComponentsPage.noResult)), 1000);
  });

  it('should load create Agence page', async () => {
    await agenceComponentsPage.clickOnCreateButton();
    agenceUpdatePage = new AgenceUpdatePage();
    expect(await agenceUpdatePage.getPageTitle()).to.eq('signalerApp.agence.home.createOrEditLabel');
    await agenceUpdatePage.cancel();
  });

  it('should create and save Agences', async () => {
    const nbButtonsBeforeCreate = await agenceComponentsPage.countDeleteButtons();

    await agenceComponentsPage.clickOnCreateButton();

    await promise.all([agenceUpdatePage.setNomInput('nom')]);

    expect(await agenceUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');

    await agenceUpdatePage.save();
    expect(await agenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Agence', async () => {
    const nbButtonsBeforeDelete = await agenceComponentsPage.countDeleteButtons();
    await agenceComponentsPage.clickOnLastDeleteButton();

    agenceDeleteDialog = new AgenceDeleteDialog();
    expect(await agenceDeleteDialog.getDialogTitle()).to.eq('signalerApp.agence.delete.question');
    await agenceDeleteDialog.clickOnConfirmButton();

    expect(await agenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
