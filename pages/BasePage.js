    class BasePage {

        constructor(page){
            this.page = page;
        }

        async navigate(url){
            await this.page.goto(url, { waitUntil: 'load' });
        }
    }
    module.exports= {BasePage};