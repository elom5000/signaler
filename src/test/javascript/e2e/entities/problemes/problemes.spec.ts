import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProblemesComponentsPage, ProblemesDeleteDialog, ProblemesUpdatePage } from './problemes.page-object';

const expect = chai.expect;

describe('Problemes e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let problemesComponentsPage: ProblemesComponentsPage;
  let problemesUpdatePage: ProblemesUpdatePage;
  let problemesDeleteDialog: ProblemesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Problemes', async () => {
    await navBarPage.goToEntity('problemes');
    problemesComponentsPage = new ProblemesComponentsPage();
    await browser.wait(ec.visibilityOf(problemesComponentsPage.title), 5000);
    expect(await problemesComponentsPage.getTitle()).to.eq('signalerApp.problemes.home.title');
    await browser.wait(ec.or(ec.visibilityOf(problemesComponentsPage.entities), ec.visibilityOf(problemesComponentsPage.noResult)), 1000);
  });

  it('should load create Problemes page', async () => {
    await problemesComponentsPage.clickOnCreateButton();
    problemesUpdatePage = new ProblemesUpdatePage();
    expect(await problemesUpdatePage.getPageTitle()).to.eq('signalerApp.problemes.home.createOrEditLabel');
    await problemesUpdatePage.cancel();
  });

  it('should create and save Problemes', async () => {
    const nbButtonsBeforeCreate = await problemesComponentsPage.countDeleteButtons();

    await problemesComponentsPage.clickOnCreateButton();

    await promise.all([
      problemesUpdatePage.setLibelleInput('libelle'),
      problemesUpdatePage.setNumeroIpInput('numeroIp'),
      problemesUpdatePage.userSelectLastOption(),
      problemesUpdatePage.agenceSelectLastOption()
    ]);

    expect(await problemesUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await problemesUpdatePage.getNumeroIpInput()).to.eq('numeroIp', 'Expected NumeroIp value to be equals to numeroIp');

    await problemesUpdatePage.save();
    expect(await problemesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await problemesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Problemes', async () => {
    const nbButtonsBeforeDelete = await problemesComponentsPage.countDeleteButtons();
    await problemesComponentsPage.clickOnLastDeleteButton();

    problemesDeleteDialog = new ProblemesDeleteDialog();
    expect(await problemesDeleteDialog.getDialogTitle()).to.eq('signalerApp.problemes.delete.question');
    await problemesDeleteDialog.clickOnConfirmButton();

    expect(await problemesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
