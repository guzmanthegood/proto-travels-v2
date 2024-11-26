import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Custom scalar for dates in YYYY-MM-DD format */
  Date: { input: any; output: any; }
};

/** Type for availability search parameters in the response. */
export type AvailabilityParams = {
  __typename?: 'AvailabilityParams';
  /** The check-in date for the search. */
  checkIn: Scalars['Date']['output'];
  /** The check-out date for the search. */
  checkOut: Scalars['Date']['output'];
  /** Filters applied to the search. */
  filters?: Maybe<Array<Scalars['String']['output']>>;
  /** The number of nights between check-in and check-out. */
  nights: Scalars['Int']['output'];
  /** Search information for the search, such as city or coordinates. */
  search: SearchDetails;
};

/** Input type for availability search parameters. */
export type AvailabilityParamsInput = {
  /** Cursor pointing to the last item of the previous page. Used for fetching the next set of results. */
  after?: InputMaybe<Scalars['String']['input']>;
  /** The check-in date for the search. Must follow the format YYYY-MM-DD. */
  checkIn: Scalars['Date']['input'];
  /** The check-out date for the search. Must follow the format YYYY-MM-DD. */
  checkOut: Scalars['Date']['input'];
  /** Filters applied to the search. */
  filters?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Number of results to return from the start. */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Search information for the search, such as city or coordinates. */
  search: SearchInput;
  /** Sorting options for the results. Defaults to price ascending. */
  sort?: InputMaybe<SortInput>;
};

/**
 * Response for availability queries, containing search parameters, response times,
 * and a connection to the list of hotels.
 */
export type AvailabilityResponse = {
  __typename?: 'AvailabilityResponse';
  /**
   * Paginated connection of hotels returned by the search.
   * Includes sorting, filtering, and pagination arguments.
   */
  hotelsConnection: HotelConnection;
  /** Unique identifier for the availability search. */
  id: Scalars['ID']['output'];
  /** Search parameters used for the query. */
  params?: Maybe<AvailabilityParams>;
  /** Timing information for the response, including total and provider-specific times. */
  responseTime?: Maybe<ResponseTime>;
};

/** Type for geographical coordinates and radius in the response. */
export type Coordinates = {
  __typename?: 'Coordinates';
  /** Latitude of the location. */
  latitude: Scalars['Float']['output'];
  /** Longitude of the location. */
  longitude: Scalars['Float']['output'];
  /** Radius of the search area in kilometers. */
  radius?: Maybe<Scalars['Int']['output']>;
};

/** Input type for specifying geographical coordinates. */
export type CoordinatesInput = {
  /** Latitude of the location. */
  latitude: Scalars['Float']['input'];
  /** Longitude of the location. */
  longitude: Scalars['Float']['input'];
  /** Radius of the search area in kilometers. */
  radius: Scalars['Int']['input'];
};

/** Represents a hotel with its basic details and related agreements. */
export type Hotel = {
  __typename?: 'Hotel';
  /** The address of the hotel. This field is optional. */
  address?: Maybe<Scalars['String']['output']>;
  /** The cheapest option available for the hotel. */
  cheapestOption?: Maybe<Option>;
  /** The city where the hotel is located. */
  city?: Maybe<Scalars['String']['output']>;
  /** The unique code identifying the hotel. */
  code: Scalars['String']['output'];
  /** The name of the hotel. */
  name: Scalars['String']['output'];
  /** A list of options available for the hotel. */
  options?: Maybe<Array<Option>>;
  /** Whether the hotel has an active promotion. */
  promo?: Maybe<Scalars['Boolean']['output']>;
  /** The number of stars the hotel is rated with. This field is optional. */
  stars?: Maybe<Scalars['String']['output']>;
  /** The total number of options available for the hotel. */
  totalOptions: Scalars['Int']['output'];
};

/** Connection type for paginated hotel results. */
export type HotelConnection = {
  __typename?: 'HotelConnection';
  /** List of edges representing individual hotels in the connection. */
  edges?: Maybe<Array<HotelEdge>>;
  /** Information about the current page in the connection. */
  pageInfo: PageInfo;
  /** Total number of hotels available in the search. */
  totalCount: Scalars['Int']['output'];
};

/** An edge representing a single hotel in the connection. */
export type HotelEdge = {
  __typename?: 'HotelEdge';
  /** Cursor pointing to this specific hotel. */
  cursor: Scalars['String']['output'];
  /** The hotel data. */
  node: Hotel;
};

/** Represents detailed information about a hotel. */
export type HotelInfo = {
  __typename?: 'HotelInfo';
  /** Whether the hotel is active. */
  active?: Maybe<Scalars['Boolean']['output']>;
  /** The address of the hotel. */
  address?: Maybe<Scalars['String']['output']>;
  /** Whether air conditioning is available. */
  airConditioning?: Maybe<Scalars['Boolean']['output']>;
  /** Whether babysitting services are available. */
  babysitting?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the hotel is boutique-style. */
  boutique?: Maybe<Scalars['Boolean']['output']>;
  /** The chain ID the hotel belongs to. */
  chain?: Maybe<Scalars['String']['output']>;
  /** The city code of the hotel. */
  city?: Maybe<Scalars['String']['output']>;
  /** The classification of the hotel. */
  classification?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the hotel. */
  code: Scalars['String']['output'];
  /** The country code of the hotel. */
  country?: Maybe<Scalars['String']['output']>;
  /** The email of the hotel. */
  email?: Maybe<Scalars['String']['output']>;
  /** The fax number of the hotel. */
  fax?: Maybe<Scalars['String']['output']>;
  /** Whether the hotel has a gym. */
  gym?: Maybe<Scalars['Boolean']['output']>;
  /** Whether a hairdryer is available in the hotel. */
  hairdryer?: Maybe<Scalars['Boolean']['output']>;
  /** The last modified date of the hotel details. */
  lastModified?: Maybe<Scalars['String']['output']>;
  /** The latitude of the hotel. */
  latitude?: Maybe<Scalars['Float']['output']>;
  /** The location code of the hotel. */
  location?: Maybe<Scalars['String']['output']>;
  /** The longitude of the hotel. */
  longitude?: Maybe<Scalars['Float']['output']>;
  /** The metro station near the hotel. */
  metro?: Maybe<Scalars['String']['output']>;
  /** The name of the hotel. */
  name: Scalars['String']['output'];
  /** Whether the hotel is non-smoking. */
  noSmoking?: Maybe<Scalars['Boolean']['output']>;
  /** An array of picture URLs for the hotel. */
  pictures?: Maybe<Array<Scalars['String']['output']>>;
  /** Whether the hotel has a swimming pool. */
  poolHot?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the hotel has a sauna. */
  sauna?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the hotel has shuttle services to the airport. */
  shuttleToAirport?: Maybe<Scalars['Boolean']['output']>;
  /** Whether the hotel has shuttle services to the city center. */
  shuttleToCenter?: Maybe<Scalars['Boolean']['output']>;
  /** The number of stars for the hotel. */
  stars?: Maybe<Scalars['String']['output']>;
  /** The nearest station name. */
  station?: Maybe<Scalars['String']['output']>;
  /** The telephone number of the hotel. */
  telephone?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Test mutation */
  test?: Maybe<Scalars['String']['output']>;
};


export type MutationTestArgs = {
  params?: InputMaybe<Scalars['String']['input']>;
};

/** Represents an option related to a hotel, including pricing and availability details. */
export type Option = {
  __typename?: 'Option';
  /** Whether this option is currently available. */
  available: Scalars['Boolean']['output'];
  /** The type of option (e.g., refundable or non-refundable). */
  ctype: Scalars['String']['output'];
  /** The unique identifier of the option. */
  id: Scalars['ID']['output'];
  /** Whether this option is fully refundable. */
  isFullyRefundable: Scalars['Boolean']['output'];
  /** The meal basis included in the option (e.g., breakfast, all-inclusive). */
  mealBasis: Scalars['String']['output'];
  /** The total price of the option. */
  price: Price;
  /** The room basis of the option (e.g., single, double). */
  roomBasis: Scalars['String']['output'];
  /** Type of room associated with this option. */
  roomType: Scalars['String']['output'];
};

/** PageInfo represents the pagination information for a given connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor to be used for fetching the next set of results. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Whether there are more items after the current set of results. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are more items before the current set of results. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor to be used for fetching the previous set of results. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Represents the price of an agreement, including currency information. */
export type Price = {
  __typename?: 'Price';
  /** The amount of money for the agreement. */
  amount: Scalars['Float']['output'];
  /** The currency of the amount (e.g., USD, EUR). */
  currency: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Retrieves availability for hotels based on the given search parameters. */
  availability: AvailabilityResponse;
};


export type QueryAvailabilityArgs = {
  params: AvailabilityParamsInput;
};

/**
 * ResponseTime represents the time it took to process and respond to the availability request.
 * It can be split into different segments for clarity.
 */
export type ResponseTime = {
  __typename?: 'ResponseTime';
  /** Time taken by the provider service to return the data */
  provider: Scalars['Float']['output'];
  /** The total time taken for the availability response in milliseconds. */
  total: Scalars['Float']['output'];
};

/** Type for specifying the target of the search in the response. */
export type SearchDetails = {
  __typename?: 'SearchDetails';
  /** The code of a city that was searched in. */
  cityCode?: Maybe<Scalars['String']['output']>;
  /** The geographical coordinates and radius that were searched around. */
  coordinates?: Maybe<Coordinates>;
  /** The code of a specific hotel that was searched for. */
  hotelCode?: Maybe<Scalars['String']['output']>;
};

/**
 * Input type for specifying the target of the search.
 * The search priority is as follows:
 * 1. If `hotelCode` is provided, only that specific hotel is returned, even if other fields are populated.
 * 2. If `cityCode` is provided, all hotels in that city are returned, even if `coordinates` are provided.
 * 3. If neither `hotelCode` nor `cityCode` are provided, `coordinates` with `radius` will be used to search for hotels.
 */
export type SearchInput = {
  /** The code of a city to search in. Takes priority over `coordinates` if present. */
  cityCode?: InputMaybe<Scalars['String']['input']>;
  /** The geographical coordinates and radius to search around. Used if neither `hotelCode` nor `cityCode` are provided. */
  coordinates?: InputMaybe<CoordinatesInput>;
  /** The code of a specific hotel to search for. Takes highest priority. */
  hotelCode?: InputMaybe<Scalars['String']['input']>;
};

/** Type for sorting options in the response. */
export type SortDetails = {
  __typename?: 'SortDetails';
  /** The field that was used to sort the results (e.g., price, name). */
  field: SortField;
  /** The order of sorting (e.g., ascending, descending). */
  order?: Maybe<SortOrder>;
};

/** Enumeration for sortable fields. */
export enum SortField {
  /** Sort by name. */
  Name = 'NAME',
  /** Sort by price. */
  Price = 'PRICE'
}

/** Input type for sorting options. */
export type SortInput = {
  /** The field to sort by (e.g., price, name). */
  field: SortField;
  /** The order of sorting (e.g., ascending, descending). */
  order?: InputMaybe<SortOrder>;
};

/** Enumeration for sorting order. */
export enum SortOrder {
  /** Ascending order. */
  Asc = 'ASC',
  /** Descending order. */
  Desc = 'DESC'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AvailabilityParams: ResolverTypeWrapper<AvailabilityParams>;
  AvailabilityParamsInput: AvailabilityParamsInput;
  AvailabilityResponse: ResolverTypeWrapper<AvailabilityResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Hotel: ResolverTypeWrapper<Hotel>;
  HotelConnection: ResolverTypeWrapper<HotelConnection>;
  HotelEdge: ResolverTypeWrapper<HotelEdge>;
  HotelInfo: ResolverTypeWrapper<HotelInfo>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Option: ResolverTypeWrapper<Option>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Price: ResolverTypeWrapper<Price>;
  Query: ResolverTypeWrapper<{}>;
  ResponseTime: ResolverTypeWrapper<ResponseTime>;
  SearchDetails: ResolverTypeWrapper<SearchDetails>;
  SearchInput: SearchInput;
  SortDetails: ResolverTypeWrapper<SortDetails>;
  SortField: SortField;
  SortInput: SortInput;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AvailabilityParams: AvailabilityParams;
  AvailabilityParamsInput: AvailabilityParamsInput;
  AvailabilityResponse: AvailabilityResponse;
  Boolean: Scalars['Boolean']['output'];
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  Hotel: Hotel;
  HotelConnection: HotelConnection;
  HotelEdge: HotelEdge;
  HotelInfo: HotelInfo;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Option: Option;
  PageInfo: PageInfo;
  Price: Price;
  Query: {};
  ResponseTime: ResponseTime;
  SearchDetails: SearchDetails;
  SearchInput: SearchInput;
  SortDetails: SortDetails;
  SortInput: SortInput;
  String: Scalars['String']['output'];
};

export type AvailabilityParamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailabilityParams'] = ResolversParentTypes['AvailabilityParams']> = {
  checkIn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  checkOut?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  filters?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  nights?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  search?: Resolver<ResolversTypes['SearchDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvailabilityResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AvailabilityResponse'] = ResolversParentTypes['AvailabilityResponse']> = {
  hotelsConnection?: Resolver<ResolversTypes['HotelConnection'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  params?: Resolver<Maybe<ResolversTypes['AvailabilityParams']>, ParentType, ContextType>;
  responseTime?: Resolver<Maybe<ResolversTypes['ResponseTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  radius?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type HotelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hotel'] = ResolversParentTypes['Hotel']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cheapestOption?: Resolver<Maybe<ResolversTypes['Option']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Maybe<Array<ResolversTypes['Option']>>, ParentType, ContextType>;
  promo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalOptions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HotelConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['HotelConnection'] = ResolversParentTypes['HotelConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['HotelEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HotelEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['HotelEdge'] = ResolversParentTypes['HotelEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Hotel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HotelInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['HotelInfo'] = ResolversParentTypes['HotelInfo']> = {
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  airConditioning?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  babysitting?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  boutique?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  chain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  classification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fax?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gym?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hairdryer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastModified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  metro?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  noSmoking?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  pictures?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  poolHot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sauna?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shuttleToAirport?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shuttleToCenter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  station?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  telephone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  test?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<MutationTestArgs>>;
};

export type OptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Option'] = ResolversParentTypes['Option']> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ctype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFullyRefundable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mealBasis?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Price'], ParentType, ContextType>;
  roomBasis?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  availability?: Resolver<ResolversTypes['AvailabilityResponse'], ParentType, ContextType, RequireFields<QueryAvailabilityArgs, 'params'>>;
};

export type ResponseTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseTime'] = ResolversParentTypes['ResponseTime']> = {
  provider?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchDetails'] = ResolversParentTypes['SearchDetails']> = {
  cityCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  hotelCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SortDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SortDetails'] = ResolversParentTypes['SortDetails']> = {
  field?: Resolver<ResolversTypes['SortField'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['SortOrder']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AvailabilityParams?: AvailabilityParamsResolvers<ContextType>;
  AvailabilityResponse?: AvailabilityResponseResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Hotel?: HotelResolvers<ContextType>;
  HotelConnection?: HotelConnectionResolvers<ContextType>;
  HotelEdge?: HotelEdgeResolvers<ContextType>;
  HotelInfo?: HotelInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Option?: OptionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResponseTime?: ResponseTimeResolvers<ContextType>;
  SearchDetails?: SearchDetailsResolvers<ContextType>;
  SortDetails?: SortDetailsResolvers<ContextType>;
};

