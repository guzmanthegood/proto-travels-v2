import { parseStringPromise } from "xml2js";
import { HotelInfo } from "../../../../schema/types";

/**
 * Parses the XML response from Netstorming into a HotelInfo object.
 * @param xmlResponse - The raw XML response from Netstorming.
 * @returns A promise resolving to a HotelInfo object.
 */
export const parseResponse = async (
  xmlResponse: string
): Promise<HotelInfo> => {
  try {
    const parsed = await parseStringPromise(xmlResponse, {
      explicitArray: false,
    });

    const response = parsed?.envelope?.response || {};
    const hotel = response || {};

    // Helper to safely extract values from the "$" object
    const extractValue = (field: any): string | null => {
      return field?.$?.value || null;
    };

    // Helper to extract boolean values
    const extractBoolean = (field: any): boolean | null => {
      const value = extractValue(field);
      return value !== null ? value === "true" : null;
    };

    // Helper to extract localized descriptions
    const extractDescriptions = (field: any): any[] => {
      return Object.entries(field || {})
        .map(([key, value]) => ({
          language: key,
          text: typeof value === "string" ? value : "",
        }))
        .filter((desc) => desc.text.trim() !== ""); // Exclude empty texts
    };

    // Parse the hotel data, accounting for values stored in "$"
    return {
      code: extractValue(hotel?.id) || "",
      name: extractValue(hotel?.name) || "",
      chain: extractValue(hotel?.chain),
      stars: extractValue(hotel?.stars),
      classification: extractValue(hotel?.classification),
      address: extractValue(hotel?.address),
      city: extractValue(hotel?.city),
      location: extractValue(hotel?.location),
      country: extractValue(hotel?.country),
      email: extractValue(hotel?.email),
      telephone: extractValue(hotel?.telephone),
      fax: extractValue(hotel?.fax),
      active: extractBoolean(hotel?.active),
      airConditioning: extractBoolean(hotel?.airconditioning),
      hairdryer: extractBoolean(hotel?.hairdreyer),
      boutique: extractBoolean(hotel?.boutique),
      gym: extractBoolean(hotel?.gym),
      sauna: extractBoolean(hotel?.sauna),
      babysitting: extractBoolean(hotel?.babysitting),
      poolHot: extractBoolean(hotel?.pool_hot),
      noSmoking: extractBoolean(hotel?.nosmoking),
      shuttleToAirport: extractBoolean(hotel?.shuttle_apt),
      shuttleToCenter: extractBoolean(hotel?.shuttle_center),
      metro: extractValue(hotel?.metro),
      station: extractValue(hotel?.station),
      latitude: Number(extractValue(hotel?.lt)) || null,
      longitude: Number(extractValue(hotel?.lg)) || null,
      lastModified: extractValue(hotel?.lastmodified),
      pictures: (hotel?.pictures?.picture || []).map(
        (picture: any) => picture?.$?.src || ""
      ),
      hotelFacilities: {
        dbl: extractValue(hotel?.hotelfacilities?.dbl),
        sgl: extractValue(hotel?.hotelfacilities?.sgl),
        qdr: extractValue(hotel?.hotelfacilities?.qdr),
        twn: extractValue(hotel?.hotelfacilities?.twn),
        trp: extractValue(hotel?.hotelfacilities?.trp),
        lifts: extractValue(hotel?.hotelfacilities?.lifts),
        voltage: extractValue(hotel?.hotelfacilities?.voltage),
        checkIn: extractValue(hotel?.hotelfacilities?.checkin),
        babysitting: extractBoolean(hotel?.hotelfacilities?.babysitting),
        laundry: extractBoolean(hotel?.hotelfacilities?.laundry),
        solarium: extractBoolean(hotel?.hotelfacilities?.solarium),
        shuttleToAirport: extractBoolean(hotel?.hotelfacilities?.shuttle_apt),
        bar: extractBoolean(hotel?.hotelfacilities?.bar),
        noSmoking: extractBoolean(hotel?.hotelfacilities?.nosmoking),
        otherFacilities: extractValue(hotel?.hotelfacilities?.other_facilities),
        internet: extractBoolean(hotel?.hotelfacilities?.internet),
      },
      roomFacilities: {
        airConditioning: extractBoolean(
          hotel?.roomsfacilities?.rairconditioning
        ),
        tv: extractBoolean(hotel?.roomsfacilities?.tv),
        telephone: extractBoolean(hotel?.roomsfacilities?.rtelephone),
        hairdryer: extractBoolean(hotel?.roomsfacilities?.hairdreyer),
        safe: extractBoolean(hotel?.roomsfacilities?.safe),
        radio: extractBoolean(hotel?.roomsfacilities?.radio),
        film: extractBoolean(hotel?.roomsfacilities?.film),
      },
      description: {
        rooms: extractDescriptions(hotel?.sheets?.txt_rooms),
        general: extractDescriptions(hotel?.sheets?.txt_general),
        exterior: extractDescriptions(hotel?.sheets?.txt_exterior),
        position: extractDescriptions(hotel?.sheets?.txt_position),
        lobby: extractDescriptions(hotel?.sheets?.txt_lobby),
      },
    };
  } catch (error: any) {
    const errorMessage = `Error parsing Netstorming hotel info response: ${error.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};
