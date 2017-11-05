import geolib from 'geolib';

import Rakuten from '../lib/Rakuten';

const RAKUTEN_APP_ID = '1098714705928846127';

export const searchHotelByLocation = (location) => {
  const params = {
    applicationId: RAKUTEN_APP_ID,
    datumType: 1,
    latitude: location.lat,
    longitude: location.lng,
  };

  return Rakuten.Travel.simpleHotelSearch(params)
  .then(result => {
    console.log("come success rakuten travel");
    return result.data.hotels.map((hotel) => {
      const basicInfo = hotel.hotel[0].hotelBasicInfo;
      const price = basicInfo.hotelMinCharge;
      const distance = geolib.getDistance(
        { latitude: location.lat, longitude: location.lng},
        { latitude: basicInfo.latitude, longitude: basicInfo.longitude},
      );
      return {
        id: basicInfo.hotelNo,
        name: basicInfo.hotelName,
        url: basicInfo.hotelInformationUrl,
        thumbUrl: basicInfo.hotelThumbnailUrl,
        price: price,
        reviewAverage: basicInfo.reviewAverage,
        reviewCount: basicInfo.reviewCount,
        distance,
      };
    });
  });
};
