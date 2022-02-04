let scraperBtn = document.getElementById('scrapButton');

scraperBtn.addEventListener('click', async () =>{
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    
    if (tab !== null){
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: startScraping
        })
    }
})

async function startScraping(){
    const profilesElements = document.querySelectorAll('#main > div > div > div > ul > li');

    
    for(const element of profilesElements) {
        window.open(element.querySelector('div > div > div.entity-result__content.entity-result__divider > div.mb1 > div > div > span.entity-result__title-line > span > a'));
        
        await wait(10000)
        /*window.close()
        await wait(2000) */
    };
    
    async function wait(miliseconds) {
        return new Promise(function(resolve){
            setTimeout(function(){
                resolve();
            },miliseconds)
        }
        );
      }

    async function autoScroll(selector){
        const element = document.querySelector(selector);

        while(element){
            let maxScrollTop = document.body.clientHeight - window.innerHeight;
            let elementScrollTop = document.querySelector(selector).offsetHeight;
            let currentScrollTop = window.scrollY;

            if (maxScrollTop <= currentScrollTop + 20 || elementScrollTop <= currentScrollTop) break;

            await wait(25);

            let newScrollTop = Math.min(currentScrollTop + 20, maxScrollTop);

            window.scrollTo(0, newScrollTop);
        }

        window.scrollTo(0,0);
    }

    async function getProfileInfo(){
        const selectors = {
            contactInfo : '#top-card-text-details-contact-info',
            contactModal: 'div > section.pv-contact-info__contact-type',
            sections : '#main > section'
        }

        const profileInfo = {}

        console.log('ejecutando autoscroll');
        await autoScroll('body');
        console.log('termino el autoscroll');

        async function getContactInfo(selector){
            document.querySelector(selector.contactInfo).click();
            await wait (2000);

            const contactDiv = document.querySelectorAll('div > section.pv-contact-info__contact-type');
            let aux = {}
            contactDiv.forEach(e => {
                if (e.querySelector('div > span') !== null){
                    aux[e.querySelector('h3').innerText] = e.querySelector('div > span').innerText;
                }
                if (e.querySelector('div > a') !== null){
                    aux[e.querySelector('h3').innerText] = e.querySelector('div > a').innerText;
                }
                
            })
            profileInfo.contactInfo = aux 
            window.history.back();
        }

        async function getExperience(){

        }

        await getContactInfo(selectors);
        console.log(profileInfo);
        
        /* const sectionElements = document.querySelectorAll(selectors.sections);

        sectionElements.forEach(element =>{
            let span = element.querySelector('div.pvs-list__outer-container > div > a > span');
            let text = "";
            if (span !== null){
                text = span.innerText;
                if (text.search(/experiencia/i) == 12){
                    span.click();
                }
                if (text.search(/educación/i) == 12){
                    span.click();
                }
            }
        }) */
        

    }

    
}