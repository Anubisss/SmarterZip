const ZIPATO_URLS = {
  logout: 'https://admin.zipato.com/zipato-web/v2/user/logout',
  login: 'https://admin.zipato.com/zipato-web/v2/user/login',
  getSystems: 'https://admin.zipato.com/zipato-web/v2/systems/',
  selectSystem: 'https://admin.zipato.com/zipato-web/v2/systems/select',
  getRooms: 'https://admin.zipato.com/zipato-web/v2/rooms/',
  getAbilities: 'https://admin.zipato.com:443/zipato-web/v2/abilities/',
  getAttributeValues: 'https://admin.zipato.com:443/zipato-web/v2/attributes/values?update=false',
  changeAttributeValue: (uuid: string): string =>
    `https://admin.zipato.com:443/zipato-web/v2/attributes/${uuid}/value`,
};

export default ZIPATO_URLS;
