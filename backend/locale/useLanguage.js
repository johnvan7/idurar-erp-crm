const { readBySettingKey } = require('@/middlewares/settings');
const getLabel = (lang, key) => {
  try {
    const lowerCaseKey = key
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/ /g, '_');

    if (lang[lowerCaseKey]) return lang[lowerCaseKey];
    else {
      // convert no found language label key to label

      const remove_underscore_fromKey = lowerCaseKey.replace(/_/g, ' ').split(' ');

      const conversionOfAllFirstCharacterofEachWord = remove_underscore_fromKey.map(
        (word) => word[0].toUpperCase() + word.substring(1)
      );

      const label = conversionOfAllFirstCharacterofEachWord.join(' ');

      // const result = window.localStorage.getItem('lang');
      // if (!result) {
      //   let list = {};
      //   list[lowerCaseKey] = label;
      //   window.localStorage.setItem('lang', JSON.stringify(list));
      // } else {
      //   let list = { ...JSON.parse(result) };
      //   list[lowerCaseKey] = label;
      //   window.localStorage.removeItem('lang');
      //   window.localStorage.setItem('lang', JSON.stringify(list));
      // }
      // console.error(
      //   '🇩🇿 🇧🇷 🇻🇳 🇮🇩 🇨🇳 Language Label Warning : translate("' +
      //     lowerCaseKey +
      //     '") failed to get label for this key : ' +
      //     lowerCaseKey +
      //     ' please review your language config file and add this label'
      // );
      return label;
    }
  } catch (error) {
    // console.error(
    //   '🚨 error getting this label : translate("' +
    //     key +
    //     '") failed to get label for this key : ' +
    //     key +
    //     ' please review your language config file and add this label'
    // );
    return 'No translate Found';
  }
};

const useSelector = (lang) => {
  const flePath = `./translation/${lang}`;
  const langFile = require(flePath);
  return langFile;
};

const translate = async (value) => {
  const { settingValue: selectCurrentLang } = await readBySettingKey({ settingKey: 'language' });
  const lang = await useSelector(selectCurrentLang);
  const text = getLabel(lang, value);

  return text;
};

module.exports = { translate };