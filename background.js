
async function addMenuEntries() {
    /*
    Create the open link context menu item.
    */
    const storageContent = (await (browser.storage.local.get("concatLink"))).concatLink;
    if (storageContent != null) {
        browser.contextMenus.create({
            id: "open-link",
            title: `${browser.i18n.getMessage("openConcatLink")} ${storageContent.name ?? storageContent.url}`,
            contexts: ["link"]
        },
        );
        browser.contextMenus.update(
            "open-link",
            {
                title: `${browser.i18n.getMessage("openConcatLink")} ${storageContent.name ?? storageContent.url}`,
            }
        );

    }


}
addMenuEntries();


/*
Create the edit context menu item.
*/
browser.contextMenus.create({
    id: "create-link",
    title: browser.i18n.getMessage("editConcatLink"),
    contexts: ["link"]
}, () => void browser.runtime.lastError,
);

let inputForm = {
    type: "detached_panel",
    url: "form.html",
    width: 250,
    height: 200,
    focused: true,
};

/*
The message listener adds link to local storage.
*/
browser.runtime.onMessage.addListener((request) => { browser.storage.local.set({ concatLink: { name: request.name, url: request.url } }); addMenuEntries() });

/*
The click event listener.
*/
browser.contextMenus.onClicked.addListener(async (info) => {
    switch (info.menuItemId) {
        case "open-link":
            const url = (await browser.storage.local.get("concatLink"))?.concatLink?.url;
            if (url == null) return;
            browser.tabs.create({
                "url": url + info.linkUrl
            });
            break;
        case "create-link":
            browser.windows.create(inputForm);
            break;
    }
});

