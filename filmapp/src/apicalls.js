import axios from 'axios';

export const filmDataJson = () => {
  return axios.get(`${process.env.URL}/filmapi/getApi`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};
export const filmDataById = (id) => {
  return axios.get(`${process.env.URL}/filmapi/getApi?id=${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};

export const filmDataByName = (name) => {
  return axios.get(`${process.env.URL}/filmapi/getApi?name=${name}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};
export const filmDataByYear = (year) => {
  return axios.get(`${process.env.URL}/filmapi/getApi?year=${year}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};

export const filmDataXml = () => {
  return axios.get(`${process.env.URL}/filmapi/getApi`, {
    method: 'GET',
    headers: {
      Accept: 'application/xml',
    },
  });
};

export const filmDataText = () => {
  return axios.get(url, {
    method: 'GET',
  });
};

export const JSONtoXML = (obj) => {
  let xml = '';
  for (let prop in obj) {
    xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
    if (obj[prop] instanceof Array) {
      for (let array in obj[prop]) {
        xml += '\n<' + prop + '>\n';
        xml += JSONtoXML(new Object(obj[prop][array]));
        xml += '</' + prop + '>';
      }
    } else if (typeof obj[prop] == 'object') {
      xml += JSONtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : '</' + prop + '>\n';
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml;
};
