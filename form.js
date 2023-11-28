const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const okBtn = document.getElementById("ok");

nameInput.setAttribute('placeholder',browser.i18n.getMessage("name"))
urlInput.setAttribute('placeholder',browser.i18n.getMessage("url"))

function change() {
  const url = urlInput.value;
  const name = nameInput.value;
  if(url?.length > 2){
  browser.runtime.sendMessage({name, url});
  document.getElementById("result").innerHTML = `${browser.i18n.getMessage("saved")} ${name} -> ${url}`;
  setTimeout(async ()=> browser.windows.remove(
    (await browser.windows.getCurrent()).id
  ),2000);
}
}
async function setData(){
  const storageContent = (await (browser.storage.local.get("concatLink")))?.concatLink;
  urlInput.value = storageContent?.url ?? '';
  nameInput.value = storageContent?.name ?? '';
}

setData();
okBtn.addEventListener("click",change);
nameInput.focus();
