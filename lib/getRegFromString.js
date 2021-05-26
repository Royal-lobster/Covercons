export function getRegFromString(string) {
  var a = string.split("/");
  var modifiers = a.pop();
  a.shift();
  var pattern = a.join("/");
  return new RegExp(pattern, modifiers);
}
