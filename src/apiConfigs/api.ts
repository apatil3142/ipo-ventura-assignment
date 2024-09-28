import data from '../data.json';

export const getIPOList = () => {
  return data;
}

export const getIPODetails = (ipoID: string) => {
  return data.find(ipo => ipo.id === ipoID);
}