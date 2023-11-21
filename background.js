/*
Create the open link context menu item.
*/
browser.contextMenus.create({
    id: "open-link",
    title: browser.i18n.getMessage("openCustomLink"),
    contexts: ["link"]
}, () => void browser.runtime.lastError,
);

/*
Create the create context menu item.
*/
browser.contextMenus.create({
    id: "create-link",
    title: browser.i18n.getMessage("createCustomLink"),
    contexts: ["link"]
}, () => void browser.runtime.lastError,
);

let inputForm = {
    type: "detached_panel",
    url: "form.html",
    width: 250,
    height: 100,
    focused: true,
};

/*
The message listener.
*/
browser.runtime.onMessage.addListener((request) => browser.storage.local.set({ url: request.url }));

/*
The click event listener.
*/
browser.contextMenus.onClicked.addListener(async (info, tab) => {
    switch (info.menuItemId) {
        case "create-link":
            browser.windows.create(inputForm);
            break;
            case "open-link":
            browser.tabs.create({
                "url": (await browser.storage.local.get("url")).url + info.linkUrl
            });
            break;
    }
});

