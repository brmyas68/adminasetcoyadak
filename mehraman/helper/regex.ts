export const Regex = {
  englishWord: /* eslint-disable */ new RegExp(/^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%.\^&*|']*$/, 'i') /* eslint-enable */,
  email: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/, 'i'),
  number: new RegExp(/[0-9]/),
  sheba: new RegExp(/^(?:IR)(?=.{24}$)[0-9]*$/),
}
