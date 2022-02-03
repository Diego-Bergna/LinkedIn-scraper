let scraperBtn = document.getElementById('scrapButton');

scraperBtn.addEventListener('click', async () =>{
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    if (tab !== null){
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: startScraping
        })
    }
})

async function startScraping(){
    const profilesElements = document.querySelectorAll('#main > div > div > div > ul > li');
    
    async function wait(miliseconds) {
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve();
            },miliseconds)
        }
        );
      }

    for(let i = 0; i<= profilesElements.length; i++){
        profilesElements[i+1].querySelector('div > div > div.entity-result__universal-image > div > a').click();
        
        await wait(4000);
        
        window.history.go(-1);

        await wait(4000);
    }
    /* let d = document.querySelector(`#main > div > div > div > ul > li:nth-child(1)`);
    d.querySelector('div > div > div.entity-result__universal-image > div > a').click(); */
}