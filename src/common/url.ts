export function modifyUrl(title: string, url: string) {
  if (typeof (history.replaceState) != "undefined") {
    var obj = {
      Title: title,
      Url: url
    };
    history.replaceState(obj, obj.Title, obj.Url);
  }
}