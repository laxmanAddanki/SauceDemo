import {BasePage} from "./BasePage"

class LoginPage extends BasePage{

    constructor(page){
        super(page)
        this.userName = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: /login/i});
    }

    async login(userName, password){
        await this.userName.click()
        await this.userName.fill(userName);
        await this.password.click()
        await this.password.fill(password);
        await this.loginButton.click()
    }
}

module.exports= {LoginPage};