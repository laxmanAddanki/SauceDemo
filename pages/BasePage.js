    class BasePage {

        constructor(page){
            this.page = page;
        }

        async navigate(url){
            await page.goto(url, {waitunitl: 'networkIdle'});
        }
    }