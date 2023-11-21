document.getElementById("form").addEventListener("keyup", () => {
  const url = document.getElementById('form').value;
  document.getElementById("result").innerHTML = url;
  browser.runtime.sendMessage({url});
});